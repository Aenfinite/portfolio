// Shared types for the application
export interface Project {
  _id: string
  title: string
  subtitle: string
  imageSrc: string
  description: string
  challenge: string
  solution: string
  results: string[]
  images: string[]
  tags: string[]
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  gradientFrom: string
  gradientTo: string
  priority: boolean
  category: string
  published: boolean
  createdAt?: string
  updatedAt?: string
}

export interface Category {
  _id: string
  name: string
  slug: string
  description: string
  icon?: string
  projectCount?: number
  createdAt?: string
  updatedAt?: string
}
