"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { X, ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export type ProjectDetails = {
  title: string
  subtitle: string
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
}

type Props = {
  project: ProjectDetails | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Helper function to determine if a color is light or dark
function getTextColorForBackground(gradientFrom: string, gradientTo: string): string {
  // Convert hex to RGB and calculate luminance
  function hexToLuminance(hex: string): number {
    const rgb = hex.replace('#', '').match(/.{2}/g)?.map(x => parseInt(x, 16)) || [0, 0, 0]
    const [r, g, b] = rgb.map(c => {
      c = c / 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  }

  // Calculate average luminance of both gradient colors
  const fromLuminance = hexToLuminance(gradientFrom)
  const toLuminance = hexToLuminance(gradientTo)
  const avgLuminance = (fromLuminance + toLuminance) / 2
  
  // Return white text for dark backgrounds, dark text for light backgrounds
  return avgLuminance > 0.5 ? 'text-neutral-900' : 'text-white'
}

export default function ProjectModal({ project, open, onOpenChange }: Props) {
  if (!project) return null
  
  const textColorClass = getTextColorForBackground(project.gradientFrom, project.gradientTo)
  const subtitleColorClass = textColorClass === 'text-white' ? 'text-white/90' : 'text-neutral-700'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] w-[95vw] max-h-[95vh] overflow-y-auto p-0 gap-0 bg-white/80 backdrop-blur-2xl border-white/20 shadow-2xl">
        <DialogTitle className="sr-only">{project.title}</DialogTitle>

        <div
          className="relative p-12 pb-16"
          style={{
            backgroundImage: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})`,
          }}
        >
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />

          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-6 top-6 rounded-full bg-white/90 p-2.5 backdrop-blur-xl transition-all hover:bg-white hover:scale-110 z-10"
            aria-label="Close modal"
          >
            <X className="h-5 w-5 text-neutral-900" />
          </button>

          <div className="space-y-5 relative z-10">
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
            <h2 className={`text-5xl md:text-6xl font-black tracking-tight ${textColorClass}`}>{project.title}</h2>
            <p className={`text-2xl ${subtitleColorClass} max-w-3xl`}>{project.subtitle}</p>
          </div>
        </div>

        <div className="space-y-10 p-12">
          {/* Overview */}
          <section className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/40 shadow-xl">
            <h3 className="text-3xl font-bold mb-4 text-neutral-900">Overview</h3>
            <p className="text-xl leading-relaxed text-neutral-600">{project.description}</p>
          </section>

          {/* Main Image */}
          {project.images[0] && (
            <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-white/40 shadow-2xl backdrop-blur-xl">
              <Image
                src={project.images[0] || "/placeholder.svg"}
                alt={`${project.title} main image`}
                fill
                className="object-cover"
              />
            </div>
          )}

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

          {/* Links */}
          {(project.liveUrl || (project.githubUrl && project.githubUrl.trim() !== "")) && (
            <div className="flex flex-wrap gap-4 pt-6">
              {project.liveUrl && project.liveUrl.trim() !== "" && (
                <Button asChild size="lg" className="rounded-full text-lg px-8 py-6 shadow-xl">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    View Live Site
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              )}
              {project.githubUrl && project.githubUrl.trim() !== "" && (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full bg-white/60 backdrop-blur-xl text-lg px-8 py-6 shadow-xl border-white/40"
                >
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-5 w-5" />
                    View Code
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
