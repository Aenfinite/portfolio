import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Leaf, ArrowLeft, TrendingUp, AlertCircle, Info } from "lucide-react"

export default function VegetationPage() {
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
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-chart-2/10 border border-chart-2/20">
            <Leaf className="h-8 w-8 text-chart-2" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-4xl font-bold">Vegetation Health</h1>
              <Badge variant="outline" className="bg-chart-2/10 text-chart-2 border-chart-2/20">
                Live
              </Badge>
            </div>
            <p className="text-lg text-muted-foreground text-balance">
              Multi-spectral vegetation indices from MODIS and VIIRS satellites for comprehensive crop health monitoring
              and stress detection.
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
              <CardTitle className="text-2xl">250m-1km</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Data Source</CardDescription>
              <CardTitle className="text-2xl">MODIS/VIIRS</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Indices Available</CardDescription>
              <CardTitle className="text-2xl">4+</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Card className="mb-12 border-chart-2/20">
          <CardHeader>
            <CardTitle>Vegetation Health Indices</CardTitle>
            <CardDescription>Real-time multi-spectral analysis from NASA satellites</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video rounded-lg bg-gradient-to-br from-chart-2/20 to-chart-2/5 border border-chart-2/20 flex items-center justify-center">
              <div className="text-center">
                <Leaf className="h-16 w-16 text-chart-2 mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">Interactive vegetation health map</p>
                <p className="text-sm text-muted-foreground">NDVI, EVI, LSWI, and VCI visualization</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-5 w-5 text-primary" />
                <CardTitle>Vegetation Indices Explained</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold mb-1">NDVI (Normalized Difference Vegetation Index)</h4>
                  <p className="text-sm text-muted-foreground">Overall vegetation health and biomass</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">EVI (Enhanced Vegetation Index)</h4>
                  <p className="text-sm text-muted-foreground">Improved sensitivity in high biomass regions</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">LSWI (Land Surface Water Index)</h4>
                  <p className="text-sm text-muted-foreground">Vegetation water content monitoring</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">VCI (Vegetation Condition Index)</h4>
                  <p className="text-sm text-muted-foreground">Drought stress assessment</p>
                </div>
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
                Vegetation indices provide early warning of crop stress and enable proactive management.
              </p>
              <div className="space-y-2">
                <h4 className="font-semibold">Use Cases:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Early disease and pest detection</li>
                  <li>Nutrient deficiency identification</li>
                  <li>Yield prediction and forecasting</li>
                  <li>Crop growth stage monitoring</li>
                  <li>Irrigation stress assessment</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-accent/5 border-accent/20 mb-12">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-accent" />
              <CardTitle>Interpretation Guidelines</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>NDVI values range from -1 to +1, with healthy vegetation typically above 0.6</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Compare current values with historical baselines for anomaly detection</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Sudden drops in indices may indicate stress requiring immediate attention</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Use multiple indices together for comprehensive health assessment</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/10 to-chart-2/10 border-primary/20">
          <CardHeader>
            <CardTitle>Monitor Your Crops</CardTitle>
            <CardDescription>Track vegetation health across your entire farm with AI-powered insights</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/farm/weather">View Farm Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
