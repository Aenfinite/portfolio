const mongoose = require("mongoose")
const Category = require("../models/Category")
const { PREDEFINED_CATEGORIES } = require("../constants/categories")
const dotenv = require("dotenv")

dotenv.config()

// Script to initialize predefined categories in the database
async function initializeCategories() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://aenfinitee:aenfinitee@cluster0.4y3vjsz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    console.log("✅ Connected to MongoDB")

    // Clear existing categories
    await Category.deleteMany({})
    console.log("🗑️ Cleared existing categories")

    // Insert predefined categories
    const categories = PREDEFINED_CATEGORIES.map(cat => ({
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      icon: cat.icon
    }))

    await Category.insertMany(categories)
    console.log("✅ Predefined categories initialized:", categories.length)

    // List all categories
    const allCategories = await Category.find().sort({ name: 1 })
    console.log("\n📋 Current categories:")
    allCategories.forEach(cat => {
      console.log(`  ${cat.icon} ${cat.name} (${cat.slug})`)
    })

  } catch (error) {
    console.error("❌ Error initializing categories:", error)
  } finally {
    await mongoose.connection.close()
    console.log("🔌 Database connection closed")
  }
}

// Run the script if called directly
if (require.main === module) {
  initializeCategories()
}

module.exports = { initializeCategories }