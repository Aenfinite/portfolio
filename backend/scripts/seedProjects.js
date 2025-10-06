const mongoose = require("mongoose")
const Project = require("../models/Project")
const Category = require("../models/Category")
const { PREDEFINED_CATEGORIES } = require("../constants/categories")
const dotenv = require("dotenv")

dotenv.config()

// Sample projects data for each category
const SAMPLE_PROJECTS = [
  // Web Design & Development
  {
    title: "Modern SaaS Dashboard",
    subtitle: "Complete redesign of analytics platform",
    imageSrc: "/modern-saas-dashboard.png",
    description: "A comprehensive redesign of a SaaS analytics platform focused on user experience and data visualization.",
    challenge: "The existing platform had poor user engagement and confusing navigation that was affecting customer retention.",
    solution: "Implemented a modern, intuitive interface with improved data visualization and streamlined workflows.",
    results: [
      "40% increase in user engagement",
      "25% reduction in support tickets",      
      "Improved customer satisfaction scores"
    ],
    images: [
      "/modern-saas-dashboard.png",
      "/analytics-dashboard.png",
      "/analytics-reports.jpg"
    ],
    tags: ["Web Design", "SaaS", "Dashboard", "Analytics"],
    technologies: ["React", "TypeScript", "D3.js", "Node.js"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example/project",
    gradientFrom: "#667eea",
    gradientTo: "#764ba2",
    priority: true,
    category: "web-design-development",
    published: true
  },
  {
    title: "E-commerce Homepage",
    subtitle: "Streetwear brand online presence",
    imageSrc: "/streetwear-ecommerce-homepage.jpg",
    description: "Modern e-commerce homepage design for streetwear brand with focus on visual storytelling.",
    challenge: "Create a compelling online presence that reflects the brand's urban aesthetic and drives conversions.",
    solution: "Designed a bold, visually-driven homepage with seamless shopping experience and brand storytelling.",
    results: [
      "60% increase in conversion rate",
      "45% boost in average session duration",
      "Successful brand repositioning"
    ],
    images: [
      "/streetwear-ecommerce-homepage.jpg",
      "/product-gallery-streetwear.jpg",
      "/mobile-shopping-cart.jpg"
    ],
    tags: ["E-commerce", "Fashion", "Streetwear", "Branding"],
    technologies: ["Next.js", "Shopify", "SCSS", "Framer Motion"],
    liveUrl: "",
    githubUrl: "",
    gradientFrom: "#f093fb",
    gradientTo: "#f5576c",
    priority: false,
    category: "web-design-development",
    published: true
  },

  // Mobile App
  {
    title: "Fitness Tracking App",
    subtitle: "Comprehensive health and fitness companion",
    imageSrc: "/fitness-tracking-app.png",
    description: "A comprehensive fitness tracking application with workout planning, nutrition tracking, and progress monitoring.",
    challenge: "Users needed an all-in-one solution for fitness tracking that was both comprehensive and easy to use.",
    solution: "Developed an intuitive mobile app with personalized workout plans, nutrition tracking, and social features.",
    results: [
      "50,000+ downloads in first month",
      "4.8 star rating on app stores",
      "85% user retention rate"
    ],
    images: [
      "/fitness-tracking-app.png",
      "/ecommerce-shopping-mobile-app.jpg",
      "/social-media-mobile-app.jpg"
    ],
    tags: ["Mobile App", "Fitness", "Health", "iOS", "Android"],
    technologies: ["React Native", "Firebase", "Redux", "Node.js"],
    liveUrl: "https://apps.apple.com/example",
    githubUrl: "",
    gradientFrom: "#4facfe",
    gradientTo: "#00f2fe",
    priority: true,
    category: "mobile-app",
    published: true
  },
  {
    title: "Mobile Banking App",
    subtitle: "Secure and intuitive banking experience",
    imageSrc: "/mobile-banking-app.png",
    description: "Complete mobile banking application with advanced security features and seamless user experience.",
    challenge: "Create a secure, user-friendly banking app that builds trust while providing comprehensive financial services.",
    solution: "Designed an intuitive interface with biometric authentication, real-time notifications, and comprehensive financial tools.",
    results: [
      "200,000+ active users",
      "99.9% uptime reliability",
      "Reduced customer service calls by 35%"
    ],
    images: [
      "/mobile-banking-app.png",
      "/mobile-banking-app-dashboard.jpg",
      "/mobile-banking-transactions.jpg",
      "/mobile-banking-analytics.jpg"
    ],
    tags: ["Fintech", "Banking", "Security", "Mobile"],
    technologies: ["Flutter", "Firebase", "AWS", "Blockchain"],
    liveUrl: "",
    githubUrl: "",
    gradientFrom: "#667eea",
    gradientTo: "#764ba2",
    priority: false,
    category: "mobile-app",
    published: true
  },

  // UI/UX Design
  {
    title: "Healthcare App UI Design",
    subtitle: "Patient-centered healthcare interface",
    imageSrc: "/healthcare-app-ui-design.jpg",
    description: "Comprehensive UI/UX design for a healthcare application focused on patient engagement and care management.",
    challenge: "Design an accessible healthcare interface that works for users of all ages and technical abilities.",
    solution: "Created an intuitive, accessible design system with clear navigation and emergency-focused features.",
    results: [
      "Improved patient engagement by 70%",
      "Reduced appointment no-shows by 30%",
      "Enhanced accessibility compliance"
    ],
    images: [
      "/healthcare-app-ui-design.jpg",
      "/healthcare-patient-portal.png",
      "/patient-health-records.jpg",
      "/medical-appointments-calendar.jpg"
    ],
    tags: ["Healthcare", "UI/UX", "Accessibility", "Patient Care"],
    technologies: ["Figma", "Adobe XD", "Principle", "InVision"],
    liveUrl: "",
    githubUrl: "",
    gradientFrom: "#a8edea",
    gradientTo: "#fed6e3",
    priority: true,
    category: "ui-ux",
    published: true
  },
  {
    title: "E-learning Platform UI",
    subtitle: "Modern online education experience",
    imageSrc: "/elearning-platform-ui-design.jpg",
    description: "Complete UI/UX design for an e-learning platform with focus on student engagement and learning outcomes.",
    challenge: "Create an engaging learning environment that keeps students motivated and facilitates effective knowledge transfer.",
    solution: "Designed a gamified learning interface with progress tracking, interactive elements, and personalized learning paths.",
    results: [
      "40% increase in course completion rates",
      "Better student satisfaction scores",
      "Reduced learning curve for new users"
    ],
    images: [
      "/elearning-platform-ui-design.jpg",
      "/interactive-design-gallery.jpg",
      "/data-visualization-graphs.jpg"
    ],
    tags: ["E-learning", "Education", "UI/UX", "Gamification"],
    technologies: ["Sketch", "Figma", "Principle", "Zeplin"],
    liveUrl: "",
    githubUrl: "",
    gradientFrom: "#ffecd2",
    gradientTo: "#fcb69f",
    priority: false,
    category: "ui-ux",
    published: true
  },

  // Graphic Design
  {
    title: "Magazine Layout Design",
    subtitle: "Editorial design for lifestyle publication",
    imageSrc: "/magazine-layout-design.jpg",
    description: "Complete magazine layout design for a lifestyle publication with focus on visual hierarchy and readability.",
    challenge: "Create engaging layouts that enhance readability while maintaining the publication's premium brand image.",
    solution: "Developed a flexible grid system with sophisticated typography and strategic use of white space.",
    results: [
      "25% increase in reader engagement",
      "Improved brand recognition",
      "Award-winning design recognition"
    ],
    images: [
      "/magazine-layout-design.jpg",
      "/creative-portfolio-homepage-with-animations.jpg",
      "/portfolio-project-showcase.jpg"
    ],
    tags: ["Print Design", "Editorial", "Typography", "Layout"],
    technologies: ["InDesign", "Photoshop", "Illustrator"],
    liveUrl: "",
    githubUrl: "",
    gradientFrom: "#ffecd2",
    gradientTo: "#fcb69f",
    priority: true,
    category: "graphic-design",
    published: true
  },
  {
    title: "Social Media Graphics",
    subtitle: "Brand-consistent social media templates",
    imageSrc: "/social-media-graphics-templates.jpg",
    description: "Comprehensive social media graphics package with templates for various platforms and campaigns.",
    challenge: "Create versatile graphics that maintain brand consistency across multiple social media platforms.",
    solution: "Developed a modular design system with templates optimized for different platforms and content types.",
    results: [
      "300% increase in social engagement",
      "Consistent brand presence across platforms",
      "Streamlined content creation process"
    ],
    images: [
      "/social-media-graphics-templates.jpg",
      "/event-branding-materials.jpg"
    ],
    tags: ["Social Media", "Templates", "Branding", "Marketing"],
    technologies: ["Photoshop", "Illustrator", "Canva"],
    liveUrl: "",
    githubUrl: "",
    gradientFrom: "#667eea",
    gradientTo: "#764ba2",
    priority: false,
    category: "graphic-design",
    published: true
  },

  // Branding
  {
    title: "Fintech Company Branding",
    subtitle: "Complete brand identity for financial startup",
    imageSrc: "/fintech-company-branding.jpg",
    description: "Comprehensive brand identity design for a fintech startup including logo, color palette, and brand guidelines.",
    challenge: "Create a trustworthy yet innovative brand identity that appeals to both traditional and tech-savvy customers.",
    solution: "Developed a sophisticated brand system that balances professionalism with modern innovation.",
    results: [
      "Successful Series A funding round",
      "Strong brand recognition in fintech space",
      "Consistent brand application across touchpoints"
    ],
    images: [
      "/fintech-company-branding.jpg",
      "/modern-tech-startup-logo-design.jpg"
    ],
    tags: ["Branding", "Fintech", "Logo Design", "Brand Identity"],
    technologies: ["Illustrator", "Photoshop", "InDesign"],
    liveUrl: "",
    githubUrl: "",
    gradientFrom: "#667eea",
    gradientTo: "#764ba2",
    priority: true,
    category: "branding",
    published: true
  },
  {
    title: "Craft Brewery Brand Design",
    subtitle: "Artisanal beer brand identity",
    imageSrc: "/craft-brewery-brand-design.jpg",
    description: "Complete brand identity for craft brewery including logo design, packaging, and marketing materials.",
    challenge: "Create a distinctive brand that stands out in the competitive craft beer market while honoring brewing traditions.",
    solution: "Designed an authentic brand identity that combines traditional brewing heritage with contemporary design aesthetics.",
    results: [
      "Successful product launch in 5 states",
      "Award-winning packaging design",
      "Strong local brand recognition"
    ],
    images: [
      "/craft-brewery-brand-design.jpg",
      "/brand-campaign-poster-design.jpg"
    ],
    tags: ["Branding", "Packaging", "Craft Beer", "Logo Design"],
    technologies: ["Illustrator", "Photoshop", "InDesign"],
    liveUrl: "",
    githubUrl: "",
    gradientFrom: "#f093fb",
    gradientTo: "#f5576c",
    priority: false,
    category: "branding",
    published: true
  },

  // Logo Design
  {
    title: "Luxury Fashion Logo",
    subtitle: "Elegant logo for high-end fashion brand",
    imageSrc: "/luxury-fashion-logo.png",
    description: "Sophisticated logo design for luxury fashion brand with emphasis on elegance and timeless appeal.",
    challenge: "Create a logo that conveys luxury and sophistication while remaining versatile across different applications.",
    solution: "Designed a minimalist yet distinctive logo with custom typography and refined visual elements.",
    results: [
      "Strong brand recognition in luxury market",
      "Successful international expansion",
      "Increased brand value and prestige"
    ],
    images: [
      "/luxury-fashion-logo.png",
      "/fitness-gym-logo-design.jpg"
    ],
    tags: ["Logo Design", "Luxury", "Fashion", "Typography"],
    technologies: ["Illustrator", "Photoshop"],
    liveUrl: "",
    githubUrl: "",
    gradientFrom: "#667eea",
    gradientTo: "#764ba2",
    priority: true,
    category: "logo-design",
    published: true
  },
  {
    title: "Restaurant Logo Design",
    subtitle: "Modern identity for farm-to-table restaurant",
    imageSrc: "/restaurant-logo.png",
    description: "Logo design for farm-to-table restaurant emphasizing fresh, local ingredients and sustainable practices.",
    challenge: "Create a logo that communicates the restaurant's commitment to sustainability and quality ingredients.",
    solution: "Designed an organic, nature-inspired logo with earthy colors and hand-crafted typography.",
    results: [
      "Successful restaurant opening",
      "Strong local community support",
      "Consistent brand recognition"
    ],
    images: [
      "/restaurant-logo.png"
    ],
    tags: ["Logo Design", "Restaurant", "Sustainability", "Local"],
    technologies: ["Illustrator", "Photoshop"],
    liveUrl: "",
    githubUrl: "",
    gradientFrom: "#a8edea",
    gradientTo: "#fed6e3",
    priority: false,
    category: "logo-design",
    published: true
  },

  // Packaging Design
  {
    title: "Luxury Chocolate Box Design",
    subtitle: "Premium packaging for artisan chocolates",
    imageSrc: "/luxury-chocolate-box-design.jpg",
    description: "Elegant packaging design for premium chocolate brand with focus on unboxing experience and brand storytelling.",
    challenge: "Create packaging that reflects the premium quality of the product while ensuring practical functionality.",
    solution: "Designed sophisticated packaging with premium materials, elegant typography, and attention to unboxing experience.",
    results: [
      "40% increase in gift purchases",
      "Premium positioning in market",
      "Enhanced customer experience"
    ],
    images: [
      "/luxury-chocolate-box-design.jpg",
      "/coffee-bag-packaging-design.jpg"
    ],
    tags: ["Packaging", "Luxury", "Chocolate", "Premium"],
    technologies: ["Illustrator", "Photoshop", "3D Modeling"],
    liveUrl: "",
    githubUrl: "",
    gradientFrom: "#667eea",
    gradientTo: "#764ba2",
    priority: true,
    category: "packaging-design",
    published: true
  },
  {
    title: "Organic Skincare Packaging",
    subtitle: "Sustainable packaging for natural skincare line",
    imageSrc: "/organic-skincare-product-packaging.jpg",
    description: "Eco-friendly packaging design for organic skincare products with emphasis on sustainability and natural ingredients.",
    challenge: "Design packaging that communicates the brand's commitment to natural ingredients and environmental responsibility.",
    solution: "Created minimalist, eco-friendly packaging using sustainable materials and earth-inspired design elements.",
    results: [
      "Successful product line launch",
      "Strong brand differentiation",
      "Positive environmental impact recognition"
    ],
    images: [
      "/organic-skincare-product-packaging.jpg"
    ],
    tags: ["Packaging", "Organic", "Skincare", "Sustainable"],
    technologies: ["Illustrator", "Photoshop", "InDesign"],
    liveUrl: "",
    githubUrl: "",
    gradientFrom: "#a8edea",
    gradientTo: "#fed6e3",
    priority: false,
    category: "packaging-design",
    published: true
  }
]

// Script to seed sample projects
async function seedProjects() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://aenfinitee:aenfinitee@cluster0.4y3vjsz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    console.log("✅ Connected to MongoDB")

    // Clear existing projects (optional - comment out if you want to keep existing projects)
    // await Project.deleteMany({})
    // console.log("🗑️ Cleared existing projects")

    // Check if projects already exist
    const existingCount = await Project.countDocuments()
    if (existingCount > 0) {
      console.log(`📊 Found ${existingCount} existing projects. Skipping seed...`)
      console.log("💡 To force reseed, uncomment the deleteMany line in the script")
      return
    }

    // Insert sample projects
    const insertedProjects = await Project.insertMany(SAMPLE_PROJECTS)
    console.log(`✅ Seeded ${insertedProjects.length} sample projects`)

    // Show breakdown by category
    const categories = await Promise.all(
      PREDEFINED_CATEGORIES.map(async (cat) => {
        const count = await Project.countDocuments({ category: cat.slug, published: true })
        return { name: cat.name, count }
      })
    )

    console.log("\n📋 Projects by category:")
    categories.forEach(cat => {
      console.log(`  ${cat.name}: ${cat.count} projects`)
    })

    console.log("\n🎉 Sample data seeding completed successfully!")

  } catch (error) {
    console.error("❌ Error seeding projects:", error)
  } finally {
    await mongoose.connection.close()
    console.log("🔌 Database connection closed")
  }
}

// Run the script if called directly
if (require.main === module) {
  seedProjects()
}

module.exports = { seedProjects, SAMPLE_PROJECTS }