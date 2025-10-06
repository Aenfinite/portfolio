"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Trash2, LogOut, FolderOpen, ImageIcon } from "lucide-react"
import { projectsAPI } from "@/lib/api"
import type { Project } from "@/lib/types"
import ImageUpload from "@/components/ImageUpload"

export default function AdminProjectsPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.push("/admin")
      return
    }

    loadProjects()
  }, [router])

  const loadProjects = async () => {
    try {
      const data = await projectsAPI.getAll()
      setProjects(data)
    } catch (error) {
      console.error("[v0] Failed to load projects:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return

    try {
      await projectsAPI.delete(id)
      setProjects(projects.filter((p) => p._id !== id))
    } catch (error: any) {
      alert(error.message || "Failed to delete project")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    router.push("/admin")
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-neutral-600">Loading projects...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Project Management</h1>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/admin/dashboard">
                Dashboard
              </Link>
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="images" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              Images
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-neutral-600">{projects.length} total projects</p>
              <Button asChild>
                <Link href="/admin/projects/new">
                  <Plus className="mr-2 h-4 w-4" />
                  New Project
                </Link>
              </Button>
            </div>

            {projects.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <p className="mb-4 text-neutral-600">No projects yet</p>
                  <Button asChild>
                    <Link href="/admin/projects/new">
                      <Plus className="mr-2 h-4 w-4" />
                      Create First Project
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <Card key={project._id}>
                    <CardHeader>
                      <CardTitle className="line-clamp-1">{project.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm text-neutral-600 line-clamp-2">{project.subtitle}</p>
                        <p className="mt-2 text-xs text-neutral-500">
                          Category: {project.category} • {project.published ? "Published" : "Draft"}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild className="flex-1 bg-transparent">
                          <Link href={`/admin/projects/edit/${project._id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(project._id, project.title)}
                          className="text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="images" className="space-y-6">
            <ImageUpload />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
