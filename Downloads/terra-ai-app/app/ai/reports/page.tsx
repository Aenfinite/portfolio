import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Droplets, Leaf, Download, Calendar } from "lucide-react"
import Link from "next/link"

export default function ReportsPage() {
  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Link href="/ai" className="text-muted-foreground hover:text-foreground">
              AI Dashboard
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="font-semibold">Reports</span>
          </div>
          <h1 className="text-4xl font-bold">AI Analytics & Reports</h1>
          <p className="text-lg text-muted-foreground">
            Comprehensive insights from NASA satellite data and AI predictions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 Days
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="yield">Yield Analysis</TabsTrigger>
          <TabsTrigger value="water">Water Management</TabsTrigger>
          <TabsTrigger value="health">Crop Health</TabsTrigger>
          <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Performance Summary */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Overall Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-chart-1">92/100</div>
                <p className="text-xs text-muted-foreground mt-1">Excellent farm management</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Yield Optimization</span>
                    <span className="font-medium">95%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Water Efficiency</span>
                    <span className="font-medium">88%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Sustainability</span>
                    <span className="font-medium">93%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">AI Prediction Accuracy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-chart-2">94.2%</div>
                <p className="text-xs text-muted-foreground mt-1">Based on 847 predictions</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Yield Predictions</span>
                    <span className="font-medium">96%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Weather Forecasts</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Disease Detection</span>
                    <span className="font-medium">95%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Resource Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-chart-3">$18.4K</div>
                <p className="text-xs text-muted-foreground mt-1">Saved this month</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Water Costs</span>
                    <span className="font-medium text-chart-3">-$7.2K</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Fertilizer</span>
                    <span className="font-medium text-chart-3">-$6.8K</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Pest Control</span>
                    <span className="font-medium text-chart-3">-$4.4K</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Key Performance Indicators</CardTitle>
              <CardDescription>NASA data-driven insights over the past 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-chart-1" />
                      <span className="text-sm font-medium">Yield Projection</span>
                    </div>
                    <span className="text-sm font-bold text-chart-1">+12.5% vs baseline</span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-chart-1" style={{ width: "87%" }} />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    AI models predict 87% of maximum potential yield based on current conditions
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Droplets className="h-4 w-4 text-chart-2" />
                      <span className="text-sm font-medium">Water Use Efficiency</span>
                    </div>
                    <span className="text-sm font-bold text-chart-2">1.8 kg/m³</span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-chart-2" style={{ width: "92%" }} />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    SMAP-guided irrigation achieving 92% efficiency, saving 24,000 gallons/month
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Leaf className="h-4 w-4 text-chart-3" />
                      <span className="text-sm font-medium">Vegetation Health Index</span>
                    </div>
                    <span className="text-sm font-bold text-chart-3">0.82 NDVI</span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-chart-3" style={{ width: "82%" }} />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    MODIS data shows excellent vegetation health across all monitored fields
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* NASA Data Quality */}
          <Card>
            <CardHeader>
              <CardTitle>NASA Data Integration Status</CardTitle>
              <CardDescription>Real-time satellite data quality and coverage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <span className="text-sm font-medium">SMAP Soil Moisture</span>
                    <span className="text-xs text-chart-1">99.8% uptime</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <span className="text-sm font-medium">MODIS Vegetation</span>
                    <span className="text-xs text-chart-1">99.2% uptime</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <span className="text-sm font-medium">GPM Precipitation</span>
                    <span className="text-xs text-chart-1">98.9% uptime</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <span className="text-sm font-medium">Landsat-9 Imagery</span>
                    <span className="text-xs text-chart-1">97.5% uptime</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <span className="text-sm font-medium">ECOSTRESS ET</span>
                    <span className="text-xs text-chart-1">96.8% uptime</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <span className="text-sm font-medium">AIRS Temperature</span>
                    <span className="text-xs text-chart-1">99.5% uptime</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="yield" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Yield Analysis</CardTitle>
              <CardDescription>AI-powered yield predictions and historical performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                Yield analysis charts and detailed breakdowns would appear here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="water" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Water Management</CardTitle>
              <CardDescription>SMAP-guided irrigation optimization and water usage analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                Water management analytics and SMAP data visualizations would appear here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Crop Health Monitoring</CardTitle>
              <CardDescription>MODIS vegetation indices and disease detection analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                Crop health metrics and NDVI/EVI visualizations would appear here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sustainability" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sustainability Metrics</CardTitle>
              <CardDescription>Carbon footprint, resource efficiency, and environmental impact</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                Sustainability scores and environmental impact analytics would appear here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
