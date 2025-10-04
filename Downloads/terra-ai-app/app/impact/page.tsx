import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, Droplets, Leaf, TrendingUp, Users, Award, MapPin, Trophy } from "lucide-react"

const globalStats = {
  totalUsers: 12847,
  waterSaved: 48.2,
  carbonReduced: 124.5,
  yieldIncrease: 18.3,
  farmsCovered: 8934,
}

const regionalImpact = [
  {
    region: "North America",
    users: 4521,
    waterSaved: 18.4,
    carbonReduced: 45.2,
    topCrop: "Corn",
  },
  {
    region: "Europe",
    users: 3214,
    waterSaved: 12.8,
    carbonReduced: 38.6,
    topCrop: "Wheat",
  },
  {
    region: "Asia",
    users: 2847,
    waterSaved: 10.2,
    carbonReduced: 24.8,
    topCrop: "Rice",
  },
  {
    region: "South America",
    users: 1456,
    waterSaved: 4.8,
    carbonReduced: 10.4,
    topCrop: "Soybeans",
  },
  {
    region: "Africa",
    users: 809,
    waterSaved: 2.0,
    carbonReduced: 5.5,
    topCrop: "Cassava",
  },
]

const milestones = [
  {
    title: "100M Gallons Saved",
    description: "Community reached 100 million gallons of water conservation",
    date: "March 2025",
    icon: Droplets,
    achieved: true,
  },
  {
    title: "100K Tons CO₂ Reduced",
    description: "Collective carbon footprint reduction milestone",
    date: "February 2025",
    icon: Leaf,
    achieved: true,
  },
  {
    title: "10K Active Farmers",
    description: "Growing community of data-driven sustainable farmers",
    date: "January 2025",
    icon: Users,
    achieved: true,
  },
  {
    title: "1M Acres Optimized",
    description: "Total farmland using NASA data for decision-making",
    date: "Target: June 2025",
    icon: Globe,
    achieved: false,
  },
]

const yourContribution = {
  waterSaved: 38400,
  carbonReduced: 1.8,
  yieldIncrease: 12.5,
  percentile: 92,
}

export default function ImpactPage() {
  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Globe className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Global Impact</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Track the collective environmental and agricultural impact of the TerraAI community
        </p>
      </div>

      {/* Global Stats Overview */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card className="border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-4">{globalStats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Worldwide farmers</p>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Water Saved</CardTitle>
            <Droplets className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">{globalStats.waterSaved}M</div>
            <p className="text-xs text-muted-foreground">Gallons conserved</p>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Carbon Reduced</CardTitle>
            <Leaf className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-1">{globalStats.carbonReduced}K</div>
            <p className="text-xs text-muted-foreground">Tons CO₂ equivalent</p>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yield Increase</CardTitle>
            <TrendingUp className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3">+{globalStats.yieldIncrease}%</div>
            <p className="text-xs text-muted-foreground">Average improvement</p>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Farms Covered</CardTitle>
            <MapPin className="h-4 w-4 text-chart-5" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-5">{globalStats.farmsCovered.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across 6 continents</p>
          </CardContent>
        </Card>
      </div>

      {/* Your Contribution */}
      <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            <CardTitle>Your Contribution</CardTitle>
          </div>
          <CardDescription>Your personal impact on global sustainability</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Droplets className="h-4 w-4 text-chart-2" />
                <span>Water Saved</span>
              </div>
              <div className="text-2xl font-bold text-chart-2">{yourContribution.waterSaved.toLocaleString()} gal</div>
              <p className="text-xs text-muted-foreground">Equivalent to 58 households/year</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Leaf className="h-4 w-4 text-chart-1" />
                <span>Carbon Reduced</span>
              </div>
              <div className="text-2xl font-bold text-chart-1">{yourContribution.carbonReduced} tons</div>
              <p className="text-xs text-muted-foreground">Equal to 3,960 miles driven</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4 text-chart-3" />
                <span>Yield Increase</span>
              </div>
              <div className="text-2xl font-bold text-chart-3">+{yourContribution.yieldIncrease}%</div>
              <p className="text-xs text-muted-foreground">Above your baseline</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Trophy className="h-4 w-4 text-chart-4" />
                <span>Global Rank</span>
              </div>
              <div className="text-2xl font-bold text-chart-4">Top {100 - yourContribution.percentile}%</div>
              <p className="text-xs text-muted-foreground">Among all TerraAI users</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Regional Impact */}
      <Card>
        <CardHeader>
          <CardTitle>Regional Impact Breakdown</CardTitle>
          <CardDescription>Environmental impact by geographic region</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {regionalImpact.map((region) => (
              <div key={region.region} className="p-4 rounded-lg border border-border bg-secondary/30">
                <div className="flex items-start justify-between mb-3">
                  <div className="space-y-1">
                    <h4 className="font-semibold flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      {region.region}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {region.users.toLocaleString()} active users • Primary crop: {region.topCrop}
                    </p>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Water Saved</div>
                    <div className="text-lg font-bold text-chart-2">{region.waterSaved}M gal</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Carbon Reduced</div>
                    <div className="text-lg font-bold text-chart-1">{region.carbonReduced}K tons</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Market Share</div>
                    <div className="text-lg font-bold text-chart-3">
                      {((region.users / globalStats.totalUsers) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Impact Tabs */}
      <Tabs defaultValue="environmental" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="environmental">
            <Leaf className="h-4 w-4 mr-2" />
            Environmental
          </TabsTrigger>
          <TabsTrigger value="agricultural">
            <TrendingUp className="h-4 w-4 mr-2" />
            Agricultural
          </TabsTrigger>
          <TabsTrigger value="social">
            <Users className="h-4 w-4 mr-2" />
            Social
          </TabsTrigger>
        </TabsList>

        <TabsContent value="environmental" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Environmental Impact Metrics</CardTitle>
              <CardDescription>Collective sustainability achievements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-semibold">Water Conservation</div>
                    <div className="text-sm text-muted-foreground">
                      48.2M gallons saved through SMAP-guided irrigation
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-chart-2">48.2M</div>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-chart-2" style={{ width: "76%" }} />
                </div>
                <div className="text-xs text-muted-foreground">76% of annual target (63.5M gallons)</div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-semibold">Carbon Footprint Reduction</div>
                    <div className="text-sm text-muted-foreground">
                      124.5K tons CO₂ equivalent through sustainable practices
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-chart-1">124.5K</div>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-chart-1" style={{ width: "83%" }} />
                </div>
                <div className="text-xs text-muted-foreground">83% of annual target (150K tons)</div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-semibold">Soil Health Improvement</div>
                    <div className="text-sm text-muted-foreground">
                      Average 15% increase in organic matter across monitored farms
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-chart-3">+15%</div>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-chart-3" style={{ width: "75%" }} />
                </div>
                <div className="text-xs text-muted-foreground">75% of target improvement (20%)</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agricultural" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Agricultural Performance</CardTitle>
              <CardDescription>Productivity and efficiency improvements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 rounded-lg bg-secondary/50 space-y-2">
                  <div className="text-sm text-muted-foreground">Average Yield Increase</div>
                  <div className="text-3xl font-bold text-chart-3">+18.3%</div>
                  <p className="text-xs text-muted-foreground">Compared to pre-TerraAI baseline</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50 space-y-2">
                  <div className="text-sm text-muted-foreground">Resource Efficiency</div>
                  <div className="text-3xl font-bold text-chart-2">91.4%</div>
                  <p className="text-xs text-muted-foreground">Average optimization score</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50 space-y-2">
                  <div className="text-sm text-muted-foreground">AI Adoption Rate</div>
                  <div className="text-3xl font-bold text-chart-1">87%</div>
                  <p className="text-xs text-muted-foreground">Users following AI recommendations</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50 space-y-2">
                  <div className="text-sm text-muted-foreground">Cost Savings</div>
                  <div className="text-3xl font-bold text-chart-4">$24.8M</div>
                  <p className="text-xs text-muted-foreground">Total community savings</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Community & Knowledge Sharing</CardTitle>
              <CardDescription>Social impact and educational reach</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 rounded-lg bg-secondary/50 space-y-2">
                  <div className="text-sm text-muted-foreground">Knowledge Articles Shared</div>
                  <div className="text-3xl font-bold text-chart-2">3,847</div>
                  <p className="text-xs text-muted-foreground">Community-generated content</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50 space-y-2">
                  <div className="text-sm text-muted-foreground">Farmers Trained</div>
                  <div className="text-3xl font-bold text-chart-1">12,847</div>
                  <p className="text-xs text-muted-foreground">Completed at least one module</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50 space-y-2">
                  <div className="text-sm text-muted-foreground">Active Alliances</div>
                  <div className="text-3xl font-bold text-chart-3">284</div>
                  <p className="text-xs text-muted-foreground">Collaborative farming groups</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50 space-y-2">
                  <div className="text-sm text-muted-foreground">Challenges Completed</div>
                  <div className="text-3xl font-bold text-chart-4">1,456</div>
                  <p className="text-xs text-muted-foreground">Community achievements</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Milestones */}
      <Card>
        <CardHeader>
          <CardTitle>Community Milestones</CardTitle>
          <CardDescription>Major achievements unlocked by the TerraAI community</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon
              return (
                <div
                  key={index}
                  className={`flex items-start gap-4 p-4 rounded-lg border ${
                    milestone.achieved ? "bg-chart-1/5 border-chart-1/30" : "bg-secondary/30 border-border opacity-60"
                  }`}
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${
                      milestone.achieved ? "bg-chart-1/20" : "bg-muted"
                    }`}
                  >
                    <Icon className={`h-6 w-6 ${milestone.achieved ? "text-chart-1" : "text-muted-foreground"}`} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{milestone.title}</h4>
                      {milestone.achieved && (
                        <Badge variant="secondary" className="bg-chart-1/20 text-chart-1">
                          Achieved
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{milestone.description}</p>
                    <p className="text-xs text-muted-foreground">{milestone.date}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
