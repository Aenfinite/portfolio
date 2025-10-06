import { ThreeDMarquee } from "./ui/3d-marquee.jsx"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    content: "Exceptional work! Our conversion rate increased by 200%.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150&q=80",
    company: "TechStart Inc.",
    project: "E-commerce Platform",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Marketing Director",
    content: "AI-powered solutions improved our ROI by 150%. Highly recommended!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    company: "GrowthCorp",
    project: "AI Marketing",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Founder",
    content: "Outstanding UI/UX design. Our app ratings went from 3.2 to 4.8 stars!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    company: "Creative Studio",
    project: "Mobile App",
  },
  {
    id: 4,
    name: "David Thompson",
    role: "CTO",
    content: "Top-notch development team. Delivered on time with exceptional quality.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    company: "InnovateLab",
    project: "Web Application",
  },
  {
    id: 5,
    name: "Lisa Wang",
    role: "Head of Digital",
    content: "Digital marketing strategy boosted our online sales by 300%.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    company: "RetailMax",
    project: "Digital Marketing",
  },
  {
    id: 6,
    name: "Alex Rivera",
    role: "Product Manager",
    content: "Seamless integration and outstanding support throughout the project.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80",
    company: "TechFlow",
    project: "Platform Integration",
  },
  {
    id: 7,
    name: "Jessica Miller",
    role: "Brand Director",
    content: "Creative solutions that perfectly captured our brand vision.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    company: "BrandCorp",
    project: "Brand Identity",
  },
  {
    id: 8,
    name: "Ryan Foster",
    role: "Operations Lead",
    content: "Streamlined our processes with innovative automation solutions.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=150&q=80",
    company: "OptiFlow",
    project: "Process Automation",
  },
  {
    id: 9,
    name: "Amanda Clark",
    role: "VP of Sales",
    content: "Lead generation improved by 180% with their custom CRM solution.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=150&q=80",
    company: "SalesMax",
    project: "CRM Development",
  },
  {
    id: 10,
    name: "Marcus Jones",
    role: "Tech Lead",
    content: "Clean code, excellent architecture, and professional delivery.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=150&q=80",
    company: "DevSolutions",
    project: "Software Architecture",
  },
  {
    id: 11,
    name: "Sofia Martinez",
    role: "UX Designer",
    content: "Collaborative approach resulted in an award-winning user experience.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=150&q=80",
    company: "UX Studio",
    project: "UX Research",
  },
  {
    id: 12,
    name: "Kevin Park",
    role: "Startup Founder",
    content: "From concept to launch, they guided us every step of the way.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=150&q=80",
    company: "StartupHub",
    project: "MVP Development",
  },
  {
    id: 13,
    name: "Rachel Green",
    role: "E-commerce Manager",
    content: "Online store performance increased by 250% after optimization.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=150&q=80",
    company: "ShopSmart",
    project: "E-commerce Optimization",
  },
  {
    id: 14,
    name: "Thomas Kim",
    role: "Data Analyst",
    content: "Data visualization tools transformed our decision-making process.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?auto=format&fit=crop&w=150&q=80",
    company: "DataInsights",
    project: "Analytics Dashboard",
  },
  {
    id: 15,
    name: "Nicole Brown",
    role: "Content Strategist",
    content: "Content management system exceeded all our expectations.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=150&q=80",
    company: "ContentHub",
    project: "CMS Development",
  },
]

// Create testimonial images using canvas or a service to generate visual testimonial cards
const createTestimonialImages = () => {
  // For now, we'll use placeholder testimonial card images
  // In a real implementation, you might use a service like htmlcsstoimage.com or generate them server-side
  return [
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=400&h=600&q=80",
    "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=400&h=600&q=80",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=400&h=600&q=80",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=400&h=600&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=600&q=80",
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=400&h=600&q=80",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&h=600&q=80",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=600&q=80",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=600&q=80",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=600&q=80",
    "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=400&h=600&q=80",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&h=600&q=80",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&h=600&q=80",
    "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&h=600&q=80",
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=600&q=80",
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&h=600&q=80",
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=400&h=600&q=80",
    "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?auto=format&fit=crop&w=400&h=600&q=80",
    "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=400&h=600&q=80",
    "https://images.unsplash.com/photo-1590650153855-d9e808231d41?auto=format&fit=crop&w=400&h=600&q=80",
  ]
}

const testimonialImages = createTestimonialImages()

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden flex flex-col items-center justify-center min-h-screen">
      {/* Section Header */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 flex flex-col items-center mb-16">
        <div className="text-center flex flex-col items-center">
          <h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-champ text-center"
            style={{ paddingTop: "30px" }}
          >
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl text-center leading-relaxed" style={{ paddingBottom: "40px" }}>
            Don't just take our word for it. Here's what our satisfied clients have to say about their experience
            working with us.
          </p>
        </div>
      </div>

      {/* 3D Marquee - Full Width with Blur Gradients */}
      <div className="w-full flex justify-center items-center mb-16 relative z-10">
        {/* Top Blur Gradient */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none z-30"></div>

        {/* 3D Marquee */}
        <div className="relative w-full">
          <ThreeDMarquee testimonials={testimonials} />
        </div>

        {/* Bottom Blur Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-30"></div>
      </div>

      {/* Stats Section */}
      <div
        className="w-full flex justify-center items-center relative z-20"
        style={{ paddingBottom: "40px", paddingTop: "40px" }}
      >
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 px-4 sm:px-6 lg:px-8">
          {[
            { number: "100+", label: "Happy Clients" },
            { number: "250+", label: "Projects Completed" },
            { number: "98%", label: "Client Satisfaction" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-gray-50 rounded-2xl p-8 shadow-lg border border-gray-200 min-w-[200px] hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-5xl font-bold text-gray-900 mb-3 font-champ">{stat.number}</h3>
                <p className="text-gray-600 font-semibold text-lg">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
