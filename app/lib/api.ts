// Dynamic data fetching - loads only what's needed

const API_BASE = '/api'

export async function getCategories() {
  const res = await fetch(`${API_BASE}/categories`, { 
    cache: 'no-store' 
  })
  if (!res.ok) throw new Error('Failed to fetch categories')
  return res.json()
}

export async function getProductsByCategory(category: string) {
  const res = await fetch(`${API_BASE}/products?category=${category}`, { 
    cache: 'no-store' 
  })
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

export async function getAllCategories() {
  const data = await getCategories()
  return data.categories ? Object.entries(data.categories).map(([slug, info]: [string, any]) => ({
    slug,
    ...info
  })) : []
}