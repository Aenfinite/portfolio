import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Droplets, Leaf, CloudRain, Thermometer } from "lucide-react"

const metrics = [
  {
    title: "Soil Moisture",
    value: "68%",
    change: "+5%",
    trend: "up",
    status: "optimal",
    icon: Droplets,
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
  {
    title: "Vegetation Health",
    value: "0.82",
    change: "+0.08",
    trend: "up",
    status: "healthy",
    icon: Leaf,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    title: "Precipitation",
    value: "12mm",
    change: "-3mm",
    trend: "down",
    status: "normal",
    icon: CloudRain,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Temperature",
    value: "24°C",
    change: "+2°C",
    trend: "up",
    status: "optimal",
    icon: Thermometer,
    color: "text-chart-5",
    bgColor: "bg-chart-5/10",
  },
]

export function FarmMetrics() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => {
        const Icon = metric.icon
        const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown
        return (
          <Card key={metric.title} className="border-border/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${metric.bgColor}`}>
                  <Icon className={`h-5 w-5 ${metric.color}`} />
                </div>
                <Badge variant="outline" className="capitalize">
                  {metric.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-3xl mb-1">{metric.value}</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <TrendIcon className={`h-3 w-3 ${metric.trend === "up" ? "text-chart-2" : "text-chart-5"}`} />
                <span className={metric.trend === "up" ? "text-chart-2" : "text-chart-5"}>{metric.change}</span>
                <span className="text-muted-foreground ml-1">vs last week</span>
              </CardDescription>
              <p className="text-sm text-muted-foreground mt-2">{metric.title}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
