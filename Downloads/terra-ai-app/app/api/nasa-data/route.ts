/**
 * NASA Farm Navigators API Route
 * Server-side NASA data integration with caching for educational farming game
 */

import { NextRequest, NextResponse } from 'next/server'
import { nasaClient, FARMING_SCENARIOS, NASA_DATASETS } from '@/lib/nasa-api'

// In-memory cache for development (use Redis in production)
const dataCache = new Map<string, { data: any; timestamp: number; ttl: number }>()

function getCachedData(key: string) {
  const cached = dataCache.get(key)
  if (cached && Date.now() - cached.timestamp < cached.ttl) {
    return cached.data
  }
  dataCache.delete(key)
  return null
}

function setCachedData(key: string, data: any, ttlMinutes: number = 60) {
  dataCache.set(key, {
    data,
    timestamp: Date.now(),
    ttl: ttlMinutes * 60 * 1000
  })
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get('action')
  const scenario = searchParams.get('scenario')
  const lat = parseFloat(searchParams.get('lat') || '40.7128')
  const lng = parseFloat(searchParams.get('lng') || '-74.0060')

  try {
    switch (action) {
      case 'scenarios':
        return NextResponse.json({ 
          scenarios: FARMING_SCENARIOS,
          datasets: NASA_DATASETS 
        })

      case 'farm-data':
        return await getFarmData(lat, lng, scenario)

      case 'terrain':
        return await getTerrainData(lat, lng)

      case 'weather':
        return await getWeatherData(lat, lng)

      case 'soil-analysis':
        return await getSoilAnalysis(lat, lng)

      case 'crop-health':
        return await getCropHealthData(lat, lng)

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('NASA API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch NASA data', details: error.message },
      { status: 500 }
    )
  }
}

async function getFarmData(lat: number, lng: number, scenarioId: string | null) {
  const cacheKey = `farm-data-${lat}-${lng}-${scenarioId}`
  const cached = getCachedData(cacheKey)
  if (cached) return NextResponse.json(cached)

  const bounds = {
    north: lat + 0.05,
    south: lat - 0.05,
    east: lng + 0.05,
    west: lng - 0.05,
  }

  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(endDate.getDate() - 30) // Last 30 days

  const timeRange = {
    start: startDate.toISOString().split('T')[0],
    end: endDate.toISOString().split('T')[0],
  }

  // Get comprehensive agricultural data
  const agriculturalData = await nasaClient.getAgriculturalData(bounds, timeRange)
  
  // Get specific scenario requirements
  const scenarioData = scenarioId 
    ? FARMING_SCENARIOS.find(s => s.id === scenarioId)
    : null

  const farmData = {
    location: { lat, lng },
    scenario: scenarioData,
    data: agriculturalData,
    educational_insights: generateEducationalInsights(agriculturalData, scenarioData),
    game_metrics: calculateGameMetrics(agriculturalData),
    timestamp: new Date().toISOString(),
  }

  setCachedData(cacheKey, farmData, 30) // Cache for 30 minutes
  return NextResponse.json(farmData)
}

async function getTerrainData(lat: number, lng: number) {
  const cacheKey = `terrain-${lat}-${lng}`
  const cached = getCachedData(cacheKey)
  if (cached) return NextResponse.json(cached)

  // Simulate terrain data (in production, use NASA DEM data)
  const terrainData = {
    elevation: generateRealisticElevation(lat, lng),
    slope: generateSlope(lat, lng),
    aspect: generateAspect(lat, lng),
    drainage: generateDrainage(lat, lng),
    soil_type: determineSoilType(lat, lng),
  }

  setCachedData(cacheKey, terrainData, 240) // Cache for 4 hours
  return NextResponse.json(terrainData)
}

async function getSoilAnalysis(lat: number, lng: number) {
  const cacheKey = `soil-${lat}-${lng}`
  const cached = getCachedData(cacheKey)
  if (cached) return NextResponse.json(cached)

  const bounds = {
    north: lat + 0.01,
    south: lat - 0.01,
    east: lng + 0.01,
    west: lng - 0.01,
  }

  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(endDate.getDate() - 7) // Last week

  const timeRange = {
    start: startDate.toISOString().split('T')[0],
    end: endDate.toISOString().split('T')[0],
  }

  // Get SMAP soil moisture data
  const smapData = await nasaClient.getSMAPData(bounds, timeRange)
  
  const soilAnalysis = {
    moisture_profile: {
      surface: smapData.map(d => ({ value: d.soilMoisture, timestamp: d.timestamp })),
      root_zone: smapData.map(d => ({ value: d.soilMoisture * 0.8, timestamp: d.timestamp })), // Simplified
    },
    irrigation_recommendations: generateIrrigationRecommendations(smapData),
    educational_notes: {
      data_source: 'NASA SMAP (Soil Moisture Active Passive)',
      resolution: '9km EASE-Grid',
      update_frequency: 'Every 2-3 days',
      depth_measurement: 'Top 5cm of soil',
      limitations: [
        'Does not measure root zone moisture directly',
        'Affected by vegetation cover and surface roughness',
        'Lower accuracy in frozen or very dry conditions'
      ],
      applications: [
        'Drought monitoring and early warning',
        'Irrigation scheduling optimization', 
        'Crop stress detection',
        'Water resource management'
      ]
    }
  }

  setCachedData(cacheKey, soilAnalysis, 60) // Cache for 1 hour
  return NextResponse.json(soilAnalysis)
}

async function getCropHealthData(lat: number, lng: number) {
  const cacheKey = `crop-health-${lat}-${lng}`
  const cached = getCachedData(cacheKey)
  if (cached) return NextResponse.json(cached)

  const bounds = {
    north: lat + 0.01,
    south: lat - 0.01,
    east: lng + 0.01,
    west: lng - 0.01,
  }

  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(endDate.getDate() - 32) // Last 32 days for 2 MODIS composites

  const timeRange = {
    start: startDate.toISOString().split('T')[0],
    end: endDate.toISOString().split('T')[0],
  }

  // Get MODIS vegetation data
  const modisData = await nasaClient.getMODISData(bounds, timeRange)
  
  const cropHealthData = {
    vegetation_indices: {
      ndvi: modisData.map(d => ({ value: d.ndvi, timestamp: d.timestamp })),
      evi: modisData.map(d => ({ value: d.evi, timestamp: d.timestamp })),
    },
    health_assessment: assessCropHealth(modisData),
    growth_stage: estimateGrowthStage(modisData),
    stress_indicators: detectStressIndicators(modisData),
    educational_notes: {
      data_source: 'NASA MODIS (Moderate Resolution Imaging Spectroradiometer)',
      ndvi_explanation: 'Normalized Difference Vegetation Index - measures vegetation greenness and density',
      evi_explanation: 'Enhanced Vegetation Index - improved sensitivity in high biomass regions',
      resolution: '250m for NDVI, 500m for EVI',
      temporal_resolution: '16-day composite',
      interpretation: {
        'NDVI > 0.7': 'Very healthy, dense vegetation',
        'NDVI 0.5-0.7': 'Healthy vegetation',
        'NDVI 0.3-0.5': 'Moderate vegetation cover',
        'NDVI < 0.3': 'Sparse vegetation or stressed crops'
      }
    }
  }

  setCachedData(cacheKey, cropHealthData, 120) // Cache for 2 hours
  return NextResponse.json(cropHealthData)
}

async function getWeatherData(lat: number, lng: number) {
  const cacheKey = `weather-${lat}-${lng}`
  const cached = getCachedData(cacheKey)
  if (cached) return NextResponse.json(cached)

  const coordinates: [number, number] = [lng, lat]
  const weatherAnalysis = await nasaClient.getWeatherAnalysis(coordinates, 14)
  
  setCachedData(cacheKey, weatherAnalysis, 30) // Cache for 30 minutes
  return NextResponse.json(weatherAnalysis)
}

// Educational insight generation
function generateEducationalInsights(data: any, scenario: any) {
  const insights = []

  // Soil moisture insights
  if (data.soilMoisture && data.soilMoisture.length > 0) {
    const avgMoisture = data.soilMoisture.reduce((sum: number, item: any) => sum + item.soilMoisture, 0) / data.soilMoisture.length
    
    if (avgMoisture < 0.2) {
      insights.push({
        type: 'critical',
        title: 'Low Soil Moisture Detected',
        message: 'SMAP data shows soil moisture below 20%. This indicates potential drought stress. Consider implementing deficit irrigation strategies.',
        learning_objective: 'Understanding critical soil moisture thresholds for different crops'
      })
    }
  }

  // Vegetation health insights
  if (data.vegetation && data.vegetation.length > 0) {
    const avgNDVI = data.vegetation.reduce((sum: number, item: any) => sum + item.ndvi, 0) / data.vegetation.length
    
    if (avgNDVI < 0.5) {
      insights.push({
        type: 'warning',
        title: 'Vegetation Stress Indicators',
        message: 'MODIS NDVI values below 0.5 suggest vegetation stress. Check for nutrient deficiencies, water stress, or pest issues.',
        learning_objective: 'Interpreting vegetation indices for crop health assessment'
      })
    }
  }

  return insights
}

function calculateGameMetrics(data: any) {
  // Calculate game scores based on real NASA data
  const metrics = {
    sustainability_score: 0,
    efficiency_score: 0,
    yield_potential: 0,
    resource_optimization: 0,
  }

  // Sustainability based on water use efficiency
  if (data.evapotranspiration && data.precipitation) {
    const avgET = data.evapotranspiration.reduce((sum: number, item: any) => sum + item.evapotranspiration, 0) / data.evapotranspiration.length
    const totalPrecip = data.precipitation.reduce((sum: number, item: any) => sum + item.precipitationRate, 0)
    
    metrics.sustainability_score = Math.min(100, (totalPrecip / (avgET * 30)) * 50)
  }

  return metrics
}

// Helper functions for terrain generation (simplified for demo)
function generateRealisticElevation(lat: number, lng: number) {
  // Simple elevation model based on known geographic patterns
  const baseElevation = Math.abs(lat) * 10 + Math.sin(lng * 0.1) * 50
  return Math.max(0, baseElevation + (Math.random() - 0.5) * 20)
}

function generateSlope(lat: number, lng: number) {
  return Math.random() * 15 // 0-15 degree slope
}

function generateAspect(lat: number, lng: number) {
  return Math.random() * 360 // 0-360 degrees
}

function generateDrainage(lat: number, lng: number) {
  return ['well-drained', 'moderately-drained', 'poorly-drained'][Math.floor(Math.random() * 3)]
}

function determineSoilType(lat: number, lng: number) {
  // Simplified soil type determination
  const soilTypes = ['loam', 'clay-loam', 'sandy-loam', 'clay', 'sand']
  return soilTypes[Math.floor(Math.random() * soilTypes.length)]
}

function generateIrrigationRecommendations(smapData: any[]) {
  if (!smapData.length) return []
  
  const avgMoisture = smapData.reduce((sum, item) => sum + item.soilMoisture, 0) / smapData.length
  
  const recommendations = []
  
  if (avgMoisture < 0.25) {
    recommendations.push({
      priority: 'high',
      action: 'immediate_irrigation',
      amount: '25-30mm',
      reason: 'Soil moisture below wilting point'
    })
  } else if (avgMoisture < 0.35) {
    recommendations.push({
      priority: 'medium', 
      action: 'schedule_irrigation',
      amount: '15-20mm',
      reason: 'Approaching stress threshold'
    })
  }
  
  return recommendations
}

function assessCropHealth(modisData: any[]) {
  if (!modisData.length) return 'unknown'
  
  const avgNDVI = modisData.reduce((sum, item) => sum + item.ndvi, 0) / modisData.length
  
  if (avgNDVI > 0.7) return 'excellent'
  if (avgNDVI > 0.5) return 'good'
  if (avgNDVI > 0.3) return 'fair'
  return 'poor'
}

function estimateGrowthStage(modisData: any[]) {
  // Simplified growth stage estimation based on NDVI trends
  if (modisData.length < 2) return 'unknown'
  
  const recent = modisData.slice(-2)
  const trend = recent[1].ndvi - recent[0].ndvi
  
  if (trend > 0.1) return 'rapid_growth'
  if (trend > 0.05) return 'active_growth'
  if (trend > -0.05) return 'mature'
  return 'senescence'
}

function detectStressIndicators(modisData: any[]) {
  const indicators = []
  
  if (modisData.length >= 2) {
    const recent = modisData.slice(-2)
    const ndviDecline = recent[0].ndvi - recent[1].ndvi
    
    if (ndviDecline > 0.1) {
      indicators.push({
        type: 'vegetation_decline',
        severity: 'high',
        description: 'Rapid decline in vegetation health detected'
      })
    }
  }
  
  return indicators
}