import { NextRequest, NextResponse } from 'next/server'

// Import all category files
import headphonesData from '../../data/categories/headphones.json'
import grillsData from '../../data/categories/grills.json'
import kitchenData from '../../data/categories/kitchen.json'
import homeimprovementData from '../../data/categories/homeimprovement.json'
import cellphonesData from '../../data/categories/cellphones.json'
import electronicsData from '../../data/categories/electronics.json'
import computersData from '../../data/categories/computers.json'
import audioData from '../../data/categories/audio.json'
import gamingData from '../../data/categories/gaming.json'
import kindleData from '../../data/categories/kindle.json'
import fitnessData from '../../data/categories/fitness.json'
import smartwatchesData from '../../data/categories/smartwatches.json'
import homeData from '../../data/categories/home.json'
import videogamesData from '../../data/categories/videogames.json'
import smartHomeData from '../../data/categories/smart-home.json'
import streamingData from '../../data/categories/streaming.json'

const categoriesMap: Record<string, any> = {
  headphones: headphonesData,
  grills: grillsData,
  kitchen: kitchenData,
  homeimprovement: homeimprovementData,
  cellphones: cellphonesData,
  electronics: electronicsData,
  computers: computersData,
  audio: audioData,
  gaming: gamingData,
  kindle: kindleData,
  fitness: fitnessData,
  smartwatches: smartwatchesData,
  home: homeData,
  videogames: videogamesData,
  'smart-home': smartHomeData,
  streaming: streamingData
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const category = searchParams.get('category')

  if (!category) {
    return NextResponse.json({ error: 'Category required' }, { status: 400 })
  }

  const safeCategory = category.toLowerCase()
  const products = categoriesMap[safeCategory]

  if (!products) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 })
  }

  return NextResponse.json(products)
}