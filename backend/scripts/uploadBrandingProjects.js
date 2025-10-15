const mongoose = require('mongoose');
require('dotenv').config();
const Project = require('../models/Project');

const MONGODB_URI = 'mongodb+srv://aenfinitee:aenfinitee@cluster0.vigrho8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const brandingProjects = [
  {
    title: "Corporate Event Branding for Getz Pharma",
    subtitle: "A clean and dynamic step-and-repeat brand pattern for the Getz Pharma Afghanistan Annual Sales Conference 2022, designed to create a cohesive and professional event atmosphere.",
    imageSrc: "https://api.aenfinite.com/uploads/branding/ASC-Media-Wall-12'x10'.avif",
    description: "This project showcases the event branding for the Getz Pharma Afghanistan 'Annual Sales Conference 2022.' The core design is a professional step-and-repeat pattern created to be used across all event collateral, such as media walls, backdrops, and digital assets. The design alternates between the clean corporate logo of Getz Pharma—a highly respected name in the pharmaceutical industry—and a custom event-specific lockup. This event logo features the motivational theme 'GO HIGHER,' designed to inspire the sales team. The strong, corporate blue and white color palette reinforces the brand's identity of trust and professionalism. The resulting pattern is a versatile and powerful branding tool that creates a cohesive and immersive atmosphere for a major corporate conference.",
    challenge: "The main challenge was to create a visual identity that was both motivational for the specific sales conference and perfectly aligned with the strict, professional brand guidelines of a major pharmaceutical company like Getz Pharma. The design needed to balance the event's 'GO HIGHER' theme with the corporate identity. Another challenge was to create a versatile pattern that would be effective and look professional across a wide range of applications and sizes.",
    solution: "The solution was a checkerboard approach. By alternating the two logos, the design gives equal weight to both the corporate brand and the event's unique identity. One block is purely 'Getz Pharma,' reinforcing the foundation, while the next block is all about the 'Afghanistan Sales Conference 2022' and its theme, creating a perfect synergy. The simplicity of the high-contrast pattern ensures it is infinitely scalable and remains clear and legible at any size, making it a perfect background for photos and videos.",
    results: [
      "A highly professional and cohesive visual identity for the entire sales conference.",
      "The branding reinforced a sense of corporate pride and motivation among the sales team.",
      "All photos and videos from the event were instantly recognizable and branded, increasing the event's marketing value.",
      "The versatile pattern was successfully deployed across all planned event collateral, creating a seamless brand experience."
    ],
    images: [],
    tags: [
      "Branding",
      "Event Branding",
      "Corporate Identity",
      "Graphic Design",
      "Pattern Design",
      "Pharmaceutical",
      "Conference Design"
    ],
    technologies: [
      "Adobe Illustrator"
    ],
    category: "branding",
    published: true
  },
  {
    title: "Corporate Exhibition Booth Design for Tech Consultancy",
    subtitle: "A modern and professional trade show booth design for Dylan J. Aebi Consulting, created to attract potential clients and clearly communicate their role as a 'One-Stop Technology Partner.'",
    imageSrc: "https://api.aenfinite.com/uploads/branding/Booth-Mockup.avif",
    description: "This project is the complete brand design for a corporate exhibition booth for Dylan J. Aebi Consulting. The design transforms a standard trade show space into an immersive and professional brand environment. Utilizing a sophisticated corporate color palette of dark blue, green, and light blue, the design projects an image of trust and technological expertise. The booth's layout is strategically planned to communicate key messages sequentially: a bold tagline captures attention from the aisle, the company logo establishes identity, and a detailed services panel informs engaged visitors. Abstract graphic elements and clean typography are used to create a modern, dynamic feel. The entire space, from the back walls to the welcome podium, is consistently branded to position the firm as a premier 'One-Stop Technology Partner.'",
    challenge: "The primary challenge was to design a booth that could cut through the visual noise of a crowded trade show floor and attract the attention of relevant attendees. The design needed to have a strong visual hook. The second, equally critical challenge was to communicate the company's core value proposition—a comprehensive technology partner—in a matter of seconds to a passerby, encouraging them to stop and engage.",
    solution: "The solution was to use large, bold graphic elements and a high-contrast color palette. The simple but powerful tagline 'Where Trust Meets Technology' is large and legible from a distance, speaking to a key client concern. The messaging is layered hierarchically across the different walls, allowing a visitor to understand the company's essence at a glance and then get more detail as they step into the booth. The welcome desk's message 'Your Tech Journey Starts Here' serves as a perfect, inviting call to action.",
    results: [
      "The booth successfully attracted a high volume of foot traffic and generated quality business leads at the trade show.",
      "The professional and clear design helped the consulting firm to effectively communicate its brand and services.",
      "The booth stood out from competitors and reinforced the company's image as a modern and trustworthy technology leader.",
      "The design served as a functional and inviting space for the sales team to conduct meetings with potential clients."
    ],
    images: [],
    tags: [
      "Branding",
      "Environmental Design",
      "Exhibition Booth Design",
      "Trade Show",
      "Corporate Identity",
      "B2B Marketing",
      "Graphic Design"
    ],
    technologies: [
      "3D Rendering Software",
      "Adobe Illustrator",
      "Adobe Photoshop"
    ],
    category: "branding",
    published: true
  },
  {
    title: "Exhibition Booth Design for A&Z Solar Energy",
    subtitle: "A clean, modern, and product-focused trade show booth for a solar solutions provider, designed to showcase leading inverter and panel brands to the Pakistani market.",
    imageSrc: "https://api.aenfinite.com/uploads/branding/mockup.avif",
    description: "This project is the design for a modern exhibition booth for A&Z Solar Energy, a key player in the booming solar energy market. The design is strategically focused on showcasing their flagship product offerings from the popular brand Inverex. The booth is visually divided into color-coded sections to highlight specific product lines, like the red-themed 'NitroX' and the blue-themed 'Veyron II.' The central panel prominently features the A&Z Solar Energy brand, positioning them as the primary solutions provider. The core of the design is the clean, physical display of the solar inverters and panels, allowing potential customers to interact with the products directly. This product-centric approach, combined with a clean and professional aesthetic, makes the booth a highly effective sales and marketing tool for a technology trade show.",
    challenge: "The key challenge was to create a design that successfully balances the branding of the distributor, A&Z Solar Energy, with the branding of the well-known manufacturer, Inverex. The booth needed to build A&Z's brand credibility as a top provider, without being overshadowed by the products it showcases. A second challenge was to present technical hardware in a visually appealing and easily understandable way for a broad trade show audience.",
    solution: "The design gives A&Z Solar Energy the most prominent position, with its logo featured centrally on a large, protruding sign, establishing them as the main entity. The partner brands are then given dedicated, distinct 'pavilions' within the booth. This structure clearly communicates the relationship: A&Z is the main partner, and Inverex is the technology they provide. To make the hardware engaging, the design uses large, benefit-driven headlines and supporting icons, while the physical products are mounted cleanly like pieces in a gallery, inviting closer inspection.",
    results: [
      "The booth successfully attracted significant attention at energy expos, driving high foot traffic and generating numerous sales leads.",
      "The clear, product-focused design reinforced A&Z Solar Energy's position as a leading distributor of popular solar brands.",
      "The professional presentation helped to build trust with both residential customers and commercial installers.",
      "The design provided an excellent platform for sales staff to demonstrate products and engage with potential clients."
    ],
    images: [],
    tags: [
      "Branding",
      "Exhibition Booth Design",
      "Environmental Design",
      "Trade Show",
      "Solar Energy",
      "B2B Marketing",
      "Product Showcase"
    ],
    technologies: [
      "3D Rendering Software",
      "Adobe Illustrator",
      "Adobe Photoshop"
    ],
    category: "branding",
    published: true
  },
  {
    title: "Dynamic Brand Identity for Sports Brand 'CAKEO'",
    subtitle: "A modern and minimalist brand identity concept, featuring a dynamic logo and vibrant color palette designed to represent speed, growth, and performance.",
    imageSrc: "https://api.aenfinite.com/uploads/branding/75b53ec6-577a-45ef-a9b3-d99fe5.avif",
    description: "This project showcases the development of a modern and dynamic brand identity for 'CAKEO,' a brand positioned in the sports and performance industry. Guided by a philosophy of 'clarity through shaping simple lines,' the identity is both minimalist and full of energy. The core of the brand is its logo, which combines a clean, geometric logotype with a powerful logomark of forward-pointing chevrons, symbolizing speed, direction, and growth. A vibrant, high-contrast color palette of deep blue and electric lime green is used to create a contemporary and energetic feel. The presentation demonstrates the brand's versatility, showing its application on digital screens and in atmospheric sports imagery, establishing 'CAKEO' as a bold and forward-thinking brand.",
    challenge: "The primary challenge was to create a brand identity that could be strong, simple, and memorable enough to compete in the saturated sports market, which is dominated by iconic global brands. The logo needed to be unique and instantly recognizable. The second major challenge was to visually embed the concepts of 'motion,' 'performance,' and 'energy' into a static brand mark to ensure it resonated authentically with an athletic audience.",
    solution: "The solution was to create a very clean and simple logo system. The distinct chevron mark powerfully conveys a sense of forward motion and speed. By avoiding complexity, the logo becomes more timeless and easier to remember. The high-energy color palette of deep blue and electric lime green ensures the brand stands out, while the dynamic application of the logo over action shots visually fuses the brand with the act of performance.",
    results: [
      "A strong and memorable brand identity that could successfully launch the 'CAKEO' brand in the sports market.",
      "The dynamic logo and vibrant colors resonate well with the target audience of young, active consumers.",
      "The versatile branding works effectively across a range of applications, from digital app icons to apparel and equipment.",
      "The brand is perceived as modern, energetic, and premium."
    ],
    images: [],
    tags: [
      "Branding",
      "Logo Design",
      "Corporate Identity",
      "Graphic Design",
      "Sports Branding",
      "Minimalist Design",
      "Visual Identity"
    ],
    technologies: [
      "Adobe Illustrator",
      "Adobe Photoshop"
    ],
    category: "branding",
    published: true
  },
  {
    title: "Urban Cycling Brand Identity for 'Cycle The 6ix'",
    subtitle: "A clever and comprehensive brand identity for a Toronto-based cycling brand, featuring a memorable logo that visually merges the city's nickname with the act of cycling.",
    imageSrc: "https://api.aenfinite.com/uploads/branding/cyclethe6-logo-13.jpg",
    description: "This project is a complete brand identity system for 'Cycle The 6ix,' a modern lifestyle brand centered on urban cycling culture in Toronto. The cornerstone of the identity is a clever and highly memorable logo, where the number '6' from the city's nickname, 'The 6ix,' is ingeniously replaced by a minimalist, top-down illustration of a bicycle. This creates a powerful and unique mark that is both the brand's name and its symbol. The visual system is built on a strong, urban color palette of charcoal black and golden yellow, paired with the bold 'Bison Bold' typeface to project a confident and contemporary image. The brand's versatility is demonstrated across a comprehensive suite of applications, including merchandise, print collateral, digital branding, and on-product graphics, establishing a cohesive and impactful brand experience.",
    challenge: "The primary challenge was to create a brand identity that was authentically rooted in Toronto's local culture while also having a broad, modern appeal. The design needed to cleverly incorporate the city's nickname, 'The 6ix,' in a way that felt authentic and not forced. A further challenge was to create a brand that could resonate with multiple audiences simultaneously—from avid local cyclists to tourists and fashion-conscious urbanites.",
    solution: "The solution lies in the clever integration of the local nickname directly into the logo. By making the '6' a bicycle, the brand is intrinsically and inseparably linked to both cycling and Toronto. It's a witty, 'insider' reference that feels authentic and smart. The clean, minimalist aesthetic and stylish color palette give the brand a broad appeal, making it work as both a functional service identity and a cool lifestyle brand that people would be proud to wear.",
    results: [
      "A highly successful brand concept that could become a recognizable symbol of Toronto's cycling culture.",
      "The clever logo has the potential to gain organic traction and become an iconic piece of local design.",
      "A versatile branding system that allows the company to easily expand its product and service offerings while maintaining a cohesive identity.",
      "The brand successfully appeals to a wide demographic, from tourists needing a rental to locals wanting to buy city-proud merchandise."
    ],
    images: [
      "https://api.aenfinite.com/uploads/branding/cyclethe6-logo-13.jpg",
      "https://api.aenfinite.com/uploads/branding/cyclethe6-logo-01.avif",
      "https://api.aenfinite.com/uploads/branding/cyclethe6-logo-10.jpg",
      "https://api.aenfinite.com/uploads/branding/cyclethe6-logo-14.jpg",
      "https://api.aenfinite.com/uploads/branding/cyclethe6-logo-02.jpg",
      "https://api.aenfinite.com/uploads/branding/cyclethe6-logo-03.avif",
      "https://api.aenfinite.com/uploads/branding/cyclethe6-logo-04.avif",
      "https://api.aenfinite.com/uploads/branding/cyclethe6-logo_4.avif"
    ],
    tags: [
      "Branding",
      "Logo Design",
      "Corporate Identity",
      "Graphic Design",
      "Lifestyle Brand",
      "Urban Cycling",
      "Visual Identity"
    ],
    technologies: [
      "Adobe Illustrator",
      "Adobe Photoshop"
    ],
    category: "branding",
    published: true
  },
  {
    title: "Elegant Brand Identity for Luxury Fragrance Brand 'MuskFume'",
    subtitle: "A sophisticated and minimalist brand identity for a modern fragrance and lifestyle brand, featuring an intelligent logo that blends a perfume bottle with a heart.",
    imageSrc: "https://api.aenfinite.com/uploads/branding/muskfume_presentation-11.jpg",
    description: "This project showcases the complete brand identity design for 'MuskFume,' a modern luxury fragrance and lifestyle brand. The brand's identity is centered on a clever and elegant monoline logo that artfully combines the silhouette of a perfume bottle with a heart, visually capturing the brand's mission to evoke deep emotions and personal experiences. A timeless and sophisticated color palette of black and gold is paired with clean, widely-spaced typography to create a powerful sense of luxury and refinement. The identity system is demonstrated across a full suite of applications—from the perfume bottle itself to a complete corporate stationery set—establishing 'MuskFume' as a cohesive, premium, and desirable brand in the competitive fragrance market.",
    challenge: "The key challenge was to create a brand identity for a new fragrance company that felt both modern and timelessly luxurious. In a market dominated by heritage brands, 'MuskFume' needed an identity that projected immediate prestige and quality. The second challenge was to visually translate the abstract concept of 'breathing luxury' and the emotional connection to scent into a simple, compelling, and memorable brand mark.",
    solution: "The solution was to build the identity on a classic and proven foundation: a black and gold color palette and clean, elegant typography. The intelligent design of the logo is key; by merging the product (the bottle) with the emotion (the heart), the logo creates a powerful and immediate story. It visually communicates that this brand is about more than just perfume; it's about love, memory, and personal identity. This simple, elegant symbol effectively embodies the brand's abstract mission.",
    results: [
      "A successful launch of a new luxury brand, with the strong and sophisticated branding playing a key role in attracting a discerning customer base.",
      "The packaging and branding help to justify a premium price point for the products.",
      "The memorable logo becomes a recognizable symbol of modern luxury and quality.",
      "The cohesive brand identity creates a strong foundation for the brand to expand its product line into other home fragrance categories."
    ],
    images: [
      "https://api.aenfinite.com/uploads/branding/muskfume_presentation-11.jpg",
      "https://api.aenfinite.com/uploads/branding/muskfume.avif",
      "https://api.aenfinite.com/uploads/branding/muskfume_presentation-08.avif",
      "https://api.aenfinite.com/uploads/branding/muskfume_presentation-13.avif",
      "https://api.aenfinite.com/uploads/branding/muskfume_presentation-16.avif"
    ],
    tags: [
      "Branding",
      "Logo Design",
      "Luxury Branding",
      "Corporate Identity",
      "Graphic Design",
      "Perfume Packaging",
      "Visual Identity"
    ],
    technologies: [
      "Adobe Illustrator",
      "Adobe Photoshop"
    ],
    category: "branding",
    published: true
  },
  {
    title: "Futuristic Brand Guidelines for Tech Company 'Algopros'",
    subtitle: "A comprehensive brand identity manual detailing the logo, color palette, typography, and application rules for a modern technology brand, presented in a sleek and visually engaging format.",
    imageSrc: "https://api.aenfinite.com/uploads/branding/BRAND-03.avif",
    description: "This project is the design of a complete 'Branding Guidelines' document for the technology brand, 'Algopros.' The work involved creating a comprehensive manual that defines and documents the brand's entire visual identity. The booklet covers all critical brand elements, including the geometric construction of the logo, the official blue and purple color palette, typography standards, and clear rules for logo application on various backgrounds and images. The design of the guidelines document itself is a reflection of the Algopros brand—sleek, futuristic, and professional. It uses the brand's own vibrant color gradients and clean layout to present the technical rules in a visually engaging and easy-to-understand format, ensuring brand consistency across all future applications.",
    challenge: "The primary challenge was to create a document that is both rigorously technical and creatively inspiring. The guidelines needed to provide clear, precise, and non-negotiable rules for using the brand's assets to ensure consistency. At the same time, the document had to be designed in a way that was engaging and reflective of the brand's own futuristic identity, motivating users to become brand ambassadors rather than just rule-followers.",
    solution: "Clarity was achieved through a highly structured and visual approach. Instead of long paragraphs, the guidelines use clear headings, diagrams, and visual examples of 'do's and don'ts' for logo application. To make the document engaging, it was designed to be a beautiful piece of branding in its own right. It uses the brand's dynamic color gradients and sleek typography, making the rulebook an aspirational document that showcases the best of the brand and makes people excited to use it correctly.",
    results: [
      "A foundational document that empowers the client's internal teams and external partners to use the brand identity correctly and consistently.",
      "A significant improvement in brand consistency across all marketing channels.",
      "The beautiful design of the guidelines themselves served as a powerful tool for introducing the new brand identity to stakeholders.",
      "The clear rules reduced the number of design revisions and questions directed at the core brand team."
    ],
    images: [
      "https://api.aenfinite.com/uploads/branding/BRAND-03.avif",
      "https://api.aenfinite.com/uploads/branding/BRAND-01.avif"
    ],
    tags: [
      "Branding",
      "Brand Guidelines",
      "Brand Strategy",
      "Corporate Identity",
      "Logo Design",
      "Graphic Design",
      "Tech Branding"
    ],
    technologies: [
      "Adobe InDesign",
      "Adobe Illustrator",
      "Adobe Photoshop"
    ],
    category: "branding",
    published: true
  }
];

async function uploadProjects() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB successfully!\n');

    console.log(`📦 Preparing to upload ${brandingProjects.length} branding projects...\n`);

    for (const projectData of brandingProjects) {
      try {
        // Check if project already exists
        const existingProject = await Project.findOne({ title: projectData.title });
        
        if (existingProject) {
          console.log(`⚠️  Project "${projectData.title}" already exists. Skipping...`);
          continue;
        }

        const project = new Project(projectData);
        await project.save();
        console.log(`✅ Uploaded: ${projectData.title}`);
      } catch (error) {
        console.error(`❌ Error uploading "${projectData.title}":`, error.message);
      }
    }

    console.log('\n🎉 Upload process completed!');
    
    // Show summary
    const totalBranding = await Project.countDocuments({ category: 'branding' });
    console.log(`\n📊 Total branding projects in database: ${totalBranding}`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed.');
  }
}

uploadProjects();
