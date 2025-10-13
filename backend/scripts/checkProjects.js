const mongoose = require('mongoose');
const Project = require('../models/Project');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://aenfinitee:aenfinitee@cluster0.vigrho8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('✅ Connected to database');
  
  const projects = await Project.find().select('title imageSrc category');
  console.log(`\n📊 Found ${projects.length} projects in database:\n`);
  
  projects.forEach((p, index) => {
    console.log(`${index + 1}. ${p.title}`);
    console.log(`   Image: ${p.imageSrc}`);
    console.log(`   Category: ${p.category}\n`);
  });
  
  mongoose.disconnect();
})
.catch(err => {
  console.error('❌ Database error:', err);
});