/**
 * Farm Layout with Sidebar
 * Reusable layout for farm-related pages
 */

"use client"

import { useState, ReactNode } from "react"
import FarmSidebar from "@/components/farm-sidebar"

interface FarmLayoutProps {
  children: ReactNode
  title?: string
  description?: string
}

export default function FarmLayout({ 
  children, 
  title = "TerraAI Farm", 
  description = "NASA-powered agricultural simulation" 
}: FarmLayoutProps) {
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
        {(title || description) && (
          <div className="p-6 border-b border-slate-800">
            <div className="space-y-2">
              {title && (
                <h1 className="text-2xl font-bold text-white">
                  {title}
                </h1>
              )}
              {description && (
                <p className="text-blue-300 text-sm">
                  {description}
                </p>
              )}
            </div>
          </div>
        )}
        
        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  )
}