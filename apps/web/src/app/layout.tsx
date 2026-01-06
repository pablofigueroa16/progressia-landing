import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { Providers } from '@/components/providers'

const APP_NAME = 'Progressia'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-cabinet',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  applicationName: APP_NAME,
  description: 'Domina el trading con lecciones interactivas, quizzes y retos. Aprende a tu ritmo y compite con amigos.',
  keywords: ['trading', 'educación financiera', 'inversiones', 'bolsa', 'forex', 'crypto'],
  authors: [{ name: APP_NAME }],
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
    shortcut: '/favicon.png',
  },
  openGraph: {
    title: APP_NAME,
    description: 'Aprende Trading de forma Gamificada',
    type: 'website',
    images: ['/favicon.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_NAME,
    description: 'Aprende Trading de forma Gamificada',
    images: ['/favicon.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}

