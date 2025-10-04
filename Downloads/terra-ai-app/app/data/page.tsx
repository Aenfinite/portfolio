import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Droplets, Leaf, CloudRain, Thermometer, Wind, Sprout, ExternalLink, Database, Activity } from "lucide-react"

const datasets = [
  {
    id: "soil-moisture",
    title: "Soil Moisture",
    description: "SMAP & Sentinel-1 data for irrigation planning and water management",
    icon: Droplets,
    updateFrequency: "3-6 hours",
    source: "NASA SMAP",
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
    borderColor: "border-chart-1/20",
  },
  {
    id: "vegetation",
    title: "Vegetation Health",
    description: "MODIS & VIIRS indices for crop stress detection and health monitoring",
    icon: Leaf,
    updateFrequency: "Daily",
    source: "NASA MODIS/VIIRS",
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
    borderColor: "border-chart-2/20",
  },
  {
    id: "precipitation",
    title: "Precipitation",
    description: "GPM IMERG real-time rainfall data for water management decisions",
    icon: CloudRain,
    updateFrequency: "30 minutes",
    source: "NASA GPM",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
  },
  {
    id: "temperature",
    title: "Temperature",
    description: "AIRS & Landsat-9 thermal data for growth stage tracking",
    icon: Thermometer,
    updateFrequency: "Daily",
    source: "NASA AIRS/Landsat",
    color: "text-chart-5",
    bgColor: "bg-chart-5/10",
    borderColor: "border-chart-5/20",
  },
  {
    id: "evapotranspiration",
    title: "Evapotranspiration",
    description: "ECOSTRESS data for precise water requirement calculations",
    icon: Wind,
    updateFrequency: "3-5 days",
    source: "NASA ECOSTRESS",
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-accent/20",
  },
  {
    id: "crop-type",
    title: "Crop Type",
    description: "Landsat-8/9 seasonal analysis for farm setup validation",
    icon: Sprout,
    updateFrequency: "Seasonal",
    source: "NASA Landsat",
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
    borderColor: "border-chart-4/20",
  },
]

const tools = [
  {
    name: "Worldview",
    description: "Real-time satellite imagery visualization",
    url: "https://worldview.earthdata.nasa.gov",
  },
  {
    name: "Giovanni",
    description: "Climate and environmental data analysis",
    url: "https://giovanni.gsfc.nasa.gov",
  },
  {
    name: "AppEEARS",
    description: "Custom data extraction and processing",
    url: "https://appeears.earthdatacloud.nasa.gov",
  },
  {
    name: "NASA Harvest",
    description: "Global agriculture monitoring and predictions",
    url: "https://nasaharvest.org",
  },
]

export default function DataHubPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Database className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Live NASA Data Streams</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">NASA Data Hub</h1>
          <p className="text-lg text-muted-foreground max-w-3xl text-balance">
            Access real-time satellite data from multiple NASA missions. All datasets are operational and updated
            continuously for accurate agricultural decision-making.
          </p>
        </div>

        {/* Datasets Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {datasets.map((dataset) => {
            const Icon = dataset.icon
            return (
              <Link key={dataset.id} href={`/data/${dataset.id}`}>
                <Card
                  className={`h-full transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer ${dataset.borderColor}`}
                >
                  <CardHeader>
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${dataset.bgColor} mb-4`}>
                      <Icon className={`h-6 w-6 ${dataset.color}`} />
                    </div>
                    <CardTitle className="flex items-center justify-between">
                      {dataset.title}
                      <Badge variant="outline" className="ml-2">
                        <Activity className="h-3 w-3 mr-1" />
                        Live
                      </Badge>
                    </CardTitle>
                    <CardDescription className="leading-relaxed">{dataset.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Update Frequency:</span>
                        <span className="font-medium">{dataset.updateFrequency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Source:</span>
                        <span className="font-medium">{dataset.source}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* NASA Tools Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">NASA Data Portals & Tools</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {tools.map((tool) => (
              <Card key={tool.name} className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {tool.name}
                    <Button variant="ghost" size="icon" asChild>
                      <a href={tool.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Access */}
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <CardHeader>
            <CardTitle>Ready to Start?</CardTitle>
            <CardDescription>
              Explore individual datasets or jump straight to your farm dashboard to see this data in action.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild>
                <Link href="/farm">Go to Farm Dashboard</Link>
              </Button>
              <Button variant="outline" asChild className="bg-transparent">
                <Link href="/data/tools">Explore All Tools</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
