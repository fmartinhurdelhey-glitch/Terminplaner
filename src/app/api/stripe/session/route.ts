import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();

    const authHeader = req.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Nicht authentifiziert' },
        { status: 401 }
      );
    }

    const accessToken = authHeader.replace('Bearer ', '');

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      }
    );
    
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (!user || userError) {
      return NextResponse.json(
        { error: 'Nicht authentifiziert' },
        { status: 401 }
      );
    }

    // Hole Session-Daten von Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session || session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Zahlung nicht abgeschlossen' },
        { status: 400 }
      );
    }

    // Prüfe ob es eine Subscription oder Einmalzahlung ist
    const isSubscription = session.mode === 'subscription';
    
    let planName = 'Free';
    let subscriptionId = null;
    let currentPeriodEnd = null;

    if (isSubscription && session.subscription) {
      const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
      planName = 'Pro';
      subscriptionId = subscription.id;
      currentPeriodEnd = (subscription as any).current_period_end 
        ? new Date((subscription as any).current_period_end * 1000).toISOString()
        : null;
    } else {
      // Einmalzahlung
      planName = 'Lifetime';
    }

    // Verwende Service Role Key für Datenbankoperationen
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Speichere oder aktualisiere Subscription in Supabase
    const { error: dbError } = await supabaseAdmin
      .from('subscriptions')
      .upsert({
        user_id: user.id,
        stripe_customer_id: session.customer as string,
        stripe_subscription_id: subscriptionId,
        stripe_price_id: session.line_items?.data[0]?.price?.id,
        plan: planName,
        status: 'active',
        current_period_start: new Date().toISOString(),
        current_period_end: currentPeriodEnd,
        cancel_at_period_end: false,
        updated_at: new Date().toISOString(),
      });

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Fehler beim Speichern der Subscription' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true,
      plan: planName,
    });
  } catch (error) {
    console.error('Session processing error:', error);
    return NextResponse.json(
      { error: 'Fehler beim Verarbeiten der Session' },
      { status: 500 }
    );
  }
}
