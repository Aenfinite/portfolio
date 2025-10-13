require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Project = require('../models/Project');

// Category mapping from display name to folder name
const categoryMapping = {
  'Branding': 'branding',
  'Web Design & Development': 'web-design-development', 
  'Graphic Design': 'graphic-design',
  'Logo Design': 'logo-design',
  'UI/UX Design': 'ui-ux',
  'Mobile App': 'mobile-app',
  'Packaging Design': 'packaging-design'
};

// Function to convert category to slug format
function getCategorySlug(categoryName) {
  const mapped = categoryMapping[categoryName];
  if (mapped) return mapped;
  
  // Fallback: convert to kebab-case
  return categoryName.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');
}

// Function to format image URL
function formatImageUrl(imageName, categorySlug) {
  if (!imageName) return '';
  return `https://api.aenfinite.com/uploads/${categorySlug}/${imageName}`;
}

// Function to process portfolio data
function processPortfolioData(rawData) {
  const projects = [];
  
  // Parse JSON objects separated by newlines or as single array
  let portfolioItems;
  
  try {
    // Try to parse as single JSON object first
    portfolioItems = [JSON.parse(rawData)];
  } catch (e) {
    try {
      // Try to parse as array
      portfolioItems = JSON.parse(`[${rawData}]`);
    } catch (e2) {
      // Parse as multiple JSON objects separated by newlines/brackets
      const jsonObjects = rawData
        .split(/}\s*{/)
        .map((item, index, array) => {
          if (index === 0 && !item.startsWith('{')) item = '{' + item;
          if (index === array.length - 1 && !item.endsWith('}')) item = item + '}';
          if (index > 0 && index < array.length - 1) item = '{' + item + '}';
          return item.trim();
        })
        .filter(item => item.length > 0);
      
      portfolioItems = jsonObjects.map(jsonStr => JSON.parse(jsonStr));
    }
  }

  portfolioItems.forEach(item => {
    const categorySlug = getCategorySlug(item.category);
    
    // Process imageSrc
    const mainImageUrl = item.imageSrc ? formatImageUrl(item.imageSrc, categorySlug) : '';
    
    // Process images array
    let imagesUrls = [];
    if (item.images && Array.isArray(item.images)) {
      imagesUrls = item.images
        .filter(img => img && img.trim() !== '')
        .map(img => formatImageUrl(img, categorySlug));
    }
    
    // If no images array but has imageSrc, add imageSrc to images
    if (imagesUrls.length === 0 && mainImageUrl) {
      imagesUrls = [mainImageUrl];
    }
    
    const project = {
      title: item.title || '',
      subtitle: item.subtitle || '',
      description: item.description || '',
      challenge: item.challenge || '',
      solution: item.solution || '',
      results: item.results || [],
      imageSrc: mainImageUrl,
      images: imagesUrls,
      tags: item.tags || [],
      technologies: item.technologies || [],
      category: item.category || '',
      published: item.published !== false, // Default to true
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    projects.push(project);
    
    console.log(`Processed: ${project.title}`);
    console.log(`Category: ${project.category} → ${categorySlug}`);
    console.log(`Main Image: ${project.imageSrc}`);
    console.log(`All Images: ${project.images.join(', ')}`);
    console.log('---');
  });
  
  return projects;
}

async function uploadSampleProjects() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Read the sample projects data
    const dataPath = path.join(__dirname, 'sampleProjectsData.json');
    const rawData = fs.readFileSync(dataPath, 'utf8');
    
    // Process the data
    console.log('Processing portfolio data...');
    const projects = processPortfolioData(rawData);
    
    console.log(`\nFound ${projects.length} projects to upload`);
    
    // Clear existing projects (optional - remove if you want to keep existing)
    // await Project.deleteMany({});
    // console.log('Cleared existing projects');
    
    // Insert new projects
    const result = await Project.insertMany(projects, { ordered: false });
    console.log(`Successfully uploaded ${result.length} projects!`);
    
    // Display summary
    const categoryStats = {};
    result.forEach(project => {
      const cat = project.category;
      categoryStats[cat] = (categoryStats[cat] || 0) + 1;
    });
    
    console.log('\n--- Upload Summary ---');
    Object.entries(categoryStats).forEach(([category, count]) => {
      console.log(`${category}: ${count} projects`);
    });
    
    console.log('\n--- Sample Image URLs ---');
    result.slice(0, 3).forEach(project => {
      console.log(`${project.title}:`);
      console.log(`  Main: ${project.imageSrc}`);
      console.log(`  All: [${project.images.join(', ')}]`);
    });
    
  } catch (error) {
    console.error('Error uploading projects:', error);
    if (error.writeErrors) {
      error.writeErrors.forEach(err => {
        console.error('Write error:', err.err);
      });
    }
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the upload
uploadSampleProjects();