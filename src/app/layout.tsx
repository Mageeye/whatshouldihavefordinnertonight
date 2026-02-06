import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'

const inter = Inter({ subsets: ['latin'] })

const BASE_URL = 'https://www.dinnerdecisionmaker.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Dinner Decision Maker | What Should I Have for Dinner Tonight?',
    template: '%s | Dinner Decision Maker',
  },
  description:
    'Decide what to have for dinner in under 60 seconds. Generate recipes from pantry ingredients, find restaurants near you, or spin the wheel to choose.',
  keywords: [
    'what should I have for dinner',
    'dinner ideas',
    'recipe generator',
    'meal ideas',
    'what to eat tonight',
    'dinner decision',
    'pantry recipes',
    'quick dinner ideas',
  ],
  authors: [{ name: 'Dinner Decision Maker' }],
  creator: 'Dinner Decision Maker',
  publisher: 'Dinner Decision Maker',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Dinner Decision Maker',
    title: 'Dinner Decision Maker | What Should I Have for Dinner Tonight?',
    description:
      'Decide what to have for dinner in under 60 seconds. Generate recipes from pantry ingredients, find restaurants near you, or spin the wheel.',
    images: [
      {
        url: '/logo/logo.png',
        width: 512,
        height: 512,
        alt: 'Dinner Decision Maker',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dinner Decision Maker',
    description: 'Decide what to have for dinner in under 60 seconds.',
    images: ['/logo/logo.png'],
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
  alternates: {
    canonical: BASE_URL,
  },
  verification: {
    // Add your Google Search Console verification code here when you get it
    // google: 'your-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo/logo.png" />
        <link rel="apple-touch-icon" href="/logo/logo.png" />
      </head>
      <body className={inter.className}>
        <GoogleAnalytics />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
