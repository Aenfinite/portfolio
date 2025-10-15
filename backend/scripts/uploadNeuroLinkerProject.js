const mongoose = require('mongoose');
require('dotenv').config();
const Project = require('../models/Project');

const MONGODB_URI = 'mongodb+srv://aenfinitee:aenfinitee@cluster0.vigrho8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const projects = [
  {
    title: "Futuristic UI/UX for 'NeuroLinker' AI-Powered Hub App",
    subtitle: "A high-concept mobile app design for a 'thought-to-action hub' that uses AI and biometrics to predict user needs, featuring a trust-centered design and a sleek, futuristic interface.",
    imageSrc: "https://api.aenfinite.com/uploads/mobile-app/Untitled-3.avif",
    description: "This project is the UI/UX design for NeuroLinker, a high-concept mobile app that functions as a 'proactive thought-to-action hub.' The app is designed to use AI and biometric data to anticipate a user's needs and automate actions across their connected devices. The design's foremost priority is building user trust; the onboarding process clearly explains the need for sensitive permissions like camera and biometric access, prominently featuring a 'Privacy First' commitment. The UI is sleek, futuristic, and minimalist, employing a sophisticated dark mode with glowing purple and blue accents to create an intelligent and immersive feel. Despite the complexity of the underlying technology, the user experience is radically simplified. Features like 'Predictive Launch' distill complex AI predictions into simple, actionable choices, making the future of personal computing feel intuitive and secure.",
    challenge: "The paramount challenge was to earn the user's trust for an app that requires access to extremely sensitive personal and biometric data. The design had to proactively address and alleviate privacy concerns from the very first screen. The second major UX challenge was to demystify the app's 'magical' predictive capabilities, giving users a clear sense of control and customization over the 'thought-driven' triggers and actions, so the AI feels like a tool, not an unknown force.",
    solution: "The solution starts with a transparent, 'trust-first' onboarding screen. It doesn't hide the permissions it needs; it presents them upfront, explains why they are needed, and explicitly tags each one with a 'Privacy First' badge. This honesty is the foundation of user trust. To give the user a sense of control, the app provides a comprehensive yet simple 'Settings' screen for 'Thought-Driven Shortcuts.' By breaking down the controls into understandable concepts like 'Voice Tone Sensitivity' and 'Biometric Triggers,' the design gives the user clear, granular control over the AI's behavior.",
    results: [
      "A successful launch of a groundbreaking app, praised for its innovative concept and its ethical, trust-centered design approach.",
      "High user adoption despite the sensitive permissions, thanks to the transparent onboarding process.",
      "The app is featured by tech publications as a leading example of how to design for the future of human-computer interaction.",
      "Users feel empowered by the technology, leading to high satisfaction and strong word-of-mouth promotion."
    ],
    images: [
      "https://api.aenfinite.com/uploads/mobile-app/Untitled-3.avif",
      "https://api.aenfinite.com/uploads/mobile-app/unnamed (20).avif",
      "https://api.aenfinite.com/uploads/mobile-app/unnamed (19).avif",
      "https://api.aenfinite.com/uploads/mobile-app/unnamed (18).avif"
    ],
    tags: [
      "UI/UX Design",
      "Mobile App Design",
      "Conceptual Design",
      "Futuristic Design",
      "AI",
      "Biometrics",
      "Dark Mode UI",
      "Privacy-First Design"
    ],
    technologies: [
      "Figma",
      "Sketch",
      "Swift",
      "Core ML"
    ],
    category: "mobile-app",
    published: true
  },
  {
    title: "UI/UX for 'Olly' Fertility Journey Tracking App",
    subtitle: "A discreet, empathetic, and modern mobile app design that helps individuals and couples navigate and track their fertility treatment journey, such as IVF and ICSI.",
    imageSrc: "https://api.aenfinite.com/uploads/mobile-app/ollythumbnail.avif",
    description: "This project is the UI/UX design for 'Olly,' a mobile application designed to be a supportive companion for individuals and couples navigating their fertility treatment journey. The app's design is founded on principles of empathy, privacy, and clarity. It features a sophisticated and calming dark mode interface with a gentle purple and pink color palette, creating a discreet and serene digital space for a deeply personal experience. The core 'Your Journey' screen organizes complex medical timelines into a simple, easy-to-understand list of treatment cycles (IVF, ICSI, etc.), each with a clear status. The overall aesthetic is modern, gentle, and hopeful, aiming to empower users by providing a clear, organized, and supportive tool during a challenging time.",
    challenge: "The greatest challenge was to design with profound empathy. The app needed to be a calming, supportive, and private sanctuary for users on what can be a very stressful and emotional journey. The UI could not be jarring, complicated, or clinical. The second major challenge was to distill a vast amount of complex medical information and timelines associated with treatments like IVF into a simple, clear, and manageable interface.",
    solution: "The solution was a carefully considered 'calm tech' aesthetic. The dark mode UI is inherently private and less stimulating than a bright screen, and the soft, glowing UI elements create a serene atmosphere. Medical complexity is simplified by organizing the user's entire history into a single, scrollable 'Journey' timeline. Each complex treatment cycle is contained within a single, neat card with a simple status tag, transforming a confusing medical history into a clear, easy-to-follow story.",
    results: [
      "The app becomes a highly-rated and trusted companion for the fertility community.",
      "Users report feeling more organized, in control, and less stressed during their treatment cycles.",
      "The empathetic and discreet design receives praise from users and healthcare professionals for its thoughtful approach.",
      "The app successfully fills a critical need in the FemTech/HealthTech market, providing genuine support to its users."
    ],
    images: [],
    tags: [
      "UI/UX Design",
      "Mobile App Design",
      "HealthTech",
      "FemTech",
      "Wellness App",
      "Empathetic Design",
      "Dark Mode UI"
    ],
    technologies: [
      "Figma",
      "Sketch",
      "Swift",
      "Kotlin"
    ],
    category: "mobile-app",
    published: true
  }
];

async function uploadProjects() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB successfully!\n');

    console.log(`📦 Preparing to upload ${projects.length} mobile app projects...\n`);

    let uploadedCount = 0;

    for (const projectData of projects) {
      try {
        // Check if project already exists
        const existingProject = await Project.findOne({ title: projectData.title });
        
        if (existingProject) {
          console.log(`⚠️  Project "${projectData.title}" already exists. Skipping...`);
          continue;
        }

        const project = new Project(projectData);
        await project.save();
        uploadedCount++;
        
        console.log(`✅ Uploaded: ${projectData.title}`);
      } catch (error) {
        console.error(`❌ Error uploading "${projectData.title}":`, error.message);
      }
    }

    console.log('\n🎉 Upload process completed!');
    
    // Show summary
    const totalMobile = await Project.countDocuments({ category: 'mobile-app' });
    
    console.log(`\n📊 Summary:`);
    console.log(`   📱 Total Mobile App projects: ${totalMobile} (added ${uploadedCount})`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed.');
  }
}

uploadProjects();
