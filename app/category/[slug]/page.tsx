'use client'

import { motion } from 'framer-motion'
import { Star, ArrowRight, Search, Filter } from 'lucide-react'
import productsData from '../../data/realProducts.json'
import Link from 'next/link'

// Category image mapping - Complete for all categories
const categoryImages: Record<string, string> = {
  'best wireless earbuds': 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=400&fit=crop',
  'best headphones': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop',
  'best gaming consoles': 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=600&h=400&fit=crop',
  'best smartwatches': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop',
  'best e-readers': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=400&fit=crop',
  'best streaming devices': 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&h=400&fit=crop',
  'best smart home': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
  'best smart speakers': 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=600&h=400&fit=crop',
  'best tvs': 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=400&fit=crop',
  'best robot vacuums': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
  'best laptops': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop',
  'best cell phones': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop',
  'best tablets': 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=400&fit=crop',
  'best computer accessories': 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=400&fit=crop',
  'best mechanical keyboards': 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=600&h=400&fit=crop',
  'best action cameras': 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&h=400&fit=crop',
  'best portable chargers': 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&h=400&fit=crop',
  'best bluetooth speakers': 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=400&fit=crop',
  'best fitness trackers': 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&h=400&fit=crop',
  'best drones': 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&h=400&fit=crop',
  'best vr headsets': 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=600&h=400&fit=crop',
  'best gaming headsets': 'https://images.unsplash.com/photo-1599669454699-248893623440?w=600&h=400&fit=crop',
  'best gaming laptops': 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&h=400&fit=crop',
  'best kitchen appliances': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
  'best hair care': 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=600&h=400&fit=crop',
  'best oral care': 'https://images.unsplash.com/photo-1559650656-5e7e3f496f97?w=600&h=400&fit=crop',
  'best outdoor gear': 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&h=400&fit=crop',
  'best fitness equipment': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop',
  'best office furniture': 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&h=400&fit=crop',
  'best gaming chairs': 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=600&h=400&fit=crop',
  'best nintendo switch games': 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=600&h=400&fit=crop',
  'best playstation games': 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&h=400&fit=crop',
  'best lego sets': 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&h=400&fit=crop',
}

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

// Get products by category - improved matching
function getProductsByCategory(categorySlug: string) {
  const products = productsData.products || []
  const searchTerm = categorySlug.replace(/-/g, ' ').toLowerCase()
  
  return products.filter((p: any) => {
    const productCat = (p.category || '').toLowerCase()
    return productCat.includes(searchTerm) || searchTerm.includes(productCat)
  })
}

export default async function CategoryPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const currentSlug = params.slug
  const categories = getCategories()
  const category = categories.find((c: any) => c.slug === currentSlug) || { name: currentSlug.replace(/-/g, ' '), slug: currentSlug, count: 0 }
  const products = getProductsByCategory(currentSlug)
  
  // Use first product image as category image, or fallback
  const categoryImage = products.length > 0 
    ? (products[0].image || categoryImages[category.name.toLowerCase()])
    : (categoryImages[category.name.toLowerCase()] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop')
  
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
            <Link href="/" className="hover:text-accent">Inicio</Link> / 
            <Link href="/category" className="hover:text-accent ml-1">Categorías</Link> / 
            <span className="text-white ml-1">{category.name}</span>
          </nav>
          
          <div className="flex gap-4 mt-4">
            <Link 
              href="/category" 
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
            >
              ← Todas las Categorías
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 capitalize">
            Mejores {category.name.replace('best ', '')}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Descubre nuestra selección de los mejores {category.name.toLowerCase().replace('best ', '')} del mercado. 
            Reseñas detalladas y comparativas actualizadas para {new Date().getFullYear()}.
          </p>
          <p className="mt-4 text-accent font-semibold">
            {products.length} {products.length === 1 ? 'producto' : 'productos'} analizados
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {products.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product: any, index: number) => (
                <motion.div
                  key={product.asin}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  {/* Product Image */}
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden group">
                    <img 
                      src={product.image || `https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop`}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop'
                      }}
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-primary shadow">
                      #{index + 1}
                    </div>
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
                        <span className="text-sm text-gray-500">({product.reviews.toLocaleString()})</span>
                      )}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-sm md:text-base">
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
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No hay productos en esta categoría todavía.</p>
              <Link href="/category" className="mt-4 inline-block text-accent hover:underline">
                Ver todas las categorías
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 capitalize">
            Guía de Compra: Los mejores {category.name.replace('best ', '')}
          </h2>
          <div className="prose max-w-none text-gray-600">
            <p>
              En LosMejores.blog analizamos los mejores {category.name.toLowerCase().replace('best ', '')} del mercado para ayudarte 
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
            {categories.filter((c: any) => c.slug !== currentSlug).slice(0, 12).map((cat: any) => (
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
