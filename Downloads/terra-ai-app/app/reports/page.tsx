import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  DollarSign,
  Leaf,
  Droplets,
  BarChart3,
  PieChart,
  LineChart,
  Share2,
  Filter,
} from "lucide-react"

const reportCategories = [
  {
    title: "Financial Reports",
    description: "Revenue, expenses, and profit analysis",
    icon: DollarSign,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
    reports: [
      { name: "Q3 2024 Financial Summary", date: "Sep 30, 2024", size: "2.4 MB" },
      { name: "Annual Revenue Report 2024", date: "Sep 15, 2024", size: "3.1 MB" },
      { name: "Cost Analysis - Q3", date: "Sep 10, 2024", size: "1.8 MB" },
    ],
  },
  {
    title: "Sustainability Reports",
    description: "Environmental impact and practices",
    icon: Leaf,
    color: "text-primary",
    bgColor: "bg-primary/10",
    reports: [
      { name: "Carbon Footprint Analysis", date: "Sep 28, 2024", size: "1.9 MB" },
      { name: "Water Conservation Report", date: "Sep 20, 2024", size: "2.2 MB" },
      { name: "Soil Health Assessment", date: "Sep 12, 2024", size: "2.7 MB" },
    ],
  },
  {
    title: "Yield & Production",
    description: "Crop performance and harvest data",
    icon: TrendingUp,
    color: "text-accent",
    bgColor: "bg-accent/10",
    reports: [
      { name: "Harvest Report - Fall 2024", date: "Sep 25, 2024", size: "3.5 MB" },
      { name: "Crop Yield Analysis", date: "Sep 18, 2024", size: "2.8 MB" },
      { name: "Field Performance Comparison", date: "Sep 8, 2024", size: "2.1 MB" },
    ],
  },
  {
    title: "Weather & Climate",
    description: "Historical weather and forecasts",
    icon: Droplets,
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
    reports: [
      { name: "Seasonal Weather Summary", date: "Sep 30, 2024", size: "1.6 MB" },
      { name: "Precipitation Analysis", date: "Sep 22, 2024", size: "1.4 MB" },
      { name: "Climate Impact Report", date: "Sep 14, 2024", size: "2.0 MB" },
    ],
  },
]

const quickStats = [
  { label: "Total Reports", value: "48", icon: FileText, color: "text-primary" },
  { label: "This Quarter", value: "12", icon: Calendar, color: "text-chart-2" },
  { label: "Downloads", value: "156", icon: Download, color: "text-accent" },
  { label: "Shared", value: "23", icon: Share2, color: "text-chart-1" },
]

const recentReports = [
  {
    title: "Comprehensive Farm Analysis - Q3 2024",
    category: "Executive Summary",
    date: "Oct 1, 2024",
    size: "5.2 MB",
    status: "New",
    description: "Complete overview of farm operations, financial performance, and sustainability metrics",
  },
  {
    title: "NASA POWER Data Integration Report",
    category: "Technical",
    date: "Sep 29, 2024",
    size: "3.8 MB",
    status: "Updated",
    description: "Analysis of satellite data integration and its impact on decision-making",
  },
  {
    title: "Precision Agriculture ROI Analysis",
    category: "Financial",
    date: "Sep 27, 2024",
    size: "2.9 MB",
    status: "New",
    description: "Return on investment for precision farming technologies and practices",
  },
]

const customReportOptions = [
  { name: "Date Range", icon: Calendar },
  { name: "Fields", icon: Filter },
  { name: "Metrics", icon: BarChart3 },
  { name: "Format", icon: FileText },
]

export default function ReportsPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Reports & Analytics</h1>
                <p className="text-muted-foreground">Comprehensive insights and downloadable reports</p>
              </div>
            </div>
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Generate Custom Report
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {quickStats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label} className="border-border/50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Recent Reports */}
        <Card className="mb-12 border-primary/20">
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>Latest generated reports and analyses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div
                  key={report.title}
                  className="flex items-start justify-between p-4 rounded-lg bg-muted/30 border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{report.title}</h4>
                        <Badge
                          variant="outline"
                          className={
                            report.status === "New"
                              ? "bg-chart-2/10 text-chart-2 border-chart-2/20"
                              : "bg-accent/10 text-accent border-accent/20"
                          }
                        >
                          {report.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {report.date}
                        </span>
                        <span>{report.size}</span>
                        <Badge variant="outline" className="text-xs">
                          {report.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0 ml-4">
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Download className="h-3 w-3" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Share2 className="h-3 w-3" />
                      Share
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Report Categories */}
        <Tabs defaultValue="all" className="mb-12">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="all">All Reports</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
            <TabsTrigger value="production">Production</TabsTrigger>
            <TabsTrigger value="weather">Weather</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid md:grid-cols-2 gap-6">
              {reportCategories.map((category) => {
                const Icon = category.icon
                return (
                  <Card key={category.title} className="border-border/50">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${category.bgColor}`}>
                          <Icon className={`h-5 w-5 ${category.color}`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{category.title}</CardTitle>
                          <CardDescription className="text-xs">{category.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {category.reports.map((report) => (
                          <div
                            key={report.name}
                            className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex-1">
                              <p className="font-medium text-sm mb-1">{report.name}</p>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <span>{report.date}</span>
                                <span>{report.size}</span>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="financial">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <DollarSign className="h-6 w-6 text-chart-2" />
                  <div>
                    <CardTitle>Financial Reports</CardTitle>
                    <CardDescription>Revenue, expenses, and profit analysis</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {reportCategories[0].reports.map((report) => (
                    <div
                      key={report.name}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-medium mb-1">{report.name}</p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>{report.date}</span>
                          <span>{report.size}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sustainability">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Leaf className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle>Sustainability Reports</CardTitle>
                    <CardDescription>Environmental impact and practices</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {reportCategories[1].reports.map((report) => (
                    <div
                      key={report.name}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-medium mb-1">{report.name}</p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>{report.date}</span>
                          <span>{report.size}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="production">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-6 w-6 text-accent" />
                  <div>
                    <CardTitle>Yield & Production Reports</CardTitle>
                    <CardDescription>Crop performance and harvest data</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {reportCategories[2].reports.map((report) => (
                    <div
                      key={report.name}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-medium mb-1">{report.name}</p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>{report.date}</span>
                          <span>{report.size}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weather">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Droplets className="h-6 w-6 text-chart-1" />
                  <div>
                    <CardTitle>Weather & Climate Reports</CardTitle>
                    <CardDescription>Historical weather and forecasts</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {reportCategories[3].reports.map((report) => (
                    <div
                      key={report.name}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-medium mb-1">{report.name}</p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>{report.date}</span>
                          <span>{report.size}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Custom Report Builder */}
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <CardHeader>
            <CardTitle>Custom Report Builder</CardTitle>
            <CardDescription>Create tailored reports with specific metrics and date ranges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              {customReportOptions.map((option) => {
                const Icon = option.icon
                return (
                  <div
                    key={option.name}
                    className="flex items-center gap-3 p-4 rounded-lg bg-background/50 border border-border"
                  >
                    <Icon className="h-5 w-5 text-primary" />
                    <span className="font-medium text-sm">{option.name}</span>
                  </div>
                )
              })}
            </div>
            <div className="flex gap-3">
              <Button className="gap-2">
                <BarChart3 className="h-4 w-4" />
                Build Custom Report
              </Button>
              <Button variant="outline" className="gap-2 bg-transparent">
                <PieChart className="h-4 w-4" />
                View Templates
              </Button>
              <Button variant="outline" className="gap-2 bg-transparent">
                <LineChart className="h-4 w-4" />
                Schedule Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
