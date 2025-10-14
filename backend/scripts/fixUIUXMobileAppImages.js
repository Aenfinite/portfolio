const mongoose = require('mongoose');
const Project = require('../models/Project');
const fs = require('fs');
const path = require('path');

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://aenfinitee:aenfinitee@cluster0.vigrho8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('✅ Connected to MongoDB Atlas');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Function to check if file exists with different extension
const findCorrectExtension = (category, filename) => {
  const uploadsPath = path.join(__dirname, '..', 'uploads', category);
  const baseFilename = filename.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '');
  
  // Common extensions to check
  const extensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
  
  for (const ext of extensions) {
    const fullPath = path.join(uploadsPath, baseFilename + ext);
    if (fs.existsSync(fullPath)) {
      return baseFilename + ext;
    }
  }
  
  return null; // File not found with any extension
};

// Function to extract filename from URL
const getFilenameFromUrl = (url) => {
  return url.split('/').pop();
};

// Function to create corrected URL
const createCorrectedUrl = (category, filename) => {
  return `https://api.aenfinite.com/uploads/${category}/${filename}`;
};

// Main fix function
const fixUIUXAndMobileAppImages = async () => {
  try {
    const projects = await Project.find({ 
      category: { $in: ['ui-ux', 'mobile-app'] } 
    });

    let fixedCount = 0;
    let missingCount = 0;

    for (const project of projects) {
      let needsUpdate = false;
      let updatedData = {};

      console.log(`\n🔍 Checking: ${project.title} [${project.category}]`);

      // Check main image
      if (project.imageSrc) {
        const filename = getFilenameFromUrl(project.imageSrc);
        const correctFilename = findCorrectExtension(project.category, filename);
        
        if (correctFilename && correctFilename !== filename) {
          updatedData.imageSrc = createCorrectedUrl(project.category, correctFilename);
          console.log(`  📝 Main image: ${filename} → ${correctFilename}`);
          needsUpdate = true;
          fixedCount++;
        } else if (!correctFilename) {
          console.log(`  ❌ Main image missing: ${filename}`);
          missingCount++;
        } else {
          console.log(`  ✅ Main image OK: ${filename}`);
        }
      }

      // Check all other images
      if (project.images && project.images.length > 0) {
        const correctedImages = [];
        
        for (let i = 0; i < project.images.length; i++) {
          const imageUrl = project.images[i];
          const filename = getFilenameFromUrl(imageUrl);
          const correctFilename = findCorrectExtension(project.category, filename);
          
          if (correctFilename && correctFilename !== filename) {
            correctedImages.push(createCorrectedUrl(project.category, correctFilename));
            console.log(`  📝 Image ${i + 1}: ${filename} → ${correctFilename}`);
            needsUpdate = true;
            fixedCount++;
          } else if (!correctFilename) {
            console.log(`  ❌ Image ${i + 1} missing: ${filename}`);
            // Keep the original URL even if file is missing (for now)
            correctedImages.push(imageUrl);
            missingCount++;
          } else {
            correctedImages.push(imageUrl);
            console.log(`  ✅ Image ${i + 1} OK: ${filename}`);
          }
        }
        
        if (needsUpdate) {
          updatedData.images = correctedImages;
        }
      }

      // Update project if needed
      if (needsUpdate) {
        await Project.findByIdAndUpdate(project._id, updatedData);
        console.log(`  💾 Updated project in database`);
      }
    }

    console.log('\n🎉 Fix Summary:');
    console.log(`📁 Projects checked: ${projects.length}`);
    console.log(`🔧 Image URLs fixed: ${fixedCount}`);
    console.log(`❌ Missing images: ${missingCount}`);
    
    if (missingCount > 0) {
      console.log('\n📋 Missing Images List:');
      console.log('You may need to upload these missing images to the appropriate folders.');
    }

  } catch (error) {
    console.error('❌ Error fixing images:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
};

// Run the fix
const main = async () => {
  await connectDB();
  await fixUIUXAndMobileAppImages();
};

main();