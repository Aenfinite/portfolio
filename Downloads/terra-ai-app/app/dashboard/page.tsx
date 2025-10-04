"use client"

import { useState } from "react"
import { NASAFarmNavigator } from "@/components/nasa-farm-navigator"
import FarmSidebar from "@/components/farm-sidebar"

export default function DashboardPage() {
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
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-white">
              NASA Farm Navigator Dashboard
            </h1>
            <p className="text-blue-300 text-sm max-w-2xl mx-auto">
              Learn precision agriculture through real NASA satellite data interpretation and educational farming challenges.
            </p>
          </div>
        </div>
        
        {/* Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          <NASAFarmNavigator />
        </div>
      </div>
    </div>
  )
}
