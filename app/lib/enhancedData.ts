// Enhanced product data with SEO descriptions
// This file generates rich content for each product

import productsData from '../data/realProducts.json'

const products = productsData.products || []

// Category descriptions templates
const categoryDescriptions: Record<string, { intro: string; features: string[] }> = {
  'cameras': {
    intro: 'Las cámaras fotográficas han evolucionado enormemente en los últimos años. Ya sea que busques una cámara mirrorless profesional o una cámara digital compacta para principiantes, tenemos las mejores opciones para ti.',
    features: ['Sensor de alta resolución', 'Video 4K', 'Estabilización de imagen', 'Conectividad WiFi', 'Pantalla articulada'],
  },
  'monitors': {
    intro: 'Un buen monitor puede transformar tu experiencia frente al ordenador. Ya sea para gaming, trabajo profesional o uso doméstico, la elección del monitor correcto es crucial.',
    features: ['Resolución 4K', 'Tiempo de respuesta 1ms', 'Panel IPS', 'Frecuencia de actualización alta', 'AMD FreeSync/G-Sync'],
  },
  'best gaming monitors': {
    intro: 'Los monitores para gaming necesitan características específicas para ofrecer la mejor experiencia. Descubre los monitores más recomendados para jugadores competitivos y casuales.',
    features: ['Alta frecuencia de refresco', 'Tiempo de respuesta mínimo', 'Compatible con VRR', 'Modo juego', 'Iluminación RGB'],
  },
  'best robot vacuums': {
    intro: 'Los robots aspiradores han revolucionado la limpieza del hogar. Con tecnología de navegación avanzada y potencia de succión, estos dispositivos te ayudan a mantener tu hogar limpio sin esfuerzo.',
    features: ['Navegación LiDAR', 'Autonomía de 2+ horas', 'Aspiración potente', 'Función fregona', 'Control por app'],
  },
  'best wireless earbuds': {
    intro: 'Los auriculares inalámbricos se han convertido en un esenciales del día a día. Descubre los mejores earbuds con cancelación de ruido, batería duradera y calidad de sonido excepcional.',
    features: ['Cancelación activa de ruido', '6+ horas de batería', 'Carga inalámbrica', 'Resistencia al agua IPX4', 'Sonido de alta calidad'],
  },
  'best air purifiers': {
    intro: 'Un purificador de aire es esencial para mantener la calidad del aire en tu hogar. Especialmente útil para personas con alergias o mascotas, estos dispositivos eliminan partículas dañinas.',
    features: ['Filtro HEPA', 'Sensor de calidad de aire', 'Modo automático', 'Cobertura grande', 'Silencioso'],
  },
  'best digital cameras': {
    intro: 'Las cámaras digitales ofrecen una excelente calidad de imagen sin necesidad de cambiar lentes. Ideales para principiantes y aficionados que buscan resultados profesionales.',
    features: ['Sensor APS-C', 'Zoom óptico 10x+', 'Video Full HD', 'Estabilización', 'Pantalla LCD'],
  },
  'best gaming consoles': {
    intro: 'Las consoles de última generación ofrecen experiencias de juego incomparables. Descubre cuál es la mejor opción para ti según tus preferencias y presupuesto.',
    features: ['Juegos en 4K', 'Biblioteca de títulos', 'Ray tracing', 'Velocidad de carga SSD', 'Retrocompatibilidad'],
  },
  'best mechanical keyboards': {
    intro: 'Los teclados mecánicos ofrecen la mejor experiencia de escritura y gaming. Con diferentes tipos de switches, puedes encontrar el teclado perfecto para tu estilo.',
    features: ['Switches Cherry MX', 'RGB personalizable', 'Teclas programables', 'Structura de aluminio', 'Conexión USB-C'],
  },
  'speakers': {
    intro: 'Los altavoces portátiles te permiten llevar tu música a cualquier lugar. Con batería de larga duración y calidad de sonido potente, son perfectos para viajes y fiestas.',
    features: ['Batería 12+ horas', 'Resistencia al agua', 'Conexión Bluetooth 5.0', 'Potencia 20W+', 'Función manos libres'],
  },
  'tablets': {
    intro: 'Las tablets se han convertido en dispositivos versátiles para trabajo y entretenimiento. Descubre las mejores opciones según tu uso: profesionales, estudiantes o entretenimiento.',
    features: ['Pantalla 10+ pulgadas', 'Procesador potente', '4GB+ RAM', 'Batería de larga duración', 'Compatible con stylus'],
  },
  'air-purifiers': {
    intro: 'Los purificadores de aire eliminan alérgenos, polvo y partículas dañinas del aire de tu hogar. Especialmente recomendados para personas con alergias, asma o mascotas.',
    features: ['Filtro HEPA H13', 'CADR alto', 'Sensor de partículas', 'Modo sueño', 'Cobertura hasta 50m²'],
  },
  'smartwatches': {
    intro: 'Los smartwatches van mucho más allá de mostrar la hora. Monitorea tu salud, recibe notificaciones y controla tu música desde tu muñeca.',
    features: ['Monitor de ritmo cardíaco', 'GPS integrado', 'Resistencia al agua 5ATM', 'Batería 7+ días', 'NFC para pagos'],
  },
  'best coffee makers': {
    intro: 'Una buena cafetera puede transformar tus mañanas. Desde cafeteras automáticas hasta máquinas espresso, encuentra la perfecta para tu tipo de café favorito.',
    features: ['Programable', 'Capacidad 12+ tazas', 'Sistema anti-goteo', 'Mantener caliente', 'Filtro permanente'],
  },
  'best selling laptops': {
    intro: 'Los portátiles más vendidos combinan rendimiento, portabilidad y precio. Descubre cuáles son las opciones más populares entre los usuarios.',
    features: ['Procesador Intel/AMD de última generación', '16GB RAM', 'SSD 512GB+', 'Pantalla Full HD', 'Batería 8+ horas'],
  },
  'best tablets': {
    intro: 'Las tablets ofrecen la portability de un smartphone con la potencia de un ordenador. Perfectas para consumo de contenido, trabajo ligero y creatividad.',
    features: ['Procesador potente', 'Pantalla Retina/LCD de alta resolución', '4GB+ RAM', 'Altavoces estéreo', 'Compatible con teclado'],
  },
  'best air fryers': {
    intro: 'Las freidoras de aire te permiten disfrutar de alimentos crujientes con hasta un 90% menos de aceite. Una opción saludable sin sacrificar el sabor.',
    features: ['Capacidad 5+ litros', 'Control digital de temperatura', 'Timer programable', 'Función de precalentamiento', 'Accesorios incluidos'],
  },
  'best smartwatches': {
    intro: 'Los smartwatches más recomendados combinan características premium con buena relación calidad-precio. Monitorea tu salud y mantente conectado en todo momento.',
    features: ['Pantalla AMOLED', 'GPS', 'Monitor de oxígeno en sangre', 'Batería 7+ días', 'Asistente de voz'],
  },
  'best gaming headphones': {
    intro: 'Los auriculares para gaming necesitan sonido envolvente y micrófono de calidad para la comunicación. Descubre los mejores para tus sesiones de juego.',
    features: ['Sonido surround 7.1', 'Micrófono desmontable', 'Almohadillas memory foam', 'Compatible con PC/PS/Xbox', 'Iluminación RGB'],
  },
}

// Generate enhanced product data
export function getEnhancedProduct(product: any) {
  const categoryData = categoryDescriptions[product.category] || categoryDescriptions['cameras']
  
  return {
    ...product,
    description: `${categoryData.intro} Este ${product.category?.replace(/-/g, ' ')} destaca por su calidad y valoraciones positivas de ${product.reviews?.toLocaleString()} usuarios.`,
    features: categoryData.features,
    pros: [
      'Excelente relación calidad-precio',
      'Alta valoración por usuarios',
      'Marca reconocida en el mercado',
      'Buena durabilidad',
      'Servicio técnico disponible',
    ],
    cons: [
      'Precio elevado para algunos presupuestos',
      'Requiere configuración inicial',
    ],
    specs: {
      'Marca': 'Varios',
      'Modelo': product.title.substring(0, 30),
      'Categoría': product.category?.replace(/-/g, ' '),
      'Valoración': `${product.rating}/5`,
      'Opiniones': product.reviews?.toLocaleString(),
      'Precio': `$${product.price.toFixed(2)}`,
      'Garantía': '1 año Amazon',
    },
  }
}

export default function getEnhancedProducts() {
  return products.map(getEnhancedProduct)
}
