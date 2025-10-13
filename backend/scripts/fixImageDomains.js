require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('../models/Project');

async function fixImageDomains() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://aenfinitee:aenfinitee@cluster0.vigrho8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to database');
    
    // Find all projects with incorrect image URLs (missing domain)
    const projectsWithWrongDomain = await Project.find({
      $or: [
        { imageSrc: { $regex: '^/uploads/', $options: 'i' } },
        { images: { $regex: '^/uploads/', $options: 'i' } },
        { imageSrc: { $regex: 'portfolio\.aenfinite\.com', $options: 'i' } },
        { images: { $regex: 'portfolio\.aenfinite\.com', $options: 'i' } }
      ]
    });
    
    console.log(`🔍 Found ${projectsWithWrongDomain.length} projects with incorrect domain URLs`);
    
    if (projectsWithWrongDomain.length === 0) {
      console.log('✅ All projects already have correct image URLs!');
      return;
    }
    
    // Show projects that need fixing
    console.log('\n📋 Projects that need URL fixing:');
    projectsWithWrongDomain.forEach((project, index) => {
      console.log(`${index + 1}. "${project.title}" (${project.category})`);
      console.log(`   Current imageSrc: ${project.imageSrc}`);
      if (project.images && project.images.length > 0) {
        console.log(`   Current images: [${project.images.join(', ')}]`);
      }
    });
    
    let fixedCount = 0;
    
    // Fix each project
    for (const project of projectsWithWrongDomain) {
      let needsUpdate = false;
      
      // Fix imageSrc
      let newImageSrc = project.imageSrc;
      if (project.imageSrc) {
        // Replace portfolio.aenfinite.com with api.aenfinite.com
        if (project.imageSrc.includes('portfolio.aenfinite.com')) {
          newImageSrc = project.imageSrc.replace(/portfolio\.aenfinite\.com/g, 'api.aenfinite.com');
          needsUpdate = true;
        }
        // Add https://api.aenfinite.com prefix to /uploads/ paths
        else if (project.imageSrc.startsWith('/uploads/')) {
          newImageSrc = 'https://api.aenfinite.com' + project.imageSrc;
          needsUpdate = true;
        }
      }
      
      // Fix images array
      let newImages = project.images || [];
      if (project.images && project.images.length > 0) {
        newImages = project.images.map(img => {
          if (img) {
            // Replace portfolio.aenfinite.com with api.aenfinite.com
            if (img.includes('portfolio.aenfinite.com')) {
              needsUpdate = true;
              return img.replace(/portfolio\.aenfinite\.com/g, 'api.aenfinite.com');
            }
            // Add https://api.aenfinite.com prefix to /uploads/ paths
            else if (img.startsWith('/uploads/')) {
              needsUpdate = true;
              return 'https://api.aenfinite.com' + img;
            }
          }
          return img;
        });
      }
      
      if (needsUpdate) {
        await Project.findByIdAndUpdate(project._id, {
          imageSrc: newImageSrc,
          images: newImages,
          updatedAt: new Date()
        });
        
        console.log(`✅ Fixed: "${project.title}"`);
        console.log(`   New imageSrc: ${newImageSrc}`);
        if (newImages.length > 0) {
          console.log(`   New images: [${newImages.join(', ')}]`);
        }
        console.log('');
        
        fixedCount++;
      }
    }
    
    console.log(`\n🎉 Successfully fixed ${fixedCount} projects!`);
    
    // Verify the fix by checking for any remaining incorrect URLs
    const remainingIncorrect = await Project.find({
      $or: [
        { imageSrc: { $regex: '^/uploads/', $options: 'i' } },
        { images: { $regex: '^/uploads/', $options: 'i' } },
        { imageSrc: { $regex: 'portfolio\.aenfinite\.com', $options: 'i' } },
        { images: { $regex: 'portfolio\.aenfinite\.com', $options: 'i' } }
      ]
    });
    
    if (remainingIncorrect.length === 0) {
      console.log('✅ All image URLs now use api.aenfinite.com domain!');
    } else {
      console.log(`⚠️  Still ${remainingIncorrect.length} projects with incorrect URLs`);
    }
    
    // Show summary by category
    const allProjects = await Project.find({});
    const categoryStats = {};
    const correctUrlStats = {};
    
    allProjects.forEach(project => {
      const cat = project.category;
      categoryStats[cat] = (categoryStats[cat] || 0) + 1;
      
      const hasCorrectUrls = (!project.imageSrc || project.imageSrc.includes('api.aenfinite.com')) &&
                            (!project.images || project.images.every(img => !img || img.includes('api.aenfinite.com')));
      
      if (hasCorrectUrls) {
        correctUrlStats[cat] = (correctUrlStats[cat] || 0) + 1;
      }
    });
    
    console.log('\n--- Summary by Category ---');
    Object.entries(categoryStats).forEach(([category, total]) => {
      const correct = correctUrlStats[category] || 0;
      console.log(`${category}: ${correct}/${total} projects with correct URLs`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Database connection closed');
  }
}

fixImageDomains();