/**
 * Advanced Farm Simulation Page
 * Production-ready 3D NASA satellite data visualization with sidebar navigation
 */

"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Satellite, 
  Map, 
  BarChart3, 
  Settings, 
  Play, 
  Pause,
  RotateCcw,
  Maximize2,
  Eye,
  Layers
} from 'lucide-react'
import ClientAdvancedScene from '@/components/client-advanced-scene'
import { NASA_GIBS_LAYERS } from '@/lib/nasa-gibs-config-safe'
import { nasaClient } from '@/lib/enhanced-nasa-client'
import FarmSidebar from '@/components/farm-sidebar'

// Loading fallback for 3D scene
function SceneLoading() {
  return (
    <div className="flex items-center justify-center h-96 bg-gradient-to-br from-blue-900/20 to-green-900/20 rounded-xl">
      <div className="text-center text-white">
        <Satellite className="w-16 h-16 mx-auto mb-4 animate-pulse text-blue-400" />
        <p className="text-lg font-semibold mb-2">Loading NASA Satellite Data...</p>
        <p className="text-sm text-gray-300">Fetching real-time SMAP, MODIS, and GPM data</p>
        <div className="mt-4 flex justify-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100" />
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200" />
        </div>
      </div>
    </div>
  )
}

// Layer control panel
function LayerControls({ 
  activeLayers, 
  onLayerToggle 
}: {
  activeLayers: string[]
  onLayerToggle: (layerId: string) => void
}) {
  return (
    <Card className="bg-black/80 backdrop-blur-xl border border-blue-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white text-sm">
          <Layers className="w-4 h-4 text-blue-400" />
          NASA Data Layers
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {Object.entries(NASA_GIBS_LAYERS).map(([key, layer]) => (
          <div key={key} className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-xs font-medium text-white">{layer.name}</div>
              <div className="text-xs text-gray-400">{layer.description}</div>
            </div>
            <Button
              size="sm"
              variant={activeLayers.includes(key) ? "default" : "outline"}
              onClick={() => onLayerToggle(key)}
              className={activeLayers.includes(key) 
                ? "bg-blue-600 hover:bg-blue-700 text-white" 
                : "border-gray-600 text-gray-300 hover:bg-gray-700"
              }
            >
              {activeLayers.includes(key) ? <Eye className="w-3 h-3" /> : <Eye className="w-3 h-3 opacity-50" />}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

// Scene controls
function SceneControls({ 
  isPlaying, 
  onPlayPause, 
  onReset,
  onFullscreen 
}: {
  isPlaying: boolean
  onPlayPause: () => void
  onReset: () => void
  onFullscreen: () => void
}) {
  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        onClick={onPlayPause}
        className="bg-green-600 hover:bg-green-700"
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={onReset}
        className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10"
      >
        <RotateCcw className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={onFullscreen}
        className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
      >
        <Maximize2 className="w-4 h-4" />
      </Button>
    </div>
  )
}

// Real-time metrics panel
function RealTimeMetrics({ farmData }: { farmData: any }) {
  if (!farmData) return null

  const metrics = [
    {
      label: 'Vegetation Health',
      value: farmData.realTimeData?.vegetation?.[0]?.ndvi?.toFixed(2) || 'N/A',
      unit: 'NDVI',
      color: 'text-green-400',
      source: 'MODIS Terra'
    },
    {
      label: 'Soil Moisture',
      value: farmData.realTimeData?.soilMoisture?.[0]?.value 
        ? `${(farmData.realTimeData.soilMoisture[0].value * 100).toFixed(0)}%`
        : 'N/A',
      unit: 'Surface',
      color: 'text-blue-400',
      source: 'SMAP L4'
    },
    {
      label: 'Temperature',
      value: farmData.realTimeData?.temperature?.[0]?.value?.toFixed(1) || 'N/A',
      unit: '°C',
      color: 'text-orange-400',
      source: 'NASA POWER'
    },
    {
      label: 'Precipitation',
      value: farmData.realTimeData?.precipitation?.[0]?.value?.toFixed(1) || 'N/A',
      unit: 'mm',
      color: 'text-cyan-400',
      source: 'GPM IMERG'
    }
  ]

  return (
    <Card className="bg-black/80 backdrop-blur-xl border border-blue-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white text-sm">
          <BarChart3 className="w-4 h-4 text-green-400" />
          Real-time Metrics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {metrics.map((metric, index) => (
          <div key={index} className="flex justify-between items-center">
            <div>
              <div className="text-xs font-medium text-white">{metric.label}</div>
              <div className="text-xs text-gray-400">{metric.source}</div>
            </div>
            <div className="text-right">
              <div className={`text-sm font-bold ${metric.color}`}>
                {metric.value} {metric.unit}
              </div>
            </div>
          </div>
        ))}
        
        <div className="pt-2 border-t border-gray-700">
          <div className="text-xs text-gray-400 text-center">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function FarmSimulationPage() {
  const [farmData, setFarmData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeLayers, setActiveLayers] = useState(['MODIS_TRUE_COLOR', 'MODIS_NDVI'])
  const [isPlaying, setIsPlaying] = useState(true)
  const [selectedScenario, setSelectedScenario] = useState({
    id: 'drought-management',
    name: 'California Drought Challenge',
    region: 'Central Valley, California'
  })

  // Fetch NASA data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const data = await nasaClient.getFarmDataWithRealNASA(36.7783, -119.4179, 'drought-management')
        setFarmData(data)
      } catch (error) {
        console.error('Failed to fetch NASA data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [selectedScenario])

  const handleLayerToggle = (layerId: string) => {
    setActiveLayers(prev => 
      prev.includes(layerId) 
        ? prev.filter(id => id !== layerId)
        : [...prev, layerId]
    )
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleReset = () => {
    // Reset camera and scene state
    setIsPlaying(false)
    setTimeout(() => setIsPlaying(true), 100)
  }

  const handleFullscreen = () => {
    // Implement fullscreen mode
    document.documentElement.requestFullscreen()
  }

  const handleFieldClick = (fieldId: string) => {
    console.log('Field clicked:', fieldId)
    // Add field-specific analysis
  }

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Sidebar */}
      <FarmSidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">
                Advanced Farm Simulation
              </h1>
              <p className="text-blue-300 text-sm">
                Production-ready 3D visualization with real NASA satellite data
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-green-600/20 text-green-300">
                <Satellite className="w-3 h-3 mr-1" />
                Live NASA Data
              </Badge>
              <SceneControls
                isPlaying={isPlaying}
                onPlayPause={handlePlayPause}
                onReset={handleReset}
                onFullscreen={handleFullscreen}
              />
            </div>
          </div>
        </div>
        
        {/* Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="space-y-6">

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main 3D Scene */}
          <div className="lg:col-span-3">
            <Card className="bg-black/80 backdrop-blur-xl border border-blue-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Map className="w-5 h-5 text-blue-400" />
                  3D Farm Visualization
                  <Badge variant="secondary" className="ml-2">
                    React Three Fiber + NASA GIBS
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[600px] w-full rounded-lg overflow-hidden">
                  <ClientAdvancedScene
                    activeLayers={activeLayers}
                    farmData={farmData}
                    onFieldClick={handleFieldClick}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Control Panels */}
          <div className="space-y-6">
            <LayerControls
              activeLayers={activeLayers}
              onLayerToggle={handleLayerToggle}
            />
            
            <RealTimeMetrics farmData={farmData} />
            
            {/* Scenario Info */}
            <Card className="bg-black/80 backdrop-blur-xl border border-blue-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white text-sm">
                  <Settings className="w-4 h-4 text-purple-400" />
                  Current Scenario
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-white">{selectedScenario.name}</div>
                  <div className="text-xs text-gray-400">{selectedScenario.region}</div>
                  <Badge className="bg-orange-600/20 text-orange-300 text-xs">
                    Drought Conditions
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Technical Info */}
        <Card className="bg-black/80 backdrop-blur-xl border border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-white text-sm">Technical Implementation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 text-xs">
              <div>
                <div className="text-blue-300 font-medium mb-1">Frontend Stack</div>
                <div className="text-gray-400">Next.js 14 • React Three Fiber • Three.js • Drei • Post-processing</div>
              </div>
              <div>
                <div className="text-green-300 font-medium mb-1">NASA Data Sources</div>
                <div className="text-gray-400">GIBS WMTS • SMAP L4 • MODIS NDVI • GPM IMERG • Real-time tiles</div>
              </div>
              <div>
                <div className="text-purple-300 font-medium mb-1">Performance Features</div>
                <div className="text-gray-400">Instanced meshes • Terrain streaming • GPU shaders • LOD system</div>
              </div>
            </div>
          </CardContent>
        </Card>
          </div>
        </div>
      </div>
    </div>
  )
}