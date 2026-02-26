import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'LosMejores.blog | Reseñas de los Mejores Productos 2026',
    template: '%s | LosMejores.blog'
  },
  description: 'Descubre los mejores productos del mercado con reseñas detalladas, comparativas y guías de compra actualizadas. Análisis independientes y honestos para {new Date().getFullYear()}.',
  keywords: [
    'reseñas de productos',
    'mejores productos 2026',
    'comparativas productos',
    'guías de compra',
    'reviews tecnología',
    'mejores marcas',
    'productos recomendados'
  ],
  authors: [{ name: 'LosMejores.blog' }],
  creator: 'LosMejores.blog',
  publisher: 'LosMejores.blog',
  metadataBase: new URL('https://losmejores.blog'),
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://losmejores.blog',
    siteName: 'LosMejores.blog',
    title: 'LosMejores.blog | Reseñas de los Mejores Productos 2026',
    description: 'Descubre los mejores productos del mercado con reseñas detalladas, comparativas y guías de compra actualizadas.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LosMejores.blog - Reseñas de Productos'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LosMejores.blog | Reseñas de los Mejores Productos 2026',
    description: 'Descubre los mejores productos del mercado con reseñas detalladas y comparativas.',
    images: ['/og-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: 'google-site-verification-code'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "LosMejores.blog",
              "url": "https://losmejores.blog",
              "description": "Reseñas de los mejores productos del mercado",
              "publisher": {
                "@type": "Organization",
                "name": "LosMejores.blog"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://losmejores.blog/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
