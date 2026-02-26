'use client'

import { motion } from 'framer-motion'
import { Star, ArrowRight, ArrowLeft, Search, Grid3X3 } from 'lucide-react'
import productsData from '../data/realProducts.json'
import Link from 'next/link'

// Category images and colors mapping - All real categories
const categoryConfig: Record<string, { image: string; gradient: string; icon: string }> = {
  // Tech & Electronics
  'best-wireless-earbuds': { 
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop',
    gradient: 'from-violet-500 to-purple-400',
    icon: '🎧'
  },
  'best-headphones': { 
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    gradient: 'from-zinc-500 to-neutral-400',
    icon: '🎧'
  },
  'best-gaming-consoles': { 
    image: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=400&h=300&fit=crop',
    gradient: 'from-emerald-500 to-green-400',
    icon: '🎮'
  },
  'best-smartwatches': { 
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    gradient: 'from-blue-600 to-indigo-400',
    icon: '⌚'
  },
  'best-e-readers': { 
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop',
    gradient: 'from-amber-500 to-orange-400',
    icon: '📚'
  },
  'best-streaming-devices': { 
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&h=300&fit=crop',
    gradient: 'from-red-500 to-rose-400',
    icon: '📺'
  },
  'best-smart-home': { 
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    gradient: 'from-teal-500 to-cyan-400',
    icon: '🏠'
  },
  'best-smart-speakers': { 
    image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=400&h=300&fit=crop',
    gradient: 'from-sky-500 to-blue-400',
    icon: '🔊'
  },
  'best-tvs': { 
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop',
    gradient: 'from-indigo-500 to-purple-400',
    icon: '📺'
  },
  'best-robot-vacuums': { 
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    gradient: 'from-gray-500 to-slate-400',
    icon: '🤖'
  },
  'best-laptops': { 
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
    gradient: 'from-slate-600 to-gray-400',
    icon: '💻'
  },
  'best-cell-phones': { 
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
    gradient: 'from-blue-500 to-cyan-400',
    icon: '📱'
  },
  'best-tablets': { 
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
    gradient: 'from-purple-500 to-pink-400',
    icon: '📱'
  },
  'best-computer-accessories': { 
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop',
    gradient: 'from-orange-500 to-amber-400',
    icon: '🖱️'
  },
  'best-mechanical-keyboards': { 
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400&h=300&fit=crop',
    gradient: 'from-rose-500 to-pink-400',
    icon: '⌨️'
  },
  'best-action-cameras': { 
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop',
    gradient: 'from-gray-600 to-slate-400',
    icon: '📷'
  },
  'best-portable-chargers': { 
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=300&fit=crop',
    gradient: 'from-green-500 to-emerald-400',
    icon: '🔋'
  },
  'best-bluetooth-speakers': { 
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
    gradient: 'from-cyan-500 to-blue-400',
    icon: '🔊'
  },
  'best-fitness-trackers': { 
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=300&fit=crop',
    gradient: 'from-green-500 to-teal-400',
    icon: '⌚'
  },
  'best-drones': { 
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=300&fit=crop',
    gradient: 'from-slate-500 to-gray-400',
    icon: '🚁'
  },
  'best-vr-headsets': { 
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=400&h=300&fit=crop',
    gradient: 'from-indigo-600 to-purple-400',
    icon: '🥽'
  },
  'best-gaming-headsets': { 
    image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=300&fit=crop',
    gradient: 'from-violet-500 to-fuchsia-400',
    icon: '🎧'
  },
  'best-gaming-laptops': { 
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop',
    gradient: 'from-red-500 to-orange-400',
    icon: '💻'
  },
  // Home & Kitchen
  'best-kitchen-appliances': { 
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    gradient: 'from-amber-500 to-yellow-400',
    icon: '🍳'
  },
  'best-hair-care': { 
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=400&h=300&fit=crop',
    gradient: 'from-pink-500 to-rose-400',
    icon: '💇'
  },
  'best-oral-care': { 
    image: 'https://images.unsplash.com/photo-1559650656-5e7e3f496f97?w=400&h=300&fit=crop',
    gradient: 'from-blue-400 to-cyan-400',
    icon: '🦷'
  },
  'best-outdoor-gear': { 
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=300&fit=crop',
    gradient: 'from-green-600 to-emerald-400',
    icon: '⛺'
  },
  'best-fitness-equipment': { 
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
    gradient: 'from-orange-500 to-red-400',
    icon: '🏋️'
  },
  'best-office-furniture': { 
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&h=300&fit=crop',
    gradient: 'from-brown-500 to-amber-400',
    icon: '🪑'
  },
  'best-gaming-chairs': { 
    image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&h=300&fit=crop',
    gradient: 'from-red-600 to-orange-400',
    icon: '🪑'
  },
  // Games & Toys
  'best-nintendo-switch-games': { 
    image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&h=300&fit=crop',
    gradient: 'from-red-500 to-pink-400',
    icon: '🎮'
  },
  'best-playstation-games': { 
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop',
    gradient: 'from-blue-600 to-indigo-400',
    icon: '🎮'
  },
  'best-lego-sets': { 
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=300&fit=crop',
    gradient: 'from-yellow-500 to-orange-400',
    icon: '🧱'
  },
  // Fallback
  default: { 
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    gradient: 'from-indigo-500 to-violet-400',
    icon: '⭐'
  }
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
      const config = categoryConfig[slug] || categoryConfig.default
      categoryMap.set(slug, { 
        name: cat, 
        slug, 
        count: 1,
        image: config.image,
        gradient: config.gradient,
        icon: config.icon
      })
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category: any, index: number) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <Link
                  href={`/category/${category.slug}`}
                  className="block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:transform hover:-translate-y-1 transition-all group"
                >
                  {/* Category Image */}
                  <div className={`h-32 bg-gradient-to-br ${category.gradient || 'from-gray-400 to-gray-500'} relative overflow-hidden`}>
                    {category.image && (
                      <img 
                        src={category.image} 
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    <span className="absolute bottom-2 right-2 text-3xl drop-shadow-lg">
                      {category.icon || '⭐'}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-primary capitalize group-hover:text-accent transition-colors">
                        {category.name}
                      </h3>
                      <span className="text-xs bg-accent/20 text-primary px-2 py-1 rounded-full font-medium">
                        {category.count}
                      </span>
                    </div>
                    <p className="text-sm text-text-muted">
                      {category.count} {category.count === 1 ? 'producto' : 'productos'}
                    </p>
                  </div>
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
