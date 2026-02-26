// Base de datos de productos - Actualizado automáticamente
export const products = [
  // Los productos se agregan dinámicamente
]

export const categories = [
  { id: 'electronics', name: 'Electrónica', slug: 'electronics', icon: 'Cpu' },
  { id: 'gaming', name: 'Gaming', slug: 'gaming', icon: 'Gamepad2' },
  { id: 'home', name: 'Hogar', slug: 'home', icon: 'Home' },
  { id: 'fitness', name: 'Fitness', slug: 'fitness', icon: 'Dumbbell' },
  { id: 'audio', name: 'Audio', slug: 'audio', icon: 'Headphones' },
  { id: 'cameras', name: 'Cámaras', slug: 'cameras', icon: 'Camera' },
]

export function getAllProducts() {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('losmejores_products')
      if (stored) return JSON.parse(stored)
    } catch (e) {}
  }
  return products
}

export function getProductsByCategory(category) {
  return getAllProducts().filter(p => p.category === category)
}

export function addProduct(product) {
  const all = getAllProducts()
  all.push(product)
  if (typeof window !== 'undefined') {
    localStorage.setItem('losmejores_products', JSON.stringify(all))
  }
}

export default { products, categories, getAllProducts, getProductsByCategory }
