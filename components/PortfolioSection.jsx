"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

const portfolioCategories = [
  {
    id: "branding",
    img: "https://blog.tubikstudio.com/wp-content/uploads/2018/09/logo-design-gotikket-service-tubik.png",
    url: "/category/branding",
    title: "Branding",
    description: "Complete brand identity systems that tell your story",
    projectCount: 22,
  },
  {
    id: "logo-design",
    img: "/img/logo.png",
    url: "/category/logo-design",
    title: "Logo Design",
    description: "Memorable logos that define your brand identity",
    projectCount: 14,
  },
  {
    id: "graphic-design",
    img: "/img/graphic-design.png",
    url: "/category/graphic-design",
    title: "Graphic Design",
    description: "Visual designs that communicate your brand message effectively",
    projectCount: 13,
  },
  {
    id: "web-design-development",
    img: "/img/web-design-&-development.png",
    url: "/category/web-design-development",
    title: "Web Design & Development",
    description: "Custom websites and web applications built with modern technologies",
    projectCount: 12,
  },
  {
    id: "packaging-design",
    img: "/img/packaging.png",
    url: "/category/packaging-design",
    title: "Packaging Design",
    description: "Product packaging that stands out on the shelf",
    projectCount: 11,
  },
  {
    id: "ui-ux",
    img: "/img/ux.png",
    url: "/category/ui-ux",
    title: "UI/UX",
    description: "User-centered design for digital products and services",
    projectCount: 5,
  },
  {
    id: "mobile-app",
    img: "/img/mobile-app.png",
    url: "/category/mobile-app",
    title: "Mobile App",
    description: "iOS and Android applications with seamless user experiences",
    projectCount: 4,
  },
]

const PortfolioSection = () => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [imagesLoaded, setImagesLoaded] = useState({})
  const [hoveredCard, setHoveredCard] = useState(null)

  // Track individual image loads
  const handleImageLoad = (categoryId) => {
    setImagesLoaded(prev => ({ ...prev, [categoryId]: true }))
  }

  const handleImageError = (categoryId) => {
    console.error(`Failed to load image for category: ${categoryId}`)
    setImagesLoaded(prev => ({ ...prev, [categoryId]: false }))
  }

  const openCategoryModal = (category) => {
    setSelectedCategory(category)
  }

  const closeCategoryModal = () => {
    setSelectedCategory(null)
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Section Header - Centered */}
        <div className="flex flex-col items-center justify-center text-center mb-12 sm:mb-16 w-full">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 mb-4 font-champ leading-tight tracking-tight">
            Our <span className="font-champ block md:inline">Portfolio</span>
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-blue-600 rounded-full mt-2"></div>
          <p className="text-xl text-gray-600 max-w-3xl mt-6">
            Explore our diverse range of creative services and discover how we bring ideas to life
          </p>
        </div>

        {/* Custom Grid - Landscape Cards */}
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {portfolioCategories.map((category, index) => {
              const isLoaded = imagesLoaded[category.id]
              const isHovered = hoveredCard === category.id

              return (
                <div
                  key={category.id}
                  className="portfolio-card group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                  style={{
                    opacity: isLoaded === false ? 0.3 : 1,
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                    transform: isHovered ? 'scale(0.98)' : 'scale(1)',
                  }}
                  onClick={() => openCategoryModal(category)}
                  onMouseEnter={() => setHoveredCard(category.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Image Container - Landscape 16:9 Aspect Ratio */}
                  <div className="relative w-full overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                    <img
                      src={category.img}
                      alt={category.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onLoad={() => handleImageLoad(category.id)}
                      onError={() => handleImageError(category.id)}
                      loading="eager"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                    
                    {/* Blue Hover Overlay - No Icon */}
                    <div 
                      className="absolute inset-0 bg-blue-600/90 transition-all duration-300 flex items-center justify-center"
                      style={{
                        opacity: isHovered ? 1 : 0,
                      }}
                    >
                      <span 
                        className="text-3xl md:text-4xl font-bold text-white transition-all duration-300"
                        style={{
                          transform: isHovered ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
                          opacity: isHovered ? 1 : 0,
                        }}
                      >
                        View Projects
                      </span>
                    </div>

                    {/* Category Info */}
                    <div 
                      className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-10 transition-all duration-300"
                      style={{
                        transform: isHovered ? 'translateY(100%)' : 'translateY(0)',
                        opacity: isHovered ? 0 : 1,
                      }}
                    >
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-1 font-champ">
                        {category.title}
                      </h3>
                      <p className="text-white/90 text-sm md:text-base">
                        {category.projectCount} Projects
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Category Preview Modal */}
        {selectedCategory && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl">
              {/* Modal Header */}
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
                <img
                  src={selectedCategory.img || "/placeholder.svg"}
                  alt={selectedCategory.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                  onError={(e) => {
                    console.warn('Failed to load category image:', selectedCategory.img);
                    e.target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <button
                  onClick={closeCategoryModal}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  <span className="text-white text-xl">×</span>
                </button>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-3xl font-bold text-white font-champ mb-2">{selectedCategory.title}</h3>
                  <p className="text-white/90 text-lg">{selectedCategory.projectCount} Projects</p>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                <p className="text-gray-700 text-lg leading-relaxed mb-8">{selectedCategory.description}</p>

                <div className="flex gap-4">
                  <Link
                    href={selectedCategory.url}
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors text-center"
                  >
                    View All Projects
                  </Link>
                  <button
                    onClick={closeCategoryModal}
                    className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-medium hover:bg-gray-300 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default PortfolioSection
