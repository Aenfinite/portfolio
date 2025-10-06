"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ImageIcon, Plus, Check, Upload } from "lucide-react"
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

interface ImagePickerProps {
  value: string
  onChange: (imageUrl: string) => void
  placeholder?: string
  category?: string // Auto-select category based on project category
}

export default function ImagePicker({ value, onChange, placeholder = "Select an image...", category }: ImagePickerProps) {
  const [open, setOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>(category || "")
  const [images, setImages] = useState<UploadedImage[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load images for selected category
  const loadImages = async (category: string) => {
    if (!category) return
    
    setLoading(true)
    try {
      const response = await imageAPI.getByCategory(category)
      setImages(response.images || [])
    } catch (error) {
      console.error("Failed to load images:", error)
      setImages([])
    } finally {
      setLoading(false)
    }
  }

  // Handle category change
  const handleCategoryChange = (newCategory: string) => {
    setSelectedCategory(newCategory)
    loadImages(newCategory)
  }

  // Auto-load images when dialog opens if category is provided
  useEffect(() => {
    if (open && category && selectedCategory === category) {
      loadImages(category)
    }
  }, [open, category, selectedCategory])

  // Handle image selection
  const handleImageSelect = (imageUrl: string) => {
    const fullUrl = `http://localhost:5000${imageUrl}`
    onChange(fullUrl)
    setOpen(false)
  }

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    const file = files[0]
    const targetCategory = category || selectedCategory
    
    if (!targetCategory) {
      alert("Please select a category first")
      return
    }

    setUploading(true)
    try {
      const response = await imageAPI.uploadSingle(targetCategory, file)
      
      // Auto-select the uploaded image
      const fullUrl = `http://localhost:5000${response.imageUrl}`
      onChange(fullUrl)
      
      // Refresh the images list
      await loadImages(targetCategory)
      
      // Close dialog
      setOpen(false)
    } catch (error) {
      console.error("Upload failed:", error)
      alert("Failed to upload image. Please try again.")
    } finally {
      setUploading(false)
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  // Trigger file picker
  const handleUploadClick = () => {
    const targetCategory = category || selectedCategory
    if (!targetCategory) {
      alert("Please select a category first")
      return
    }
    fileInputRef.current?.click()
  }



  // Get display value
  const displayValue = value || placeholder

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start text-left font-normal">
          <ImageIcon className="mr-2 h-4 w-4" />
          <span className="truncate">
            {value ? value.split('/').pop() : "Click to select or upload an image"}
          </span>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Select Uploaded Image</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Choose or Upload an Image</h3>
              <Button 
                onClick={handleUploadClick}
                disabled={uploading || (!category && !selectedCategory)}
                className="flex items-center gap-2"
              >
                {uploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    Upload New Image
                  </>
                )}
              </Button>
            </div>
            
            {/* Category Selection - only show if no category is pre-selected */}
            <div className="space-y-4">
              {!category ? (
                <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category..." />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Category:</span> {CATEGORIES.find(cat => cat.value === category)?.label || category}
                </div>
              )}

              {/* Images Grid */}
              {!selectedCategory ? (
                <div className="text-center py-8">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <p className="text-gray-500">Select a category to view uploaded images</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {loading ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">Loading images...</p>
                    </div>
                  ) : images.length === 0 ? (
                    <div className="text-center py-8">
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                      <p className="text-gray-500">No images uploaded in this category yet</p>
                      <p className="text-sm text-gray-400 mt-2">
                        Click "Upload New Image" above to add your first image
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
                      {images.map((image) => {
                        const fullImageUrl = `http://localhost:5000${image.imageUrl}`
                        const isSelected = value === fullImageUrl
                        
                        return (
                          <div
                            key={image.filename}
                            className={`relative group cursor-pointer border-2 rounded-lg overflow-hidden transition-all ${
                              isSelected 
                                ? "border-blue-500 ring-2 ring-blue-200" 
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => handleImageSelect(image.imageUrl)}
                          >
                            <div className="aspect-square relative">
                              <Image
                                src={fullImageUrl}
                                alt={image.filename}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                              />
                            </div>
                            
                            {/* Selection Indicator */}
                            {isSelected && (
                              <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                                <div className="bg-blue-500 text-white rounded-full p-1">
                                  <Check className="h-4 w-4" />
                                </div>
                              </div>
                            )}

                            {/* Hover Overlay */}
                            {!isSelected && (
                              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Plus className="h-6 w-6 text-white" />
                              </div>
                            )}

                            {/* Image Info */}
                            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2">
                              <p className="text-xs truncate" title={image.filename}>
                                {image.filename}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}