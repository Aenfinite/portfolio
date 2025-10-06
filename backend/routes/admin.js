const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const path = require("path")
const fs = require("fs")
const Admin = require("../models/Admin")
const Project = require("../models/Project")
const Category = require("../models/Category")
const authMiddleware = require("../middleware/auth")
const { PREDEFINED_CATEGORIES } = require("../constants/categories")
const { upload } = require("../middleware/upload")

// Admin login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    const admin = await Admin.findOne({ email })
    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const isMatch = await admin.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET || "your-secret-key-change-in-production", {
      expiresIn: "7d",
    })

    res.json({
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
      },
    })
  } catch (error) {
    res.status(500).json({ error: "Login failed", message: error.message })
  }
})

// Create admin (first time setup - should be protected in production)
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ $or: [{ email }, { username }] })
    if (existingAdmin) {
      return res.status(400).json({ error: "Admin already exists" })
    }

    const admin = new Admin({ username, email, password })
    await admin.save()

    res.status(201).json({ message: "Admin created successfully" })
  } catch (error) {
    res.status(500).json({ error: "Registration failed", message: error.message })
  }
})

// Protected routes - require authentication
router.use(authMiddleware)

// Get all projects (including unpublished)
router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 })
    res.json(projects)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects", message: error.message })
  }
})

// Create new project
router.post("/projects", async (req, res) => {
  try {
    const project = new Project(req.body)
    await project.save()
    res.status(201).json(project)
  } catch (error) {
    res.status(500).json({ error: "Failed to create project", message: error.message })
  }
})

// Update project
router.put("/projects/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!project) {
      return res.status(404).json({ error: "Project not found" })
    }
    res.json(project)
  } catch (error) {
    res.status(500).json({ error: "Failed to update project", message: error.message })
  }
})

// Delete project
router.delete("/projects/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)
    if (!project) {
      return res.status(404).json({ error: "Project not found" })
    }
    res.json({ message: "Project deleted successfully" })
  } catch (error) {
    res.status(500).json({ error: "Failed to delete project", message: error.message })
  }
})

// Category management (read-only predefined categories)

// Initialize predefined categories if they don't exist
async function ensurePredefinedCategories() {
  try {
    const existingCount = await Category.countDocuments()
    if (existingCount === 0) {
      const categories = PREDEFINED_CATEGORIES.map(cat => ({
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        icon: cat.icon
      }))
      await Category.insertMany(categories)
      console.log('✅ Predefined categories initialized')
    }
  } catch (error) {
    console.error('❌ Error ensuring predefined categories:', error)
  }
}

// Get categories from database with project counts (dynamic)
router.get("/categories", async (req, res) => {
  try {
    // Ensure predefined categories exist
    await ensurePredefinedCategories()
    
    // Fetch categories from database
    const categories = await Category.find().sort({ name: 1 })
    
    // Add project count for each category
    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const count = await Project.countDocuments({
          category: category.slug,
          published: true,
        })
        return {
          ...category.toObject(),
          projectCount: count,
        }
      }),
    )
    
    res.json(categoriesWithCount)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories", message: error.message })
  }
})

// Get category statistics
router.get("/categories/stats", async (req, res) => {
  try {
    const categories = await Category.find()
    const totalProjects = await Project.countDocuments({ published: true })
    const unpublishedProjects = await Project.countDocuments({ published: false })
    
    const stats = {
      totalCategories: categories.length,
      totalPublishedProjects: totalProjects,
      totalUnpublishedProjects: unpublishedProjects,
      predefinedCategoriesCount: PREDEFINED_CATEGORIES.length,
      categoriesInSync: categories.length === PREDEFINED_CATEGORIES.length
    }
    
    res.json(stats)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch category stats", message: error.message })
  }
})

// Validate and sync predefined categories
router.post("/categories/sync", async (req, res) => {
  try {
    // Clear existing categories
    await Category.deleteMany({})
    
    // Insert predefined categories
    const categories = PREDEFINED_CATEGORIES.map(cat => ({
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      icon: cat.icon
    }))
    
    const insertedCategories = await Category.insertMany(categories)
    
    res.json({
      message: "Categories synchronized successfully",
      count: insertedCategories.length,
      categories: insertedCategories
    })
  } catch (error) {
    res.status(500).json({ error: "Failed to sync categories", message: error.message })
  }
})

// Image upload routes

// Upload single image to specific category
router.post("/upload/:category", upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" })
    }

    // Validate category
    const validCategories = PREDEFINED_CATEGORIES.map(cat => cat.slug)
    if (!validCategories.includes(req.params.category)) {
      return res.status(400).json({ error: "Invalid category" })
    }

    const imageUrl = `/uploads/${req.params.category}/${req.file.filename}`
    
    res.json({
      message: "Image uploaded successfully",
      imageUrl: imageUrl,
      filename: req.file.filename,
      category: req.params.category,
      size: req.file.size
    })
  } catch (error) {
    res.status(500).json({ error: "Failed to upload image", message: error.message })
  }
})

// Upload multiple images to specific category
router.post("/upload/:category/multiple", upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No image files provided" })
    }

    // Validate category
    const validCategories = PREDEFINED_CATEGORIES.map(cat => cat.slug)
    if (!validCategories.includes(req.params.category)) {
      return res.status(400).json({ error: "Invalid category" })
    }

    const uploadedImages = req.files.map(file => ({
      imageUrl: `/uploads/${req.params.category}/${file.filename}`,
      filename: file.filename,
      size: file.size
    }))

    res.json({
      message: `${uploadedImages.length} images uploaded successfully`,
      images: uploadedImages,
      category: req.params.category
    })
  } catch (error) {
    res.status(500).json({ error: "Failed to upload images", message: error.message })
  }
})

// Get all images from specific category
router.get("/images/:category", async (req, res) => {
  try {
    const category = req.params.category
    
    // Validate category
    const validCategories = PREDEFINED_CATEGORIES.map(cat => cat.slug)
    if (!validCategories.includes(category)) {
      return res.status(400).json({ error: "Invalid category" })
    }

    const uploadsDir = path.join(__dirname, '../uploads', category)
    
    if (!fs.existsSync(uploadsDir)) {
      return res.json({ images: [] })
    }

    const files = fs.readdirSync(uploadsDir)
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase()
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)
    })

    const images = imageFiles.map(filename => {
      const filePath = path.join(uploadsDir, filename)
      const stats = fs.statSync(filePath)
      
      return {
        filename,
        imageUrl: `/uploads/${category}/${filename}`,
        size: stats.size,
        createdAt: stats.birthtime
      }
    }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    res.json({ 
      category,
      count: images.length,
      images 
    })
  } catch (error) {
    res.status(500).json({ error: "Failed to get images", message: error.message })
  }
})

// Get all images from all categories
router.get("/images", async (req, res) => {
  try {
    const allImages = {}
    
    for (const category of PREDEFINED_CATEGORIES) {
      const uploadsDir = path.join(__dirname, '../uploads', category.slug)
      
      if (fs.existsSync(uploadsDir)) {
        const files = fs.readdirSync(uploadsDir)
        const imageFiles = files.filter(file => {
          const ext = path.extname(file).toLowerCase()
          return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)
        })

        allImages[category.slug] = imageFiles.map(filename => {
          const filePath = path.join(uploadsDir, filename)
          const stats = fs.statSync(filePath)
          
          return {
            filename,
            imageUrl: `/uploads/${category.slug}/${filename}`,
            size: stats.size,
            createdAt: stats.birthtime
          }
        }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      } else {
        allImages[category.slug] = []
      }
    }

    const totalImages = Object.values(allImages).reduce((total, categoryImages) => total + categoryImages.length, 0)
    
    res.json({
      totalImages,
      categories: allImages
    })
  } catch (error) {
    res.status(500).json({ error: "Failed to get images", message: error.message })
  }
})

// Delete image
router.delete("/images/:category/:filename", async (req, res) => {
  try {
    const { category, filename } = req.params
    
    // Validate category
    const validCategories = PREDEFINED_CATEGORIES.map(cat => cat.slug)
    if (!validCategories.includes(category)) {
      return res.status(400).json({ error: "Invalid category" })
    }

    const filePath = path.join(__dirname, '../uploads', category, filename)
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Image not found" })
    }

    fs.unlinkSync(filePath)
    
    res.json({
      message: "Image deleted successfully",
      filename,
      category
    })
  } catch (error) {
    res.status(500).json({ error: "Failed to delete image", message: error.message })
  }
})

module.exports = router
