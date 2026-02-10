'use client'

import { ThemeProvider } from 'next-themes'
import { AuthProvider } from '@/context/AuthContext'
import ClientOnly from '@/components/ClientOnly'
import { Toaster } from 'sonner'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClientOnly>
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </AuthProvider>
    </ClientOnly>
  )
}
