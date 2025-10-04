/**
 * Farm Dashboard - Main Hub
 * Central navigation for all farm management features
 */

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Map, 
  CloudRain, 
  DollarSign, 
  Leaf, 
  AlertTriangle,
  BarChart3,
  Play,
  Settings,
  Satellite,
  Zap,
  TrendingUp,
  Users
} from "lucide-react"

const farmFeatures = [
  {
    id: 'simulation',
    title: '3D Farm Simulation',
    description: 'Advanced 3D visualization with real NASA satellite data integration',
    icon: Map,
    color: 'bg-blue-600/20 text-blue-300 border-blue-500/30',
    href: '/farm/simulation',
    status: 'active',
    features: ['Real NASA GIBS tiles', 'Instanced crops', 'Weather effects', 'Post-processing']
  },
  {
    id: 'weather',
    title: 'NASA Weather Data',
    description: 'Real-time weather monitoring with SMAP, GPM, and POWER data',
    icon: CloudRain,
    color: 'bg-cyan-600/20 text-cyan-300 border-cyan-500/30',
    href: '/farm/weather',
    status: 'active',
    features: ['SMAP soil moisture', 'GPM precipitation', 'MODIS temperature', 'Live updates']
  },
  {
    id: 'economy',
    title: 'Farm Economics',
    description: 'Market analysis, supply chain, and financial optimization',
    icon: DollarSign,
    color: 'bg-green-600/20 text-green-300 border-green-500/30',
    href: '/economy',
    status: 'coming-soon',
    features: ['Market prices', 'Supply chain', 'ROI analysis', 'Cost optimization']
  },
  {
    id: 'sustainability',
    title: 'Sustainability Metrics',
    description: 'Carbon footprint, water efficiency, and environmental impact',
    icon: Leaf,
    color: 'bg-emerald-600/20 text-emerald-300 border-emerald-500/30',
    href: '/sustainability',
    status: 'active',
    features: ['Carbon tracking', 'Water usage', 'Biodiversity', 'Soil health']
  },
  {
    id: 'challenges',
    title: 'Crisis Scenarios',
    description: 'Test your skills with drought, pest outbreaks, and market crashes',
    icon: AlertTriangle,
    color: 'bg-red-600/20 text-red-300 border-red-500/30',
    href: '/challenges',
    status: 'active',
    features: ['Drought simulation', 'Pest management', 'Market volatility', 'Climate events']
  },
  {
    id: 'reports',
    title: 'Farm Analytics',
    description: 'Daily reports, seasonal analysis, and performance tracking',
    icon: BarChart3,
    color: 'bg-purple-600/20 text-purple-300 border-purple-500/30',
    href: '/reports',
    status: 'active',
    features: ['Daily reports', 'Yield prediction', 'Trend analysis', 'Benchmarking']
  }
]

const quickStats = [
  { label: 'Active Fields', value: '4', change: '+0', color: 'text-blue-400' },
  { label: 'NASA Data Sources', value: '12', change: '+2', color: 'text-green-400' },
  { label: 'Sustainability Score', value: '85%', change: '+3%', color: 'text-emerald-400' },
  { label: 'Yield Prediction', value: '92t/ha', change: '+5%', color: 'text-yellow-400' }
]

export default function FarmDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Satellite className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">Farm Dashboard</h1>
          </div>
          <p className="text-blue-300 text-lg max-w-3xl mx-auto">
            Central hub for managing your agricultural operations with NASA satellite data, 
            AI-powered insights, and advanced 3D visualization.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3">
            <Badge className="bg-green-600/20 text-green-300">
              <Zap className="w-3 h-3 mr-1" />
              Live NASA Data
            </Badge>
            <Badge className="bg-blue-600/20 text-blue-300">
              <TrendingUp className="w-3 h-3 mr-1" />
              Real-time Analytics
            </Badge>
            <Badge className="bg-purple-600/20 text-purple-300">
              <Users className="w-3 h-3 mr-1" />
              Multiplayer Ready
            </Badge>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => (
            <Card key={index} className="bg-black/80 backdrop-blur-xl border border-blue-500/30">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-sm text-white">{stat.label}</div>
                  <div className="text-xs text-gray-400">{stat.change}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {farmFeatures.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.id} className={`bg-black/80 backdrop-blur-xl border ${feature.color.split(' ')[2]} hover:scale-105 transition-transform duration-200`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${feature.color.split(' ')[0]} ${feature.color.split(' ')[2]}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex gap-2">
                      {feature.status === 'active' && (
                        <Badge className="bg-green-600/20 text-green-300 text-xs">Active</Badge>
                      )}
                      {feature.status === 'coming-soon' && (
                        <Badge className="bg-orange-600/20 text-orange-300 text-xs">Coming Soon</Badge>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                  
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                      Key Features:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {feature.features.map((feat, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-300">
                          {feat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    {feature.status === 'active' ? (
                      <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                        <Link href={feature.href} className="flex items-center gap-2">
                          <Play className="w-4 h-4" />
                          Launch {feature.title}
                        </Link>
                      </Button>
                    ) : (
                      <Button disabled className="w-full">
                        <Settings className="w-4 h-4 mr-2" />
                        Coming Soon
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quick Actions */}
        <Card className="bg-black/80 backdrop-blur-xl border border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <Button asChild variant="outline" className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10">
                <Link href="/setup">
                  <Settings className="w-4 h-4 mr-2" />
                  API Setup
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-green-500/30 text-green-300 hover:bg-green-500/10">
                <Link href="/data">
                  <Satellite className="w-4 h-4 mr-2" />
                  NASA Data Hub
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10">
                <Link href="/ai">
                  <Zap className="w-4 h-4 mr-2" />
                  TerraAI Analytics
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-yellow-500/30 text-yellow-300 hover:bg-yellow-500/10">
                <Link href="/learn">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Learning Hub
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Technical Status */}
        <Card className="bg-black/80 backdrop-blur-xl border border-gray-600/30">
          <CardHeader>
            <CardTitle className="text-white text-sm">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 text-xs">
              <div>
                <div className="text-green-300 font-medium mb-1">🟢 NASA APIs</div>
                <div className="text-gray-400">All satellite data sources operational</div>
              </div>
              <div>
                <div className="text-blue-300 font-medium mb-1">🔵 3D Rendering</div>
                <div className="text-gray-400">React Three Fiber + WebGL active</div>
              </div>
              <div>
                <div className="text-purple-300 font-medium mb-1">🟣 Real-time Data</div>
                <div className="text-gray-400">Live updates every 15 minutes</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}