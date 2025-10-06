const express = require("express")
const router = express.Router()
const Project = require("../models/Project")
const { PREDEFINED_CATEGORIES } = require("../constants/categories")

// Initialize predefined categories if they don't exist
async function ensurePredefinedCategories() {
  try {
    const Category = require("../models/Category")
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

// Get all categories with project counts (dynamic from database)
router.get("/", async (req, res) => {
  try {
    // Ensure predefined categories exist
    await ensurePredefinedCategories()
    
    // Fetch categories from database
    const Category = require("../models/Category")
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

// Get single category by slug (dynamic from database)
router.get("/:slug", async (req, res) => {
  try {
    // Ensure predefined categories exist
    await ensurePredefinedCategories()
    
    const Category = require("../models/Category")
    const category = await Category.findOne({ slug: req.params.slug })
    if (!category) {
      return res.status(404).json({ error: "Category not found" })
    }
    res.json(category)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch category", message: error.message })
  }
})

module.exports = router
