'use client'

import { useState, FormEvent, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { HeroHeader } from '@/components/header'
import FooterSection from '@/components/footer'
import { LogoIcon } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'

export default function PasswortZuruecksetzenPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isValidSession, setIsValidSession] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Prüfe ob der User über einen gültigen Reset-Link gekommen ist
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        setIsValidSession(true)
      }
    }
    checkSession()
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error('Die Passwörter stimmen nicht überein')
      return
    }

    if (password.length < 6) {
      toast.error('Das Passwort muss mindestens 6 Zeichen lang sein')
      return
    }

    setIsLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      })

      if (error) throw error

      toast.success('Passwort erfolgreich geändert!')
      router.push('/login')
    } catch (error) {
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
                  Neues Passwort festlegen
                </h1>
                <p className="text-sm">
                  Geben Sie Ihr neues Passwort ein
                </p>
              </div>

              {!isValidSession ? (
                <div className="mt-6 space-y-4">
                  <div className="rounded-lg bg-yellow-50 p-4 text-center">
                    <p className="text-sm text-yellow-800">
                      Der Link ist ungültig oder abgelaufen. Bitte fordern Sie einen neuen Link an.
                    </p>
                  </div>
                  <Link href="/passwort-vergessen">
                    <Button className="w-full">
                      Neuen Link anfordern
                    </Button>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="block text-sm">
                      Neues Passwort
                    </Label>
                    <Input
                      type="password"
                      required
                      name="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      minLength={6}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="block text-sm">
                      Passwort bestätigen
                    </Label>
                    <Input
                      type="password"
                      required
                      name="confirmPassword"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={isLoading}
                      minLength={6}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Wird gespeichert...' : 'Passwort ändern'}
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
