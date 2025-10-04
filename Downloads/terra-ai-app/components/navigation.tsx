"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Brain, GraduationCap, Trophy, Users, Globe, Menu, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navItems = [
  { href: "/farm", label: "Farm Hub", icon: Brain },
  { href: "/dashboard", label: "NASA Game", icon: Users },
  { href: "/setup", label: "API Setup", icon: Settings },
  { href: "/learn", label: "Learn", icon: GraduationCap },
  { href: "/leaderboards", label: "Leaderboards", icon: Trophy },
  { href: "/impact", label: "Impact", icon: Globe },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">T</span>
            </div>
            <span className="text-xl font-bold">TerraAI</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname?.startsWith(item.href)
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    size="sm"
                    className={cn("gap-2", isActive && "bg-secondary text-secondary-foreground")}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden md:flex">
            Sign In
          </Button>
          <Button size="sm" className="hidden md:flex">
            Get Started
          </Button>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname?.startsWith(item.href)
                  return (
                    <Link key={item.href} href={item.href}>
                      <Button variant={isActive ? "secondary" : "ghost"} className="w-full justify-start gap-2">
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </Button>
                    </Link>
                  )
                })}
                <div className="mt-4 flex flex-col gap-2">
                  <Button variant="outline" className="w-full bg-transparent">
                    Sign In
                  </Button>
                  <Button className="w-full">Get Started</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
