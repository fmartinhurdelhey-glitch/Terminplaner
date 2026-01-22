import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  try {
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

    // Lade Subscription-Daten
    const { data: subscription, error: subError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (subError || !subscription || !subscription.stripe_subscription_id) {
      return NextResponse.json(
        { error: 'Kein Abonnement gefunden' },
        { status: 404 }
      );
    }

    // Setze cancel_at_period_end auf false in Stripe
    await stripe.subscriptions.update(
      subscription.stripe_subscription_id,
      {
        cancel_at_period_end: false,
      }
    );

    // Hole die aktualisierte Subscription von Stripe
    const stripeSubscription = await stripe.subscriptions.retrieve(
      subscription.stripe_subscription_id
    ) as any;

    console.log('=== STRIPE SUBSCRIPTION FULL DATA ===');
    console.log('ID:', stripeSubscription.id);
    console.log('Status:', stripeSubscription.status);
    console.log('Current Period Start:', stripeSubscription.current_period_start, '→', stripeSubscription.current_period_start ? new Date(stripeSubscription.current_period_start * 1000).toISOString() : 'undefined');
    console.log('Current Period End:', stripeSubscription.current_period_end, '→', stripeSubscription.current_period_end ? new Date(stripeSubscription.current_period_end * 1000).toISOString() : 'undefined');
    console.log('Cancel At Period End:', stripeSubscription.cancel_at_period_end);
    console.log('Canceled At:', stripeSubscription.canceled_at);
    console.log('Cancel At:', stripeSubscription.cancel_at);
    console.log('Trial End:', stripeSubscription.trial_end);
    console.log('=====================================');

    // Aktualisiere in Supabase mit current_period_end von Stripe
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Berechne current_period_end
    let currentPeriodEnd: string;
    
    if (stripeSubscription.current_period_end) {
      // Fall 1: Stripe liefert current_period_end
      currentPeriodEnd = new Date(stripeSubscription.current_period_end * 1000).toISOString();
      console.log('Using Stripe current_period_end:', currentPeriodEnd);
    } else if (stripeSubscription.current_period_start) {
      // Fall 2: Berechne aus current_period_start + Abo-Interval
      const periodStart = new Date(stripeSubscription.current_period_start * 1000);
      const periodEnd = new Date(periodStart);
      
      // Prüfe Interval (monthly/yearly)
      const interval = stripeSubscription.items?.data?.[0]?.price?.recurring?.interval || 'month';
      if (interval === 'year') {
        periodEnd.setFullYear(periodEnd.getFullYear() + 1);
      } else {
        periodEnd.setMonth(periodEnd.getMonth() + 1);
      }
      
      currentPeriodEnd = periodEnd.toISOString();
      console.log('Calculated from current_period_start:', {
        start: periodStart.toISOString(),
        interval: interval,
        calculated_end: currentPeriodEnd
      });
    } else {
      // Fall 3: Notfall-Fallback (sollte nicht passieren)
      const fallbackDate = new Date();
      fallbackDate.setMonth(fallbackDate.getMonth() + 1);
      currentPeriodEnd = fallbackDate.toISOString();
      console.warn('WARNING: Using fallback date calculation!');
    }

    // Erstelle Update-Daten
    const updateData: any = {
      cancel_at_period_end: false,
      current_period_end: currentPeriodEnd,
      updated_at: new Date().toISOString(),
    };

    console.log('Updating Supabase with:', updateData);

    const { data: updateResult, error: updateError } = await supabaseAdmin
      .from('subscriptions')
      .update(updateData)
      .eq('user_id', user.id)
      .select();

    console.log('Supabase update result:', { updateResult, updateError });

    if (updateError) {
      console.error('Failed to update Supabase:', updateError);
      return NextResponse.json(
        { error: 'Fehler beim Aktualisieren der Datenbank' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true,
      message: 'Abonnement wurde fortgesetzt',
    });
  } catch (error) {
    console.error('Resume subscription error:', error);
    return NextResponse.json(
      { error: 'Fehler beim Fortsetzen des Abonnements' },
      { status: 500 }
    );
  }
}
