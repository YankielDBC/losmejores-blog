import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LosMejores.blog | Reseñas Honestas de los Mejores Productos',
  description: 'Te ayudamos a encontrar lo mejor de lo mejor. Reseñas detalladas, comparativas y guías de compra de productos tecnológicos, gaming y más.',
  keywords: 'reseñas, productos, mejores, comparativas, guías de compra, tecnología',
  openGraph: {
    title: 'LosMejores.blog | Reseñas Honestas',
    description: 'Reseñas detalladas de los mejores productos del mercado',
    url: 'https://losmejores.blog',
    siteName: 'LosMejores.blog',
    locale: 'es_ES',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
