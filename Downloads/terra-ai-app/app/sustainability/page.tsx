import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import {
  Leaf,
  Droplets,
  Wind,
  Recycle,
  TrendingDown,
  TrendingUp,
  Award,
  Target,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react"

const sustainabilityMetrics = [
  {
    title: "Water Efficiency",
    value: "87%",
    target: "90%",
    progress: 87,
    change: "+5%",
    trend: "up",
    icon: Droplets,
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
    status: "On Track",
  },
  {
    title: "Carbon Footprint",
    value: "2.4 tCO₂",
    target: "2.0 tCO₂",
    progress: 80,
    change: "-12%",
    trend: "down",
    icon: Wind,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
    status: "Excellent",
  },
  {
    title: "Soil Health",
    value: "92%",
    target: "95%",
    progress: 92,
    change: "+8%",
    trend: "up",
    icon: Leaf,
    color: "text-primary",
    bgColor: "bg-primary/10",
    status: "On Track",
  },
  {
    title: "Waste Reduction",
    value: "78%",
    target: "85%",
    progress: 78,
    change: "+15%",
    trend: "up",
    icon: Recycle,
    color: "text-accent",
    bgColor: "bg-accent/10",
    status: "Improving",
  },
]

const achievements = [
  {
    title: "Water Conservation Champion",
    description: "Reduced water usage by 20% this quarter",
    icon: Droplets,
    earned: true,
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
  {
    title: "Carbon Neutral Farm",
    description: "Achieved net-zero carbon emissions",
    icon: Wind,
    earned: true,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    title: "Soil Regeneration Expert",
    description: "Improved soil organic matter by 15%",
    icon: Leaf,
    earned: true,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Zero Waste Pioneer",
    description: "Achieve 90% waste reduction",
    icon: Recycle,
    earned: false,
    color: "text-muted-foreground",
    bgColor: "bg-muted/30",
  },
]

const practices = [
  {
    practice: "Precision Irrigation",
    impact: "High",
    status: "Active",
    savings: "15,000 L/week",
    co2Reduction: "0.8 tCO₂/year",
  },
  {
    practice: "Cover Cropping",
    impact: "High",
    status: "Active",
    savings: "N/A",
    co2Reduction: "1.2 tCO₂/year",
  },
  {
    practice: "Composting",
    impact: "Medium",
    status: "Active",
    savings: "N/A",
    co2Reduction: "0.5 tCO₂/year",
  },
  {
    practice: "Solar Power",
    impact: "High",
    status: "Planned",
    savings: "N/A",
    co2Reduction: "2.1 tCO₂/year",
  },
]

const recommendations = [
  {
    title: "Implement Drip Irrigation in Field B",
    impact: "High",
    savings: "$2,400/year",
    effort: "Medium",
    co2: "-0.6 tCO₂",
  },
  {
    title: "Expand Cover Crop Rotation",
    impact: "High",
    savings: "$1,800/year",
    effort: "Low",
    co2: "-0.9 tCO₂",
  },
  {
    title: "Install Rainwater Harvesting",
    impact: "Medium",
    savings: "$1,200/year",
    effort: "High",
    co2: "-0.3 tCO₂",
  },
]

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-chart-2/10 border border-chart-2/20">
                <Leaf className="h-6 w-6 text-chart-2" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Sustainability Dashboard</h1>
                <p className="text-muted-foreground">Track environmental impact and sustainable practices</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-chart-2/10 text-chart-2 border-chart-2/20">
              <Award className="h-3 w-3 mr-1" />
              Level 3 Certified
            </Badge>
          </div>
        </div>

        {/* Sustainability Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {sustainabilityMetrics.map((metric) => {
            const Icon = metric.icon
            const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown
            return (
              <Card key={metric.title} className="border-border/50">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${metric.bgColor}`}>
                      <Icon className={`h-5 w-5 ${metric.color}`} />
                    </div>
                    <Badge variant="outline">{metric.status}</Badge>
                  </div>
                  <CardDescription>{metric.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-baseline justify-between">
                      <CardTitle className="text-3xl">{metric.value}</CardTitle>
                      <span className="text-sm text-muted-foreground">/ {metric.target}</span>
                    </div>
                    <Progress value={metric.progress} className="h-2" />
                    <div className="flex items-center gap-1 text-sm">
                      <TrendIcon className={`h-3 w-3 ${metric.trend === "up" ? "text-chart-2" : "text-chart-5"}`} />
                      <span className={metric.trend === "up" ? "text-chart-2" : "text-chart-5"}>{metric.change}</span>
                      <span className="text-muted-foreground ml-1">vs last quarter</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Achievements */}
        <Card className="mb-12 border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Sustainability Achievements</CardTitle>
                <CardDescription>Milestones and certifications earned</CardDescription>
              </div>
              <Button asChild variant="outline" className="bg-transparent">
                <Link href="/challenges">
                  View All Challenges
                  <ArrowUpRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {achievements.map((achievement) => {
                const Icon = achievement.icon
                return (
                  <div
                    key={achievement.title}
                    className={`p-4 rounded-lg border ${
                      achievement.earned
                        ? `${achievement.bgColor} border-${achievement.color.replace("text-", "")}/20`
                        : "bg-muted/20 border-muted"
                    } ${achievement.earned ? "" : "opacity-60"}`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${achievement.bgColor}`}>
                        <Icon className={`h-6 w-6 ${achievement.color}`} />
                      </div>
                      {achievement.earned && <CheckCircle2 className="h-5 w-5 text-chart-2 ml-auto" />}
                    </div>
                    <h4 className="font-semibold mb-1 text-sm">{achievement.title}</h4>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Current Practices and Recommendations */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {/* Current Practices */}
          <Card>
            <CardHeader>
              <CardTitle>Active Sustainable Practices</CardTitle>
              <CardDescription>Current initiatives and their environmental impact</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {practices.map((practice) => (
                  <div
                    key={practice.practice}
                    className={`p-4 rounded-lg border ${
                      practice.status === "Active" ? "bg-chart-2/5 border-chart-2/20" : "bg-muted/30 border-muted"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-sm mb-1">{practice.practice}</h4>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={
                              practice.status === "Active"
                                ? "bg-chart-2/10 text-chart-2 border-chart-2/20 text-xs"
                                : "text-xs"
                            }
                          >
                            {practice.status}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {practice.impact} Impact
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs mt-3">
                      <div>
                        <p className="text-muted-foreground">Water Savings</p>
                        <p className="font-medium">{practice.savings}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">CO₂ Reduction</p>
                        <p className="font-medium">{practice.co2Reduction}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>AI-Powered Recommendations</CardTitle>
              <CardDescription>Suggested improvements for maximum impact</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recommendations.map((rec, index) => (
                  <div key={index} className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-sm flex-1">{rec.title}</h4>
                      <Target className="h-4 w-4 text-primary shrink-0 ml-2" />
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <p className="text-muted-foreground mb-1">Impact</p>
                        <Badge variant="outline" className="text-xs">
                          {rec.impact}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Effort</p>
                        <Badge variant="outline" className="text-xs">
                          {rec.effort}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">CO₂</p>
                        <p className="font-medium text-chart-2">{rec.co2}</p>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="text-xs text-muted-foreground">Annual Savings: {rec.savings}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Environmental Impact Summary */}
        <Card className="bg-gradient-to-br from-chart-2/10 to-primary/10 border-chart-2/20">
          <CardHeader>
            <CardTitle>Your Environmental Impact</CardTitle>
            <CardDescription>Cumulative positive impact this year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <Droplets className="h-8 w-8 text-chart-1 mx-auto mb-2" />
                <p className="text-3xl font-bold">780,000 L</p>
                <p className="text-sm text-muted-foreground">Water Saved</p>
              </div>
              <div className="text-center">
                <Wind className="h-8 w-8 text-chart-2 mx-auto mb-2" />
                <p className="text-3xl font-bold">4.8 tCO₂</p>
                <p className="text-sm text-muted-foreground">Carbon Reduced</p>
              </div>
              <div className="text-center">
                <Leaf className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-3xl font-bold">18%</p>
                <p className="text-sm text-muted-foreground">Soil Health Improved</p>
              </div>
              <div className="text-center">
                <Recycle className="h-8 w-8 text-accent mx-auto mb-2" />
                <p className="text-3xl font-bold">2.4 tons</p>
                <p className="text-sm text-muted-foreground">Waste Diverted</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
