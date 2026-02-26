import { MetadataRoute } from 'next'
import productsData from './data/realProducts.json'

// Get all products
const products = productsData.products || []

// Get all categories
const categories = [...new Set(products.map((p: any) => p.category))]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://losmejores.blog'
  
  const currentDate = new Date()
  
  // Main pages
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/category`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]
  
  // Category pages
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/category/${category}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
  
  // Product/review pages
  const productPages: MetadataRoute.Sitemap = products.map((product: any) => ({
    url: `${baseUrl}/reviews/${product.slug}`,
    lastModified: new Date(product.date || currentDate),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))
  
  return [...mainPages, ...categoryPages, ...productPages]
}
