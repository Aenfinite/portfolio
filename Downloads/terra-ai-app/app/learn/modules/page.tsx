import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Satellite, Droplets, Leaf, Cloud, Thermometer, CheckCircle2, Lock, Play } from "lucide-react"
import Link from "next/link"

const modules = [
  {
    id: 1,
    title: "Introduction to SMAP Soil Moisture",
    description: "Learn to interpret NASA SMAP satellite data for irrigation planning",
    icon: Droplets,
    duration: "45 min",
    xp: 50,
    difficulty: "Beginner",
    status: "completed",
    topics: ["SMAP basics", "Soil moisture levels", "Irrigation timing", "Data interpretation"],
  },
  {
    id: 2,
    title: "MODIS Vegetation Health Indices",
    description: "Master NDVI, EVI, and other vegetation health indicators",
    icon: Leaf,
    duration: "60 min",
    xp: 75,
    difficulty: "Beginner",
    status: "completed",
    topics: ["NDVI explained", "EVI vs NDVI", "Crop stress detection", "Seasonal patterns"],
  },
  {
    id: 3,
    title: "GPM Precipitation Forecasting",
    description: "Use Global Precipitation Measurement data for planning",
    icon: Cloud,
    duration: "50 min",
    xp: 50,
    difficulty: "Beginner",
    status: "completed",
    topics: ["GPM IMERG data", "Rainfall prediction", "Flood risk", "Drought monitoring"],
  },
  {
    id: 4,
    title: "Multi-Data Correlation Analysis",
    description: "Combine multiple NASA datasets for better decisions",
    icon: Satellite,
    duration: "90 min",
    xp: 100,
    difficulty: "Intermediate",
    status: "in-progress",
    progress: 65,
    topics: ["Data integration", "Correlation patterns", "Decision frameworks", "Case studies"],
  },
  {
    id: 5,
    title: "ECOSTRESS Evapotranspiration",
    description: "Optimize water usage with ET measurements",
    icon: Thermometer,
    duration: "70 min",
    xp: 75,
    difficulty: "Intermediate",
    status: "available",
    topics: ["ET fundamentals", "Water requirements", "Crop coefficients", "Efficiency metrics"],
  },
  {
    id: 6,
    title: "Landsat Crop Type Classification",
    description: "Identify and monitor crop types using multispectral imagery",
    icon: Satellite,
    duration: "80 min",
    xp: 100,
    difficulty: "Intermediate",
    status: "available",
    topics: ["Spectral signatures", "Classification methods", "Accuracy assessment", "Change detection"],
  },
  {
    id: 7,
    title: "Advanced Yield Prediction Models",
    description: "Build predictive models using historical NASA data",
    icon: Satellite,
    duration: "120 min",
    xp: 150,
    difficulty: "Advanced",
    status: "locked",
    topics: ["Machine learning", "Time series analysis", "Model validation", "Uncertainty quantification"],
  },
  {
    id: 8,
    title: "Climate Change Adaptation",
    description: "Long-term planning with NASA climate projections",
    icon: Cloud,
    duration: "100 min",
    xp: 150,
    difficulty: "Advanced",
    status: "locked",
    topics: ["Climate models", "Adaptation strategies", "Risk assessment", "Resilience planning"],
  },
]

export default function ModulesPage() {
  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Link href="/learn" className="text-muted-foreground hover:text-foreground">
            Education Hub
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="font-semibold">Learning Modules</span>
        </div>
        <h1 className="text-4xl font-bold">NASA Dataset Lessons</h1>
        <p className="text-lg text-muted-foreground">
          Interactive courses on satellite data interpretation and application
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
          <CardDescription>Track your learning journey across all modules</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-chart-1">3</div>
              <div className="text-sm text-muted-foreground">Modules Completed</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-chart-2">1</div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-chart-3">175 XP</div>
              <div className="text-sm text-muted-foreground">Earned from Modules</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modules Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">All Modules</h2>
          <div className="flex items-center gap-2">
            <Badge variant="outline">8 Total</Badge>
            <Badge variant="outline" className="border-chart-1/50 text-chart-1">
              3 Completed
            </Badge>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {modules.map((module) => {
            const Icon = module.icon
            return (
              <Card
                key={module.id}
                className={
                  module.status === "in-progress" ? "border-primary/50" : module.status === "locked" ? "opacity-60" : ""
                }
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${
                        module.status === "completed"
                          ? "bg-chart-1/20"
                          : module.status === "in-progress"
                            ? "bg-primary/20"
                            : module.status === "locked"
                              ? "bg-muted"
                              : "bg-chart-2/20"
                      }`}
                    >
                      {module.status === "completed" ? (
                        <CheckCircle2 className="h-6 w-6 text-chart-1" />
                      ) : module.status === "locked" ? (
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <Icon
                          className={`h-6 w-6 ${module.status === "in-progress" ? "text-primary" : "text-chart-2"}`}
                        />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg leading-tight">{module.title}</CardTitle>
                        <Badge
                          variant="secondary"
                          className={
                            module.difficulty === "Beginner"
                              ? "bg-chart-3/20 text-chart-3"
                              : module.difficulty === "Intermediate"
                                ? "bg-chart-2/20 text-chart-2"
                                : "bg-chart-5/20 text-chart-5"
                          }
                        >
                          {module.difficulty}
                        </Badge>
                      </div>
                      <CardDescription>{module.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{module.duration}</span>
                    <span>•</span>
                    <span>{module.xp} XP</span>
                    {module.status === "completed" && (
                      <>
                        <span>•</span>
                        <span className="text-chart-1">Completed</span>
                      </>
                    )}
                  </div>

                  {module.status === "in-progress" && module.progress && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{module.progress}%</span>
                      </div>
                      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${module.progress}%` }} />
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5">
                    {module.topics.map((topic) => (
                      <Badge key={topic} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>

                  <Button
                    className="w-full"
                    variant={module.status === "in-progress" ? "default" : "outline"}
                    disabled={module.status === "locked"}
                  >
                    {module.status === "completed" ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Review Module
                      </>
                    ) : module.status === "in-progress" ? (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Continue Learning
                      </>
                    ) : module.status === "locked" ? (
                      <>
                        <Lock className="h-4 w-4 mr-2" />
                        Unlock at Level 3
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Start Module
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Learning Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Tips</CardTitle>
          <CardDescription>Get the most out of your NASA data education</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                Study Recommendations
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Complete modules in order for best understanding</li>
                <li>• Take notes on key NASA data interpretation techniques</li>
                <li>• Practice with real farm scenarios after each module</li>
                <li>• Review completed modules to reinforce learning</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <Satellite className="h-4 w-4 text-primary" />
                Apply Your Knowledge
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Use AI Dashboard to see concepts in action</li>
                <li>• Complete assessments to validate understanding</li>
                <li>• Join multiplayer challenges to learn from others</li>
                <li>• Share insights with the community</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
