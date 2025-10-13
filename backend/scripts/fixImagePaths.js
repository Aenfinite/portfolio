const mongoose = require('mongoose');
const Project = require('../models/Project');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// API URL prefix
const API_BASE_URL = "https://api.aenfinite.com";

// Projects that need API URL prefix and file extension corrections
const corrections = [
  {
    title: "Modern & Vibrant Social Media Templates for Fashion E-commerce",
    currentImageSrc: "/uploads/graphic-design/5f39d5c21a2c7_thumb900.jpg",
    correctImageSrc: `${API_BASE_URL}/uploads/graphic-design/5f39d5c21a2c7_thumb900.jpg`
  },
  {
    title: "R5 Autotech: E-commerce Platform for Luxury Car Parts",
    currentImageSrc: "/uploads/web-design-development/screencapture-r5autotech-co-uk.jpg",
    correctImageSrc: `${API_BASE_URL}/uploads/web-design-development/screencapture-r5autotech-co-uk.png`
  },
  {
    title: "Windsor Beauty: B2B E-commerce Portal for Salon Professionals",
    currentImageSrc: "/uploads/web-design-development/Windsor-home.jpg",
    correctImageSrc: `${API_BASE_URL}/uploads/web-design-development/Windsor-home.jpg`,
    images: [
      `${API_BASE_URL}/uploads/web-design-development/Windsor-home.jpg`,
      `${API_BASE_URL}/uploads/web-design-development/Windsor-category.jpg`,
      `${API_BASE_URL}/uploads/web-design-development/Windsor-product-page.jpg`
    ]
  },
  {
    title: "Brand Identity & Cover Design for 'True Magic' Novel",
    currentImageSrc: "/uploads/branding/3---truemagic.jpg",
    correctImageSrc: `${API_BASE_URL}/uploads/branding/3---truemagic.jpg`
  },
  {
    title: "Cover Design & Branding for 'Spencer's Risk'",
    currentImageSrc: "/uploads/branding/7-risk.jpg",
    correctImageSrc: `${API_BASE_URL}/uploads/branding/7-risk.jpg`
  },
  {
    title: "Sci-Fi Book Cover & Brand Identity for 'Detonation'",
    currentImageSrc: "/uploads/branding/10-detonation.jpg",
    correctImageSrc: `${API_BASE_URL}/uploads/branding/10-detonation.jpg`
  },
  {
    title: "Epic Sci-Fi Cover Branding for 'Paradox 2'",
    currentImageSrc: "/uploads/branding/attachment_89728190.jpeg",
    correctImageSrc: `${API_BASE_URL}/uploads/branding/attachment_89728190.jpeg`
  },
  {
    title: "Corporate Brand Identity & Business Card for BNH Tourism",
    currentImageSrc: "/uploads/branding/1.jpg",
    correctImageSrc: `${API_BASE_URL}/uploads/branding/1.jpg`
  },
  {
    title: "Fresh Brand Identity & Business Card for Hydrofit",
    currentImageSrc: "/uploads/branding/3.jpg",
    correctImageSrc: `${API_BASE_URL}/uploads/branding/3.jpg`
  },
  {
    title: "Playful & Vibrant Brand Identity for Dees Toys",
    currentImageSrc: "/uploads/branding/4.jpg",
    correctImageSrc: `${API_BASE_URL}/uploads/branding/4.jpg`
  }
];

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://aenfinitee:aenfinitee@cluster0.vigrho8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(async () => {
  console.log('✅ Connected to database');
  
  for (const correction of corrections) {
    try {
      const updateData = { imageSrc: correction.correctImageSrc };
      
      // Update images array if provided
      if (correction.images) {
        updateData.images = correction.images;
      }
      
      const project = await Project.findOneAndUpdate(
        { title: correction.title },
        updateData,
        { new: true }
      );
      
      if (project) {
        console.log(`✅ Updated: ${correction.title}`);
        console.log(`   Main Image: ${correction.correctImageSrc}`);
        if (correction.images) {
          console.log(`   Additional Images: ${correction.images.length} updated`);
        }
      } else {
        console.log(`❌ Project not found: ${correction.title}`);
      }
    } catch (error) {
      console.error(`❌ Error updating ${correction.title}:`, error.message);
    }
  }
  
  // Verify all images exist
  console.log('\n🔍 Verifying image files exist...');
  const projects = await Project.find({ 
    title: { $in: [
      "Modern & Vibrant Social Media Templates for Fashion E-commerce",
      "R5 Autotech: E-commerce Platform for Luxury Car Parts", 
      "Windsor Beauty: B2B E-commerce Portal for Salon Professionals",
      "Brand Identity & Cover Design for 'True Magic' Novel",
      "Cover Design & Branding for 'Spencer's Risk'",
      "Sci-Fi Book Cover & Brand Identity for 'Detonation'",
      "Epic Sci-Fi Cover Branding for 'Paradox 2'",
      "Corporate Brand Identity & Business Card for BNH Tourism",
      "Fresh Brand Identity & Business Card for Hydrofit",
      "Playful & Vibrant Brand Identity for Dees Toys"
    ]}
  }).select('title imageSrc images');
  
  for (const project of projects) {
    // Check main image
    const mainImagePath = path.join(__dirname, '..', project.imageSrc);
    const mainImageExists = fs.existsSync(mainImagePath);
    console.log(`${mainImageExists ? '✅' : '❌'} ${project.title}`);
    console.log(`   Main: ${project.imageSrc} ${mainImageExists ? '(EXISTS)' : '(NOT FOUND)'}`);
    
    // Check additional images
    if (project.images && project.images.length > 0) {
      project.images.forEach(imagePath => {
        const fullImagePath = path.join(__dirname, '..', imagePath);
        const imageExists = fs.existsSync(fullImagePath);
        console.log(`   Extra: ${imagePath} ${imageExists ? '(EXISTS)' : '(NOT FOUND)'}`);
      });
    }
    console.log('');
  }
  
  mongoose.disconnect();
  console.log('🔌 Database connection closed');
})
.catch(err => {
  console.error('❌ Database error:', err);
});