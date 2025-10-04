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
  BarChart3
} from "lucide-react"

// NASA Data Types
interface FarmNASAData {
  soilMoisture: number
  temperature: number
  ndvi: number
  precipitation: number
  evapotranspiration: number
  coordinates: [number, number]
  timestamp: string
}

interface FieldData {
  id: string
  name: string
  crop: string
  area: number
  position: [number, number, number]
  size: [number, number, number]
  health: number
  nasaData: FarmNASAData
}

// Sample NASA data (in production, this would come from the NASA API)
const mockNASAData: FieldData[] = [
  {
    id: "field-1",
    name: "Wheat Field A",
    crop: "Wheat",
    area: 25,
    position: [-6, 0.5, -6],
    size: [8, 1, 8],
    health: 92,
    nasaData: {
      soilMoisture: 0.28,
      temperature: 22.5,
      ndvi: 0.78,
      precipitation: 12.3,
      evapotranspiration: 4.2,
      coordinates: [40.7128, -74.0060],
      timestamp: new Date().toISOString(),
    },
  },
  {
    id: "field-2",
    name: "Corn Field B",
    crop: "Corn",
    area: 25,
    position: [6, 0.5, -6],
    size: [8, 1, 8],
    health: 78,
    nasaData: {
      soilMoisture: 0.22,
      temperature: 24.1,
      ndvi: 0.65,
      precipitation: 8.7,
      evapotranspiration: 3.8,
      coordinates: [40.7128, -74.0060],
      timestamp: new Date().toISOString(),
    },
  },
  {
    id: "field-3",
    name: "Soybean Field C",
    crop: "Soybeans",
    area: 25,
    position: [-6, 0.5, 6],
    size: [8, 1, 8],
    health: 85,
    nasaData: {
      soilMoisture: 0.35,
      temperature: 21.8,
      ndvi: 0.72,
      precipitation: 15.2,
      evapotranspiration: 4.5,
      coordinates: [40.7128, -74.0060],
      timestamp: new Date().toISOString(),
    },
  },
  {
    id: "field-4",
    name: "Rice Field D",
    crop: "Rice",
    area: 25,
    position: [6, 0.5, 6],
    size: [8, 1, 8],
    health: 88,
    nasaData: {
      soilMoisture: 0.45,
      temperature: 23.2,
      ndvi: 0.81,
      precipitation: 18.9,
      evapotranspiration: 5.1,
      coordinates: [40.7128, -74.0060],
      timestamp: new Date().toISOString(),
    },
  },
]

// Enhanced terrain generation using NASA topography data
function TerrainMesh({ width = 50, height = 50, segments = 32 }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(width, height, segments, segments)
    const positions = geo.attributes.position
    
    // Generate realistic terrain using noise function (simulating NASA DEM data)
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i)
      const z = positions.getZ(i)
      
      // Simple terrain elevation based on distance and noise
      const elevation = Math.sin(x * 0.1) * Math.cos(z * 0.1) * 2 + 
                       Math.random() * 0.5 - 0.25
      positions.setY(i, elevation)
    }
    
    geo.computeVertexNormals()
    return geo
  }, [width, height, segments])

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -1, 0]}
      receiveShadow
    >
      <meshStandardMaterial
        color="#2d5016"
        roughness={0.8}
        metalness={0.1}
        wireframe={false}
      />
    </mesh>
  )
}

// Weather effects component
function WeatherEffects({ precipitationLevel }: { precipitationLevel: number }) {
  const rainRef = useRef<THREE.Points>(null)
  const cloudRef = useRef<THREE.Mesh>(null)
  
  const rainGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const positions = new Float32Array(1000 * 3)
    
    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40
      positions[i * 3 + 1] = Math.random() * 20 + 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40
    }
    
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [])

  useFrame((state) => {
    if (rainRef.current && precipitationLevel > 10) {
      const positions = rainRef.current.geometry.attributes.position
      for (let i = 0; i < positions.count; i++) {
        let y = positions.getY(i)
        y -= 0.3
        if (y < 0) y = 20
        positions.setY(i, y)
      }
      positions.needsUpdate = true
    }

    if (cloudRef.current) {
      cloudRef.current.rotation.y += 0.001
    }
  })

  return (
    <>
      {/* Rain effect */}
      {precipitationLevel > 10 && (
        <points ref={rainRef} geometry={rainGeometry}>
          <pointsMaterial size={0.1} color="#87CEEB" transparent opacity={0.6} />
        </points>
      )}
      
      {/* Cloud cover */}
      {precipitationLevel > 5 && (
        <mesh ref={cloudRef} position={[0, 15, 0]}>
          <sphereGeometry args={[20, 16, 12]} />
          <meshBasicMaterial color="#808080" transparent opacity={0.3} />
        </mesh>
      )}
    </>
  )
}

// NASA Data Overlay Visualization
function NASADataOverlay({ fieldData }: { fieldData: FieldData }) {
  const [showData, setShowData] = useState(false)
  
  // Color based on NDVI values
  const getHealthColor = (ndvi: number) => {
    if (ndvi > 0.7) return "#22c55e" // Healthy - Green
    if (ndvi > 0.5) return "#84cc16" // Good - Light Green  
    if (ndvi > 0.3) return "#eab308" // Fair - Yellow
    return "#ef4444" // Poor - Red
  }

  // Color based on soil moisture
  const getMoistureColor = (moisture: number) => {
    if (moisture > 0.4) return "#06b6d4" // High - Cyan
    if (moisture > 0.3) return "#3b82f6" // Medium - Blue
    if (moisture > 0.2) return "#f59e0b" // Low - Orange
    return "#ef4444" // Very Low - Red
  }

  return (
    <group position={fieldData.position}>
      {/* Main field mesh with NDVI coloring */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={fieldData.size} />
        <meshStandardMaterial 
          color={getHealthColor(fieldData.nasaData.ndvi)}
          roughness={0.7} 
          metalness={0.1}
        />
      </mesh>

      {/* Soil moisture indicators */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.1]} />
        <meshStandardMaterial 
          color={getMoistureColor(fieldData.nasaData.soilMoisture)}
          emissive={getMoistureColor(fieldData.nasaData.soilMoisture)}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Temperature visualization */}
      <mesh position={[2, 1, 0]} castShadow>
        <sphereGeometry args={[0.3]} />
        <meshStandardMaterial 
          color={fieldData.nasaData.temperature > 25 ? "#ef4444" : "#3b82f6"}
          emissive={fieldData.nasaData.temperature > 25 ? "#ef4444" : "#3b82f6"}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Field label with NASA data */}
      <Html position={[0, fieldData.size[1] + 1, 0]} center>
        <div 
          className="bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-lg px-4 py-2 text-xs font-medium whitespace-nowrap pointer-events-auto shadow-lg shadow-blue-500/20"
          onMouseEnter={() => setShowData(true)}
          onMouseLeave={() => setShowData(false)}
        >
          <div className="text-white font-semibold">{fieldData.name}</div>
          <div className="text-blue-300">{fieldData.crop}</div>
          
          {showData && (
            <div className="mt-2 space-y-1 min-w-[200px]">
              <div className="flex items-center gap-2 text-green-400">
                <Eye className="w-3 h-3" />
                <span>NDVI: {fieldData.nasaData.ndvi.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-2 text-blue-400">
                <Droplets className="w-3 h-3" />
                <span>Soil: {(fieldData.nasaData.soilMoisture * 100).toFixed(1)}%</span>
              </div>
              <div className="flex items-center gap-2 text-orange-400">
                <Thermometer className="w-3 h-3" />
                <span>Temp: {fieldData.nasaData.temperature.toFixed(1)}°C</span>
              </div>
              <div className="flex items-center gap-2 text-cyan-400">
                <Satellite className="w-3 h-3" />
                <span>ET: {fieldData.nasaData.evapotranspiration.toFixed(1)}mm</span>
              </div>
            </div>
          )}
        </div>
      </Html>
    </group>
  )
}

// Main 3D Farm Scene
function Enhanced3DFarmScene() {
  const [selectedField, setSelectedField] = useState<string | null>(null)
  const [showNASAOverlay, setShowNASAOverlay] = useState(true)
  
  // Calculate average precipitation for weather effects
  const avgPrecipitation = useMemo(() => {
    return mockNASAData.reduce((sum, field) => sum + field.nasaData.precipitation, 0) / mockNASAData.length
  }, [])

  return (
    <>
      <PerspectiveCamera makeDefault position={[20, 15, 20]} fov={60} />
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={10}
        maxDistance={50}
        maxPolarAngle={Math.PI / 2.1}
      />

      {/* Enhanced lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight 
        position={[10, 15, 5]} 
        intensity={1.2} 
        castShadow 
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <hemisphereLight intensity={0.4} groundColor="#1e293b" />
      
      {/* Realistic terrain */}
      <TerrainMesh />

      {/* Weather effects */}
      <WeatherEffects precipitationLevel={avgPrecipitation} />

      {/* NASA Data Fields */}
      {mockNASAData.map((fieldData) => (
        <NASADataOverlay 
          key={fieldData.id} 
          fieldData={fieldData}
        />
      ))}

      {/* Central Control Center */}
      <group position={[0, 2, 0]}>
        <mesh castShadow>
          <boxGeometry args={[4, 4, 4]} />
          <meshStandardMaterial 
            color="#1e40af" 
            roughness={0.3} 
            metalness={0.7}
            emissive="#1e40af"
            emissiveIntensity={0.1}
          />
        </mesh>
        <Html position={[0, 3, 0]} center>
          <div className="bg-blue-600/90 backdrop-blur-xl border border-blue-400/50 rounded-lg px-4 py-2 text-xs font-medium whitespace-nowrap pointer-events-none text-white shadow-lg shadow-blue-500/30">
            TerraAI Control Center
          </div>
        </Html>
      </group>

      {/* Satellite visualization */}
      <group position={[15, 25, 15]}>
        <mesh>
          <boxGeometry args={[2, 0.5, 3]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} />
        </mesh>
        <mesh position={[-1.5, 0, 0]}>
          <boxGeometry args={[3, 0.1, 1]} />
          <meshStandardMaterial color="#4169E1" />
        </mesh>
        <mesh position={[1.5, 0, 0]}>
          <boxGeometry args={[3, 0.1, 1]} />
          <meshStandardMaterial color="#4169E1" />
        </mesh>
        <Html position={[0, 1, 0]} center>
          <div className="bg-white/90 backdrop-blur-sm border border-gray-300 rounded-lg px-2 py-1 text-xs font-medium whitespace-nowrap pointer-events-none text-gray-800 shadow-lg">
            NASA Satellite
          </div>
        </Html>
      </group>

      <Environment preset="sunset" />
    </>
  )
}

// Loading component
function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-3" />
        <p className="text-sm text-white">Loading NASA Data & 3D Farm...</p>
        <p className="text-xs text-blue-300 mt-1">Fetching satellite imagery</p>
      </div>
    </div>
  )
}

// NASA Data Panel
function NASADataPanel({ fields }: { fields: FieldData[] }) {
  return (
    <div className="absolute top-4 left-4 z-10 space-y-2 max-w-sm">
      <Card className="bg-black/80 backdrop-blur-xl border border-blue-500/30 shadow-xl shadow-blue-500/20">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Satellite className="w-5 h-5 text-blue-400" />
            <h3 className="font-semibold text-white">NASA Data Overview</h3>
          </div>
          
          <div className="space-y-3">
            {fields.map((field) => (
              <div key={field.id} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-white">{field.name}</span>
                  <Badge 
                    variant="secondary" 
                    className="bg-blue-600/20 text-blue-300 border border-blue-500/30"
                  >
                    {field.crop}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-green-500/20 rounded p-2 border border-green-500/30">
                    <div className="text-green-300">NDVI</div>
                    <div className="text-white font-semibold">
                      {field.nasaData.ndvi.toFixed(2)}
                    </div>
                  </div>
                  <div className="bg-blue-500/20 rounded p-2 border border-blue-500/30">
                    <div className="text-blue-300">Soil %</div>
                    <div className="text-white font-semibold">
                      {(field.nasaData.soilMoisture * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-3 border-t border-blue-500/20">
            <div className="text-xs text-blue-300">
              Last Updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

// Main Enhanced Farm 3D View Component
export function EnhancedFarm3DView() {
  const [viewMode, setViewMode] = useState<'3d' | 'satellite' | 'hybrid'>('hybrid')
  
  return (
    <Card className="overflow-hidden border-blue-500/30 bg-black/20 backdrop-blur-xl shadow-xl shadow-blue-500/20">
      <div className="relative h-[600px] w-full">
        {/* Controls */}
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          <Button
            size="sm"
            variant={viewMode === '3d' ? 'default' : 'outline'}
            className="bg-blue-600/80 backdrop-blur-md border border-blue-400/50 text-white hover:bg-blue-700/80"
            onClick={() => setViewMode('3d')}
          >
            3D View
          </Button>
          <Button
            size="sm"
            variant={viewMode === 'satellite' ? 'default' : 'outline'}
            className="bg-blue-600/80 backdrop-blur-md border border-blue-400/50 text-white hover:bg-blue-700/80"
            onClick={() => setViewMode('satellite')}
          >
            Satellite
          </Button>
          <Button
            size="sm"
            variant={viewMode === 'hybrid' ? 'default' : 'outline'}
            className="bg-blue-600/80 backdrop-blur-md border border-blue-400/50 text-white hover:bg-blue-700/80"
            onClick={() => setViewMode('hybrid')}
          >
            Hybrid
          </Button>
        </div>

        {/* NASA Data Panel */}
        <NASADataPanel fields={mockNASAData} />

        {/* 3D Canvas */}
        <Canvas
          shadows
          gl={{ 
            antialias: true, 
            alpha: false,
            powerPreference: "high-performance"
          }}
          className="bg-gradient-to-b from-blue-900 to-black"
        >
          <Suspense fallback={null}>
            <Enhanced3DFarmScene />
          </Suspense>
        </Canvas>

        {/* Loading overlay */}
        <Suspense fallback={<LoadingFallback />}>
          <div />
        </Suspense>
      </div>
      
      {/* Bottom info bar */}
      <div className="p-4 bg-black/80 backdrop-blur-xl border-t border-blue-500/20">
        <div className="flex justify-between items-center text-sm">
          <div className="text-blue-300">
            Real-time NASA satellite data integration
          </div>
          <div className="flex items-center gap-4 text-white">
            <span>Fields: {mockNASAData.length}</span>
            <span>Total Area: {mockNASAData.reduce((sum, f) => sum + f.area, 0)} ha</span>
            <span>Avg Health: {Math.round(mockNASAData.reduce((sum, f) => sum + f.health, 0) / mockNASAData.length)}%</span>
          </div>
        </div>
      </div>
    </Card>
  )
}