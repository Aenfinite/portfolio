"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Plus, X } from "lucide-react"
import { projectsAPI, categoriesAPI } from "@/lib/api"
import type { Category } from "@/lib/types"

export default function NewProjectPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    imageSrc: "",
    description: "",
    challenge: "",
    solution: "",
    results: [""],
    images: [""],
    tags: [""],
    technologies: [""],
    liveUrl: "",
    githubUrl: "",
    gradientFrom: "#e0e7ff",
    gradientTo: "#c7d2fe",
    priority: false,
    category: "",
    published: true,
  })

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.push("/admin")
      return
    }

    loadCategories()
  }, [router])

  const loadCategories = async () => {
    try {
      const data = await categoriesAPI.getAll()
      setCategories(data)
      // Set first category as default if available
      if (data.length > 0) {
        setFormData((prev) => ({ ...prev, category: data[0].slug }))
      }
    } catch (error) {
      console.error("[v0] Failed to load categories:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const cleanedData = {
        ...formData,
        results: formData.results.filter((r) => r.trim()),
        images: formData.images.filter((i) => i.trim()),
        tags: formData.tags.filter((t) => t.trim()),
        technologies: formData.technologies.filter((t) => t.trim()),
      }

      await projectsAPI.create(cleanedData)
      router.push("/admin/projects")
    } catch (error: any) {
      alert(error.message || "Failed to create project")
    } finally {
      setSaving(false)
    }
  }

  const addArrayItem = (field: keyof typeof formData) => {
    setFormData({
      ...formData,
      [field]: [...(formData[field] as string[]), ""],
    })
  }

  const removeArrayItem = (field: keyof typeof formData, index: number) => {
    const array = formData[field] as string[]
    setFormData({
      ...formData,
      [field]: array.filter((_, i) => i !== index),
    })
  }

  const updateArrayItem = (field: keyof typeof formData, index: number, value: string) => {
    const array = [...(formData[field] as string[])]
    array[index] = value
    setFormData({ ...formData, [field]: array })
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/projects">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">New Project</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle *</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageSrc">Main Image URL *</Label>
                <Input
                  id="imageSrc"
                  value={formData.imageSrc}
                  onChange={(e) => setFormData({ ...formData, imageSrc: e.target.value })}
                  placeholder="/images/project-1.webp"
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.length === 0 ? (
                        <SelectItem value="none" disabled>
                          No categories available
                        </SelectItem>
                      ) : (
                        categories.map((cat) => (
                          <SelectItem key={cat._id} value={cat.slug}>
                            {cat.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  {categories.length === 0 && (
                    <p className="text-xs text-neutral-500">
                      <Link href="/admin/categories/new" className="text-blue-600 hover:underline">
                        Create a category first
                      </Link>
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between space-x-2 pt-8">
                  <Label htmlFor="published">Published</Label>
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="challenge">Challenge *</Label>
                <Textarea
                  id="challenge"
                  value={formData.challenge}
                  onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="solution">Solution *</Label>
                <Textarea
                  id="solution"
                  value={formData.solution}
                  onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                  rows={4}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.results.map((result, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={result}
                    onChange={(e) => updateArrayItem("results", index, e.target.value)}
                    placeholder="Result item"
                  />
                  {formData.results.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeArrayItem("results", index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" onClick={() => addArrayItem("results")}>
                <Plus className="mr-2 h-4 w-4" />
                Add Result
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Images</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.images.map((image, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={image}
                    onChange={(e) => updateArrayItem("images", index, e.target.value)}
                    placeholder="/images/project-detail-1.jpg"
                  />
                  {formData.images.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeArrayItem("images", index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" onClick={() => addArrayItem("images")}>
                <Plus className="mr-2 h-4 w-4" />
                Add Image
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tags & Technologies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Tags</Label>
                {formData.tags.map((tag, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={tag}
                      onChange={(e) => updateArrayItem("tags", index, e.target.value)}
                      placeholder="Tag name"
                    />
                    {formData.tags.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeArrayItem("tags", index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={() => addArrayItem("tags")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Tag
                </Button>
              </div>

              <div className="space-y-4">
                <Label>Technologies</Label>
                {formData.technologies.map((tech, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={tech}
                      onChange={(e) => updateArrayItem("technologies", index, e.target.value)}
                      placeholder="Technology name"
                    />
                    {formData.technologies.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeArrayItem("technologies", index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={() => addArrayItem("technologies")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Technology
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Links & Styling</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="liveUrl">Live URL</Label>
                <Input
                  id="liveUrl"
                  value={formData.liveUrl}
                  onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="githubUrl">GitHub URL</Label>
                <Input
                  id="githubUrl"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  placeholder="https://github.com/username/repo"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="gradientFrom">Gradient From</Label>
                  <Input
                    id="gradientFrom"
                    type="color"
                    value={formData.gradientFrom}
                    onChange={(e) => setFormData({ ...formData, gradientFrom: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gradientTo">Gradient To</Label>
                  <Input
                    id="gradientTo"
                    type="color"
                    value={formData.gradientTo}
                    onChange={(e) => setFormData({ ...formData, gradientTo: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="priority">Priority Loading</Label>
                <Switch
                  id="priority"
                  checked={formData.priority}
                  onCheckedChange={(checked) => setFormData({ ...formData, priority: checked })}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button type="submit" disabled={saving || categories.length === 0} className="flex-1">
              {saving ? "Creating..." : "Create Project"}
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link href="/admin/projects">Cancel</Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
