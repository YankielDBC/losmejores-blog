'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Star, TrendingUp, Shield, ArrowRight, CheckCircle, Menu, X, Mail, Cpu, Gamepad2, Home, Dumbbell, Headphones, Camera } from 'lucide-react'
import productsData from './data/products.json'

// Icon mapping
const iconMap: Record<string, any> = {
  Cpu, Gamepad2, Home, Dumbbell, Headphones, Camera
}

// Get products from data
const products = productsData.products || []
const categories = [
  { title: 'Electrónica', description: 'Los mejores dispositivos tecnológicos', icon: 'Cpu' },
  { title: 'Gaming', description: 'Consolas, accesorios y más', icon: 'Gamepad2' },
  { title: 'Hogar', description: 'Electrodomésticos y tecnología del hogar', icon: 'Home' },
  { title: 'Fitness', description: 'Equipamiento deportivo inteligente', icon: 'Dumbbell' },
  { title: 'Audio', description: 'Auriculares, altavoces y sonido premium', icon: 'Headphones' },
  { title: 'Cámaras', description: 'Fotografía y video profesional', icon: 'Camera' },
]

// Components
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Inicio', href: '#home' },
    { name: 'Reseñas', href: '#reviews' },
    { name: 'Nosotros', href: '#about' },
    { name: 'Metodología', href: '#methodology' },
    { name: 'Contacto', href: '#contact' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a href="#home" className="font-display text-2xl font-bold text-primary">
            Los<span className="text-accent">Mejores</span>.blog
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-text-dark hover:text-accent transition-colors font-medium"
              >
                {link.name}
              </a>
            ))}
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
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 glass rounded-xl p-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block py-2 text-text-dark hover:text-accent transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  )
}

function Hero() {
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
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#what-you-find"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-all hover:scale-105"
              >
                Explorar Reseñas
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#methodology"
                className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold hover:bg-primary hover:text-white transition-all"
              >
                Nuestra Metodología
              </a>
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
              {/* Floating Cards */}
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

function WhatYouFind() {
  const categories = [
    {
      title: 'Reseñas Detalladas',
      description: 'Análisis profundos de cada producto con pros y contras reales.',
      icon: Search,
    },
    {
      title: 'Comparativas',
      description: 'Cara a cara entre los mejores de cada categoría.',
      icon: TrendingUp,
    },
    {
      title: 'Guías de Compra',
      description: 'Qué buscar, qué evitar y cómo elegir el mejor para ti.',
      icon: Star,
    },
    {
      title: 'Actualizaciones',
      description: 'Revisamos nuestros reviews cuando salen nuevos modelos.',
      icon: Shield,
    },
  ]

  return (
    <section id="what-you-find" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
            Qué Encontrarán Aquí
          </h2>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Todo lo que necesitas para tomar la mejor decisión de compra
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-background p-8 rounded-3xl hover:bg-primary transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent/20 rounded-xl group-hover:bg-accent/30 transition-colors">
                  <category.icon className="w-8 h-8 text-primary group-hover:text-accent transition-colors" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-primary group-hover:text-white mb-2">
                    {category.title}
                  </h3>
                  <p className="text-text-muted group-hover:text-gray-300">
                    {category.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Featured Products Section
function FeaturedProducts() {
  if (!products || products.length === 0) return null
  
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
            Los mejores productos analizados por nuestro equipo
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.slice(0, 6).map((product: any, index: number) => (
            <motion.div
              key={product.asin}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
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
                <a
                  href={`/reviews/${product.slug}`}
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors"
                >
                  Ver Review <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {products.length > 6 && (
          <div className="text-center mt-12">
            <a
              href="#categories"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-all"
            >
              Ver Todas las Reseñas <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        )}
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
            <h4 className="font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#about" className="hover:text-accent transition-colors">Nosotros</a></li>
              <li><a href="#methodology" className="hover:text-accent transition-colors">Metodología</a></li>
              <li><a href="#what-you-find" className="hover:text-accent transition-colors">Qué Encontrarás</a></li>
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

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Methodology />
      <WhatYouFind />
      <FeaturedProducts />
      <Newsletter />
      <Footer />
    </main>
  )
}
