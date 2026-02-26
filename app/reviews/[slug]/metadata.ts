import { Metadata } from 'next'
import realProductsData from '../../data/realProducts.json'

// Get all products
const products = realProductsData.products || []

// Get product by slug
function getProduct(slug: string) {
  return products.find((p: any) => p.slug === slug) || null
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = getProduct(params.slug)
  
  if (!product) {
    return {
      title: 'Producto no encontrado | LosMejores.blog',
    }
  }
  
  const categoryFormatted = product.category?.replace(/-/g, ' ') || 'Producto'
  const title = `${product.title} - Review Completa ${new Date().getFullYear()}`
  const description = `Review completa y detallada de ${product.title}. Rating: ${product.rating}/5 estrellas (${product.reviews?.toLocaleString()} reseñas). Precio: $${product.price}. ${categoryFormatted.charAt(0).toUpperCase() + categoryFormatted.slice(1)}. Lea nuestra opinión honesta.`
  
  return {
    title,
    description,
    keywords: [
      product.category?.replace(/-/g, ' ') || 'producto',
      'review',
      'reseña',
      'opiniones',
      'comparativa',
      'mejor',
      'Amazon',
    ],
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: product.date || new Date().toISOString(),
      authors: ['LosMejores.blog'],
      section: categoryFormatted,
      tags: [product.category?.replace(/-/g, ' ') || 'producto'],
      images: [
        {
          url: product.image || '/og-image.jpg',
          width: 800,
          height: 600,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [product.image || '/og-image.jpg'],
    },
    other: {
      'product:price:amount': String(product.price),
      'product:price:currency': 'USD',
      'product:rating:value': String(product.rating),
      'product:rating:max': '5',
      'product:reviews:count': String(product.reviews || 0),
    },
  }
}

export function generateStaticParams() {
  return products.map((product: any) => ({
    slug: product.slug,
  }))
}
