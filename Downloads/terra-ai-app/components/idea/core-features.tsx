"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function CoreFeatures() {
  const features = [
    {
      title: "Gameplay",
      description:
        "Manage multi-scale farms, adapt to real-time weather and seasons, and balance resources, markets, and sustainability.",
    },
    {
      title: "AI Decision Support",
      description:
        "Get actionable recommendations for yield, irrigation, and pest risk using predictive and reinforcement learning models.",
    },
    {
      title: "NASA Data",
      description:
        "Use real satellite data streams (e.g., SMAP, MODIS/VIIRS, GPM) for soil moisture, vegetation health, and precipitation.",
    },
    {
      title: "Education",
      description:
        "Progress through guided learning paths from basics to expert, with assessments and real-world impact tracking.",
    },
  ]

  return (
    <section aria-labelledby="core-features" className="w-full">
      <header className="mb-6">
        <h2 id="core-features" className="text-pretty text-2xl font-semibold tracking-tight">
          Core Features
        </h2>
        <p className="text-muted-foreground">
          The foundation of Terra AI blends authentic data, intelligent guidance, and hands-on strategy.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {features.map((f) => (
          <Card key={f.title} className="bg-card">
            <CardHeader>
              <CardTitle className="text-balance">{f.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{f.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default CoreFeatures
