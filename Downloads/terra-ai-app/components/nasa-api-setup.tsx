/**
 * NASA API Setup Guide Component
 * Helps users configure their NASA API keys and understand data sources
 */

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input" 
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  ExternalLink, 
  Key, 
  Satellite, 
  CheckCircle, 
  AlertTriangle, 
  Copy,
  Book,
  Settings,
  Globe,
  Database
} from "lucide-react"

export function NASAAPISetupGuide() {
  const [apiKey, setApiKey] = useState("")
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle')
  const [testMessage, setTestMessage] = useState("")

  const testAPIKey = async () => {
    if (!apiKey.trim()) {
      setTestStatus('error')
      setTestMessage('Please enter an API key')
      return
    }

    setTestStatus('testing')
    
    try {
      const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
      
      if (response.ok) {
        setTestStatus('success')
        setTestMessage('✅ API key is valid! Your NASA data connection is ready.')
      } else if (response.status === 403) {
        setTestStatus('error')
        setTestMessage('❌ Invalid API key. Please check your key and try again.')
      } else {
        setTestStatus('error')
        setTestMessage(`❌ API error: ${response.status}. Please try again later.`)
      }
    } catch (error) {
      setTestStatus('error')
      setTestMessage('❌ Network error. Please check your connection.')
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      <Card className="bg-black/80 backdrop-blur-xl border border-blue-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Settings className="w-6 h-6 text-blue-400" />
            NASA API Configuration
          </CardTitle>
          <p className="text-blue-300">
            Set up your NASA API access to unlock real satellite data in the educational farming game
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="quick-start" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-black/80 backdrop-blur-xl border border-blue-500/30">
          <TabsTrigger value="quick-start">Quick Start</TabsTrigger>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="datasets">Data Sources</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="quick-start" className="space-y-6">
          <Card className="bg-black/80 backdrop-blur-xl border border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-white">🚀 Get Started in 3 Steps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                  <div>
                    <h3 className="text-white font-semibold">Get Your Free NASA API Key</h3>
                    <p className="text-gray-300 text-sm mb-2">
                      Visit NASA's API portal and sign up for a free API key (takes 30 seconds)
                    </p>
                    <Button 
                      variant="outline" 
                      className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10"
                      onClick={() => window.open('https://api.nasa.gov/', '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Get NASA API Key
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                  <div>
                    <h3 className="text-white font-semibold">Configure Your Environment</h3>
                    <p className="text-gray-300 text-sm mb-2">
                      Add your API key to the .env.local file (already created for you)
                    </p>
                    <div className="bg-gray-900/50 rounded p-3 font-mono text-sm text-green-400">
                      NASA_API_KEY=your_api_key_here
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
                  <div>
                    <h3 className="text-white font-semibold">Start Learning!</h3>
                    <p className="text-gray-300 text-sm">
                      Restart the development server and explore real NASA data in the farming scenarios
                    </p>
                  </div>
                </div>
              </div>

              <Alert className="bg-blue-900/20 border-blue-500/30">
                <AlertTriangle className="h-4 w-4 text-blue-400" />
                <AlertDescription className="text-blue-300">
                  <strong>Demo Mode:</strong> The app works without API keys using educational mock data. 
                  Real NASA APIs provide authentic satellite data for enhanced learning.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api-keys" className="space-y-6">
          <Card className="bg-black/80 backdrop-blur-xl border border-blue-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Key className="w-5 h-5 text-yellow-400" />
                API Key Testing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white">NASA API Key</Label>
                <div className="flex gap-2">
                  <Input
                    type="password"
                    placeholder="Enter your NASA API key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="bg-black/50 border-blue-500/30 text-white"
                  />
                  <Button 
                    onClick={testAPIKey}
                    disabled={testStatus === 'testing'}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {testStatus === 'testing' ? 'Testing...' : 'Test'}
                  </Button>
                </div>
              </div>

              {testMessage && (
                <Alert className={`${
                  testStatus === 'success' ? 'bg-green-900/20 border-green-500/30' : 
                  testStatus === 'error' ? 'bg-red-900/20 border-red-500/30' : 
                  'bg-blue-900/20 border-blue-500/30'
                }`}>
                  <AlertDescription className={`${
                    testStatus === 'success' ? 'text-green-300' : 
                    testStatus === 'error' ? 'text-red-300' : 
                    'text-blue-300'
                  }`}>
                    {testMessage}
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-4 pt-4">
                <h3 className="text-white font-semibold">Available API Endpoints</h3>
                <div className="grid gap-2">
                  {[
                    { name: 'NASA Open Data Portal', url: 'https://api.nasa.gov/', desc: 'General NASA APIs (free)' },
                    { name: 'NASA Earthdata', url: 'https://earthdata.nasa.gov/', desc: 'Advanced satellite data (requires login)' },
                    { name: 'NASA POWER', url: 'https://power.larc.nasa.gov/', desc: 'Agricultural weather data (free)' },
                    { name: 'USGS EarthExplorer', url: 'https://earthexplorer.usgs.gov/', desc: 'Landsat imagery (free)' }
                  ].map((api) => (
                    <div key={api.name} className="flex items-center justify-between bg-gray-900/30 rounded p-3">
                      <div>
                        <div className="text-white font-medium">{api.name}</div>
                        <div className="text-gray-400 text-sm">{api.desc}</div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => window.open(api.url, '_blank')}
                        className="text-blue-400 hover:bg-blue-500/10"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="datasets" className="space-y-6">
          <Card className="bg-black/80 backdrop-blur-xl border border-blue-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Database className="w-5 h-5 text-green-400" />
                NASA Agricultural Datasets
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                {[
                  {
                    name: 'SMAP Soil Moisture',
                    id: 'SPL3SMP_E.003',
                    description: 'Real-time soil moisture at 9km resolution',
                    application: 'Irrigation timing and drought monitoring',
                    color: 'blue'
                  },
                  {
                    name: 'MODIS Vegetation Indices',
                    id: 'MOD13Q1.061',
                    description: 'NDVI and EVI for crop health monitoring',
                    application: 'Crop stress detection and yield prediction',
                    color: 'green'
                  },
                  {
                    name: 'GPM Precipitation',
                    id: 'GPM_3IMERGHH.06',
                    description: 'Half-hourly global precipitation data',
                    application: 'Weather monitoring and irrigation planning',
                    color: 'cyan'
                  },
                  {
                    name: 'ECOSTRESS Temperature',
                    id: 'ECO2LSTE.001',
                    description: 'Land surface temperature at 70m resolution',
                    application: 'Heat stress detection and field management',
                    color: 'orange'
                  },
                  {
                    name: 'Landsat Imagery',
                    id: 'LANDSAT_LC08_C02_T1_L2',
                    description: 'High-resolution multispectral imagery',
                    application: 'Detailed field analysis and crop mapping',
                    color: 'purple'
                  }
                ].map((dataset) => (
                  <div key={dataset.id} className="bg-gray-900/30 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-white font-semibold">{dataset.name}</h3>
                        <Badge className={`bg-${dataset.color}-600/20 text-${dataset.color}-300 mt-1`}>
                          {dataset.id}
                        </Badge>
                      </div>
                      <Satellite className={`w-5 h-5 text-${dataset.color}-400`} />
                    </div>
                    <p className="text-gray-300 text-sm mb-2">{dataset.description}</p>
                    <p className="text-gray-400 text-xs">
                      <strong>Agricultural Use:</strong> {dataset.application}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card className="bg-black/80 backdrop-blur-xl border border-blue-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Globe className="w-5 h-5 text-purple-400" />
                Advanced Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-white font-semibold mb-2">Environment Variables</h3>
                  <div className="bg-gray-900/50 rounded p-4 font-mono text-sm">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-green-400">NASA_API_KEY=</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => copyToClipboard('NASA_API_KEY=your_key_here')}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-green-400">NASA_EARTHDATA_USERNAME=</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => copyToClipboard('NASA_EARTHDATA_USERNAME=your_username')}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-green-400">NEXT_PUBLIC_ENABLE_REAL_NASA_DATA=true</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => copyToClipboard('NEXT_PUBLIC_ENABLE_REAL_NASA_DATA=true')}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-2">NASA Earthdata Setup</h3>
                  <p className="text-gray-300 text-sm mb-3">
                    For advanced datasets like SMAP and MODIS, you'll need a NASA Earthdata account:
                  </p>
                  <ol className="list-decimal list-inside space-y-1 text-gray-300 text-sm">
                    <li>Register at <a href="https://urs.earthdata.nasa.gov/" className="text-blue-400 hover:underline">NASA Earthdata</a></li>
                    <li>Add your username/password to .env.local</li>
                    <li>Access advanced satellite datasets</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-2">Development Commands</h3>
                  <div className="space-y-2">
                    <div className="bg-gray-900/50 rounded p-2 font-mono text-sm flex justify-between items-center">
                      <span className="text-cyan-400">npm run dev</span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => copyToClipboard('npm run dev')}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="bg-gray-900/50 rounded p-2 font-mono text-sm flex justify-between items-center">
                      <span className="text-cyan-400">npm run build</span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => copyToClipboard('npm run build')}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}