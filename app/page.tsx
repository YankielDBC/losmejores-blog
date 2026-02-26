'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Star, TrendingUp, Shield, ArrowRight, CheckCircle, Menu, X, Mail, Cpu, Gamepad2, Home, Dumbbell, Headphones, Camera, Watch, Coffee, Tv, Laptop, ChevronDown, Flame, Zap } from 'lucide-react'
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
                      href="#categories"
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
              <div className="p-4 space-y-4">
                <Link 
                  href="/" 
                  className="block py-2 text-text-dark hover:text-accent font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Inicio
                </Link>
                
                {/* Mobile Categories Accordion */}
                <div>
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
                        className="mt-2 ml-4 space-y-1 border-l-2 border-gray-200 pl-4"
                      >
                        {categories.map((cat: any) => (
                          <Link
                            key={cat.slug}
                            href={`/category/${cat.slug}`}
                            className="block py-2 text-sm text-gray-600 hover:text-accent"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {cat.name} ({cat.count})
                          </Link>
                        ))}
                        <Link
                          href="#categories"
                          className="block py-2 text-sm text-accent font-medium"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Ver todas →
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link 
                  href="#featured" 
                  className="block py-2 text-text-dark hover:text-accent font-medium flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Flame className="w-4 h-4 text-orange-500" />
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
  const products = productsData.products || []
  const topProducts = getTopProducts()
  
  const filteredProducts = searchQuery.length > 2 
    ? products.filter((p: any) => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : []

  return (
    <section id="home" className="min-h-[100dvh] flex items-center pt-24 pb-12 relative overflow-hidden">
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
            
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-primary leading-tight mb-6">
              Encuentra los{' '}
              <span className="gradient-text">Mejores Productos</span>
            </h1>
            
            <p className="text-xl text-text-muted mb-8 max-w-xl">
              Reseñas honestas, detalladas y actualizadas. Te ayudamos a tomar la mejor decisión de compra.
            </p>
            
            {/* Search Box */}
            <div className="relative mb-8 max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar producto... (ej: mejores auriculares)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-200 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 text-lg"
              />
              {filteredProducts.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                  {filteredProducts.slice(0, 5).map((product: any) => (
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
              <a
                href="#categories"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-all hover:scale-105"
              >
                Explorar Categorías
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#featured"
                className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold hover:bg-primary hover:text-white transition-all"
              >
                <Flame className="w-5 h-5 text-orange-500" />
                Ver Destacados
              </a>
            </div>
          </motion.div>

          {/* Right Visual - Top Products */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-accent" />
              <span className="font-semibold text-primary">Productos Mejor Valorados</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {topProducts.map((product: any, index: number) => (
                <motion.div
                  key={product.asin}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="glass p-4 rounded-2xl hover:shadow-lg transition-shadow"
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
    <section id="categories" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
            Explora por Categoría
          </h2>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Encuentra las mejores reseñas organizadas por tipo de producto
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                className="block bg-background rounded-2xl p-6 hover:bg-primary hover:text-white transition-all group"
              >
                <h3 className="font-bold text-lg mb-1 group-hover:text-white">
                  {category.name}
                </h3>
                <p className="text-sm text-text-muted group-hover:text-gray-300">
                  {category.count} productos
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturedProducts() {
  const products = getTopProducts()
  
  return (
    <section id="featured" className="py-24 bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-16"
        >
          <Flame className="w-8 h-8 text-orange-500" />
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary">
              Productos Destacados
            </h2>
            <p className="text-xl text-text-muted">
              Los mejor valorados por nuestro equipo
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product: any, index: number) => (
            <motion.div
              key={product.asin}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <Link href={`/reviews/${product.slug}`}>
                <div className="h-40 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative">
                  <span className="text-5xl">⭐</span>
                  <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    #{index + 1}
                  </div>
                </div>
                <div className="p-5">
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
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="text-sm font-medium ml-1">{product.rating}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-accent" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="#categories"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-all"
          >
            Ver Todas las Categorías <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function FeaturedProductsList() {
  const products = productsData.products || []
  const featured = products.slice(0, 6)
  
  return (
    <section id="reviews" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
            Reseñas Recientes
          </h2>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Los productos más valorados por nuestro equipo
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((product: any, index: number) => (
            <motion.div
              key={product.asin}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <Link href={`/reviews/${product.slug}`}>
                <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <span className="text-6xl">⭐</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-accent/20 text-primary text-sm font-medium rounded-full">
                      {product.category}
                    </span>
                    {product.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-primary mb-2 line-clamp-2">
                    {product.title}
                  </h3>
                  {product.price > 0 && (
                    <p className="text-2xl font-bold text-accent mb-4">
                      ${product.price.toFixed(2)}
                    </p>
                  )}
                  <div className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors">
                    Ver Review <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="#categories"
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
    <section className="py-24 bg-primary relative overflow-hidden">
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
              Reseñas honestas de los mejores productos del mercado. Actualizado para {new Date().getFullYear()}.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Categorías Populares</h4>
            <ul className="space-y-2 text-gray-400">
              {categories.slice(0, 5).map((cat: any) => (
                <li key={cat.slug}>
                  <Link href={`/category/${cat.slug}`} className="hover:text-accent transition-colors">
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
          <p>&copy; {new Date().getFullYear()} LosMejores.blog. Todos los derechos reservados.</p>
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
      <Categories />
      <FeaturedProducts />
      <FeaturedProductsList />
      <Methodology />
      <Newsletter />
      <Footer />
    </main>
  )
}
