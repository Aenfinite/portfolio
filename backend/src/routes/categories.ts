import express from "express"
import { Category } from "../models/Category"
import { Project } from "../models/Project"
import { authenticateToken } from "../middleware/auth"

const router = express.Router()

// Get all categories (public)
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 })

    // Add project count to each category
    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const projectCount = await Project.countDocuments({
          category: category.slug,
          published: true,
        })
        return {
          ...category.toObject(),
          projectCount,
        }
      }),
    )

    res.json(categoriesWithCount)
  } catch (error) {
    console.error("Error fetching categories:", error)
    res.status(500).json({ message: "Failed to fetch categories" })
  }
})

// Get single category by slug (public)
router.get("/:slug", async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug })

    if (!category) {
      return res.status(404).json({ message: "Category not found" })
    }

    const projectCount = await Project.countDocuments({
      category: category.slug,
      published: true,
    })

    res.json({
      ...category.toObject(),
      projectCount,
    })
  } catch (error) {
    console.error("Error fetching category:", error)
    res.status(500).json({ message: "Failed to fetch category" })
  }
})

// Create category (protected)
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { name, slug, description, icon } = req.body

    if (!name || !slug) {
      return res.status(400).json({ message: "Name and slug are required" })
    }

    const existingCategory = await Category.findOne({ slug })
    if (existingCategory) {
      return res.status(400).json({ message: "Category with this slug already exists" })
    }

    const category = new Category({
      name,
      slug: slug.toLowerCase(),
      description,
      icon,
    })

    await category.save()
    res.status(201).json(category)
  } catch (error) {
    console.error("Error creating category:", error)
    res.status(500).json({ message: "Failed to create category" })
  }
})

// Update category (protected)
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { name, slug, description, icon } = req.body

    const category = await Category.findById(req.params.id)
    if (!category) {
      return res.status(404).json({ message: "Category not found" })
    }

    // Check if slug is being changed and if it's already taken
    if (slug && slug !== category.slug) {
      const existingCategory = await Category.findOne({ slug })
      if (existingCategory) {
        return res.status(400).json({ message: "Category with this slug already exists" })
      }
    }

    category.name = name || category.name
    category.slug = slug ? slug.toLowerCase() : category.slug
    category.description = description !== undefined ? description : category.description
    category.icon = icon !== undefined ? icon : category.icon

    await category.save()
    res.json(category)
  } catch (error) {
    console.error("Error updating category:", error)
    res.status(500).json({ message: "Failed to update category" })
  }
})

// Delete category (protected)
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
    if (!category) {
      return res.status(404).json({ message: "Category not found" })
    }

    // Check if any projects use this category
    const projectCount = await Project.countDocuments({ category: category.slug })
    if (projectCount > 0) {
      return res.status(400).json({
        message: `Cannot delete category. ${projectCount} project(s) are using this category.`,
      })
    }

    await Category.findByIdAndDelete(req.params.id)
    res.json({ message: "Category deleted successfully" })
  } catch (error) {
    console.error("Error deleting category:", error)
    res.status(500).json({ message: "Failed to delete category" })
  }
})

export default router
