"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, X, Image as ImageIcon, Trash2, Eye } from "lucide-react"
import { imageAPI } from "@/lib/api"
import Image from "next/image"

const CATEGORIES = [
  { value: "packaging-design", label: "Packaging Design" },
  { value: "ui-ux", label: "UI/UX Design" },
  { value: "mobile-app", label: "Mobile App" },
  { value: "graphic-design", label: "Graphic Design" },
  { value: "logo-design", label: "Logo Design" },
  { value: "web-design-development", label: "Web Design & Development" },
  { value: "branding", label: "Branding" },
]

interface UploadedImage {
  filename: string
  imageUrl: string
  size: number
  createdAt: string
}

interface ImageUploadProps {
  onImageUploaded?: (imageUrl: string) => void
}

export default function ImageUpload({ onImageUploaded }: ImageUploadProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [uploading, setUploading] = useState(false)
  const [images, setImages] = useState<UploadedImage[]>([])
  const [loadingImages, setLoadingImages] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  // Load images for selected category
  const loadImages = async (category: string) => {
    if (!category) return
    
    setLoadingImages(true)
    try {
      const response = await imageAPI.getByCategory(category)
      setImages(response.images || [])
    } catch (error) {
      console.error("Failed to load images:", error)
      setImages([])
    } finally {
      setLoadingImages(false)
    }
  }

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    loadImages(category)
  }

  // Handle file upload
  const handleUpload = async (files: FileList) => {
    if (!selectedCategory) {
      alert("Please select a category first")
      return
    }

    setUploading(true)
    try {
      const fileArray = Array.from(files)
      
      if (fileArray.length === 1) {
        const result = await imageAPI.uploadSingle(selectedCategory, fileArray[0])
        setImages(prev => [result, ...prev])
        onImageUploaded?.(result.imageUrl)
      } else {
        const result = await imageAPI.uploadMultiple(selectedCategory, fileArray)
        setImages(prev => [...result.images, ...prev])
        result.images.forEach((img: any) => onImageUploaded?.(img.imageUrl))
      }
      
      // Refresh images list
      await loadImages(selectedCategory)
    } catch (error: any) {
      alert(error.message || "Failed to upload images")
    } finally {
      setUploading(false)
    }
  }

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleUpload(files)
    }
  }

  // Handle drag and drop
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files)
    }
  }, [selectedCategory])

  // Delete image
  const handleDelete = async (filename: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return

    try {
      await imageAPI.delete(selectedCategory, filename)
      setImages(prev => prev.filter(img => img.filename !== filename))
    } catch (error: any) {
      alert(error.message || "Failed to delete image")
    }
  }

  // Copy image URL
  const copyImageUrl = (imageUrl: string) => {
    const fullUrl = `http://localhost:5000${imageUrl}`
    navigator.clipboard.writeText(fullUrl)
    alert("Image URL copied to clipboard!")
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          Image Upload & Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Category</label>
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a category..." />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Upload Area */}
        {selectedCategory && (
          <div className="space-y-4">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="space-y-4">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div>
                  <p className="text-lg font-medium">
                    Drag and drop images here, or click to select
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports JPG, PNG, GIF, WEBP (max 10MB each)
                  </p>
                </div>
                <div className="flex justify-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById("file-upload")?.click()}
                    disabled={uploading}
                  >
                    {uploading ? "Uploading..." : "Select Files"}
                  </Button>
                </div>
              </div>
            </div>

            <input
              id="file-upload"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={uploading}
            />
          </div>
        )}

        {/* Images Grid */}
        {selectedCategory && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">
                Uploaded Images ({images.length})
              </h3>
              {images.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => loadImages(selectedCategory)}
                  disabled={loadingImages}
                >
                  {loadingImages ? "Loading..." : "Refresh"}
                </Button>
              )}
            </div>

            {loadingImages ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Loading images...</p>
              </div>
            ) : images.length === 0 ? (
              <div className="text-center py-8">
                <ImageIcon className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <p className="text-gray-500">No images uploaded yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image) => (
                  <div
                    key={image.filename}
                    className="group relative bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-square relative">
                      <Image
                        src={`http://localhost:5000${image.imageUrl}`}
                        alt={image.filename}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      />
                    </div>
                    
                    {/* Image Actions */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => copyImageUrl(image.imageUrl)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(image.filename)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Image Info */}
                    <div className="p-2">
                      <p className="text-xs text-gray-600 truncate" title={image.filename}>
                        {image.filename}
                      </p>
                      <p className="text-xs text-gray-400">
                        {(image.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}