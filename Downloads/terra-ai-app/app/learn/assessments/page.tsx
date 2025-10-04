"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Target, Trophy, CheckCircle2, Clock, Star, ArrowRight, Brain } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const assessments = [
  {
    id: 1,
    title: "NASA Data Fundamentals Quiz",
    description: "Test your understanding of SMAP, MODIS, and GPM data",
    questions: 15,
    duration: "20 min",
    xp: 100,
    difficulty: "Beginner",
    status: "completed",
    score: 93,
    attempts: 1,
  },
  {
    id: 2,
    title: "Soil Moisture Interpretation",
    description: "Practical scenarios using SMAP data for irrigation decisions",
    questions: 20,
    duration: "30 min",
    xp: 150,
    difficulty: "Intermediate",
    status: "completed",
    score: 88,
    attempts: 2,
  },
  {
    id: 3,
    title: "Vegetation Health Analysis",
    description: "Identify crop stress using MODIS vegetation indices",
    questions: 18,
    duration: "25 min",
    xp: 150,
    difficulty: "Intermediate",
    status: "available",
    attempts: 0,
  },
  {
    id: 4,
    title: "Multi-Data Decision Making",
    description: "Complex scenarios requiring multiple NASA datasets",
    questions: 25,
    duration: "40 min",
    xp: 200,
    difficulty: "Advanced",
    status: "available",
    attempts: 0,
  },
  {
    id: 5,
    title: "Climate Adaptation Strategies",
    description: "Long-term planning with climate projection data",
    questions: 30,
    duration: "45 min",
    xp: 250,
    difficulty: "Advanced",
    status: "locked",
    attempts: 0,
  },
]

export default function AssessmentsPage() {
  const [selectedAssessment, setSelectedAssessment] = useState<number | null>(null)

  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Link href="/learn" className="text-muted-foreground hover:text-foreground">
            Education Hub
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="font-semibold">Assessments</span>
        </div>
        <h1 className="text-4xl font-bold">Knowledge Assessments</h1>
        <p className="text-lg text-muted-foreground">
          Test your understanding and earn XP through quizzes and challenges
        </p>
      </div>

      {/* Performance Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assessments Passed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-1">2</div>
            <p className="text-xs text-muted-foreground">Out of 5 total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Star className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3">90.5%</div>
            <p className="text-xs text-muted-foreground">Excellent performance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">XP Earned</CardTitle>
            <Trophy className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">250</div>
            <p className="text-xs text-muted-foreground">From assessments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Invested</CardTitle>
            <Clock className="h-4 w-4 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-4">1.2h</div>
            <p className="text-xs text-muted-foreground">Total assessment time</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Feedback */}
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <CardTitle>Latest Assessment Feedback</CardTitle>
          </div>
          <CardDescription>Personalized insights from your recent performance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-secondary/50 border border-border space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Soil Moisture Interpretation</h4>
              <Badge variant="secondary" className="bg-chart-1/20 text-chart-1">
                88% Score
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Strong understanding of SMAP data interpretation. Consider reviewing the relationship between soil
              moisture depth profiles and root zone availability for even better decision-making.
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>Completed 2 days ago</span>
              <span>•</span>
              <span>2 attempts</span>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-secondary/50 border border-border space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">NASA Data Fundamentals Quiz</h4>
              <Badge variant="secondary" className="bg-chart-1/20 text-chart-1">
                93% Score
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Excellent grasp of fundamental concepts! You demonstrated strong knowledge of SMAP, MODIS, and GPM data
              sources. Ready to move on to intermediate assessments.
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>Completed 1 week ago</span>
              <span>•</span>
              <span>1 attempt</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assessments List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">All Assessments</h2>
        <div className="space-y-4">
          {assessments.map((assessment) => (
            <Card
              key={assessment.id}
              className={
                assessment.status === "completed"
                  ? "border-chart-1/30"
                  : assessment.status === "locked"
                    ? "opacity-60"
                    : ""
              }
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-xl">{assessment.title}</CardTitle>
                      <Badge
                        variant="secondary"
                        className={
                          assessment.difficulty === "Beginner"
                            ? "bg-chart-3/20 text-chart-3"
                            : assessment.difficulty === "Intermediate"
                              ? "bg-chart-2/20 text-chart-2"
                              : "bg-chart-5/20 text-chart-5"
                        }
                      >
                        {assessment.difficulty}
                      </Badge>
                      {assessment.status === "completed" && (
                        <Badge variant="secondary" className="bg-chart-1/20 text-chart-1">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Passed
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{assessment.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <span>{assessment.questions} questions</span>
                  <span>•</span>
                  <span>{assessment.duration}</span>
                  <span>•</span>
                  <span>{assessment.xp} XP</span>
                  {assessment.attempts > 0 && (
                    <>
                      <span>•</span>
                      <span>
                        {assessment.attempts} attempt{assessment.attempts > 1 ? "s" : ""}
                      </span>
                    </>
                  )}
                </div>

                {assessment.status === "completed" && assessment.score && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Best Score</span>
                      <span className="font-medium text-chart-1">{assessment.score}%</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-chart-1" style={{ width: `${assessment.score}%` }} />
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Button
                    className="flex-1"
                    variant={assessment.status === "available" ? "default" : "outline"}
                    disabled={assessment.status === "locked"}
                  >
                    {assessment.status === "completed" ? (
                      <>
                        <Target className="h-4 w-4 mr-2" />
                        Retake Assessment
                      </>
                    ) : assessment.status === "locked" ? (
                      "Unlock at Level 3"
                    ) : (
                      <>
                        <Target className="h-4 w-4 mr-2" />
                        Start Assessment
                      </>
                    )}
                  </Button>
                  {assessment.status === "completed" && (
                    <Button variant="outline" size="icon">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Assessment Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Assessment Guidelines</CardTitle>
          <CardDescription>Tips for success on your knowledge tests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Before You Start</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Complete related learning modules first</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Review key concepts and NASA data sources</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Ensure you have enough time to complete</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Find a quiet environment to focus</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Scoring & Retakes</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Passing score: 70% or higher</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Perfect score (100%) earns bonus XP</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Unlimited retakes available</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Detailed feedback provided after completion</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
