/**
 * 3D Farm Visualization with Real NASA Data Overlay
 * Interactive 3D farm environment showing satellite data integration
 */

"use client"

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Text, Box, Plane, Sphere, useTexture } from '@react-three/drei'
import { useRef, useState, useEffect, Suspense } from 'react'
import { Mesh, Vector3 } from 'three'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Droplets, Sprout, Thermometer, Satellite, Eye, Zap } from 'lucide-react'

// 3D Farm Field Component
function FarmField({ 
  position, 
  soilMoisture, 
  ndvi, 
  temperature, 
  cropType, 
  onClick 
}: {
  position: [number, number, number]
  soilMoisture: number
  ndvi: number  
  temperature: number
  cropType: string
  onClick: () => void
}) {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  // Color based on vegetation health (NDVI)
  const getFieldColor = () => {
    if (ndvi > 0.7) return '#22c55e' // Healthy green
    if (ndvi > 0.5) return '#84cc16' // Medium green  
    if (ndvi > 0.3) return '#eab308' // Yellow-green
    return '#ef4444' // Red (stressed)
  }
  
  // Soil moisture visualization (darker = more moisture)
  const getSoilColor = () => {
    const moisture = Math.max(0, Math.min(1, soilMoisture))
    const darkness = moisture * 0.5
    return `rgb(${Math.floor(139 * (1 - darkness))}, ${Math.floor(69 * (1 - darkness))}, ${Math.floor(19 * (1 - darkness))})`
  }

  return (
    <group position={position}>
      {/* Soil base */}
      <Box
        ref={meshRef}
        args={[2, 0.1, 2]}
        position={[0, -0.05, 0]}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial color={getSoilColor()} />
      </Box>
      
      {/* Crop vegetation */}
      <Box
        args={[1.8, ndvi * 2, 1.8]}
        position={[0, ndvi, 0]}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial 
          color={getFieldColor()} 
          transparent 
          opacity={0.8}
          wireframe={hovered}
        />
      </Box>
      
      {/* Field label */}
      {hovered && (
        <Text
          position={[0, ndvi * 2 + 0.5, 0]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {cropType}
          {'\n'}NDVI: {ndvi.toFixed(2)}
          {'\n'}Soil: {(soilMoisture * 100).toFixed(0)}%
          {'\n'}Temp: {temperature.toFixed(1)}°C
        </Text>
      )}
      
      {/* Moisture indicator spheres */}
      <Sphere
        args={[0.1]}
        position={[0.8, 0.2, 0.8]}
      >
        <meshStandardMaterial 
          color={soilMoisture > 0.4 ? '#06b6d4' : soilMoisture > 0.2 ? '#f59e0b' : '#ef4444'} 
        />
      </Sphere>
    </group>
  )
}

// Weather visualization component
function WeatherOverlay({ 
  precipitation, 
  temperature, 
  humidity 
}: {
  precipitation: number
  temperature: number  
  humidity: number
}) {
  return (
    <group position={[0, 5, 0]}>
      {/* Rain particles */}
      {precipitation > 1 && Array.from({ length: Math.min(precipitation * 2, 20) }).map((_, i) => (
        <Sphere
          key={i}
          args={[0.02]}
          position={[
            (Math.random() - 0.5) * 10,
            Math.random() * 3,
            (Math.random() - 0.5) * 10
          ]}
        >
          <meshStandardMaterial color="#3b82f6" transparent opacity={0.6} />
        </Sphere>
      ))}
      
      {/* Temperature indicator */}
      <Sphere
        args={[0.3]}
        position={[0, 2, 0]}
      >
        <meshStandardMaterial 
          color={temperature > 30 ? '#ef4444' : temperature > 20 ? '#f59e0b' : '#3b82f6'}
          emissive={temperature > 35 ? '#ff4444' : '#000000'}
        />
      </Sphere>
    </group>
  )
}

// NASA Satellite overlay
function SatelliteOverlay() {
  const satelliteRef = useRef<Mesh>(null)
  
  useEffect(() => {
    if (satelliteRef.current) {
      const animate = () => {
        if (satelliteRef.current) {
          satelliteRef.current.rotation.y += 0.01
          satelliteRef.current.position.y = 8 + Math.sin(Date.now() * 0.001) * 0.5
        }
        requestAnimationFrame(animate)
      }
      animate()
    }
  }, [])
  
  return (
    <group position={[6, 8, 6]}>
      <Box
        ref={satelliteRef}
        args={[0.5, 0.2, 0.8]}
      >
        <meshStandardMaterial color="#4338ca" emissive="#1e1b4b" />
      </Box>
      
      {/* Solar panels */}
      <Plane
        args={[1, 0.6]}
        position={[-0.6, 0, 0]}
        rotation={[0, 0, Math.PI / 6]}
      >
        <meshStandardMaterial color="#1e40af" />
      </Plane>
      <Plane
        args={[1, 0.6]}
        position={[0.6, 0, 0]}
        rotation={[0, 0, -Math.PI / 6]}
      >
        <meshStandardMaterial color="#1e40af" />
      </Plane>
      
      {/* Data beam */}
      <Sphere
        args={[0.05]}
        position={[0, -4, 0]}
      >
        <meshStandardMaterial color="#06b6d4" emissive="#0891b2" />
      </Sphere>
    </group>
  )
}

// Loading fallback
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-white">Loading 3D Farm Visualization...</div>
    </div>
  )
}

// Main 3D Farm Scene
function FarmScene({ farmData, onFieldClick }: { farmData: any; onFieldClick: (fieldId: string) => void }) {
  if (!farmData) return null

  const fields = [
    { id: 'field-1', position: [-2, 0, -2] as [number, number, number], crop: 'Corn' },
    { id: 'field-2', position: [2, 0, -2] as [number, number, number], crop: 'Soybeans' },
    { id: 'field-3', position: [-2, 0, 2] as [number, number, number], crop: 'Wheat' },
    { id: 'field-4', position: [2, 0, 2] as [number, number, number], crop: 'Barley' },
  ]

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[0, 10, 0]} intensity={0.8} color="#fbbf24" />
      
      {/* Ground plane */}
      <Plane
        args={[20, 20]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.5, 0]}
      >
        <meshStandardMaterial color="#8b5a2b" />
      </Plane>
      
      {/* Farm fields */}
      {fields.map((field, index) => (
        <FarmField
          key={field.id}
          position={field.position}
          soilMoisture={farmData.realTimeData.soilMoisture[index]?.value || 0.3}
          ndvi={farmData.realTimeData.vegetation[index]?.ndvi || 0.5}
          temperature={farmData.realTimeData.temperature[0]?.value || 25}
          cropType={field.crop}
          onClick={() => onFieldClick(field.id)}
        />
      ))}
      
      {/* Weather overlay */}
      <WeatherOverlay
        precipitation={farmData.realTimeData.precipitation[0]?.value || 0}
        temperature={farmData.realTimeData.temperature[0]?.value || 25}
        humidity={60}
      />
      
      {/* NASA Satellite */}
      <SatelliteOverlay />
      
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      <Environment preset="sunset" />
    </>
  )
}

// NASA Data Panel for 3D View
function NASA3DDataPanel({ data, selectedField }: { data: any; selectedField: string | null }) {
  if (!data) return null

  return (
    <div className="space-y-4">
      <Card className="bg-black/80 backdrop-blur-xl border border-blue-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Satellite className="w-5 h-5 text-blue-400" />
            3D NASA Data Visualization
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Badge className="bg-green-600/20 text-green-300">
                <Sprout className="w-3 h-3 mr-1" />
                MODIS NDVI
              </Badge>
              <div className="text-sm text-white">
                Vegetation health visualization in 3D crop height
              </div>
            </div>
            
            <div className="space-y-2">
              <Badge className="bg-blue-600/20 text-blue-300">
                <Droplets className="w-3 h-3 mr-1" />
                SMAP Soil Moisture
              </Badge>
              <div className="text-sm text-white">
                Soil color darkness represents moisture levels
              </div>
            </div>
            
            <div className="space-y-2">
              <Badge className="bg-cyan-600/20 text-cyan-300">
                <Eye className="w-3 h-3 mr-1" />
                GPM Precipitation
              </Badge>
              <div className="text-sm text-white">
                Real-time rain particles when precipitation {'>'}1mm
              </div>
            </div>
            
            <div className="space-y-2">
              <Badge className="bg-orange-600/20 text-orange-300">
                <Thermometer className="w-3 h-3 mr-1" />
                Temperature
              </Badge>
              <div className="text-sm text-white">
                Color-coded atmospheric indicator sphere
              </div>
            </div>
          </div>
          
          {selectedField && (
            <div className="pt-4 border-t border-blue-500/20">
              <h4 className="text-sm font-semibold text-blue-300 mb-2">Selected Field: {selectedField}</h4>
              <p className="text-xs text-gray-400">
                Click and drag to rotate view. Scroll to zoom. Hover over fields for detailed data.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Main 3D Farm Visualization Component
export function Farm3DVisualization({ farmData }: { farmData: any }) {
  const [selectedField, setSelectedField] = useState<string | null>(null)
  const [view3D, setView3D] = useState(true)

  const handleFieldClick = (fieldId: string) => {
    setSelectedField(fieldId)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">3D NASA Farm Visualization</h3>
        <div className="flex gap-2">
          <Button
            variant={view3D ? "default" : "outline"}
            onClick={() => setView3D(true)}
            className="bg-blue-600/80 hover:bg-blue-700/80"
          >
            <Zap className="w-4 h-4 mr-2" />
            3D View
          </Button>
          <Button
            variant={!view3D ? "default" : "outline"}
            onClick={() => setView3D(false)}
            className="bg-purple-600/80 hover:bg-purple-700/80"
          >
            <Eye className="w-4 h-4 mr-2" />
            Data View
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* 3D Visualization */}
        <div className="lg:col-span-2">
          <Card className="bg-black/80 backdrop-blur-xl border border-blue-500/30">
            <CardContent className="p-0">
              <div className="h-96 w-full">
                <Suspense fallback={<LoadingFallback />}>
                  <Canvas
                    camera={{ position: [8, 6, 8], fov: 60 }}
                    style={{ background: 'linear-gradient(to bottom, #0f172a, #1e293b)' }}
                  >
                    <FarmScene farmData={farmData} onFieldClick={handleFieldClick} />
                  </Canvas>
                </Suspense>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Panel */}
        <div>
          <NASA3DDataPanel data={farmData} selectedField={selectedField} />
        </div>
      </div>
    </div>
  )
}