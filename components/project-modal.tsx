"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { X, ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export type ProjectDetails = {
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
}

type Props = {
  project: ProjectDetails | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Helper function to determine if a color is light or dark
export default function ProjectModal({ project, open, onOpenChange }: Props) {
  if (!project) return null
  
  const textColorClass = 'text-neutral-900'
  const subtitleColorClass = 'text-neutral-700'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] w-[95vw] max-h-[95vh] overflow-y-auto p-0 gap-0 bg-white/80 backdrop-blur-2xl border-white/20 shadow-2xl">
        <DialogTitle className="sr-only">{project.title}</DialogTitle>

        {/* Hero Section with Image Background */}
        <div className="relative h-[60vh] w-full">
          {/* Main Image as Background */}
          <div className="absolute inset-0">
            <Image
              src={project.imageSrc || "/placeholder.svg"}
              alt={`${project.title} main image`}
              fill
              className="object-cover"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
          </div>

          {/* Close Button */}
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-6 top-6 rounded-full bg-white/90 p-2.5 backdrop-blur-xl transition-all hover:bg-white hover:scale-110 z-10"
            aria-label="Close modal"
          >
            <X className="h-5 w-5 text-neutral-900" />
          </button>

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-12">
            <div className="space-y-5">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-white/90 text-neutral-900 border-white/40 backdrop-blur-xl shadow-lg"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <h2 className="text-5xl md:text-6xl font-black tracking-tight text-white">{project.title}</h2>
              <p className="text-2xl text-white/90 max-w-3xl">{project.subtitle}</p>
            </div>
          </div>
        </div>

        <div className="space-y-10 p-12">
          {/* Overview */}
          <section className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/40 shadow-xl">
            <h3 className="text-3xl font-bold mb-4 text-neutral-900">Overview</h3>
            <p className="text-xl leading-relaxed text-neutral-600">{project.description}</p>
          </section>

          {/* Challenge */}
          <section className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/40 shadow-xl">
            <h3 className="text-3xl font-bold mb-4 text-neutral-900">The Challenge</h3>
            <p className="text-xl leading-relaxed text-neutral-600">{project.challenge}</p>
          </section>

          {/* Solution */}
          <section className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/40 shadow-xl">
            <h3 className="text-3xl font-bold mb-4 text-neutral-900">Our Solution</h3>
            <p className="text-xl leading-relaxed text-neutral-600">{project.solution}</p>
          </section>

          {/* Additional Images Grid */}
          {project.images.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.images.slice(1).map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-video overflow-hidden rounded-2xl border border-white/40 shadow-xl backdrop-blur-xl"
                >
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`${project.title} image ${idx + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Results */}
          <section className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/40 shadow-xl">
            <h3 className="text-3xl font-bold mb-5 text-neutral-900">Results & Impact</h3>
            <ul className="space-y-4">
              {project.results.map((result, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="mt-2 h-2.5 w-2.5 rounded-full bg-neutral-900 flex-shrink-0" />
                  <span className="text-xl text-neutral-600">{result}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Technologies */}
          <section className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/40 shadow-xl">
            <h3 className="text-3xl font-bold mb-5 text-neutral-900">Technologies Used</h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="text-base px-4 py-2 border-neutral-300 text-neutral-700 bg-white/50 backdrop-blur-sm"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </section>


        </div>
      </DialogContent>
    </Dialog>
  )
}
