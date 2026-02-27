// Enhanced product data with UNIQUE content per product
// Generates specific descriptions, features, pros/cons based on actual product data

import productsData from '../data/realProducts.json'

const products = productsData.products || []

// Unique content per product - cada producto tiene su propia descripción
const productSpecificContent: Record<string, {
  description: string
  features: string[]
  detailedReview: string
  bestFor: string
}> = {
  // AUDIO - Auriculares
  'B0BSHF7WHW': { // Sony WH-1000XM5
    description: 'Los Sony WH-1000XM5 son los auriculares premium más vendidos de Sony. Con Noise Cancellation líder en su clase, ofrecen una experiencia de audio inmersiva excepcional. Ideales para viajeros, profesionales y audiófilos que buscan la mejor cancelación de ruido del mercado.',
    features: ['Noise Cancellation líder de industria', '30 horas de batería', 'Drivers de 30mm optimizados', 'Multipoint (2 dispositivos)', 'Speak-to-Chat', 'LDAC para audio de alta resolución'],
    detailedReview: 'Los WH-1000XM5 representan la quinta generación de la línea flagship de Sony. El diseño ha evolucionado hacia un look más elegante con brazos más delgados, pero lo importante es el sonido. Los nuevos drivers de 30mm deliveran graves profundos sin sacrificar los agudos. La cancelación de ruido es simplemente la mejor del mercado, superando incluso a Bose en varias pruebas. La batería de 30 horas es más que suficiente para viajes largos, y la carga rápida via USB-C ofrece 3 horas con solo 3 minutos de carga.',
    bestFor: 'Viajes frecuentes, oficina, profesionales que necesitan concentración'
  },
  'B0DGHMNQ5Z': { // Apple AirPods 4
    description: 'Los Apple AirPods 4 representan la nueva generación de earbuds true wireless de Apple. Con Spatial Audio y Adaptive Audio, ofrecen una experiencia personalizada única en el ecosistema Apple.',
    features: ['Spatial Audio con seguimiento de cabeza', 'Adaptive Audio', 'Chip H2', 'Resistencia IP54', 'Audio compartidos', 'Integración Siri'],
    detailedReview: 'Los AirPods 4 llegan con una renovación significativa. El diseño mejorado ofrece mejor ajuste y comodidad para más usuarios. El chip H2 mejora la calidad de sonido y la eficiencia del procesamiento de audio. La Spatial Audio crea una experiencia inmersiva única, especialmente con contenido de Apple TV+ y música Dolby Atmos. El Adaptive Audio ajusta automáticamente la cancelación según tu entorno.',
    bestFor: 'Usuarios Apple, quienes buscan integración perfecta con iPhone/Mac'
  },
  'B0FQFB8FMG': { // Apple AirPods Pro 3
    description: 'Los Apple AirPods Pro 3 son los earbuds premium de Apple con cancelación activa de ruido de segunda generación. La elección definitiva para usuarios del ecosistema Apple que buscan lo mejor.',
    features: ['ANC 2da generación', 'Spatial Audio inmersivo', 'Chip H2', 'Audio adaptativo', 'Modo transparencia', 'Resistencia IPX4'],
    detailedReview: 'Los AirPods Pro 3 carryon la tradición de ser los mejores earbuds para usuarios Apple. La cancelación de ruido ha sido mejorada significativamente, y el modo transparencia es ahora más natural. El Spatial Audio crea una experiencia de sonido tridimensional impresionante. La batería mejorada ofrece hasta 6 horas de uso continuo, y el estuche proporciona cargas adicionales para un total de 30 horas.',
    bestFor: 'Usuarios Apple exigentes, profesionales creativos'
  },
  
  // SMARTWATCHES
  'B0CHWJR1H3': { // Apple Watch Series 10
    description: 'El Apple Watch Series 10 es el smartwatch más avanzado de Apple. Con pantalla más grande, nuevo chipset y sensores mejorados, es el compañero perfecto para tu salud y productividad.',
    features: ['Pantalla OLED Always-On más grande', 'Chip S10', 'Sensor de oxígeno en sangre', 'ECG', 'Detección de apnea', 'Resistencia 50m'],
    detailedReview: 'El Series 10 representa la evolución más significativa desde el Series 7. La pantalla es ahora más grande y brillante, visible incluso bajo luz solar directa. El nuevo chip S10 es más eficiente, mejorando la batería. Los sensores de salud son más precisos, y la detección de apnea del sueño añade una función de salud importante. La batería dura aproximadamente 2 días con uso normal.',
    bestFor: 'Usuarios iOS que buscan el mejor smartwatch del mercado'
  },
  'B0D5XLBVPV': { // Samsung Galaxy Watch 7
    description: 'El Samsung Galaxy Watch 7 combina diseño elegante con funciones avanzadas de salud. Con Wear OS, ofrece la mejor integración para usuarios Android.',
    features: ['Wear OS 5', 'Procesador Exynos W1000', 'Sensor BioActive', 'ECG y presión arterial', 'GPS dual', 'Batería 40 horas'],
    detailedReview: 'El Galaxy Watch 7 representa el mejor smartwatch para Android. El sensor BioActive de Samsung mide múltiples métricas de salud simultáneamente: frecuencia cardíaca, composición corporal, y niveles de oxígeno. La integración con Samsung Health es profunda, y la batería de 40 horas es competitiva. El diseño circular icónico sigue siendo elegante y reconocible.',
    bestFor: 'Usuarios Android, particularmente Samsung'
  },
  
  // ROBOT VACUUMS
  'B0D1HRYMWY': { // iRobot Roomba j9+
    description: 'El iRobot Roomba j9+ es el robot aspirador más avanzado de iRobot. Con sistema de autovaciado y navegación inteligente, mantiene tu hogar limpio automáticamente.',
    features: ['Navegación PrecisionVision', 'Sistema Dirt Detective', 'Autovaciado Clean Base', 'Detección de obstáculos', 'Programación por habitación', 'Compatible con Alexa/Google'],
    detailedReview: 'El Roomba j9+ representa la cúspide de la tecnología de Roomba. El sistema Dirt Detective prioriza automáticamente las áreas más sucias, y la navegación PrecisionVision evita obstáculos comunes como cables y calcetines. La Clean Base autovacía elrobot durante hasta 60 días. La potencia de succión ha sido aumentada significativamente comparada con generaciones anteriores.',
    bestFor: ' Hogares con mascotas, personas con poco tiempo para limpiar'
  },
  'B0C4J9L5XZ': { // Roborock Q8 Max
    description: 'El Roborock Q8 Max ofrece una excelente relación calidad-precio con navegación LiDAR y función de fregado. Ideal para quienes buscan tecnología avanzada sin precio premium.',
    features: ['Navegación LiDAR PreciSense', 'Aspiración 5500Pa', 'Fregona VibraRise', 'Batería 180 minutos', 'Mapas multi-piso', 'Control por app'],
    detailedReview: 'El Q8 Max de Roborock impresses con su combinación de características premium y precio accesible. La navegación LiDAR es ultrarrápida y precisa, creando mapas detallados de tu hogar. La potencia de succión de 5500Pa es más que suficiente para carpets y suelos duros. El sistema de fregado VibraRise aplica presión constante para mejores resultados.',
    bestFor: 'Presupuesto medio, hogares con múltiples pisos'
  },
  
  // STREAMING
  'B0F7Z4QZTT': { // Fire TV Stick 4K Plus
    description: 'El Amazon Fire TV Stick 4K Plus ofrece streaming en 4K HDR con control por voz Alexa. El dispositivo más popular de Amazon para transformar cualquier TV en smart TV.',
    features: ['4K Ultra HD', 'Dolby Vision y Atmos', 'Alexa Voice Remote', 'WiFi 6', 'Apto para Gaming', 'Prime Video integration'],
    detailedReview: 'El Fire TV Stick 4K Plus es el refresh más significativo de Amazon en años. El rendimiento es noticeably más fluido gracias al procesador quad-core, y el soporte para WiFi 6 ensures buffering-free streaming. El control por voz Alexa es conveniente para buscar contenido y controlar dispositivos inteligentes. La calidad de imagen con Dolby Vision es impresionante para el precio.',
    bestFor: 'Usuarios Prime, hogares que quieren smart TV económico'
  },
  
  // SMART HOME
  'B09B2SBHQK': { // Echo Show 5
    description: 'El Amazon Echo Show 5 combina asistente Alexa con pantalla de 5.5 pulgadas. Perfecto para la mesita de noche o cocina para controlar tu hogar inteligente.',
    features: ['Pantalla 5.5" touchscreen', 'Alexa integrada', 'Cámara 2MP para videollamadas', 'Altavoz de calidad', 'Hub smart home integrado', 'Privacidad con cubierta'],
    detailedReview: 'El Echo Show 5 es ideal para quienes quiere un smart display compacto. El tamaño de 5.5 pulgadas es perfecto para mesitas de noche sin ocupar mucho espacio. La cámara de 2MP es adecuada para videollamadas rápidas. El altavoz ha sido mejorado y ahora ofrece mejor calidad de sonido para música y podcasts. La integración con Alexa permite controlar luces, termostatos y más con comandos de voz.',
    bestFor: 'Cocina, mesita de noche, control smart home básico'
  },
  'B09WNK39JN': { // Echo Pop
    description: 'El Amazon Echo Pop es el altavoz inteligente más compacto y colorido de Amazon. Ideal para espacios pequeños o como segundo altavoz en el hogar.',
    features: ['Diseño compacto y colorful', 'Alexa integrada', 'Altavoz de calidad', 'Eero built-in (algunos modelos)', 'Control por voz', 'Skills de Alexa'],
    detailedReview: 'El Echo Pop bring un fresh design al line-up de Amazon. El factor de forma semiesférico es unique y viene en varios colores para match cualquier decoración. Aunque el altavoz no es para audiófilos, es perfecto para escuchar música de fondo o podcasts. La integración con Alexa funciona perfectamente para controlar smart home, timers, y preguntas rápidas.',
    bestFor: 'Espacios pequeños, segundo altavoz, presupuesto limitado'
  },
  'B0BZWRSRWV': { // Ring Battery Doorbell
    description: 'El Ring Battery Doorbell te permite ver quién está en tu puerta desde cualquier lugar. Con video 1080p y detección de movimiento, seguridad simple pero efectiva.',
    features: ['Video 1080p', 'Detección de movimiento', 'Visión nocturna', 'Audio bidireccional', 'Batería recargable', 'Integración Ring'],
    detailedReview: 'El Ring Battery Doorbell es la opción más popular para quienes quieren seguridad básica sin complejidad. La instalación es simple gracias a la batería, sin necesidad de cableado. La calidad de video 1080p es clara tanto de día como de noche. La detección de movimiento es configurable para reducir notificaciones falsas. La integración con otros dispositivos Ring permite crear un sistema de seguridad completo.',
    bestFor: 'Primeros pasos en seguridad smart home, alquileres'
  },
  
  // KINDLE
  'B0CFPJYX7P': { // Kindle Paperwhite
    description: 'El Kindle Paperwhite Signature Edition es el e-reader premium de Amazon. Con pantalla de 7", carga inalámbrica y USB-C, es la mejor experiencia de lectura digital.',
    features: ['Pantalla 7" 300 ppi', 'Carga inalámbrica', 'USB-C', '32GB almacenamiento', 'Ajuste de temperatura de luz', 'Diseño resistente al agua'],
    detailedReview: 'El Kindle Paperwhite Signature representa la evolución definitiva del e-reader. La pantalla de 7 pulgadas es significativamente más grande que modelos anteriores, reduciendo el volteo de páginas. La carga inalámbrica es conveniente - puedes usarlo con cualquier cargador Qi. El ajuste de temperatura de luz permite leer comfortably a cualquier hora. La batería dura semanas, no días.',
    bestFor: 'Lectores frecuentes, viajes, quienes.leen mucho'
  },
  
  // GRILLS
  'B07XJ8C8F5': { // Weber Spirit II E-310
    description: 'El Weber Spirit II E-310 es una parrilla de gas de alta calidad con 3 quemadores. Perfecta para familias que buscan rendimiento profesional en tamaño compacto.',
    features: ['3 quemadores de acero inoxidable', 'Potencia 30,000 BTU', 'Sistema GS4', 'Termómetro integrado', 'Armazón de acero esmaltado', 'Mesas laterales'],
    detailedReview: 'El Spirit II E-310 es la entry-level de Weber pero con calidad profesional. El sistema GS4 de Weber (encendido electrónico, quemadores de rendimiento, parrillas de acero inoxidable,キャッチ皿) es confiable y duradero. Los 3 quemadores permiten diferentes zonas de temperatura. El termómetro integrado en la tapa es útil para monitorear la cocción. La construcción de acero esmaltado resiste las inclemencias del tiempo.',
    bestFor: 'Familias pequeñas-medias, backyard grilling regular'
  },
  'B08FQ7BSO9': { // Char-Broil Performance 4
    description: 'La Char-Broil Performance 4-Burner ofrece 4 quemadores a un precio accesible. Great value para quienes	want más espacio de cocción sin gastar mucho.',
    features: ['4 quemadores de acero inoxidable', 'Potencia 36,000 BTU', 'Parrilla secundaria', 'Armazón de acero', 'Termómetro en tapa', 'Precios accesible'],
    detailedReview: 'La Char-Broil Performance es la opción value del mercado. Con 4 quemadores tienes plenty de espacio para cookouts grandes. El acero inoxidable de los quemadores resiste la corrosión. La parrilla secondary es útil para mantener comida caliente o preparar vegetales. El precio hace esta accessible para la mayoría de presupuestos.',
    bestFor: 'Presupuesto, familias grandes, quienesogan festines'
  },
  'B01MXYG4HM': { // Weber Kettle
    description: 'El Weber Original Kettle es la parrilla de carbón clásica por excelencia. Diseño icónico que ha remain unchanged por décadas - si no hayq broke, no lo fixes.',
    features: ['Diseño icónico de 22"', 'Sistema One-Touch', 'Tapa con termómetro', 'Asa de nailon', 'Cuenco y tapa de acero esmaltado', 'Durabilidad legendaria'],
    detailedReview: 'El Weber Kettle es el gold standard para Parrillando a carbón. El sistema One-Touch hace easy регулировать la temperatura abriendo o cerrando los flujos de aire. La forma dome crea circulación de aire que mantiene la consistencia. Después de décadas, este diseño sigue siendo el más efectivo para carbón. Durabilidad es legendaria - muchos still usan sus Kettles de los 90s.',
    bestFor: 'Puristas del carbón, authentic BBQ, presupuesto'
  },
  
  // FITNESS
  'B0BSHF1WVT': { // Exercise Ball
    description: 'La pelota de ejercicio BalanceFrom 65cm es esencial para entrenamiento de core, yoga y fisioterapia. Antideslizante y resistente hasta 300lbs.',
    features: ['65cm diámetro', 'Antideslizante', 'Capacidad 300lbs', 'Bomba incluida', 'Ejercicios unlimited'],
    detailedReview: 'La pelota de ejercicio es uno de los equipos más versátiles para fitness. Excelente para strengthen tu core, mejorar flexibilidad, y como herramienta de physiotherapy. El material antideslizante previene accidentes durante ejercicios intensos. La capacidad de 300lbs accommodate a mayoría de usuarios. Include pump hace fácil inflarla al tamaño desired.',
    bestFor: 'Entrenamiento core, yoga, rehabilitación, presupuesto'
  },
  'B07XJ8CGJK': { // Resistance Bands
    description: 'El set de bandas de resistencia Fit Simplify ofrece 5 niveles de resistencia. Perfectas para entrenamiento en casa o viajes sin equipment complejo.',
    features: ['5 niveles de resistencia', 'Correas ajustables', 'Bolsa de transporte', 'Ejercicios unlimited', 'Ligero y portable'],
    detailedReview: 'Las bandas de resistencia son la manera más fácil de get a good workout sin equipment expensive. El set de 5 bandas ofrece resistencia desde muy ligera hasta extra-pesada, permitiendo progresión. Las correas con mango make ejercicios como rows y pulls comfortable. Son perfectos para travel - cabe en cualquier equipaje. La calidad del látex es buena para uso regular.',
    bestFor: 'Viajes, principiantes, entrenamiento en casa, presupuesto'
  },
  'B0BQRH7QZS': { // Adjustable Dumbbells
    description: 'Las pesas ajustables Bowflex SelectTech permiten cambiar peso rápidamente con un dial. Desde 5 hasta 52.5 lbs por mancuerna - todo en un par de pesas.',
    features: ['5-52.5 lbs por mancuerna', 'Cambio de peso con dial', '16 configuraciones', 'Base de almacenamiento', 'Calidad Bowflex'],
    detailedReview: 'Las SelectTech revoluciones el entrenamiento con pesas en casa. El sistema de dial permite cambiar peso en segundos - no más cambiar placas individualmente. El rango de 5-52.5 lbs covers desde principiante hasta avanzado. La calidad de Bowflex ensures durabilidad. La base keep todo organizado. Aunque el precio es alto, saves espacio y dinero a largo plazo vs comprar muchas pesas individuales.',
    bestFor: 'Entrenamiento en casa serio, espacio limitado, usuarios serios'
  },
  
  // KITCHEN
  'B08FQ7BQO9': { // Oster Pro Blender
    description: 'La batidora Oster Pro 1200 con motor de 1200 watts y Tecnología triAction. Ideal para smoothies, soups y todo lo que necesites.',
    features: ['Motor 1200 watts', 'Tecnología triAction', 'Vaso de vidrio thermal', 'Función pulse', '10 velocidades', 'Garantía 10 años'],
    detailedReview: 'El Oster Pro 1200 es una batidora doméstica potente. El motor de 1200 watts maneja hielo y ingredients duros easily. El sistema triAction crea vortex que pux todo hacia las cuchillas. El vaso de vidrio resiste temperaturas extremas y no retiene olores. La garantía de 10 años shows confianza del fabricante en durabilidad.',
    bestFor: 'Smoothies diarios, soups, hielo, uso frecuente'
  },
  'B0B4PQXK6D': { // Instant Pot Duo 7-in-1
    description: 'El Instant Pot Duo 7-en-1 combina olla a presión, olla lenta, arrozera, steamer y más. El electrodoméstico más versátil para la cocina moderna.',
    features: ['7 funciones en 1', '6QT capacidad', 'Programa 14智能', 'Función sauté', 'Seguridad multiple', 'Fácil clean'],
    detailedReview: 'El Instant Pot Duo changed how many cocinan. Como olla a presión, reduce tiempos de cocción dramatically. Como olla lenta, puedes leave meals ready en la mañana y tener dinner lista al llegar. La función sauté permite dorar carnes antes de pressure cook. Los programas presets makes cooking easy - solo selecciona y olvida. Es virtually impossible burn food en Instant Pot debido al diseño.',
    bestFor: 'Cocinas繁忙, meal prep, multicooking'
  }
}

// Fallback content para productos sin contenido específico
const categoryFallback: Record<string, {
  description: string
  features: string[]
}> = {
  'audio': {
    description: 'Auriculares de alta calidad con cancelación de ruido y sonido excepcional.',
    features: ['Cancelación activa de ruido', 'Batería de larga duración', 'Calidad de sonido premium', 'Diseño cómodo']
  },
  'smartwatches': {
    description: 'Smartwatch avanzado con monitoreo de salud y productividad en tu muñeca.',
    features: ['Monitoreo de ritmo cardíaco', 'GPS integrado', 'Batería de larga duración', 'Notificaciones inteligentes']
  },
  'robot-vacuums': {
    description: 'Robot aspirador inteligente que mantiene tu hogar limpio automáticamente.',
    features: ['Navegación inteligente', 'Potencia de succión', 'Control por app', 'Autonomía']
  },
  'streaming': {
    description: 'Dispositivo de streaming para transformar tu TV en smart TV.',
    features: ['4K Ultra HD', 'Control por voz', 'WiFi rápido', 'Miles de apps']
  },
  'smart-home': {
    description: 'Dispositivo smart home para controlar tu hogar con voz.',
    features: ['Control por voz', 'Integración smart home', 'Automatizaciones', 'Control remoto']
  },
  'kindle': {
    description: 'E-reader para любители de lectura digital.',
    features: ['Pantalla de papel electrónico', 'Batería de semanas', 'Luz incorporada', 'Miles de libros']
  },
  'grills': {
    description: 'Parrilla de alta calidad para backyard cooking.',
    features: ['Construcción duradera', 'Control de temperatura', 'Tamaño familiar', 'Fácil uso']
  },
  'fitness': {
    description: 'Equipo de fitness para entrenamiento en casa.',
    features: ['Fácil uso', 'Durable', 'Versátil', 'Buen precio']
  },
  'kitchen': {
    description: 'Electrodomésticos de cocina de alta calidad.',
    features: ['Potencia adecuada', 'Fácil limpieza', 'Durabilidad', 'Funciones múltiples']
  }
}

export function getEnhancedProduct(product: any) {
  // Buscar contenido específico del producto primero
  const specificContent = productSpecificContent[product.asin]
  
  if (specificContent) {
    return {
      ...product,
      description: specificContent.description,
      features: specificContent.features,
      detailedReview: specificContent.detailedReview,
      bestFor: specificContent.bestFor,
      pros: generatePros(product),
      cons: generateCons(product),
      specs: generateSpecs(product),
    }
  }
  
  // Fallback a contenido por categoría
  const categoryData = categoryFallback[product.category] || categoryFallback['audio']
  
  return {
    ...product,
    description: `${categoryData.description} Este producto tiene ${product.reviews?.toLocaleString()} reseñas y una calificación de ${product.rating}/5 estrellas.`,
    features: categoryData.features,
    pros: generatePros(product),
    cons: generateCons(product),
    specs: generateSpecs(product),
  }
}

function generatePros(product: any) {
  const pros = []
  
  if (product.rating >= 4.5) {
    pros.push('Excelente calificación de usuarios')
  }
  if (product.reviews > 10000) {
    pros.push('Muy popular con miles de reseñas')
  }
  if (product.price < 100) {
    pros.push('Excelente relación calidad-precio')
  }
  if (product.price > 300) {
    pros.push('Construcción premium y duradera')
  }
  pros.push('Marca líder en su categoría')
  pros.push('Soporte técnico disponible')
  
  return pros.slice(0, 5)
}

function generateCons(product: any) {
  const cons = []
  
  if (product.price > 500) {
    cons.push('Precio elevado para algunos presupuestos')
  }
  if (product.rating < 4.0) {
    cons.push('Calificación moderada - investigar más')
  }
  if (!product.reviews || product.reviews < 100) {
    cons.push('Pocas reseñas disponibles')
  }
  cons.push('Requiere configuración inicial')
  
  return cons.slice(0, 4)
}

function generateSpecs(product: any) {
  return {
    'ASIN': product.asin,
    'Categoría': product.category?.replace(/-/g, ' '),
    'Valoración': `${product.rating}/5 estrellas`,
    'Reseñas': product.reviews?.toLocaleString() || 'N/A',
    'Precio': `$${product.price?.toFixed(2) || 'N/A'}`,
    'Última actualización': new Date().toLocaleDateString('es-ES')
  }
}

export default function getEnhancedProducts() {
  return products.map(getEnhancedProduct)
}
