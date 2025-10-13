const mongoose = require('mongoose');
const Project = require('../models/Project');

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

// Function to map category names to database slugs
const mapCategoryToSlug = (categoryName) => {
  const categoryMap = {
    'UI/UX Design': 'ui-ux',
    'UI/UX': 'ui-ux', 
    'Mobile App': 'mobile-app',
    'Web Design': 'web-design-development',
    'Branding': 'branding',
    'Logo Design': 'logo-design',
    'Graphic Design': 'graphic-design',
    'Packaging Design': 'packaging-design'
  };
  
  return categoryMap[categoryName] || categoryName.toLowerCase().replace(/\s+/g, '-');
};

// Function to format image URLs
const formatImageUrl = (imageName, category) => {
  if (!imageName) return '';
  // Use the API domain with proper category slug
  return `https://api.aenfinite.com/uploads/${category}/${imageName}`;
};

// New UI/UX and Mobile App projects data
const newProjects = [
  // UI/UX Projects
  {
    "title": "UI/UX Design for Sunbase Solar Project Management Platform",
    "subtitle": "A comprehensive UI/UX design for a specialized CRM/ERP software tailored to the solar installation industry, focusing on managing complex, multi-stage projects from sales to completion.",
    "imageSrc": "ui-ux-yilmaz-satti-1.jpg",
    "description": "This project is the complete UI/UX design for Sunbase, a specialized, enterprise-grade SaaS platform for the solar installation industry. The design tackles the immense complexity of managing solar projects from the initial sales opportunity to final commissioning (PTO). The user experience is built around a deep understanding of the industry's workflow, with dedicated modules and views for sales, project management, dispatching, and reporting. Key features include a flexible Kanban-style job board for visualizing project stages, dense data tables with powerful filtering for administrative tasks, and detailed job views that consolidate all project information into a single hub. The clean, professional UI uses a minimalist aesthetic to ensure that complex data remains clear and manageable, empowering solar companies to streamline their operations and scale effectively.",
    "challenge": "The greatest challenge was to design a single, cohesive platform that could manage the entire, incredibly complex lifecycle of a solar installation project—from sales lead to final permission to operate (PTO). The UI/UX had to map out and simplify a multi-stage workflow involving numerous dependencies and departments. A further challenge was to create an interface that was powerful enough for office-based power users (like project managers) yet simple and accessible enough for various other roles within the company.",
    "solution": "The solution was a highly structured information architecture. A project's life is broken down into a clear checklist of stages (Site Survey, Permitting, Installation, etc.) visible in the detailed job view. The Kanban board provides a high-level visual overview of where all projects stand in this workflow, making it easy for managers to spot bottlenecks. To serve diverse user roles, the platform was designed with a multi-view system. A salesperson can focus on the 'Opportunity' form, a manager can use the 'Overall Task Dashboard' with high-level filters, and a project coordinator can live in the 'Job Board,' ensuring every user has a view tailored to their function.",
    "results": [
      "A significant reduction in project management overhead for solar installation companies.",
      "Improved communication and coordination between sales, engineering, and installation teams.",
      "Fewer project delays due to the clear visualization of project statuses and potential bottlenecks.",
      "Higher user adoption across client companies, as different departments find the tool genuinely useful for their specific needs."
    ],
    "images": [
      "ui-ux-yilmaz-satti-1.jpg",
      "ui-ux-yilmaz-satti-1-1.jpg",
      "ui-ux-yilmaz-satti-1-2.jpg",
      "ui-ux-yilmaz-satti-1-3.jpg",
      "ui-ux-yilmaz-satti-1-4.jpg",
      "ui-ux-yilmaz-satti-1-5.jpg",
      "ui-ux-yilmaz-satti-1-6.jpg",
      "ui-ux-yilmaz-satti-1-7.jpg"
    ],
    "tags": [
      "UI/UX Design",
      "Web Application",
      "Enterprise Software",
      "SaaS",
      "CRM",
      "Project Management",
      "Solar Industry",
      "Dashboard Design",
      "Information Architecture"
    ],
    "technologies": [
      "Figma",
      "Sketch",
      "Adobe XD",
      "React",
      "Angular"
    ],
    "category": "UI/UX",
    "published": true
  },
  {
    "title": "UI/UX Design for a Non-Profit Landing Page",
    "subtitle": "A clean, modern, and mission-driven landing page design for Circle for Justice Innovations (CJI), created to build trust, communicate their purpose, and encourage user action.",
    "imageSrc": "Preview CJI Landing Page.jpg",
    "description": "This project is the UI/UX design for the landing page of Circle for Justice Innovations (CJI), a non-profit organization dedicated to ending mass incarceration. The design is clean, modern, and mission-focused, utilizing a hopeful color palette of vibrant green and a structured layout with ample white space to create a professional and welcoming user experience. The page strategically uses powerful photography of diverse communities and activists to build an emotional connection to the cause. The information is organized into clear sections—'Our Mission,' 'About Us,' and grant opportunities—that effectively communicate the organization's purpose and impact. Strong calls-to-action guide users to get involved, making the landing page an effective tool for advocacy and engagement.",
    "challenge": "The primary challenge was to create a design that instantly builds trust and credibility for a non-profit tackling the serious and complex issue of criminal justice reform. The website needed to look professional and authoritative to attract support from donors and partner organizations. A second challenge was to communicate CJI's multifaceted mission in a way that was clear, hopeful, and inspiring, motivating visitors to take action rather than feeling overwhelmed by the scale of the problem.",
    "solution": "Trust is established through a clean, polished, and highly professional design. The transparent layout, clear 'About Us' and 'Mission' sections, and professional photography all contribute to an image of a well-run and impactful organization. The mission is broken down into digestible sections with large, clear headings. The use of a vibrant, hopeful green color and inspiring photography frames the issue in a context of positive change and action, making the mission understandable and relatable.",
    "results": [
      "A professional and compelling online presence that increased the organization's visibility and credibility.",
      "Higher user engagement, including an increase in grant applications and newsletter sign-ups.",
      "A stronger ability to attract potential donors and partners due to the trustworthy and impactful design.",
      "The website effectively serves as a central hub for communicating the organization's mission and achievements."
    ],
    "images": [],
    "tags": [
      "UI/UX Design",
      "Web Design",
      "Landing Page Design",
      "Non-Profit",
      "Social Justice",
      "Advocacy",
      "User Experience"
    ],
    "technologies": [
      "Figma",
      "Sketch",
      "Adobe XD",
      "WordPress",
      "HTML5"
    ],
    "category": "UI/UX",
    "published": true
  },
  {
    "title": "UI/UX Design for a Logistics Transport Management System (TMS)",
    "subtitle": "A data-driven and user-centric interface for 'SKL - Smart Konnect Logistics,' a SaaS platform designed to streamline transport operations, from financial overviews to real-time dispatch management.",
    "imageSrc": "skl-dashbord-1.jpg",
    "description": "This project is the complete UI/UX design for SKL Smart Konnect Logistics, a sophisticated Transport Management System (TMS) built as a SaaS platform. The design is centered around a powerful main dashboard that provides a 360-degree view of the business, featuring key financial KPIs, revenue graphs, and operational summaries. The user interface is clean, professional, and data-driven, using a dark blue and grey corporate color palette to create a focused environment. Deeper within the application, specialized workspaces like the 'Dispatch Order' screen allow for real-time tracking of logistical incidents and events. From the high-level dashboard for executives to the detailed logs for dispatchers, the entire user experience is crafted to translate complex logistics data into clear, actionable insights.",
    "challenge": "The primary challenge was to design an interface that could effectively process and display a massive amount of real-time logistical data in a clean, digestible, and actionable format. The design needed to provide both high-level summaries for managers and granular details for operational staff without becoming cluttered. A second critical challenge was to create a user experience that supports high-stakes decision-making; the data visualizations and alert systems needed to be impeccably clear and trustworthy to prevent costly operational errors.",
    "solution": "The solution was a role-centric dashboard approach. The main dashboard uses large-format data visualizations and KPI cards to summarize the most important business metrics for quick overviews. For granular detail, users can navigate to specific workspaces, like the 'Incidents' log, which use powerful filtering and sorting tools to allow them to focus only on the information they need. Clarity and trust are built through a clean, spacious layout and a professional aesthetic where the data is the hero, enabling quick and confident user actions.",
    "results": [
      "Improved operational efficiency for logistics companies by providing clear, real-time insights into their business.",
      "Faster decision-making for management due to the easily digestible dashboard and financial summaries.",
      "Reduced operational errors and faster response times to incidents due to the clear dispatch workspace.",
      "High user adoption due to the clean, modern, and intuitive interface compared to older logistics software."
    ],
    "images": [
      "skl-dashbord-2.jpg",
      "skl-dashbord-1.jpg",
      "skl-dashbord-3.jpg"
    ],
    "tags": [
      "UI/UX Design",
      "Dashboard Design",
      "Web Application",
      "SaaS",
      "Logistics",
      "TMS",
      "Data Visualization",
      "Enterprise Software"
    ],
    "technologies": [
      "Figma",
      "Sketch",
      "React",
      "D3.js"
    ],
    "category": "UI/UX",
    "published": true
  },
  {
    "title": "UI/UX Design for 'Earth Empower' Sustainability Platform",
    "subtitle": "An inspiring and professional website design for a social enterprise focused on environmental and agricultural impact, crafted to communicate their mission and showcase their work.",
    "imageSrc": "earth-empower-website-2x.jpg",
    "description": "This project is the complete UI/UX design for the 'Earth Empower' website, a platform for a social enterprise dedicated to creating a sustainable future for farmers and communities. The design is built around a natural and inspiring aesthetic, using a color palette of deep greens and earthy tones, combined with breathtaking landscape and community photography. The user experience is designed as a storytelling journey, guiding the visitor from the organization's powerful mission statement—'Transforming ideas, data and passion into impact'—down through their core values, specific projects, and tangible impact stories. The clean, spacious, and fully responsive layout ensures the website is professional, transparent, and accessible on all devices, building trust and encouraging engagement with their cause.",
    "challenge": "The primary challenge was to create a design that could effectively balance emotional, inspirational storytelling with the clear, data-driven information needed to prove the organization's impact. The website had to inspire passion for the cause while also demonstrating its credibility to potential partners, researchers, and donors. A second challenge was to authentically represent the diverse communities and environments the organization works with, creating a design that feels genuine and impactful.",
    "solution": "The design balances these two needs by dedicating different sections to each purpose. The hero section and large photos are purely inspirational, creating an emotional connection. The content sections below use a clean, card-based layout with clear headings to present factual information in a structured, easy-to-digest format. Authenticity is achieved through the careful selection of high-quality, documentary-style photography that shows real people in real situations, providing a respectful and powerful backdrop to the organization's story.",
    "results": [
      "A significant increase in online engagement, including longer time-on-site and lower bounce rates.",
      "A successful platform for attracting new partnerships and securing funding, thanks to the professional and trustworthy design.",
      "The website effectively communicates the organization's mission and impact, growing its community of supporters.",
      "Positive feedback on the beautiful, inspiring, and easy-to-navigate user experience."
    ],
    "images": [
      "earth-empower-website-2x.jpg",
      "earth-empower-website-2x-1.jpg",
      "earth-empower-website-1.jpg",
      "earth-empower-website.jpg",
      "earth-empower-website-2x-2.jpg"
    ],
    "tags": [
      "UI/UX Design",
      "Web Design",
      "Non-Profit",
      "Social Enterprise",
      "Sustainability",
      "Storytelling",
      "Responsive Design"
    ],
    "technologies": [
      "Figma",
      "Sketch",
      "Adobe XD",
      "WordPress",
      "Contentful"
    ],
    "category": "UI/UX",
    "published": true
  },
  {
    "title": "UI/UX Design for 'Eventsite' Event Platform",
    "subtitle": "A clean, modern, and responsive web design for a two-sided event marketplace, designed to make creating and discovering local events simple and intuitive.",
    "imageSrc": "Frame 2.jpg",
    "description": "This project showcases the UI/UX design for 'Eventsite,' a modern web platform for event creation and discovery. The design is clean, spacious, and fully responsive, ensuring a seamless experience on both desktop and mobile devices. It utilizes a professional and approachable color palette of blue and white, creating a trustworthy environment for users. The homepage is strategically designed to serve its two primary audiences: a prominent call-to-action in the hero section encourages hosts to 'Create Your Event,' while a powerful search function and a clear grid of 'Popular Categories' make it easy for attendees to 'Find an event near you.' The interface is built with a system of clean, card-based components, contributing to a user-friendly and scalable design.",
    "challenge": "The primary UI/UX challenge was to design a single, cohesive platform that effectively serves two distinct user groups: event creators and event attendees. The homepage and overall user flow needed to provide clear, intuitive pathways for both audiences without creating a confusing or conflicting experience. A second major challenge was to design the event creation process to be as simple and frictionless as possible, in order to encourage a steady stream of user-generated content which is vital for the platform's success.",
    "solution": "The homepage design addresses this challenge directly by dedicating distinct, high-visibility sections to each user journey. The top hero section is for creators, with a single, clear call-to-action. The very next section is for attendees, with a prominent search bar and category grid. This clear separation ensures that both user types can immediately find the tool they need. The overall clean and simple aesthetic of the site implies that the creation process will also be straightforward and user-friendly, reducing the perceived effort for hosts.",
    "results": [
      "A successful launch of a two-sided marketplace that effectively attracts both event hosts and attendees.",
      "A high rate of event creation due to the user-friendly and encouraging design.",
      "Strong user engagement from attendees, who find the platform easy to search and browse for local events.",
      "The clean, professional design helps to build a strong and trustworthy brand identity for 'Eventsite'."
    ],
    "images": [],
    "tags": [
      "UI/UX Design",
      "Web Design",
      "Platform Design",
      "Event Management",
      "Two-Sided Marketplace",
      "Responsive Design",
      "User Experience"
    ],
    "technologies": [
      "Figma",
      "Sketch",
      "Adobe XD",
      "React",
      "Vue.js"
    ],
    "category": "UI/UX Design",
    "published": true
  },
  
  // Mobile App Projects
  {
    "title": "UI/UX Design for a Handyman Finder Mobile App",
    "subtitle": "A clean, intuitive, and trust-centered mobile app design that connects users with professional local handymen for a variety of home services.",
    "imageSrc": "Preivew-HandyMan-App-1.jpg",
    "description": "This project showcases the complete UI/UX design for a 'Handyman Finder' mobile app, consisting of over 18 screens that cover the entire user journey. The design prioritizes a clean, friendly, and intuitive user experience, using a fresh green color palette and custom iconography to make the process of finding help feel simple and stress-free. The core of the user experience is built around establishing trust; features like detailed handyman profiles, transparent hourly rates, and prominent user ratings and reviews are integrated throughout the flow. From the simple onboarding process to the final payment screen, the app is designed to be a seamless and reliable tool for connecting homeowners with qualified local professionals.",
    "challenge": "The single most critical challenge was to build a foundation of trust. The UI/UX needed to overcome the inherent user anxiety of hiring a stranger for in-home services by providing clear signals of safety, quality, and reliability. A second major challenge was to distill the complex, multi-step process of finding, comparing, booking, and paying for a service into a simple and intuitive mobile user flow that feels effortless.",
    "solution": "The design tackles the trust issue head-on by making social proof the cornerstone of the experience. Handyman profiles are rich with information, including a photo, years of experience, number of jobs completed, and, most importantly, detailed, verifiable reviews from other users. Star ratings are visible at every stage. To ensure simplicity, the user flow is broken down into logical, step-by-step screens. The user is guided through one decision at a time—What service? Where? Who?—making the entire process feel manageable and straightforward.",
    "results": [
      "High user adoption rates due to the intuitive design and the solution to a common household problem.",
      "A strong sense of user safety and trust, leading to high repeat usage and positive word-of-mouth referrals.",
      "A successful two-sided marketplace that attracts both a large user base and a pool of high-quality, vetted handymen.",
      "The app becomes a go-to tool for home maintenance, demonstrating the success of its trust-centered design."
    ],
    "images": [
      "Preivew-HandyMan-App-1.jpg",
      "Preivew-HandyMan-App-2.jpg",
      "Preivew-HandyMan-App-3.jpg"
    ],
    "tags": [
      "UI/UX Design",
      "Mobile App Design",
      "Service Marketplace",
      "User Experience",
      "User Interface",
      "On-Demand Services",
      "App Design"
    ],
    "technologies": [
      "Figma",
      "Sketch",
      "Adobe XD",
      "React Native",
      "Flutter"
    ],
    "category": "Mobile App",
    "published": true
  },
  {
    "title": "UI/UX Design for 'Sceene' Nightlife & Social Discovery App",
    "subtitle": "A sleek, dark-mode mobile app designed for discovering venues, events, and connecting with people, crafted for a modern, socially active audience.",
    "imageSrc": "scene-1.jpg",
    "description": "This project showcases the complete UI/UX design for 'Sceene,' a modern mobile app for social discovery and nightlife. The entire user experience is built around a sophisticated and functional dark mode UI, which is both aesthetically pleasing and practical for use in low-light environments. The app seamlessly blends two key functionalities: a robust venue and event discovery engine with list and map views, and an integrated social network featuring user profiles and private messaging. A high-contrast color palette of black and neon green, combined with vibrant, high-quality photography, creates an energetic and premium feel. From finding the perfect club to connecting with new people, 'Sceene' is designed to be the ultimate tool for the modern urbanite's social life.",
    "challenge": "The foremost challenge was to create a distinct 'cool factor' through the UI. The app's design needed to feel exclusive, modern, and exciting to attract and retain a trend-savvy user base. Another major challenge was to seamlessly integrate the app's dual-core functionalities—utility-based venue discovery and social networking—into a single, intuitive user experience, ensuring the app felt cohesive and easy to navigate.",
    "solution": "The 'cool factor' was achieved through the deliberate choice of a premium dark mode aesthetic. This, combined with the neon green accents and emphasis on high-quality, atmospheric photography, creates a sophisticated and exclusive vibe that resonates with the target nightlife audience. To integrate the hybrid functions, a standard, familiar tab bar navigation was used. This allows users to effortlessly switch between the main contexts (e.g., Home/Discovery, Search, Messages, Profile), making the app's diverse features feel natural and unified.",
    "results": [
      "Strong user adoption within the target demographic due to the app's trendy aesthetic and useful features.",
      "High user engagement rates, with users frequently switching between the discovery and social features.",
      "The app successfully becomes a go-to platform for planning a night out and connecting with like-minded people.",
      "The premium design helps the brand secure partnerships with high-end venues and event promoters."
    ],
    "images": [
      "scene-1.jpg",
      "scene-2.jpg",
      "scene-3.jpg"
    ],
    "tags": [
      "UI/UX Design",
      "Mobile App Design",
      "Social Networking App",
      "Dark Mode UI",
      "User Experience",
      "Nightlife App",
      "Event Discovery"
    ],
    "technologies": [
      "Figma",
      "Sketch",
      "Adobe XD",
      "React Native",
      "Swift"
    ],
    "category": "Mobile App",
    "published": true
  },
  {
    "title": "UI/UX Design for a Fashion Model Career Management App",
    "subtitle": "A sleek, high-fashion mobile app designed to help professional models manage their finances, bookings, and profile, combining elegant design with powerful career tools.",
    "imageSrc": "runway1.jpg",
    "description": "This project showcases the UI/UX design for 'Runway 7,' a sophisticated mobile application designed as a career management tool for professional fashion models. The app features a sleek, minimalist, high-fashion aesthetic, utilizing a dark-mode interface and a chic color palette to resonate with its style-conscious user base. The core functionality is centered on empowering models to manage their careers, with a key feature being the 'My Finance' dashboard. This section uses unique, abstract card designs to elegantly display available balances, track incoming payments, and view payment history. The app also integrates essential tools for managing bookings, schedules, and a professional profile with physical measurements, creating an all-in-one digital companion for the modern model.",
    "challenge": "The primary challenge was to merge a high-fashion aesthetic with the robust functionality of a financial and scheduling tool. The design needed to be visually exquisite to be credible within the fashion industry, while also presenting complex financial and booking information in an incredibly clear and user-friendly way. A second challenge was to tailor the entire experience to the unique workflow of a professional model, addressing their specific needs for tracking payments from multiple clients and managing their availability.",
    "solution": "The solution was to embrace a minimalist, 'less is more' approach. The dark mode UI provides a sophisticated canvas, and financial data is abstracted into clean, elegant cards with subtle color accents, making it feel less like a spreadsheet and more like a curated feed. The app's features are directly mapped to a model's career needs, with detailed finance tracking and a professional profile section that includes specific industry requirements like physical measurements, demonstrating that the app is purpose-built for its niche audience.",
    "results": [
      "The app becomes an indispensable tool for models, helping them professionalize their financial and schedule management.",
      "High adoption rates within modeling agencies and by freelance models due to its beautiful design and tailored functionality.",
      "The app empowers models by giving them a clear, transparent view of their earnings and bookings.",
      "The brand is perceived as a premium, industry-insider tool, enhancing its credibility and appeal."
    ],
    "images": [
      "runway1.jpg",
      "runway-3.jpg",
      "runway2.jpg"
    ],
    "tags": [
      "UI/UX Design",
      "Mobile App Design",
      "Fashion Tech",
      "FinTech",
      "Career Management",
      "User Experience",
      "Dark Mode UI"
    ],
    "technologies": [
      "Figma",
      "Sketch",
      "Adobe XD",
      "React Native",
      "Swift"
    ],
    "category": "Mobile App",
    "published": true
  },
  {
    "title": "UI/UX Design for 'Tada' Live Shopping & Social Commerce App",
    "subtitle": "A vibrant and engaging mobile app that merges short-form video content with a seamless e-commerce experience, designed for the modern social shopper.",
    "imageSrc": "tada-app-1.jpg",
    "description": "This project showcases the UI/UX design for 'Tada,' a cutting-edge social commerce mobile app that blends the worlds of short-form video and live shopping. The app is designed for a discovery-driven user journey, allowing users to browse a dynamic feed of shoppable videos from various creators. The UI features a clean and bright 'light mode' for the main shopping interface to ensure clarity and ease of use, while the full-screen video player switches to an immersive 'dark mode' for a better viewing experience. With a vibrant pink accent color and a modern, intuitive layout, the design is crafted to be energetic, trendy, and engaging, creating a seamless and entertaining platform for the next generation of e-commerce.",
    "challenge": "The main UI/UX challenge was to seamlessly embed e-commerce functionality within a video-first entertainment platform. The shopping experience had to feel like a natural extension of the content, not a disruptive advertisement. A second critical challenge was to build a strong foundation of trust for transactions. The app needed to feel as secure and reliable as a traditional e-commerce giant, even though the primary interface is a dynamic, user-generated social feed.",
    "solution": "The design integrates shopping by making the content itself shoppable, with clear product info on thumbnails and a dedicated 'Store' tab on creator profiles. This allows users to easily switch from entertainment to a dedicated shopping mode. Trust is built through a clean, professional, and familiar e-commerce backend. The 'My Profile' screen contains all the standard, reassuring elements of a traditional shopping app ('My Orders,' 'Payment Methods'), giving the user confidence that their data and transactions are handled professionally.",
    "results": [
      "High user engagement and retention due to the addictive, video-first discovery model.",
      "A high conversion rate from viewer to customer, thanks to the seamless integration of shopping features.",
      "The app successfully attracts both a large base of consumers and a community of creators/sellers.",
      "The brand becomes a key player in the rapidly growing social commerce market."
    ],
    "images": [
      "tada-app-1.jpg",
      "tada-app-2.jpg",
      "tada-app-3.jpg"
    ],
    "tags": [
      "UI/UX Design",
      "Mobile App Design",
      "Social Commerce",
      "Live Shopping",
      "E-commerce",
      "User Experience",
      "App Design"
    ],
    "technologies": [
      "Figma",
      "Sketch",
      "Adobe XD",
      "React Native",
      "Flutter"
    ],
    "category": "Mobile App",
    "published": true
  }
];

// Upload function
const uploadProjects = async () => {
  try {
    let uiuxCount = 0;
    let mobileAppCount = 0;
    
    for (const projectData of newProjects) {
      // Map category to database slug
      const categorySlug = mapCategoryToSlug(projectData.category);
      
      // Format all image URLs
      const formattedImages = projectData.images.map(img => 
        formatImageUrl(img, categorySlug)
      );
      
      // Create project object
      const project = new Project({
        title: projectData.title,
        subtitle: projectData.subtitle,
        imageSrc: formatImageUrl(projectData.imageSrc, categorySlug),
        description: projectData.description,
        challenge: projectData.challenge,
        solution: projectData.solution,
        results: projectData.results,
        images: formattedImages,
        tags: projectData.tags,
        technologies: projectData.technologies,
        category: categorySlug, // Use mapped category slug
        published: projectData.published
      });

      await project.save();
      
      if (categorySlug === 'ui-ux') {
        uiuxCount++;
      } else if (categorySlug === 'mobile-app') {
        mobileAppCount++;
      }
      
      console.log(`✅ Uploaded: ${projectData.title}`);
    }

    console.log('\n🎉 Upload Summary:');
    console.log(`📱 UI/UX Projects: ${uiuxCount}`);
    console.log(`📱 Mobile App Projects: ${mobileAppCount}`);
    console.log(`📊 Total uploaded: ${newProjects.length}`);
    
  } catch (error) {
    console.error('❌ Upload error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
};

// Run the upload
const main = async () => {
  await connectDB();
  await uploadProjects();
};

main();