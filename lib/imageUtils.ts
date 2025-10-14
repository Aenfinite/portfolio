/**
 * Image utility functions for robust image loading and error handling
 */

interface ImageLoadOptions {
  maxRetries?: number
  retryDelay?: number
  timeout?: number
}

/**
 * Preload a single image with retry logic
 */
export const preloadImage = (
  src: string,
  options: ImageLoadOptions = {}
): Promise<boolean> => {
  const { maxRetries = 3, retryDelay = 1000, timeout = 10000 } = options

  return new Promise((resolve) => {
    let attempts = 0

    const tryLoad = () => {
      attempts++
      const img = new Image()

      // Timeout handler
      const timeoutId = setTimeout(() => {
        img.src = '' // Cancel loading
        if (attempts < maxRetries) {
          setTimeout(tryLoad, retryDelay * attempts)
        } else {
          console.warn(`Image load timeout after ${maxRetries} attempts:`, src)
          resolve(false)
        }
      }, timeout)

      img.onload = () => {
        clearTimeout(timeoutId)
        resolve(true)
      }

      img.onerror = () => {
        clearTimeout(timeoutId)
        if (attempts < maxRetries) {
          setTimeout(tryLoad, retryDelay * attempts)
        } else {
          console.warn(`Failed to load image after ${maxRetries} attempts:`, src)
          resolve(false)
        }
      }

      // Add cache busting for retries
      img.src = attempts > 1 ? `${src}?retry=${attempts}` : src
    }

    tryLoad()
  })
}

/**
 * Preload multiple images in parallel
 */
export const preloadImages = async (
  sources: string[],
  options?: ImageLoadOptions
): Promise<boolean[]> => {
  return Promise.all(sources.map((src) => preloadImage(src, options)))
}

/**
 * Get image dimensions
 */
export const getImageDimensions = (
  src: string
): Promise<{ width: number; height: number } | null> => {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight })
    }
    img.onerror = () => {
      resolve(null)
    }
    img.src = src
  })
}

/**
 * Handle image error with fallback
 */
export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement>,
  fallbackSrc?: string
) => {
  const target = event.currentTarget
  
  if (fallbackSrc && target.src !== fallbackSrc) {
    // Try fallback image
    target.src = fallbackSrc
  } else {
    // Hide image and show gradient background
    target.style.display = 'none'
    const parent = target.parentElement
    if (parent) {
      parent.style.background =
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }
  }
}

/**
 * Create a placeholder data URL for instant display
 */
export const createPlaceholder = (
  width: number = 400,
  height: number = 300,
  color: string = '#f0f0f0'
): string => {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="${color}"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" 
            font-family="Arial, sans-serif" font-size="18" fill="#999">
        Loading...
      </text>
    </svg>
  `
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
}

/**
 * Check if an image exists
 */
export const imageExists = async (src: string): Promise<boolean> => {
  try {
    const response = await fetch(src, { method: 'HEAD' })
    return response.ok
  } catch {
    return false
  }
}

/**
 * Progressive image loading component helper
 */
export interface ProgressiveImageState {
  loaded: boolean
  error: boolean
  src: string
}

export const createProgressiveImageLoader = (src: string) => {
  let state: ProgressiveImageState = {
    loaded: false,
    error: false,
    src,
  }

  const load = (): Promise<ProgressiveImageState> => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        state = { loaded: true, error: false, src }
        resolve(state)
      }
      img.onerror = () => {
        state = { loaded: false, error: true, src }
        resolve(state)
      }
      img.src = src
    })
  }

  return { state, load }
}
