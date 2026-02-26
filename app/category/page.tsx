'use client'

import { motion } from 'framer-motion'
import { Star, ArrowRight, ArrowLeft, Search, Grid3X3 } from 'lucide-react'
import productsData from '../../data/products.json'
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
  
  return Array.from(categoryMap.values()).sort((a: any, b: any) => b.count - a.count)
}

export default function CategoriesPage() {
  const categories = getCategories()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href="/" className="text-primary hover:text-accent font-medium flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-4">
            <Grid3X3 className="w-8 h-8 text-accent" />
            <h1 className="font-display text-3xl md:text-4xl font-bold text-primary">
              Todas las Categorías
            </h1>
          </div>
          <p className="text-text-muted max-w-xl">
            Explora nuestras categorías y encuentra las mejores reseñas de productos. 
            Selecciona una categoría para ver todos los productos analizados.
          </p>
          <p className="mt-2 text-accent font-medium">
            {categories.length} categorías • {productsData.products?.length || 0} productos
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category: any, index: number) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <Link
                  href={`/category/${category.slug}`}
                  className="block bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:transform hover:-translate-y-1 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-light">▣</span>
                    <span className="text-xs bg-accent/20 text-primary px-2 py-1 rounded-full font-medium">
                      {category.count}
                    </span>
                  </div>
                  <h3 className="font-bold text-primary mb-1 capitalize">
                    {category.name}
                  </h3>
                  <p className="text-sm text-text-muted">
                    {category.count} {category.count === 1 ? 'producto' : 'productos'}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Guía de Compra: Encuentra el Mejor Producto
          </h2>
          <div className="prose max-w-none text-gray-600">
            <p>
              En LosMejores.blog encontrarás las mejores reseñas de productos de las categorías más populares. 
              Ya sea que busques tecnológicos, gaming, hogar o fitness, tenemos análisis detallados para ayudarte.
            </p>
            <p className="mt-4">
              <strong>¿Cómo escolhemos los mejores productos?</strong> Nuestra metodología incluye investigación 
              exhaustiva, comparación de características, precios y análisis de opiniones de usuarios reales. 
              No nos importa qué marca sea la más popular — solo queremos encontrar los productos que realmente valen la pena.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-primary text-white text-center">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} LosMejores.blog - Como Asociado de Amazon, ganamos de compras calificadas.
        </p>
      </footer>
    </div>
  )
}
