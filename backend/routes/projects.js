const express = require("express")
const router = express.Router()
const Project = require("../models/Project")

// Get all published projects
router.get("/", async (req, res) => {
  try {
    const { category, tags } = req.query
    const filter = { published: true }

    if (category) {
      filter.category = category
    }

    if (tags) {
      filter.tags = { $in: tags.split(",") }
    }

    const projects = await Project.find(filter).sort({ createdAt: -1 })
    res.json(projects)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects", message: error.message })
  }
})

// Get single project by ID
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    if (!project) {
      return res.status(404).json({ error: "Project not found" })
    }
    res.json(project)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch project", message: error.message })
  }
})

module.exports = router
