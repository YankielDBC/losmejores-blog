import { NextRequest, NextResponse } from 'next/server'
import productsData from '../../data/realProducts.json'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const category = searchParams.get('category')

  const allProducts = productsData.products || []

  if (!category) {
    return NextResponse.json(allProducts)
  }

  const safeCategory = category.toLowerCase()
  const filtered = allProducts.filter((p: any) => 
    p.category?.toLowerCase() === safeCategory
  )

  return NextResponse.json(filtered)
}