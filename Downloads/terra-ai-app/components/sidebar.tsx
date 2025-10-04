"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Brain,
  BarChart3,
  GraduationCap,
  TrendingUp,
  BookOpen,
  ClipboardCheck,
  Trophy,
  Users,
  Globe,
  Home,
  ChevronRight,
  Leaf,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navGroups = [
  {
    label: "Overview",
    items: [{ href: "/", label: "Home", icon: Home }],
  },
  {
    label: "AI Intelligence",
    items: [
      { href: "/ai", label: "Dashboard", icon: Brain },
      { href: "/ai/reports", label: "Analytics & Reports", icon: BarChart3 },
    ],
  },
  {
    label: "Education",
    items: [
      { href: "/learn", label: "Learning Hub", icon: GraduationCap },
      { href: "/learn/progression", label: "Progression", icon: TrendingUp },
      { href: "/learn/modules", label: "NASA Modules", icon: BookOpen },
      { href: "/learn/assessments", label: "Assessments", icon: ClipboardCheck },
    ],
  },
  {
    label: "Community",
    items: [
      { href: "/leaderboards", label: "Leaderboards", icon: Trophy },
      { href: "/multiplayer", label: "Multiplayer", icon: Users },
      { href: "/impact", label: "Global Impact", icon: Globe },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col border-r border-border bg-card">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-border px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Leaf className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="text-xl font-bold">TerraAI</span>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-6">
          {navGroups.map((group) => (
            <div key={group.label}>
              <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {group.label}
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link key={item.href} href={item.href}>
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start gap-3 px-3",
                          isActive && "bg-secondary text-secondary-foreground font-medium",
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="flex-1 text-left">{item.label}</span>
                        {isActive && <ChevronRight className="h-4 w-4" />}
                      </Button>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* User Section */}
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs text-muted-foreground">Level 3 Strategist</p>
          </div>
        </div>
      </div>
    </div>
  )
}
