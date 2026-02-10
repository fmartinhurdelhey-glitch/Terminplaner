import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Keine Stripe-Signatur gefunden' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Webhook-Signaturverifizierung fehlgeschlagen' },
      { status: 400 }
    );
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Hole Session mit Line Items
        const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
          expand: ['line_items', 'line_items.data.price']
        });
        
        // Hole komplette Subscription-Daten wenn es eine Subscription ist
        let currentPeriodEnd = null;
        let currentPeriodStart = null;
        let trialEnd = null;
        let planName = 'Lifetime';
        let stripePriceId = fullSession.line_items?.data[0]?.price?.id || null;
        
        if (session.mode === 'subscription' && session.subscription) {
          planName = 'Pro';
          
          // Hole echte Subscription-Daten von Stripe (inkl. Trial-Info)
          const subscription = await stripe.subscriptions.retrieve(session.subscription as string) as any;
          
          // Trial-Logik: 
          // - trial_end = Kaufdatum + 7 Tage (Ende der Testphase)
          // - current_period_start = trial_end (Start des bezahlten Abos)
          // - current_period_end = current_period_start + 1 Monat
          
          if (subscription.trial_end) {
            // Es gibt eine Trial-Periode
            trialEnd = new Date(subscription.trial_end * 1000).toISOString();
            
            // current_period_start = Ende des Trials (Start des bezahlten Abos)
            const trialEndDate = new Date(subscription.trial_end * 1000);
            currentPeriodStart = trialEndDate.toISOString();
            
            // current_period_end = Trial-Ende + 1 Monat
            const periodEndDate = new Date(trialEndDate);
            periodEndDate.setMonth(periodEndDate.getMonth() + 1);
            currentPeriodEnd = periodEndDate.toISOString();
          } else {
            // Kein Trial - normale Daten von Stripe
            currentPeriodStart = new Date(subscription.current_period_start * 1000).toISOString();
            currentPeriodEnd = new Date(subscription.current_period_end * 1000).toISOString();
          }
          
          console.log('Stripe subscription data:', {
            current_period_start: currentPeriodStart,
            current_period_end: currentPeriodEnd,
            trial_end: trialEnd,
            status: subscription.status
          });
        }
        
        await supabase.from('subscriptions').upsert({
          user_id: session.metadata?.userId,
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: session.subscription as string,
          stripe_price_id: stripePriceId,
          status: 'active',
          plan: planName,
          current_period_start: currentPeriodStart,
          current_period_end: currentPeriodEnd,
          trial_end: trialEnd,
          cancel_at_period_end: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
        
        console.log('Subscription created/updated via webhook:', {
          userId: session.metadata?.userId,
          plan: planName,
          stripePriceId,
          current_period_start: currentPeriodStart,
          current_period_end: currentPeriodEnd
        });
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Nur Status und cancel_at_period_end aktualisieren.
        // current_period_start und current_period_end werden NICHT überschrieben,
        // da diese nur beim Erstellen (checkout.session.completed) gesetzt werden
        // und sich beim Cancel/Resume nicht ändern sollen.
        await supabase
          .from('subscriptions')
          .update({ 
            status: subscription.status,
            cancel_at_period_end: subscription.cancel_at_period_end,
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id);
        
        console.log('Subscription updated:', subscription.id, {
          status: subscription.status,
          cancel_at_period_end: subscription.cancel_at_period_end
        });
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        
        await supabase
          .from('subscriptions')
          .update({ 
            status: 'canceled',
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id);
        
        console.log('Subscription canceled:', subscription.id);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        
        const subscriptionId = (invoice as any).subscription 
          ? typeof (invoice as any).subscription === 'string' 
            ? (invoice as any).subscription 
            : (invoice as any).subscription?.id
          : null;
          
        if (subscriptionId) {
          await supabase
            .from('subscriptions')
            .update({ 
              status: 'past_due',
              updated_at: new Date().toISOString(),
            })
            .eq('stripe_subscription_id', subscriptionId);
        }
        
        console.log('Payment failed for invoice:', invoice.id);
        break;
      }

      default:
        console.log('Unhandled event type:', event.type);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Fehler beim Verarbeiten des Webhooks' },
      { status: 500 }
    );
  }
}
