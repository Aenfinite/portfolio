"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, PerspectiveCamera, Html } from "@react-three/drei"
import { Suspense } from "react"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

function FarmField({
  position,
  size,
  color,
  label,
}: { position: [number, number, number]; size: [number, number, number]; color: string; label: string }) {
  return (
    <group position={position}>
      <mesh receiveShadow castShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} roughness={0.8} metalness={0.2} />
      </mesh>
      <Html position={[0, size[1] / 2 + 0.5, 0]} center>
        <div className="bg-background/90 backdrop-blur-sm border border-border rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap pointer-events-none">
          {label}
        </div>
      </Html>
    </group>
  )
}

function FarmScene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[15, 12, 15]} fov={50} />
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={10}
        maxDistance={40}
        maxPolarAngle={Math.PI / 2.2}
      />

      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <hemisphereLight intensity={0.3} groundColor="#1e293b" />

      {/* Ground */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} />
      </mesh>

      {/* Farm Fields */}
      <FarmField position={[-6, 0.5, -6]} size={[8, 1, 8]} color="#22c55e" label="Wheat Field A" />
      <FarmField position={[6, 0.5, -6]} size={[8, 1, 8]} color="#84cc16" label="Corn Field B" />
      <FarmField position={[-6, 0.5, 6]} size={[8, 1, 8]} color="#eab308" label="Soybean Field C" />
      <FarmField position={[6, 0.5, 6]} size={[8, 1, 8]} color="#10b981" label="Rice Field D" />

      {/* Central Building */}
      <group position={[0, 1.5, 0]}>
        <mesh castShadow>
          <boxGeometry args={[3, 3, 3]} />
          <meshStandardMaterial color="#3b82f6" roughness={0.5} metalness={0.3} />
        </mesh>
        <Html position={[0, 2.5, 0]} center>
          <div className="bg-primary/90 backdrop-blur-sm border border-primary rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap pointer-events-none text-primary-foreground">
            Control Center
          </div>
        </Html>
      </group>

      {/* Irrigation System Markers */}
      <mesh position={[-6, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 1.2]} />
        <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[6, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 1.2]} />
        <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.3} />
      </mesh>

      <Environment preset="night" />
    </>
  )
}

function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-3" />
        <p className="text-sm text-muted-foreground">Loading 3D Farm View...</p>
      </div>
    </div>
  )
}

export function Farm3DView() {
  return (
    <Card className="overflow-hidden border-primary/20">
      <div className="aspect-video w-full">
        <Canvas shadows>
          <Suspense fallback={null}>
            <FarmScene />
          </Suspense>
        </Canvas>
      </div>
      <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm border border-border rounded-lg px-3 py-2 text-xs">
        <p className="text-muted-foreground">🖱️ Drag to rotate • Scroll to zoom • Right-click to pan</p>
      </div>
    </Card>
  )
}
