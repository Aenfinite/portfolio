"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LogOut, Plus, FolderOpen, FileText } from "lucide-react"
import { projectsAPI, categoriesAPI } from "@/lib/api"

export default function AdminDashboard() {
  const [stats, setStats] = useState({ projects: 0, categories: 0 })
  const [loading, setLoading] = useState(true)
  const [adminUser, setAdminUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    const user = localStorage.getItem("adminUser")

    if (!token) {
      router.push("/admin")
      return
    }

    if (user) {
      setAdminUser(JSON.parse(user))
    }

    loadStats()
  }, [router])

  const loadStats = async () => {
    try {
      console.log("🔍 Loading admin stats...")
      const [projects, categories] = await Promise.all([projectsAPI.getAllAdmin(), categoriesAPI.getAllAdmin()])
      
      console.log("📊 Projects response:", projects)
      console.log("📊 Categories response:", categories)
      console.log("📊 Projects length:", projects?.length)
      console.log("📊 Categories length:", categories?.length)
      
      setStats({
        projects: Array.isArray(projects) ? projects.length : 0,
        categories: Array.isArray(categories) ? categories.length : 0,
      })
    } catch (error) {
      console.error("[v0] Failed to load stats:", error)
      // Set stats to 0 on error
      setStats({
        projects: 0,
        categories: 0,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminUser")
    router.push("/admin")
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-neutral-600">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-neutral-600">Welcome back, {adminUser?.username || "Admin"}</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Total Projects
              </CardTitle>
              <CardDescription>Manage your portfolio projects</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{stats.projects}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderOpen className="h-5 w-5" />
                Total Categories
              </CardTitle>
              <CardDescription>Organize your work</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{stats.categories}</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your portfolio content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Button asChild className="h-auto flex-col items-start gap-2 p-6">
                <Link href="/admin/projects">
                  <div className="flex w-full items-center gap-2">
                    <FileText className="h-5 w-5" />
                    <span className="text-lg font-semibold">Manage Projects</span>
                  </div>
                  <p className="text-sm font-normal opacity-80">View, edit, and delete projects</p>
                </Link>
              </Button>

              <Button asChild variant="outline" className="h-auto flex-col items-start gap-2 p-6 bg-transparent">
                <Link href="/admin/projects/new">
                  <div className="flex w-full items-center gap-2">
                    <Plus className="h-5 w-5" />
                    <span className="text-lg font-semibold">Add New Project</span>
                  </div>
                  <p className="text-sm font-normal opacity-80">Create a new portfolio project</p>
                </Link>
              </Button>

              <Button asChild variant="outline" className="h-auto flex-col items-start gap-2 p-6 bg-transparent">
                <Link href="/admin/categories">
                  <div className="flex w-full items-center gap-2">
                    <FolderOpen className="h-5 w-5" />
                    <span className="text-lg font-semibold">Manage Categories</span>
                  </div>
                  <p className="text-sm font-normal opacity-80">Organize project categories</p>
                </Link>
              </Button>

              <Button asChild variant="outline" className="h-auto flex-col items-start gap-2 p-6 bg-transparent">
                <Link href="/">
                  <div className="flex w-full items-center gap-2">
                    <span className="text-lg font-semibold">View Site</span>
                  </div>
                  <p className="text-sm font-normal opacity-80">See your live portfolio</p>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
