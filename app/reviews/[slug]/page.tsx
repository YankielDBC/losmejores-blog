'use client'

import { motion } from 'framer-motion'
import { Star, Check, X, ArrowRight, Shield, Truck, Award } from 'lucide-react'

// Fetch product data
async function getProduct(slug) {
  // This would fetch from database in production
  return {
    title: "Cargando...",
    asin: "",
    price: 0,
    rating: 0,
    image: "",
    pros: [],
    cons: [],
    specs: {},
    affiliateLink: "#"
  }
}

export default async function ReviewPage({ params }) {
  const { slug } = params
  const product = await getProduct(slug)
  
  const affiliateLink = `https://www.amazon.com/dp/${product.asin}?tag=vh0805-20`

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="text-accent text-sm font-semibold tracking-wider uppercase">
                Review 2026
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6">
                {product.title}
              </h1>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-6 h-6 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} 
                    />
                  ))}
                </div>
                <span className="text-xl font-semibold">{product.rating}/5</span>
              </div>
              <a
                href={affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-accent/90 transition-colors"
              >
                Ver Precio en Amazon
                <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <img
                src={product.image}
                alt={product.title}
                className="rounded-2xl shadow-2xl w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pros & Cons */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Pros */}
            <div className="bg-green-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-2">
                <Check className="w-6 h-6" />
                Pros
              </h3>
              <ul className="space-y-4">
                {product.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-green-900">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Cons */}
            <div className="bg-red-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-red-800 mb-6 flex items-center gap-2">
                <X className="w-6 h-6" />
                Contras
              </h3>
              <ul className="space-y-4">
                {product.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                    <span className="text-red-900">{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Specs Table */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Especificaciones Técnicas</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                {Object.entries(product.specs).map(([key, value]) => (
                  <tr key={key} className="border-b">
                    <td className="py-4 font-semibold text-gray-700 w-1/3">{key}</td>
                    <td className="py-4 text-gray-600">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <Shield className="w-10 h-10 mx-auto text-accent mb-2" />
              <p className="font-semibold">Compra Segura</p>
            </div>
            <div className="text-center">
              <Truck className="w-10 h-10 mx-auto text-accent mb-2" />
              <p className="font-semibold">Envío Rápido</p>
            </div>
            <div className="text-center">
              <Award className="w-10 h-10 mx-auto text-accent mb-2" />
              <p className="font-semibold">Garantía Amazon</p>
            </div>
            <div className="text-center">
              <Star className="w-10 h-10 mx-auto text-accent mb-2" />
              <p className="font-semibold">Reviews Verificados</p>
            </div>
          </div>
        </div>
      </section>

      {/* Affiliate Disclosure */}
      <section className="py-8 bg-gray-800 text-gray-400 text-sm text-center">
        <p>Como Asociado de Amazon, gano de compras calificadas.</p>
      </section>
    </div>
  )
}