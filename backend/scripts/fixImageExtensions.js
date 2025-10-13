require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Project = require('../models/Project');

async function fixImageExtensions() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://aenfinitee:aenfinitee@cluster0.vigrho8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to database');
    
    const allProjects = await Project.find({});
    const uploadsPath = path.join(__dirname, '..', 'uploads');
    let fixedCount = 0;
    
    console.log('🔧 Fixing image extension mismatches...\n');
    
    for (const project of allProjects) {
      const categoryFolder = project.category;
      const categoryPath = path.join(uploadsPath, categoryFolder);
      
      if (!fs.existsSync(categoryPath)) continue;
      
      const actualFiles = fs.readdirSync(categoryPath);
      let needsUpdate = false;
      let newImageSrc = project.imageSrc;
      let newImages = [...(project.images || [])];
      
      // Function to fix an image URL
      const fixImageUrl = (imageUrl) => {
        if (!imageUrl || !imageUrl.includes('/uploads/')) return imageUrl;
        
        const urlParts = imageUrl.split('/');
        const filename = urlParts[urlParts.length - 1];
        
        if (actualFiles.includes(filename)) {
          return imageUrl; // File exists with correct extension
        }
        
        // Look for extension mismatch
        const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.'));
        const currentExt = filename.substring(filename.lastIndexOf('.'));
        const possibleExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
        
        for (const ext of possibleExtensions) {
          if (ext !== currentExt) {
            const alternativeFile = nameWithoutExt + ext;
            if (actualFiles.includes(alternativeFile)) {
              needsUpdate = true;
              const fixedUrl = imageUrl.replace(filename, alternativeFile);
              console.log(`   📝 ${filename} → ${alternativeFile}`);
              return fixedUrl;
            }
          }
        }
        
        return imageUrl; // No fix found
      };
      
      // Fix main image
      if (project.imageSrc) {
        const originalImageSrc = newImageSrc;
        newImageSrc = fixImageUrl(project.imageSrc);
        if (originalImageSrc !== newImageSrc) {
          console.log(`✅ Fixed imageSrc for: "${project.title}"`);
        }
      }
      
      // Fix images array
      if (project.images && project.images.length > 0) {
        const originalImages = [...newImages];
        newImages = project.images.map(img => fixImageUrl(img));
        
        // Check if any images in array were changed
        const imagesChanged = originalImages.some((img, index) => img !== newImages[index]);
        if (imagesChanged) {
          console.log(`✅ Fixed images array for: "${project.title}"`);
        }
      }
      
      // Update project if changes were made
      if (needsUpdate) {
        await Project.findByIdAndUpdate(project._id, {
          imageSrc: newImageSrc,
          images: newImages,
          updatedAt: new Date()
        });
        
        fixedCount++;
        console.log('');
      }
    }
    
    console.log(`\n🎉 Successfully fixed ${fixedCount} projects with extension mismatches!`);
    
    // Run a quick verification
    console.log('\n🔍 Verifying fixes...');
    let remainingIssues = 0;
    
    for (const project of allProjects) {
      const categoryFolder = project.category;
      const categoryPath = path.join(uploadsPath, categoryFolder);
      
      if (!fs.existsSync(categoryPath)) continue;
      
      const actualFiles = fs.readdirSync(categoryPath);
      
      const checkFile = (imageUrl) => {
        if (!imageUrl || !imageUrl.includes('/uploads/')) return true;
        const urlParts = imageUrl.split('/');
        const filename = urlParts[urlParts.length - 1];
        return actualFiles.includes(filename);
      };
      
      // Get updated project data
      const updatedProject = await Project.findById(project._id);
      
      if (updatedProject.imageSrc && !checkFile(updatedProject.imageSrc)) {
        remainingIssues++;
      }
      
      if (updatedProject.images) {
        updatedProject.images.forEach(img => {
          if (!checkFile(img)) {
            remainingIssues++;
          }
        });
      }
    }
    
    if (remainingIssues === 0) {
      console.log('✅ All fixable extension mismatches have been resolved!');
    } else {
      console.log(`⚠️  ${remainingIssues} files still have issues (likely missing files)`);
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Database connection closed');
  }
}

fixImageExtensions();