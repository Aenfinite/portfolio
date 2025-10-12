"use client"

import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
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
  additionalImages?: string[]
  tags: string[]
  technologies: string[]
  exportDetails?: {
    fileFormat: string
    resolution: string
    colorSpace: string
    fileSize: string
    exportedFor: string[]
  }
}

type Props = {
  project: ProjectDetails | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ProjectModal({ project, open, onOpenChange }: Props) {
  if (!project) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] w-[95vw] md:max-w-6xl lg:max-w-7xl xl:max-w-[90vw] 2xl:max-w-[1400px] max-h-[95vh] overflow-y-auto bg-white/80 backdrop-blur-2xl border-white/20 shadow-2xl rounded-lg p-0" showCloseButton={false}>
        <div className="relative h-[60vh] w-full">
          {/* Main Image */}
          <div className="absolute inset-0">
            <Image
              src={project.imageSrc || "/placeholder.svg"}
              alt={`${project.title} main image`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
          </div>

          {/* Close Button */}
          <DialogClose className="absolute right-6 top-6 rounded-full bg-white/90 p-2.5 backdrop-blur-xl transition-all hover:bg-white hover:scale-110 z-50">
            <X className="h-5 w-5 text-neutral-900" />
          </DialogClose>

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

          {/* Image Showcase */}
          {(project.imageSrc || (project.images && project.images.length > 0)) && (
            <section className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/40 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold text-neutral-900">Project Showcase</h3>
                {project.exportDetails && (
                  <div className="bg-white/70 rounded-xl p-4 backdrop-blur-sm">
                    <h4 className="font-semibold text-lg mb-2 text-neutral-900">Export Details</h4>
                    <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <dt className="text-neutral-600">Format:</dt>
                      <dd className="text-neutral-900">{project.exportDetails.fileFormat}</dd>
                      <dt className="text-neutral-600">Resolution:</dt>
                      <dd className="text-neutral-900">{project.exportDetails.resolution}</dd>
                      <dt className="text-neutral-600">Color Space:</dt>
                      <dd className="text-neutral-900">{project.exportDetails.colorSpace}</dd>
                      <dt className="text-neutral-600">File Size:</dt>
                      <dd className="text-neutral-900">{project.exportDetails.fileSize}</dd>
                    </dl>
                    {project.exportDetails.exportedFor.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-neutral-200">
                        <p className="text-neutral-600 text-sm mb-1">Exported for:</p>
                        <div className="flex flex-wrap gap-1">
                          {project.exportDetails.exportedFor.map((platform) => (
                            <Badge
                              key={platform}
                              variant="outline"
                              className="text-xs border-neutral-300 text-neutral-700"
                            >
                              {platform}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Main Image */}
                <div className="relative w-full rounded-2xl border border-white/40 shadow-xl backdrop-blur-xl lg:col-span-2">
                  <Image
                    src={project.imageSrc || "/placeholder.svg"}
                    alt={`${project.title} main image`}
                    width={1920}
                    height={1080}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
                
                {/* Other Project Images */}
                {project.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative w-full rounded-2xl border border-white/40 shadow-xl backdrop-blur-xl"
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`${project.title} image ${idx + 1}`}
                      width={1200}
                      height={800}
                      className="w-full h-auto rounded-xl"
                    />
                  </div>
                ))}
              </div>
            </section>
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