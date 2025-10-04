import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { CloudRain, ArrowLeft, Info, TrendingUp, AlertCircle } from "lucide-react"

export default function PrecipitationPage() {
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
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
            <CloudRain className="h-8 w-8 text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-4xl font-bold">Precipitation</h1>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                Live
              </Badge>
            </div>
            <p className="text-lg text-muted-foreground text-balance">
              Near real-time precipitation data from NASA GPM IMERG for accurate rainfall monitoring and water
              management planning.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Update Frequency</CardDescription>
              <CardTitle className="text-2xl">30 minutes</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Spatial Resolution</CardDescription>
              <CardTitle className="text-2xl">10 km</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Data Source</CardDescription>
              <CardTitle className="text-2xl">GPM IMERG</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Latency</CardDescription>
              <CardTitle className="text-2xl">4-6 hours</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Card className="mb-12 border-primary/20">
          <CardHeader>
            <CardTitle>Real-Time Precipitation Map</CardTitle>
            <CardDescription>Live rainfall data from NASA Global Precipitation Measurement mission</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center">
              <div className="text-center">
                <CloudRain className="h-16 w-16 text-primary mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">Interactive precipitation map</p>
                <p className="text-sm text-muted-foreground">30-minute update intervals</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-5 w-5 text-primary" />
                <CardTitle>About GPM IMERG</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                The Global Precipitation Measurement Integrated Multi-satellitE Retrievals for GPM (IMERG) provides
                near-global precipitation estimates.
              </p>
              <div className="space-y-2">
                <h4 className="font-semibold">Data Products:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Early Run (4-hour latency)</li>
                  <li>Late Run (14-hour latency)</li>
                  <li>Final Run (3.5-month latency)</li>
                  <li>Accumulated rainfall totals</li>
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
                Precipitation data is essential for irrigation planning and water resource management.
              </p>
              <div className="space-y-2">
                <h4 className="font-semibold">Use Cases:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Irrigation scheduling optimization</li>
                  <li>Flood risk assessment</li>
                  <li>Drought monitoring</li>
                  <li>Crop water balance calculations</li>
                  <li>Planting and harvesting timing</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-accent/5 border-accent/20 mb-12">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-accent" />
              <CardTitle>Best Practices</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Combine with soil moisture data for complete water management picture</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Use 7-day accumulation for irrigation planning decisions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Monitor forecast data to anticipate heavy rainfall events</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Compare with local rain gauge measurements for validation</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/10 to-chart-1/10 border-primary/20">
          <CardHeader>
            <CardTitle>Integrate with Your Farm</CardTitle>
            <CardDescription>See precipitation data alongside soil moisture and weather forecasts</CardDescription>
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
