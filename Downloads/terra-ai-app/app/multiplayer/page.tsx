import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, Handshake, Trophy, Target, MessageSquare, Plus, Crown } from "lucide-react"

const alliances = [
  {
    id: 1,
    name: "Green Valley Collective",
    members: 24,
    region: "North America",
    focus: "Water Conservation",
    rank: 3,
    achievements: 12,
    isJoined: true,
  },
  {
    id: 2,
    name: "Sustainable Harvest Alliance",
    members: 18,
    region: "Europe",
    focus: "Carbon Reduction",
    rank: 7,
    achievements: 9,
    isJoined: false,
  },
  {
    id: 3,
    name: "Data-Driven Farmers",
    members: 31,
    region: "Global",
    focus: "AI Optimization",
    rank: 2,
    achievements: 15,
    isJoined: false,
  },
]

const activeChallenges = [
  {
    id: 1,
    title: "Regional Water Challenge",
    description: "Reduce water usage by 25% across all alliance members",
    participants: 24,
    timeLeft: "5 days",
    progress: 72,
    reward: "1000 XP + Alliance Badge",
    type: "Alliance",
  },
  {
    id: 2,
    title: "Yield Optimization Sprint",
    description: "Achieve 20% yield increase using AI recommendations",
    participants: 156,
    timeLeft: "2 days",
    progress: 45,
    reward: "500 XP + Exclusive Title",
    type: "Global",
  },
  {
    id: 3,
    title: "Sustainability Marathon",
    description: "Maintain top sustainability score for 30 consecutive days",
    participants: 89,
    timeLeft: "18 days",
    progress: 38,
    reward: "2000 XP + Master Badge",
    type: "Global",
  },
]

const recentActivity = [
  {
    user: "Sarah Chen",
    action: "completed the Water Conservation Challenge",
    time: "2 hours ago",
    xp: 500,
  },
  {
    user: "Marcus Rodriguez",
    action: "shared a new irrigation strategy",
    time: "4 hours ago",
    likes: 12,
  },
  {
    user: "Your Alliance",
    action: "reached #3 in regional rankings",
    time: "6 hours ago",
    highlight: true,
  },
  {
    user: "Aisha Patel",
    action: "achieved 95% sustainability score",
    time: "1 day ago",
    xp: 300,
  },
]

export default function MultiplayerPage() {
  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Users className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Multiplayer</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Join alliances, compete in challenges, and learn from the global farming community
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Alliance</CardTitle>
            <Handshake className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-1">Green Valley</div>
            <p className="text-xs text-muted-foreground">24 members • Rank #3</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Challenges</CardTitle>
            <Target className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">3</div>
            <p className="text-xs text-muted-foreground">2 alliance • 1 global</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Challenges Won</CardTitle>
            <Trophy className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3">8</div>
            <p className="text-xs text-muted-foreground">This season</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Community XP</CardTitle>
            <Users className="h-4 w-4 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-4">3,240</div>
            <p className="text-xs text-muted-foreground">From collaboration</p>
          </CardContent>
        </Card>
      </div>

      {/* Your Alliance */}
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Green Valley Collective</CardTitle>
              <CardDescription className="text-base mt-1">North America • Focus: Water Conservation</CardDescription>
            </div>
            <Badge variant="secondary" className="bg-chart-1/20 text-chart-1">
              <Crown className="h-3 w-3 mr-1" />
              Rank #3
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Members</div>
              <div className="text-2xl font-bold">24</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Achievements</div>
              <div className="text-2xl font-bold text-chart-3">12</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Water Saved</div>
              <div className="text-2xl font-bold text-chart-2">1.2M gal</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button className="flex-1">
              <MessageSquare className="h-4 w-4 mr-2" />
              Alliance Chat
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              View Members
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Challenges */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Active Challenges</h2>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Browse All
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-1">
          {activeChallenges.map((challenge) => (
            <Card key={challenge.id} className={challenge.type === "Alliance" ? "border-primary/30" : ""}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{challenge.title}</CardTitle>
                      <Badge
                        variant="secondary"
                        className={
                          challenge.type === "Alliance" ? "bg-primary/20 text-primary" : "bg-chart-2/20 text-chart-2"
                        }
                      >
                        {challenge.type}
                      </Badge>
                    </div>
                    <CardDescription>{challenge.description}</CardDescription>
                  </div>
                  <Badge variant="outline">{challenge.timeLeft} left</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{challenge.participants} participants</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4" />
                    <span>{challenge.reward}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Your Progress</span>
                    <span className="font-medium">{challenge.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`h-full ${challenge.type === "Alliance" ? "bg-primary" : "bg-chart-2"}`}
                      style={{ width: `${challenge.progress}%` }}
                    />
                  </div>
                </div>
                <Button className="w-full" variant={challenge.type === "Alliance" ? "default" : "outline"}>
                  View Challenge Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Discover Alliances */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Discover Alliances</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {alliances.map((alliance) => (
            <Card key={alliance.id} className={alliance.isJoined ? "border-primary/30" : ""}>
              <CardHeader>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{alliance.name}</CardTitle>
                    {alliance.isJoined && (
                      <Badge variant="secondary" className="bg-primary/20 text-primary text-xs">
                        Joined
                      </Badge>
                    )}
                  </div>
                  <CardDescription>{alliance.region}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Focus</span>
                    <span className="font-medium">{alliance.focus}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Members</span>
                    <span className="font-medium">{alliance.members}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Rank</span>
                    <span className="font-medium text-chart-1">#{alliance.rank}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Achievements</span>
                    <span className="font-medium text-chart-3">{alliance.achievements}</span>
                  </div>
                </div>
                <Button
                  className="w-full"
                  variant={alliance.isJoined ? "outline" : "default"}
                  disabled={alliance.isJoined}
                >
                  {alliance.isJoined ? "Current Alliance" : "Request to Join"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>What's happening in your network</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 p-3 rounded-lg ${
                  activity.highlight ? "bg-primary/5 border border-primary/30" : "bg-secondary/30"
                }`}
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {activity.user
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm">
                    <span className="font-semibold">{activity.user}</span>{" "}
                    <span className="text-muted-foreground">{activity.action}</span>
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{activity.time}</span>
                    {activity.xp && (
                      <>
                        <span>•</span>
                        <span className="text-chart-3">+{activity.xp} XP</span>
                      </>
                    )}
                    {activity.likes && (
                      <>
                        <span>•</span>
                        <span>{activity.likes} likes</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
