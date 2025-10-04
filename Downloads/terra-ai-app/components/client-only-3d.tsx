/**
 * Client-Side 3D Wrapper
 * Ensures 3D components only render on the client
 */

"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Card, CardContent } from "@/components/ui/card"
import { Satellite } from "lucide-react"

// Dynamically import 3D component with no SSR
const Farm3DVisualization = dynamic(
  () => import("@/components/farm-3d-visualization").then(mod => ({ default: mod.Farm3DVisualization })),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-96 bg-gradient-to-br from-blue-900/20 to-green-900/20 rounded-xl">
        <div className="text-center text-white">
          <Satellite className="w-16 h-16 mx-auto mb-4 animate-pulse text-blue-400" />
          <p className="text-lg font-semibold mb-2">Loading 3D Visualization...</p>
          <p className="text-sm text-gray-300">Initializing Three.js renderer</p>
        </div>
      </div>
    )
  }
)

interface ClientOnly3DProps {
  farmData?: any
}

export default function ClientOnly3D({ farmData }: ClientOnly3DProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <Card className="bg-black/80 backdrop-blur-xl border border-blue-500/30">
        <CardContent className="p-0">
          <div className="flex items-center justify-center h-96 bg-gradient-to-br from-blue-900/20 to-green-900/20 rounded-xl">
            <div className="text-center text-white">
              <Satellite className="w-16 h-16 mx-auto mb-4 animate-pulse text-blue-400" />
              <p className="text-lg font-semibold mb-2">Preparing 3D Environment...</p>
              <p className="text-sm text-gray-300">Client-side rendering required</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Farm3DVisualization 
      farmData={farmData}
    />
  )
}