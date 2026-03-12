import { NextRequest, NextResponse } from 'next/server'
import { getCatalogue, getCategoryIndex, searchInCategory, findByAsin } from '../../lib/index'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  
  const asin = searchParams.get('asin')
  const category = searchParams.get('category')
  const query = searchParams.get('q')

  try {
    // Buscar por ASIN específico
    if (asin) {
      const result = findByAsin(asin)
      if (!result) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 })
      }
      return NextResponse.json(result)
    }

    // Obtener índice de categoría
    if (category) {
      const products = getCategoryIndex(category)
      return NextResponse.json(products)
    }

    // Búsqueda en categoría
    if (query && category) {
      const results = searchInCategory(category, query)
      return NextResponse.json(results)
    }

    // Por defecto, devolver catálogo
    return NextResponse.json(getCatalogue())
    
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}