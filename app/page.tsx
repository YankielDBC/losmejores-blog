'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Star, TrendingUp, Shield, ArrowRight, CheckCircle, Menu, X, Mail, ChevronDown, Flame, Zap, Grid3X3 } from 'lucide-react'
import productsData from './data/products.json'
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

// Get top rated products
function getTopProducts() {
  const products = productsData.products || []
  return [...products].sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0)).slice(0, 4)
}

// Components
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
  const categories = getCategories()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-white py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-display text-xl md:text-2xl font-bold text-primary">
            Los<span className="text-accent">Mejores</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-text-dark hover:text-accent transition-colors font-medium">
              Inicio
            </Link>
            
            {/* Categories Dropdown */}
            <div className="relative">
              <button 
                className="flex items-center gap-1 text-text-dark hover:text-accent transition-colors font-medium"
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              >
                Categorías
                <ChevronDown className={`w-4 h-4 transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isCategoriesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                  >
                    <div className="p-2">
                      <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase">
                        Todas las Categorías
                      </div>
                      {categories.map((cat: any) => (
                        <Link
                          key={cat.slug}
                          href={`/category/${cat.slug}`}
                          className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700"
                          onClick={() => setIsCategoriesOpen(false)}
                        >
                          <span>{cat.name}</span>
                          <span className="text-xs text-gray-400">{cat.count}</span>
                        </Link>
                      ))}
                    </div>
                    <Link 
                      href="/category"
                      className="block px-3 py-2 bg-accent/10 text-accent text-sm font-medium text-center hover:bg-accent/20"
                      onClick={() => setIsCategoriesOpen(false)}
                    >
                      Ver todas las categorías →
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Popular Link */}
            <Link href="#featured" className="text-text-dark hover:text-accent transition-colors font-medium flex items-center gap-1">
              <Flame className="w-4 h-4 text-orange-500" />
              Destacados
            </Link>
            
            <Link href="#methodology" className="text-text-dark hover:text-accent transition-colors font-medium">
              Metodología
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menú"
          >
            {isMobileMenuOpen ? <X size={28} className="text-primary" /> : <Menu size={28} className="text-primary" />}
          </button>
        </div>

        {/* Mobile Menu - ALWAYS RENDERED but conditionally visible */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 bg-white border border-gray-200 rounded-xl overflow-hidden"
            >
              <div className="p-4 space-y-3">
                <Link 
                  href="/" 
                  className="block py-3 px-4 text-text-dark hover:bg-gray-50 hover:text-accent font-medium rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  🏠 Inicio
                </Link>
                
                {/* Mobile Categories Accordion */}
                <div className="border-t border-gray-">
                  <button 
                    className="flex items-center justify-between w-full py-3 px-4 text-text-dark font-medium hover:bg-gray-50 rounded-lg"
                    onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  >
                    <span className="flex items-center gap-2">
                      <Grid3X3 className="w-5 h-5" />
                      Categorías
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isCategoriesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 ml-4 space-y-1"
                      >
                        {categories.slice(0, 8).map((cat: any) => (
                          <Link
                            key={cat.slug}
                            href={`/category/${cat.slug}`}
                            className="block py-2 px-4 text-sm text-gray-600 hover:text-accent hover:bg-gray-50 rounded-lg"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {cat.name} ({cat.count})
                          </Link>
                        ))}
                        <Link
                          href="/category"
                          className="block py-2 px-4 text-sm text-accent font-medium"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Ver todas las categorías →
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link 
                  href="#featured" 
                  className="block py-3 px-4 text-text-dark hover:bg-gray-50 hover:text-accent font-medium rounded-lg flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Flame className="w-5 h-5 text-orange-500" />
                  Destacados
                </Link>
                
                <Link 
                  href="#methodology" 
                  className="block py-3 px-4 text-text-dark hover:bg-gray-50 hover:text-accent font-medium rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  📋 Metodología
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

function Hero() {
  const [searchQuery, setSearchQuery] = useState('')
  const products = productsData.products || []
  const topProducts = getTopProducts()
  
  const filteredProducts = searchQuery.length > 2 
    ? products.filter((p: any) => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : []

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 pb-12 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Background Elements */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-6"
            >
              <Star className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-primary">Reseñas Verificadas 2026</span>
            </motion.div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight mb-6">
              Encuentra los{' '}
              <span className="text-accent">Mejores Productos</span>
            </h1>
            
            <p className="text-lg text-text-muted mb-6 max-w-xl">
              Reseñas honestas, detalladas y actualizadas. Te ayudamos a tomar la mejor decisión de compra.
            </p>
            
            {/* Search Box */}
            <div className="relative mb-6 max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar producto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 text-base"
              />
              {filteredProducts.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 max-h-60 overflow-y-auto">
                  {filteredProducts.slice(0, 5).map((product: any) => (
                    <Link
                      key={product.asin}
                      href={`/reviews/${product.slug}`}
                      className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0"
                      onClick={() => setSearchQuery('')}
                    >
                      <div className="font-medium text-gray-900 line-clamp-1">{product.title}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-2">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        {product.rating} • {product.category}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/category"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-all"
              >
                <Grid3X3 className="w-5 h-5" />
                Explorar por Categoría
              </Link>
              <Link
                href="#featured"
                className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-6 py-3 rounded-full font-semibold hover:bg-primary hover:text-white transition-all"
              >
                <Flame className="w-5 h-5 text-orange-500" />
                Destacados
              </Link>
            </div>
          </motion.div>

          {/* Right Visual - Top Products */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-accent" />
              <span className="font-semibold text-primary">Mejor Valorados</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {topProducts.map((product: any, index: number) => (
                <motion.div
                  key={product.asin}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Link href={`/reviews/${product.slug}`}>
                    <div className="h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center mb-3">
                      <span className="text-3xl">⭐</span>
                    </div>
                    <div className="font-bold text-sm text-primary line-clamp-2 mb-1">
                      {product.title}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs font-medium">{product.rating}</span>
                      </div>
                      <ArrowRight className="w-3 h-3 text-accent" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Categories() {
  const categories = getCategories()
  
  return (
    <section id="categories" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
            Explora por Categoría
          </h2>
          <p className="text-text-muted max-w-xl mx-auto">
            Encuentra las mejores reseñas organizadas por tipo de producto
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {categories.slice(0, 12).map((category: any, index: number) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={`/category/${category.slug}`}
                className="block bg-gray-50 rounded-xl p-4 md:p-6 hover:bg-primary hover:text-white transition-all group text-center"
              >
                <h3 className="font-bold text-sm md:text-base mb-1">
                  {category.name}
                </h3>
                <p className="text-xs md:text-sm text-text-muted group-hover:text-gray-300">
                  {category.count} productos
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/category"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-all"
          >
            Ver Todas las Categorías
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function FeaturedProducts() {
  const products = getTopProducts()
  
  return (
    <section id="featured" className="py-16 bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-10"
        >
          <Flame className="w-8 h-8 text-orange-500" />
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">
              Productos Destacados
            </h2>
            <p className="text-text-muted">
              Los mejor valorados
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product: any, index: number) => (
            <motion.div
              key={product.asin}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <Link href={`/reviews/${product.slug}`}>
                <div className="h-32 md:h-40 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative">
                  <span className="text-4xl">⭐</span>
                  <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    #{index + 1}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-accent/20 text-primary text-xs font-medium rounded-full">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-primary mb-2 line-clamp-2 text-sm">
                    {product.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-accent" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/category"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-all"
          >
            Ver Todas las Categorías <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function Methodology() {
  const steps = [
    {
      number: '01',
      title: 'Investigación',
      description: 'Analizamos opciones en el mercado.',
      icon: Search,
    },
    {
      number: '02',
      title: 'Prueba',
      description: 'Probamos los productos.',
      icon: CheckCircle,
    },
    {
      number: '03',
      title: 'Comparación',
      description: 'Evaluamos contra competidores.',
      icon: TrendingUp,
    },
    {
      number: '04',
      title: 'Recomendación',
      description: 'Te damos nuestra opinión honesta.',
      icon: Star,
    },
  ]

  return (
    <section id="methodology" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
            Nuestra Metodología
          </h2>
          <p className="text-text-muted max-w-xl mx-auto">
            Así analizamos cada producto
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-md"
            >
              <div className="text-4xl font-bold text-accent/30 mb-3">
                {step.number}
              </div>
              <step.icon className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-bold text-primary mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-text-muted">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const categories = getCategories()
  
  return (
    <footer className="bg-primary text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="font-display text-xl font-bold mb-3">
              Los<span className="text-accent">Mejores</span>
            </div>
            <p className="text-gray-400 text-sm">
              Reseñas honestas de los mejores productos.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Categorías</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              {categories.slice(0, 5).map((cat: any) => (
                <li key={cat.slug}>
                  <Link href={`/category/${cat.slug}`} className="hover:text-accent">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Política de Privacidad</li>
              <li>Términos de Uso</li>
              <li>Disclosure</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-6 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} LosMejores.blog</p>
          <p className="mt-1">Como Asociado de Amazon, ganamos de compras calificadas.</p>
        </div>
      </div>
    </footer>
  )
}

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Methodology />
      <Footer />
    </main>
  )
}

