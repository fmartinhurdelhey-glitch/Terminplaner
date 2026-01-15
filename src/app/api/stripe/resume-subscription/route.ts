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

    console.log('Updated Stripe Subscription:', {
      id: stripeSubscription.id,
      current_period_end: stripeSubscription.current_period_end,
      cancel_at_period_end: stripeSubscription.cancel_at_period_end,
    });

    // Aktualisiere in Supabase mit current_period_end von Stripe
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const updateData: any = {
      cancel_at_period_end: false,
      updated_at: new Date().toISOString(),
    };

    // Setze current_period_end
    if (stripeSubscription.current_period_end) {
      // Wenn Stripe es liefert, verwende es
      updateData.current_period_end = new Date(stripeSubscription.current_period_end * 1000).toISOString();
    } else if (stripeSubscription.current_period_start) {
      // Falls nicht vorhanden, berechne +1 Monat ab current_period_start
      const periodStart = new Date(stripeSubscription.current_period_start * 1000);
      const periodEnd = new Date(periodStart);
      periodEnd.setMonth(periodEnd.getMonth() + 1);
      updateData.current_period_end = periodEnd.toISOString();
      console.log('Calculated current_period_end from start date:', {
        start: periodStart.toISOString(),
        calculated_end: periodEnd.toISOString()
      });
    } else {
      // Fallback: Aktuelles Datum + 1 Monat
      const now = new Date();
      const periodEnd = new Date(now);
      periodEnd.setMonth(periodEnd.getMonth() + 1);
      updateData.current_period_end = periodEnd.toISOString();
      console.log('Calculated current_period_end from now:', periodEnd.toISOString());
    }

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
