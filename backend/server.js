const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Initialize predefined categories
async function initializePredefinedCategories() {
  try {
    const Category = require("./models/Category")
    const { PREDEFINED_CATEGORIES } = require("./constants/categories")
    
    const existingCount = await Category.countDocuments()
    if (existingCount === 0) {
      const categories = PREDEFINED_CATEGORIES.map(cat => ({
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        icon: cat.icon
      }))
      await Category.insertMany(categories)
      console.log(`✅ Initialized ${categories.length} predefined categories`)
    } else {
      console.log(`✅ Found ${existingCount} existing categories in database`)
    }
  } catch (error) {
    console.error("❌ Error initializing predefined categories:", error)
  }
}

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb+srv://aenfinitee:aenfinitee@cluster0.4y3vjsz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("✅ MongoDB connected successfully")
    // Initialize predefined categories after connection
    await initializePredefinedCategories()
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err))

// Routes
app.use("/api/projects", require("./routes/projects"))
app.use("/api/categories", require("./routes/categories"))
app.use("/api/admin", require("./routes/admin"))

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: "Something went wrong!", message: err.message })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
