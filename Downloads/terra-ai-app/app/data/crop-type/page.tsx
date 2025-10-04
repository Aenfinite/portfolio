import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Sprout, ArrowLeft, Info, TrendingUp, AlertCircle } from "lucide-react"

export default function CropTypePage() {
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
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-chart-4/10 border border-chart-4/20">
            <Sprout className="h-8 w-8 text-chart-4" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-4xl font-bold">Crop Type Classification</h1>
              <Badge variant="outline" className="bg-chart-4/10 text-chart-4 border-chart-4/20">
                Seasonal
              </Badge>
            </div>
            <p className="text-lg text-muted-foreground text-balance">
              AI-powered crop type identification using Landsat-8/9 multi-spectral imagery for farm setup validation and
              regional agricultural monitoring.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Update Frequency</CardDescription>
              <CardTitle className="text-2xl">Seasonal</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Spatial Resolution</CardDescription>
              <CardTitle className="text-2xl">30m</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Data Source</CardDescription>
              <CardTitle className="text-2xl">Landsat 8/9</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Accuracy</CardDescription>
              <CardTitle className="text-2xl">85-95%</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Card className="mb-12 border-chart-4/20">
          <CardHeader>
            <CardTitle>Crop Type Map</CardTitle>
            <CardDescription>AI-classified crop types from Landsat satellite imagery</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video rounded-lg bg-gradient-to-br from-chart-4/20 to-chart-4/5 border border-chart-4/20 flex items-center justify-center">
              <div className="text-center">
                <Sprout className="h-16 w-16 text-chart-4 mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">Interactive crop classification map</p>
                <p className="text-sm text-muted-foreground">Machine learning-powered identification</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-5 w-5 text-primary" />
                <CardTitle>Classification Technology</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Advanced machine learning algorithms analyze multi-spectral signatures to identify crop types with high
                accuracy.
              </p>
              <div className="space-y-2">
                <h4 className="font-semibold">Detectable Crops:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Staple crops: Wheat, Corn, Rice, Soybeans</li>
                  <li>Specialty: Almonds, Grapes, Coffee</li>
                  <li>Regional: Cassava, Millet, Quinoa</li>
                  <li>Cover crops and fallow land</li>
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
                Crop type data enables regional planning and farm management optimization.
              </p>
              <div className="space-y-2">
                <h4 className="font-semibold">Use Cases:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Farm setup validation</li>
                  <li>Regional crop diversity analysis</li>
                  <li>Crop rotation planning</li>
                  <li>Market supply forecasting</li>
                  <li>Insurance verification</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-accent/5 border-accent/20 mb-12">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-accent" />
              <CardTitle>Classification Insights</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Classification accuracy improves with multiple observations throughout growing season</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Different crops have unique spectral signatures at various growth stages</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Combine with ground truth data for validation and accuracy improvement</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Use historical data to track crop rotation patterns and trends</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/10 to-chart-4/10 border-primary/20">
          <CardHeader>
            <CardTitle>Validate Your Farm Setup</CardTitle>
            <CardDescription>Use crop type data to optimize your farm configuration and planning</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/farm">Go to Farm Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
