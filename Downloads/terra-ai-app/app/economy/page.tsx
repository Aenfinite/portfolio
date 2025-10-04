import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Truck,
  Sprout,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
} from "lucide-react"

const financialMetrics = [
  {
    title: "Total Revenue",
    value: "$284,500",
    change: "+12.5%",
    trend: "up",
    period: "This Quarter",
    icon: DollarSign,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    title: "Operating Costs",
    value: "$156,200",
    change: "-3.2%",
    trend: "down",
    period: "This Quarter",
    icon: ShoppingCart,
    color: "text-chart-5",
    bgColor: "bg-chart-5/10",
  },
  {
    title: "Net Profit",
    value: "$128,300",
    change: "+18.7%",
    trend: "up",
    period: "This Quarter",
    icon: TrendingUp,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Profit Margin",
    value: "45.1%",
    change: "+2.8%",
    trend: "up",
    period: "This Quarter",
    icon: PieChart,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
]

const cropRevenue = [
  { crop: "Wheat", revenue: "$98,400", percentage: 35, yield: "4.2 t/ha", color: "bg-chart-2" },
  { crop: "Corn", revenue: "$82,100", percentage: 29, yield: "9.8 t/ha", color: "bg-chart-4" },
  { crop: "Soybeans", revenue: "$64,800", percentage: 23, yield: "3.1 t/ha", color: "bg-accent" },
  { crop: "Rice", revenue: "$39,200", percentage: 13, yield: "6.5 t/ha", color: "bg-primary" },
]

const expenses = [
  { category: "Seeds & Inputs", amount: "$42,500", percentage: 27, icon: Sprout },
  { category: "Labor", amount: "$38,200", percentage: 24, icon: DollarSign },
  { category: "Equipment & Fuel", amount: "$31,800", percentage: 20, icon: Truck },
  { category: "Irrigation & Water", amount: "$24,600", percentage: 16, icon: TrendingDown },
  { category: "Other", amount: "$19,100", percentage: 13, icon: BarChart3 },
]

const marketPrices = [
  { commodity: "Wheat", price: "$245/ton", change: "+5.2%", trend: "up" },
  { commodity: "Corn", price: "$198/ton", change: "-2.1%", trend: "down" },
  { commodity: "Soybeans", price: "$512/ton", change: "+8.4%", trend: "up" },
  { commodity: "Rice", price: "$428/ton", change: "+3.7%", trend: "up" },
]

export default function EconomyPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Economic Dashboard</h1>
              <p className="text-muted-foreground">Financial performance and market insights</p>
            </div>
          </div>
        </div>

        {/* Financial Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {financialMetrics.map((metric) => {
            const Icon = metric.icon
            const TrendIcon = metric.trend === "up" ? ArrowUpRight : ArrowDownRight
            return (
              <Card key={metric.title} className="border-border/50">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${metric.bgColor}`}>
                      <Icon className={`h-5 w-5 ${metric.color}`} />
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        metric.trend === "up"
                          ? "bg-chart-2/10 text-chart-2 border-chart-2/20"
                          : "bg-chart-5/10 text-chart-5 border-chart-5/20"
                      }
                    >
                      <TrendIcon className="h-3 w-3 mr-1" />
                      {metric.change}
                    </Badge>
                  </div>
                  <CardDescription>{metric.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-3xl mb-1">{metric.value}</CardTitle>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {metric.period}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Revenue Breakdown and Expenses */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {/* Crop Revenue */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Crop</CardTitle>
              <CardDescription>Quarterly revenue breakdown across all fields</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cropRevenue.map((crop) => (
                  <div key={crop.crop}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Sprout className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold">{crop.crop}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{crop.revenue}</p>
                        <p className="text-xs text-muted-foreground">{crop.yield}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div className={`h-full ${crop.color}`} style={{ width: `${crop.percentage}%` }} />
                      </div>
                      <span className="text-sm text-muted-foreground w-12 text-right">{crop.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total Revenue</span>
                  <span className="text-xl font-bold text-primary">$284,500</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Operating Expenses */}
          <Card>
            <CardHeader>
              <CardTitle>Operating Expenses</CardTitle>
              <CardDescription>Cost breakdown for current quarter</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {expenses.map((expense) => {
                  const Icon = expense.icon
                  return (
                    <div
                      key={expense.category}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-semibold text-sm">{expense.category}</p>
                          <p className="text-xs text-muted-foreground">{expense.percentage}% of total</p>
                        </div>
                      </div>
                      <p className="font-bold">{expense.amount}</p>
                    </div>
                  )
                })}
              </div>
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total Expenses</span>
                  <span className="text-xl font-bold text-chart-5">$156,200</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Market Prices */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Current Market Prices</CardTitle>
            <CardDescription>Real-time commodity prices and trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              {marketPrices.map((item) => {
                const TrendIcon = item.trend === "up" ? TrendingUp : TrendingDown
                return (
                  <div
                    key={item.commodity}
                    className={`p-4 rounded-lg border ${
                      item.trend === "up" ? "bg-chart-2/5 border-chart-2/20" : "bg-chart-5/5 border-chart-5/20"
                    }`}
                  >
                    <p className="text-sm text-muted-foreground mb-1">{item.commodity}</p>
                    <p className="text-2xl font-bold mb-2">{item.price}</p>
                    <div className="flex items-center gap-1">
                      <TrendIcon className={`h-4 w-4 ${item.trend === "up" ? "text-chart-2" : "text-chart-5"}`} />
                      <span className={`text-sm font-medium ${item.trend === "up" ? "text-chart-2" : "text-chart-5"}`}>
                        {item.change}
                      </span>
                      <span className="text-xs text-muted-foreground ml-1">vs last week</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Insights and Forecasts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-chart-2" />
                <CardTitle>AI-Powered Insights</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-chart-2/10 border border-chart-2/20">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Badge variant="outline" className="bg-chart-2/20 text-chart-2 border-chart-2/30">
                    Opportunity
                  </Badge>
                  Wheat Price Surge
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Wheat prices up 5.2% this week. Consider accelerating Field A harvest to capitalize on favorable
                  market conditions. Projected additional revenue: $4,920.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30">
                    Optimization
                  </Badge>
                  Cost Reduction
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Irrigation costs down 8% due to recent rainfall. Maintain current water management strategy to
                  maximize savings through Q4.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-accent/20">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-5 w-5 text-accent" />
                <CardTitle>Revenue Forecast</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                  <span className="text-sm text-muted-foreground">Next Quarter (Q4)</span>
                  <span className="font-bold text-lg">$312,400</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                  <span className="text-sm text-muted-foreground">Annual Projection</span>
                  <span className="font-bold text-lg">$1,156,000</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-chart-2/10 border border-chart-2/20">
                  <span className="text-sm font-medium">Expected Growth</span>
                  <span className="font-bold text-lg text-chart-2">+15.3%</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed pt-4 border-t border-border">
                Forecast based on current market trends, historical yield data, and NASA climate predictions. Confidence
                level: 87%.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-primary/20 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Detailed Reports</CardTitle>
              <CardDescription>View comprehensive financial analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/reports">
                  View Reports
                  <ArrowUpRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-chart-2/20 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Farm Dashboard</CardTitle>
              <CardDescription>Monitor field operations</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/farm">
                  Go to Dashboard
                  <ArrowUpRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-accent/20 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Sustainability</CardTitle>
              <CardDescription>Track environmental impact</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/sustainability">
                  View Metrics
                  <ArrowUpRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
