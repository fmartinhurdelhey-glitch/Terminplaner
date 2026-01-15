'use client'

import { useEffect } from 'react'

export default function SentryTestPage() {
  useEffect(() => {
    // Wirft einen Test-Error
    throw new Error('🚨 Sentry Test Error - Wenn du das in Sentry siehst, funktioniert es!')
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Sentry Test</h1>
        <p>Wenn du diese Seite siehst, wurde der Error nicht geworfen (das sollte nicht passieren)</p>
      </div>
    </div>
  )
}
