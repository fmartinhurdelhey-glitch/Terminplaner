'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Loader2, LogOut } from 'lucide-react'
import Link from 'next/link'
import { HeroHeader } from '@/components/header'
import FooterSection from '@/components/footer'
import { supabase } from '@/lib/supabase'

export default function ProfilePage() {
  const { user, loading, initialized, signOut } = useAuth()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const [isCancelling, setIsCancelling] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showResumeModal, setShowResumeModal] = useState(false)
  const [isResuming, setIsResuming] = useState(false)
  const [subscriptionData, setSubscriptionData] = useState<any>(null)
  const [loadingSubscription, setLoadingSubscription] = useState(true)
  
  // Lade aktuelle Subscription-Daten direkt aus Supabase
  useEffect(() => {
    const loadSubscription = async () => {
      if (!user) {
        setLoadingSubscription(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .single()

        if (!error && data) {
          setSubscriptionData(data)
        }
      } catch (err) {
        console.error('Error loading subscription:', err)
      } finally {
        setLoadingSubscription(false)
      }
    }

    loadSubscription()
  }, [user])

  // Abonnementstatus überprüfen (basierend auf frischen Daten aus Supabase)
  const isPaidUser = subscriptionData?.status === 'active' && 
    (subscriptionData?.plan?.toLowerCase() === 'pro' || subscriptionData?.plan?.toLowerCase() === 'lifetime')
  const isProSubscription = subscriptionData?.plan?.toLowerCase() === 'pro'
  const isLifetime = subscriptionData?.plan?.toLowerCase() === 'lifetime'
  const isFreeUser = !isPaidUser
  
  // Formatierung des Ablaufdatums (falls vorhanden)
  // Nimmt nur das Datum (ohne Uhrzeit/Zeitzone) um Verschiebungen zu vermeiden
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A'
    // Extrahiere nur YYYY-MM-DD aus dem Timestamp um Zeitzonen-Probleme zu vermeiden
    const datePart = dateString.split('T')[0] || dateString.split(' ')[0]
    const [year, month, day] = datePart.split('-').map(Number)
    // Erstelle Datum mit expliziten Werten (Monate sind 0-basiert)
    const date = new Date(year, month - 1, day)
    return date.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  useEffect(() => {
    console.log('Profile page mounted', { user, loading, initialized });
    setIsClient(true);
  }, []);

  // Show loading state while checking auth
  if (!isClient || !initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
          <p className="text-gray-600">Laden...</p>
        </div>
      </div>
    )
  }

  // If no user, show unauthorized message
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">Nicht autorisiert</p>
          <button
            onClick={() => router.push('/login')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Zum Login
          </button>
        </div>
      </div>
    )
  }

  const handleBack = () => {
    router.back()
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Fehler beim Abmelden:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <HeroHeader />
      <main className="flex-grow pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 pt-4">Mein Profil</h1>
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            {/* Profilkopf */}
            <div className="px-6 py-5 border-b border-gray-200 sm:px-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="flex-shrink-0">
                  <div className="h-24 w-24 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-3xl font-bold">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <div className="mt-2 flex items-center space-x-2">
                    <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${
                      isPaidUser 
                        ? 'bg-indigo-100 text-indigo-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {isLifetime ? 'Lifetime' : isProSubscription ? 'Pro' : 'Kostenlos'}
                    </span>
                    {/* Trial-Badge wenn in Testphase */}
                    {isProSubscription && subscriptionData?.trial_end && new Date(subscriptionData.trial_end) > new Date() && (
                      <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        Testphase
                      </span>
                    )}
                    {isProSubscription && (
                      <span className="text-sm text-gray-500">
                        {subscriptionData?.trial_end && new Date(subscriptionData.trial_end) > new Date()
                          ? (() => {
                              const trialEndDate = new Date(subscriptionData.trial_end);
                              const now = new Date();
                              const daysLeft = Math.ceil((trialEndDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                              return `Testphase endet in ${daysLeft} ${daysLeft === 1 ? 'Tag' : 'Tagen'} (${formatDate(subscriptionData.trial_end)})`;
                            })()
                          : subscriptionData?.cancel_at_period_end 
                            ? `Läuft ab: ${formatDate(subscriptionData?.current_period_end)}`
                            : subscriptionData?.current_period_end 
                              ? `Erneuert sich am: ${formatDate(subscriptionData.current_period_end)}`
                              : null
                        }
                      </span>
                    )}
                  </div>
                  
                  
                  <div className="mt-4">
                    {isPaidUser ? (
                      <div className="space-y-4">
                        {/* Pro-Subscription Buttons */}
                        {isProSubscription && (
                          subscriptionData?.cancel_at_period_end ? (
                            // Abo fortsetzen Button
                            <button
                              onClick={() => setShowResumeModal(true)}
                              disabled={isResuming}
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Abonnement fortsetzen
                            </button>
                          ) : (
                            // Kündigen Button
                            <button
                              onClick={() => setShowCancelModal(true)}
                              disabled={isCancelling}
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Abonnement kündigen
                            </button>
                          )
                        )}
                      </div>
                    ) : (
                      <Link
                        href="/pricing"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Upgrade auf Pro
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Kontoinformationen */}
            <div className="px-6 py-5">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Kontoinformationen</h3>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Vollständiger Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {user.firstName} {user.lastName}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">E-Mail-Adresse</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Mitglied seit</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {user.created_at ? new Date(user.created_at).toLocaleDateString('de-DE', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 'Nicht verfügbar'}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Abonnement-Status */}
            <div className="border-t border-gray-200 px-6 py-5">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Abonnement</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Aktueller Plan</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {user.subscription?.plan || 'Kein aktives Abonnement'}
                    </p>
                  </div>
                  {user.subscription?.status && (
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      user.subscription.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.subscription.status === 'active' ? 'Aktiv' : 'Inaktiv'}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Abmelde-Button */}
            <div className="bg-gray-50 px-6 py-4 text-right sm:px-6">
              <button
                onClick={handleSignOut}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                <LogOut className="-ml-1 mr-2 h-5 w-5" />
                Abmelden
              </button>
            </div>
          </div>
        </div>
        </div>
        <FooterSection />
      </main>

      {/* Fortsetzen-Modal */}
      {showResumeModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Abonnement fortsetzen?
              </h3>
              <div className="mt-4 space-y-3">
                <p className="text-sm text-gray-500">
                  Möchten Sie Ihr Pro-Abonnement wirklich fortsetzen?
                </p>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-sm text-green-800">
                    <strong>Was passiert nach dem Fortsetzen:</strong>
                  </p>
                  <ul className="mt-2 text-sm text-green-700 list-disc list-inside space-y-1">
                    <li>Die Kündigung wird rückgängig gemacht</li>
                    <li>Ihr Abo verlängert sich automatisch weiter</li>
                    <li>Sie behalten alle Pro-Features ohne Unterbrechung</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowResumeModal(false)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 font-medium"
              >
                Abbrechen
              </button>
              <button
                onClick={async () => {
                  setIsResuming(true)
                  try {
                    const { data: { session } } = await supabase.auth.getSession();
                    
                    if (!session?.access_token) {
                      alert('Keine gültige Session gefunden');
                      return;
                    }

                    const response = await fetch('/api/stripe/resume-subscription', {
                      method: 'POST',
                      headers: {
                        'Authorization': `Bearer ${session.access_token}`,
                      },
                    });

                    if (response.ok) {
                      setShowResumeModal(false);
                      window.location.reload();
                    } else {
                      const error = await response.json();
                      setShowResumeModal(false);
                      alert(error.error || 'Fehler beim Fortsetzen des Abonnements');
                    }
                  } catch (error) {
                    console.error('Resume error:', error);
                    alert('Fehler beim Fortsetzen des Abonnements');
                  } finally {
                    setIsResuming(false);
                  }
                }}
                disabled={isResuming}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isResuming ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    Wird bearbeitet...
                  </span>
                ) : (
                  'Jetzt fortsetzen'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Kündigungs-Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Abonnement kündigen?
              </h3>
              <div className="mt-4 space-y-3">
                <p className="text-sm text-gray-500">
                  Möchten Sie Ihr Pro-Abonnement wirklich kündigen?
                </p>
                
                {user?.subscription?.expiresAt && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-800">
                      <strong>Ihr Zugriff läuft ab am:</strong>
                      <br />
                      <span className="text-base font-semibold">
                        {formatDate(user.subscription.expiresAt)}
                      </span>
                    </p>
                  </div>
                )}
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-sm text-yellow-800">
                    <strong>Was passiert nach der Kündigung:</strong>
                  </p>
                  <ul className="mt-2 text-sm text-yellow-700 list-disc list-inside space-y-1">
                    <li>Sie können bis zum Ablaufdatum alle Pro-Features nutzen</li>
                    <li>Danach wechseln Sie automatisch zum kostenlosen Plan</li>
                    <li>Sie können jederzeit wieder upgraden</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 font-medium"
              >
                Abbrechen
              </button>
              <button
                onClick={async () => {
                  setIsCancelling(true)
                  try {
                    const { data: { session } } = await supabase.auth.getSession();
                    
                    if (!session?.access_token) {
                      alert('Keine gültige Session gefunden');
                      return;
                    }

                    const response = await fetch('/api/stripe/cancel-subscription', {
                      method: 'POST',
                      headers: {
                        'Authorization': `Bearer ${session.access_token}`,
                      },
                    });

                    if (response.ok) {
                      setShowCancelModal(false);
                      window.location.reload();
                    } else {
                      const error = await response.json();
                      setShowCancelModal(false);
                      alert(error.error || 'Fehler beim Kündigen des Abonnements');
                    }
                  } catch (error) {
                    console.error('Cancel error:', error);
                    alert('Fehler beim Kündigen des Abonnements');
                  } finally {
                    setIsCancelling(false);
                  }
                }}
                disabled={isCancelling}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCancelling ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    Wird bearbeitet...
                  </span>
                ) : (
                  'Jetzt kündigen'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
  )
}
