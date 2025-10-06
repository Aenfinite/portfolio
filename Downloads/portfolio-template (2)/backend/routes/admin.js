const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const Admin = require("../models/Admin")
const Project = require("../models/Project")
const Category = require("../models/Category")
const authMiddleware = require("../middleware/auth")
const { PREDEFINED_CATEGORIES } = require("../constants/categories")

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

module.exports = router
