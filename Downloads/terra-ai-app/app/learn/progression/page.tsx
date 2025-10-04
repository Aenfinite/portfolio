import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Lock, Check } from "lucide-react"
import Link from "next/link"

const levels = [
  {
    level: 1,
    name: "Data Novice",
    description: "Learn basic NASA data interpretation",
    xpRequired: 0,
    xpNext: 500,
    status: "completed",
    achievements: ["First Steps", "Data Explorer", "Quick Learner"],
  },
  {
    level: 2,
    name: "Farm Analyst",
    description: "Master multi-data correlation",
    xpRequired: 500,
    xpNext: 2000,
    status: "current",
    currentXp: 1240,
    achievements: ["Data Correlator", "Irrigation Expert", "Yield Predictor"],
  },
  {
    level: 3,
    name: "Sustainability Expert",
    description: "Optimize ecosystem management",
    xpRequired: 2000,
    xpNext: 5000,
    status: "locked",
    achievements: ["Carbon Reducer", "Water Saver", "Soil Guardian"],
  },
  {
    level: 4,
    name: "Agricultural Strategist",
    description: "Plan regional agricultural systems",
    xpRequired: 5000,
    xpNext: 10000,
    status: "locked",
    achievements: ["Regional Planner", "Market Master", "Climate Adapter"],
  },
  {
    level: 5,
    name: "Master Navigator",
    description: "Impact global food systems",
    xpRequired: 10000,
    xpNext: null,
    status: "locked",
    achievements: ["Global Impact", "Innovation Leader", "Master Educator"],
  },
]

export default function ProgressionPage() {
  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Link href="/learn" className="text-muted-foreground hover:text-foreground">
            Education Hub
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="font-semibold">Progression</span>
        </div>
        <h1 className="text-4xl font-bold">Learning Progression</h1>
        <p className="text-lg text-muted-foreground">Your journey from Novice to Master Navigator</p>
      </div>

      {/* Current Status */}
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Level 2: Farm Analyst</CardTitle>
              <CardDescription className="text-base mt-1">
                Master multi-data correlation and advanced farming techniques
              </CardDescription>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-3xl font-bold text-primary">
              2
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Progress to Level 3</span>
              <span className="text-sm text-muted-foreground">1,240 / 2,000 XP</span>
            </div>
            <div className="h-4 w-full bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: "62%" }} />
            </div>
            <p className="text-xs text-muted-foreground">760 XP needed to unlock Sustainability Expert</p>
          </div>
        </CardContent>
      </Card>

      {/* Level Progression */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">All Levels</h2>
        <div className="space-y-4">
          {levels.map((levelData, index) => (
            <Card
              key={levelData.level}
              className={
                levelData.status === "current" ? "border-primary/50" : levelData.status === "locked" ? "opacity-60" : ""
              }
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-2xl font-bold ${
                        levelData.status === "completed"
                          ? "bg-chart-1/20 text-chart-1"
                          : levelData.status === "current"
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {levelData.status === "completed" ? (
                        <Check className="h-7 w-7" />
                      ) : levelData.status === "locked" ? (
                        <Lock className="h-6 w-6" />
                      ) : (
                        levelData.level
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-xl">{levelData.name}</CardTitle>
                        {levelData.status === "completed" && (
                          <Badge variant="secondary" className="bg-chart-1/20 text-chart-1">
                            Completed
                          </Badge>
                        )}
                        {levelData.status === "current" && (
                          <Badge variant="secondary" className="bg-primary/20 text-primary">
                            Current Level
                          </Badge>
                        )}
                        {levelData.status === "locked" && <Badge variant="secondary">Locked</Badge>}
                      </div>
                      <CardDescription className="text-base">{levelData.description}</CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{levelData.xpRequired.toLocaleString()} XP</div>
                    {levelData.xpNext && (
                      <div className="text-xs text-muted-foreground">Next: {levelData.xpNext.toLocaleString()} XP</div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {levelData.status === "current" && levelData.currentXp && (
                  <div className="mb-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Current Progress</span>
                      <span className="font-medium">
                        {levelData.currentXp} / {levelData.xpNext} XP
                      </span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{
                          width: `${(levelData.currentXp / (levelData.xpNext || 1)) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Trophy className="h-4 w-4 text-chart-3" />
                    <span>Achievements</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {levelData.achievements.map((achievement) => (
                      <Badge
                        key={achievement}
                        variant="outline"
                        className={
                          levelData.status === "completed"
                            ? "border-chart-1/50 text-chart-1"
                            : levelData.status === "current"
                              ? "border-primary/50 text-primary"
                              : ""
                        }
                      >
                        {levelData.status === "completed" && <Star className="h-3 w-3 mr-1 fill-current" />}
                        {achievement}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* XP Earning Guide */}
      <Card>
        <CardHeader>
          <CardTitle>How to Earn XP</CardTitle>
          <CardDescription>Level up by completing activities and demonstrating mastery</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Learning Activities</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>Complete a module</span>
                  <span className="font-medium text-foreground">+50 XP</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Pass an assessment</span>
                  <span className="font-medium text-foreground">+100 XP</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Perfect score on quiz</span>
                  <span className="font-medium text-foreground">+150 XP</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Complete learning path</span>
                  <span className="font-medium text-foreground">+500 XP</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Practical Application</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>Make AI-guided decision</span>
                  <span className="font-medium text-foreground">+25 XP</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Achieve sustainability goal</span>
                  <span className="font-medium text-foreground">+200 XP</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Win weekly challenge</span>
                  <span className="font-medium text-foreground">+300 XP</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Help community member</span>
                  <span className="font-medium text-foreground">+75 XP</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
