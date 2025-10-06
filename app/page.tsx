"use client"

import HeroSection from "@/components/HeroSection"
import PortfolioSection from "@/components/PortfolioSection"
import TestimonialsSection from "@/components/TestimonialsSection"
import ContactSection from "@/components/ContactSection"

export default function HomePage() {
  return (
    <main className="w-full overflow-x-hidden">
      <HeroSection />
      <PortfolioSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  )
}
