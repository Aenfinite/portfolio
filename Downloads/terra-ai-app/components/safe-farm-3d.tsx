/**
 * Pure Client-Side Farm 3D Component
 * Completely isolated from SSR with no Three.js imports at module level
 */

"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Droplets, Sprout, Thermometer, Satellite, Eye, Zap } from 'lucide-react'

interface NASAFarmData {
  location: {
    lat: number
    lng: number
    name: string
  }
  scenario: {
    farmType: string
  }
  realTimeData?: {
    soilMoisture?: number
    ndvi?: number
    temperature?: number
  }
}

interface SafeFarm3DProps {
  farmData?: NASAFarmData | null
}

export function SafeFarm3D({ farmData }: SafeFarm3DProps) {
  const [isClient, setIsClient] = useState(false)
  const [ThreeJSComponent, setThreeJSComponent] = useState<React.ComponentType<any> | null>(null)

  useEffect(() => {
    setIsClient(true)
    
    // Dynamically import and initialize Three.js only on the client
    const loadThreeJS = async () => {
      try {
        // Only import Three.js modules after component mounts on client
        const [
          { Canvas },
          { OrbitControls, Environment, Text, Box, Plane, Sphere, useTexture },
          { useRef, Suspense },
          THREE
        ] = await Promise.all([
          import('@react-three/fiber'),
          import('@react-three/drei'),
          import('react'),
          import('three')
        ])

        // Create the 3D component dynamically
        const Dynamic3DComponent = ({ farmData }: SafeFarm3DProps) => {
          const meshRef = useRef<any>(null)

          // Simple animated 3D farm field
          function AnimatedFarmField() {
            return (
              <group>
                {/* Ground plane */}
                <Plane 
                  ref={meshRef}
                  args={[20, 20]} 
                  rotation={[-Math.PI / 2, 0, 0]} 
                  position={[0, -2, 0]}
                >
                  <meshStandardMaterial color="#4ade80" />
                </Plane>
                
                {/* Crop rows */}
                {Array.from({ length: 5 }, (_, i) => (
                  <group key={i} position={[i * 3 - 6, 0, 0]}>
                    {Array.from({ length: 8 }, (_, j) => (
                      <Box 
                        key={j} 
                        args={[0.5, 1, 0.5]} 
                        position={[0, -1, j * 2 - 7]}
                      >
                        <meshStandardMaterial color="#22c55e" />
                      </Box>
                    ))}
                  </group>
                ))}
                
                {/* NASA satellite indicator */}
                <Sphere args={[0.3]} position={[0, 5, 0]}>
                  <meshStandardMaterial color="#3b82f6" emissive="#1e40af" />
                </Sphere>
              </group>
            )
          }

          return (
            <div className="w-full h-96 rounded-xl overflow-hidden">
              <Canvas camera={{ position: [10, 10, 10], fov: 60 }}>
                <Suspense fallback={null}>
                  <ambientLight intensity={0.6} />
                  <directionalLight position={[10, 10, 5]} intensity={1} />
                  <AnimatedFarmField />
                  <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                  <Environment preset="sunset" />
                </Suspense>
              </Canvas>
            </div>
          )
        }

        setThreeJSComponent(() => Dynamic3DComponent)
      } catch (error) {
        console.error('Failed to load Three.js components:', error)
        setThreeJSComponent(() => () => (
          <div className="flex items-center justify-center h-96 bg-gradient-to-br from-red-900/20 to-orange-900/20 rounded-xl border border-red-500/20">
            <div className="text-center text-white">
              <Zap className="w-16 h-16 mx-auto mb-4 text-red-400" />
              <p className="text-lg font-semibold mb-2">3D Visualization Error</p>
              <p className="text-sm text-gray-300">Unable to load WebGL components</p>
            </div>
          </div>
        ))
      }
    }

    loadThreeJS()
  }, [])

  // Show loading state during SSR and initial client render
  if (!isClient || !ThreeJSComponent) {
    return (
      <div className="flex items-center justify-center h-96 bg-gradient-to-br from-blue-900/20 to-green-900/20 rounded-xl border border-blue-500/20">
        <div className="text-center text-white">
          <Satellite className="w-16 h-16 mx-auto mb-4 animate-pulse text-blue-400" />
          <p className="text-lg font-semibold mb-2">Loading 3D Visualization...</p>
          <p className="text-sm text-gray-300">Initializing NASA farm environment</p>
          <div className="mt-4 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100" />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-green-900/40 to-blue-900/40 border-green-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Satellite className="h-5 w-5 text-blue-400" />
          NASA Farm Visualization
        </CardTitle>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
            <Droplets className="h-3 w-3 mr-1" />
            Soil: {farmData?.realTimeData?.soilMoisture?.toFixed(1) || 'N/A'}%
          </Badge>
          <Badge variant="secondary" className="bg-green-500/20 text-green-300">
            <Sprout className="h-3 w-3 mr-1" />
            NDVI: {farmData?.realTimeData?.ndvi?.toFixed(2) || 'N/A'}
          </Badge>
          <Badge variant="secondary" className="bg-orange-500/20 text-orange-300">
            <Thermometer className="h-3 w-3 mr-1" />
            Temp: {farmData?.realTimeData?.temperature?.toFixed(1) || 'N/A'}°C
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ThreeJSComponent farmData={farmData} />
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-300">
            Real-time NASA satellite data visualization for {farmData?.location?.name || 'Your Farm'}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}