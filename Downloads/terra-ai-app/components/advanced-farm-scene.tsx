/**
 * Advanced 3D Farm Simulation Scene
 * Instanced crops, machinery, and real NASA data integration
 */

"use client"

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  OrbitControls, 
  Environment, 
  Sky, 
  useGLTF, 
  Instances, 
  Instance,
  Text3D,
  Center,
  Float
} from '@react-three/drei'
import { EffectComposer, Bloom, SSAO } from '@react-three/postprocessing'
import { useRef, useState, useEffect, useMemo, Suspense } from 'react'
import { Vector3, Color, InstancedMesh, Object3D, MathUtils } from 'three'
import { useControls } from 'leva'
import { NASA_GIBS_LAYERS } from '@/lib/nasa-gibs-config-safe'

// Crop growth stages and types
const CROP_TYPES = {
  CORN: {
    name: 'Corn',
    color: '#4ade80',
    maxHeight: 2.5,
    growthStages: 5,
    spacing: 0.8
  },
  SOYBEANS: {
    name: 'Soybeans', 
    color: '#22c55e',
    maxHeight: 1.2,
    growthStages: 4,
    spacing: 0.6
  },
  WHEAT: {
    name: 'Wheat',
    color: '#fbbf24',
    maxHeight: 1.0,
    growthStages: 6,
    spacing: 0.3
  },
  COTTON: {
    name: 'Cotton',
    color: '#f8fafc',
    maxHeight: 1.5,
    growthStages: 4,
    spacing: 0.9
  }
}

// Instanced crop field component
function InstancedCropField({ 
  cropType, 
  fieldBounds, 
  growthStage = 3,
  healthData,
  plantCount = 5000 
}: {
  cropType: keyof typeof CROP_TYPES
  fieldBounds: { x: number; z: number; width: number; height: number }
  growthStage?: number
  healthData?: Float32Array
  plantCount?: number
}) {
  const meshRef = useRef<InstancedMesh>(null)
  const crop = CROP_TYPES[cropType]
  
  // Generate plant positions
  const positions = useMemo(() => {
    const temp = new Object3D()
    const positions: Vector3[] = []
    
    for (let i = 0; i < plantCount; i++) {
      const x = fieldBounds.x + (Math.random() * fieldBounds.width)
      const z = fieldBounds.z + (Math.random() * fieldBounds.height)
      const y = 0
      
      positions.push(new Vector3(x, y, z))
    }
    
    return positions
  }, [fieldBounds, plantCount])

  // Update instance matrices
  useEffect(() => {
    if (!meshRef.current) return
    
    const temp = new Object3D()
    
    positions.forEach((position, i) => {
      // Calculate health-based scale and color variations
      const healthValue = healthData ? healthData[i] || 0.8 : 0.8
      const scale = (growthStage / crop.growthStages) * healthValue
      const height = crop.maxHeight * scale
      
      temp.position.set(position.x, height / 2, position.z)
      temp.scale.setScalar(scale)
      temp.rotation.y = Math.random() * Math.PI * 2
      temp.updateMatrix()
      
      meshRef.current!.setMatrixAt(i, temp.matrix)
      
      // Color variation based on health
      const color = new Color(crop.color)
      if (healthValue < 0.5) {
        color.lerp(new Color('#dc2626'), 0.4) // Stressed red
      } else if (healthValue < 0.7) {
        color.lerp(new Color('#f59e0b'), 0.3) // Moderate yellow
      }
      
      meshRef.current!.setColorAt(i, color)
    })
    
    meshRef.current.instanceMatrix.needsUpdate = true
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true
    }
  }, [positions, growthStage, healthData, crop])

  // Animate wind effects
  useFrame((state) => {
    if (!meshRef.current) return
    
    const time = state.clock.elapsedTime
    const temp = new Object3D()
    
    positions.forEach((position, i) => {
      const healthValue = healthData ? healthData[i] || 0.8 : 0.8
      const scale = (growthStage / crop.growthStages) * healthValue
      const height = crop.maxHeight * scale
      
      // Wind sway animation
      const windX = Math.sin(time * 2 + position.x * 0.1) * 0.05
      const windZ = Math.cos(time * 1.5 + position.z * 0.1) * 0.03
      
      temp.position.set(position.x + windX, height / 2, position.z + windZ)
      temp.scale.setScalar(scale)
      temp.rotation.y = Math.random() * Math.PI * 2
      temp.updateMatrix()
      
      meshRef.current!.setMatrixAt(i, temp.matrix)
    })
    
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, plantCount]}
      castShadow
      receiveShadow
    >
      <cylinderGeometry args={[0.02, 0.05, 1, 8]} />
      <meshStandardMaterial color={crop.color} />
    </instancedMesh>
  )
}

// Farm machinery component
function FarmMachinery({ 
  type = 'tractor', 
  position, 
  animated = false 
}: {
  type?: 'tractor' | 'harvester' | 'planter'
  position: [number, number, number]
  animated?: boolean
}) {
  const meshRef = useRef()
  
  // Simple procedural machinery (replace with GLTF models)
  return (
    <group position={position}>
      <mesh ref={meshRef} castShadow>
        <boxGeometry args={[3, 1.5, 1.2]} />
        <meshStandardMaterial color={type === 'tractor' ? '#2563eb' : '#dc2626'} />
      </mesh>
      {/* Wheels */}
      <mesh position={[-1, -0.8, 0.8]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[-1, -0.8, -0.8]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[1, -0.8, 0.8]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[1, -0.8, -0.8]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
    </group>
  )
}

// Weather effects component
function WeatherEffects({ 
  precipitation = 0, 
  temperature = 25, 
  windSpeed = 5 
}: {
  precipitation?: number
  temperature?: number  
  windSpeed?: number
}) {
  const rainRef = useRef<InstancedMesh>(null)
  
  // Rain particle system
  useEffect(() => {
    if (!rainRef.current || precipitation < 1) return
    
    const count = Math.min(precipitation * 100, 2000)
    const temp = new Object3D()
    
    for (let i = 0; i < count; i++) {
      temp.position.set(
        (Math.random() - 0.5) * 200,
        Math.random() * 50 + 20,
        (Math.random() - 0.5) * 200
      )
      temp.scale.setScalar(0.1)
      temp.updateMatrix()
      rainRef.current!.setMatrixAt(i, temp.matrix)
    }
    
    rainRef.current.instanceMatrix.needsUpdate = true
  }, [precipitation])

  // Animate rain particles
  useFrame((state) => {
    if (!rainRef.current || precipitation < 1) return
    
    const temp = new Object3D()
    const count = Math.min(precipitation * 100, 2000)
    
    for (let i = 0; i < count; i++) {
      rainRef.current.getMatrixAt(i, temp.matrix)
      temp.matrix.decompose(temp.position, temp.quaternion, temp.scale)
      
      temp.position.y -= windSpeed * 2
      if (temp.position.y < 0) {
        temp.position.y = 50
        temp.position.x = (Math.random() - 0.5) * 200
        temp.position.z = (Math.random() - 0.5) * 200
      }
      
      temp.updateMatrix()
      rainRef.current.setMatrixAt(i, temp.matrix)
    }
    
    rainRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <>
      {precipitation > 1 && (
        <instancedMesh
          ref={rainRef}
          args={[undefined, undefined, Math.min(precipitation * 100, 2000)]}
        >
          <cylinderGeometry args={[0.01, 0.01, 0.5, 4]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.6} />
        </instancedMesh>
      )}
    </>
  )
}

// NASA data overlay HUD
function DataOverlayHUD({ 
  nasaData, 
  position = [0, 20, 0] 
}: {
  nasaData: any
  position?: [number, number, number]
}) {
  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={2}
          height={0.1}
          curveSegments={12}
          bevelEnabled={true}
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          NASA FARM NAVIGATOR
          <meshStandardMaterial color="#3b82f6" />
        </Text3D>
      </Float>
      
      {/* Data panels */}
      {nasaData && (
        <group position={[0, -3, 0]}>
          <mesh>
            <planeGeometry args={[15, 8]} />
            <meshStandardMaterial 
              color="#000000" 
              transparent 
              opacity={0.7} 
            />
          </mesh>
          
          <Text3D
            position={[-6, 2, 0.1]}
            font="/fonts/helvetiker_regular.typeface.json"
            size={0.5}
            height={0.02}
          >
            {`NDVI: ${nasaData.vegetation?.[0]?.ndvi?.toFixed(2) || 'N/A'}`}
            <meshStandardMaterial color="#22c55e" />
          </Text3D>
          
          <Text3D
            position={[-6, 1, 0.1]}
            font="/fonts/helvetiker_regular.typeface.json"
            size={0.5}
            height={0.02}
          >
            {`Soil Moisture: ${((nasaData.soilMoisture?.[0]?.value || 0) * 100).toFixed(0)}%`}
            <meshStandardMaterial color="#06b6d4" />
          </Text3D>
          
          <Text3D
            position={[-6, 0, 0.1]}
            font="/fonts/helvetiker_regular.typeface.json"
            size={0.5}
            height={0.02}
          >
            {`Temperature: ${nasaData.temperature?.[0]?.value?.toFixed(1) || 'N/A'}°C`}
            <meshStandardMaterial color="#f59e0b" />
          </Text3D>
        </group>
      )}
    </group>
  )
}

// Main advanced farm scene
export function AdvancedFarmScene({ 
  farmData, 
  scenario,
  onFieldClick 
}: {
  farmData: any
  scenario: any
  onFieldClick: (fieldId: string) => void
}) {
  // Leva controls for debugging
  const {
    showNASALayers,
    enablePostProcessing,
    cropGrowthStage,
    weatherIntensity,
    showMachinery,
    cameraMode
  } = useControls({
    showNASALayers: true,
    enablePostProcessing: true,
    cropGrowthStage: { value: 3, min: 1, max: 5, step: 1 },
    weatherIntensity: { value: 1, min: 0, max: 2, step: 0.1 },
    showMachinery: true,
    cameraMode: { value: 'orbit', options: ['orbit', 'flythrough', 'topdown'] }
  })

  const [activeLayers, setActiveLayers] = useState(['MODIS_TRUE_COLOR', 'MODIS_NDVI'])
  
  // Farm location (California Central Valley for drought scenario)
  const farmCenter = { 
    lat: scenario?.id === 'drought-management' ? 36.7783 : 41.5868,
    lng: scenario?.id === 'drought-management' ? -119.4179 : -93.6250
  }

  // Field definitions
  const fields = [
    { 
      id: 'field-1', 
      bounds: { x: -50, z: -50, width: 40, height: 40 },
      cropType: 'CORN' as keyof typeof CROP_TYPES,
      health: farmData?.realTimeData?.vegetation?.[0]?.ndvi || 0.8
    },
    { 
      id: 'field-2', 
      bounds: { x: 10, z: -50, width: 40, height: 40 },
      cropType: 'SOYBEANS' as keyof typeof CROP_TYPES,
      health: farmData?.realTimeData?.vegetation?.[1]?.ndvi || 0.6
    },
    { 
      id: 'field-3', 
      bounds: { x: -50, z: 10, width: 40, height: 40 },
      cropType: 'WHEAT' as keyof typeof CROP_TYPES,
      health: farmData?.realTimeData?.vegetation?.[2]?.ndvi || 0.4
    },
    { 
      id: 'field-4', 
      bounds: { x: 10, z: 10, width: 40, height: 40 },
      cropType: 'COTTON' as keyof typeof CROP_TYPES,
      health: farmData?.realTimeData?.vegetation?.[3]?.ndvi || 0.9
    }
  ]

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[50, 50, 25]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={200}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
      />
      <pointLight position={[0, 30, 0]} intensity={0.5} color="#fbbf24" />

      {/* NASA Terrain placeholder - replaced with client-safe version */}
      {showNASALayers && (
        <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[200, 200, 32, 32]} />
          <meshLambertMaterial color="#4a5d3a" wireframe={false} />
        </mesh>
      )}

      {/* Instanced crop fields */}
      {fields.map((field) => (
        <InstancedCropField
          key={field.id}
          cropType={field.cropType}
          fieldBounds={field.bounds}
          growthStage={cropGrowthStage}
          healthData={new Float32Array(5000).fill(field.health)}
          plantCount={3000}
        />
      ))}

      {/* Farm machinery */}
      {showMachinery && (
        <>
          <FarmMachinery 
            type="tractor" 
            position={[0, 0, 0]} 
            animated={true} 
          />
          <FarmMachinery 
            type="harvester" 
            position={[30, 0, 30]} 
            animated={false} 
          />
        </>
      )}

      {/* Weather effects */}
      <WeatherEffects
        precipitation={(farmData?.realTimeData?.precipitation?.[0]?.value || 0) * weatherIntensity}
        temperature={farmData?.realTimeData?.temperature?.[0]?.value || 25}
        windSpeed={10}
      />

      {/* NASA Data HUD */}
      <DataOverlayHUD 
        nasaData={farmData?.realTimeData}
        position={[0, 25, 0]}
      />

      {/* Environment */}
      <Sky 
        distance={450000}
        sunPosition={[0, 1, 0]}
        inclination={0}
        azimuth={0.25}
      />
      <Environment preset="sunset" />

      {/* Camera controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        maxPolarAngle={Math.PI / 2}
        target={[0, 0, 0]}
      />

      {/* Post-processing effects */}
      {enablePostProcessing && (
        <EffectComposer>
          <Bloom 
            intensity={0.5}
            luminanceThreshold={0.9}
            luminanceSmoothing={0.025}
          />
          <SSAO 
            samples={31}
            radius={20}
            intensity={0.1}
            bias={0.5}
          />
        </EffectComposer>
      )}
    </>
  )
}