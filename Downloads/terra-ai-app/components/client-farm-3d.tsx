/**
 * Client-Only Farm 3D Wrapper
 * Prevents Three.js SSR errors for farm visualization components
 */

"use client"

import dynamic from 'next/dynamic'
import { Loader2, Satellite } from 'lucide-react'

// Loading fallback for 3D components
function Farm3DFallback() {
  return (
    <div className="flex items-center justify-center h-96 bg-gradient-to-br from-blue-900/20 to-green-900/20 rounded-xl border border-blue-500/20">
      <div className="text-center text-white">
        <Satellite className="w-16 h-16 mx-auto mb-4 animate-pulse text-blue-400" />
        <p className="text-lg font-semibold mb-2">Loading NASA Farm Visualization...</p>
        <p className="text-sm text-gray-300">Initializing 3D satellite data overlay</p>
        <div className="mt-4 flex justify-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100" />
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200" />
        </div>
      </div>
    </div>
  )
}

// Dynamic imports with SSR disabled
const Farm3DVisualization = dynamic(
  () => import("@/components/farm-3d-visualization").then(mod => ({ default: mod.Farm3DVisualization })),
  { 
    ssr: false,
    loading: () => <Farm3DFallback />
  }
)

export default Farm3DVisualization