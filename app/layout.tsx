import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import { Oswald } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.olhonolancetv.com.br'),
  title: 'OLHO NO LANCE',
  description: 'Assista aos melhores lances e gols dos campos 1 e 2.',
  openGraph: {
    title: 'OLHO NO LANCE',
    description: 'Assista aos melhores lances e gols dos campos 1 e 2.',
    url: 'https://www.olhonolancetv.com.br',
    siteName: 'OLHO NO LANCE',
    images: [
      {
        url: '/logo_olho_no_lance.png',
        width: 512,
        height: 512,
        alt: 'Olho no Lance',
      },
    ],
    type: 'website',
  },
  icons: {
    icon: '/logo_olho_no_lance.png',
    apple: '/logo_olho_no_lance.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`dark ${geistSans.variable} ${oswald.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
