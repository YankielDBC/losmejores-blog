import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const category = searchParams.get('category')

  if (!category) {
    return NextResponse.json({ error: 'Category required' }, { status: 400 })
  }

  // Prevent directory traversal
  const safeCategory = category.replace(/[^a-z0-9-]/gi, '')
  const filePath = path.join(process.cwd(), 'app', 'data', 'categories', `${safeCategory}.json`)

  try {
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const products = JSON.parse(fileContent)
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 })
  }
}