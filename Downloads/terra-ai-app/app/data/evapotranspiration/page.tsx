import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Wind, ArrowLeft, Info, TrendingUp, AlertCircle } from "lucide-react"

export default function EvapotranspirationPage() {
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
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-accent/10 border border-accent/20">
            <Wind className="h-8 w-8 text-accent" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-4xl font-bold">Evapotranspiration</h1>
              <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                Live
              </Badge>
            </div>
            <p className="text-lg text-muted-foreground text-balance">
              Precise evapotranspiration measurements from NASA ECOSTRESS for accurate crop water requirement
              calculations and irrigation optimization.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Update Frequency</CardDescription>
              <CardTitle className="text-2xl">3-5 days</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Spatial Resolution</CardDescription>
              <CardTitle className="text-2xl">70m</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Data Source</CardDescription>
              <CardTitle className="text-2xl">ECOSTRESS</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Coverage</CardDescription>
              <CardTitle className="text-2xl">Global</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Card className="mb-12 border-accent/20">
          <CardHeader>
            <CardTitle>Evapotranspiration Rates</CardTitle>
            <CardDescription>High-resolution ET data from NASA ECOSTRESS mission</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video rounded-lg bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center">
              <div className="text-center">
                <Wind className="h-16 w-16 text-accent mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">Interactive ET map</p>
                <p className="text-sm text-muted-foreground">Water loss through evaporation and transpiration</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-5 w-5 text-primary" />
                <CardTitle>Understanding ET</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Evapotranspiration (ET) is the sum of water evaporation from soil and transpiration from plants,
                representing total water loss from agricultural systems.
              </p>
              <div className="space-y-2">
                <h4 className="font-semibold">Key Metrics:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Actual ET (ETa) - Real water loss</li>
                  <li>Potential ET (ETp) - Maximum possible loss</li>
                  <li>Crop coefficient (Kc) - Crop-specific factor</li>
                  <li>Water stress index - ETa/ETp ratio</li>
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
                ET data enables precision irrigation by quantifying exact crop water requirements.
              </p>
              <div className="space-y-2">
                <h4 className="font-semibold">Use Cases:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Irrigation scheduling precision</li>
                  <li>Water budget calculations</li>
                  <li>Drought stress detection</li>
                  <li>Crop water use efficiency</li>
                  <li>Yield prediction modeling</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-accent/5 border-accent/20 mb-12">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-accent" />
              <CardTitle>Irrigation Optimization Tips</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Calculate irrigation needs: Irrigation = ETa - Effective Rainfall</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Monitor ETa/ETp ratio to detect water stress before visible symptoms</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Combine with soil moisture data for complete water balance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Adjust irrigation timing based on daily ET patterns</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <CardHeader>
            <CardTitle>Optimize Water Usage</CardTitle>
            <CardDescription>Apply ET data to reduce water waste and improve crop yields</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/farm/sustainability">View Sustainability Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
