/**
 * Client-Side Advanced Farm Scene Wrapper
 * Ensures advanced 3D components only render on the client
 */

"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Card, CardContent } from "@/components/ui/card"
import { Satellite } from "lucide-react"

// Dynamically import advanced farm scene with no SSR
const AdvancedFarmScene = dynamic(
  () => import("@/components/advanced-farm-scene").then(mod => ({ default: mod.AdvancedFarmScene })),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-96 bg-gradient-to-br from-blue-900/20 to-green-900/20 rounded-xl">
        <div className="text-center text-white">
          <Satellite className="w-16 h-16 mx-auto mb-4 animate-pulse text-blue-400" />
          <p className="text-lg font-semibold mb-2">Loading Advanced 3D Scene...</p>
          <p className="text-sm text-gray-300">Initializing NASA data visualization</p>
        </div>
      </div>
    )
  }
)

interface ClientAdvancedSceneProps {
  activeLayers?: string[]
  farmData?: any
  onFieldClick?: (fieldId: string) => void
}

export default function ClientAdvancedScene({ activeLayers, farmData, onFieldClick }: ClientAdvancedSceneProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-96 bg-gradient-to-br from-blue-900/20 to-green-900/20 rounded-xl">
        <div className="text-center text-white">
          <Satellite className="w-16 h-16 mx-auto mb-4 animate-pulse text-blue-400" />
          <p className="text-lg font-semibold mb-2">Preparing Advanced Scene...</p>
          <p className="text-sm text-gray-300">Client-side WebGL required</p>
        </div>
      </div>
    )
  }

  return (
    <AdvancedFarmScene 
      activeLayers={activeLayers}
      farmData={farmData}
      onFieldClick={onFieldClick}
    />
  )
}