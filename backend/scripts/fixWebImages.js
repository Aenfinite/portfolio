require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Project = require('../models/Project');

async function fixWebDesignImages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://aenfinitee:aenfinitee@cluster0.vigrho8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to database');
    
    // Get all web design projects
    const webProjects = await Project.find({category: 'web-design-development'});
    console.log(`🔍 Found ${webProjects.length} web design projects`);
    
    // Check the actual files in the folder
    const uploadsPath = path.join(__dirname, '..', 'uploads', 'web-design-development');
    const actualFiles = fs.readdirSync(uploadsPath);
    
    console.log('\n📁 Actual files in web-design-development folder:');
    actualFiles.forEach(file => console.log(`   ${file}`));
    
    console.log('\n🔧 Checking projects for image issues:');
    
    const issues = [];
    const duplicates = {};
    
    for (const project of webProjects) {
      // Check for duplicates
      if (duplicates[project.title]) {
        console.log(`❌ DUPLICATE: "${project.title}"`);
        console.log(`   Existing: ${duplicates[project.title].imageSrc}`);
        console.log(`   Current: ${project.imageSrc}`);
        issues.push({type: 'duplicate', project});
        continue;
      } else {
        duplicates[project.title] = project;
      }
      
      // Extract filename from imageSrc
      const imageSrc = project.imageSrc;
      let filename = '';
      
      if (imageSrc.includes('/uploads/web-design-development/')) {
        filename = imageSrc.split('/uploads/web-design-development/')[1];
      } else if (imageSrc.includes('https://api.aenfinite.com/uploads/web-design-development/')) {
        filename = imageSrc.split('https://api.aenfinite.com/uploads/web-design-development/')[1];
      }
      
      if (!filename) {
        console.log(`❌ INVALID URL FORMAT: "${project.title}" - ${imageSrc}`);
        issues.push({type: 'invalid_url', project});
        continue;
      }
      
      // Check if file exists with exact name
      if (actualFiles.includes(filename)) {
        console.log(`✅ "${project.title}" - ${filename} EXISTS`);
        
        // Check if URL format is correct
        const correctUrl = `https://api.aenfinite.com/uploads/web-design-development/${filename}`;
        if (project.imageSrc !== correctUrl) {
          console.log(`🔧 URL FORMAT NEEDS FIX: ${project.imageSrc} → ${correctUrl}`);
          issues.push({type: 'fix_url', project, correctUrl});
        }
      } else {
        // Check for similar files with different extensions
        const nameWithoutExt = filename.split('.')[0];
        const similarFiles = actualFiles.filter(file => 
          file.startsWith(nameWithoutExt) || 
          file.toLowerCase().includes(nameWithoutExt.toLowerCase())
        );
        
        if (similarFiles.length > 0) {
          console.log(`⚠️  SIMILAR FILE FOUND for "${project.title}"`);
          console.log(`   Looking for: ${filename}`);
          console.log(`   Similar files: ${similarFiles.join(', ')}`);
          issues.push({type: 'similar_file', project, filename, similarFiles});
        } else {
          console.log(`❌ FILE NOT FOUND: "${project.title}" - ${filename}`);
          issues.push({type: 'missing_file', project, filename});
        }
      }
    }
    
    console.log(`\n📊 Summary of issues:`);
    console.log(`   Total projects: ${webProjects.length}`);
    console.log(`   Issues found: ${issues.length}`);
    
    const issuesByType = {};
    issues.forEach(issue => {
      issuesByType[issue.type] = (issuesByType[issue.type] || 0) + 1;
    });
    
    Object.entries(issuesByType).forEach(([type, count]) => {
      console.log(`   ${type}: ${count}`);
    });
    
    // Ask if we should fix the issues
    if (issues.length > 0) {
      console.log('\n🛠️  Found issues to fix. Run fixWebDesignImages() with fix=true to apply fixes');
    }
    
    return issues;
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Database connection closed');
  }
}

async function fixWebDesignIssues() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://aenfinitee:aenfinitee@cluster0.vigrho8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to database');
    
    // Remove duplicates first
    console.log('🧹 Removing duplicate projects...');
    
    const projects = await Project.find({category: 'web-design-development'});
    const seen = new Set();
    const duplicatesToRemove = [];
    
    for (const project of projects) {
      if (seen.has(project.title)) {
        duplicatesToRemove.push(project._id);
        console.log(`   Marking duplicate for removal: "${project.title}"`);
      } else {
        seen.add(project.title);
      }
    }
    
    if (duplicatesToRemove.length > 0) {
      await Project.deleteMany({_id: {$in: duplicatesToRemove}});
      console.log(`   Removed ${duplicatesToRemove.length} duplicates`);
    }
    
    // Fix URL formats and image extensions
    console.log('\n🔧 Fixing image URLs and extensions...');
    
    const uploadsPath = path.join(__dirname, '..', 'uploads', 'web-design-development');
    const actualFiles = fs.readdirSync(uploadsPath);
    
    const remainingProjects = await Project.find({category: 'web-design-development'});
    
    for (const project of remainingProjects) {
      let needsUpdate = false;
      let newImageSrc = project.imageSrc;
      let newImages = [...project.images];
      
      // Fix main imageSrc
      if (project.imageSrc) {
        // Extract filename
        let filename = project.imageSrc.split('/').pop();
        
        // Check if file exists, if not, try different extensions
        if (!actualFiles.includes(filename)) {
          const nameWithoutExt = filename.split('.')[0];
          const matchingFile = actualFiles.find(file => file.startsWith(nameWithoutExt));
          
          if (matchingFile) {
            filename = matchingFile;
            console.log(`   Fixed extension: ${project.imageSrc.split('/').pop()} → ${filename}`);
          }
        }
        
        // Ensure correct URL format
        const correctUrl = `https://api.aenfinite.com/uploads/web-design-development/${filename}`;
        if (project.imageSrc !== correctUrl) {
          newImageSrc = correctUrl;
          needsUpdate = true;
          console.log(`   Fixed URL format for "${project.title}"`);
        }
      }
      
      // Fix images array
      newImages = project.images.map(img => {
        if (!img.includes('https://api.aenfinite.com/uploads/web-design-development/')) {
          const filename = img.split('/').pop();
          return `https://api.aenfinite.com/uploads/web-design-development/${filename}`;
        }
        return img;
      });
      
      if (JSON.stringify(newImages) !== JSON.stringify(project.images)) {
        needsUpdate = true;
      }
      
      if (needsUpdate) {
        await Project.findByIdAndUpdate(project._id, {
          imageSrc: newImageSrc,
          images: newImages
        });
        console.log(`   Updated: "${project.title}"`);
      }
    }
    
    console.log('\n✅ All fixes applied!');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Database connection closed');
  }
}

// Run diagnosis first
fixWebDesignImages();