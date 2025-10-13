require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Project = require('../models/Project');

async function checkSampleProjects() {
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
    
    // Parse the JSON data
    const jsonObjects = rawData
      .split(/}\s*{/)
      .map((item, index, array) => {
        if (index === 0 && !item.startsWith('{')) item = '{' + item;
        if (index === array.length - 1 && !item.endsWith('}')) item = item + '}';
        if (index > 0 && index < array.length - 1) item = '{' + item + '}';
        return item.trim();
      })
      .filter(item => item.length > 0);
    
    const sampleProjects = jsonObjects.map(jsonStr => JSON.parse(jsonStr));
    
    console.log(`\n📄 Found ${sampleProjects.length} projects in sampleProjectsData.json:`);
    
    for (let i = 0; i < sampleProjects.length; i++) {
      const project = sampleProjects[i];
      console.log(`${i + 1}. ${project.title} (${project.category})`);
      
      // Check if this project exists in database
      const existingProject = await Project.findOne({ title: project.title });
      
      if (existingProject) {
        console.log(`   ✅ EXISTS in database with image: ${existingProject.imageSrc}`);
      } else {
        console.log(`   ❌ NOT FOUND in database - needs to be uploaded`);
      }
    }
    
    // Count existing projects by category
    const allProjects = await Project.find({});
    console.log(`\n📊 Total projects in database: ${allProjects.length}`);
    
    const categoryStats = {};
    allProjects.forEach(project => {
      const cat = project.category;
      categoryStats[cat] = (categoryStats[cat] || 0) + 1;
    });
    
    console.log('\n--- Database Summary by Category ---');
    Object.entries(categoryStats).forEach(([category, count]) => {
      console.log(`${category}: ${count} projects`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Database connection closed');
  }
}

checkSampleProjects();