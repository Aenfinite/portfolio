const multer = require('multer')
const path = require('path')
const fs = require('fs')

// Create uploads directory structure
const createUploadDirs = () => {
  const baseDir = path.join(__dirname, '../uploads')
  const categories = [
    'packaging-design',
    'ui-ux', 
    'mobile-app',
    'graphic-design',
    'logo-design',
    'web-design-development',
    'branding'
  ]

  // Create base uploads directory
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true })
  }

  // Create category directories
  categories.forEach(category => {
    const categoryDir = path.join(baseDir, category)
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true })
    }
  })
}

// Initialize directories
createUploadDirs()

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const category = req.body.category || req.params.category || 'general'
    let uploadPath = path.join(__dirname, '../uploads', category)
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true })
    }
    
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const ext = path.extname(file.originalname)
    const name = file.originalname.replace(ext, '').toLowerCase().replace(/[^a-z0-9]/g, '-')
    cb(null, `${name}-${uniqueSuffix}${ext}`)
  }
})

// File filter
const fileFilter = (req, file, cb) => {
  // Check if file is an image
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('Only image files are allowed!'), false)
  }
}

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  }
})

module.exports = {
  upload,
  createUploadDirs
}