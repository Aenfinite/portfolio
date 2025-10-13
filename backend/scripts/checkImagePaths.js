require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Project = require('../models/Project');

async function checkImageExtensions() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://aenfinitee:aenfinitee@cluster0.vigrho8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to database');
    
    const allProjects = await Project.find({});
    console.log(`📊 Checking ${allProjects.length} projects for file extension mismatches...\n`);
    
    const uploadsPath = path.join(__dirname, '..', 'uploads');
    let mismatches = [];
    let totalChecked = 0;
    
    for (const project of allProjects) {
      // Extract category folder from project category
      const categoryFolder = project.category;
      const categoryPath = path.join(uploadsPath, categoryFolder);
      
      // Check if category folder exists
      if (!fs.existsSync(categoryPath)) {
        console.log(`⚠️  Category folder not found: ${categoryFolder}`);
        continue;
      }
      
      // Get list of actual files in the category folder
      const actualFiles = fs.readdirSync(categoryPath);
      
      // Function to check an image URL
      const checkImageUrl = (imageUrl, source) => {
        if (!imageUrl || !imageUrl.includes('/uploads/')) return;
        
        totalChecked++;
        
        // Extract filename from URL
        const urlParts = imageUrl.split('/');
        const filename = urlParts[urlParts.length - 1];
        
        // Check if file exists exactly as referenced
        if (actualFiles.includes(filename)) {
          return; // File exists with correct extension
        }
        
        // Check for extension mismatch
        const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.'));
        const currentExt = filename.substring(filename.lastIndexOf('.'));
        
        // Look for the same filename with different extensions
        const possibleExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
        let foundMatch = null;
        
        for (const ext of possibleExtensions) {
          if (ext !== currentExt) {
            const alternativeFile = nameWithoutExt + ext;
            if (actualFiles.includes(alternativeFile)) {
              foundMatch = alternativeFile;
              break;
            }
          }
        }
        
        if (foundMatch) {
          mismatches.push({
            project: project.title,
            category: categoryFolder,
            source: source,
            referenced: filename,
            actualFile: foundMatch,
            correctUrl: imageUrl.replace(filename, foundMatch)
          });
        } else {
          // File doesn't exist at all
          mismatches.push({
            project: project.title,
            category: categoryFolder,
            source: source,
            referenced: filename,
            actualFile: 'NOT FOUND',
            correctUrl: null
          });
        }
      };
      
      // Check main image
      if (project.imageSrc) {
        checkImageUrl(project.imageSrc, 'imageSrc');
      }
      
      // Check images array
      if (project.images && project.images.length > 0) {
        project.images.forEach((img, index) => {
          checkImageUrl(img, `images[${index}]`);
        });
      }
    }
    
    console.log(`\n📊 Results:`);
    console.log(`   Total images checked: ${totalChecked}`);
    console.log(`   Files with issues: ${mismatches.length}\n`);
    
    if (mismatches.length > 0) {
      console.log('🔧 Files that need fixing:\n');
      
      const extensionMismatches = mismatches.filter(m => m.actualFile !== 'NOT FOUND');
      const missingFiles = mismatches.filter(m => m.actualFile === 'NOT FOUND');
      
      if (extensionMismatches.length > 0) {
        console.log(`📝 Extension Mismatches (${extensionMismatches.length}):`);
        extensionMismatches.forEach((mismatch, index) => {
          console.log(`${index + 1}. "${mismatch.project}" (${mismatch.category})`);
          console.log(`   ${mismatch.source}: ${mismatch.referenced} → should be ${mismatch.actualFile}`);
          console.log(`   Correct URL: ${mismatch.correctUrl}\n`);
        });
      }
      
      if (missingFiles.length > 0) {
        console.log(`❌ Missing Files (${missingFiles.length}):`);
        missingFiles.forEach((missing, index) => {
          console.log(`${index + 1}. "${missing.project}" (${missing.category})`);
          console.log(`   ${missing.source}: ${missing.referenced} - FILE NOT FOUND\n`);
        });
      }
      
      // Offer to fix extension mismatches
      if (extensionMismatches.length > 0) {
        console.log(`\n💡 Run fixImageExtensions() to automatically fix these extension mismatches.`);
      }
      
    } else {
      console.log('✅ All image files have correct extensions and exist!');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Database connection closed');
  }
}

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
              return imageUrl.replace(filename, alternativeFile);
            }
          }
        }
        
        return imageUrl; // No fix found
      };
      
      // Fix main image
      if (project.imageSrc) {
        newImageSrc = fixImageUrl(project.imageSrc);
      }
      
      // Fix images array
      if (project.images && project.images.length > 0) {
        newImages = project.images.map(img => fixImageUrl(img));
      }
      
      // Update project if changes were made
      if (needsUpdate) {
        await Project.findByIdAndUpdate(project._id, {
          imageSrc: newImageSrc,
          images: newImages,
          updatedAt: new Date()
        });
        
        console.log(`✅ Fixed: "${project.title}"`);
        if (newImageSrc !== project.imageSrc) {
          console.log(`   imageSrc: ${project.imageSrc} → ${newImageSrc}`);
        }
        fixedCount++;
      }
    }
    
    console.log(`\n🎉 Fixed ${fixedCount} projects with extension mismatches!`);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Database connection closed');
  }
}

// Run the check function
console.log('🔍 Checking for image extension mismatches...\n');
checkImageExtensions();