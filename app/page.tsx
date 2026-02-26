'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Star, TrendingUp, Shield, ArrowRight, CheckCircle, Menu, X, Mail, Cpu, Gamepad2, Home, Dumbbell, Headphones, Camera, ChevronDown, Sparkles } from 'lucide-react'
import productsData from './data/realProducts.json'
import Link from 'next/link'

// Icon mapping
const iconMap: Record<string, any> = {
  Cpu, Gamepad2, Home, Dumbbell, Headphones, Camera
}

// Get products from data
const products = productsData.products || []

// Get unique categories with count
function getCategories() {
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

// Get top rated products for featured
function getFeaturedProducts() {
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
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-display text-2xl font-bold text-primary">
            Los<span className="text-accent">Mejores</span>.blog
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
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
                      {categories.slice(0, 8).map((cat: any) => (
                        <Link
                          key={cat.slug}
                          href={`/category/${cat.slug}`}
                          className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700"
                          onClick={() => setIsCategoriesOpen(false)}
                        >
                          <span className="capitalize">{cat.name}</span>
                          <span className="text-xs text-gray-400">{cat.count}</span>
                        </Link>
                      ))}
                    </div>
                    <Link 
                      href="/category"
                      className="block px-3 py-2 bg-accent/10 text-accent text-sm font-medium text-center hover:bg-accent/20"
                      onClick={() => setIsCategoriesOpen(false)}
                    >
                      Ver todas las categorías
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="#featured" className="text-text-dark hover:text-accent transition-colors font-medium flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-accent" />
              Destacados
            </Link>
            
            <Link href="#methodology" className="text-text-dark hover:text-accent transition-colors font-medium">
              Metodología
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 glass rounded-xl overflow-hidden"
            >
              <div className="p-4 space-y-2">
                <Link 
                  href="/" 
                  className="block py-2 text-text-dark hover:text-accent font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Inicio
                </Link>
                
                {/* Mobile Categories */}
                <div className="border-t border-gray-100 pt-2">
                  <button 
                    className="flex items-center justify-between w-full py-2 text-text-dark font-medium"
                    onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  >
                    <span>Categorías</span>
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
                            className="block py-2 text-sm text-gray-600 hover:text-accent capitalize"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {cat.name} ({cat.count})
                          </Link>
                        ))}
                        <Link
                          href="/category"
                          className="block py-2 text-sm text-accent font-medium"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Ver todas
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link 
                  href="#featured" 
                  className="block py-2 text-text-dark hover:text-accent font-medium flex items-center gap-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Sparkles className="w-4 h-4 text-accent" />
                  Destacados
                </Link>
                
                <Link 
                  href="#methodology" 
                  className="block py-2 text-text-dark hover:text-accent font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Metodología
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
  const filteredProducts = searchQuery.length > 2 
    ? products.filter((p: any) => p.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
    : []

  return (
    <section id="home" className="min-h-[100dvh] flex items-center pt-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-white to-accent/5" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="stagger-children"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-6"
            >
              <Star className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-primary">Reseñas Verificadas</span>
            </motion.div>
            
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-primary leading-tight mb-6">
              Reseñas Honestas,{' '}
              <span className="gradient-text">Productos Reales</span>
            </h1>
            
            <p className="text-xl text-text-muted mb-8 max-w-xl">
              Te ayudamos a encontrar lo mejor de lo mejor. Análisis profundos, 
              comparaciones justas y recomendaciones que puedes confiar.
            </p>

            {/* Search */}
            <div className="relative mb-8 max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar producto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-200 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 text-lg"
              />
              {filteredProducts.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                  {filteredProducts.map((product: any) => (
                    <Link
                      key={product.asin}
                      href={`/reviews/${product.slug}`}
                      className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0"
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
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/category"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-all hover:scale-105"
              >
                Explorar Categorías
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#featured"
                className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold hover:bg-primary hover:text-white transition-all"
              >
                <Sparkles className="w-5 h-5 text-accent" />
                Destacados
              </Link>
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute top-10 right-0 glass p-6 rounded-2xl shadow-xl"
              >
                <TrendingUp className="w-8 h-8 text-accent mb-2" />
                <div className="font-bold text-primary">Análisis Real</div>
                <div className="text-sm text-text-muted">100% Objetivo</div>
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute bottom-20 left-0 glass p-6 rounded-2xl shadow-xl"
              >
                <Shield className="w-8 h-8 text-accent mb-2" />
                <div className="font-bold text-primary">Sin Compromisos</div>
                <div className="text-sm text-text-muted">Solo lo mejor</div>
              </motion.div>
              
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass p-8 rounded-3xl shadow-2xl"
              >
                <Search className="w-12 h-12 text-accent mb-3" />
                <div className="font-bold text-primary text-center">Research</div>
                <div className="text-sm text-text-muted text-center">Profundo</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function About() {
  const stats = [
    { number: '500+', label: 'Productos Analizados' },
    { number: '50+', label: 'Categorías' },
    { number: '100%', label: 'Independientes' },
    { number: '24/7', label: 'Actualizando' },
  ]

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
            ¿Quiénes Somos?
          </h2>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Un equipo apasionado por encontrar los mejores productos para ti
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 bg-background rounded-2xl"
            >
              <div className="font-display text-4xl md:text-5xl font-bold text-accent mb-2">
                {stat.number}
              </div>
              <div className="text-text-muted">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display text-2xl font-bold text-primary mb-4">
              Nuestro Propósito
            </h3>
            <p className="text-text-muted mb-6">
              En un mundo lleno de opciones y marketing agresivo, creemos que mereces 
              saber la verdad antes de comprar. Por eso analizamos productos en profundidad, 
              los probamos y te damos nuestra opinión honesta.
            </p>
            <p className="text-text-muted">
              No nos importa qué marca sea la más popular o cuál nos pague más. 
              Solo nos importa una cosa: que tú encuentres exactamente lo que buscas.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="bg-primary text-white p-6 rounded-2xl">
              <CheckCircle className="w-8 h-8 text-accent mb-3" />
              <div className="font-semibold">Independientes</div>
              <div className="text-sm text-gray-300">Sin presiones de marcas</div>
            </div>
            <div className="bg-accent/10 p-6 rounded-2xl">
              <CheckCircle className="w-8 h-8 text-accent mb-3" />
              <div className="font-semibold text-primary">Transparentes</div>
              <div className="text-sm text-text-muted">Todo publicado</div>
            </div>
            <div className="bg-accent/10 p-6 rounded-2xl">
              <CheckCircle className="w-8 h-8 text-accent mb-3" />
              <div className="font-semibold text-primary">Actualizados</div>
              <div className="text-sm text-text-muted">Revisamos siempre</div>
            </div>
            <div className="bg-primary text-white p-6 rounded-2xl">
              <CheckCircle className="w-8 h-8 text-accent mb-3" />
              <div className="font-semibold">Prácticos</div>
              <div className="text-sm text-gray-300">Sin tecnicismos</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Featured() {
  const featured = getFeaturedProducts()
  
  // Featured product images
  const featuredImages: Record<string, string> = {
    'cameras': 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop',
    'monitors': 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop',
    'best gaming monitors': 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop',
    'best robot vacuums': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    'best wireless earbuds': 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop',
    'best air purifiers': 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=300&fit=crop',
    'best digital cameras': 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
    'best gaming consoles': 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=400&h=300&fit=crop',
    'best mechanical keyboards': 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400&h=300&fit=crop',
    'best smartwatches': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    'best laptops': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
    'best headphones': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
  }
  
  const getProductImage = (product: any) => {
    return featuredImages[product.category?.toLowerCase()] || featuredImages['default'] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop'
  }
  
  return (
    <section id="featured" className="py-24 bg-gradient-to-br from-accent/5 via-white to-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-12"
        >
          <Sparkles className="w-8 h-8 text-accent" />
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary">
              Productos Destacados
            </h2>
            <p className="text-text-muted">Los mejor valorados por nuestro equipo</p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product: any, index: number) => (
            <motion.div
              key={product.asin}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-2"
            >
              <Link href={`/reviews/${product.slug}`}>
                <div className="h-48 bg-gray-100 relative overflow-hidden group">
                  <img 
                    src={getProductImage(product)}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-accent text-white text-xs font-bold px-2 py-1 rounded-full">
                    #{index + 1}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-accent/20 text-primary text-xs font-medium rounded-full capitalize">
                      {product.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-primary mb-3 line-clamp-2 text-sm">
                    {product.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-accent font-semibold">Ver review</span>
                    <ArrowRight className="w-4 h-4 text-accent" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/category"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-all"
          >
            Ver Todas las Categorías <ArrowRight className="w-5 h-5" />
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
      description: 'Analizamos decenas de opciones en el mercado, leyendo reseñas de usuarios y expertos.',
      icon: Search,
    },
    {
      number: '02',
      title: 'Prueba Real',
      description: 'Cuando es posible, adquirimos y probamos los productos nosotros mismos.',
      icon: CheckCircle,
    },
    {
      number: '03',
      title: 'Comparación',
      description: 'Evaluamos cada producto contra sus competidores directos en características y precio.',
      icon: TrendingUp,
    },
    {
      number: '04',
      title: 'Recomendación',
      description: 'Te damos nuestra opinión honesta: cuándo comprar y cuándo evitar.',
      icon: Star,
    },
  ]

  return (
    <section id="methodology" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
            Nuestra Metodología
          </h2>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Así analizamos cada producto para darte la mejor recomendación
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-6xl font-bold text-accent/20 absolute top-4 right-4">
                {step.number}
              </div>
              <step.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-display text-xl font-bold text-primary mb-3">
                {step.title}
              </h3>
              <p className="text-text-muted">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Newsletter() {
  return (
    <section id="contact" className="py-24 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent/20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Suscríbete y te avisamos cuando publiquemos reseñas de los productos que te interesan.
          </p>
          
          <form className="max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <div className="flex gap-3">
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
            </div>
          </form>
          
          <p className="text-sm text-gray-400 mt-4">
            No spam. Solo contenido relevante.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function Footer() {
  const categories = getCategories()
  
  return (
    <footer className="bg-primary text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="font-display text-2xl font-bold mb-4">
              Los<span className="text-accent">Mejores</span>.blog
            </div>
            <p className="text-gray-400">
              Reseñas honestas de los mejores productos del mercado.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Categorías</h4>
            <ul className="space-y-2 text-gray-400">
              {categories.slice(0, 5).map((cat: any) => (
                <li key={cat.slug}>
                  <Link href={`/category/${cat.slug}`} className="hover:text-accent transition-colors capitalize">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-accent transition-colors">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Términos de Uso</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Disclosure</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 text-center text-gray-400">
          <p>&copy; 2026 LosMejores.blog. Todos los derechos reservados.</p>
          <p className="text-sm mt-2">
            Como Asociado de Amazon, ganamos de compras calificadas.
          </p>
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
      <About />
      <Featured />
      <Methodology />
      <Newsletter />
      <Footer />
    </main>
  )
}
