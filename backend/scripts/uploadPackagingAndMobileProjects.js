const mongoose = require('mongoose');
require('dotenv').config();
const Project = require('../models/Project');

const MONGODB_URI = 'mongodb+srv://aenfinitee:aenfinitee@cluster0.vigrho8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const projects = [
  // Packaging Design Projects
  {
    title: "Modern Wellness Product Packaging for 'Hungovr AF'",
    subtitle: "A clean, bold, and clever packaging design for a hangover/headache relief cap, blending a fun lifestyle brand personality with a trustworthy, solution-oriented presentation.",
    imageSrc: "https://api.aenfinite.com/uploads/packaging-design/Packaging Design - HUNGOVR-01 (1).avif",
    description: "This project is the complete packaging design for 'Hungovr AF,' a modern wellness product designed as a headache and migraine relief cap. The branding and packaging are strategically designed to balance a playful, lifestyle-oriented personality with a clean, effective, and trustworthy presentation. The design uses a bold, high-contrast black, white, and blue color scheme with a 'night sky' theme, cleverly nodding to the 'morning after' use case while also creating a calming aesthetic. The front of the box features a die-cut window to showcase the product, while the back panel is meticulously organized to build credibility, featuring an icon-based list of benefits, a brand mission statement, and a customer testimonial. This dual approach allows the brand to be both memorable and medically credible.",
    challenge: "The key design challenge was to navigate a delicate balance of tone. The packaging needed to reflect the fun, edgy brand name 'Hungovr AF' without trivializing the product's serious function as a pain relief device for headaches and migraines. The design had to be both cool and credible. A further challenge was to clearly explain a relatively novel product, showing the consumer what it is and how it provides relief.",
    solution: "The design balances the tone by separating the playful from the professional. The brand name and front-of-box tagline are fun and attention-grabbing, while the overall design aesthetic is very clean, minimalist, and almost clinical. The back of the box is purely functional and trust-building, with icons explaining the therapeutic benefits. The die-cut window on the front of the box and the inclusion of in-use photography in the presentation clearly show the product and its function.",
    results: [
      "The memorable brand name and strong packaging design lead to a successful product launch with high social media visibility.",
      "The design successfully attracts the target demographic of young adults while also appealing to a broader audience looking for migraine relief.",
      "The clear, benefit-driven information on the back of the box builds consumer trust and drives sales.",
      "The brand stands out in the wellness market as a modern, innovative, and effective solution."
    ],
    images: [],
    tags: [
      "Packaging Design",
      "Graphic Design",
      "DTC",
      "Wellness Product",
      "Brand Identity",
      "CPG",
      "Retail Packaging"
    ],
    technologies: [
      "Adobe Illustrator",
      "Adobe Photoshop"
    ],
    category: "packaging-design",
    published: true
  },
  {
    title: "Branding & Packaging for 'Riviera' Delivery Service",
    subtitle: "A modern and dynamic packaging design for a line of poly mailer bags, creating a strong and trustworthy brand identity for an express shipping company.",
    imageSrc: "https://api.aenfinite.com/uploads/packaging-design/Packaging Design - RIVIERA-02.avif",
    description: "This project is the brand identity and packaging design for 'Riviera Delivery,' a modern express shipping company. The core of the identity is a smart and dynamic logo where the letter 'A' is stylized into a forward-pointing arrow, instantly communicating speed and direction. This strong brand mark is applied to a key piece of operational packaging: poly mailer bags. The design uses a distinctive and professional color palette of deep green and vibrant red to stand out from competitors. The layout on the mailers is clean and bold, prominently featuring the logo and key value propositions like 'Reliable Express Shipping.' This project demonstrates how functional packaging can be transformed into a powerful branding tool, creating a consistent and trustworthy image for the company at every step of the delivery process.",
    challenge: "The primary challenge was to create a design that is visually distinctive enough to make 'Riviera Delivery' packages instantly recognizable in a logistics environment crowded with competitors. A second, practical challenge was to create a design that was bold and impactful, yet simple enough to remain functional as a piece of packaging, leaving ample clear space for shipping labels and withstanding the rigors of transit.",
    solution: "The solution was to use a strong and unconventional color palette. The combination of deep green and red is not commonly used by major international couriers, giving Riviera a unique visual signature. The design is bold but not cluttered, using large blocks of color and text placed strategically. This leaves a large, clean area in the center of the mailer for the placement of shipping labels without obscuring the core branding elements.",
    results: [
      "A strong and recognizable brand identity that helps Riviera Delivery compete effectively in the logistics market.",
      "The professional packaging increases perceived value and customer trust.",
      "The distinctive bags act as mobile advertisements, increasing brand awareness wherever they are seen.",
      "The design system, with its light and dark variations, provides flexibility for different shipping needs."
    ],
    images: [],
    tags: [
      "Packaging Design",
      "Branding",
      "Corporate Identity",
      "Logistics",
      "Courier Service",
      "Graphic Design",
      "Logo Design"
    ],
    technologies: [
      "Adobe Illustrator",
      "Adobe Photoshop"
    ],
    category: "packaging-design",
    published: true
  },
  {
    title: "Vibrant & Playful Swag Box Packaging for Mixbook",
    subtitle: "A modern and engaging packaging design for a corporate swag box, using a vibrant color palette and abstract patterns to create a joyful unboxing experience.",
    imageSrc: "https://api.aenfinite.com/uploads/packaging-design/Packaging Design - Swag Box-01.jpg",
    description: "This project is the complete packaging design for a corporate 'Swag Box' for the brand 'mixbook.' The design is centered on creating a vibrant and joyful unboxing experience. It features a playful and modern abstract pattern of fluid, organic shapes that covers the entire mailer box, both inside and out. A vibrant color palette of rich blues and sunny yellow creates an energetic and optimistic feel, perfectly aligning with the brand's tagline, 'Life is for sharing.' The design includes thoughtful details like a 'DO NOT OPEN UNTIL' sticker to build anticipation, and a matching insert card that communicates the brand's story. The entire package is designed to be more than just a box; it's a memorable brand interaction.",
    challenge: "The primary challenge was to design a corporate gift box that felt personal, exciting, and anything but generic. The design needed to create a genuine sense of delight for the recipient. A second, related challenge was to create a highly 'shareable' unboxing experience. The packaging needed to be visually stunning from the moment it arrives to the final reveal, encouraging recipients to post about it on social media and organically amplify the brand's reach.",
    solution: "The solution was a humanistic aesthetic. The friendly lowercase logo with a heart, the 'Life is for sharing' tagline, and the warm message on the insert card all create an emotional connection. The unboxing experience was carefully considered: the pattern wraps the entire box, so there are no boring sections. The 'DO NOT OPEN UNTIL' sticker adds interactive fun, and the fully printed interior ensures the visual delight continues after opening, making the entire process visually rich and perfect for sharing online.",
    results: [
      "An overwhelmingly positive reception from recipients of the swag box, strengthening their relationship with the 'mixbook' brand.",
      "Significant organic social media buzz as recipients share photos and videos of the beautiful unboxing experience.",
      "The packaging successfully reinforced 'mixbook's' brand identity as creative, modern, and focused on sharing and connection.",
      "The design set a new standard for the company's corporate gifting and marketing efforts."
    ],
    images: [],
    tags: [
      "Packaging Design",
      "Graphic Design",
      "Unboxing Experience",
      "Brand Identity",
      "Swag Box",
      "E-commerce Packaging",
      "Corporate Gifting"
    ],
    technologies: [
      "Adobe Illustrator",
      "Adobe Photoshop"
    ],
    category: "packaging-design",
    published: true
  },
  {
    title: "Gentle & Informative Hang Tag for a Children's Soft Toy",
    subtitle: "A soft and calming packaging design for a 'ZhuZhu' microwavable comfort toy, expertly balancing a cute aesthetic with crucial safety and usage instructions.",
    imageSrc: "https://api.aenfinite.com/uploads/packaging-design/Soft Toy - HangTag  Design-01.avif",
    description: "This project is the complete design of a multi-page hang tag for 'ZhuZhu Warm Snuggles,' a microwavable, lavender-fragranced soft toy for children. The design's primary goal is to balance a gentle, comforting aesthetic with the critical need for clear safety and usage information. It features a soft, soothing color palette and a charming illustration of two teddy bears to create an immediate emotional connection. The tag's structure is a key part of the design; its folded layout dedicates distinct pages for branding, detailed 'Instructions For Use,' and crucial 'Warning' information. The clean typography and organized layout ensure all instructions are easy to follow, while the prominent display of safety standard certifications builds essential trust with parents and caregivers.",
    challenge: "The paramount challenge for this project was to prioritize safety. The design had to present critical heating instructions and safety warnings in a clear, legible, and unambiguous way to ensure the product is used correctly by caregivers. A second challenge was to seamlessly integrate this serious, instructional content within a design that also needed to be soft, cute, and emotionally appealing to align with the product's comforting nature.",
    solution: "The solution was to use a multi-page tag structure. This allowed for dedicated space for warnings and instructions, separated from the main branding. The use of clear headings, numbered lists, and a simple, highly legible font ensures the information is easy to follow. The 'Warning' section is highlighted with a distinct background color to draw attention to it. The cute elements are used on the front cover to attract the customer, while the inner pages transition to a more functional, clean layout, creating a perfect balance.",
    results: [
      "A product that is well-received by parents, who appreciate the clear instructions and the trustworthy, safety-conscious design.",
      "The clear instructions lead to correct product use and high customer satisfaction, reducing customer service issues.",
      "The charming design on the front of the tag helps the product stand out on the retail shelf and contributes to strong sales.",
      "The brand 'ZhuZhu' is established as a caring, responsible, and high-quality children's brand."
    ],
    images: [],
    tags: [
      "Packaging Design",
      "Graphic Design",
      "Hang Tag Design",
      "Children's Products",
      "Toy Packaging",
      "Information Design",
      "Safety Compliance"
    ],
    technologies: [
      "Adobe Illustrator",
      "Adobe Photoshop"
    ],
    category: "packaging-design",
    published: true
  },
  {
    title: "Vibrant Swag Box Insert Card for Mixbook",
    subtitle: "A modern and engaging insert card design for a corporate swag box, using vibrant patterns to create a joyful brand experience.",
    imageSrc: "https://api.aenfinite.com/uploads/packaging-design/swagboxmockup.avif",
    description: "This project is the complete packaging design for a corporate 'Swag Box' for the brand 'mixbook.' The design is centered on creating a vibrant and joyful unboxing experience. It features a playful and modern abstract pattern of fluid, organic shapes that covers the mailer box and the accompanying insert card. A vibrant color palette of rich blues and sunny yellow creates an energetic and optimistic feel, perfectly aligning with the brand's tagline, 'Life is for sharing.' The entire package, including the heartfelt message on the insert, is designed to be more than just a gift; it's a memorable brand interaction.",
    challenge: "The primary challenge was to design a corporate gift box that felt personal, exciting, and anything but generic. The design needed to create a genuine sense of delight for the recipient. A second, related challenge was to create a highly 'shareable' unboxing experience. The packaging needed to be visually stunning from the moment it arrives to the final reveal, encouraging recipients to post about it on social media and organically amplify the brand's reach.",
    solution: "The design achieves a personal feel through its playful and humanistic aesthetic. The friendly lowercase logo with a heart, the 'Life is for sharing' tagline, and the warm, welcoming message on the insert card all work together to create an emotional connection. The unboxing experience was carefully considered: the vibrant pattern makes the package visually rich from every angle, and the insert card provides a narrative, making the entire process perfect for sharing online.",
    results: [
      "An overwhelmingly positive reception from recipients of the swag box, strengthening their relationship with the 'mixbook' brand.",
      "Significant organic social media buzz as recipients share photos and videos of the beautiful unboxing experience.",
      "The packaging successfully reinforced 'mixbook's' brand identity as creative, modern, and focused on sharing and connection.",
      "The design set a new standard for the company's corporate gifting and marketing efforts."
    ],
    images: [],
    tags: [
      "Packaging Design",
      "Graphic Design",
      "Unboxing Experience",
      "Brand Identity",
      "Swag Box",
      "Corporate Gifting",
      "Print Design"
    ],
    category: "packaging-design",
    published: true
  },
  // Mobile App Projects
  {
    title: "UI/UX Design for 'FiscoClic' Mobile Invoicing App",
    subtitle: "A clean, user-friendly, and professional fintech mobile app for small businesses in the Mexican market, designed to simplify invoicing, client management, and financial tracking.",
    imageSrc: "https://api.aenfinite.com/uploads/mobile-app/fiscoclicthumbnail.avif",
    description: "This project is the complete UI/UX design for FiscoClic, a mobile fintech application designed to simplify invoicing and financial management for small businesses, specifically tailored for the Mexican market. The design philosophy is centered on clarity and ease of use, employing a clean, modern interface with a professional blue and green color palette to make business finances feel accessible and manageable. The app's core features include a powerful dashboard with data visualizations for tracking income, as well as dedicated sections for managing invoices, products, and clients. The user flow is highly intuitive, utilizing a standard bottom tab bar for navigation and prominent floating action buttons for key tasks like creating a new invoice. Every screen is designed to be clean, scannable, and efficient, empowering business owners to handle their fiscal responsibilities on the go.",
    challenge: "The greatest challenge was to distill the complex, rule-heavy process of official invoicing and financial tracking into a simple, intuitive, and error-proof mobile experience for busy small business owners. The app had to handle specific fiscal requirements (like Mexican SAT codes) without overwhelming the user. The second, equally critical, challenge was to design an interface that felt completely secure and trustworthy, encouraging users to manage their core business finances through the app.",
    solution: "Complexity is managed through a clean, task-oriented design. The app is broken down into four simple sections via the bottom tab bar. Long forms, like the 'Generate Invoice' screen, use collapsible accordion sections, so the user only has to focus on one part of the task at a time. Trust is built through a highly professional and polished UI. The clean design, consistent use of a corporate blue color, and clear data visualizations all contribute to an impression of a serious, reliable financial tool.",
    results: [
      "High adoption among small businesses and freelancers looking for an easy, on-the-go invoicing solution.",
      "A significant reduction in the time and stress users spend on their financial administration.",
      "The user-friendly design leads to fewer data entry errors and improved invoicing accuracy.",
      "The app becomes an essential tool for SME financial management in its target market, earning high ratings and positive reviews."
    ],
    images: [
      "https://api.aenfinite.com/uploads/mobile-app/fiscoclicthumbnail.avif",
      "https://api.aenfinite.com/uploads/mobile-app/300x0w (5).avif",
      "https://api.aenfinite.com/uploads/mobile-app/300x0w (7).avif",
      "https://api.aenfinite.com/uploads/mobile-app/300x0w.avif",
      "https://api.aenfinite.com/uploads/mobile-app/300x0w (2).avif",
      "https://api.aenfinite.com/uploads/mobile-app/300x0w (3).avif",
      "https://api.aenfinite.com/uploads/mobile-app/300x0w (6).avif",
      "https://api.aenfinite.com/uploads/mobile-app/300x0w (4).avif",
      "https://api.aenfinite.com/uploads/mobile-app/300x0w (1)_converted.avif"
    ],
    tags: [
      "UI/UX Design",
      "Mobile App Design",
      "FinTech",
      "B2B",
      "SaaS",
      "Invoicing App",
      "Dashboard Design"
    ],
    technologies: [
      "Figma",
      "Sketch",
      "React Native",
      "Flutter"
    ],
    category: "mobile-app",
    published: true
  },
  {
    title: "Futuristic UI/UX for 'Lumea' 3D Memory Curation App",
    subtitle: "A high-concept and immersive mobile app design that allows users to visualize their life, passions, and memories as a personal 3D 'universe,' blending journaling with spatial data visualization.",
    imageSrc: "https://api.aenfinite.com/uploads/mobile-app/lumeaUntitled-1.avif",
    description: "This project is the UI/UX design for Lumea, a high-concept mobile app that reimagines personal journaling for the 3D era. The app's mission is to allow users to 'curate and visualize their entire life, passions, and memories in immersive 3D.' The core of the user experience is the 'Universe' feature, a unique spatial interface where memories are represented as glowing orbs that can be connected to form a personal constellation of experiences. The UI is defined by a futuristic and atmospheric dark mode, using vibrant neon purples and blues to create an ethereal and immersive feel. In addition to the Universe view, users can create linear 'Threads' that weave together notes, photos, videos, and even music to tell rich, multi-sensory stories. The entire app is designed to be more than a utility; it's an experiential platform for self-discovery and digital legacy.",
    challenge: "The greatest UX challenge was to introduce and teach users a completely new paradigm for interacting with their personal data. The abstract 'Universe' concept of a non-linear, spatial memory map is unfamiliar, so the design needed a highly intuitive onboarding process to make it feel natural and empower the user. A second major challenge was to balance the app's rich, visually intensive, and atmospheric aesthetic with the need for a smooth, fast, and battery-efficient performance on a mobile device.",
    solution: "The solution begins with a simple, inspiring welcome screen that states the app's purpose in clear, aspirational terms. The user journey would then involve a guided tutorial to teach the core mechanics through action. The dark mode UI is inherently more power-efficient on OLED screens, and the glowing effects are used as accents rather than covering the entire screen. The UI components, while styled to look futuristic, are based on standard, performance-optimized mobile patterns like scrollable lists and cards, ensuring the underlying structure is efficient.",
    results: [
      "The app successfully launches and is praised by the tech and design community for its innovative approach to personal data and journaling.",
      "High user engagement and retention, as users become invested in building and curating their personal 'universe.'",
      "The app carves out a new niche in the market, appealing to users interested in mindfulness, digital legacy, and creative self-expression.",
      "The stunning visual design leads to significant organic sharing and word-of-mouth growth."
    ],
    images: [
      "https://api.aenfinite.com/uploads/mobile-app/lumeaUntitled-1.avif",
      "https://api.aenfinite.com/uploads/mobile-app/unnamed (23).avif",
      "https://api.aenfinite.com/uploads/mobile-app/unnamed (24).avif",
      "https://api.aenfinite.com/uploads/mobile-app/unnamed (25).avif",
      "https://api.aenfinite.com/uploads/mobile-app/unnamed (22).avif"
    ],
    tags: [
      "UI/UX Design",
      "Mobile App Design",
      "Conceptual Design",
      "Product Design",
      "Data Visualization",
      "Dark Mode UI",
      "Futuristic Design"
    ],
    technologies: [
      "Figma",
      "Sketch",
      "Unity",
      "React Native",
      "Three.js"
    ],
    category: "mobile-app",
    published: true
  },
  {
    title: "UI/UX for 'MindFit' Holistic Wellness App",
    subtitle: "A serene and immersive mobile app that combines guided meditation, physical workouts, and gamified progress tracking, designed to enhance both mental and physical well-being.",
    imageSrc: "https://api.aenfinite.com/uploads/mobile-app/Untitled-1.avif",
    description: "This project is the UI/UX design for 'MindFit,' a holistic wellness mobile app designed to nurture both mind and body. The app provides a comprehensive suite of features, including guided physical workouts like yoga, and mindfulness sessions such as animated breathing exercises. The user interface is built on a serene and immersive dark mode aesthetic, using a calming green accent color to promote a sense of focus and vitality. A standout feature is the 'Mind Tree,' a beautiful, gamified visualization of the user's progress in areas like Mindfulness, Focus, and Energy, which grows as they engage with the app. From its mesmerizing 3D animations to its clean, intuitive layout, MindFit is designed to be a beautiful and effective tool for anyone on a journey to improved mental and physical health.",
    challenge: "The greatest UX challenge was to design an experience that fosters long-term user engagement and habit formation, a common hurdle for wellness apps. The app needed to be more than just a collection of exercises; it had to be a motivating companion. The second challenge was to create an interface that was inherently calming and simple to navigate, ensuring that the app itself was a stress-free environment, even while offering a diverse range of features.",
    solution: "To foster long-term engagement, the design incorporates a unique and beautiful gamification element: the 'Mind Tree.' This feature provides a positive, non-competitive visual reward for consistency, turning the abstract idea of 'progress' into a tangible, growing digital plant. To create a calm experience, a disciplined, minimalist dark mode UI was used. This reduces eye strain and creates a focused atmosphere, ensuring the user experience is serene and purposeful.",
    results: [
      "High user retention and daily active user rates due to the engaging and motivating 'Mind Tree' feature.",
      "Positive reviews praising the app's beautiful design, calming atmosphere, and ease of use.",
      "The app successfully carves out a niche as a premium, all-in-one solution in the competitive wellness market.",
      "The community and map features foster a sense of connection, further increasing user engagement."
    ],
    images: [
      "https://api.aenfinite.com/uploads/mobile-app/Untitled-1.avif",
      "https://api.aenfinite.com/uploads/mobile-app/unnamed (10).avif",
      "https://api.aenfinite.com/uploads/mobile-app/unnamed (9).avif",
      "https://api.aenfinite.com/uploads/mobile-app/unnamed (12).avif",
      "https://api.aenfinite.com/uploads/mobile-app/unnamed (11).avif"
    ],
    tags: [
      "UI/UX Design",
      "Mobile App Design",
      "Wellness App",
      "Health & Fitness",
      "Mindfulness",
      "Dark Mode UI",
      "Gamification"
    ],
    technologies: [
      "Figma",
      "Sketch",
      "Blender",
      "React Native",
      "Swift"
    ],
    category: "mobile-app",
    published: true
  },
  {
    title: "UI/UX for a Social Concert & Ticketing Mobile App",
    subtitle: "A sleek, dark-mode mobile app that combines event discovery, seamless seat selection, and deep community features like fan clubs and polls, creating an all-in-one platform for music lovers.",
    imageSrc: "https://api.aenfinite.com/uploads/mobile-app/neocertbanner.avif",
    description: "This project is the complete UI/UX design for a modern social concert and ticketing mobile app, conceptualized under the names 'ChronoWave' and 'NEOCERT.' The app is designed as an all-in-one ecosystem for music fans, seamlessly blending event discovery, ticketing, and a rich social community. The user interface is built on a sleek and immersive dark mode, using a vibrant blue accent color to create an energetic and premium feel. Key user flows have been meticulously designed for simplicity and engagement, from a social home feed that mixes event announcements with user comments, to an incredibly intuitive visual seat selection process. The app goes beyond simple ticketing by incorporating deep community features like fan clubs and live polls, transforming the solitary act of buying a ticket into a shared social experience.",
    challenge: "The biggest UX challenge was to architect an app that successfully integrates three different platform types—a social network, an event discovery service, and a transactional ticketing engine—into one seamless user experience. The design had to feel unified, not like three separate apps stitched together. Another critical challenge was to design a ticketing and seat selection flow that was visually clear, incredibly simple, and completely frictionless, especially during high-demand ticket sales.",
    solution: "The app is unified through a consistent dark mode UI and a simple, standard bottom tab bar that gives users a familiar anchor point. The home feed cleverly blends event announcements and user comments, naturally teaching the user that this is a social platform. The seat selection screen is a model of clarity, using a simple visual map and clear color-coding for 'Available,' 'Selected,' and 'Unavailable' seats, which removes ambiguity and makes a complex process feel simple.",
    results: [
      "The app becomes the go-to platform for a new generation of concert-goers who value community and social interaction.",
      "The seamless ticketing experience leads to higher conversion rates and customer satisfaction compared to older ticketing websites.",
      "High user engagement and retention due to the rich social features like fan clubs and polls, creating a strong network effect.",
      "The premium design and user experience allow the brand to secure exclusive partnerships with major artists and event promoters."
    ],
    images: [
      "https://api.aenfinite.com/uploads/mobile-app/neocertbanner.avif",
      "https://api.aenfinite.com/uploads/mobile-app/unnamed (1).avif",
      "https://api.aenfinite.com/uploads/mobile-app/unnamed (2).avif",
      "https://api.aenfinite.com/uploads/mobile-app/unnamed (3).avif",
      "https://api.aenfinite.com/uploads/mobile-app/unnamed (4).avif"
    ],
    tags: [
      "UI/UX Design",
      "Mobile App Design",
      "Social Media App",
      "Ticketing App",
      "Event Discovery",
      "Dark Mode UI",
      "Community Platform"
    ],
    technologies: [
      "Figma",
      "Sketch",
      "Adobe XD",
      "React Native",
      "Swift"
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

    console.log(`📦 Preparing to upload ${projects.length} projects (5 Packaging + 4 Mobile App)...\n`);

    let packagingCount = 0;
    let mobileCount = 0;

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
        
        // Count by category
        if (projectData.category === 'packaging-design') packagingCount++;
        if (projectData.category === 'mobile-app') mobileCount++;
        
        console.log(`✅ Uploaded: ${projectData.title} [${projectData.category}]`);
      } catch (error) {
        console.error(`❌ Error uploading "${projectData.title}":`, error.message);
      }
    }

    console.log('\n🎉 Upload process completed!');
    
    // Show summary
    const totalPackaging = await Project.countDocuments({ category: 'packaging-design' });
    const totalMobile = await Project.countDocuments({ category: 'mobile-app' });
    
    console.log(`\n📊 Category Summary:`);
    console.log(`   📦 Packaging Design: ${totalPackaging} (added ${packagingCount})`);
    console.log(`   📱 Mobile App: ${totalMobile} (added ${mobileCount})`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed.');
  }
}

uploadProjects();
