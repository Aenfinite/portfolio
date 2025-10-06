"use client"

import { useState } from "react"
import Link from "next/link"
import Masonry from "../Masonry/Masonry"

const portfolioCategories = [
  {
    id: "web-design-development",
    img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=400&h=300&q=80",
    url: "/category/web-design-development",
    height: 320,
    title: "Web Design & Development",
    description: "Custom websites and web applications built with modern technologies",
    projectCount: 45,
  },
  {
    id: "mobile-app",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=400&h=350&q=80",
    url: "/category/mobile-app",
    height: 350,
    title: "Mobile App",
    description: "iOS and Android applications with seamless user experiences",
    projectCount: 32,
  },
  {
    id: "graphic-design",
    img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=400&h=280&q=80",
    url: "/category/graphic-design",
    height: 280,
    title: "Graphic Design",
    description: "Visual designs that communicate your brand message effectively",
    projectCount: 58,
  },
  {
    id: "logo-design",
    img: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=400&h=340&q=80",
    url: "/category/logo-design",
    height: 340,
    title: "Logo Design",
    description: "Memorable logos that define your brand identity",
    projectCount: 67,
  },
  {
    id: "branding",
    img: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=400&h=300&q=80",
    url: "/category/branding",
    height: 300,
    title: "Branding",
    description: "Complete brand identity systems that tell your story",
    projectCount: 41,
  },
  {
    id: "packaging-design",
    img: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?auto=format&fit=crop&w=400&h=360&q=80",
    url: "/category/packaging-design",
    height: 360,
    title: "Packaging Design",
    description: "Product packaging that stands out on the shelf",
    projectCount: 29,
  },
  {
    id: "ui-ux",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=400&h=310&q=80",
    url: "/category/ui-ux",
    height: 310,
    title: "UI/UX",
    description: "User-centered design for digital products and services",
    projectCount: 53,
  },
]

const PortfolioSection = () => {
  const [selectedCategory, setSelectedCategory] = useState(null)

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

        {/* Masonry Component - Full Width */}
        <div className="w-full">
          <div
            className="w-full"
            style={{
              position: "relative",
              paddingBottom: "40px",
            }}
          >
            <Masonry
              items={portfolioCategories}
              ease="power3.out"
              duration={0.6}
              stagger={0.05}
              animateFrom="bottom"
              scaleOnHover={true}
              hoverScale={0.95}
              blurToFocus={true}
              colorShiftOnHover={false}
              onItemClick={openCategoryModal}
            />
          </div>
        </div>

        {/* Category Preview Modal */}
        {selectedCategory && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl">
              {/* Modal Header */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={selectedCategory.img || "/placeholder.svg"}
                  alt={selectedCategory.title}
                  className="w-full h-full object-cover"
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
