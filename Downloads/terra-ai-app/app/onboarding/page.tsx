/**
 * Onboarding Flow
 * Step-by-step farm setup wizard
 */

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { 
  MapPin, 
  Wheat, 
  CloudRain, 
  Satellite,
  ChevronRight,
  ChevronLeft,
  Check,
  Globe,
  Thermometer,
  Droplets,
  Sun,
  Target,
  BookOpen,
  Play
} from "lucide-react"

interface OnboardingStep {
  id: string
  title: string
  description: string
  completed: boolean
}

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [farmData, setFarmData] = useState({
    location: { lat: 40.7128, lng: -74.0060, name: "New York, USA" },
    farmName: "",
    cropType: "",
    farmSize: "medium",
    goals: [] as string[]
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const steps: OnboardingStep[] = [
    {
      id: "welcome",
      title: "Welcome to TerraAI",
      description: "Learn how NASA data powers precision agriculture",
      completed: currentStep > 0
    },
    {
      id: "location",
      title: "Choose Farm Location",
      description: "Select where your virtual farm will be located",
      completed: currentStep > 1
    },
    {
      id: "setup",
      title: "Farm Configuration",
      description: "Set up your farm details and crop selection",
      completed: currentStep > 2
    },
    {
      id: "tutorial",
      title: "NASA Data Tutorial",
      description: "Understand satellite data and its agricultural applications",
      completed: currentStep > 3
    },
    {
      id: "ready",
      title: "Ready to Farm",
      description: "Complete setup and enter your farm simulation",
      completed: currentStep > 4
    }
  ]

  const cropTypes = [
    { id: "corn", name: "Corn", icon: "🌽", description: "High-yield grain crop" },
    { id: "wheat", name: "Wheat", icon: "🌾", description: "Versatile cereal grain" },
    { id: "soybeans", name: "Soybeans", icon: "🫘", description: "Protein-rich legume" },
    { id: "cotton", name: "Cotton", icon: "☁️", description: "Fiber crop" }
  ]

  const farmGoals = [
    { id: "yield", name: "Maximize Yield", icon: Target },
    { id: "sustainability", name: "Sustainable Practices", icon: Globe },
    { id: "efficiency", name: "Resource Efficiency", icon: Droplets },
    { id: "learning", name: "Educational Experience", icon: BookOpen }
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = async () => {
    setIsLoading(true)
    
    // Simulate farm setup
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Update session with onboarding completion
    const session = JSON.parse(localStorage.getItem('terra-ai-session') || '{}')
    localStorage.setItem('terra-ai-session', JSON.stringify({
      ...session,
      farmData,
      progress: {
        ...session.progress,
        onboarding: true,
        setupComplete: true
      }
    }))
    
    // Redirect to dashboard
    router.push('/dashboard')
  }

  const progressPercentage = ((currentStep + 1) / steps.length) * 100

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6 text-center">
            <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto">
              <Satellite className="w-12 h-12 text-white" />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white">Welcome to TerraAI Farm Navigator</h2>
              <p className="text-gray-300 text-lg max-w-2xl">
                Experience precision agriculture powered by real NASA satellite data. 
                Learn how space technology helps farmers optimize crops, conserve resources, 
                and increase yields.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                { icon: Satellite, label: "Live NASA Data" },
                { icon: Globe, label: "Global Coverage" },
                { icon: Thermometer, label: "Climate Monitoring" },
                { icon: Droplets, label: "Water Management" }
              ].map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div key={index} className="bg-black/40 p-4 rounded-xl">
                    <Icon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <p className="text-white text-sm font-medium">{feature.label}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <MapPin className="w-16 h-16 text-blue-400 mx-auto" />
              <h2 className="text-2xl font-bold text-white">Choose Your Farm Location</h2>
              <p className="text-gray-300">
                Select a location for your virtual farm. This will determine the climate data, 
                soil conditions, and satellite coverage available for your simulation.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: "Iowa, USA", lat: 41.8781, lng: -93.0977, climate: "Continental", crops: "Corn, Soybeans" },
                  { name: "Punjab, India", lat: 31.1471, lng: 75.3412, climate: "Semi-arid", crops: "Wheat, Rice" },
                  { name: "São Paulo, Brazil", lat: -23.5505, lng: -46.6333, climate: "Subtropical", crops: "Coffee, Sugarcane" }
                ].map((location, index) => (
                  <Card 
                    key={index} 
                    className={`cursor-pointer transition-all ${
                      farmData.location.name === location.name 
                        ? 'bg-blue-600/20 border-blue-500' 
                        : 'bg-black/40 border-gray-600 hover:border-blue-400'
                    }`}
                    onClick={() => setFarmData({
                      ...farmData, 
                      location: { lat: location.lat, lng: location.lng, name: location.name }
                    })}
                  >
                    <CardContent className="p-4">
                      <h3 className="text-white font-semibold">{location.name}</h3>
                      <p className="text-sm text-gray-300">Climate: {location.climate}</p>
                      <p className="text-sm text-blue-300">Popular crops: {location.crops}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="space-y-2">
                <Label className="text-white">Or enter custom coordinates:</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input 
                    placeholder="Latitude" 
                    className="bg-black/50 border-gray-600 text-white"
                    value={farmData.location.lat}
                    onChange={(e) => setFarmData({
                      ...farmData,
                      location: { ...farmData.location, lat: parseFloat(e.target.value) || 0 }
                    })}
                  />
                  <Input 
                    placeholder="Longitude" 
                    className="bg-black/50 border-gray-600 text-white"
                    value={farmData.location.lng}
                    onChange={(e) => setFarmData({
                      ...farmData,
                      location: { ...farmData.location, lng: parseFloat(e.target.value) || 0 }
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <Wheat className="w-16 h-16 text-green-400 mx-auto" />
              <h2 className="text-2xl font-bold text-white">Configure Your Farm</h2>
              <p className="text-gray-300">
                Set up your farm details including name, primary crop, and agricultural goals.
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-white">Farm Name</Label>
                <Input
                  placeholder="Enter your farm name"
                  value={farmData.farmName}
                  onChange={(e) => setFarmData({ ...farmData, farmName: e.target.value })}
                  className="bg-black/50 border-gray-600 text-white"
                />
              </div>

              <div className="space-y-4">
                <Label className="text-white">Primary Crop</Label>
                <div className="grid grid-cols-2 gap-4">
                  {cropTypes.map((crop) => (
                    <Card
                      key={crop.id}
                      className={`cursor-pointer transition-all ${
                        farmData.cropType === crop.id
                          ? 'bg-green-600/20 border-green-500'
                          : 'bg-black/40 border-gray-600 hover:border-green-400'
                      }`}
                      onClick={() => setFarmData({ ...farmData, cropType: crop.id })}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="text-3xl mb-2">{crop.icon}</div>
                        <h3 className="text-white font-semibold">{crop.name}</h3>
                        <p className="text-sm text-gray-300">{crop.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-white">Farm Goals (Select multiple)</Label>
                <div className="grid grid-cols-2 gap-3">
                  {farmGoals.map((goal) => {
                    const Icon = goal.icon
                    const isSelected = farmData.goals.includes(goal.id)
                    return (
                      <Button
                        key={goal.id}
                        variant={isSelected ? "default" : "outline"}
                        className={`justify-start ${
                          isSelected 
                            ? 'bg-blue-600 hover:bg-blue-700' 
                            : 'border-gray-600 text-gray-300 hover:bg-gray-700'
                        }`}
                        onClick={() => {
                          const newGoals = isSelected
                            ? farmData.goals.filter(g => g !== goal.id)
                            : [...farmData.goals, goal.id]
                          setFarmData({ ...farmData, goals: newGoals })
                        }}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {goal.name}
                      </Button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto">
                <Satellite className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">NASA Data Tutorial</h2>
              <p className="text-gray-300">
                Learn how satellite data helps optimize your farming decisions.
              </p>
            </div>

            <div className="grid gap-4">
              {[
                {
                  title: "SMAP - Soil Moisture",
                  description: "Monitor soil water content to optimize irrigation timing",
                  icon: Droplets,
                  color: "blue"
                },
                {
                  title: "MODIS - Vegetation Health",
                  description: "Track crop growth and identify stress patterns",
                  icon: Sun,
                  color: "green"
                },
                {
                  title: "GPM - Precipitation",
                  description: "Track rainfall patterns for water management",
                  icon: CloudRain,
                  color: "purple"
                },
                {
                  title: "ECOSTRESS - Temperature",
                  description: "Monitor land surface temperature and heat stress",
                  icon: Thermometer,
                  color: "red"
                }
              ].map((dataType, index) => {
                const Icon = dataType.icon
                return (
                  <Card key={index} className="bg-black/40 border-gray-600">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 bg-${dataType.color}-600/20 rounded-lg flex items-center justify-center`}>
                          <Icon className={`w-6 h-6 text-${dataType.color}-400`} />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{dataType.title}</h3>
                          <p className="text-gray-300 text-sm">{dataType.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6 text-center">
            <div className="w-20 h-20 bg-green-600 rounded-3xl flex items-center justify-center mx-auto">
              <Check className="w-12 h-12 text-white" />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white">Your Farm is Ready!</h2>
              <p className="text-gray-300 text-lg">
                {farmData.farmName || 'Your farm'} has been configured successfully. 
                You're ready to start your NASA-powered agricultural simulation.
              </p>
            </div>

            <div className="bg-black/40 rounded-xl p-6 space-y-4">
              <h3 className="text-white font-semibold">Farm Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <p className="text-white">{farmData.location.name}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Primary Crop</p>
                  <p className="text-white">{cropTypes.find(c => c.id === farmData.cropType)?.name || 'Not selected'}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-gray-400 text-sm">Goals</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {farmData.goals.map(goalId => {
                      const goal = farmGoals.find(g => g.id === goalId)
                      return (
                        <Badge key={goalId} className="bg-blue-600/20 text-blue-300">
                          {goal?.name}
                        </Badge>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleComplete}
              disabled={isLoading}
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-8"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Setting up farm...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Enter Farm Dashboard
                </>
              )}
            </Button>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">Farm Setup</h1>
            <Badge className="bg-blue-600/20 text-blue-300">
              Step {currentStep + 1} of {steps.length}
            </Badge>
          </div>
          <Progress value={progressPercentage} className="h-2 bg-black/40" />
          
          <div className="flex justify-between mt-4">
            {steps.map((step, index) => (
              <div 
                key={step.id} 
                className={`flex items-center text-sm ${
                  index <= currentStep ? 'text-blue-400' : 'text-gray-500'
                }`}
              >
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  index < currentStep ? 'bg-green-500' :
                  index === currentStep ? 'bg-blue-500' : 'bg-gray-600'
                }`} />
                <span className="hidden md:inline">{step.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="bg-black/80 backdrop-blur-xl border border-blue-500/30 mb-8">
          <CardContent className="p-8">
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {currentStep < steps.length - 1 && (
            <Button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
