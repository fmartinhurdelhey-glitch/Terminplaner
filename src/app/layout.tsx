import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://www.mailkalender.de'),
  title: {
    default: 'Mailkalender - Terminplanung per E-Mail | Einfach & Effizient',
    template: '%s | Mailkalender'
  },
  description: 'Mailkalender revolutioniert Ihre Terminplanung - Organisieren Sie Meetings und Termine direkt per E-Mail. Keine zusätzliche Software nötig. Einfach, intuitiv und zeitsparend.',
  keywords: ['Terminplaner', 'E-Mail Kalender', 'Meeting planen', 'Terminverwaltung', 'Online Terminplanung', 'Mailkalender'],
  authors: [{ name: 'Mailkalender' }],
  creator: 'Mailkalender',
  publisher: 'Mailkalender',
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://www.mailkalender.de',
    title: 'Mailkalender - Terminplanung per E-Mail',
    description: 'Organisieren Sie Ihre Termine direkt per E-Mail. Einfach, intuitiv und ohne zusätzliche Software.',
    siteName: 'Mailkalender',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mailkalender - Terminplanung per E-Mail',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mailkalender - Terminplanung per E-Mail',
    description: 'Organisieren Sie Ihre Termine direkt per E-Mail. Einfach, intuitiv und ohne zusätzliche Software.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}