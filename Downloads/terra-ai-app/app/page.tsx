import Link from "next/link"
import { Button } from "@/components/ui/button"
import Script from "next/script"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Satellite, Brain, Globe, Users, Zap, Shield, TrendingUp, Award, Play, ChevronRight, Database, Cpu, Cloud, MapPin } from "lucide-react"

// ✅ Force static generation for low TTFB
export const dynamic = "force-static"

export default function Page() {
  // Structured data for main page
  const pageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://terra-ai.app/",
    name: "TerraAI — Revolutionary NASA-Powered Agricultural Simulation",
    description:
      "Experience the future of farming with TerraAI. Advanced AI-powered agricultural simulation using real NASA satellite data, machine learning, and cutting-edge technology stack. Features real-time SMAP, MODIS, GPM data integration with AI decision support.",
    url: "https://terra-ai.app/",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free demo available"
    },
    potentialAction: {
      "@type": "PlayAction",
      name: "Start Gaming",
      target: "https://terra-ai.app/dashboard",
    },
  }

  return (
    <>
      <main className="min-h-[100dvh] relative">
        {/* Modern Navigation */}
        <nav className="fixed top-0 w-full z-50 bg-black/10 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-blue-500/10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Satellite className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">TerraAI</span>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <Link href="#features" className="text-gray-300 hover:text-white transition-colors">Features</Link>
                <Link href="#technology" className="text-gray-300 hover:text-white transition-colors">Technology</Link>
                <Link href="#data" className="text-gray-300 hover:text-white transition-colors">NASA Data</Link>
                <Link href="#about" className="text-gray-300 hover:text-white transition-colors">About</Link>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Link href="/guest">Try Demo</Link>
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/dashboard" className="flex items-center space-x-2">
                    <Play className="w-4 h-4" />
                    <span>Start Gaming</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Revolutionary Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Advanced background with multiple layers */}
          <div className="absolute inset-0 bg-black" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
          
          {/* Floating elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-green-500/20 rounded-full blur-xl animate-pulse delay-700" />
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-300" />

          <div className="container mx-auto px-6 pt-24 pb-12 relative z-10">
            <div className="text-center max-w-6xl mx-auto">
              {/* Hero badges */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <Badge className="bg-blue-600/20 backdrop-blur-md border border-blue-400/30 text-white px-4 py-2 shadow-lg shadow-blue-500/20">
                  <Satellite className="w-4 h-4 mr-2" />
                  NASA Powered
                </Badge>
                <Badge className="bg-blue-600/20 backdrop-blur-md border border-blue-400/30 text-white px-4 py-2 shadow-lg shadow-blue-500/20">
                  <Brain className="w-4 h-4 mr-2" />
                  AI-Driven
                </Badge>
                <Badge className="bg-blue-600/20 backdrop-blur-md border border-blue-400/30 text-white px-4 py-2 shadow-lg shadow-blue-500/20">
                  <Globe className="w-4 h-4 mr-2" />
                  Real-Time Data
                </Badge>
              </div>

              {/* Main headline */}
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
                Revolutionize
                <span className="block text-blue-500">
                  Agriculture
                </span>
                <span className="block text-4xl md:text-5xl text-gray-300 mt-4">
                  with NASA AI Technology
                </span>
              </h1>

              {/* Compelling description */}
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                Experience the future of farming with <span className="text-white font-semibold">TerraAI</span> - 
                the world's first agricultural simulation powered by real NASA satellite data, 
                advanced machine learning, and cutting-edge visualization technology.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <Button size="lg" className="bg-blue-600/80 backdrop-blur-xl border border-blue-400/50 hover:bg-blue-700/80 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl shadow-blue-500/30 transform hover:scale-105 transition-all duration-200">
                  <Link href="/dashboard" className="flex items-center space-x-3">
                    <Play className="w-6 h-6" />
                    <span>Start Your Farm Journey</span>
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white/40 bg-white/5 backdrop-blur-xl text-white hover:bg-white/15 px-8 py-4 text-lg rounded-xl shadow-lg shadow-white/10">
                  <Link href="/guest" className="flex items-center space-x-2">
                    <span>Try Demo</span>
                  </Link>
                </Button>
              </div>

              {/* Key stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                <div className="text-center bg-black/20 backdrop-blur-xl border border-blue-500/20 rounded-xl p-6 shadow-lg shadow-blue-500/10">
                  <div className="text-3xl font-bold text-white mb-2">10+</div>
                  <div className="text-gray-400">NASA Data Sources</div>
                </div>
                <div className="text-center bg-black/20 backdrop-blur-xl border border-blue-500/20 rounded-xl p-6 shadow-lg shadow-blue-500/10">
                  <div className="text-3xl font-bold text-white mb-2">90%</div>
                  <div className="text-gray-400">AI Accuracy</div>
                </div>
                <div className="text-center bg-black/20 backdrop-blur-xl border border-blue-500/20 rounded-xl p-6 shadow-lg shadow-blue-500/10">
                  <div className="text-3xl font-bold text-white mb-2">Real-time</div>
                  <div className="text-gray-400">Satellite Updates</div>
                </div>
                <div className="text-center bg-black/20 backdrop-blur-xl border border-blue-500/20 rounded-xl p-6 shadow-lg shadow-blue-500/10">
                  <div className="text-3xl font-bold text-white mb-2">3D</div>
                  <div className="text-gray-400">Farm Visualization</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Stack Showcase */}
        <section className="py-24 bg-black">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Built on <span className="text-blue-500">Cutting-Edge Technology</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our revolutionary platform combines the latest in AI, real-time data processing, and immersive visualization
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="bg-blue-900/20 backdrop-blur-xl border border-blue-500/30 shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-600/80 backdrop-blur-md border border-blue-400/40 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-white text-xl">Advanced AI/ML</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p className="mb-3">TensorFlow & PyTorch models for intelligent decision support</p>
                  <div className="space-y-1 text-sm">
                    <div>• Yield prediction algorithms</div>
                    <div>• Disease early warning</div>
                    <div>• Market intelligence</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-900/20 backdrop-blur-xl border border-blue-500/30 shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-600/80 backdrop-blur-md border border-blue-400/40 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20">
                    <Database className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-white text-xl">Real-Time Data</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p className="mb-3">Live NASA satellite feeds with advanced processing</p>
                  <div className="space-y-1 text-sm">
                    <div>• SMAP soil moisture</div>
                    <div>• MODIS vegetation health</div>
                    <div>• GPM precipitation data</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-900/20 backdrop-blur-xl border border-blue-500/30 shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-600/80 backdrop-blur-md border border-blue-400/40 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20">
                    <Cpu className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-white text-xl">3D Visualization</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p className="mb-3">Immersive farm environments with AR/VR support</p>
                  <div className="space-y-1 text-sm">
                    <div>• Three.js 3D engine</div>
                    <div>• WebGL acceleration</div>
                    <div>• AR field scanning</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-900/20 backdrop-blur-xl border border-blue-500/30 shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-600/80 backdrop-blur-md border border-blue-400/40 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20">
                    <Cloud className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-white text-xl">Cloud Infrastructure</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p className="mb-3">Scalable backend with real-time capabilities</p>
                  <div className="space-y-1 text-sm">
                    <div>• FastAPI performance</div>
                    <div>• Redis caching</div>
                    <div>• PostgreSQL + PostGIS</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* NASA Farm Navigators Feature */}
        <section id="navigators" className="py-24 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="bg-blue-600/20 backdrop-blur-md border border-blue-400/30 text-white px-6 py-3 mb-6 shadow-lg shadow-blue-500/20">
                <Award className="w-4 h-4 mr-2" />
                NASA Challenge Winner
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                <span className="text-blue-500">NASA Farm Navigators</span>
                <br />Educational Farming Game
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                Learn precision agriculture through interactive scenarios using real NASA satellite data. 
                Bridge the gap between complex Earth science data and practical farming applications.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="bg-black/20 backdrop-blur-xl border border-blue-500/30 rounded-xl p-6">
                    <h3 className="text-2xl font-bold text-white mb-4">🎯 Educational Scenarios</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-blue-400 rounded-full" />
                        <span className="text-gray-300">California Drought Management Challenge</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-400 rounded-full" />
                        <span className="text-gray-300">Midwest Crop Health Monitoring</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-purple-400 rounded-full" />
                        <span className="text-gray-300">Great Plains Precision Agriculture</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/20 backdrop-blur-xl border border-blue-500/30 rounded-xl p-6">
                    <h3 className="text-2xl font-bold text-white mb-4">🛰️ Real NASA Datasets</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <Badge variant="outline" className="text-xs border-blue-400/30 text-blue-300">SMAP Soil Moisture</Badge>
                      <Badge variant="outline" className="text-xs border-green-400/30 text-green-300">MODIS Vegetation</Badge>
                      <Badge variant="outline" className="text-xs border-cyan-400/30 text-cyan-300">GPM Precipitation</Badge>
                      <Badge variant="outline" className="text-xs border-orange-400/30 text-orange-300">ECOSTRESS ET</Badge>
                      <Badge variant="outline" className="text-xs border-red-400/30 text-red-300">Landsat Imagery</Badge>
                      <Badge variant="outline" className="text-xs border-yellow-400/30 text-yellow-300">VIIRS Fire Data</Badge>
                    </div>
                  </div>
                </div>

                <Button size="lg" className="bg-blue-600/80 backdrop-blur-xl border border-blue-400/50 hover:bg-blue-700/80 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl shadow-blue-500/30">
                  <Link href="/dashboard" className="flex items-center space-x-3">
                    <Play className="w-6 h-6" />
                    <span>Start Learning Now</span>
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>

              <div className="relative">
                <div className="bg-black/40 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-8 shadow-2xl shadow-blue-500/20">
                  <div className="aspect-video bg-gradient-to-br from-blue-900/40 to-green-900/40 rounded-xl flex items-center justify-center mb-6">
                    <div className="text-center text-white">
                      <Satellite className="w-16 h-16 mx-auto mb-4 text-blue-400" />
                      <p className="text-lg font-semibold">Interactive Farm Visualization</p>
                      <p className="text-sm text-gray-300">Canvas-based NASA data overlay</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">75</div>
                      <div className="text-xs text-gray-400">Sustainability Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">82</div>
                      <div className="text-xs text-gray-400">Yield Potential</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">2/4</div>
                      <div className="text-xs text-gray-400">Objectives Complete</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Features Showcase */}
        <section id="features" className="py-24 bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Revolutionary Gaming Features
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Experience agriculture like never before with our comprehensive feature set
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <Card className="bg-black/20 backdrop-blur-xl border border-blue-500/30 shadow-xl shadow-blue-500/20 hover:border-blue-500/50 hover:shadow-blue-500/30 transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-600/80 backdrop-blur-md border border-blue-400/40 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-white text-2xl mb-4">Multi-Region Farm Simulator</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300 space-y-4">
                  <p>Manage farms across different scales and regions:</p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      <span>Smallholder farms (1-10 acres)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      <span>Commercial operations (100-1000 acres)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      <span>Industrial farming (5000+ acres)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-xl border border-blue-500/30 shadow-xl shadow-blue-500/20 hover:border-blue-500/50 hover:shadow-blue-500/30 transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-600/80 backdrop-blur-md border border-blue-400/40 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-white text-2xl mb-4">AI Decision Support</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300 space-y-4">
                  <p>Intelligent recommendations powered by advanced AI:</p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      <span>90% accurate yield predictions</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      <span>2-week advance disease warnings</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      <span>Market intelligence & forecasting</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-xl border border-blue-500/30 shadow-xl shadow-blue-500/20 hover:border-blue-500/50 hover:shadow-blue-500/30 transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-600/80 backdrop-blur-md border border-blue-400/40 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-white text-2xl mb-4">Multiplayer Ecosystem</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300 space-y-4">
                  <p>Connect and compete with farmers worldwide:</p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      <span>Regional farming alliances</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      <span>Knowledge sharing networks</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      <span>Sustainability leaderboards</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* NASA Data Integration */}
        <section id="data" className="py-24 bg-black">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Powered by <span className="text-blue-500">NASA Technology</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Access real-time satellite data from NASA's most advanced Earth observation missions
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-blue-900/15 backdrop-blur-xl border border-blue-500/40 shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300">
                <CardHeader>
                  <Badge className="bg-blue-600/80 backdrop-blur-md border border-blue-400/40 text-white w-fit mb-3 shadow-lg shadow-blue-500/20">SMAP</Badge>
                  <CardTitle className="text-white text-xl">Soil Moisture Active Passive</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p>Real-time soil moisture data for precision irrigation and drought management.</p>
                  <div className="mt-4 text-sm text-blue-300">
                    Updates every 3-6 hours
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-900/15 backdrop-blur-xl border border-blue-500/40 shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300">
                <CardHeader>
                  <Badge className="bg-blue-600/80 backdrop-blur-md border border-blue-400/40 text-white w-fit mb-3 shadow-lg shadow-blue-500/20">MODIS/VIIRS</Badge>
                  <CardTitle className="text-white text-xl">Vegetation Health Monitoring</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p>Track crop health, stress levels, and growth patterns with satellite imagery.</p>
                  <div className="mt-4 text-sm text-blue-300">
                    Daily updates
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-900/15 backdrop-blur-xl border border-blue-500/40 shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300">
                <CardHeader>
                  <Badge className="bg-blue-600/80 backdrop-blur-md border border-blue-400/40 text-white w-fit mb-3 shadow-lg shadow-blue-500/20">GPM</Badge>
                  <CardTitle className="text-white text-xl">Global Precipitation Mission</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p>Precise rainfall data for water management and flood risk assessment.</p>
                  <div className="mt-4 text-sm text-blue-300">
                    30-minute intervals
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-900/15 backdrop-blur-xl border border-blue-500/40 shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300">
                <CardHeader>
                  <Badge className="bg-blue-600/80 backdrop-blur-md border border-blue-400/40 text-white w-fit mb-3 shadow-lg shadow-blue-500/20">ECOSTRESS</Badge>
                  <CardTitle className="text-white text-xl">Thermal Stress Monitoring</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p>Plant temperature data to optimize irrigation and detect heat stress early.</p>
                  <div className="mt-4 text-sm text-blue-300">
                    Every 3-5 days
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-900/15 backdrop-blur-xl border border-blue-500/40 shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300">
                <CardHeader>
                  <Badge className="bg-blue-600/80 backdrop-blur-md border border-blue-400/40 text-white w-fit mb-3 shadow-lg shadow-blue-500/20">Landsat 8/9</Badge>
                  <CardTitle className="text-white text-xl">High-Resolution Imagery</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p>Detailed field-level analysis with multispectral satellite imagery.</p>
                  <div className="mt-4 text-sm text-blue-300">
                    16-day revisit cycle
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-900/15 backdrop-blur-xl border border-blue-500/40 shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300">
                <CardHeader>
                  <Badge className="bg-blue-600/80 backdrop-blur-md border border-blue-400/40 text-white w-fit mb-3 shadow-lg shadow-blue-500/20">AIRS</Badge>
                  <CardTitle className="text-white text-xl">Atmospheric Data</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p>Temperature and humidity profiles for comprehensive weather modeling.</p>
                  <div className="mt-4 text-sm text-blue-300">
                    Daily global coverage
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <p className="text-sm text-gray-400 max-w-2xl mx-auto">
                Disclaimer: NASA does not endorse this product. NASA names, imagery, and data are used solely for educational and illustrative purposes within the game.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-24 bg-blue-900/80 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />
          <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to Transform Agriculture?
            </h2>
            <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto">
              Join thousands of farmers, students, and agricultural professionals already using TerraAI
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button size="lg" className="bg-white/90 backdrop-blur-xl border border-white/50 text-black hover:bg-white hover:shadow-white/20 px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl shadow-white/10 transform hover:scale-105 transition-all duration-200">
                <Link href="/dashboard" className="flex items-center space-x-3">
                  <Play className="w-6 h-6" />
                  <span>Start Farming Now</span>
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white/40 bg-white/5 backdrop-blur-xl text-white hover:bg-white/15 hover:text-white px-12 py-6 text-xl rounded-2xl shadow-lg shadow-white/10">
                <Link href="/guest">Try Free Demo</Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-white/80">
              <div className="text-center bg-white/5 backdrop-blur-xl border border-blue-500/20 rounded-xl p-6 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-300">
                <Satellite className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                <div className="text-sm font-medium">NASA Powered</div>
              </div>
              <div className="text-center bg-white/5 backdrop-blur-xl border border-blue-500/20 rounded-xl p-6 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-300">
                <Shield className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                <div className="text-sm font-medium">Scientifically Accurate</div>
              </div>
              <div className="text-center bg-white/5 backdrop-blur-xl border border-blue-500/20 rounded-xl p-6 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-300">
                <Award className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                <div className="text-sm font-medium">Award Winning</div>
              </div>
              <div className="text-center bg-white/5 backdrop-blur-xl border border-blue-500/20 rounded-xl p-6 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-300">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                <div className="text-sm font-medium">Proven Results</div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black/80 backdrop-blur-xl border-t border-blue-500/20 shadow-2xl shadow-blue-500/10">
          <div className="container mx-auto px-6 py-12">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-blue-600/80 backdrop-blur-md border border-blue-400/40 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <Satellite className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-white">TerraAI</span>
                </div>
                <p className="text-gray-400 mb-4">
                  Revolutionizing agriculture through NASA-powered AI technology and immersive simulation.
                </p>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-4">Product</h4>
                <div className="space-y-2">
                  <Link href="/dashboard" className="block text-gray-400 hover:text-white transition-colors">Farm Dashboard</Link>
                  <Link href="/guest" className="block text-gray-400 hover:text-white transition-colors">Demo</Link>
                  <Link href="#features" className="block text-gray-400 hover:text-white transition-colors">Features</Link>
                  <Link href="#technology" className="block text-gray-400 hover:text-white transition-colors">Technology</Link>
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-4">Learn</h4>
                <div className="space-y-2">
                  <Link href="/onboarding" className="block text-gray-400 hover:text-white transition-colors">Getting Started</Link>
                  <Link href="#data" className="block text-gray-400 hover:text-white transition-colors">NASA Data</Link>
                  <Link href="#about" className="block text-gray-400 hover:text-white transition-colors">About</Link>
                  <Link href="#blog" className="block text-gray-400 hover:text-white transition-colors">Blog</Link>
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-4">Support</h4>
                <div className="space-y-2">
                  <Link href="#help" className="block text-gray-400 hover:text-white transition-colors">Help Center</Link>
                  <Link href="#contact" className="block text-gray-400 hover:text-white transition-colors">Contact</Link>
                  <Link href="#community" className="block text-gray-400 hover:text-white transition-colors">Community</Link>
                  <Link href="#status" className="block text-gray-400 hover:text-white transition-colors">Status</Link>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2025 TerraAI. NASA does not endorse this product. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <Link href="#privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy</Link>
                <Link href="#terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms</Link>
                <Link href="#cookies" className="text-gray-400 hover:text-white text-sm transition-colors">Cookies</Link>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* JSON-LD structured data */}
      <Script
        id="page-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageStructuredData),
        }}
      />
    </>
  )
}
