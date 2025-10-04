import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import {
  Trophy,
  Target,
  Zap,
  Award,
  Star,
  TrendingUp,
  Users,
  Clock,
  CheckCircle2,
  Lock,
  Flame,
  ArrowRight,
} from "lucide-react"

const activeChallenges = [
  {
    title: "Water Warrior",
    description: "Reduce water usage by 25% this month",
    progress: 68,
    current: "17,000 L",
    target: "25,000 L",
    reward: "500 points",
    timeLeft: "12 days",
    difficulty: "Medium",
    icon: Target,
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
  {
    title: "Carbon Crusher",
    description: "Achieve net-zero emissions for one week",
    progress: 42,
    current: "3 days",
    target: "7 days",
    reward: "750 points",
    timeLeft: "4 days",
    difficulty: "Hard",
    icon: Zap,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    title: "Soil Savior",
    description: "Increase soil organic matter by 5%",
    progress: 85,
    current: "4.2%",
    target: "5%",
    reward: "600 points",
    timeLeft: "18 days",
    difficulty: "Medium",
    icon: TrendingUp,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
]

const completedChallenges = [
  {
    title: "Precision Pioneer",
    description: "Implement precision irrigation in all fields",
    completedDate: "2 weeks ago",
    reward: "1000 points",
    icon: CheckCircle2,
  },
  {
    title: "Green Energy Champion",
    description: "Reduce energy consumption by 30%",
    completedDate: "1 month ago",
    reward: "800 points",
    icon: CheckCircle2,
  },
]

const upcomingChallenges = [
  {
    title: "Biodiversity Booster",
    description: "Plant 500 native species around farm perimeter",
    reward: "1200 points",
    difficulty: "Hard",
    unlockRequirement: "Complete 5 challenges",
    icon: Lock,
  },
  {
    title: "Zero Waste Hero",
    description: "Achieve 95% waste reduction for one month",
    reward: "1500 points",
    difficulty: "Expert",
    unlockRequirement: "Reach Level 5",
    icon: Lock,
  },
]

const leaderboard = [
  { rank: 1, name: "Green Valley Farm", points: 12450, badge: "🥇" },
  { rank: 2, name: "Sunrise Acres", points: 11280, badge: "🥈" },
  { rank: 3, name: "Your Farm", points: 10890, badge: "🥉", highlight: true },
  { rank: 4, name: "Prairie Fields", points: 9650, badge: "" },
  { rank: 5, name: "Harvest Hills", points: 8920, badge: "" },
]

export default function ChallengesPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Challenges & Achievements</h1>
                <p className="text-muted-foreground">Compete, earn rewards, and level up your sustainability</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-1">
                <Star className="h-5 w-5 text-accent" />
                <span className="text-3xl font-bold">10,890</span>
              </div>
              <p className="text-sm text-muted-foreground">Total Points</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="border-primary/20">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                <CardDescription>Level</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-3xl mb-2">Level 8</CardTitle>
              <Progress value={65} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">650/1000 XP to Level 9</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-chart-5" />
                <CardDescription>Current Streak</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-3xl">24 days</CardTitle>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-chart-2" />
                <CardDescription>Completed</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-3xl">18/25</CardTitle>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-accent" />
                <CardDescription>Leaderboard Rank</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-3xl">#3</CardTitle>
            </CardContent>
          </Card>
        </div>

        {/* Active Challenges */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Active Challenges</h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {activeChallenges.map((challenge) => {
              const Icon = challenge.icon
              return (
                <Card key={challenge.title} className="border-border/50">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${challenge.bgColor}`}>
                        <Icon className={`h-6 w-6 ${challenge.color}`} />
                      </div>
                      <Badge variant="outline">{challenge.difficulty}</Badge>
                    </div>
                    <CardTitle className="text-lg">{challenge.title}</CardTitle>
                    <CardDescription>{challenge.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{challenge.progress}%</span>
                        </div>
                        <Progress value={challenge.progress} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>{challenge.current}</span>
                          <span>{challenge.target}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {challenge.timeLeft}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-accent" />
                          <span className="font-semibold text-sm">{challenge.reward}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Completed and Upcoming */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {/* Completed Challenges */}
          <Card className="border-chart-2/20">
            <CardHeader>
              <CardTitle>Recently Completed</CardTitle>
              <CardDescription>Your latest achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {completedChallenges.map((challenge) => {
                  const Icon = challenge.icon
                  return (
                    <div
                      key={challenge.title}
                      className="flex items-start gap-3 p-4 rounded-lg bg-chart-2/5 border border-chart-2/20"
                    >
                      <Icon className="h-5 w-5 text-chart-2 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-1">{challenge.title}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{challenge.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{challenge.completedDate}</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-accent" />
                            <span className="text-xs font-semibold">{challenge.reward}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Challenges */}
          <Card className="border-muted">
            <CardHeader>
              <CardTitle>Upcoming Challenges</CardTitle>
              <CardDescription>Unlock by completing requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingChallenges.map((challenge) => {
                  const Icon = challenge.icon
                  return (
                    <div
                      key={challenge.title}
                      className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 border border-muted opacity-75"
                    >
                      <Icon className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-1">{challenge.title}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{challenge.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {challenge.unlockRequirement}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-accent" />
                            <span className="text-xs font-semibold">{challenge.reward}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard */}
        <Card className="border-primary/20 mb-12">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Regional Leaderboard</CardTitle>
                <CardDescription>Top sustainable farms in your area</CardDescription>
              </div>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                <Users className="h-3 w-3 mr-1" />
                Iowa Region
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {leaderboard.map((entry) => (
                <div
                  key={entry.rank}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    entry.highlight ? "bg-primary/10 border-2 border-primary/30" : "bg-muted/30 border border-muted"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold w-8 text-center">{entry.badge || `#${entry.rank}`}</div>
                    <div>
                      <p className="font-semibold">{entry.name}</p>
                      {entry.highlight && (
                        <Badge variant="outline" className="mt-1 text-xs bg-primary/10 text-primary border-primary/20">
                          You
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-accent" />
                    <span className="text-lg font-bold">{entry.points.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <CardHeader>
            <CardTitle>Ready for More?</CardTitle>
            <CardDescription>
              Track your sustainability metrics and discover new ways to improve your environmental impact
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/sustainability">
                View Sustainability Dashboard
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
