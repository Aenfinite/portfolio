import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Trophy, TrendingUp, Leaf, Medal, Crown, Award } from "lucide-react"

const sustainabilityLeaders = [
  {
    rank: 1,
    name: "Sarah Chen",
    score: 9845,
    change: "+12",
    level: 5,
    badge: "Master Navigator",
    carbonReduction: "2.4 tons",
    waterSaved: "48K gal",
  },
  {
    rank: 2,
    name: "Marcus Rodriguez",
    score: 9720,
    change: "+8",
    level: 5,
    badge: "Master Navigator",
    carbonReduction: "2.2 tons",
    waterSaved: "45K gal",
  },
  {
    rank: 3,
    name: "Aisha Patel",
    score: 9580,
    change: "+15",
    level: 4,
    badge: "Agricultural Strategist",
    carbonReduction: "2.1 tons",
    waterSaved: "42K gal",
  },
  {
    rank: 4,
    name: "James Wilson",
    score: 9420,
    change: "-2",
    level: 4,
    badge: "Agricultural Strategist",
    carbonReduction: "2.0 tons",
    waterSaved: "40K gal",
  },
  {
    rank: 5,
    name: "You",
    score: 9280,
    change: "+5",
    level: 2,
    badge: "Farm Analyst",
    carbonReduction: "1.8 tons",
    waterSaved: "38K gal",
    isCurrentUser: true,
  },
]

const yieldLeaders = [
  {
    rank: 1,
    name: "David Kim",
    score: 12450,
    change: "+18",
    level: 5,
    badge: "Master Navigator",
    yieldIncrease: "+24.5%",
    efficiency: "96%",
  },
  {
    rank: 2,
    name: "Emma Thompson",
    score: 12280,
    change: "+22",
    level: 4,
    badge: "Agricultural Strategist",
    yieldIncrease: "+22.8%",
    efficiency: "94%",
  },
  {
    rank: 3,
    name: "Carlos Mendez",
    score: 12100,
    change: "+10",
    level: 4,
    badge: "Agricultural Strategist",
    yieldIncrease: "+21.0%",
    efficiency: "93%",
  },
  {
    rank: 4,
    name: "You",
    score: 11850,
    change: "+14",
    level: 2,
    badge: "Farm Analyst",
    yieldIncrease: "+18.5%",
    efficiency: "89%",
    isCurrentUser: true,
  },
  {
    rank: 5,
    name: "Lisa Anderson",
    score: 11720,
    change: "+6",
    level: 3,
    badge: "Sustainability Expert",
    yieldIncrease: "+17.2%",
    efficiency: "88%",
  },
]

const weeklyChallenge = {
  name: "Water Conservation Challenge",
  description: "Reduce water usage by 20% while maintaining yield",
  participants: 1247,
  timeLeft: "3 days",
  reward: "500 XP + Exclusive Badge",
  yourProgress: 68,
}

export default function LeaderboardsPage() {
  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Trophy className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Leaderboards</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Compete with farmers worldwide on sustainability and yield optimization
        </p>
      </div>

      {/* Your Ranking Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sustainability Rank</CardTitle>
            <Leaf className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-1">#5</div>
            <p className="text-xs text-muted-foreground">Top 0.4% globally</p>
            <div className="mt-2 flex items-center gap-1 text-xs text-chart-1">
              <TrendingUp className="h-3 w-3" />
              <span>+5 this week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yield Optimization Rank</CardTitle>
            <TrendingUp className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">#4</div>
            <p className="text-xs text-muted-foreground">Top 0.3% globally</p>
            <div className="mt-2 flex items-center gap-1 text-xs text-chart-2">
              <TrendingUp className="h-3 w-3" />
              <span>+14 this week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Score</CardTitle>
            <Trophy className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3">21,130</div>
            <p className="text-xs text-muted-foreground">Combined ranking points</p>
            <div className="mt-2 flex items-center gap-1 text-xs text-chart-3">
              <TrendingUp className="h-3 w-3" />
              <span>+19 this week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Challenge */}
      <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <CardTitle>Weekly Challenge</CardTitle>
              </div>
              <CardDescription className="text-base">{weeklyChallenge.name}</CardDescription>
            </div>
            <Badge variant="secondary" className="bg-primary/20 text-primary">
              {weeklyChallenge.timeLeft} left
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{weeklyChallenge.description}</p>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-chart-3" />
              <span className="text-muted-foreground">
                {weeklyChallenge.participants.toLocaleString()} participants
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-chart-2" />
              <span className="text-muted-foreground">{weeklyChallenge.reward}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Your Progress</span>
              <span className="font-medium">{weeklyChallenge.yourProgress}%</span>
            </div>
            <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${weeklyChallenge.yourProgress}%` }} />
            </div>
          </div>
          <Button className="w-full">View Challenge Details</Button>
        </CardContent>
      </Card>

      {/* Leaderboard Tabs */}
      <Tabs defaultValue="sustainability" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sustainability">
            <Leaf className="h-4 w-4 mr-2" />
            Sustainability
          </TabsTrigger>
          <TabsTrigger value="yield">
            <TrendingUp className="h-4 w-4 mr-2" />
            Yield Optimization
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sustainability" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sustainability Leaderboard</CardTitle>
              <CardDescription>Top farmers by carbon reduction and resource efficiency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sustainabilityLeaders.map((leader) => (
                  <div
                    key={leader.rank}
                    className={`flex items-center gap-4 p-4 rounded-lg border ${
                      leader.isCurrentUser
                        ? "bg-primary/5 border-primary/30"
                        : "bg-card border-border hover:bg-secondary/50"
                    } transition-colors`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="flex items-center justify-center w-8">
                        {leader.rank === 1 ? (
                          <Crown className="h-6 w-6 text-chart-3 fill-chart-3" />
                        ) : leader.rank === 2 ? (
                          <Medal className="h-6 w-6 text-muted-foreground" />
                        ) : leader.rank === 3 ? (
                          <Medal className="h-6 w-6 text-chart-5" />
                        ) : (
                          <span className="text-lg font-bold text-muted-foreground">{leader.rank}</span>
                        )}
                      </div>
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className={leader.isCurrentUser ? "bg-primary/20 text-primary" : ""}>
                          {leader.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${leader.isCurrentUser ? "text-primary" : ""}`}>
                            {leader.name}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            Level {leader.level}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">{leader.badge}</div>
                      </div>
                    </div>
                    <div className="hidden md:flex items-center gap-6 text-sm">
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">Carbon Reduced</div>
                        <div className="font-medium text-chart-1">{leader.carbonReduction}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">Water Saved</div>
                        <div className="font-medium text-chart-2">{leader.waterSaved}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{leader.score.toLocaleString()}</div>
                      <div className={`text-xs ${leader.change.startsWith("+") ? "text-chart-1" : "text-destructive"}`}>
                        {leader.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="yield" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Yield Optimization Leaderboard</CardTitle>
              <CardDescription>Top farmers by production efficiency and yield increase</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {yieldLeaders.map((leader) => (
                  <div
                    key={leader.rank}
                    className={`flex items-center gap-4 p-4 rounded-lg border ${
                      leader.isCurrentUser
                        ? "bg-primary/5 border-primary/30"
                        : "bg-card border-border hover:bg-secondary/50"
                    } transition-colors`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="flex items-center justify-center w-8">
                        {leader.rank === 1 ? (
                          <Crown className="h-6 w-6 text-chart-3 fill-chart-3" />
                        ) : leader.rank === 2 ? (
                          <Medal className="h-6 w-6 text-muted-foreground" />
                        ) : leader.rank === 3 ? (
                          <Medal className="h-6 w-6 text-chart-5" />
                        ) : (
                          <span className="text-lg font-bold text-muted-foreground">{leader.rank}</span>
                        )}
                      </div>
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className={leader.isCurrentUser ? "bg-primary/20 text-primary" : ""}>
                          {leader.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${leader.isCurrentUser ? "text-primary" : ""}`}>
                            {leader.name}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            Level {leader.level}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">{leader.badge}</div>
                      </div>
                    </div>
                    <div className="hidden md:flex items-center gap-6 text-sm">
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">Yield Increase</div>
                        <div className="font-medium text-chart-1">{leader.yieldIncrease}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">Efficiency</div>
                        <div className="font-medium text-chart-2">{leader.efficiency}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{leader.score.toLocaleString()}</div>
                      <div className={`text-xs ${leader.change.startsWith("+") ? "text-chart-1" : "text-destructive"}`}>
                        {leader.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Ranking Info */}
      <Card>
        <CardHeader>
          <CardTitle>How Rankings Work</CardTitle>
          <CardDescription>Understanding the leaderboard scoring system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <Leaf className="h-4 w-4 text-chart-1" />
                Sustainability Score
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Carbon footprint reduction (40%)</li>
                <li>• Water conservation efficiency (30%)</li>
                <li>• Soil health improvement (20%)</li>
                <li>• Biodiversity enhancement (10%)</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-chart-2" />
                Yield Optimization Score
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Yield increase vs baseline (50%)</li>
                <li>• Resource use efficiency (25%)</li>
                <li>• AI recommendation adoption (15%)</li>
                <li>• Consistency over time (10%)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
