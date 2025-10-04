"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Advantages() {
  const differentiators = [
    "Real NASA Data Integration (not simulated)",
    "AI-Powered Decision Support (actionable intelligence)",
    "Comprehensive Educational Framework (basic to expert)",
    "Multi-scale Application (farm to regional planning)",
    "Proven Impact Measurement (quantifiable learning outcomes)",
  ]

  const innovations = [
    "First agricultural game with real-time satellite data",
    "Advanced AI that learns from collective player decisions",
    "AR integration bridging digital and physical farming",
    "Voice-first interface for field-level accessibility",
  ]

  return (
    <section aria-labelledby="advantages" className="w-full">
      <header className="mb-6">
        <h2 id="advantages" className="text-pretty text-2xl font-semibold tracking-tight">
          Competitive Advantages
        </h2>
        <p className="text-muted-foreground">What makes Terra AI different and hard to replicate.</p>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-balance">Unique Differentiators</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {differentiators.map((item) => (
              <div key={item} className="flex items-start gap-2">
                <Badge variant="secondary" className="shrink-0">
                  Key
                </Badge>
                <p className="text-muted-foreground">{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-balance">Technology Innovations</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {innovations.map((item) => (
              <div key={item} className="flex items-start gap-2">
                <Badge variant="outline" className="shrink-0">
                  New
                </Badge>
                <p className="text-muted-foreground">{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default Advantages
