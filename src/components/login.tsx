'use client'

import { useState, FormEvent, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { LogoIcon } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { toast } from 'sonner'

interface LoginProps {
  isSignup?: boolean
}

export default function Login({ isSignup = false }: LoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { signIn, signUp } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const registered = searchParams?.get('registered')

  useEffect(() => {
    if (registered) {
      toast.success('Registrierung erfolgreich! Bitte bestätigen Sie Ihre E-Mail.') 
      // Entferne den Parameter aus der URL
      const url = new URL(window.location.href)
      url.searchParams.delete('registered')
      window.history.replaceState({}, '', url.toString())
    }
  }, [registered])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (isSignup && !termsAccepted) {
      toast.error('Bitte akzeptieren Sie die AGB und Datenschutzerklärung, um sich zu registrieren.')
      return
    }
    
    setIsLoading(true)

    try {
      if (isSignup) {
        const { error, data } = await signUp(email, password, name)
        if (error) throw error
        
        if (data?.emailConfirmationSent) {
          toast.success('Registrierung erfolgreich! Bitte bestätigen Sie Ihre E-Mail.')
          router.push('/login')
        }
      } else {
        const { error } = await signIn(email, password)
        if (error) throw error
        // Redirect to home page after successful login
        router.push('/')
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Ein Fehler ist aufgetreten')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <form
        onSubmit={handleSubmit}
        className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]"
      >
        <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
          <div className="text-center">
            <Link href="/" aria-label="go home" className="mx-auto block w-fit">
              <LogoIcon />
            </Link>
            <h1 className="mb-1 mt-4 text-xl font-semibold">
              {isSignup ? 'Konto erstellen' : 'Anmelden'}
            </h1>
            <p className="text-sm">
              {isSignup ? 'Erstellen Sie ein Konto, um loszulegen' : 'Willkommen zurück! Bitte melden Sie sich an'}
            </p>
          </div>

          <div className="mt-6 space-y-6">
            {isSignup && (
              <div className="space-y-2">
                <Label htmlFor="name" className="block text-sm">
                  Vollständiger Name
                </Label>
                <Input
                  type="text"
                  required={isSignup}
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            )}
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
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="block text-sm">
                Passwort
              </Label>
              <Input
                type="password"
                required
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            {isSignup && (
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-2 focus:ring-primary cursor-pointer"
                    disabled={isLoading}
                  />
                  <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                    Ich habe die{' '}
                    <Link href="/agbs" target="_blank" className="text-primary hover:underline">
                      AGB
                    </Link>
                    {' '}und die{' '}
                    <Link href="/datenschutz" target="_blank" className="text-primary hover:underline">
                      Datenschutzerklärung
                    </Link>
                    {' '}gelesen und akzeptiere sie.
                  </label>
                </div>
                <p className="text-xs text-muted-foreground">
                  Mit der Registrierung erhältst du sofort Zugriff auf Mailkalender.
                </p>
              </div>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Wird geladen...' : isSignup ? 'Konto erstellen' : 'Anmelden'}
            </Button>
          </div>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            {isSignup ? (
              <>
                Sie haben bereits ein Konto?{' '}
                <Link href="/login" className="text-primary hover:underline">
                  Anmelden
                </Link>
              </>
            ) : (
              <>
                Noch kein Konto?{' '}
                <Link href="/signup" className="text-primary hover:underline">
                  Jetzt registrieren
                </Link>
              </>
            )}
          </p>
        </div>
      </form>
    </section>
  )
}