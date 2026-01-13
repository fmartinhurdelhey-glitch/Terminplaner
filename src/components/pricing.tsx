'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X } from 'lucide-react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function ContactForm({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
      const response = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, question: message }),
      });
      
      const data = await response.json();
      if (response.ok) {
        setIsSubmitted(true);
        setEmail('');
        setMessage('');
        setError(null);
      } else {
        throw new Error(data.error || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Vielen Dank!</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </div>
          <p>Wir haben deine Nachricht erhalten und werden uns bald bei dir melden.</p>
          <div className="mt-6">
            <Button onClick={onClose} className="w-full">
              Schließen
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Kontaktiere uns</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Deine E-Mail
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="dein@beispiel.de"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-1 block text-sm font-medium">
              Deine Nachricht
            </label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Wie können wir dir helfen?"
              rows={4}
              required
            />
          </div>
          <div className="space-y-3">
            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}
            <div className="flex justify-end space-x-3 pt-2">
              <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                Abbrechen
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Wird gesendet...' : 'Abschicken'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Pricing() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleCheckout = async (priceId: string) => {
    if (!user) {
      toast.error('Bitte melde dich an, um fortzufahren');
      setTimeout(() => {
        window.location.href = '/signup';
      }, 1500);
      return;
    }

    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.access_token) {
        toast.error('Keine gültige Session gefunden');
        return;
      }

      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({ priceId }),
      });

      if (!response.ok) {
        throw new Error('Checkout fehlgeschlagen');
      }

      const { sessionId } = await response.json();
      
      window.location.href = sessionId;
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Fehler beim Öffnen der Checkout-Seite');
    } finally {
      setLoading(false);
    }
  };
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mx-auto max-w-2xl space-y-6 text-center">
                    <h1 className="text-4xl font-semibold lg:text-5xl">Preise</h1>
                </div>

                <div className="mt-8 grid gap-6 md:mt-20 md:grid-cols-3">
                    <Card className="flex flex-col border border-border shadow-sm">
                        <CardHeader>
                            <CardTitle className="font-medium">Einmalig bezahlen</CardTitle>
                            <span className="my-3 block text-2xl font-semibold">250€</span>
                            <CardDescription className="text-sm">Einmalige Zahlung</CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <hr className="border-dashed" />

                            <ul className="list-outside space-y-3 text-sm">
                                {['Lebenslanger Zugriff', 'Unbegrenzte Termine', 'Unbegrenzter Cloud Speicher', 'Email Support', 'Standard Sicherheit Features'].map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-2">
                                        <Check className="size-3" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>

                        <CardFooter className="mt-auto">
                            <Button
                                onClick={() => handleCheckout('price_1SpH9OLF1PJBnUS7nMwPA4HZ')}
                                disabled={loading}
                                variant="outline"
                                className="w-full">
                                {loading ? 'Lädt...' : 'Starten'}
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className="relative flex flex-col border-2 border-primary shadow-lg">
                        <span className="absolute inset-x-0 -top-3 mx-auto flex h-6 w-fit items-center rounded-full bg-gradient-to-br from-purple-400 to-amber-300 px-3 py-1 text-xs font-medium text-amber-950 shadow-md">Popular</span>

                        <CardHeader>
                            <CardTitle className="font-medium">Pro</CardTitle>
                            <span className="my-3 block text-2xl font-semibold">15€ / mo</span>
                            <CardDescription className="text-sm">Pro Nutzer</CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <hr className="border-dashed" />
                            <ul className="list-outside space-y-3 text-sm">
                                {['Unbegrenzte Termine', 'Unbegrenzter Cloud Speicher', 'Email Support', 'Monthly Product Updates', 'Standard Sicherheit Features'].map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-2">
                                        <Check className="size-3" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>

                        <CardFooter className="mt-auto">
                            <Button
                                onClick={() => handleCheckout('price_1SpCEHLF1PJBnUS7CPNPranN')}
                                disabled={loading}
                                className="w-full bg-black text-white hover:bg-gray-800">
                                {loading ? 'Lädt...' : 'Starten'}
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className="flex flex-col border border-border shadow-sm">
                        <CardHeader>
                            <CardTitle className="font-medium">Unternehmen</CardTitle>
                            <span className="my-3 block text-2xl font-semibold">Lass uns sprechen</span>
                            <CardDescription className="text-sm"><span className="text-white">.</span></CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <hr className="border-dashed" />

                            <ul className="list-outside space-y-3 text-sm">
                                {['Alles aus dem Pro Plan', 'Premium Support', 'Priorisierung bei Anfragen'].map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-2">
                                        <Check className="size-3" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>

                        <CardFooter className="mt-auto">
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => setShowContactForm(true)}
                            >
                                Schreib uns
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
            {showContactForm && (
                <ContactForm onClose={() => setShowContactForm(false)} />
            )}
        </section>
    )
}
