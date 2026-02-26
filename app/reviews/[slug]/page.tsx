'use client'

import { motion } from 'framer-motion'
import { Star, Check, X, Shield, Truck, Award, ChevronDown, Mail, ExternalLink, RefreshCw } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import realProductsData from '../../data/realProducts.json'
import Link from 'next/link'

// Get product by slug
function getProduct(slug: string) {
  const products = realProductsData.products || []
  return products.find((p: any) => p.slug === slug) || null
}

// Get related products (same category)
function getRelatedProducts(currentSlug: string, category: string, limit = 3) {
  const products = realProductsData.products || []
  return products
    .filter((p: any) => p.category === category && p.slug !== currentSlug)
    .slice(0, limit)
}

// Generate affiliate link
function getAffiliateLink(asin: string) {
  return `https://www.amazon.com/dp/${asin}?tag=vh0805-20`
}

// FAQ Component
function FAQ({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      {faqs.map((faq, i) => (
        <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <button
            className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <span className="font-semibold text-gray-900">{faq.q}</span>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
          </button>
          {openIndex === i && (
            <div className="px-5 pb-5 text-gray-600">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// Comparison Table
function ComparisonTable({ products, currentProduct }: { products: any[]; currentProduct: any }) {
  const features = ['Precio', 'Rating', 'Reviews', 'Garantía']
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-gray-200">
            <th className="text-left py-4 px-4 font-bold text-gray-900">Características</th>
            {products.map((p: any) => (
              <th key={p.asin} className={`text-center py-4 px-4 ${p.asin === currentProduct.asin ? 'bg-accent/10' : ''}`}>
                <div className="text-sm font-semibold truncate max-w-[150px]">{p.title?.substring(0, 25)}...</div>
                {p.asin === currentProduct.asin && (
                  <span className="text-xs bg-accent text-white px-2 py-0.5 rounded-full">Nuestro Pick</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((feature) => (
            <tr key={feature} className="border-b border-gray-100">
              <td className="py-3 px-4 font-medium text-gray-700">{feature}</td>
              {products.map((p: any) => (
                <td key={p.asin} className={`text-center py-3 px-4 ${p.asin === currentProduct.asin ? 'bg-accent/5' : ''}`}>
                  {feature === 'Precio' && <span className="font-bold text-accent">${p.price.toFixed(2)}</span>}
                  {feature === 'Rating' && (
                    <div className="flex items-center justify-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span>{p.rating}</span>
                    </div>
                  )}
                  {feature === 'Reviews' && <span className="text-gray-600">{p.reviews?.toLocaleString()}</span>}
                  {feature === 'Garantía' && <span className="text-green-600 font-medium">Amazon</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function ReviewPage() {
  const params = useParams()
  const slug = params?.slug as string
  const product = getProduct(slug)
  const relatedProducts = product ? getRelatedProducts(slug, product.category) : []
  
  const faqs = product ? [
    { q: '¿Vale la pena este producto?', a: 'Sí, es uno de los productos más vendidos en su categoría con excelentes reseñas de usuarios reales.' },
    { q: '¿Viene con garantía?', a: 'Amazon ofrece 30 días de devolución y el fabricante tiene garantía estándar de 1 año.' },
    { q: '¿El precio incluye envío?', a: 'Con Amazon Prime el envío es gratis y exprés. Sin Prime, varía según tu ubicación.' }
  ] : []

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Producto no encontrado</h1>
          <Link href="/" className="text-accent hover:underline font-medium">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    )
  }
  
  const affiliateLink = getAffiliateLink(product.asin)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-accent">Inicio</Link> / 
            <Link href={`/category/${product.category}`} className="hover:text-accent ml-1 capitalize">{product.category.replace(/-/g, ' ')}</Link> / 
            <span className="text-white ml-1">Review</span>
          </nav>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="text-accent text-sm font-semibold tracking-wider uppercase">
                ⭐ Review {new Date().getFullYear()}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-6 leading-tight">
                {product.title}
              </h1>
              <div className="flex items-center gap-4 mb-8 flex-wrap">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-6 h-6 ${i < Math.floor(product.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} 
                    />
                  ))}
                </div>
                <span className="text-xl font-semibold">{product.rating}/5</span>
                {product.reviews && (
                  <span className="text-gray-400">({product.reviews.toLocaleString()} reseñas)</span>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-accent text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-accent/90 transition-all hover:scale-105 shadow-lg"
                >
                  Ver Precio en Amazon
                  <ExternalLink className="w-5 h-5" />
                </a>
                <Link
                  href={`/category/${product.category}`}
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all"
                >
                  Ver más en {product.category.replace(/-/g, ' ')}
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="bg-white/10 rounded-3xl p-4 backdrop-blur-sm border border-white/10">
                <img 
                  src={product.image}
                  alt={product.title}
                  className="w-full h-auto rounded-2xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop'
                  }}
                />
                <div className="text-center mt-6">
                  <div className="text-3xl font-bold text-accent">
                    ${product.price.toFixed(2)}
                  </div>
                  <div className="text-gray-400 mt-1">{product.reviews?.toLocaleString()} opiniones</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-green-500" />
              <div>
                <div className="font-bold text-gray-900">Compra Segura</div>
                <div className="text-sm text-gray-500">Protección Amazon</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="w-8 h-8 text-blue-500" />
              <div>
                <div className="font-bold text-gray-900">Envío Rápido</div>
                <div className="text-sm text-gray-500">Prime disponible</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-accent" />
              <div>
                <div className="font-bold text-gray-900">Top Rated</div>
                <div className="text-sm text-gray-500">{product.rating}+ estrellas</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RefreshCw className="w-8 h-8 text-purple-500" />
              <div>
                <div className="font-bold text-gray-900">30 Días</div>
                <div className="text-sm text-gray-500">Devolución fácil</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Acerca de este producto</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            {product.description}
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Características Principales</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {product.features?.map((feature: string, i: number) => (
              <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pros & Cons */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-green-50 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-2">
                <Check className="w-7 h-7" />
                Lo Que Nos Gusta
              </h3>
              <ul className="space-y-4">
                {product.features?.slice(0, 5).map((feature: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-green-900">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-red-50 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-red-800 mb-6 flex items-center gap-2">
                <X className="w-7 h-7" />
                A Considerar
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                  <span className="text-red-900">Precio elevado respecto a alternativas básicas</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                  <span className="text-red-900">Requiere dispositivos compatibles para todas las funciones</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">⚖️ Comparación</h2>
            <p className="text-gray-600 mb-8">Compara este producto con otras opciones similares</p>
            <ComparisonTable products={[product, ...relatedProducts]} currentProduct={product} />
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">❓ Preguntas Frecuentes</h2>
          <FAQ faqs={faqs} />
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">🔗 Productos Relacionados</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProducts.map((p: any, i: number) => (
                <motion.div
                  key={p.asin}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="h-48 bg-gray-100 overflow-hidden">
                    <img 
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop'
                      }}
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-medium">{p.rating}</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 text-sm">
                      {p.title}
                    </h3>
                    <a
                      href={getAffiliateLink(p.asin)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors text-sm"
                    >
                      Ver en Amazon <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">📧 No Te Pierdas Ninguna Oferta</h2>
          <p className="text-gray-300 mb-8">Suscríbete y recibe las mejores recomendaciones directamente en tu email.</p>
          <form className="flex gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="Tu email"
                className="w-full pl-12 pr-4 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-accent"
              />
            </div>
            <button
              type="submit"
              className="bg-accent text-primary px-8 py-4 rounded-full font-semibold hover:bg-accent/90 transition-colors"
            >
              Suscribirse
            </button>
          </form>
        </div>
      </section>

      {/* Affiliate Disclosure */}
      <footer className="py-8 bg-gray-800 text-gray-400 text-sm text-center">
        <p>Como Asociado de Amazon, gano de compras calificadas.</p>
        <p className="mt-2">© {new Date().getFullYear()} LosMejores.blog - Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}
