const mongoose = require('mongoose');
require('dotenv').config();
const Project = require('../models/Project');

const MONGODB_URI = 'mongodb+srv://aenfinitee:aenfinitee@cluster0.vigrho8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const projects = [
  // Web Design & Development Projects
  {
    title: "High-Converting Website for Bluevine Digital Marketing Agency",
    subtitle: "A clean, professional, and results-driven web design for a digital marketing agency, strategically structured to build trust and generate leads from small to medium businesses.",
    imageSrc: "https://api.aenfinite.com/uploads/web-design-development/blue-vine-marketingthumbnail.avif",
    description: "This project is the complete web design and development for Bluevine, a digital marketing agency. The website is architected as a high-converting landing page, strategically designed to guide potential clients from initial interest to a qualified lead. The design is clean, modern, and professional, utilizing a trustworthy blue color palette and a spacious layout. The user journey is built on a foundation of trust, featuring prominent sections for client logos, real Google testimonials, and case study results. The agency's methodology is demystified through clear, step-by-step process diagrams ('Here's How'), making their services transparent and understandable. With multiple, consistent calls-to-action for a 'Free Strategy Call,' the entire website is a finely-tuned engine for lead generation.",
    challenge: "The biggest challenge was to build immediate trust and credibility in a highly competitive and often-sceptical market. The website needed to cut through the noise and convince small business owners that Bluevine is a reliable partner that delivers tangible results. A second challenge was to demystify the digital marketing process, presenting the agency's services in a clear and transparent way that anyone could understand, thereby lowering the barrier for a potential client to make an inquiry.",
    solution: "The solution was to saturate the page with authentic social proof. Instead of just making claims, the design showcases a 'Trusted By' logo bar, a carousel of actual Google reviews with ratings, and a section dedicated to client results. To demystify their process, the design uses simple, numbered, step-by-step diagrams. These sections break down the complex service into a simple, logical, and non-intimidating process. This transparency builds confidence and makes the agency seem approachable and organized.",
    results: [
      "A significant increase in the number and quality of leads generated through the website's strategy call bookings.",
      "The professional design elevated the agency's brand perception, allowing them to attract higher-value clients.",
      "The clear process explanation helped to pre-qualify leads, resulting in more efficient sales calls.",
      "The website serves as a powerful central hub for the agency's marketing efforts, effectively converting traffic from various channels."
    ],
    images: [
      "https://api.aenfinite.com/uploads/web-design-development/blue-vine-marketingthumbnail.avif",
      "https://api.aenfinite.com/uploads/web-design-development/blue-vine-marketingui.avif"
    ],
    tags: [
      "Web Design & Development",
      "Lead Generation",
      "B2B Website",
      "Marketing Agency",
      "UI/UX",
      "Landing Page Design",
      "Conversion Rate Optimization"
    ],
    technologies: [
      "Figma",
      "WordPress",
      "HTML5",
      "CSS3",
      "JavaScript"
    ],
    category: "web-design-development",
    published: true
  },
  {
    title: "Corporate Website Design for Robotics Company 'Robophil'",
    subtitle: "A clean, modern, and professional web design built upon a strong corporate brand identity, aimed at establishing 'Robophil' as a leader in the robotics industry.",
    imageSrc: "https://api.aenfinite.com/uploads/web-design-development/robophilthumbnail.avif",
    description: "This project involved the design and development of a corporate website for Robophil, a company at the forefront of the robotics industry. The web design was meticulously crafted based on a comprehensive brand style guide to ensure perfect brand consistency. The resulting website features a clean, modern, and professional interface that utilizes the corporate color palette of blue, orange, and white to create a trustworthy and innovative atmosphere. The user experience is designed to be highly informative, with clear navigation to sections detailing the company's technology, services, and career opportunities. High-quality imagery of robotics and a spacious layout reinforce Robophil's position as a sophisticated and leading-edge technology firm.",
    challenge: "The key challenge was to translate the complex and technical subject of robotics into a clear, compelling, and accessible website narrative. The design and content needed to be understandable to a broad audience, from potential B2B clients to top engineering talent. A further challenge was to create a digital presence that was as innovative and cutting-edge as the technology itself, instantly establishing Robophil as a credible leader in its field.",
    solution: "The website's credibility is built on the foundation of the professional brand identity. The clean, structured layout, consistent use of the strong logo and color scheme, and high-quality professional photography all work together to create an image of a stable, expert, and forward-thinking organization. The site architecture is designed to cater to multiple audiences, with high-level pages explaining the company's vision in simple terms, while deeper sections provide the technical details required by industry experts.",
    results: [
      "A professional corporate website that successfully establishes Robophil as a credible and innovative leader in the robotics industry.",
      "The website effectively serves as a lead generation tool for B2B clients and a recruitment tool for top talent.",
      "A strong and consistent brand message is communicated across all digital touchpoints.",
      "The clear presentation of the company's work helps to secure investor confidence and media interest."
    ],
    images: [
      "https://api.aenfinite.com/uploads/web-design-development/robophilthumbnail.avif",
      "https://api.aenfinite.com/uploads/web-design-development/image.avif"
    ],
    tags: [
      "Web Design & Development",
      "Corporate Website",
      "Branding",
      "UI/UX",
      "Tech Industry",
      "Robotics",
      "B2B Website"
    ],
    technologies: [
      "Figma",
      "Sketch",
      "WordPress",
      "HTML5",
      "CSS3"
    ],
    category: "web-design-development",
    published: true
  },
  {
    title: "Elegant E-commerce Website for Modest Fashion Brand 'Husn-o-Hayat'",
    subtitle: "A sophisticated and modern web design for a Pakistani hijab brand, focusing on a premium user experience and an elegant presentation of formal and casual veils.",
    imageSrc: "https://api.aenfinite.com/uploads/web-design-development/husnohayathumbnail.avif",
    description: "This project is the web design and development for 'Husn-o-Hayat' (Beauty & Life), a premium e-commerce store specializing in modest fashion for the Pakistani market. The design is elegant, modern, and feminine, utilizing a clean layout and a sophisticated color palette to showcase its collection of exquisite hijabs. The homepage hero section immediately draws the user in with a beautiful, textured banner promoting the 'Formals' collection. Understanding the local market was key to the UX strategy; features such as a promotional top bar with a free shipping threshold in Pakistani Rupees and an integrated WhatsApp chat for customer service are included to build trust and cater to local shopping habits. The overall design positions 'Husn-o-Hayat' as a chic and trustworthy destination for high-quality, modern hijabs.",
    challenge: "The primary challenge was to create a distinct and premium brand identity that would differentiate 'Husn-o-Hayat' in the rapidly growing online modest fashion market in Pakistan. The website needed to look more sophisticated and trustworthy than the numerous sellers on social media. A second challenge was to build customer confidence in purchasing a tactile product like a hijab online, requiring a design that conveys fabric quality and color accuracy through its visual presentation.",
    solution: "The solution was to adopt a clean, minimalist, and high-fashion aesthetic rather than a cluttered, market-style layout. The elegant script logo and sophisticated color palettes position the brand as a premium boutique. Trust is built through a professional and clean interface, but also through features tailored to the local market. The prominent contact number and the integrated WhatsApp chat button make the business feel accessible and accountable, which is crucial for building confidence with Pakistani online shoppers.",
    results: [
      "A successful launch of the e-commerce store, attracting a strong following from the target demographic of modern, style-conscious Muslim women.",
      "The premium design helped establish the brand's reputation for quality and justified its positioning.",
      "High user engagement and sales driven by the clean user interface and locally-attuned features like the WhatsApp integration.",
      "The website effectively serves as the central hub for the brand's digital presence, converting traffic from social media platforms."
    ],
    images: [],
    tags: [
      "Web Design & Development",
      "E-commerce",
      "Modest Fashion",
      "Fashion Website",
      "UI/UX",
      "Shopify",
      "Pakistani Market"
    ],
    technologies: [
      "Figma",
      "Shopify",
      "WooCommerce",
      "HTML5",
      "CSS3"
    ],
    category: "web-design-development",
    published: true
  },
  {
    title: "Avant-Garde Web Design for Creative Agency 'Khattech'",
    subtitle: "A minimalist and high-fashion web design for a Pakistani digital marketing agency, using a dramatic split-screen layout and editorial typography to attract a creative clientele.",
    imageSrc: "https://api.aenfinite.com/uploads/web-design-development/khattechthumbnail.avif",
    description: "This project is the web design for 'Khattech,' a boutique digital marketing agency with a name that smartly blends local and global influences. The design is a bold statement of the agency's creative capabilities, adopting an avant-garde, minimalist aesthetic. It features a dramatic black-and-white split-screen layout that creates immediate visual impact. The use of a large, elegant serif typeface for the headline and abstract, artistic imagery gives the site a high-fashion, editorial feel. This unconventional approach is a strategic choice to differentiate the agency from corporate competitors and attract clients from creative industries like fashion, art, and luxury. The website itself acts as the primary testament to the agency's promise of delivering 'creative solutions.'",
    challenge: "The main challenge was to create a design that was bold and artistic enough to be a powerful statement of creativity, without sacrificing clarity and usability. The avant-garde layout and minimalist navigation had to be intuitive enough for a potential client to understand the agency's services and find the call-to-action. A second, strategic challenge was to commit to a niche, high-fashion aesthetic that might alienate conservative corporate clients, in a calculated move to attract a more creative and daring clientele.",
    solution: "Despite its artistic layout, the design maintains clarity through a strong hierarchy. The headline, 'Transform Your Digital Presence,' is massive and immediately states the agency's purpose. The description is concise. Most importantly, the primary call-to-action, 'Get Free Audit,' is a brightly colored, clearly labeled button placed in a clean, uncluttered space, making it an unmissable focal point. The entire aesthetic acts as a filter, signaling that this agency is for brands that value bold design and creative thinking, thus pre-qualifying leads.",
    results: [
      "The agency successfully carves out a niche in the market, becoming the go-to partner for fashion, luxury, and arts-based clients.",
      "The website wins design awards, further boosting its credibility and attracting inbound leads.",
      "The bold design generates significant buzz on social media and in design communities, providing organic marketing.",
      "The agency attracts top creative talent who are drawn to its unique and daring brand identity."
    ],
    images: [],
    tags: [
      "Web Design & Development",
      "UI/UX",
      "Creative Agency",
      "Minimalist Design",
      "Avant-Garde Design",
      "Brand Identity",
      "Lead Generation"
    ],
    technologies: [
      "Figma",
      "Webflow",
      "GSAP",
      "HTML5",
      "CSS3"
    ],
    category: "web-design-development",
    published: true
  },
  {
    title: "Bold & Cultural E-commerce Site for AFROPOP Soda",
    subtitle: "A powerful and immersive web design for a direct-to-consumer craft soda brand, using bold typography and authentic photography to celebrate Black art and culture.",
    imageSrc: "https://api.aenfinite.com/uploads/web-design-development/afropopthumbnail.avif",
    description: "This project is the web design for AFROPOP, a modern, direct-to-consumer craft soda brand with a mission to celebrate Black culture. The website is an immersive, story-driven experience that merges bold branding with a seamless e-commerce funnel. The design features a powerful art direction, using high-quality, authentic photography and a striking, textured display font to create a confident and culturally rich aesthetic. The user is taken on a journey through the brand's story, exploring their mission and values of 'Craft, Creativity, and Culture.' While rich in narrative, the site is also a highly effective sales tool, with a clean, shoppable product grid placed conveniently near the top of the page. The entire platform is a testament to how modern brands can use their digital presence to build a community and tell a story, not just sell a product.",
    challenge: "The biggest challenge for a new DTC brand like AFROPOP is to build a compelling brand identity from the ground up and earn a customer's trust entirely through its digital presence. The website had to tell a powerful story and build an emotional connection. The second challenge was to perfectly integrate this deep brand storytelling with a clear and frictionless e-commerce experience, ensuring that the narrative didn't get in the way of the sale.",
    solution: "The design solution was to lead with culture and identity. By using powerful, authentic photography and bold, expressive typography, the website immediately establishes a strong and unique personality. To balance story and sales, the page structure is strategic: the top of the page satisfies users with high purchase intent by offering a clean, shoppable product grid right away. For users who need more convincing, the rest of the page unfolds as an engaging, long-scroll story, catering to both user types without compromise.",
    results: [
      "A highly successful brand launch with strong online sales, driven by the compelling website experience.",
      "The brand builds a loyal community of customers who are drawn to its mission and authentic cultural representation.",
      "The website's strong art direction and design win awards and are featured in design publications, generating organic PR.",
      "The brand successfully establishes itself as a cool, authentic, and premium player in the craft beverage market."
    ],
    images: [
      "https://api.aenfinite.com/uploads/web-design-development/afropopthumbnail.avif",
      "https://api.aenfinite.com/uploads/web-design-development/afropopui.avif"
    ],
    tags: [
      "Web Design & Development",
      "E-commerce",
      "DTC",
      "Brand Identity",
      "UI/UX",
      "Storytelling",
      "Shopify"
    ],
    technologies: [
      "Shopify",
      "Figma",
      "Liquid",
      "HTML5",
      "CSS3"
    ],
    category: "web-design-development",
    published: true
  },
  {
    title: "Professional Corporate Website for AM-KI Consulting Services",
    subtitle: "A bold, modern, and authoritative web design for a business compliance consultancy, crafted to build trust and generate leads from corporate clients.",
    imageSrc: "https://api.aenfinite.com/uploads/web-design-development/amkiservicethumbnail.avif",
    description: "This project is the web design and development for AM-KI Services, a specialized corporate consulting firm focusing on business compliance, licensing, and permits. The design is bold, modern, and authoritative, using a powerful combination of a strong, orange and black color palette, impactful all-caps typography, and sophisticated black-and-white architectural photography. This aesthetic choice immediately establishes the firm as a serious and expert partner. The website is structured to be a direct and effective lead generation tool, with a clear value proposition in the hero section and prominent 'Get a Consultation' calls-to-action throughout. The clean layout and concise copy ensure that potential clients can quickly understand the firm's expertise in navigating complex business regulations.",
    challenge: "The primary challenge was to create a visually engaging website for a subject matter—business compliance—that is often perceived as dry and complicated. The design needed to be dynamic without sacrificing professionalism. The second, and most critical, challenge was to build a powerful sense of trust and authority. The website is the first point of contact and must convince potential clients that AM-KI Services is an expert and completely reliable partner for handling their critical business permits and licenses.",
    solution: "To make the subject engaging, the design uses a very bold and dynamic visual language. The huge, impactful headlines, the high-contrast color scheme, and the dramatic architectural photography create a powerful visual experience that feels confident and energetic, not dull. Trust is established through a clean, structured, and authoritative design. The no-nonsense layout and direct, confident language all signal expertise. The consistent and clear calls-to-action also create a sense of an organized and efficient process, which is exactly what a client looks for in a compliance partner.",
    results: [
      "The strong and professional website successfully established AM-KI Services as a credible authority in the compliance consulting field.",
      "A significant increase in qualified leads generated through the prominent 'Get a Consultation' calls-to-action.",
      "The website effectively differentiated the firm from competitors with less modern or less professional online presences.",
      "The clear presentation of services helped clients to quickly understand the firm's value, leading to a more efficient sales process."
    ],
    images: [
      "https://api.aenfinite.com/uploads/web-design-development/amkiservicethumbnail.avif",
      "https://api.aenfinite.com/uploads/web-design-development/amkiserviceui.avif"
    ],
    tags: [
      "Web Design & Development",
      "B2B Website",
      "Corporate Website",
      "Lead Generation",
      "UI/UX",
      "Professional Services",
      "Consulting"
    ],
    technologies: [
      "Figma",
      "Sketch",
      "WordPress",
      "HTML5",
      "CSS3"
    ],
    category: "web-design-development",
    published: true
  },
  {
    title: "Elegant E-commerce Website for Luxury Candle Brand 'Luna & Wick'",
    subtitle: "A serene and minimalist web design for a direct-to-consumer candle brand, using sophisticated typography and beautiful photography to create a premium and calming shopping experience.",
    imageSrc: "https://api.aenfinite.com/uploads/web-design-development/luna-wick-2.avif",
    description: "This project is the UI/UX design for 'Luna & Wick,' a high-end, direct-to-consumer candle brand. The website's design embodies a philosophy of minimalist elegance, creating a serene and luxurious shopping experience. It uses a calming, neutral color palette, sophisticated serif typography, and beautifully styled product photography to reflect the premium quality of the candles. The homepage is structured as an immersive journey, guiding users from an inspiring hero section through curated collections, best-sellers, and trust-building client testimonials. While the aesthetic is highly curated and editorial, the site is built on a powerful and intuitive e-commerce foundation, with a clean product grid and a simple purchasing process. The overall experience positions 'Luna & Wick' as a sophisticated leader in the home fragrance and lifestyle market.",
    challenge: "The primary challenge was to create a digital experience that feels as luxurious and sensory as the high-end candles themselves. The website's design had to visually communicate quality, craftsmanship, and a serene mood to justify a premium price point. A second challenge was to seamlessly weave a compelling brand story and lifestyle aesthetic into a functional e-commerce platform, ensuring the path to purchase was intuitive and didn't detract from the elegant user experience.",
    solution: "A premium atmosphere was created through a meticulous and consistent application of a minimalist design language. The use of a high-end serif font, a soft neutral color palette, and professional, art-directed photography all work together to build a world of calm luxury. The design balances story and commerce by structuring the homepage as a gentle funnel. The top sections are for inspiration and brand discovery, which then lead to clear, shoppable product grids and trust-building testimonials, making the journey feel natural and persuasive.",
    results: [
      "A successful launch of a DTC brand that quickly establishes itself as a premium player in the home fragrance market.",
      "The elegant and aspirational design helps the brand command a premium price for its products.",
      "High user engagement and a strong conversion rate, driven by the beautiful visuals and intuitive shopping experience.",
      "The website becomes the cornerstone of a strong lifestyle brand, building a loyal community of customers."
    ],
    images: [],
    tags: [
      "Web Design & Development",
      "E-commerce",
      "UI/UX",
      "Luxury Branding",
      "DTC",
      "Lifestyle Brand",
      "Minimalist Design"
    ],
    technologies: [
      "Figma",
      "Shopify",
      "Liquid",
      "HTML5",
      "CSS3"
    ],
    category: "web-design-development",
    published: true
  },
  {
    title: "UI/UX Design for 'Parrot Auto Trader' Vehicle Marketplace",
    subtitle: "A clean, modern, and highly functional website design for an online car, bike, and truck marketplace, centered around a powerful and intuitive search experience.",
    imageSrc: "https://api.aenfinite.com/uploads/web-design-development/mockup-4-cover-image.avif",
    description: "This project is the complete web design for 'Parrot Auto Trader,' a modern online marketplace for vehicles. The UI/UX is built around a 'search-first' philosophy, with the homepage featuring a large, intuitive search widget as its primary element, allowing users to immediately find their dream car. The design is clean, functional, and uses a bold color palette of blue and orange to create a dynamic and trustworthy brand presence. The search results page is a key feature, offering a comprehensive sidebar with advanced filtering options, enabling users to effortlessly navigate a large inventory of vehicles. From the simple registration process to the detailed listing pages, the entire platform is designed to provide a fast, efficient, and seamless vehicle shopping experience.",
    challenge: "The biggest UX challenge was to design a search and filtering system that could handle an immense and complex inventory with countless variables, while remaining fast, intuitive, and easy to use for a mainstream audience. The success of the entire platform hinges on the quality of its search experience. A second major challenge was to create a design that inspires a high level of trust and confidence, as users are making significant financial decisions based on the information presented.",
    solution: "The solution was a two-part search experience. A simple, primary search widget on the homepage gets the user started quickly. Once on the results page, a powerful and detailed filtering sidebar is introduced. This sidebar is meticulously organized by category and uses standard, user-friendly form elements, making it easy for users to refine their search step-by-step. Trust is built through a clean, professional, and uncluttered design that presents information, especially pricing, in a clear and transparent way.",
    results: [
      "The platform successfully attracts a large user base of both buyers and sellers due to its user-friendly interface.",
      "The powerful search and filtering tools lead to high user satisfaction and faster vehicle discovery.",
      "The professional and trustworthy design helps the brand to quickly establish credibility and compete with larger auto marketplaces.",
      "High conversion rates from browsing to making an inquiry with a seller."
    ],
    images: [
      "https://api.aenfinite.com/uploads/web-design-development/mockup-4-cover-image.avif",
      "https://api.aenfinite.com/uploads/web-design-development/inner-page-4.avif"
    ],
    tags: [
      "Web Design & Development",
      "UI/UX",
      "Marketplace",
      "E-commerce",
      "Automotive",
      "Search UI",
      "Information Architecture"
    ],
    technologies: [
      "Figma",
      "Sketch",
      "React",
      "Elasticsearch",
      "Laravel"
    ],
    category: "web-design-development",
    published: true
  },
  {
    title: "Elegant & Prestigious Website for MeLion Capital",
    subtitle: "A sophisticated and luxurious web design for an international investment fund, crafted to attract qualified investors by conveying stability, exclusivity, and expertise.",
    imageSrc: "https://api.aenfinite.com/uploads/web-design-development/mockup-6-cover.avif",
    description: "This project is the web design for MeLion Capital SICAV, a premier international investment fund. The design embodies an aesthetic of 'quiet luxury' and established prestige, crafted to resonate with a discerning audience of qualified investors. It features a sophisticated, muted color palette, elegant serif typography, and cinematic photography and video to create a feeling of stability, heritage, and calm confidence. The user experience is spacious and serene, guiding the visitor through key information about the firm's experienced team, its unique investment strategy, and the latest news. Every element, from the sculptural 3D logo to the detailed legal information in the footer, is designed to build trust and position MeLion Capital as a stable and exclusive financial partner.",
    challenge: "The primary challenge was to create a digital presence that projects an aura of exclusivity and prestige, appealing directly to high-net-worth and qualified investors. The design needed to feel like a private, members-only club, not a public-facing retail site. The second, and most critical, challenge was to build an unshakeable foundation of trust and stability through design alone, using a 'less is more' approach that relies on sophistication and professionalism rather than aggressive marketing tactics.",
    solution: "Exclusivity was achieved through a highly curated and artistic aesthetic. The use of a beautiful, cinematic hero video, a sophisticated serif font, and a muted, refined color palette all contribute to a feeling of a high-end, bespoke service. Trust is built through the design's calm, confident, and transparent presentation. Information about the experienced team is presented upfront, and the detailed footer with full legal and registration information shows a commitment to transparency and regulation. The overall aesthetic is one of stability and long-term vision.",
    results: [
      "The website successfully attracts and engages its target audience of qualified investors.",
      "The premium, trustworthy design enhances the firm's brand reputation and credibility in the competitive financial market.",
      "The website serves as an effective and professional digital 'front door' for the investment fund, validating its prestige.",
      "The clear layout and calls-to-action lead to high-quality inquiries from serious potential investors."
    ],
    images: [
      "https://api.aenfinite.com/uploads/web-design-development/mockup-6-cover.avif",
      "https://api.aenfinite.com/uploads/web-design-development/inner-page-6-part-1.avif"
    ],
    tags: [
      "Web Design & Development",
      "Financial Services",
      "Investment Fund",
      "Luxury Branding",
      "UI/UX",
      "Corporate Website",
      "Professional Services"
    ],
    technologies: [
      "Figma",
      "Sketch",
      "WordPress",
      "HTML5",
      "CSS3"
    ],
    category: "web-design-development",
    published: true
  },
  // Branding Project
  {
    title: "Sophisticated Brand Identity for Fero Financial",
    subtitle: "A complete corporate identity system for a financial services firm, designed to convey trust, stability, and modern professionalism to a discerning clientele.",
    imageSrc: "https://api.aenfinite.com/uploads/branding/feirod.avif",
    description: "This project is the creation of a complete corporate brand identity for Fero Financial, a personal wealth management and financial advisory firm. The brand identity is built on a foundation of trust, stability, and modern elegance. The logo system features a strong, geometric 'FJ' monogram symbolizing security and partnership, paired with a classic serif logotype that conveys tradition and authority. A sophisticated and calming color palette of dusty blue, charcoal, and off-white is used to create a feeling of calm confidence. This cohesive visual system was applied across a full suite of corporate collateral, including business cards, letterhead, and brochures, to ensure a consistent, professional, and trustworthy brand experience for the firm's clients.",
    challenge: "The single most important challenge for a financial brand is to visually communicate trust and security. The entire brand identity for Fero Financial had to project an immediate sense of stability, expertise, and unwavering reliability. The second challenge was to strike a careful balance between a modern aesthetic that appeals to a contemporary audience and the traditional design cues that signify a stable, long-standing financial institution.",
    solution: "Trust is conveyed through a deliberately calm and professional design language. The muted, serene color palette, the structured and spacious layouts, and the use of a classic serif font all contribute to an atmosphere of calm confidence and authority. The balance between modern and traditional was achieved by pairing a classic serif logotype with a clean, modern, geometric monogram. This creates a brand that feels both current and securely established.",
    results: [
      "A powerful and cohesive brand identity that successfully positions Fero Financial as a trustworthy and premium financial partner.",
      "The professional branding helps the firm attract and retain high-net-worth clients.",
      "A full suite of marketing and communication materials that ensures brand consistency and professionalism at every client touchpoint.",
      "The brand successfully differentiates itself from both older, more staid institutions and newer, more volatile fintech startups."
    ],
    images: [
      "https://api.aenfinite.com/uploads/branding/feirod.avif",
      "https://api.aenfinite.com/uploads/branding/feiroimage.avif"
    ],
    tags: [
      "Branding",
      "Logo Design",
      "Corporate Identity",
      "Financial Services",
      "Graphic Design",
      "Visual Identity",
      "Professional Services"
    ],
    technologies: [
      "Adobe Illustrator",
      "Adobe Photoshop"
    ],
    category: "branding",
    published: true
  },
  // Packaging Design Project
  {
    title: "Elegant Skincare Packaging for 'Eminent Essence'",
    subtitle: "A sophisticated and versatile packaging design system for a luxury serum, featuring two distinct colorways—light and dark—to cater to different product lines or consumer preferences.",
    imageSrc: "https://api.aenfinite.com/uploads/packaging-design/ackiging pf.jpg",
    description: "This project showcases a versatile and sophisticated packaging design system for the luxury skincare brand, 'Eminent Essence.' The design is presented in two distinct colorways: a soft, gentle pink and a bold, premium black. This dual-palette approach allows the brand to easily differentiate between product lines (e.g., day vs. night serums) while maintaining a cohesive visual identity. The core of the design is the elegant contrast between a flowing, expressive script font for the product name and clean, minimalist sans-serif typography for the brand details. This creates a look that is both artistic and clinical, perfectly suited for a high-end, results-driven skincare product. The design is applied consistently across both the dropper bottle and the outer retail box, ensuring a premium unboxing experience.",
    challenge: "The primary challenge was to create a packaging design that was distinctive and memorable enough to stand out in the incredibly saturated luxury skincare market. The design needed to communicate quality and efficacy at a glance. A second, strategic challenge was to develop a flexible and scalable visual identity system that could be adapted across a growing range of products, allowing for clear differentiation while maintaining a cohesive brand image.",
    solution: "The design stands out through its elegant simplicity and the striking use of a custom script font as the primary graphic element. This artistic, personal touch is more unique than relying on generic imagery or patterns. The dual-colorway system is the solution to flexibility; by establishing two core palettes (pink/light and black/dark) from the start, the brand has a ready-made system for categorizing its products. The consistent typographic style acts as the 'glue' that holds the brand family together.",
    results: [
      "The brand successfully launches with a premium and sophisticated image that attracts its target audience.",
      "The beautiful packaging leads to high social media engagement and user-generated content.",
      "The flexible design system allows the brand to easily and coherently expand its product line in the future.",
      "The premium aesthetic helps the brand secure placement in high-end retail stores and boutiques."
    ],
    images: [],
    tags: [
      "Packaging Design",
      "Graphic Design",
      "Luxury Branding",
      "Cosmetics Packaging",
      "Skincare",
      "Brand Identity",
      "Beauty Branding"
    ],
    technologies: [
      "Adobe Illustrator",
      "Adobe Photoshop",
      "3D Rendering Software"
    ],
    category: "packaging-design",
    published: true
  }
];

async function uploadProjects() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB successfully!\n');

    console.log(`📦 Preparing to upload ${projects.length} projects across multiple categories...\n`);

    let webCount = 0;
    let brandingCount = 0;
    let packagingCount = 0;

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
        if (projectData.category === 'web-design-development') webCount++;
        if (projectData.category === 'branding') brandingCount++;
        if (projectData.category === 'packaging-design') packagingCount++;
        
        console.log(`✅ Uploaded: ${projectData.title} [${projectData.category}]`);
      } catch (error) {
        console.error(`❌ Error uploading "${projectData.title}":`, error.message);
      }
    }

    console.log('\n🎉 Upload process completed!');
    
    // Show summary
    const totalWeb = await Project.countDocuments({ category: 'web-design-development' });
    const totalBranding = await Project.countDocuments({ category: 'branding' });
    const totalPackaging = await Project.countDocuments({ category: 'packaging-design' });
    
    console.log(`\n📊 Category Summary:`);
    console.log(`   🌐 Web Design & Development: ${totalWeb} (added ${webCount})`);
    console.log(`   🎨 Branding: ${totalBranding} (added ${brandingCount})`);
    console.log(`   📦 Packaging Design: ${totalPackaging} (added ${packagingCount})`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed.');
  }
}

uploadProjects();
