const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      required: true,
      trim: true,
    },
    imageSrc: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    challenge: {
      type: String,
      required: true,
    },
    solution: {
      type: String,
      required: true,
    },
    results: [
      {
        type: String,
      },
    ],
    images: [
      {
        type: String,
      },
    ],
    tags: [
      {
        type: String,
      },
    ],
    technologies: [
      {
        type: String,
      },
    ],
    category: {
      type: String,
      required: true,
      enum: [
        "web-design-development",
        "mobile-app",
        "graphic-design",
        "branding",
        "logo-design",
        "packaging-design",
        "ui-ux",
      ],
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

// Index for faster queries
projectSchema.index({ category: 1, published: 1 })
projectSchema.index({ tags: 1 })

module.exports = mongoose.model("Project", projectSchema)
