/**
 * NASA Farm Navigators - Educational Farm Visualization
 * Real NASA satellite data integration for educational farming gameplay
 * Challenge: Bridge gap between complex NASA data and practical farming applications
 */

"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { SafeFarm3D } from "@/components/safe-farm-3d"
import { nasaClient } from "@/lib/enhanced-nasa-client"
import { 
  Loader2, 
  Droplets, 
  Thermometer, 
  Eye, 
  Satellite,
  Sprout,
  CloudRain,
  Sun,
  AlertTriangle,
  TrendingUp,
  Book,
  Target,
  Map,
  BarChart3,
  Play,
  Award,
  Users
} from "lucide-react"

// Educational NASA Data Types
interface NASAFarmData {
  location: {
    lat: number
    lng: number
    name: string
  }
  scenario: {
    id: string
    name: string
    description: string
    farmType: string
    challenges: string[]
    objectives: string[]
  }
  realTimeData: {
    soilMoisture: Array<{ value: number; timestamp: string; depth: string }>
    vegetation: Array<{ ndvi: number; evi: number; timestamp: string }>
    precipitation: Array<{ value: number; timestamp: string }>
    temperature: Array<{ value: number; timestamp: string }>
    evapotranspiration: Array<{ value: number; timestamp: string }>
  }
  educationalInsights: Array<{
    type: 'critical' | 'warning' | 'info' | 'success'
    title: string
    message: string
    dataSource: string
    learningObjective: string
  }>
  gameMetrics: {
    sustainabilityScore: number
    efficiencyScore: number
    yieldPotential: number
    resourceOptimization: number
    completedObjectives: number
    totalObjectives: number
  }
}

// Educational farming scenarios
const FARM_SCENARIOS = [
  {
    id: 'drought-management',
    name: 'California Drought Challenge',
    description: 'Learn to manage water resources during drought using NASA SMAP soil moisture data',
    farmType: 'Commercial Orchard',
    region: 'Central Valley, California',
    crops: ['Almonds', 'Grapes', 'Citrus'],
    challenges: [
      'Water scarcity - Only 60% of normal rainfall',
      'Heat stress - Temperatures 3°C above average',
      'Irrigation optimization - Reduce water use by 25%'
    ],
    objectives: [
      'Use SMAP data to identify optimal irrigation timing',
      'Understand relationship between soil moisture depths',
      'Implement deficit irrigation strategies',
      'Monitor crop stress using MODIS vegetation indices'
    ],
    nasaDatasets: ['SMAP L3', 'MODIS NDVI', 'GPM IMERG', 'ECOSTRESS ET'],
    difficulty: 'Advanced',
    estimatedTime: '45 minutes'
  },
  {
    id: 'crop-health-monitoring',
    name: 'Midwest Crop Health Challenge',
    description: 'Use satellite vegetation indices to detect crop stress and optimize yields',
    farmType: 'Row Crop Farm',
    region: 'Iowa Corn Belt',
    crops: ['Corn', 'Soybeans'],
    challenges: [
      'Early disease detection using satellite data',
      'Nutrient deficiency identification',
      'Growth stage monitoring across large fields'
    ],
    objectives: [
      'Interpret NDVI vs EVI differences',
      'Identify stress patterns in vegetation time series',
      'Connect satellite observations to field conditions',
      'Plan variable-rate fertilizer applications'
    ],
    nasaDatasets: ['MODIS NDVI', 'MODIS EVI', 'Landsat 8/9', 'SMAP L4'],
    difficulty: 'Intermediate',
    estimatedTime: '30 minutes'
  },
  {
    id: 'precision-agriculture',
    name: 'Great Plains Precision Agriculture',
    description: 'Integrate multiple NASA datasets for comprehensive farm management',
    farmType: 'Large-scale Industrial Farm',
    region: 'Kansas/Nebraska',
    crops: ['Wheat', 'Corn', 'Soybeans'],
    challenges: [
      'Multi-sensor data fusion',
      'Variable-rate application mapping',
      'Yield optimization across management zones'
    ],
    objectives: [
      'Combine soil moisture, vegetation, and weather data',
      'Create management zones from satellite data',
      'Understand spatial and temporal data resolution trade-offs',
      'Develop data-driven planting strategies'
    ],
    nasaDatasets: ['SMAP L4', 'MODIS Suite', 'GPM', 'ECOSTRESS', 'Landsat'],
    difficulty: 'Expert',
    estimatedTime: '60 minutes'
  }
]

// Canvas-based Farm Visualization
function FarmVisualizationCanvas({ 
  data, 
  scenario, 
  onFieldClick 
}: { 
  data: NASAFarmData | null
  scenario: any
  onFieldClick: (fieldId: string) => void 
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedField, setSelectedField] = useState<string | null>(null)

  useEffect(() => {
    if (!canvasRef.current || !data) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = 800
    canvas.height = 600

    // Clear canvas
    ctx.fillStyle = '#0f172a'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw farm fields with NASA data visualization
    drawFarmFields(ctx, data, scenario)
    drawNASADataOverlay(ctx, data)
    drawEducationalAnnotations(ctx, data.educationalInsights)

  }, [data, scenario])

  const drawFarmFields = (ctx: CanvasRenderingContext2D, farmData: NASAFarmData, scenario: any) => {
    const fields = [
      { id: 'field-1', x: 100, y: 100, width: 150, height: 100, crop: scenario.crops[0] },
      { id: 'field-2', x: 300, y: 100, width: 150, height: 100, crop: scenario.crops[1] },
      { id: 'field-3', x: 100, y: 250, width: 150, height: 100, crop: scenario.crops[2] || scenario.crops[0] },
      { id: 'field-4', x: 300, y: 250, width: 150, height: 100, crop: scenario.crops[1] },
    ]

    fields.forEach((field, index) => {
      // Color based on NDVI health
      const ndvi = farmData.realTimeData.vegetation[index]?.ndvi || 0.5
      const healthColor = getHealthColor(ndvi)
      
      ctx.fillStyle = healthColor
      ctx.fillRect(field.x, field.y, field.width, field.height)
      
      // Field border
      ctx.strokeStyle = selectedField === field.id ? '#3b82f6' : '#4b5563'
      ctx.lineWidth = selectedField === field.id ? 3 : 1
      ctx.strokeRect(field.x, field.y, field.width, field.height)
      
      // Field label
      ctx.fillStyle = '#ffffff'
      ctx.font = '12px Arial'
      ctx.fillText(field.crop, field.x + 10, field.y + 20)
      ctx.fillText(`NDVI: ${ndvi.toFixed(2)}`, field.x + 10, field.y + 35)
      
      // Soil moisture indicator
      const moisture = farmData.realTimeData.soilMoisture[index]?.value || 0.3
      ctx.fillStyle = getMoistureColor(moisture)
      ctx.fillRect(field.x + field.width - 20, field.y + 10, 10, 20)
      
      ctx.fillStyle = '#ffffff'
      ctx.font = '8px Arial'
      ctx.fillText(`${(moisture * 100).toFixed(0)}%`, field.x + field.width - 35, field.y + 25)
    })
  }

  const drawNASADataOverlay = (ctx: CanvasRenderingContext2D, farmData: NASAFarmData) => {
    // Draw satellite imagery overlay
    ctx.globalAlpha = 0.3
    ctx.fillStyle = '#4338ca'
    ctx.fillRect(500, 50, 250, 200)
    
    ctx.globalAlpha = 1
    ctx.fillStyle = '#ffffff'
    ctx.font = '14px Arial'
    ctx.fillText('NASA Satellite View', 520, 70)
    
    // Draw precipitation overlay
    const precip = farmData.realTimeData.precipitation[0]?.value || 0
    if (precip > 10) {
      ctx.fillStyle = 'rgba(59, 130, 246, 0.3)'
      for (let i = 0; i < 50; i++) {
        ctx.fillRect(
          Math.random() * 600 + 50,
          Math.random() * 400 + 50,
          2, 20
        )
      }
    }
  }

  const drawEducationalAnnotations = (ctx: CanvasRenderingContext2D, insights: any[]) => {
    insights.forEach((insight, index) => {
      const y = 400 + (index * 60)
      
      // Alert box
      ctx.fillStyle = insight.type === 'critical' ? '#ef4444' : 
                      insight.type === 'warning' ? '#f59e0b' : 
                      insight.type === 'success' ? '#10b981' : '#3b82f6'
      ctx.fillRect(500, y, 250, 50)
      
      // Alert text
      ctx.fillStyle = '#ffffff'
      ctx.font = '12px Arial'
      ctx.fillText(insight.title, 510, y + 15)
      ctx.font = '10px Arial'
      ctx.fillText(insight.dataSource, 510, y + 30)
      ctx.fillText(insight.learningObjective.substring(0, 35) + '...', 510, y + 45)
    })
  }

  const getHealthColor = (ndvi: number) => {
    if (ndvi > 0.7) return '#22c55e'
    if (ndvi > 0.5) return '#84cc16'
    if (ndvi > 0.3) return '#eab308'
    return '#ef4444'
  }

  const getMoistureColor = (moisture: number) => {
    if (moisture > 0.4) return '#06b6d4'
    if (moisture > 0.3) return '#3b82f6'
    if (moisture > 0.2) return '#f59e0b'
    return '#ef4444'
  }

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    // Check if click is on a field
    const fields = [
      { id: 'field-1', x: 100, y: 100, width: 150, height: 100 },
      { id: 'field-2', x: 300, y: 100, width: 150, height: 100 },
      { id: 'field-3', x: 100, y: 250, width: 150, height: 100 },
      { id: 'field-4', x: 300, y: 250, width: 150, height: 100 },
    ]

    fields.forEach(field => {
      if (x >= field.x && x <= field.x + field.width &&
          y >= field.y && y <= field.y + field.height) {
        setSelectedField(field.id)
        onFieldClick(field.id)
      }
    })
  }

  return (
    <canvas
      ref={canvasRef}
      className="border border-blue-500/30 rounded-lg cursor-pointer bg-slate-900"
      onClick={handleCanvasClick}
    />
  )
}

// NASA Data Panel
function NASADataPanel({ data }: { data: NASAFarmData | null }) {
  if (!data || !data.realTimeData) {
    return (
      <div className="space-y-4">
        <Card className="bg-black/80 backdrop-blur-xl border border-blue-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Satellite className="w-5 h-5 text-blue-400" />
              Loading NASA Data...
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center text-gray-300 py-8">
              <div className="animate-pulse">Fetching real-time satellite data...</div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Card className="bg-black/80 backdrop-blur-xl border border-blue-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Satellite className="w-5 h-5 text-blue-400" />
            Real-time NASA Data
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Soil Moisture */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-white">Soil Moisture (SMAP)</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {(data.realTimeData?.soilMoisture || []).slice(0, 4).map((item, index) => (
                <div key={index} className="bg-blue-900/20 rounded p-2 border border-blue-500/30">
                  <div className="text-xs text-blue-300">Field {index + 1}</div>
                  <div className="text-sm font-semibold text-white">
                    {((item?.value || 0) * 100).toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-400">{item?.depth || 'Surface'}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Vegetation Health */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sprout className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-white">Vegetation Health (MODIS)</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {(data.realTimeData?.vegetation || []).slice(0, 4).map((item, index) => (
                <div key={index} className="bg-green-900/20 rounded p-2 border border-green-500/30">
                  <div className="text-xs text-green-300">NDVI</div>
                  <div className="text-sm font-semibold text-white">
                    {(item?.ndvi || 0).toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-400">
                    {(item?.ndvi || 0) > 0.7 ? 'Excellent' : 
                     (item?.ndvi || 0) > 0.5 ? 'Good' : 
                     (item?.ndvi || 0) > 0.3 ? 'Fair' : 'Poor'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weather Data */}
          <div className="flex justify-between items-center p-3 bg-gray-900/40 rounded border border-gray-600/30">
            <div className="flex items-center gap-2">
              <CloudRain className="w-4 h-4 text-cyan-400" />
              <div>
                <div className="text-sm font-medium text-white">Precipitation</div>
                <div className="text-xs text-gray-400">GPM IMERG</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-white">
                {data.realTimeData?.precipitation?.[0]?.value?.toFixed(1) || '0.0'} mm
              </div>
              <div className="text-xs text-gray-400">Last 6 hours</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Game Metrics Display
function GameMetricsPanel({ metrics }: { metrics: any }) {
  return (
    <Card className="bg-black/80 backdrop-blur-xl border border-blue-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Target className="w-5 h-5 text-purple-400" />
          Game Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-white">Sustainability Score</span>
              <span className="text-white">{metrics.sustainabilityScore}/100</span>
            </div>
            <Progress value={metrics.sustainabilityScore} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-white">Resource Efficiency</span>
              <span className="text-white">{metrics.efficiencyScore}/100</span>
            </div>
            <Progress value={metrics.efficiencyScore} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-white">Yield Potential</span>
              <span className="text-white">{metrics.yieldPotential}/100</span>
            </div>
            <Progress value={metrics.yieldPotential} className="h-2" />
          </div>
        </div>

        <div className="pt-3 border-t border-blue-500/20">
          <div className="flex justify-between items-center">
            <span className="text-sm text-blue-300">Objectives Complete</span>
            <span className="text-sm font-semibold text-white">
              {metrics.completedObjectives}/{metrics.totalObjectives}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Main Educational Farm Component
export function NASAFarmNavigator() {
  const [currentScenario, setCurrentScenario] = useState(FARM_SCENARIOS[0])
  const [farmData, setFarmData] = useState<NASAFarmData | null>(null)
  const [loading, setLoading] = useState(false)
  const [selectedField, setSelectedField] = useState<string | null>(null)
  const [gameStarted, setGameStarted] = useState(false)

  // Fetch real NASA data using the enhanced client
  const fetchNASAData = useCallback(async (scenario: any) => {
    setLoading(true)
    
    try {
      // Test NASA API connection first
      const connectionTest = await nasaClient.testConnection()
      console.log('NASA API Status:', connectionTest.message)
      
      // Get real NASA data for the scenario location
      const lat = scenario.id === 'drought-management' ? 36.7783 : // California
                  scenario.id === 'crop-health-monitoring' ? 41.5868 : // Iowa  
                  39.8283 // Kansas (precision agriculture)
      const lng = scenario.id === 'drought-management' ? -119.4179 :
                  scenario.id === 'crop-health-monitoring' ? -93.6250 :
                  -98.5795
      
      const realNASAData = await nasaClient.getFarmDataWithRealNASA(lat, lng, scenario.id)
      
      if (realNASAData) {
        // Convert enhanced NASA client data to NASAFarmData format with safe fallbacks
        const nasaDataWithFallbacks = realNASAData as any
        const convertedData: NASAFarmData = {
          location: nasaDataWithFallbacks.location || {
            lat: 40.7128,
            lng: -74.0060,
            name: `${scenario.region} Farm`
          },
          scenario: {
            id: scenario.id,
            name: scenario.name,
            description: scenario.description,
            farmType: scenario.farmType,
            challenges: scenario.challenges,
            objectives: scenario.objectives
          },
          realTimeData: nasaDataWithFallbacks.realTimeData || {
            soilMoisture: [],
            vegetation: [],
            precipitation: [],
            temperature: []
          },
          educationalInsights: nasaDataWithFallbacks.educationalInsights || [],
          gameMetrics: nasaDataWithFallbacks.gameMetrics || {
            score: 0,
            accuracy: 0,
            completedChallenges: 0,
            recommendations: []
          }
        }
        setFarmData(convertedData)
      } else {
        // Fallback to educational mock data
        const mockData: NASAFarmData = {
      location: {
        lat: 40.7128,
        lng: -74.0060,
        name: `${scenario.region} Farm`
      },
      scenario: {
        id: scenario.id,
        name: scenario.name,
        description: scenario.description,
        farmType: scenario.farmType,
        challenges: scenario.challenges,
        objectives: scenario.objectives
      },
      realTimeData: {
        soilMoisture: [
          { value: 0.25, timestamp: new Date().toISOString(), depth: 'Surface (0-5cm)' },
          { value: 0.32, timestamp: new Date().toISOString(), depth: 'Surface (0-5cm)' },
          { value: 0.18, timestamp: new Date().toISOString(), depth: 'Surface (0-5cm)' },
          { value: 0.28, timestamp: new Date().toISOString(), depth: 'Surface (0-5cm)' },
        ],
        vegetation: [
          { ndvi: 0.72, evi: 0.68, timestamp: new Date().toISOString() },
          { ndvi: 0.58, evi: 0.54, timestamp: new Date().toISOString() },
          { ndvi: 0.45, evi: 0.41, timestamp: new Date().toISOString() },
          { ndvi: 0.81, evi: 0.76, timestamp: new Date().toISOString() },
        ],
        precipitation: [
          { value: 12.5, timestamp: new Date().toISOString() }
        ],
        temperature: [
          { value: 24.3, timestamp: new Date().toISOString() }
        ],
        evapotranspiration: [
          { value: 4.2, timestamp: new Date().toISOString() }
        ]
      },
      educationalInsights: [
        {
          type: 'warning',
          title: 'Low Soil Moisture Detected',
          message: 'Field 3 shows critical moisture levels below 20%',
          dataSource: 'NASA SMAP L3',
          learningObjective: 'Understanding critical soil moisture thresholds'
        },
        {
          type: 'info',
          title: 'Vegetation Stress Indicators',
          message: 'MODIS NDVI shows declining trend in Field 2',
          dataSource: 'MODIS Terra/Aqua',
          learningObjective: 'Interpreting vegetation health from satellite data'
        }
      ],
      gameMetrics: {
        sustainabilityScore: 75,
        efficiencyScore: 68,
        yieldPotential: 82,
        resourceOptimization: 71,
        completedObjectives: 2,
        totalObjectives: 4
      }
        }
        
        setFarmData(mockData)
      }
    } catch (error) {
      console.error('Error fetching NASA data:', error)
      // Fallback to basic mock data
      setFarmData(null)
    }
    
    setLoading(false)
  }, [nasaClient])

  const startScenario = async (scenario: any) => {
    setCurrentScenario(scenario)
    setGameStarted(true)
    await fetchNASAData(scenario)
  }

  const handleFieldClick = (fieldId: string) => {
    setSelectedField(fieldId)
    // Show field-specific educational content
  }

  if (!gameStarted) {
    return (
      <Card className="bg-black/80 backdrop-blur-xl border border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-2xl text-white">NASA Farm Navigators</CardTitle>
          <p className="text-blue-300">
            Educational farming game using real NASA satellite data
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
            {FARM_SCENARIOS.map((scenario) => (
              <Card key={scenario.id} className="bg-blue-900/20 border border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-lg text-white">{scenario.name}</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="bg-blue-600/20 text-blue-300">
                      {scenario.difficulty}
                    </Badge>
                    <Badge variant="secondary" className="bg-purple-600/20 text-purple-300">
                      {scenario.estimatedTime}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-300">{scenario.description}</p>
                  
                  <div>
                    <p className="text-xs font-medium text-blue-300 mb-1">Crops:</p>
                    <div className="flex gap-1 flex-wrap">
                      {scenario.crops.map(crop => (
                        <Badge key={crop} variant="outline" className="text-xs">
                          {crop}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs font-medium text-green-300 mb-1">NASA Datasets:</p>
                    <div className="text-xs text-gray-400">
                      {scenario.nasaDatasets.join(', ')}
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => startScenario(scenario)}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Scenario
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Scenario Header */}
      <Card className="bg-black/80 backdrop-blur-xl border border-blue-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-white">{currentScenario.name}</CardTitle>
              <p className="text-blue-300">{currentScenario.description}</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setGameStarted(false)}
              className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10"
            >
              Change Scenario
            </Button>
          </div>
        </CardHeader>
      </Card>

      {loading ? (
        <Card className="bg-black/80 backdrop-blur-xl border border-blue-500/30">
          <CardContent className="flex items-center justify-center h-64">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-3" />
              <p className="text-white">Loading NASA Satellite Data...</p>
              <p className="text-blue-300 text-sm mt-1">Fetching SMAP, MODIS, and GPM data</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="2d" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-black/80 backdrop-blur-xl border border-blue-500/30">
            <TabsTrigger value="2d" className="data-[state=active]:bg-blue-600/80">
              2D Canvas View
            </TabsTrigger>
            <TabsTrigger value="3d" className="data-[state=active]:bg-purple-600/80">
              3D NASA Visualization
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="2d" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Farm Visualization */}
              <Card className="bg-black/80 backdrop-blur-xl border border-blue-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Map className="w-5 h-5 text-green-400" />
                    2D Farm Canvas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <FarmVisualizationCanvas 
                    data={farmData}
                    scenario={currentScenario}
                    onFieldClick={handleFieldClick}
                  />
                  <p className="text-xs text-gray-400 mt-2">
                    Click on fields to view detailed NASA data analysis
                  </p>
                </CardContent>
              </Card>

              {/* NASA Data & Game Metrics */}
              <div className="space-y-6">
                <NASADataPanel data={farmData} />
                {farmData && <GameMetricsPanel metrics={farmData.gameMetrics} />}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="3d" className="space-y-6">
            <SafeFarm3D farmData={farmData || undefined} />
            <div className="grid lg:grid-cols-2 gap-6">
              <NASADataPanel data={farmData} />
              {farmData && <GameMetricsPanel metrics={farmData.gameMetrics} />}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}