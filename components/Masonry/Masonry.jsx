"use client"

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { gsap } from "gsap"

import "./Masonry.css"

const useMedia = (queries, values, defaultValue) => {
  const get = () => values[queries.findIndex((q) => matchMedia(q).matches)] ?? defaultValue

  const [value, setValue] = useState(get)

  useEffect(() => {
    const handler = () => setValue(get)
    queries.forEach((q) => matchMedia(q).addEventListener("change", handler))
    return () => queries.forEach((q) => matchMedia(q).removeEventListener("change", handler))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queries])

  return value
}

const useMeasure = () => {
  const ref = useRef(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    if (!ref.current) return
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ width, height })
    })
    ro.observe(ref.current)
    return () => ro.disconnect()
  }, [])

  return [ref, size]
}

const preloadImages = async (items) => {
  const imagePromises = items.map(
    (item) =>
      new Promise((resolve) => {
        const img = new Image()
        img.src = item.img
        
        let attempts = 0
        const maxAttempts = 3
        
        const tryLoad = () => {
          attempts++
          
          img.onload = () => {
            // Calculate height based on aspect ratio for consistent width
            const aspectRatio = img.naturalHeight / img.naturalWidth
            const standardWidth = 400 // Base width for calculations
            const calculatedHeight = Math.round(standardWidth * aspectRatio)

            // Update item with calculated height and mark as loaded
            item.calculatedHeight = calculatedHeight
            item.imageLoaded = true
            resolve(item)
          }
          
          img.onerror = () => {
            if (attempts < maxAttempts) {
              // Retry loading after delay
              setTimeout(() => {
                img.src = item.img + '?retry=' + attempts
                tryLoad()
              }, 1000 * attempts)
            } else {
              // Fallback height if image fails to load after retries
              console.warn(`Failed to load image after ${maxAttempts} attempts:`, item.img)
              item.calculatedHeight = item.height || 300
              item.imageLoaded = false
              resolve(item)
            }
          }
        }
        
        tryLoad()
      }),
  )

  return await Promise.all(imagePromises)
}

const Masonry = ({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
  onItemClick,
}) => {
  // Responsive columns based on screen width
  const getColumns = (width) => {
    if (width < 640) return 1 // Mobile: 1 column
    if (width < 1024) return 2 // Tablet: 2 columns
    return 3 // Desktop: 3 columns
  }

  const [containerRef, { width }] = useMeasure()
  const [imagesReady, setImagesReady] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null)
  const [itemsWithHeights, setItemsWithHeights] = useState([])

  const getInitialPosition = (item) => {
    const containerRect = containerRef.current?.getBoundingClientRect()
    if (!containerRect) return { x: item.x, y: item.y }

    let direction = animateFrom

    if (animateFrom === "random") {
      const directions = ["top", "bottom", "left", "right"]
      direction = directions[Math.floor(Math.random() * directions.length)]
    }

    switch (direction) {
      case "top":
        return { x: item.x, y: -200 }
      case "bottom":
        return { x: item.x, y: window.innerHeight + 200 }
      case "left":
        return { x: -200, y: item.y }
      case "right":
        return { x: window.innerWidth + 200, y: item.y }
      case "center":
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2,
        }
      default:
        return { x: item.x, y: item.y + 100 }
    }
  }

  useEffect(() => {
    preloadImages(items).then((itemsWithCalculatedHeights) => {
      setItemsWithHeights(itemsWithCalculatedHeights)
      setImagesReady(true)
    })
  }, [items])

  const grid = useMemo(() => {
    if (!width || !imagesReady || itemsWithHeights.length === 0) return { items: [], height: 0 }

    const columns = getColumns(width)
    const colHeights = new Array(columns).fill(0)

    // Responsive gap and padding
    const gap = width < 640 ? 16 : width < 1024 ? 20 : 24
    const containerPadding = width < 640 ? 16 : width < 1024 ? 24 : 32

    const availableWidth = width - containerPadding * 2
    const totalGaps = gap * (columns - 1)
    const columnWidth = (availableWidth - totalGaps) / columns

    // Start from padding edge
    const startX = containerPadding

    const gridItems = itemsWithHeights.map((child) => {
      const col = colHeights.indexOf(Math.min(...colHeights))
      const x = startX + col * (columnWidth + gap)

      // Use automatically calculated height based on image aspect ratio
      const aspectRatio = child.calculatedHeight / 400
      const scaledHeight = columnWidth * aspectRatio * 0.85

      const y = colHeights[col]

      colHeights[col] += scaledHeight + (width < 640 ? 12 : 16)

      return { ...child, x, y, w: columnWidth, h: scaledHeight }
    })

    // Calculate total height needed (tallest column + padding)
    const totalHeight = Math.max(...colHeights) + 40

    return { items: gridItems, height: totalHeight }
  }, [itemsWithHeights, width, imagesReady])

  const hasMounted = useRef(false)

  useLayoutEffect(() => {
    if (!imagesReady) return

    grid.items.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`
      const animationProps = {
        x: item.x,
        y: item.y,
        width: item.w,
        height: item.h,
      }

      if (!hasMounted.current) {
        const initialPos = getInitialPosition(item, index)
        const initialState = {
          opacity: 0,
          x: initialPos.x,
          y: initialPos.y,
          width: item.w,
          height: item.h,
          ...(blurToFocus && { filter: "blur(10px)" }),
        }

        gsap.fromTo(selector, initialState, {
          opacity: 1,
          ...animationProps,
          ...(blurToFocus && { filter: "blur(0px)" }),
          duration: 0.8,
          ease: "power3.out",
          delay: index * stagger,
        })
      } else {
        gsap.to(selector, {
          ...animationProps,
          duration: duration,
          ease: ease,
          overwrite: "auto",
        })
      }
    })

    hasMounted.current = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease])

  const clearAllHovers = () => {
    // Clear all blue overlays from all items
    const allOverlays = document.querySelectorAll(".blue-overlay")
    allOverlays.forEach((overlay) => {
      gsap.set(overlay, { opacity: 0, scale: 0.8, y: 20 })
    })

    // Reset all item scales
    const allItems = document.querySelectorAll(".item-wrapper")
    allItems.forEach((item) => {
      gsap.set(item, { scale: 1 })
    })

    // Clear color overlays if enabled
    if (colorShiftOnHover) {
      const allColorOverlays = document.querySelectorAll(".color-overlay")
      allColorOverlays.forEach((overlay) => {
        gsap.set(overlay, { opacity: 0, scale: 1.1 })
      })
    }
  }

  const handleMouseEnter = (e, item) => {
    // Prevent multiple hovers - if this item is already hovered, do nothing
    if (hoveredItem === item.id) return

    // Always clear ALL hover effects first to ensure single hover
    clearAllHovers()

    // Set the new hovered item immediately
    setHoveredItem(item.id)

    const element = e.currentTarget
    const selector = `[data-key="${item.id}"]`

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: hoverScale,
        duration: 0.15,
        ease: "back.out(1.2)",
      })
    }

    // Show blue overlay with Portfolio text
    const blueOverlay = element.querySelector(".blue-overlay")
    if (blueOverlay) {
      gsap.fromTo(
        blueOverlay,
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.25, ease: "back.out(1.4)" },
      )

      // Animate icon and text separately
      const icon = blueOverlay.querySelector(".portfolio-icon")
      const text = blueOverlay.querySelector("span")

      if (icon) {
        gsap.fromTo(
          icon,
          { scale: 0, rotation: -360, y: -30 },
          { scale: 1.2, rotation: 0, y: 0, duration: 0.2, ease: "elastic.out(1, 0.5)", delay: 0.05 },
        )
        gsap.to(icon, { scale: 1, duration: 0.1, delay: 0.25, ease: "power2.out" })
      }

      if (text) {
        gsap.fromTo(
          text,
          { y: 30, opacity: 0, scale: 0.8, rotationX: 90 },
          { y: 0, opacity: 1, scale: 1, rotationX: 0, duration: 0.2, ease: "back.out(1.4)", delay: 0.1 },
        )
      }
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector(".color-overlay")
      if (overlay) {
        gsap.fromTo(overlay, { opacity: 0, scale: 1.1 }, { opacity: 0.4, scale: 1, duration: 0.25, ease: "power3.out" })
      }
    }
  }

  const clearHoverEffects = (element, itemId) => {
    const selector = `[data-key="${itemId}"]`

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: 1,
        duration: 0.2,
        ease: "elastic.out(1, 0.4)",
      })
    }

    // Hide blue overlay with Portfolio text
    const blueOverlay = element.querySelector(".blue-overlay")
    if (blueOverlay) {
      gsap.to(blueOverlay, {
        opacity: 0,
        scale: 0.9,
        y: -15,
        duration: 0.2,
        ease: "power3.in",
      })
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector(".color-overlay")
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0,
          scale: 1.05,
          duration: 0.2,
          ease: "power2.in",
        })
      }
    }
  }

  const handleMouseLeave = (e, item) => {
    // Only clear if this item is currently hovered
    if (hoveredItem === item.id) {
      setHoveredItem(null)
      clearAllHovers()
    }
  }

  // Global mouse leave handler to ensure hover state is cleared when leaving the entire container
  const handleContainerMouseLeave = () => {
    clearAllHovers()
    setHoveredItem(null)
  }

  return (
    <div ref={containerRef} className="list" style={{ height: grid.height }} onMouseLeave={handleContainerMouseLeave}>
      {grid.items.map((item) => {
        return (
          <div
            key={item.id}
            data-key={item.id}
            className="item-wrapper"
            onClick={() => (onItemClick ? onItemClick(item) : window.open(item.url, "_blank", "noopener"))}
            onMouseEnter={(e) => handleMouseEnter(e, item)}
            onMouseLeave={(e) => handleMouseLeave(e, item)}
          >
            <div className="item-img" style={{ position: 'relative', overflow: 'hidden' }}>
              {/* Actual Image with error handling */}
              <img
                src={item.img}
                alt={item.title || 'Portfolio item'}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
                onError={(e) => {
                  // Fallback to background color if image fails
                  e.target.style.display = 'none'
                  e.target.parentElement.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}
                loading="eager"
              />
              {/* Blue Overlay - Only on Hover */}
              <div
                className="blue-overlay"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(59, 130, 246, 0.9)",
                  opacity: 0,
                  pointerEvents: "none",
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "opacity 0.3s ease",
                }}
              >
                <div
                  className="portfolio-icon"
                  style={{
                    fontSize: "3rem",
                    marginBottom: "0.5rem",
                    animation: "bounce 2s infinite",
                  }}
                >
                  📁
                </div>
                <span
                  style={{
                    color: "white",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    fontFamily: "inherit",
                    textAlign: "center",
                    textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                    animation: "fadeInUp 0.5s ease",
                  }}
                >
                  Portfolio
                </span>
              </div>
              {colorShiftOnHover && (
                <div
                  className="color-overlay"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(45deg, rgba(255,0,150,0.5), rgba(0,150,255,0.5))",
                    opacity: 0,
                    pointerEvents: "none",
                    borderRadius: "8px",
                  }}
                />
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Masonry
