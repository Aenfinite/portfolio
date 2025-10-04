import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ExternalLink, ArrowLeft, Globe, BarChart3, Download, Satellite } from "lucide-react"

const tools = [
  {
    name: "Worldview",
    description:
      "Interactive interface for browsing full-resolution NASA satellite imagery. View near real-time data from multiple Earth-observing satellites.",
    url: "https://worldview.earthdata.nasa.gov",
    icon: Globe,
    features: ["Real-time imagery", "Multiple satellite sources", "Time-series animation", "Custom data layers"],
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
  },
  {
    name: "Giovanni",
    description:
      "Online environment for display and analysis of geophysical parameters. Perform complex climate and environmental data analysis without downloading data.",
    url: "https://giovanni.gsfc.nasa.gov",
    icon: BarChart3,
    features: ["Time-series analysis", "Area averaging", "Correlation plots", "Data comparison"],
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
    borderColor: "border-chart-2/20",
  },
  {
    name: "AppEEARS",
    description:
      "Application for Extracting and Exploring Analysis Ready Samples. Extract, transform, and visualize NASA Earth observation data for custom areas and time periods.",
    url: "https://appeears.earthdatacloud.nasa.gov",
    icon: Download,
    features: ["Custom area extraction", "Point and area samples", "Multiple data products", "Batch processing"],
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-accent/20",
  },
  {
    name: "NASA Harvest",
    description:
      "Applied sciences program focused on agriculture and food security. Access crop yield predictions, agricultural monitoring, and global food system insights.",
    url: "https://nasaharvest.org",
    icon: Satellite,
    features: ["Crop yield forecasts", "Agricultural monitoring", "Food security analysis", "Global coverage"],
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
    borderColor: "border-chart-4/20",
  },
]

export default function ToolsPage() {
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

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">NASA Data Portals & Tools</h1>
          <p className="text-lg text-muted-foreground max-w-3xl text-balance">
            Access powerful NASA tools for satellite data visualization, analysis, and extraction. These platforms
            provide direct access to Earth observation data for agricultural applications.
          </p>
        </div>

        <div className="grid gap-8 mb-12">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <Card key={tool.name} className={`${tool.borderColor}`}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${tool.bgColor} shrink-0`}>
                        <Icon className={`h-7 w-7 ${tool.color}`} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl mb-2">{tool.name}</CardTitle>
                        <CardDescription className="text-base leading-relaxed">{tool.description}</CardDescription>
                      </div>
                    </div>
                    <Button variant="outline" size="icon" asChild className="shrink-0 bg-transparent">
                      <a href={tool.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Key Features:</h4>
                    <div className="grid md:grid-cols-2 gap-2">
                      {tool.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className={`h-1.5 w-1.5 rounded-full ${tool.bgColor}`} />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <CardHeader>
            <CardTitle>Integrated Data Access</CardTitle>
            <CardDescription>
              Terra AI automatically integrates data from these NASA portals into your farm dashboard for seamless
              decision-making.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild>
                <Link href="/farm">View Farm Dashboard</Link>
              </Button>
              <Button variant="outline" asChild className="bg-transparent">
                <Link href="/data">Explore All Datasets</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
