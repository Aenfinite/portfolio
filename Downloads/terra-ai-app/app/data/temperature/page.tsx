import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Thermometer, ArrowLeft, Info, TrendingUp, AlertCircle } from "lucide-react"

export default function TemperaturePage() {
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

        <div className="flex items-start gap-6 mb-12">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-chart-5/10 border border-chart-5/20">
            <Thermometer className="h-8 w-8 text-chart-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-4xl font-bold">Temperature</h1>
              <Badge variant="outline" className="bg-chart-5/10 text-chart-5 border-chart-5/20">
                Live
              </Badge>
            </div>
            <p className="text-lg text-muted-foreground text-balance">
              High-resolution temperature data from NASA AIRS and Landsat-9 for crop growth stage tracking and thermal
              stress monitoring.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Update Frequency</CardDescription>
              <CardTitle className="text-2xl">Daily</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Spatial Resolution</CardDescription>
              <CardTitle className="text-2xl">30-100m</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Data Source</CardDescription>
              <CardTitle className="text-2xl">AIRS/Landsat</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Accuracy</CardDescription>
              <CardTitle className="text-2xl">±1°C</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Card className="mb-12 border-chart-5/20">
          <CardHeader>
            <CardTitle>Land Surface Temperature</CardTitle>
            <CardDescription>Thermal imagery from NASA satellites</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video rounded-lg bg-gradient-to-br from-chart-5/20 to-chart-5/5 border border-chart-5/20 flex items-center justify-center">
              <div className="text-center">
                <Thermometer className="h-16 w-16 text-chart-5 mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">Interactive temperature map</p>
                <p className="text-sm text-muted-foreground">Surface and air temperature data</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-5 w-5 text-primary" />
                <CardTitle>Temperature Measurements</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                NASA provides both land surface temperature (LST) and air temperature data for comprehensive thermal
                monitoring.
              </p>
              <div className="space-y-2">
                <h4 className="font-semibold">Data Types:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Land Surface Temperature (LST)</li>
                  <li>Air Temperature at 2m height</li>
                  <li>Daily min/max temperatures</li>
                  <li>Growing Degree Days (GDD)</li>
                  <li>Heat stress indices</li>
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
                Temperature data is critical for crop development tracking and stress management.
              </p>
              <div className="space-y-2">
                <h4 className="font-semibold">Use Cases:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Growth stage prediction</li>
                  <li>Frost risk assessment</li>
                  <li>Heat stress monitoring</li>
                  <li>Harvest timing optimization</li>
                  <li>Pest and disease modeling</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-accent/5 border-accent/20 mb-12">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-accent" />
              <CardTitle>Temperature Thresholds</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Most crops have optimal temperature ranges for growth (typically 20-30°C)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Frost events below 0°C can cause severe crop damage</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Heat stress above 35°C reduces photosynthesis and yield</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Track Growing Degree Days (GDD) to predict crop development stages</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/10 to-chart-5/10 border-primary/20">
          <CardHeader>
            <CardTitle>Monitor Crop Conditions</CardTitle>
            <CardDescription>Track temperature trends and receive alerts for extreme weather events</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/farm/weather">View Weather Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
