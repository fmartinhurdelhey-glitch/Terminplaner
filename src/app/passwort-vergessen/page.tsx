'use client'

import { useState, FormEvent } from 'react'
import { HeroHeader } from '@/components/header'
import FooterSection from '@/components/footer'
import { LogoIcon } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'

export default function PasswortVergessenPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const redirectUrl = `${window.location.origin}/passwort-zuruecksetzen`
      console.log('Sending reset email to:', email)
      console.log('Redirect URL:', redirectUrl)
      
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      })

      console.log('Supabase response:', { data, error })

      if (error) throw error

      setEmailSent(true)
      toast.success('E-Mail zum Zurücksetzen wurde gesendet!')
    } catch (error) {
      console.error('Reset password error:', error)
      toast.error(error instanceof Error ? error.message : 'Ein Fehler ist aufgetreten')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <HeroHeader />
      <main className="min-h-screen">
        <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
          <div className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]">
            <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
              <div className="text-center">
                <Link href="/" aria-label="go home" className="mx-auto block w-fit">
                  <LogoIcon />
                </Link>
                <h1 className="mb-1 mt-4 text-xl font-semibold">
                  Passwort zurücksetzen
                </h1>
                <p className="text-sm">
                  {emailSent 
                    ? 'Prüfen Sie Ihr E-Mail-Postfach'
                    : 'Geben Sie Ihre E-Mail-Adresse ein'}
                </p>
              </div>

              {emailSent ? (
                <div className="mt-6 space-y-4">
                  <div className="rounded-lg bg-green-50 p-4 text-center">
                    <p className="text-sm text-green-800">
                      Wir haben Ihnen eine E-Mail mit einem Link zum Zurücksetzen Ihres Passworts gesendet.
                    </p>
                  </div>
                  <Link href="/login">
                    <Button variant="outline" className="w-full">
                      Zurück zum Login
                    </Button>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="block text-sm">
                      E-Mail
                    </Label>
                    <Input
                      type="email"
                      required
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      placeholder="ihre@email.de"
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Wird gesendet...' : 'Link senden'}
                  </Button>
                </form>
              )}

              <p className="mt-4 text-center text-sm text-muted-foreground">
                <Link href="/login" className="text-primary hover:underline">
                  Zurück zum Login
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </>
  )
}
