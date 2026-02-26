import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://losmejores.blog'),
  title: {
    default: 'LosMejores.blog | Reseñas Honestas de los Mejores Productos',
    template: '%s | LosMejores.blog',
  },
  description: 'Te ayudamos a encontrar lo mejor de lo mejor. Reseñas detalladas, comparativas y guías de compra de productos tecnológicos, gaming, hogar y más. 100% independiente.',
  keywords: ['reseñas', 'productos', 'mejores', 'comparativas', 'guías de compra', 'tecnología', 'gaming', 'amazon'],
  authors: [{ name: 'LosMejores.blog' }],
  creator: 'LosMejores.blog',
  publisher: 'LosMejores.blog',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://losmejores.blog',
    siteName: 'LosMejores.blog',
    title: 'LosMejores.blog | Reseñas Honestas de los Mejores Productos',
    description: 'Reseñas detalladas, comparativas y guías de compra 100% independientes.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LosMejores.blog - Reseñas Honestas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LosMejores.blog | Reseñas Honestas',
    description: 'Reseñas detalladas de los mejores productos del mercado',
    images: ['/og-image.jpg'],
    creator: '@losmejoresblog',
  },
  alternates: {
    canonical: 'https://losmejores.blog',
    languages: {
      es: 'https://losmejores.blog',
      en: 'https://losmejores.blog/en',
    },
  },
  category: 'shopping',
  classification: 'Product Reviews',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
