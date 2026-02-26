'use client'

import { motion } from 'framer-motion'
import { Star, ArrowRight, Search, Filter } from 'lucide-react'
import productsData from '../data/products.json'
import Link from 'next/link'

// Get unique categories with count
function getCategories() {
  const products = productsData.products || []
  const categoryMap = new Map()
  
  products.forEach((product: any) => {
    const cat = product.category || 'other'
    const slug = cat.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    if (categoryMap.has(slug)) {
      categoryMap.get(slug).count++
    } else {
      categoryMap.set(slug, { name: cat, slug, count: 1 })
    }
  })
  
  return Array.from(categoryMap.values())
}

// Get products by category
function getProductsByCategory(categorySlug: string) {
  const products = productsData.products || []
  const cat = categorySlug.replace(/-/g, ' ')
  return products.filter((p: any) => 
    p.category.toLowerCase().includes(cat) || 
    cat.includes(p.category.toLowerCase())
  )
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const categories = getCategories()
  const category = categories.find((c: any) => c.slug === params.slug)
  const products = getProductsByCategory(params.slug)
  
  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Categoría no encontrada</h1>
          <Link href="/" className="text-accent hover:underline">Volver al inicio</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-accent">Inicio</Link> / <span className="text-white">{category.name}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Mejores {category.name}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Descubre nuestra selección de los mejores {category.name} del mercado. 
            Reseñas detalladas y comparativas actualizadas para {new Date().getFullYear()}.
          </p>
          <p className="mt-4 text-accent font-semibold">
            {products.length} productos analizados
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product: any, index: number) => (
              <motion.div
                key={product.asin}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <span className="text-6xl">⭐</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    {product.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                    )}
                    {product.reviews && (
                      <span className="text-sm text-gray-500">({product.reviews})</span>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                    {product.title}
                  </h3>
                  {product.price > 0 && (
                    <p className="text-2xl font-bold text-accent mb-4">
                      ${product.price.toFixed(2)}
                    </p>
                  )}
                  <Link
                    href={`/reviews/${product.slug}`}
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors"
                  >
                    Ver Review <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No hay productos en esta categoría todavía.</p>
            </div>
          )}
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Guía de Compra: {category.name}
          </h2>
          <div className="prose max-w-none text-gray-600">
            <p>
              En LosMejores.blog analizamos los mejores {category.name} del mercado para ayudarte 
              a tomar la mejor decisión de compra. Nuestra metodología incluye investigación 
              exhaustiva, comparación de características y análisis de opiniones de usuarios reales.
            </p>
            <p className="mt-4">
              Todos los productos que recomendamos pasan por nuestro proceso de selección riguroso. 
              No nos importa qué marca sea la más popular, solo nos importa encontrar los productos 
              que realmente valen la pena.
            </p>
          </div>
        </div>
      </section>

      {/* All Categories */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Otras Categorías</h2>
          <div className="flex flex-wrap gap-3">
            {categories.filter((c: any) => c.slug !== params.slug).map((cat: any) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="px-4 py-2 bg-white rounded-full border border-gray-200 hover:border-accent hover:text-accent transition-colors"
              >
                {cat.name} ({cat.count})
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Affiliate Disclosure */}
      <footer className="py-8 bg-gray-800 text-gray-400 text-sm text-center">
        <p>Como Asociado de Amazon, gano de compras calificadas.</p>
      </footer>
    </div>
  )
}
