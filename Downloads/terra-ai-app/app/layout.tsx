import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import Plasma from "@/components/plasma"
export const metadata: Metadata = {
  title: "TerraAI - Revolutionary NASA-Powered Agricultural Simulation",
  description: "Experience the future of farming with TerraAI. Advanced AI-powered agricultural simulation using real NASA satellite data, machine learning, and cutting-edge visualization technology.",
  keywords: "agriculture, farming, NASA, AI, machine learning, simulation, SMAP, MODIS, satellite data, precision agriculture",
  generator: "TerraAI",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Analytics />
        <div className="fixed inset-0 z-0 bg-black">
          <Plasma
            color="#0066ffff"
            speed={0.8}
            direction="forward"
            scale={1.5}
            opacity={0.3}
            mouseInteractive={true}
          />
        </div>
        <div className="relative z-10">
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </div>
      </body>
    </html>
  )
}
