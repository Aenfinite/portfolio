"use client"

import { useEffect, useRef } from "react"

interface GradientTextProps {
  children: string
  colors: string[]
  animationSpeed?: number
  showBorder?: boolean
  className?: string
}

export default function GradientText({
  children,
  colors,
  animationSpeed = 3,
  showBorder = false,
  className = "",
}: GradientTextProps) {
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    const gradientStops = colors
      .map((color, index) => {
        const position = (index / (colors.length - 1)) * 100
        return `${color} ${position}%`
      })
      .join(", ")

    const gradient = `linear-gradient(90deg, ${gradientStops})`

    textRef.current.style.backgroundImage = gradient
    textRef.current.style.backgroundSize = "200% auto"
    textRef.current.style.backgroundClip = "text"
    textRef.current.style.webkitBackgroundClip = "text"
    textRef.current.style.webkitTextFillColor = "transparent"
    textRef.current.style.animation = `gradient-shift ${animationSpeed}s ease infinite`

    // Add keyframes if not already present
    if (!document.getElementById("gradient-shift-keyframes")) {
      const style = document.createElement("style")
      style.id = "gradient-shift-keyframes"
      style.textContent = `
        @keyframes gradient-shift {
          0% { background-position: 0% center; }
          50% { background-position: 100% center; }
          100% { background-position: 0% center; }
        }
      `
      document.head.appendChild(style)
    }
  }, [colors, animationSpeed])

  return (
    <span
      ref={textRef}
      className={`inline-block font-bold ${showBorder ? "border-b-4 border-current" : ""} ${className}`}
      style={{
        display: "inline-block",
      }}
    >
      {children}
    </span>
  )
}
