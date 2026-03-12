// Optimized product index - carga mínima
// Formato: { a: asin, t: title, s: slug, r: rating }

import fs from 'fs'
import path from 'path'

const INDEX_DIR = path.join(process.cwd(), 'app', 'data', 'index')

export interface MiniProduct {
  a: string  // asin
  t: string  // title (truncated)
  s: string  // slug
  r: number  // rating
}

export interface CategoryIndex {
  [category: string]: {
    count: number
    file: string
  }
}

export interface Catalogue {
  total: number
  categories: CategoryIndex
}

// Cargar catálogo maestro (solo 3.4 KB)
export function getCatalogue(): Catalogue {
  const content = fs.readFileSync(path.join(INDEX_DIR, 'catalogue.json'), 'utf8')
  return JSON.parse(content)
}

// Cargar índice de una categoría específica (13-16 KB max)
export function getCategoryIndex(category: string): MiniProduct[] {
  const safeCategory = category.toLowerCase().replace(/[^a-z0-9-]/g, '')
  const filePath = path.join(INDEX_DIR, `index-${safeCategory}.json`)
  
  if (!fs.existsSync(filePath)) {
    return []
  }
  
  const content = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(content)
}

// Buscar por ASIN (más rápido)
export function findByAsin(asin: string): { category: string, product: MiniProduct } | null {
  const catalogue = getCatalogue()
  
  for (const [catName, info] of Object.entries(catalogue.categories)) {
    const products = getCategoryIndex(catName)
    const found = products.find(p => p.a === asin)
    
    if (found) {
      return { category: catName, product: found }
    }
  }
  
  return null
}

// Buscar en categoría específica (sin cargar todo)
export function searchInCategory(category: string, query: string): MiniProduct[] {
  const products = getCategoryIndex(category)
  const q = query.toLowerCase()
  
  return products.filter(p => 
    p.t.toLowerCase().includes(q) || 
    p.s.toLowerCase().includes(q)
  )
}

// Obtener todos los productos (solo si es necesario)
export function getAllProducts(): MiniProduct[] {
  const catalogue = getCatalogue()
  const all: MiniProduct[] = []
  
  for (const catName of Object.keys(catalogue.categories)) {
    all.push(...getCategoryIndex(catName))
  }
  
  return all
}