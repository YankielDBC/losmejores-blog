'use client'

import { motion } from 'framer-motion'
import { Star, Check, X, Shield, Truck, Award, ChevronDown, ExternalLink, AlertCircle } from 'lucide-react'
import { useParams } from 'next/navigation'
import realProductsData from '../../data/realProducts.json'
import Link from 'next/link'

function getProduct(slug: string) {
  const products = realProductsData.products || []
  return products.find((p: any) => p.slug === slug) || null
}

function getRelatedProducts(currentSlug: string, category: string, limit = 3) {
  const products = realProductsData.products || []
  return products
    .filter((p: any) => p.category === category && p.slug !== currentSlug)
    .slice(0, limit)
}

function getAffiliateLink(asin: string) {
  return `https://www.amazon.com/dp/${asin}?tag=vh0805-20`
}

const practicalContent: Record<string, any> = {
  'wireless-noise-cancelling-headphone-0': {
    quickVerdict: {
      buy: 'Yes, if you value silence and premium sound quality',
      avoid: 'No, if you are looking for something budget-friendly or water-resistant',
      priceRange: '$50-150 - Good value for what you get'
    },
    whoIsFor: {
      ideal: [
        'Frequent travelers who need to block out noise',
        'Professionals working in noisy offices',
        'Anyone wanting the best sound quality without spending a fortune'
      ],
      notFor: [
        'Athletes who sweat a lot (not water-resistant)',
        'Budget-conscious buyers looking for the cheapest option',
        'Those who prefer neutral sound for audio production'
      ],
      scenarios: [
        { scenario: '10-hour flight', recommendation: 'Perfect - noise cancellation makes the flight tolerable' },
        { scenario: 'Open office', recommendation: 'Excellent - you can focus on working' },
        { scenario: 'Gym/Running', recommendation: 'Caution - not sweat-resistant' },
        { scenario: 'Quiet home', recommendation: 'Great - sound is excellent for music' },
        { scenario: 'Work calls', recommendation: 'Very good - microphones capture your voice clearly' }
      ]
    },
    whatYouGet: {
      good: [
        'Excellent noise cancellation (comparable to Bose)',
        'Balanced and detailed sound',
        'Battery that lasts for weeks',
        'Comfortable for hours of use'
      ],
      missing: [
        'Not water-resistant',
        'No wireless charging',
        'Case is larger than some competitors'
      ],
      surprises: [
        'App has equalizer to adjust sound',
        'Can connect to 2 devices simultaneously',
        'Transparency mode is better than expected'
      ]
    },
    useCases: [
      { scenario: 'Listening to music while working', verdict: 'Perfect - sound is immersive and cancellation isolates you', rating: '5/5' },
      { scenario: 'Watching movies on a plane', verdict: 'Excellent - you forget the engine noise', rating: '5/5' },
      { scenario: 'Zoom calls', verdict: 'Very good - people hear you clearly', rating: '4/5' },
      { scenario: 'Exercise', verdict: 'Not recommended - sweat may damage them', rating: '2/5' },
      { scenario: 'Sleeping', verdict: 'Depends - may be uncomfortable on your side', rating: '3/5' }
    ],
    comparison: {
      cheaper: { name: 'Generic headphones $30', whyBetter: 'Lighter but cancellation and sound are much inferior', price: '$30' },
      expensive: { name: 'AirPods Max ($549)', whyBetter: 'Heavier, same ANC quality, but much more expensive', price: '$549' },
      alternative: { name: 'Bose QC45 ($329)', whyBetter: 'If you prioritize extreme comfort over sound', price: '$329' }
    },
    pros: [
      { item: 'Noise cancellation', impact: 'Excellent - reduces 90% of ambient noise' },
      { item: 'Sound quality', impact: 'Very good - balanced bass, clear details' },
      { item: 'Battery', impact: '30 hours - lasts for days without charging' },
      { item: 'Comfort', impact: 'Soft ear cushions, lightweight' }
    ],
    cons: [
      { item: 'Not water-resistant', severity: 'minor', reason: 'Not for sweat, but works in light rain' },
      { item: 'No wireless charging', severity: 'minor', reason: 'USB-C but not Qi' },
      { item: 'Price', severity: 'major', reason: 'Not cheap, but worth every dollar' }
    ],
    faq: [
      { q: 'Are they worth it?', a: 'Yes, if you use headphones regularly. Noise cancellation changes how you listen.', shortAnswer: 'Yes, worth it' },
      { q: 'Real battery life?', a: '25-30 hours with ANC, charges in ~3 hours', shortAnswer: '~27 hours' },
      { q: 'Good for calls?', a: 'Yes, microphones are good for calls in not very noisy environments.', shortAnswer: 'Yes' },
      { q: 'iPhone and Android compatible?', a: 'Works with both, but iPhone has better integration with AAC.', shortAnswer: 'Both' }
    ],
    conclusion: 'These headphones are an excellent investment if you value sound quality and silence. They are versatile for almost any situation except intense exercise. The price is premium but justified by the performance.',
    score: 4.4
  }
}

function generateCategoryContent(slug: string, category: string, title: string, price: number, rating: number) {
  const categoryTemplates: Record<string, any> = {
    audio: {
      quickVerdict: {
        buy: price < 150 ? 'Yes, excellent price-quality ratio' : 'Depends on budget',
        avoid: 'No if you already have AirPods or Bose',
        priceRange: price < 100 ? 'Great value' : 'Premium price'
      },
      whoIsFor: {
        ideal: ['Music lovers seeking good quality', 'Users who want wireless freedom'],
        notFor: ['Audiophiles seeking perfect sound', 'Very limited budget'],
        scenarios: [
          { scenario: 'Daily music', recommendation: 'Good - solid sound quality' },
          { scenario: 'Calls', recommendation: 'Acceptable - adequate microphone' },
          { scenario: 'Exercise', recommendation: category === 'audio' ? 'Check water resistance' : 'Appropriate' }
        ]
      },
      whatYouGet: {
        good: ['Quality sound', 'Modern design', 'Bluetooth connectivity'],
        missing: ['Depends on specific model'],
        surprises: ['Battery lasts longer than expected']
      },
      useCases: [
        { scenario: 'Listening to music', verdict: 'Decent sound for the price', rating: '4/5' },
        { scenario: 'Videos/Movies', verdict: 'Good overall performance', rating: '4/5' }
      ],
      comparison: {
        cheaper: { name: 'Cheaper options $20-50', whyBetter: 'Lower price but acceptable quality', price: '$20-50' },
        expensive: { name: 'Premium ($300+)', whyBetter: 'Better sound but not 3x better', price: '$300+' },
        alternative: { name: 'AirPods', whenBetter: 'If you use iPhone', price: '$150-250' }
      },
      pros: [
        { item: 'Sound quality', impact: 'Good price-quality ratio' },
        { item: 'Comfort', impact: 'Suitable for prolonged use' }
      ],
      cons: [
        { item: 'Battery', severity: 'minor', reason: 'Varies by model' }
      ],
      faq: [
        { q: 'Are they good?', a: 'Yes, considering the price they offer good quality.', shortAnswer: 'Yes' },
        { q: 'Compatible?', a: 'Works with any Bluetooth device.', shortAnswer: 'Universal' }
      ],
      conclusion: `This audio product offers competitive features in its price range. It is a solid option for those seeking quality without overspending.`,
      score: rating
    },
    default: {
      quickVerdict: {
        buy: price < 100 ? 'Yes, good price-quality ratio' : 'Depends on specific needs',
        avoid: 'No if you have something similar working',
        priceRange: price < 50 ? 'Great value' : 'Standard price'
      },
      whoIsFor: {
        ideal: ['Average user looking for basic functionality'],
        notFor: ['Advanced user with specific needs'],
        scenarios: [
          { scenario: 'Daily use', recommendation: 'Suitable for basic tasks' },
          { scenario: 'Heavy use', recommendation: 'Check specifications' }
        ]
      },
      whatYouGet: {
        good: ['Basic functionality met', 'Reliable brand', 'Technical support available'],
        missing: ['Advanced features'],
        surprises: ['Decent build quality']
      },
      useCases: [
        { scenario: 'Regular use', verdict: 'Meets expectations', rating: '4/5' }
      ],
      comparison: {
        cheaper: { name: 'Generic alternatives', whyBetter: 'Lower price', price: '$10-30' },
        expensive: { name: 'Premium', whyBetter: 'More features but higher price', price: '$200+' },
        alternative: { name: 'Similar competitors', whenBetter: 'Depends on specific use', price: '$50-150' }
      },
      pros: [
        { item: 'Functionality', impact: 'Meets basics' },
        { item: 'Price', impact: 'Accessible' }
      ],
      cons: [
        { item: 'Limited features', severity: 'minor', reason: 'No advanced functions' }
      ],
      faq: [
        { q: 'Would you recommend?', a: 'Yes, for basic use it works well.', shortAnswer: 'Yes' }
      ],
      conclusion: `It is a practical option for basic needs. Not the most advanced, but it gets the job done.`,
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Product not found</h1>
          <Link href="/" className="text-yellow-600 hover:underline font-medium">
            Back to home
          </Link>
        </div>
      </div>
    )
  }
  
  const affiliateLink = getAffiliateLink(product.asin)
  const content = practicalContent[slug] || generateCategoryContent(slug, product.category, product.title, product.price, product.rating)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-yellow-400">Home</Link> / 
            <Link href={`/category/${product.category}`} className="hover:text-yellow-400 ml-2 capitalize">{product.category}</Link> / 
            <span className="text-white ml-2">Review</span>
          </nav>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="text-yellow-400 text-sm font-semibold tracking-wider uppercase">
                Review 2026
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
                  <span className="text-gray-400">({product.reviews.toLocaleString()} reviews)</span>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-all hover:scale-105 shadow-lg"
                >
                  View Price on Amazon
                  <ExternalLink className="w-5 h-5" />
                </a>
                <Link
                  href={`/category/${product.category}`}
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all"
                >
                  More in {product.category}
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

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Quick Verdict */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 mb-12 border-l-4 border-yellow-400">
          <h2 className="text-2xl font-bold mb-4">Quick Verdict</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-xl">
              <h3 className="font-bold text-green-800 mb-2">BUY IF:</h3>
              <p className="text-green-900">{content.quickVerdict.buy}</p>
            </div>
            <div className="bg-red-50 p-4 rounded-xl">
              <h3 className="font-bold text-red-800 mb-2">AVOID IF:</h3>
              <p className="text-red-900">{content.quickVerdict.avoid}</p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <span className="text-2xl font-bold text-gray-700">{content.quickVerdict.priceRange}</span>
          </div>
        </div>

        {/* Who is this for? */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Who Is This For?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-green-50 p-6 rounded-xl">
              <h3 className="font-bold text-green-800 text-lg mb-4">IDEAL FOR:</h3>
              <ul className="space-y-3">
                {content.whoIsFor.ideal.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-green-900">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 p-6 rounded-xl">
              <h3 className="font-bold text-red-800 text-lg mb-4">NOT FOR:</h3>
              <ul className="space-y-3">
                {content.whoIsFor.notFor.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <X className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-red-900">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="font-bold text-xl mb-4">In These Situations:</h3>
            <div className="space-y-3">
              {content.whoIsFor.scenarios.map((scen: any, i: number) => (
                <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
                  <span className="font-medium w-32">{scen.scenario}</span>
                  <span className="flex-1">{scen.recommendation}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What you get */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">What You Get (And What You Don't)</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-green-50 p-6 rounded-xl">
              <h3 className="font-bold text-green-800 mb-4">THE GOOD</h3>
              <ul className="space-y-2">
                {content.whatYouGet.good.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-1" />
                    <span className="text-green-900 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 p-6 rounded-xl">
              <h3 className="font-bold text-red-800 mb-4">MISSING</h3>
              <ul className="space-y-2">
                {content.whatYouGet.missing.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-600 mt-1" />
                    <span className="text-red-900 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-yellow-50 p-6 rounded-xl">
              <h3 className="font-bold text-yellow-800 mb-4">SURPRISES</h3>
              <ul className="space-y-2">
                {content.whatYouGet.surprises.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <Award className="w-4 h-4 text-yellow-600 mt-1" />
                    <span className="text-yellow-900 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Real World Use Cases</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.useCases.map((useCase: any, i: number) => (
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
          <h2 className="text-2xl font-bold mb-6">Comparison</h2>
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-xl flex justify-between items-center">
              <div>
                <span className="font-bold text-green-800">CHEAPER: {content.comparison.cheaper.name}</span>
                <p className="text-green-700 text-sm">{content.comparison.cheaper.whyBetter}</p>
              </div>
              <span className="text-green-800 font-bold text-lg">{content.comparison.cheaper.price}</span>
            </div>
            <div className="bg-red-50 p-4 rounded-xl flex justify-between items-center">
              <div>
                <span className="font-bold text-red-800">MORE EXPENSIVE: {content.comparison.expensive.name}</span>
                <p className="text-red-700 text-sm">{content.comparison.expensive.whyWorse}</p>
              </div>
              <span className="text-red-800 font-bold text-lg">{content.comparison.expensive.price}</span>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl flex justify-between items-center">
              <div>
                <span className="font-bold text-blue-800">ALTERNATIVE: {content.comparison.alternative.name}</span>
                <p className="text-blue-700 text-sm">{content.comparison.alternative.whenBetter}</p>
              </div>
              <span className="text-blue-800 font-bold text-lg">{content.comparison.alternative.price}</span>
            </div>
          </div>
        </section>

        {/* Pros & Cons */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Pros and Cons</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-green-50 p-6 rounded-xl">
              <h3 className="text-green-800 font-bold text-xl mb-4">THE GOOD</h3>
              <ul className="space-y-3">
                {content.pros.map((pro: any, i: number) => (
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
              <h3 className="text-red-800 font-bold text-xl mb-4">THE ISSUES</h3>
              <ul className="space-y-3">
                {content.cons.map((con: any, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <AlertCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${con.severity === 'dealbreaker' ? 'text-red-600' : con.severity === 'major' ? 'text-orange-500' : 'text-yellow-500'}`} />
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
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {content.faq.map((faq: any, i: number) => (
              <details key={i} className="bg-gray-50 p-4 rounded-xl cursor-pointer group">
                <summary className="font-semibold text-lg flex justify-between items-center">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 group-open:rotate-180 transition" />
                </summary>
                <div className="mt-3 pl-2 border-l-2 border-yellow-400">
                  <p className="text-gray-700">{faq.a}</p>
                  <p className="mt-2 font-bold text-yellow-600">TL;DR: {faq.shortAnswer}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Bottom Line */}
        <section className="mb-12 bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">Bottom Line</h2>
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
            Buy on Amazon
          </a>
          <p className="mt-4 text-gray-500 text-sm">As an Amazon Associate, I earn from qualifying purchases</p>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 border-t pt-16">
            <h2 className="text-2xl font-bold mb-8">Related Products</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProducts.map((p: any) => (
                <Link key={p.slug} href={`/reviews/${p.slug}`} className="block group">
                  <div className="border rounded-xl overflow-hidden hover:shadow-lg transition bg-white">
                    <img src={p.image} alt={p.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="font-semibold group-hover:text-yellow-600 transition line-clamp-2 text-sm">{p.title}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-yellow-600 font-bold">${p.price}</span>
                        <span className="text-gray-500 text-sm">{p.rating}</span>
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
