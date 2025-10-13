const mongoose = require('mongoose');
const Project = require('../models/Project');
require('dotenv').config();

// Your projects data
const projectsData = [
  {
    "title": "Modern & Vibrant Social Media Templates for Fashion E-commerce",
    "subtitle": "A versatile collection of eye-catching Instagram post templates designed to boost engagement and drive online sales for fashion brands.",
    "imageSrc": "/uploads/graphic-design/5f39d5c21a2c7_thumb900.jpg",
    "description": "This project involved the design and creation of a cohesive set of six social media templates tailored for online fashion stores and boutiques. The goal was to provide a ready-to-use toolkit for businesses to announce new arrivals, promote sales, and showcase products in a visually appealing and consistent manner. Each template features clean layouts, bold typography, and strategic use of color to capture user attention on crowded social media feeds.",
    "challenge": "The primary challenge was to create a set of templates that were not only trendy and aligned with the fashion industry's aesthetic but also highly flexible and user-friendly. The designs needed to be easily customizable for brands with varying visual identities, allowing them to insert their own product images, logos, and promotional text without compromising the design's integrity. The key was to balance a unique, polished look with practical, easy-to-edit functionality.",
    "solution": "The solution was to develop a collection of templates using a modern, minimalist approach with vibrant color accents. I created a structured layout with clearly defined zones for images, headlines (e.g., 'JUST FOR YOU', 'SUPER SALE'), and calls-to-action ('Shop Now', '30% OFF'). By using a consistent font family and a complementary color palette, the templates work well individually or as part of a larger campaign, ensuring brand consistency. The designs were created to be easily editable in popular software like Adobe Photoshop or Canva.",
    "results": [
      "A comprehensive and reusable set of 6 high-impact social media templates.",
      "Streamlined the content creation process for clients, saving time and resources.",
      "Empowered small businesses to maintain a professional and consistent brand presence online.",
      "Designs are optimized to increase click-through rates with clear calls-to-action."
    ],
    "images": [
      "/uploads/graphic-design/5f39d5c21a2c7_thumb900.jpg"
    ],
    "tags": [
      "Social Media Design",
      "Instagram Templates",
      "Fashion Marketing",
      "E-commerce Graphics",
      "Brand Identity",
      "Digital Marketing",
      "Sale Promotion",
      "Graphic Design"
    ],
    "technologies": [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Canva"
    ],
    "category": "graphic-design",
    "published": true
  },
  {
    "title": "R5 Autotech: E-commerce Platform for Luxury Car Parts",
    "subtitle": "A custom web design and development project to create a seamless online shopping experience for a supplier of authentic automotive spare parts.",
    "imageSrc": "/uploads/web-design-development/screencapture-r5autotech-co-uk.jpg",
    "description": "This project involved the end-to-end creation of a bespoke e-commerce website for R5 Autotech, a specialist in premium and luxury car parts for brands like Audi, Bentley, and Volkswagen. The platform is designed with a clean, professional aesthetic to build customer trust and reflect the high quality of the products. It features intuitive navigation, clear product categorization, and a streamlined user journey from browsing to checkout.",
    "challenge": "The primary challenge was to design a user interface that simplifies the often-complex process of finding specific auto parts. The site needed to handle a diverse inventory while providing a high-end, trustworthy experience for a discerning customer base. The backend also required a robust system for managing products, inventory, and orders efficiently.",
    "solution": "A custom e-commerce solution was developed using a scalable platform. We implemented a clean, responsive design with a powerful search function and logical categorization by vehicle brand. High-quality imagery and detailed product pages help users confirm they are purchasing the correct part. The user experience is optimized for both desktop and mobile devices, and a secure, streamlined checkout process was integrated to maximize conversions.",
    "results": [
      "Successfully launched a professional and fully functional e-commerce store.",
      "Created an intuitive user experience that simplifies the search for specific parts.",
      "Established a strong online presence that conveys trust and authority in the luxury auto parts market.",
      "Provided the client with an easy-to-use admin panel for managing products and orders."
    ],
    "images": [
      "/uploads/web-design-development/screencapture-r5autotech-co-uk.jpg"
    ],
    "tags": [
      "Web Design",
      "Web Development",
      "E-commerce",
      "UI/UX",
      "Automotive",
      "Responsive Design",
      "WooCommerce"
    ],
    "technologies": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "PHP",
      "WordPress",
      "WooCommerce",
      "MySQL"
    ],
    "category": "web-design-development",
    "published": true
  },
  {
    "title": "Windsor Beauty: B2B E-commerce Portal for Salon Professionals",
    "subtitle": "A comprehensive e-commerce website designed exclusively for licensed beauty professionals, featuring a members-only product catalog and wholesale pricing.",
    "imageSrc": "/uploads/web-design-development/Windsor-home.jpg",
    "description": "This project involved the complete design and development of a B2B e-commerce platform for Windsor Beauty, a key distributor of professional salon products in Michigan. The website serves as an exclusive online store for licensed professionals, offering a vast catalog of hair care, hair color, and styling products. The platform includes a dynamic homepage for promotions, detailed product pages, and a multi-level category structure to ensure easy navigation through thousands of items.",
    "challenge": "The primary challenge was to create a dual-experience website. It needed to serve as a public-facing informational site while restricting full catalog access and pricing to verified, logged-in professional customers. This required a robust user registration, verification, and role-management system. Additionally, the site architecture had to logically organize an extensive and complex product inventory from numerous brands to allow for a quick and efficient ordering process for busy professionals.",
    "solution": "We developed a custom e-commerce solution with a sophisticated user authentication system. A role-based access control was implemented, ensuring that wholesale pricing and the 'Add to Cart' functionality were only visible to approved accounts. The front-end features a clean, intuitive navigation with a persistent category sidebar and effective search, allowing users to quickly find products. The product pages were designed to provide all necessary information, including detailed descriptions, reviews, and related items, to facilitate an informed purchasing decision.",
    "results": [
      "Launched a secure, reliable online ordering portal available 24/7 to professional clients.",
      "Successfully implemented a user-gated system to protect wholesale pricing and product information.",
      "Streamlined the purchasing process for salon professionals, leading to increased user engagement.",
      "Provided the client with a powerful platform to manage their extensive product catalog and B2B client base."
    ],
    "images": [
      "/uploads/web-design-development/Windsor-home.jpg",
      "/uploads/web-design-development/Windsor-category.jpg",
      "/uploads/web-design-development/Windsor-product-page.jpg"
    ],
    "tags": [
      "Web Design",
      "Web Development",
      "B2B E-commerce",
      "Wholesale Portal",
      "User Authentication",
      "Magento",
      "UI/UX",
      "Beauty Industry"
    ],
    "technologies": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "PHP",
      "Magento",
      "MySQL"
    ],
    "category": "web-design-development",
    "published": true
  },
  {
    "title": "Brand Identity & Cover Design for 'True Magic' Novel",
    "subtitle": "A striking book cover design that establishes a unique visual identity for a contemporary novel, blending retro aesthetics with modern minimalism.",
    "imageSrc": "/uploads/branding/3---truemagic.jpg",
    "description": "This project involved creating the complete brand identity and cover art for the novel 'True Magic' by Colin Sims. The design centers around a powerful and evocative aesthetic, utilizing a limited color palette of warm orange, off-white, and black to create immediate visual impact. The bold, stylized typography for the title serves as the main graphic element, while the central illustration—a classic car within an abstract emblem—hints at themes of journey, mystery, and the extraordinary in the everyday.",
    "challenge": "The main challenge was to visually brand a novel titled 'True Magic' in a way that would appeal to a modern fiction audience, avoiding clichés associated with the fantasy genre. The design needed to be intriguing and sophisticated, accurately conveying a tone of mystery or magical realism rather than traditional wizards and spells. It had to stand out in a competitive market, both on physical shelves and as a digital thumbnail.",
    "solution": "The solution was to ground the concept in a tangible, retro-inspired reality. The use of a classic car as a key visual element provides a familiar anchor, while the abstract shapes and bold typography suggest the 'magic' is unconventional. The minimalist approach and high-contrast colors ensure the cover is eye-catching and memorable. This design strategy successfully creates a unique brand for the book, promising a story that is both gritty and fantastical.",
    "results": [
      "A compelling and market-ready book cover that strongly establishes the novel's unique brand.",
      "The design successfully captures a specific, nuanced tone that differentiates it from genre competitors.",
      "A versatile visual identity that can be extended to marketing materials like posters, social media assets, and author branding.",
      "Positive feedback on the design's ability to generate intrigue and attract target readers."
    ],
    "images": [
      "/uploads/branding/3---truemagic.jpg"
    ],
    "tags": [
      "Branding",
      "Book Cover Design",
      "Graphic Design",
      "Typography",
      "Publishing",
      "Visual Identity",
      "Illustration"
    ],
    "technologies": [
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Adobe InDesign"
    ],
    "category": "branding",
    "published": true
  },
  {
    "title": "Cover Design & Branding for 'Spencer's Risk'",
    "subtitle": "A character-driven book cover that uses bold iconography and a high-contrast color palette to capture the novel's unique blend of dark humor and emotional depth.",
    "imageSrc": "/uploads/branding/7-risk.jpg",
    "description": "This project involved creating the cover and brand identity for the novel 'Spencer's Risk' by Andy Greenhalgh. The design is centered on a memorable and symbolic central icon: a spade stylized to resemble a mustachioed skull, representing themes of risk, death, and quirky character. The gritty, textured background combined with a vibrant pink, handwritten title creates a contemporary, edgy feel. The overall aesthetic was crafted to visually communicate the novel's complex tone, described by comedian Jeremy Hardy as 'by turns funny, gripping and poignant.'",
    "challenge": "The primary challenge was to visually represent a story with a complex and nuanced tone. The cover needed to convey dark, high-stakes themes ('Risk', the skull) without alienating readers looking for the humor and emotional honesty mentioned in the review quote. The design had to be unique and intriguing, promising a character-driven story that defies a single genre classification.",
    "solution": "The solution lies in the use of contrast and clever symbolism. The grim imagery of the skull is offset by the playful, oversized mustache, immediately suggesting a dark comedy. The stark, grungy background is enlivened by the energetic splash of pink in the title, adding a modern, punk-rock sensibility. This juxtaposition of dark and playful elements creates a balanced visual identity that accurately reflects the book's multifaceted narrative.",
    "results": [
      "A visually arresting cover that stands out on both physical and digital bookshelves.",
      "The design successfully communicates the book's unique blend of genres, attracting the appropriate target audience.",
      "Creation of a strong, memorable icon that serves as a brand for the book and its protagonist.",
      "The layout effectively incorporates the celebrity endorsement, adding credibility and intrigue."
    ],
    "images": [
      "/uploads/branding/7-risk.jpg"
    ],
    "tags": [
      "Book Cover Design",
      "Branding",
      "Graphic Design",
      "Illustration",
      "Typography",
      "Publishing",
      "Dark Comedy"
    ],
    "technologies": [
      "Adobe Photoshop",
      "Adobe Illustrator"
    ],
    "category": "branding",
    "published": true
  },
  {
    "title": "Sci-Fi Book Cover & Brand Identity for 'Detonation'",
    "subtitle": "A minimalist and atmospheric cover design for a science fiction novel, creating a brand identity that evokes mystery, tension, and futuristic themes.",
    "imageSrc": "/uploads/branding/10-detonation.jpg",
    "description": "This project established the brand identity for the science fiction novel 'Detonation'. The design employs a minimalist and atmospheric approach to build a sense of suspense and mystery. The cover is dominated by a dark, deep-space background, creating a vast and ominous setting. The central visual—two mysterious, descending luminescent objects—serves as the primary focal point, sparking curiosity about their nature and intent. The clean, futuristic typography with wide tracking complements the sci-fi theme and reinforces the novel's modern, high-concept identity.",
    "challenge": "The primary challenge was to create a cover for a book titled 'Detonation' that conveys suspense and action without resorting to a cliché explosion graphic. The goal was to capture the feeling of anticipation—the moments leading up to a critical event. Furthermore, the design needed to establish a unique and sophisticated identity that would stand out in the crowded science fiction market, appealing to readers of modern, concept-driven sci-fi.",
    "solution": "Instead of depicting the detonation itself, the design focuses on the cause or precursor. The two glowing objects streaking downwards create a powerful sense of impending impact and consequence. This 'calm before the storm' approach generates more intrigue and suspense than a literal explosion would. A minimalist aesthetic with clean typography was chosen to give the novel a more literary and contemporary feel, positioning its brand for an audience that appreciates atmospheric, speculative fiction.",
    "results": [
      "A visually stunning cover that establishes a sophisticated brand for the author and the novel.",
      "The design successfully signals the sci-fi genre while appealing to a modern readership.",
      "The minimalist approach makes the cover highly effective as a small thumbnail in online stores.",
      "The cover's mysterious nature generates significant intrigue, prompting potential readers to learn more about the story."
    ],
    "images": [
      "/uploads/branding/10-detonation.jpg"
    ],
    "tags": [
      "Branding",
      "Book Cover Design",
      "Science Fiction",
      "Graphic Design",
      "Minimalist Design",
      "Typography",
      "Publishing",
      "Visual Identity"
    ],
    "technologies": [
      "Adobe Photoshop",
      "Adobe Illustrator"
    ],
    "category": "branding",
    "published": true
  },
  {
    "title": "Epic Sci-Fi Cover Branding for 'Paradox 2'",
    "subtitle": "A sleek and atmospheric cover design for a German-language science fiction novel, building a brand identity that communicates vast scale and cosmic mystery.",
    "imageSrc": "/uploads/branding/attachment_89728190.jpeg",
    "description": "This project showcases the cover design and branding for 'Paradox 2: Jenseits der Ewigkeit,' a German-language science fiction novel by Phillip P. Peterson. The design establishes a powerful brand for the series by visualizing its epic scale. Layered celestial crescents create a disorienting, paradoxical sense of space, perfectly aligning with the book's title. A classic sci-fi color palette of deep space blues and glowing teal is used to create an atmospheric and futuristic mood. The clean, sans-serif typography ensures a modern feel and high legibility, branding the book as a sophisticated, high-concept space opera.",
    "challenge": "A key challenge for this project was designing a cover for a sequel that felt both familiar to existing fans and compelling to new readers. The design needed to maintain brand consistency with the first book while escalating the sense of scale and stakes. The primary creative challenge was to visually interpret abstract concepts like 'paradox' and 'eternity' in a way that was both intriguing and immediately recognizable as epic science fiction.",
    "solution": "The concept of 'paradox' is visualized through the impossible layering of planetary horizons. This creates a visually arresting image that is surreal and vast, prompting the viewer to question what they're seeing. By presumably using a consistent typographic style and color palette from the first installment, the cover maintains strong series branding while the evolving imagery suggests a story that is growing in scope and complexity.",
    "results": [
      "A cover that strengthens the series' brand identity and appeals to its established readership.",
      "The design clearly communicates the epic sci-fi genre, attracting fans of space opera and hard sci-fi.",
      "A visually consistent and professional look that reinforces the author's brand in the German book market.",
      "The high-contrast, clean design is highly effective in both print and as a digital thumbnail for online retailers."
    ],
    "images": [
      "/uploads/branding/attachment_89728190.jpeg"
    ],
    "tags": [
      "Branding",
      "Book Cover Design",
      "Science Fiction",
      "Space Opera",
      "Graphic Design",
      "Series Branding",
      "Publishing"
    ],
    "technologies": [
      "Adobe Photoshop",
      "Adobe Illustrator"
    ],
    "category": "branding",
    "published": true
  },
  {
    "title": "Corporate Brand Identity & Business Card for BNH Tourism",
    "subtitle": "A sophisticated and premium business card design that establishes a strong corporate identity for an international tourism and holiday company.",
    "imageSrc": "/uploads/branding/1.jpg",
    "description": "This project involved the creation of a corporate brand identity for BNH Tourism and Holiday, encapsulated in a premium business card design. The design leverages a sophisticated color palette of black, silver, and gold to project an image of luxury, trust, and professionalism. A key feature is the use of a textured, brushed silver finish, which adds a tactile quality and enhances the card's perceived value. The dynamic wave element provides a modern, fluid aesthetic, elegantly organizing information and reinforcing the brand's identity as a leader in international travel.",
    "challenge": "The primary challenge was to design a business card that instantly conveys the premium, trustworthy nature of BNH Tourism. The card needed to serve as a powerful first impression for a brand operating in the competitive luxury travel market. A further challenge was to elegantly organize a significant amount of contact information for two international offices (Egypt and UAE) without compromising the clean, high-end aesthetic.",
    "solution": "A two-sided design was utilized to separate branding from information. To convey a premium feel, the front of the card features the company's elegant logo on a clean, textured silver background. The reverse side uses a clear typographic hierarchy on a black base to present contact details logically. The founder's name is highlighted in gold, and information is grouped by location. The wave element acts as a visual guide, leading the eye through the details in a structured and aesthetically pleasing manner.",
    "results": [
      "A tangible branding tool that leaves a lasting, high-quality impression on potential clients and partners.",
      "Strengthened brand identity that aligns with the company's positioning in the luxury tourism sector.",
      "A clear and effective communication tool that provides all necessary contact information in an organized format.",
      "Positive feedback from the client on the design's professionalism and modern aesthetic."
    ],
    "images": [
      "/uploads/branding/1.jpg"
    ],
    "tags": [
      "Branding",
      "Corporate Identity",
      "Business Card Design",
      "Graphic Design",
      "Print Design",
      "Luxury Branding",
      "Tourism"
    ],
    "technologies": [
      "Adobe Illustrator",
      "Adobe Photoshop"
    ],
    "category": "branding",
    "published": true
  },
  {
    "title": "Fresh Brand Identity & Business Card for Hydrofit",
    "subtitle": "A clean and modern business card design that establishes a clear brand identity for a company focused on pure water and healthy living.",
    "imageSrc": "/uploads/branding/3.jpg",
    "description": "This project showcases the development of a fresh brand identity for Hydrofit, a company dedicated to providing 'Pure Water For Life.' The business card design utilizes a clean and vibrant color palette of blue, green, and white to evoke feelings of health, nature, and purity. The brand's circular logo, featuring a central water droplet embraced by green leaves, is prominently displayed. A modern, curved layout separates the logo from the contact details, creating a dynamic visual flow and reinforcing the brand's forward-thinking and approachable identity.",
    "challenge": "The primary challenge was to create a brand identity that instantly conveys trust and purity, which is critical for a company in the water and wellness industry. The design needed to look professional and reliable, assuring customers of the product's quality. Another challenge was to create a visually distinct and memorable look that would differentiate Hydrofit in a competitive marketplace.",
    "solution": "The solution was to use a clean design aesthetic and a color palette universally associated with cleanliness (blue, white) and nature (green). The professional, well-structured layout and clear typography project an image of reliability and expertise. The dynamic, curved element in the layout offers a unique visual signature that is more engaging than a standard rectangular design, creating a memorable brand identity that feels both trustworthy and modern.",
    "results": [
      "A professional business card that effectively builds brand trust upon first impression.",
      "A clear, memorable brand identity that resonates with a health-conscious target audience.",
      "A versatile and scalable design that can be easily applied across other marketing materials like websites, packaging, and social media.",
      "Positive reception for its clean, modern, and trustworthy aesthetic."
    ],
    "images": [
      "/uploads/branding/3.jpg"
    ],
    "tags": [
      "Branding",
      "Business Card Design",
      "Corporate Identity",
      "Logo Design",
      "Graphic Design",
      "Health & Wellness",
      "Eco-Friendly Branding"
    ],
    "technologies": [
      "Adobe Illustrator",
      "Adobe Photoshop"
    ],
    "category": "branding",
    "published": true
  },
  {
    "title": "Playful & Vibrant Brand Identity for Dees Toys",
    "subtitle": "A cheerful and kid-friendly business card design that creates a memorable and fun brand identity for a toy company.",
    "imageSrc": "/uploads/branding/4.jpg",
    "description": "This branding project involved creating a vibrant and playful identity for Dees Toys. The business card design is centered around a fun, custom logo with bubbly typography and cheerful colors. The bright palette of green, orange, and cyan immediately captures a sense of joy and energy, perfectly suited for the toy industry. Whimsical shapes and simple floral icons adorn the corners, adding a decorative touch without overwhelming the clean, white background. The overall design establishes a friendly, approachable, and memorable brand that appeals directly to children and parents alike.",
    "challenge": "The primary challenge in branding a toy company is designing for a dual audience: the branding must be visually exciting and engaging for children, while also appearing professional, safe, and trustworthy to the parents making the purchasing decisions. The design needed to balance playful creativity with the clarity and professionalism required to build consumer confidence.",
    "solution": "The solution was to combine a highly playful and colorful logo with a clean and organized layout. The logo and graphic elements are aimed at capturing a child's imagination, using rounded shapes and a vibrant color scheme. The use of a clean white background and a simple, legible sans-serif font for the contact information ensures the card looks professional and is easy for parents to read, creating a perfect balance of fun and function.",
    "results": [
      "A strong brand identity that stands out in the competitive toy market.",
      "A business card that effectively communicates the brand's fun and friendly personality on first contact.",
      "Positive brand association with creativity, joy, and trustworthiness.",
      "A versatile branding system (logo, colors, graphic elements) that can be easily applied to product packaging, marketing materials, and digital platforms."
    ],
    "images": [
      "/uploads/branding/4.jpg"
    ],
    "tags": [
      "Branding",
      "Logo Design",
      "Business Card Design",
      "Children's Brand",
      "Toy Company",
      "Graphic Design",
      "Playful Design",
      "Corporate Identity"
    ],
    "technologies": [
      "Adobe Illustrator",
      "Adobe Photoshop"
    ],
    "category": "branding",
    "published": true
  }
];

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://aenfinitee:aenfinitee@cluster0.vigrho8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('✅ MongoDB connected successfully');
  
  try {
    // Clear existing projects (optional - remove this line if you want to keep existing projects)
    // await Project.deleteMany({});
    // console.log('🗑️  Cleared existing projects');

    // Insert new projects
    const insertedProjects = await Project.insertMany(projectsData);
    
    console.log(`🎉 Successfully seeded ${insertedProjects.length} projects!`);
    
    // Display summary by category
    const categorySummary = {};
    insertedProjects.forEach(project => {
      if (!categorySummary[project.category]) {
        categorySummary[project.category] = 0;
      }
      categorySummary[project.category]++;
    });
    
    console.log('\n📊 Projects by Category:');
    Object.entries(categorySummary).forEach(([category, count]) => {
      console.log(`  ${category}: ${count} projects`);
    });
    
  } catch (error) {
    console.error('❌ Error seeding projects:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});