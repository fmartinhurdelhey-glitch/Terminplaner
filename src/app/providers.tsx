'use client'

import { ThemeProvider } from 'next-themes'
import { AuthProvider } from '@/context/AuthContext'
import ClientOnly from '@/components/ClientOnly'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClientOnly>
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </AuthProvider>
    </ClientOnly>
  )
}
