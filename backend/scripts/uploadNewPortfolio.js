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

function getCategorySlug(categoryName) {
  const mapped = categoryMapping[categoryName];
  if (mapped) return mapped;
  
  return categoryName.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');
}

function formatImageUrl(imageName, categorySlug) {
  if (!imageName) return '';
  return `https://api.aenfinite.com/uploads/${categorySlug}/${imageName}`;
}

async function uploadPortfolioProjects() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://aenfinitee:aenfinitee@cluster0.vigrho8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to database');
    
    // Read the sample projects data
    const dataPath = path.join(__dirname, 'sampleProjectsData.json');
    const rawData = fs.readFileSync(dataPath, 'utf8');
    
    // Split by }{ pattern and fix JSON format
    const jsonStrings = rawData.split(/}\s*{/);
    
    // Fix the first and last elements
    if (jsonStrings.length > 0) {
      jsonStrings[0] = jsonStrings[0].replace(/^[^{]*/, ''); // Remove anything before first {
      if (!jsonStrings[0].startsWith('{')) {
        jsonStrings[0] = '{' + jsonStrings[0];
      }
      
      const lastIndex = jsonStrings.length - 1;
      if (!jsonStrings[lastIndex].endsWith('}')) {
        jsonStrings[lastIndex] = jsonStrings[lastIndex] + '}';
      }
      
      // Fix middle elements
      for (let i = 1; i < lastIndex; i++) {
        jsonStrings[i] = '{' + jsonStrings[i] + '}';
      }
    }
    
    console.log(`📄 Found ${jsonStrings.length} potential projects in file`);
    
    const projectsToUpload = [];
    const failedProjects = [];
    
    // Parse each JSON string
    for (let i = 0; i < jsonStrings.length; i++) {
      try {
        const jsonStr = jsonStrings[i].trim();
        if (!jsonStr) continue;
        
        const projectData = JSON.parse(jsonStr);
        
        if (!projectData.title) {
          console.log(`⚠️  Skipping project ${i + 1}: No title`);
          continue;
        }
        
        // Check if project already exists
        const existing = await Project.findOne({ title: projectData.title });
        if (existing) {
          console.log(`⚠️  Skipping "${projectData.title}": Already exists in database`);
          continue;
        }
        
        const categorySlug = getCategorySlug(projectData.category);
        
        // Process imageSrc
        const mainImageUrl = projectData.imageSrc ? formatImageUrl(projectData.imageSrc, categorySlug) : '';
        
        // Process images array  
        let imagesUrls = [];
        if (projectData.images && Array.isArray(projectData.images)) {
          imagesUrls = projectData.images
            .filter(img => img && img.trim() !== '')
            .map(img => formatImageUrl(img, categorySlug));
        }
        
        // If no images array but has imageSrc, add imageSrc to images
        if (imagesUrls.length === 0 && mainImageUrl) {
          imagesUrls = [mainImageUrl];
        }
        
        const project = {
          title: projectData.title || '',
          subtitle: projectData.subtitle || '',
          description: projectData.description || '',
          challenge: projectData.challenge || '',
          solution: projectData.solution || '',
          results: projectData.results || [],
          imageSrc: mainImageUrl,
          images: imagesUrls,
          tags: projectData.tags || [],
          technologies: projectData.technologies || [],
          category: projectData.category || '',
          published: projectData.published !== false,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        projectsToUpload.push(project);
        
        console.log(`✅ Prepared: "${project.title}" (${project.category})`);
        console.log(`   Image: ${project.imageSrc}`);
        
      } catch (parseError) {
        console.log(`❌ Failed to parse project ${i + 1}:`, parseError.message);
        failedProjects.push(i + 1);
      }
    }
    
    console.log(`\n📊 Summary:`);
    console.log(`   Ready to upload: ${projectsToUpload.length} projects`);
    console.log(`   Failed to parse: ${failedProjects.length} projects`);
    
    if (projectsToUpload.length > 0) {
      console.log('\n🚀 Uploading projects to database...');
      
      const result = await Project.insertMany(projectsToUpload, { ordered: false });
      console.log(`✅ Successfully uploaded ${result.length} projects!`);
      
      // Show category summary
      const categoryStats = {};
      result.forEach(project => {
        const cat = project.category;
        categoryStats[cat] = (categoryStats[cat] || 0) + 1;
      });
      
      console.log('\n--- Upload Summary by Category ---');
      Object.entries(categoryStats).forEach(([category, count]) => {
        console.log(`${category}: ${count} projects`);
      });
      
      console.log('\n--- Sample Image URLs ---');
      result.slice(0, 3).forEach(project => {
        console.log(`"${project.title}"`);
        console.log(`  Main: ${project.imageSrc}`);
      });
      
    } else {
      console.log('⚠️  No new projects to upload');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Database connection closed');
  }
}

uploadPortfolioProjects();