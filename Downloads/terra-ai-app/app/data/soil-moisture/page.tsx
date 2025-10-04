import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Droplets, ArrowLeft, TrendingUp, AlertCircle, Info } from "lucide-react"

export default function SoilMoisturePage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container py-12">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/data">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Data Hub
          </Link>
        </Button>

        {/* Header */}
        <div className="flex items-start gap-6 mb-12">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-chart-1/10 border border-chart-1/20">
            <Droplets className="h-8 w-8 text-chart-1" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-4xl font-bold">Soil Moisture</h1>
              <Badge variant="outline" className="bg-chart-1/10 text-chart-1 border-chart-1/20">
                Live
              </Badge>
            </div>
            <p className="text-lg text-muted-foreground text-balance">
              Real-time soil moisture data from NASA SMAP and Sentinel-1 satellites for precision irrigation planning
              and water management.
            </p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Update Frequency</CardDescription>
              <CardTitle className="text-2xl">3-6 hours</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Spatial Resolution</CardDescription>
              <CardTitle className="text-2xl">9-36 km</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Data Source</CardDescription>
              <CardTitle className="text-2xl">SMAP</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Coverage</CardDescription>
              <CardTitle className="text-2xl">Global</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Data Visualization Placeholder */}
        <Card className="mb-12 border-chart-1/20">
          <CardHeader>
            <CardTitle>Current Soil Moisture Levels</CardTitle>
            <CardDescription>Real-time data visualization from NASA SMAP satellite</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video rounded-lg bg-gradient-to-br from-chart-1/20 to-chart-1/5 border border-chart-1/20 flex items-center justify-center">
              <div className="text-center">
                <Droplets className="h-16 w-16 text-chart-1 mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">Interactive soil moisture map</p>
                <p className="text-sm text-muted-foreground">Visualization powered by NASA SMAP data</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Information Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-5 w-5 text-primary" />
                <CardTitle>What is Soil Moisture?</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Soil moisture measures the water content in the soil, critical for irrigation decisions and crop health
                monitoring.
              </p>
              <div className="space-y-2">
                <h4 className="font-semibold">Key Measurements:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Surface layer moisture (0-5cm depth)</li>
                  <li>Root zone moisture (0-100cm depth)</li>
                  <li>Saturation levels and trends</li>
                  <li>Temporal changes and patterns</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-chart-2" />
                <CardTitle>Agricultural Applications</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Use soil moisture data to optimize water usage and improve crop yields.
              </p>
              <div className="space-y-2">
                <h4 className="font-semibold">Use Cases:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Precision irrigation scheduling</li>
                  <li>Drought monitoring and prediction</li>
                  <li>Flood risk assessment</li>
                  <li>Crop stress early warning</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alert Section */}
        <Card className="bg-accent/5 border-accent/20 mb-12">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-accent" />
              <CardTitle>Data Interpretation Tips</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Optimal soil moisture varies by crop type and growth stage</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Compare current levels with historical averages for your region</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Consider soil type when interpreting moisture readings</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Use trend data to predict irrigation needs 3-5 days ahead</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="bg-gradient-to-br from-primary/10 to-chart-1/10 border-primary/20">
          <CardHeader>
            <CardTitle>Apply This Data to Your Farm</CardTitle>
            <CardDescription>
              See how soil moisture data integrates with your farm operations in real-time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/farm/weather">View Farm Weather Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
