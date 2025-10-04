/**
 * Guest Entry Screen
 * First landing page for new users
 */

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Satellite, 
  User, 
  Play, 
  Globe, 
  Sparkles,
  ArrowRight,
  Users,
  BookOpen,
  Trophy,
  Shield,
  Settings
} from "lucide-react"

export default function GuestPage() {
  const [guestName, setGuestName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleGuestEntry = async () => {
    setIsLoading(true)
    
    // Simulate session creation
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Store guest session
    localStorage.setItem('terra-ai-session', JSON.stringify({
      type: 'guest',
      name: guestName || 'Guest Farmer',
      startTime: new Date().toISOString(),
      progress: {
        onboarding: false,
        firstSimulation: false,
        completedChallenges: 0
      }
    }))
    
    // Redirect to onboarding
    router.push('/onboarding')
  }

  const features = [
    {
      icon: Satellite,
      title: 'Real NASA Data',
      description: 'Access live satellite data from SMAP, MODIS, and GPM missions'
    },
    {
      icon: Globe,
      title: 'Global Farms',
      description: 'Manage farms across different climates and agricultural zones'
    },
    {
      icon: Sparkles,
      title: 'AI-Powered Insights',
      description: 'Get intelligent recommendations based on satellite analysis'
    },
    {
      icon: Users,
      title: 'Educational Gaming',
      description: 'Learn precision agriculture through interactive scenarios'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
              <Satellite className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-bold text-white">TerraAI</h1>
              <p className="text-blue-300 text-lg">NASA Farm Navigator</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-white">
              Welcome to the Future of Agriculture
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience precision farming with real NASA satellite data, 
              AI-powered insights, and immersive 3D visualization.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Badge className="bg-green-600/20 text-green-300 px-3 py-1">
              <Shield className="w-3 h-3 mr-1" />
              No Registration Required
            </Badge>
            <Badge className="bg-blue-600/20 text-blue-300 px-3 py-1">
              <BookOpen className="w-3 h-3 mr-1" />
              Educational Experience
            </Badge>
            <Badge className="bg-purple-600/20 text-purple-300 px-3 py-1">
              <Trophy className="w-3 h-3 mr-1" />
              Gamified Learning
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Guest Entry Form */}
          <Card className="bg-black/80 backdrop-blur-xl border border-blue-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <User className="w-6 h-6 text-blue-400" />
                Start Your Farm Journey
              </CardTitle>
              <p className="text-gray-300">
                Enter as a guest to explore NASA-powered agricultural simulation
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="guestName" className="text-white">
                  Farmer Name (Optional)
                </Label>
                <Input
                  id="guestName"
                  type="text"
                  placeholder="Enter your name or stay anonymous"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="bg-black/50 border-blue-500/30 text-white placeholder:text-gray-400"
                />
              </div>

              <Button 
                onClick={handleGuestEntry}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Creating Session...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Enter Simulation
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>

              <div className="text-center">
                <p className="text-xs text-gray-400">
                  No account needed • Free access • Educational purpose
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Features Preview */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white mb-6">What You'll Experience</h3>
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="flex items-start gap-4 p-4 bg-black/40 backdrop-blur-sm rounded-xl border border-white/10">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{feature.title}</h4>
                    <p className="text-gray-300 text-sm">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Alternative Options */}
        <Card className="bg-black/60 backdrop-blur-xl border border-gray-600/30">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <h3 className="text-white font-semibold">Alternative Access Options</h3>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700" asChild>
                  <Link href="/setup">
                    <Settings className="w-4 h-4 mr-2" />
                    Configure NASA APIs
                  </Link>
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700" asChild>
                  <Link href="/learn">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Learning Resources
                  </Link>
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700" asChild>
                  <Link href="/">
                    <Globe className="w-4 h-4 mr-2" />
                    Back to Homepage
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}