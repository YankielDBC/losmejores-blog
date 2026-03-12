import { NextResponse } from 'next/server'
import categoriesData from '../../data/categories/index.json'

export async function GET() {
  return NextResponse.json(categoriesData)
}