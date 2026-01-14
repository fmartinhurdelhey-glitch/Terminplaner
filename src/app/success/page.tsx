'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { HeroHeader } from '@/components/header';
import FooterSection from '@/components/footer';
import { supabase } from '@/lib/supabase';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get('session_id');
  const [countdown, setCountdown] = useState(5);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    if (!sessionId) {
      router.push('/pricing');
      return;
    }

    const processCheckout = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.access_token) {
          console.error('No session found');
          setIsProcessing(false);
          return;
        }

        const response = await fetch('/api/stripe/session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ sessionId }),
        });

        if (response.ok) {
          console.log('Subscription data saved successfully');
        } else {
          console.error('Failed to save subscription data');
        }
      } catch (error) {
        console.error('Error processing checkout:', error);
      } finally {
        setIsProcessing(false);
      }
    };

    processCheckout();

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/profile');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [sessionId, router]);

  if (!sessionId) {
    return null;
  }

  return (
    <>
      <HeroHeader />
      <main className="min-h-screen flex items-center justify-center px-4 py-32">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          
          <div className="space-y-3">
            <h1 className="text-4xl font-bold">Zahlung erfolgreich!</h1>
            <p className="text-lg text-muted-foreground">
              Vielen Dank für dein Pro-Abonnement.
            </p>
          </div>

          <div className="bg-muted rounded-lg p-6 space-y-4">
            <p className="text-sm text-muted-foreground">
              Du hast jetzt Zugriff auf alle Pro-Funktionen:
            </p>
            <ul className="space-y-2 text-sm text-left">
              {[
                'Unbegrenzte Termine',
                'Unbegrenzter Cloud Speicher',
                'Email Support',
                'Monthly Product Updates',
                'Standard Sicherheit Features'
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Du wirst in {countdown} Sekunden zu deinem Dashboard weitergeleitet...
            </p>
            
            <div className="flex gap-3 justify-center">
              <Button asChild variant="outline">
                <Link href="/">Zur Startseite</Link>
              </Button>
              <Button asChild>
                <Link href="/profile">Zum Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <FooterSection />
    </>
  );
}
