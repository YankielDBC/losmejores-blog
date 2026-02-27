'use client'

import { motion } from 'framer-motion'
import { Star, Check, X, Shield, Truck, Award, ChevronDown, Mail, ExternalLink, RefreshCw, ThumbsUp, TrendingUp, Clock } from 'lucide-react'
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

// Practical review content - WHY to buy or avoid, not generic history
const practicalContent: Record<string, {
  // Section 1: Quick Verdict
  quickVerdict: {
    buy: string
    avoid: string
    priceRange: string
  }
  
  // Section 2: Who is this for?
  whoIsFor: {
    ideal: string[]
    notFor: string[]
    scenarios: { scenario: string; recommendation: string }[]
  }
  
  // Section 3: What you get
  whatYouGet: {
    good: string[]
    missing: string[]
    surprises: string[]
  }
  
  // Section 4: Real world use cases
  useCases: {
    scenario: string
    verdict: string
    rating: string
  }[]
  
  // Section 5: Comparison with alternatives
  comparison: {
    cheaper: { name: string; whyBetter: string; price: string }
    expensive: { name: string; whyWorse: string; price: string }
    alternative: { name: string; whenBetter: string; price: string }
  }
  
  // Section 6: Pros & Cons (honest)
  pros: { item: string; impact: string }[]
  cons: { item: string; severity: 'minor' | 'major' | 'dealbreaker'; reason: string }[]
  
  // Section 7: Practical FAQ
  faq: { q: string; a: string; shortAnswer: string }[]
  
  // Section 8: Bottom line
  conclusion: string
  score: number
}> = {
  'wireless-noise-cancelling-headphone-0': {
    quickVerdict: {
      buy: 'Sí, si valoras silencio y calidad de sonido premium',
      avoid: 'No, si buscas algo económico o resistente al agua',
      priceRange: '$50-150 - Buen valor por lo que obtienes'
    },
    whoIsFor: {
      ideal: [
        'Viajeros frecuentes que necesitan aislarse del ruido',
        'Profesionales que trabajan en oficinas ruidosas',
        'Cualquiera que quiera la mejor calidad de sonido sin gastar fortunas'
      ],
      notFor: [
        'Deportistas que sudan mucho (no son resistentes al agua)',
        'Budget-conscious que busca lo más barato',
        ' quienes prefieren sonido neutro para producción de audio'
      ],
      scenarios: [
        { scenario: 'Avión de 10 horas', recommendation: '✅ Perfecto - la cancelación de ruido hace el vuelo tolerable' },
        { scenario: 'Oficina open space', recommendation: '✅ Excelente - puedes concentrarte en trabajar' },
        { scenario: 'Gimnasio/Correr', recommendation: '⚠️ Cuidado - no son resistentes al sudor' },
        { scenario: 'Casa tranquila', recommendation: '✅ Genial - el sonido es excelente para música' },
        { scenario: 'Llamadas de trabajo', recommendation: '✅ Muy bueno - los micrófonos capturan bien tu voz' }
      ]
    },
    whatYouGet: {
      good: [
        'Excelente cancelación de ruido (comparable a Bose)',
        'Sonido equilibrado y detallado',
        'Batería que dura semanas',
        'Cómodos para horas de uso'
      ],
      missing: [
        'No son resistentes al agua',
        'No se cargan inalámbricamente',
        'El estuche es más grande que algunos competidores'
      ],
      surprises: [
        'La app tiene ecualizador para ajustar el sonido',
        'Puedes conectar a 2 dispositivos a la vez',
        'El modo transparencia es mejor de lo esperado'
      ]
    },
    useCases: [
      { scenario: 'Escuchar música mientras trabajas', verdict: '🎵 Perfecto - el sonido es inmersivo y la cancelación te aísla', rating: '⭐⭐⭐⭐⭐' },
      { scenario: 'Ver películas en el avión', verdict: '✈️Excelente - olvidas el ruido del motor', rating: '⭐⭐⭐⭐⭐' },
      { scenario: 'Llamadas de Zoom', verdict: '💼Muy bueno - te escuchan claramente', rating: '⭐⭐⭐⭐' },
      { scenario: 'Ejercicio', verdict: '🏃No recomendados - sudor puede dañarlos', rating: '⭐⭐' },
      { scenario: 'Dormir', verdict: '😴Depende - pueden ser incómodos de lado', rating: '⭐⭐⭐' }
    ],
    comparison: {
      cheaper: {
        name: 'Auriculares genéricos $30',
        whyBetter: 'Son más ligeros, pero la cancelación y sonido son muy inferiores',
        price: '$30'
      },
      expensive: {
        name: 'AirPods Max ($549)',
        whyWorse: 'Más pesados, misma calidad de ANC, pero mucho más caros',
        price: '$549'
      },
      alternative: {
        name: 'Bose QC45 ($329)',
        whenBetter: 'Si priorizas comodidad extrema sobre sonido',
        price: '$329'
      }
    },
    pros: [
      { item: 'Cancelación de ruido', impact: 'Excelente - reduce 90% del ruido ambiente' },
      { item: 'Calidad de sonido', impact: 'Muy buena - graves equilibrados, detalles claros' },
      { item: 'Batería', impact: '30 horas - dura días sin cargar' },
      { item: 'Comodidad', impact: 'Almohadillas suaves, peso ligero' }
    ],
    cons: [
      { item: 'No resistentes al agua', severity: 'minor', reason: 'No para sudor, pero funcionan en lluvia ligera' },
      { item: 'Sin carga inalámbrica', severity: 'minor', reason: 'USB-C pero no Qi' },
      { item: 'Precio', severity: 'major', reason: 'No son baratos, pero valen cada dólar' }
    ],
    faq: [
      { q: '¿Merecen la pena?', a: 'Sí, si usas auriculares regularmente. La cancelación de ruido cambia cómo escuchas.', shortAnswer: 'Sí, vale la pena' },
      { q: '¿Duración de batería real?', a: '25-30 horas con ANC, cargas en ~3 horas', shortAnswer: '~27 horas' },
      { q: '¿Sirven para llamada?', a: 'Sí, los micrófonos son buenos para llamadas en ambientes no muy ruidosos.', shortAnswer: 'Sí' },
      { q: '¿Compatibles con iPhone y Android?', a: 'Funcionan con ambos, pero iPhone tiene mejor integración con AAC.', shortAnswer: 'Ambos' }
    ],
    conclusion: 'Estos auriculares son una excelente inversión si valoras calidad de sonido y silencio. Son versátiles para prácticamente cualquier situación excepto ejercicio intenso. El precio es premium pero justificado por el rendimiento.',
    score: 4.4
  }
}

// Generate content based on category for products without specific content
function generateCategoryContent(slug: string, category: string, title: string, price: number, rating: number) {
  // Base content templates by category
  const categoryTemplates: Record<string, any> = {
    audio: {
      quickVerdict: {
        buy: price < 150 ? 'Sí, excelente relación calidad-precio' : 'Depende del presupuesto',
        avoid: 'No si tienes AirPods o Bose ya',
        priceRange: price < 100 ? '💰 Excelente valor' : '💰💰 Precio premium'
      },
      whoIsFor: {
        ideal: ['Melómanos que buscan buena calidad', 'Usuarios que quieren libertad sin cables'],
        notFor: ['Audiófilos que buscan sonido perfecto', 'Presupuesto muy limitado'],
        scenarios: [
          { scenario: 'Música diaria', recommendation: '✅ Bueno - calidad de sonido sólida' },
          { scenario: 'Llamadas', recommendation: '✅ Aceptable - micrófono adecuado' },
          { scenario: 'Ejercicio', recommendation: category === 'audio' ? '⚠️ Verificar resistencia al agua' : '✅ Apropiado' }
        ]
      },
      whatYouGet: {
        good: ['Sonido de calidad', 'Diseño moderno', 'Conectividad Bluetooth'],
        missing: ['Depende del modelo específico'],
        surprises: ['La batería dura más de lo esperado']
      },
      useCases: [
        { scenario: 'Escuchar música', verdict: '🎵 Sonido decente para el precio', rating: '⭐⭐⭐⭐' },
        { scenario: 'Videos/Películas', verdict: '🎬 Buen rendimiento general', rating: '⭐⭐⭐⭐' }
      ],
      comparison: {
        cheaper: { name: 'Opciones más económicas', whyBetter: 'Precio menor pero calidad aceptable', price: '$20-50' },
        expensive: { name: 'Premium ($300+)', whyWorse: 'Mejor sonido pero no 3x mejor', price: '$300+' },
        alternative: { name: 'AirPods', whenBetter: 'Si usas iPhone', price: '$150-250' }
      },
      pros: [
        { item: 'Calidad de sonido', impact: 'Buena relación calidad-precio' },
        { item: 'Comodidad', impact: 'Adecuado para uso prolongado' }
      ],
      cons: [
        { item: 'Batería', severity: 'minor', reason: 'Varía por modelo' }
      ],
      faq: [
        { q: '¿Son buenos?', a: 'Sí, considerando el precio ofrecen buena calidad.', shortAnswer: 'Sí' },
        { q: '¿Compatibles?', a: 'Funcionan con cualquier dispositivo Bluetooth.', shortAnswer: 'Universal' }
      ],
      conclusion: `Este producto de audio ofrece características competitivas en su rango de precio. Es una opción sólida para quienes buscan calidad sin gastar demasiado.`,
      score: rating
    },
    default: {
      quickVerdict: {
        buy: price < 100 ? 'Sí, buena relación calidad-precio' : 'Depende de necesidades específicas',
        avoid: 'No si tienes algo similar funcionando',
        priceRange: price < 50 ? '💰 Excelente valor' : '💰💰 Precio estándar'
      },
      whoIsFor: {
        ideal: ['Usuario promedio buscando funcionalidad básica'],
        notFor: ['Usuario avanzado con necesidades específicas'],
        scenarios: [
          { scenario: 'Uso diario', recommendation: '✅ Adecuado para tareas básicas' },
          { scenario: 'Uso intensivo', recommendation: '⚠️ Verificar especificaciones' }
        ]
      },
      whatYouGet: {
        good: ['Funcionalidad básica cumplida', 'Marca confiable', 'Soporte técnico disponible'],
        missing: ['Características avanzadas'],
        surprises: ['Calidad de construcción decente']
      },
      useCases: [
        { scenario: 'Uso regular', verdict: '✅ Cumple expectativas', rating: '⭐⭐⭐⭐' }
      ],
      comparison: {
        cheaper: { name: 'Alternativas genéricas', whyBetter: 'Precio menor', price: '$10-30' },
        expensive: { name: 'Premium', whyWorse: 'Más features pero mayor precio', price: '$200+' },
        alternative: { name: 'Competidores similares', whenBetter: 'Depende del uso específico', price: '$50-150' }
      },
      pros: [
        { item: 'Funcionalidad', impact: 'Cumple lo básico' },
        { item: 'Precio', impact: 'Accesible' }
      ],
      cons: [
        { item: 'Features limitados', severity: 'minor', reason: 'No tiene funciones avanzadas' }
      ],
      faq: [
        { q: '¿Recomendarías?', a: 'Sí, para uso básico cumple bien.', shortAnswer: 'Sí' }
      ],
      conclusion: `Es una opción práctica para necesidades básicas. No es el más avanzado, pero cumple su función.`,
      score: rating
    }
  }
  
  return categoryTemplates[category] || categoryTemplates.default
}

export default function ReviewPage() {
  const params = useParams()
  const slug = params?.slug as string
  const product = getProduct(slug)
  const relatedProducts = product ? getRelatedProducts(slug, product.category) : []
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Producto no encontrado</h1>
          <Link href="/" className="text-yellow-600 hover:underline font-medium">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    )
  }
  
  const affiliateLink = getAffiliateLink(product.asin)
  
  // Get content - specific or generated
  const content = practicalContent[slug] || generateCategoryContent(slug, product.category, product.title, product.price, product.rating)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-yellow-400">Inicio</Link> / 
            <Link href={`/category/${product.category}`} className="hover:text-yellow-400 ml-2 capitalize">{product.category}</Link> / 
            <span className="text-white ml-2">Review</span>
          </nav>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="text-yellow-400 text-sm font-semibold tracking-wider uppercase">
                ⭐ Review 2026
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
                  className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-all hover:scale-105 shadow-lg"
                >
                  Ver Precio en Amazon
                  <ExternalLink className="w-5 h-5" />
                </a>
                <Link
                  href={`/category/${product.category}`}
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all"
                >
                  Ver más en {product.category}
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex justify-center"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full max-w-md rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-bold">
                  ${product.price.toFixed(2)}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Verdict */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Quick Verdict Banner */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 mb-12 border-l-4 border-yellow-400">
          <h2 className="text-2xl font-bold mb-4">🎯 Veredicto Rápido</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-xl">
              <h3 className="font-bold text-green-800 mb-2">✅ CÓMPRALO SI:</h3>
              <p className="text-green-900">{content.quickVerdict.buy}</p>
            </div>
            <div className="bg-red-50 p-4 rounded-xl">
              <h3 className="font-bold text-red-800 mb-2">❌ EVÍTALO SI:</h3>
              <p className="text-red-900">{content.quickVerdict.avoid}</p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <span className="text-2xl font-bold text-gray-700">{content.quickVerdict.priceRange}</span>
          </div>
        </div>

        {/* Who is this for? */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">👤 ¿Para Quién Es Este Producto?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-green-50 p-6 rounded-xl">
              <h3 className="font-bold text-green-800 text-lg mb-4">✅ IDEAL PARA:</h3>
              <ul className="space-y-3">
                {content.whoIsFor.ideal.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-green-900">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 p-6 rounded-xl">
              <h3 className="font-bold text-red-800 text-lg mb-4">❌ NO ES PARA:</h3>
              <ul className="space-y-3">
                {content.whoIsFor.notFor.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <X className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-red-900">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Scenarios */}
          <div className="mt-8">
            <h3 className="font-bold text-xl mb-4">📊 En Estas Situaciones:</h3>
            <div className="space-y-3">
              {content.whoIsFor.scenarios.map((scen, i) => (
                <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
                  <span className="font-medium w-32">{scen.scenario}</span>
                  <span className="flex-1">{scen.recommendation}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What you get / Don't get */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">📦 ¿Qué Obtienes (Y Qué No)?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-green-50 p-6 rounded-xl">
              <h3 className="font-bold text-green-800 mb-4">✅ LO BUENO</h3>
              <ul className="space-y-2">
                {content.whatYouGet.good.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-1" />
                    <span className="text-green-900 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 p-6 rounded-xl">
              <h3 className="font-bold text-red-800 mb-4">❌ LO QUE FALTA</h3>
              <ul className="space-y-2">
                {content.whatYouGet.missing.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-600 mt-1" />
                    <span className="text-red-900 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-yellow-50 p-6 rounded-xl">
              <h3 className="font-bold text-yellow-800 mb-4">😮 LO QUE SORPRENDE</h3>
              <ul className="space-y-2">
                {content.whatYouGet.surprises.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-yellow-600">✨</span>
                    <span className="text-yellow-900 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">🎯 Casos de Uso Reales</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.useCases.map((useCase, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
                <div className="flex justify-between items-start mb-3">
                  <span className="font-semibold">{useCase.scenario}</span>
                  <span className="text-yellow-600 font-bold">{useCase.rating}</span>
                </div>
                <p className="text-gray-600 text-sm">{useCase.verdict}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">⚖️ Comparación Práctica</h2>
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-xl flex justify-between items-center">
              <div>
                <span className="font-bold text-green-800">💰 MÁS BARATO: {content.comparison.cheaper.name}</span>
                <p className="text-green-700 text-sm">{content.comparison.cheaper.whyBetter}</p>
              </div>
              <span className="text-green-800 font-bold text-lg">{content.comparison.cheaper.price}</span>
            </div>
            <div className="bg-red-50 p-4 rounded-xl flex justify-between items-center">
              <div>
                <span className="font-bold text-red-800">💎 MÁS CARO: {content.comparison.expensive.name}</span>
                <p className="text-red-700 text-sm">{content.comparison.expensive.whyWorse}</p>
              </div>
              <span className="text-red-800 font-bold text-lg">{content.comparison.expensive.price}</span>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl flex justify-between items-center">
              <div>
                <span className="font-bold text-blue-800">🔄 ALTERNATIVA: {content.comparison.alternative.name}</span>
                <p className="text-blue-700 text-sm">{content.comparison.alternative.whenBetter}</p>
              </div>
              <span className="text-blue-800 font-bold text-lg">{content.comparison.alternative.price}</span>
            </div>
          </div>
        </section>

        {/* Pros & Cons */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">✅ Pros y ❌ Contras</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-green-50 p-6 rounded-xl">
              <h3 className="text-green-800 font-bold text-xl mb-4">✅ LO QUE ESTÁ BIEN</h3>
              <ul className="space-y-3">
                {content.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-green-900">{pro.item}</span>
                      <p className="text-green-700 text-sm">{pro.impact}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 p-6 rounded-xl">
              <h3 className="text-red-800 font-bold text-xl mb-4">❌ PROBLEMAS</h3>
              <ul className="space-y-3">
                {content.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <X className={`w-5 h-5 mt-0.5 flex-shrink-0 ${con.severity === 'dealbreaker' ? 'text-red-600' : con.severity === 'major' ? 'text-orange-500' : 'text-yellow-500'}`} />
                    <div>
                      <span className="font-medium text-red-900">{con.item}</span>
                      <p className="text-red-700 text-sm">{con.reason}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">❓ Preguntas Frecuentes</h2>
          <div className="space-y-4">
            {content.faq.map((faq, i) => (
              <details key={i} className="bg-gray-50 p-4 rounded-xl cursor-pointer group">
                <summary className="font-semibold text-lg flex justify-between items-center">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 group-open:rotate-180 transition" />
                </summary>
                <div className="mt-3 pl-2 border-l-2 border-yellow-400">
                  <p className="text-gray-700">{faq.a}</p>
                  <p className="mt-2 font-bold text-yellow-600">📌 TL;DR: {faq.shortAnswer}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Bottom Line */}
        <section className="mb-12 bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">🎯 Veredicto Final</h2>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl font-bold text-yellow-400">{content.score}</span>
            <span className="text-2xl">/ 5</span>
          </div>
          <p className="text-lg leading-relaxed">{content.conclusion}</p>
        </section>

        {/* CTA */}
        <div className="text-center py-8 border-t">
          <a
            href={affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow-400 text-gray-900 px-12 py-6 rounded-2xl font-bold text-xl hover:bg-yellow-300 transition shadow-lg"
          >
            Comprar en Amazon 🛒
          </a>
          <p className="mt-4 text-gray-500 text-sm">* Como Asociado de Amazon, ganamos de compras calificadas</p>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 border-t pt-16">
            <h2 className="text-2xl font-bold mb-8">Productos Relacionados</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProducts.map((p: any) => (
                <Link key={p.slug} href={`/reviews/${p.slug}`} className="block group">
                  <div className="border rounded-xl overflow-hidden hover:shadow-lg transition bg-white">
                    <img src={p.image} alt={p.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="font-semibold group-hover:text-yellow-600 transition line-clamp-2 text-sm">{p.title}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-yellow-600 font-bold">${p.price}</span>
                        <span className="text-gray-500 text-sm">⭐ {p.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
