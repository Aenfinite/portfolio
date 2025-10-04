/**
 * Farm Simulation Sidebar
 * Navigation and controls for the farm simulation
 */

"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { 
  Home,
  Satellite,
  BarChart3,
  Settings,
  Users,
  BookOpen,
  Trophy,
  Target,
  Leaf,
  Droplets,
  ThermometerSun,
  CloudRain,
  TrendingUp,
  Calendar,
  Bell,
  ChevronLeft,
  ChevronRight,
  User,
  LogOut
} from "lucide-react"

interface SidebarProps {
  isCollapsed?: boolean
  onToggle?: () => void
}

export default function FarmSidebar({ isCollapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const [notifications] = useState(3) // Example notification count

  const navigationItems = [
    {
      title: "Overview",
      items: [
        { name: "Dashboard", href: "/dashboard", icon: Home },
        { name: "Farm Simulation", href: "/farm/simulation", icon: Satellite },
        { name: "Analytics", href: "/reports", icon: BarChart3 },
        { name: "Challenges", href: "/challenges", icon: Target }
      ]
    },
    {
      title: "NASA Data",
      items: [
        { name: "Soil Moisture", href: "/data/soil-moisture", icon: Droplets },
        { name: "Vegetation", href: "/data/vegetation", icon: Leaf },
        { name: "Temperature", href: "/data/temperature", icon: ThermometerSun },
        { name: "Precipitation", href: "/data/precipitation", icon: CloudRain }
      ]
    },
    {
      title: "Management",
      items: [
        { name: "Farm Operations", href: "/farm", icon: Leaf },
        { name: "Weather Forecast", href: "/farm/weather", icon: CloudRain },
        { name: "Crop Planning", href: "/data/crop-type", icon: Calendar },
        { name: "Sustainability", href: "/sustainability", icon: Target }
      ]
    },
    {
      title: "Community",
      items: [
        { name: "Multiplayer", href: "/multiplayer", icon: Users },
        { name: "Leaderboards", href: "/leaderboards", icon: Trophy },
        { name: "Learning Hub", href: "/learn", icon: BookOpen }
      ]
    }
  ]

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <div className={`
      bg-slate-900/95 backdrop-blur-sm border-r border-slate-800 
      transition-all duration-300 ease-in-out h-screen sticky top-0 z-40
      ${isCollapsed ? 'w-16' : 'w-72'}
    `}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Satellite className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-white font-semibold text-sm">TerraAI Farm</h2>
                  <p className="text-slate-400 text-xs">NASA Navigator</p>
                </div>
              </div>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Notifications */}
        {!isCollapsed && notifications > 0 && (
          <div className="p-4">
            <Card className="bg-blue-900/20 border-blue-500/30">
              <CardContent className="p-3">
                <div className="flex items-center space-x-2">
                  <Bell className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-300 text-sm">New insights available</span>
                  <Badge className="bg-blue-600 text-white text-xs">
                    {notifications}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1">
            {navigationItems.map((section, sectionIndex) => (
              <div key={sectionIndex} className="px-3">
                {!isCollapsed && (
                  <h3 className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-3 px-3">
                    {section.title}
                  </h3>
                )}
                
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon
                    const active = isActive(item.href)
                    
                    return (
                      <Link key={item.href} href={item.href}>
                        <div className={`
                          flex items-center space-x-3 px-3 py-2 rounded-lg
                          transition-colors duration-200 group
                          ${active 
                            ? 'bg-blue-600 text-white' 
                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                          }
                        `}>
                          <Icon className="w-5 h-5 flex-shrink-0" />
                          {!isCollapsed && (
                            <>
                              <span className="text-sm font-medium">{item.name}</span>
                              {active && (
                                <div className="ml-auto w-2 h-2 bg-white rounded-full" />
                              )}
                            </>
                          )}
                        </div>
                      </Link>
                    )
                  })}
                </div>
                
                {sectionIndex < navigationItems.length - 1 && !isCollapsed && (
                  <Separator className="my-4 bg-slate-800" />
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Performance Metrics */}
        {!isCollapsed && (
          <div className="p-4 border-t border-slate-800">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-sm flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2 text-green-400" />
                  Farm Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Crop Health</span>
                  <span className="text-green-400 font-medium">87%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Water Efficiency</span>
                  <span className="text-blue-400 font-medium">92%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Sustainability</span>
                  <span className="text-purple-400 font-medium">81%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* User Profile */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-slate-300" />
            </div>
            
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">Guest Farmer</p>
                <p className="text-slate-400 text-xs truncate">Educational Mode</p>
              </div>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}