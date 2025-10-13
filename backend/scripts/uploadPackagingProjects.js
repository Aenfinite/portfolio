require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('../models/Project');

// Category mapping
const categoryMapping = {
  'Packaging Design': 'packaging-design',
  'Branding': 'branding',
  'Web Design & Development': 'web-design-development', 
  'Graphic Design': 'graphic-design',
  'Logo Design': 'logo-design',
  'UI/UX Design': 'ui-ux',
  'Mobile App': 'mobile-app'
};

function getCategorySlug(categoryName) {
  const mapped = categoryMapping[categoryName];
  if (mapped) return mapped;
  
  return categoryName.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');
}

function formatImageUrl(imageName, categorySlug) {
  if (!imageName) return '';
  return `https://api.aenfinite.com/uploads/${categorySlug}/${imageName}`;
}

async function uploadPackagingProjects() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://aenfinitee:aenfinitee@cluster0.vigrho8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to database');
    
    // Your new packaging design projects
    const projects = [
      {
        "title": "Charity Donation Box Design for Corporate Initiative",
        "subtitle": "An eye-catching and heartwarming packaging design for FBP Immobilien's animal welfare fundraising initiative, created to encourage point-of-sale donations.",
        "imageSrc": "1.jpg",
        "description": "This project is the packaging design for a custom charity donation box, created for an animal welfare initiative sponsored by the real estate company FBP Immobilien GmbH. The design is engineered to be eye-catching and emotionally engaging in a retail or office environment. It utilizes a bold red and white color scheme to attract immediate attention, while a charming collection of animal illustrations and photographs clearly communicates the cause. The company's corporate branding is prominently and professionally integrated, showcasing their commitment to social responsibility. A strong 'JETZT SPENDEN!' (Donate Now!) call to action prompts an immediate response, making the box a highly effective fundraising tool.",
        "challenge": "The primary challenge was to design a donation box that could effectively stand out in a busy commercial or public space and immediately capture people's attention. A further challenge was to seamlessly blend the corporate identity of the sponsor, FBP Immobilien, with the emotional, charitable appeal for animal welfare, ensuring the design felt authentic and purpose-driven rather than purely promotional.",
        "solution": "The solution was to use a bold and simple color palette dominated by a vibrant red. The tall, illustrated backboard acts as a signpost, making the box visible from a distance. To strike a balance between corporate and charitable goals, the company's logo is placed cleanly in key locations, but the majority of the visual real estate is dedicated to the cause—the animals. The messaging 'An Initiative of FBP Immobilien' clearly defines the company's supportive role, which enhances their public image.",
        "results": [
          "A successful fundraising campaign that generated significant donations for the animal welfare cause.",
          "Enhanced the public image and brand reputation of FBP Immobilien by highlighting their commitment to corporate social responsibility.",
          "The eye-catching design proved effective in various point-of-sale locations.",
          "The design was well-received for its charming and professional execution."
        ],
        "images": [],
        "tags": [
          "Packaging Design",
          "Graphic Design",
          "Point of Sale",
          "Charity",
          "Fundraising",
          "Corporate Social Responsibility",
          "Print Design"
        ],
        "technologies": [
          "Adobe Illustrator",
          "Adobe Photoshop"
        ],
        "category": "Packaging Design",
        "published": true
      },
      {
        "title": "Eco-Friendly Pet Product Packaging for Rooboo",
        "subtitle": "A clean, friendly, and informative packaging design for lavender-scented pet poop bags, created to appeal to environmentally conscious pet owners.",
        "imageSrc": "2.jpg",
        "description": "This project is the retail packaging design for Rooboo, a brand of eco-friendly, lavender-scented pet poop bags. The design uses a natural and earthy color palette, with a kraft paper texture and fresh green accents, to immediately communicate the product's environmental benefits. The branding is friendly and approachable, featuring a charming logo of a paw print with a heart. A key feature of the design is the clear information hierarchy; the front of the box highlights the product type and quantity, while a side panel uses a star-icon checklist to effectively list all key features like 'Leak Proof,' 'Biodegradable,' and 'Super Strong.' The inclusion of a die-cut window and a retail hanger tab makes the packaging both functional and visually appealing on the shelf.",
        "challenge": "The main challenge was to create packaging that would stand out in the crowded pet supplies aisle and quickly differentiate itself from competitors. The design needed to have strong shelf appeal. A further challenge was to clearly and concisely communicate a long list of important product features—from practical aspects like strength to value-driven aspects like being biodegradable—to a shopper making a quick decision.",
        "solution": "The solution was to use a clean, friendly, and uncluttered design with a distinct, natural color palette. The charming paw print logo creates an emotional connection, and the die-cut window adds a layer of transparency and trust, allowing the customer to see the product inside. To communicate the many features effectively, a dedicated panel on the side of the box was used as a 'quick-glance' feature list. Using simple star icons next to each benefit makes the information highly scannable and easy to digest.",
        "results": [
          "A successful product launch with strong retail sales, driven by the eye-catching and informative packaging.",
          "The packaging effectively communicated the brand's eco-friendly values, attracting the target demographic of responsible pet owners.",
          "Positive feedback from retailers on the shelf-ready design, including the hanger tab for versatile display.",
          "The brand successfully established a friendly, trustworthy, and premium identity in the pet supplies market."
        ],
        "images": [],
        "tags": [
          "Packaging Design",
          "Graphic Design",
          "Retail Packaging",
          "Pet Products",
          "Eco-Friendly Design",
          "Brand Identity",
          "CPG"
        ],
        "technologies": [
          "Adobe Illustrator",
          "Adobe Photoshop"
        ],
        "category": "Packaging Design",
        "published": true
      },
      {
        "title": "Luxury Perfume Label & Packaging Design",
        "subtitle": "An elegant and sophisticated label design for 'Crown' Extrait de Parfum, using a rich color palette and clean typography to create a premium and regal brand identity.",
        "imageSrc": "3.jpg",
        "description": "This project is the packaging design for 'Crown,' a luxury Extrait de Parfum. The design is centered on a sophisticated wrap-around label that embodies elegance and quality. A rich color palette of deep emerald green and regal gold was chosen to create an immediate sense of luxury and prestige, perfectly aligning with the brand name 'Crown.' The layout is clean and geometric, with a central golden diamond highlighting the product's '30' identifier. A subtle, tone-on-tone pattern on the green background adds a layer of texture and refinement. The use of a modern, minimalist sans-serif font provides a contemporary edge, ensuring the brand feels both timeless and current.",
        "challenge": "The primary challenge in designing for a fragrance is to visually represent an invisible, sensory product. The packaging must evoke a specific mood—in this case, luxury and regality—that hints at the character of the scent within. Additionally, the design needed to have strong shelf presence and look inherently premium to compete in the highly competitive luxury perfume market.",
        "solution": "The design solves this by focusing on creating a powerful mood rather than being literal. The combination of the name 'Crown,' the royal color scheme of emerald and gold, and the crystal-like bottle cap all work together to suggest a scent that is rich, bold, and luxurious. The strong color contrast and clean, geometric composition give it a sophisticated and confident look that stands out from overly ornate or fussy designs on a retail shelf.",
        "results": [
          "A successful product launch where the packaging is a key selling point.",
          "The design effectively positions the 'Crown' brand in the luxury fragrance segment.",
          "The premium look and feel of the packaging helps to justify a high price point.",
          "Strong appeal to consumers looking for sophisticated, elegant, and high-quality perfume products."
        ],
        "images": [],
        "tags": [
          "Packaging Design",
          "Graphic Design",
          "Luxury Branding",
          "Perfume Packaging",
          "Label Design",
          "Cosmetics",
          "Brand Identity"
        ],
        "technologies": [
          "Adobe Illustrator",
          "Adobe Photoshop"
        ],
        "category": "Packaging Design",
        "published": true
      },
      {
        "title": "Cohesive Product Line Packaging for AdditionM Cosmetics",
        "subtitle": "A versatile and modern packaging design system for a range of skin and hair care products, creating a unified brand identity while giving each product a unique personality.",
        "imageSrc": "4.jpg",
        "description": "This project showcases a comprehensive packaging design system for the skin and hair care brand, 'AdditionM.' The challenge was to create a cohesive brand identity that could be applied across a diverse product line, from luxury eye masks to functional hair wax and clinical acne patches. The solution was to establish a strong, consistent foundation using a minimalist logo and a clean, modern typographic style. Each product category was then given its own unique identity through a carefully selected color palette and material finish—luxurious black and gold for the eye masks, soft pink for the serum, and clean teal for the hydrocolloid patches. This strategic approach allows 'AdditionM' to maintain a unified brand presence while effectively communicating the unique purpose and appeal of each individual product.",
        "challenge": "The key challenge was to create a unified and cohesive brand look for a product range with very different uses and target demographics. The luxury eye mask packaging needed to feel distinct from the more clinical acne patch packaging, yet both had to be instantly recognizable as part of the 'AdditionM' brand. The design system had to be flexible enough to adapt to various packaging forms while maintaining a strong, consistent brand identity.",
        "solution": "Unity was achieved by consistently applying the same brand logo and typographic hierarchy across all products. This creates a strong, recurring brand block that is the common thread tying the entire product line together. Differentiation was achieved through a strategic and distinct color story for each product category. By assigning a unique primary color (black, pink, silver, teal) to each product, customers can easily identify them. This color-coding creates clear visual categories within the overall brand family, aiding in navigation on a retail shelf or website.",
        "results": [
          "A strong and flexible branding system that allowed the company to successfully launch multiple products in different beauty categories.",
          "The cohesive yet distinct packaging created a strong shelf presence and made the brand look larger and more established.",
          "The targeted aesthetics for each product line successfully appealed to their intended customer segments.",
          "The clear, professional design built consumer trust in the brand's quality and efficacy."
        ],
        "images": [],
        "tags": [
          "Packaging Design",
          "Graphic Design",
          "Brand Identity",
          "Product Line",
          "Cosmetics Packaging",
          "Skincare",
          "Beauty Branding"
        ],
        "technologies": [
          "Adobe Illustrator",
          "Adobe Photoshop"
        ],
        "category": "Packaging Design",
        "published": true
      },
      {
        "title": "Bilingual Food Product Packaging for Memra Creamer",
        "subtitle": "A fresh and modern packaging design for a healthy coffee creamer alternative, created for the Middle Eastern and international markets with a fully bilingual (English & Arabic) layout.",
        "imageSrc": "5.jpg",
        "description": "This project is the packaging design for 'Memra,' a modern, healthy creamer alternative. The design utilizes a fresh and vibrant teal-green gradient to create a clean and healthy brand image. A key feature of the front panel is a large, aspirational photograph of the product in use, creating strong appetite appeal and highlighting its creamy quality. The packaging is fully bilingual, with all information presented in both English and Arabic to effectively cater to the Middle Eastern and international markets. The back panel is meticulously organized with clear instructions, benefits, and nutritional information in both languages, making the product accessible, informative, and trustworthy for a diverse consumer base.",
        "challenge": "The primary design challenge was to create a harmonious and balanced layout that elegantly incorporates both English and Arabic text without feeling cluttered. This required careful consideration of typography and information hierarchy for two different scripts. A further challenge was to create strong appetite appeal for a creamer alternative, ensuring the product looked just as delicious and satisfying as traditional dairy creamers.",
        "solution": "The solution to the bilingual challenge was to dedicate clear, parallel blocks of text for each language on the back panel, using a clean sans-serif font for both to create visual consistency. To create appetite appeal, the design leads with a large, high-quality photograph of the desired end result—a perfect, creamy beverage—which is a universal and highly effective way to make a food product look irresistible.",
        "results": [
          "A successful product launch in the MENA region and other international markets, aided by the accessible bilingual design.",
          "The modern and healthy branding effectively attracted health-conscious consumers.",
          "Strong retail performance due to the eye-catching design and clear communication of the product's uses and benefits.",
          "The packaging successfully established Memra as a premium, modern, and trustworthy brand in the creamer/milk alternative category."
        ],
        "images": [],
        "tags": [
          "Packaging Design",
          "Graphic Design",
          "Food Packaging",
          "Bilingual Design",
          "CPG",
          "Brand Identity",
          "Retail Packaging"
        ],
        "technologies": [
          "Adobe Illustrator",
          "Adobe Photoshop"
        ],
        "category": "Packaging Design",
        "published": true
      },
      {
        "title": "Modern & Trendy TWS Earbuds Packaging",
        "subtitle": "A stylish and informative retail packaging design for 'rabbit' Wave Buds Pro, created to stand out in the competitive consumer electronics market and appeal to a tech-savvy audience.",
        "imageSrc": "6.jpg",
        "description": "This project is the complete retail packaging design for the 'rabbit Wave Buds Pro,' a set of noise-cancelling true wireless earbuds. The design uses a trendy and sophisticated pastel lavender color palette to position the product as a modern lifestyle accessory. The front of the box features a high-quality product render against a backdrop of abstract wave graphics, visually connecting to the product's name. The back of the packaging is a model of clear information architecture, using a clean grid of icons to communicate the product's numerous technical features, from ANC to IPX4 water resistance. The overall design is clean, stylish, and highly informative, crafted to attract a discerning, tech-savvy consumer in a competitive marketplace.",
        "challenge": "The primary challenge was to communicate a dense list of technical features in a simple, visually appealing, and easily digestible format for the average consumer. A second, crucial challenge was to create a strong visual identity that would make the product stand out on a crowded retail shelf, differentiating 'rabbit' from the many established and emerging brands in the TWS earbuds market.",
        "solution": "The solution for communicating the tech specs was to create a dedicated icon system for the back of the box. Each key feature is represented by a simple, universally understood icon and a short label, allowing a customer to quickly scan the product's main advantages. To differentiate the brand, a unique and trendy pastel color was chosen, moving away from the generic black or white used by many competitors. This creates a fresh, modern, and memorable brand personality that appeals to a style-conscious audience.",
        "results": [
          "Strong retail performance, with the eye-catching packaging driving consumer interest and sales.",
          "The clear presentation of features helped customers make informed purchasing decisions, reducing returns and improving satisfaction.",
          "The stylish branding successfully positioned 'rabbit' as a credible and desirable player in the competitive mobile accessories market.",
          "The packaging design received positive feedback from both consumers and retailers for its premium look and feel."
        ],
        "images": [],
        "tags": [
          "Packaging Design",
          "Graphic Design",
          "Consumer Electronics",
          "Retail Packaging",
          "Tech Branding",
          "Brand Identity",
          "Information Design"
        ],
        "technologies": [
          "Adobe Illustrator",
          "Adobe Photoshop",
          "3D Rendering Software"
        ],
        "category": "Packaging Design",
        "published": true
      },
      {
        "title": "Sleek Packaging Design for a Gaming Keyboard",
        "subtitle": "A modern and dynamic packaging design for the 'moktik' gaming keyboard, crafted to appeal to the gaming community with a high-tech aesthetic and clear feature communication.",
        "imageSrc": "7.jpg",
        "description": "This project is the packaging design for the 'moktik' Sleek Gaming Keyboard, a product aimed at the discerning gamer market. The design employs a classic high-tech, 'gamer' aesthetic, using a dark and sophisticated deep blue background to make the vibrant RGB lighting of the product photography stand out dramatically. The front of the box features a dynamic hero shot of the keyboard, instantly communicating its quality and key feature. The back of the packaging is designed to be highly informative, with a detailed specifications table and clear illustrations of the different mechanical switch types available, catering to both casual and enthusiast gamers. The overall design is sleek, futuristic, and performance-focused, perfectly aligning with the product and its target audience.",
        "challenge": "The primary challenge was to create a design that authentically captures the modern 'gamer aesthetic' to instantly connect with the target audience. The packaging needed to look exciting and promise a high-performance experience. A second major challenge was to effectively balance this powerful visual marketing with the clear, detailed technical information that serious gamers rely on to make purchasing decisions, such as the specific types of mechanical switches.",
        "solution": "The design fully embraces the gamer aesthetic with a dark color palette, a dramatic hero shot of the illuminated keyboard, and futuristic typography. This immediately signals that the product is designed for gamers. To balance visuals with information, the packaging uses a 'front for hype, back for info' strategy. The front is almost purely visual, while the back is a clean, organized information panel with a specs table and helpful illustrations, providing all the necessary details for an informed purchase without cluttering the main presentation.",
        "results": [
          "The product stands out on a retail shelf against competitors due to its sleek and professional design.",
          "The clear presentation of features and specifications helps to build consumer trust and drives sales.",
          "The strong branding helps to establish 'moktik' as a credible new player in the gaming peripherals market.",
          "The packaging is 'unboxing-friendly' and looks good in online reviews, contributing to organic marketing."
        ],
        "images": [],
        "tags": [
          "Packaging Design",
          "Graphic Design",
          "Gaming Peripherals",
          "Retail Packaging",
          "Tech Branding",
          "Consumer Electronics",
          "Gamer Aesthetic"
        ],
        "technologies": [
          "Adobe Illustrator",
          "Adobe Photoshop",
          "3D Rendering Software"
        ],
        "category": "Packaging Design",
        "published": true
      },
      {
        "title": "Bold & Dynamic Snack Food Packaging",
        "subtitle": "An appetizing and modern packaging design for 'Hungry Hippoo' Soya Ball snacks, created to stand out in the competitive Indian savory snack market.",
        "imageSrc": "8.jpg",
        "description": "This project is the packaging design for 'Soya Ball,' a savory snack from the 'Hungry Hippoo' brand, targeted at the Indian market. The design features a bold and dynamic aesthetic, using a sophisticated matte black background to create a premium feel and provide a high-contrast canvas. The centerpiece of the design is an energetic hero shot of the snack, with a dramatic splash of chili and spices, which instantly communicates a delicious and intensely flavorful experience. The product name is rendered in a custom script font to add personality, while the friendly hippopotamus logo creates a memorable brand character. The overall design is crafted to be highly appetizing and to stand out on a crowded retail shelf.",
        "challenge": "The primary challenge was to create a design with enough visual impact to stand out in the incredibly saturated and visually competitive South Asian snack food aisle. The packaging had to grab a customer's attention in a fraction of a second. The second challenge was to immediately and non-verbally communicate the product's bold, spicy flavor profile and crunchy texture to create instant appetite appeal.",
        "solution": "Instead of competing with brighter colors, the design takes the opposite approach by using a dark, matte black background. This makes it stand out against a sea of glossy, primary-colored bags and gives it a more premium, modern look. To communicate flavor, the design relies on a high-impact 'flavor explosion' photograph. This powerful visual cue, with visible chilies splashing around the product, is much more effective at communicating 'spicy' and 'exciting' than text alone.",
        "results": [
          "The unique, premium design successfully differentiated the product from competitors and drove strong trial purchases.",
          "The appetizing hero shot effectively communicated the product's flavor profile, meeting customer expectations.",
          "The 'Hungry Hippoo' brand established a memorable and modern identity in the snack food category.",
          "Strong sales performance in its target price segment due to high shelf visibility and appetite appeal."
        ],
        "images": [],
        "tags": [
          "Packaging Design",
          "Graphic Design",
          "Food Packaging",
          "Snack Food",
          "CPG",
          "Brand Identity",
          "Retail Packaging"
        ],
        "technologies": [
          "Adobe Illustrator",
          "Adobe Photoshop"
        ],
        "category": "Packaging Design",
        "published": true
      },
      {
        "title": "Family-Friendly Cereal Box Packaging Design",
        "subtitle": "A bright, cheerful, and modern packaging design for 'nutri wala' Corn Flakes, created to stand out in the competitive Indian breakfast food market.",
        "imageSrc": "9.jpg",
        "description": "This project is the retail packaging design for 'nutri wala' Corn Flakes, a classic breakfast cereal targeting the Indian family market. The design employs a bright, bold, and cheerful color palette of red, blue, and green to create an energetic and positive look that stands out on the shelf. The centerpiece is a large, appetizing hero photograph of the golden corn flakes, creating immediate appetite appeal. Key health benefits, such as 'Source of Protein' and 'Naturally Cholesterol Free,' are clearly communicated on the front of the pack using simple icons and legible text. The friendly, modern branding and clean layout position 'nutri wala' as a trustworthy and healthy choice for a family's breakfast.",
        "challenge": "The greatest challenge was to create a packaging design that could credibly compete on the shelf with globally recognized cereal giants. The 'nutri wala' box needed to project a high level of quality and trust to win over consumers loyal to other brands. Another key challenge was to strike the perfect balance in communication: the design had to clearly signal 'healthy' to appeal to parents, while also looking 'tasty' and 'fun' to appeal to the whole family.",
        "solution": "The design competes by being unapologetically modern, clean, and bold. It uses a fresh, contemporary layout with large color blocks and clean typography to position the brand as a high-quality alternative. The 'healthy' aspect is communicated through clear, icon-driven benefit callouts, while the 'tasty' appeal comes from the large, beautifully shot hero photograph of the crispy, golden flakes. The bright, energetic color scheme also contributes to a feeling of fun and enjoyment.",
        "results": [
          "A successful market entry for the 'nutri wala' brand, with the packaging playing a key role in attracting first-time buyers.",
          "The bright, clean design achieved high visibility and stood out effectively in crowded supermarket aisles.",
          "The clear communication of health benefits successfully resonated with the target audience of health-conscious families.",
          "The professional design helped build a foundation of trust for a new food brand."
        ],
        "images": [],
        "tags": [
          "Packaging Design",
          "Graphic Design",
          "Food Packaging",
          "Cereal Box Design",
          "CPG",
          "Brand Identity",
          "Retail Packaging"
        ],
        "technologies": [
          "Adobe Illustrator",
          "Adobe Photoshop"
        ],
        "category": "Packaging Design",
        "published": true
      },
      {
        "title": "Professional Health Supplement Packaging Design",
        "subtitle": "A clean, modern, and trustworthy packaging design for the 'Opti Health' all-in-one supplement, created to project efficacy and natural quality.",
        "imageSrc": "10.jpg",
        "description": "This project is the packaging design for 'Opti Health,' a premium 'All-in-Supplement' featuring natural ingredients like Sea Moss and Ashwagandha. The design uses a sophisticated and clinical aesthetic, with a bold black bottle and label that creates a premium, scientific feel. A vibrant green accent color provides a fresh, natural contrast, highlighting the product's herbal origins. The label's information architecture is a key feature; it clearly lists the main active ingredients in a stacked, easy-to-read format. An innovative circular grid of icons is used to visually communicate the comprehensive blend of vitamins and minerals, effectively showcasing the 'all-in-one' value proposition in a clean and modern way. The overall design builds a strong sense of trust, efficacy, and quality.",
        "challenge": "The most significant challenge was to create a design that instills a high degree of trust and credibility in a crowded supplement market. The packaging for 'Opti Health' needed to look both scientifically backed and naturally sourced. A further challenge was to effectively communicate the product's complex, multi-ingredient, 'all-in-one' formula on a limited label space, showcasing its comprehensive nature without creating a design that was cluttered or difficult to understand.",
        "solution": "The solution was to adopt a clean, minimalist, and clinical design language. The premium black packaging, combined with a professional logo and sans-serif typography, creates an image of a serious, science-backed product. To manage the complex formula, the design uses a strong typographic hierarchy for the main ingredients and an innovative grid of small, letter-based icons for the micronutrients. This visual shorthand allows the brand to boast about the product's complexity in a clean, graphical, and easily scannable way.",
        "results": [
          "The professional and trustworthy design helped the product achieve strong sales and a loyal customer base.",
          "The packaging successfully differentiated 'Opti Health' from competitors with less professional or more generic designs.",
          "The clear presentation of ingredients built consumer confidence and supported the product's premium positioning.",
          "The design established a strong and flexible brand identity that could be extended to other products in the Opti Health line."
        ],
        "images": [],
        "tags": [
          "Packaging Design",
          "Graphic Design",
          "Supplement Packaging",
          "Health & Wellness",
          "Brand Identity",
          "Label Design",
          "Nutraceuticals"
        ],
        "technologies": [
          "Adobe Illustrator",
          "Adobe Photoshop"
        ],
        "category": "Packaging Design",
        "published": true
      },
      {
        "title": "High-Energy Fitness Supplement Packaging",
        "subtitle": "A dynamic and futuristic packaging design for 'The Pureology' Creatine Monohydrate, created to energize and attract the modern fitness and bodybuilding community.",
        "imageSrc": "12.jpg",
        "description": "This project is the packaging design for 'The Pureology' Performance Series Creatine Monohydrate. The design uses a bold, futuristic, and high-energy aesthetic to appeal directly to the fitness and bodybuilding community. A dark, deep purple background is electrified with vibrant neon accents of green and magenta, while abstract geometric and molecular patterns create a sense of scientific power. The product name 'CREATINE' is rendered in massive, impactful typography to convey strength and potency. Key benefits like 'Muscle Growth' and 'Boost Strength' are clearly communicated with simple icons, allowing consumers to quickly grasp the product's value. The overall design is dynamic, powerful, and engineered to stand out in the competitive sports nutrition market.",
        "challenge": "The primary challenge was to create a design that visually screams 'power' and 'performance.' The packaging needed to look as potent and effective as the supplement it contains, instantly appealing to a results-driven audience. A further challenge was to create a unique and memorable look that could cut through the visual noise of the extremely crowded and aesthetically 'loud' sports nutrition market.",
        "solution": "The design conveys potency through its aggressive and dynamic visual language. The massive, bold typography for the product name, the high-contrast neon colors against a dark background, and the futuristic graphics all combine to create a powerful aesthetic. While using elements common to the category, the design elevates them with a sophisticated execution of geometric patterns and a clean typographic hierarchy, giving it a more premium 'tech' feel that helps it stand out from competitors.",
        "results": [
          "The packaging successfully captured the attention of the target demographic in both retail stores and online.",
          "The potent, high-energy design helped to build a strong brand identity for 'The Pureology's' Performance Series line.",
          "The clear presentation of benefits and dosage information built trust and helped consumers make a quick purchasing decision.",
          "The brand was perceived as modern, effective, and credible within the fitness community."
        ],
        "images": [],
        "tags": [
          "Packaging Design",
          "Graphic Design",
          "Supplement Packaging",
          "Fitness & Bodybuilding",
          "Sports Nutrition",
          "Brand Identity",
          "Label Design"
        ],
        "technologies": [
          "Adobe Illustrator",
          "Adobe Photoshop"
        ],
        "category": "Packaging Design",
        "published": true
      }
    ];
    
    console.log(`📄 Processing ${projects.length} packaging design projects...`);
    
    const projectsToUpload = [];
    
    for (const projectData of projects) {
      // Check if project already exists
      const existing = await Project.findOne({ title: projectData.title });
      if (existing) {
        console.log(`⚠️  Skipping "${projectData.title}": Already exists`);
        continue;
      }
      
      const categorySlug = getCategorySlug(projectData.category);
      
      // Process imageSrc
      const mainImageUrl = projectData.imageSrc ? formatImageUrl(projectData.imageSrc, categorySlug) : '';
      
      // Process images array  
      let imagesUrls = [];
      if (projectData.images && Array.isArray(projectData.images)) {
        imagesUrls = projectData.images
          .filter(img => img && img.trim() !== '')
          .map(img => formatImageUrl(img, categorySlug));
      }
      
      if (imagesUrls.length === 0 && mainImageUrl) {
        imagesUrls = [mainImageUrl];
      }
      
      const project = {
        title: projectData.title || '',
        subtitle: projectData.subtitle || '',
        description: projectData.description || '',
        challenge: projectData.challenge || '',
        solution: projectData.solution || '',
        results: projectData.results || [],
        imageSrc: mainImageUrl,
        images: imagesUrls,
        tags: projectData.tags || [],
        technologies: projectData.technologies || [],
        category: categorySlug, // Use the mapped category slug instead of original
        published: projectData.published !== false,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      projectsToUpload.push(project);
      
      console.log(`✅ Prepared: "${project.title}"`);
      console.log(`   Category: ${project.category} → ${categorySlug}`);
      console.log(`   Image: ${project.imageSrc}`);
    }
    
    if (projectsToUpload.length > 0) {
      console.log(`\n🚀 Uploading ${projectsToUpload.length} projects to database...`);
      
      const result = await Project.insertMany(projectsToUpload, { ordered: false });
      console.log(`✅ Successfully uploaded ${result.length} packaging design projects!`);
      
      // Show category summary
      const categoryStats = {};
      result.forEach(project => {
        const cat = project.category;
        categoryStats[cat] = (categoryStats[cat] || 0) + 1;
      });
      
      console.log('\n--- Upload Summary by Category ---');
      Object.entries(categoryStats).forEach(([category, count]) => {
        console.log(`${category}: ${count} projects`);
      });
      
    } else {
      console.log('⚠️  No new projects to upload - all already exist');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
    if (error.writeErrors) {
      error.writeErrors.forEach(err => {
        console.error('Write error:', err.err);
      });
    }
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Database connection closed');
  }
}

uploadPackagingProjects();