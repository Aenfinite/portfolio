"use client"

import { useEffect, useRef, useState } from "react"

const Masonry = ({
  items = [],
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
  onItemClick = null,
}) => {
  const [columns, setColumns] = useState(3)
  const containerRef = useRef(null)

  // Responsive column count
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth
      if (width < 640) setColumns(1)
      else if (width < 1024) setColumns(2)
      else setColumns(3)
    }

    updateColumns()
    window.addEventListener("resize", updateColumns)
    return () => window.removeEventListener("resize", updateColumns)
  }, [])

  // Distribute items into columns
  const distributeItems = () => {
    const cols = Array.from({ length: columns }, () => [])
    const colHeights = Array(columns).fill(0)

    items.forEach((item) => {
      const shortestCol = colHeights.indexOf(Math.min(...colHeights))
      cols[shortestCol].push(item)
      colHeights[shortestCol] += item.height || 300
    })

    return cols
  }

  const columnItems = distributeItems()

  return (
    <div ref={containerRef} className="w-full">
      <div className="flex gap-4 w-full">
        {columnItems.map((column, colIndex) => (
          <div key={colIndex} className="flex-1 flex flex-col gap-4">
            {column.map((item, itemIndex) => (
              <MasonryItem
                key={item.id}
                item={item}
                index={colIndex * column.length + itemIndex}
                scaleOnHover={scaleOnHover}
                hoverScale={hoverScale}
                blurToFocus={blurToFocus}
                colorShiftOnHover={colorShiftOnHover}
                onItemClick={onItemClick}
                stagger={stagger}
                duration={duration}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

const MasonryItem = ({
  item,
  index,
  scaleOnHover,
  hoverScale,
  blurToFocus,
  colorShiftOnHover,
  onItemClick,
  stagger,
  duration,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const handleClick = () => {
    if (onItemClick) {
      onItemClick(item)
    }
  }

  return (
    <div
      className="relative overflow-hidden rounded-lg cursor-pointer group"
      style={{
        opacity: isLoaded ? 1 : 0,
        transform: isLoaded ? "translateY(0)" : "translateY(20px)",
        transition: `all ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${index * stagger}s`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div
        className="relative w-full bg-gray-100"
        style={{
          height: `${item.height}px`,
          transform: isHovered && scaleOnHover ? `scale(${hoverScale})` : "scale(1)",
          transition: `transform ${duration}s cubic-bezier(0.4, 0, 0.2, 1)`,
        }}
      >
        <img
          src={item.img || "/placeholder.svg"}
          alt={item.title || "Portfolio item"}
          className="w-full h-full object-cover"
          style={{
            filter: blurToFocus && !isHovered ? "blur(0px)" : "blur(0px)",
            transition: `filter ${duration}s ease-out`,
          }}
          onLoad={() => setIsLoaded(true)}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
          <h3 className="text-white font-bold text-xl mb-2">{item.title}</h3>
          {item.client && <p className="text-white/90 text-sm">{item.client}</p>}
          {item.category && (
            <span className="inline-block mt-2 px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full w-fit capitalize">
              {item.category.replace("-", " ")}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default Masonry
