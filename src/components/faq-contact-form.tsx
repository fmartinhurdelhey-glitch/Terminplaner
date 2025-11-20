'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

export function FAQContactForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, question }),
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        setEmail('');
        setQuestion('');
      } else {
        console.error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="mt-8 text-center text-green-600">
        <p>Vielen Dank für deine Frage! Wir werden uns so schnell wie möglich bei dir melden.</p>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <div className="flex flex-col items-center justify-center gap-4 text-center sm:flex-row">
        <p className="text-lg font-medium">
          Keine Antwort auf deine Frage gefunden?
        </p>
        <Button 
          variant="outline" 
          onClick={() => setIsOpen(!isOpen)}
          className="whitespace-nowrap"
          type="button"
        >
          {isOpen ? 'Formular schließen' : 'Direkt bei uns melden'}
        </Button>
      </div>

      {isOpen && (
        <form onSubmit={handleSubmit} className="mx-auto mt-6 max-w-2xl space-y-4 rounded-lg bg-muted/50 p-6">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Deine E-Mail
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              placeholder="dein@beispiel.de"
              required
            />
          </div>
          <div>
            <label htmlFor="question" className="mb-1 block text-sm font-medium">
              Deine Frage
            </label>
            <Textarea
              id="question"
              value={question}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setQuestion(e.target.value)}
              placeholder="Schreibe hier deine Frage..."
              rows={4}
              required
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Wird gesendet...' : 'Abschicken'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
