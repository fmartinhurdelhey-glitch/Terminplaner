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

    // Hole Session-Daten von Stripe (mit line_items)
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'line_items.data.price']
    });

    console.log('Stripe session retrieved:', {
      id: session.id,
      payment_status: session.payment_status,
      mode: session.mode,
      customer: session.customer,
      subscription: session.subscription,
      line_items: session.line_items?.data[0]?.price?.id
    });

    if (!session || session.payment_status !== 'paid') {
      console.error('Payment not completed:', session);
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
    const subscriptionData = {
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
    };

    console.log('Saving subscription data to Supabase:', subscriptionData);

    const { data: savedData, error: dbError } = await supabaseAdmin
      .from('subscriptions')
      .upsert(subscriptionData)
      .select();

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Fehler beim Speichern der Subscription', details: dbError.message },
        { status: 500 }
      );
    }

    console.log('Subscription saved successfully:', savedData);

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
