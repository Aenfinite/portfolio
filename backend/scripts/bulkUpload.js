const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Configuration
const API_BASE_URL = 'http://localhost:5000/api/admin';
const JWT_TOKEN = 'your_jwt_token_here'; // Replace with actual admin JWT token

/**
 * Bulk upload portfolio projects with images
 * @param {Array} projects - Array of project data
 * @param {String} imagesDir - Directory containing all images
 */
async function bulkUploadProjects(projects, imagesDir = './bulk-images') {
  try {
    console.log('🚀 Starting bulk upload process...');
    
    const form = new FormData();
    
    // Add projects data as JSON string
    form.append('projectsData', JSON.stringify(projects));
    
    // Collect all unique image files mentioned in projects
    const allImageFiles = new Set();
    
    projects.forEach(project => {
      if (project.mainImage) {
        allImageFiles.add(project.mainImage);
      }
      if (project.imageFiles && Array.isArray(project.imageFiles)) {
        project.imageFiles.forEach(img => allImageFiles.add(img));
      }
    });
    
    // Add image files to form
    let filesAdded = 0;
    for (const imageFile of allImageFiles) {
      const imagePath = path.join(imagesDir, imageFile);
      if (fs.existsSync(imagePath)) {
        const fileStream = fs.createReadStream(imagePath);
        form.append('files', fileStream, imageFile);
        filesAdded++;
        console.log(`📎 Added image: ${imageFile}`);
      } else {
        console.warn(`⚠️  Image not found: ${imagePath}`);
      }
    }
    
    console.log(`📊 Total projects: ${projects.length}`);
    console.log(`📊 Total images found: ${filesAdded}/${allImageFiles.size}`);
    
    // Make the API request
    const response = await axios.post(`${API_BASE_URL}/projects/bulk`, form, {
      headers: {
        ...form.getHeaders(),
        'Authorization': `Bearer ${JWT_TOKEN}`
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    });
    
    console.log('✅ Bulk upload completed successfully!');
    console.log('📊 Results:', {
      totalProjects: response.data.totalProjects,
      successfulUploads: response.data.successfulUploads,
      errors: response.data.errors
    });
    
    if (response.data.errorDetails && response.data.errorDetails.length > 0) {
      console.log('❌ Errors:');
      response.data.errorDetails.forEach(error => {
        console.log(`  - ${error}`);
      });
    }
    
    return response.data;
    
  } catch (error) {
    console.error('❌ Bulk upload failed:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Upload images only to a specific category
 * @param {String} category - Category slug
 * @param {Array} imageFiles - Array of image file names
 * @param {String} imagesDir - Directory containing images
 */
async function bulkUploadImages(category, imageFiles, imagesDir = './bulk-images') {
  try {
    console.log(`🚀 Starting bulk image upload to ${category}...`);
    
    const form = new FormData();
    
    let filesAdded = 0;
    for (const imageFile of imageFiles) {
      const imagePath = path.join(imagesDir, imageFile);
      if (fs.existsSync(imagePath)) {
        const fileStream = fs.createReadStream(imagePath);
        form.append('images', fileStream, imageFile);
        filesAdded++;
        console.log(`📎 Added image: ${imageFile}`);
      } else {
        console.warn(`⚠️  Image not found: ${imagePath}`);
      }
    }
    
    console.log(`📊 Total images to upload: ${filesAdded}/${imageFiles.length}`);
    
    const response = await axios.post(`${API_BASE_URL}/images/bulk/${category}`, form, {
      headers: {
        ...form.getHeaders(),
        'Authorization': `Bearer ${JWT_TOKEN}`
      }
    });
    
    console.log('✅ Bulk image upload completed successfully!');
    console.log(`📊 Uploaded ${response.data.images.length} images to ${category}`);
    
    return response.data;
    
  } catch (error) {
    console.error('❌ Bulk image upload failed:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Get admin JWT token by login
 */
async function getAdminToken(email, password) {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password
    });
    
    console.log('✅ Admin login successful');
    return response.data.token;
    
  } catch (error) {
    console.error('❌ Admin login failed:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = {
  bulkUploadProjects,
  bulkUploadImages,
  getAdminToken
};

// CLI usage example
if (require.main === module) {
  async function main() {
    try {
      // Load sample projects data
      const sampleProjects = require('./sampleProjectsData.json');
      
      // You can either set JWT_TOKEN above or get it via login:
      // const token = await getAdminToken('admin@example.com', 'password');
      
      // Upload projects with images
      await bulkUploadProjects(sampleProjects, './bulk-images');
      
    } catch (error) {
      console.error('Script failed:', error.message);
      process.exit(1);
    }
  }
  
  main();
}