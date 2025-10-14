"use client"

import { useState, useEffect } from 'react'
import { handleImageError } from '@/lib/imageUtils'

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  fallbackSrc?: string
  showLoader?: boolean
  retryAttempts?: number
  className?: string
}

/**
 * Optimized Image component with automatic retry, loading states, and error handling
 */
export default function OptimizedImage({
  src,
  alt,
  fallbackSrc,
  showLoader = true,
  retryAttempts = 3,
  className = '',
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(src)
  const [attempts, setAttempts] = useState(0)

  useEffect(() => {
    setCurrentSrc(src)
    setIsLoading(true)
    setHasError(false)
    setAttempts(0)
  }, [src])

  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
  }

  const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const newAttempts = attempts + 1

    if (newAttempts < retryAttempts) {
      // Retry with cache busting
      setAttempts(newAttempts)
      setCurrentSrc(`${src}?retry=${newAttempts}&t=${Date.now()}`)
      console.log(`Retrying image load (attempt ${newAttempts + 1}/${retryAttempts}): ${src}`)
    } else if (fallbackSrc && currentSrc !== fallbackSrc) {
      // Try fallback image
      setCurrentSrc(fallbackSrc)
      setAttempts(0)
      console.log(`Using fallback image for: ${src}`)
    } else {
      // Final failure
      setIsLoading(false)
      setHasError(true)
      handleImageError(event, fallbackSrc)
      console.warn(`Failed to load image after ${retryAttempts} attempts: ${src}`)
    }
  }

  if (hasError && !showLoader) {
    return null
  }

  return (
    <div className="relative" style={{ width: '100%', height: '100%' }}>
      {isLoading && showLoader && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse"
          style={{ borderRadius: 'inherit' }}
        >
          <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      <img
        {...props}
        src={currentSrc}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={handleLoad}
        onError={handleError}
        loading="eager"
        style={{
          ...props.style,
          display: hasError ? 'none' : 'block',
        }}
      />

      {hasError && (
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white"
          style={{ borderRadius: 'inherit' }}
        >
          <svg 
            className="w-12 h-12 mb-2 opacity-80" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
          <span className="text-sm opacity-80">{alt}</span>
        </div>
      )}
    </div>
  )
}
