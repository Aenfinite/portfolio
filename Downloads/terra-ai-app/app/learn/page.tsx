import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, BookOpen, Trophy, Target, ArrowRight, Satellite, Brain, Leaf } from "lucide-react"
import Link from "next/link"

export default function LearnPage() {
  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Education Hub</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Master sustainable agriculture with NASA data and AI-powered learning
        </p>
      </div>

      {/* Current Progress */}
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Your Learning Journey</CardTitle>
              <CardDescription>Level 2: Farm Analyst</CardDescription>
            </div>
            <Link href="/learn/progression">
              <Button variant="outline" size="sm">
                View Progression
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Progress to Level 3: Sustainability Expert</span>
              <span className="text-muted-foreground">1,240 / 2,000 XP</span>
            </div>
            <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: "62%" }} />
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <div className="flex items-center gap-2 text-sm">
              <Trophy className="h-4 w-4 text-chart-3" />
              <span className="text-muted-foreground">12 Achievements</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <BookOpen className="h-4 w-4 text-chart-2" />
              <span className="text-muted-foreground">8 Modules Completed</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Target className="h-4 w-4 text-chart-1" />
              <span className="text-muted-foreground">92% Avg Score</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Access */}
      <div className="grid gap-4 md:grid-cols-3">
        <Link href="/learn/modules">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-2/20">
                  <BookOpen className="h-5 w-5 text-chart-2" />
                </div>
                <div>
                  <CardTitle className="text-lg">Learning Modules</CardTitle>
                  <CardDescription>NASA dataset lessons</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Interactive courses on satellite data interpretation and sustainable farming practices
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/learn/assessments">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-3/20">
                  <Target className="h-5 w-5 text-chart-3" />
                </div>
                <div>
                  <CardTitle className="text-lg">Assessments</CardTitle>
                  <CardDescription>Test your knowledge</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Quizzes and challenges to validate your understanding and earn XP
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/learn/progression">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-1/20">
                  <Trophy className="h-5 w-5 text-chart-1" />
                </div>
                <div>
                  <CardTitle className="text-lg">Progression</CardTitle>
                  <CardDescription>Track your growth</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                View your level progression from Novice to Master Navigator
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Featured Modules */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Featured Learning Paths</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-2/20">
                  <Satellite className="h-6 w-6 text-chart-2" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle>NASA Data Fundamentals</CardTitle>
                    <Badge variant="secondary" className="bg-chart-2/20 text-chart-2">
                      Beginner
                    </Badge>
                  </div>
                  <CardDescription>6 modules • 4 hours</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Learn to interpret SMAP soil moisture, MODIS vegetation indices, and GPM precipitation data for
                agricultural decision-making.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Your Progress</span>
                  <span className="font-medium">4/6 modules</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-chart-2" style={{ width: "67%" }} />
                </div>
              </div>
              <Button className="w-full bg-transparent" variant="outline">
                Continue Learning
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-1/20">
                  <Brain className="h-6 w-6 text-chart-1" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle>AI-Powered Decision Making</CardTitle>
                    <Badge variant="secondary" className="bg-chart-1/20 text-chart-1">
                      Intermediate
                    </Badge>
                  </div>
                  <CardDescription>8 modules • 6 hours</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Master AI recommendations, yield predictions, and automated irrigation optimization using machine
                learning models.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Your Progress</span>
                  <span className="font-medium">0/8 modules</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-chart-1" style={{ width: "0%" }} />
                </div>
              </div>
              <Button className="w-full bg-transparent" variant="outline">
                Start Learning
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-3/20">
                  <Leaf className="h-6 w-6 text-chart-3" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle>Sustainable Agriculture</CardTitle>
                    <Badge variant="secondary" className="bg-chart-3/20 text-chart-3">
                      Intermediate
                    </Badge>
                  </div>
                  <CardDescription>10 modules • 8 hours</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Implement regenerative practices, optimize resource usage, and reduce carbon footprint using data-driven
                strategies.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Your Progress</span>
                  <span className="font-medium">2/10 modules</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-chart-3" style={{ width: "20%" }} />
                </div>
              </div>
              <Button className="w-full bg-transparent" variant="outline">
                Continue Learning
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-5/20">
                  <Target className="h-6 w-6 text-chart-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle>Climate Adaptation Strategies</CardTitle>
                    <Badge variant="secondary" className="bg-chart-5/20 text-chart-5">
                      Advanced
                    </Badge>
                  </div>
                  <CardDescription>12 modules • 10 hours</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Develop resilience to climate change using long-term NASA climate data and predictive modeling
                techniques.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Your Progress</span>
                  <span className="font-medium">0/12 modules</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-chart-5" style={{ width: "0%" }} />
                </div>
              </div>
              <Button className="w-full bg-transparent" variant="outline" disabled>
                Unlock at Level 3
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
