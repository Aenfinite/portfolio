"use client"

import Link from "next/link"
import { ArrowRight, Github, Linkedin, Twitter, Mail, ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import DotGridShader from "@/components/DotGridShader"

import ProjectCard from "@/components/project-card"
import ProjectModal, { type ProjectDetails } from "@/components/project-modal"
import AnimatedHeading from "@/components/animated-heading"
import RevealOnView from "@/components/reveal-on-view"
import Image from "next/image"
import { projectsAPI } from "@/lib/api"

type ProjectWithId = ProjectDetails & {
  _id: string
  imageSrc: string
  priority: boolean
}

export default function BrandingPage() {
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [projects, setProjects] = useState<ProjectWithId[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await projectsAPI.getAll("branding")
        setProjects(data)
      } catch (error) {
        console.error("[v0] Failed to load projects:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  const handleProjectClick = (project: ProjectDetails) => {
    setSelectedProject(project)
    setModalOpen(true)
  }

  return (
    <main className="bg-white text-neutral-900">
      <section className="px-4 pt-4 pb-16 lg:pb-4">
        <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-[420px_1fr]">
          <aside className="lg:sticky lg:top-4 lg:h-[calc(100svh-2rem)]">
            <RevealOnView
              as="div"
              intensity="hero"
              className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8"
              staggerChildren
            >
              <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-multiply">
                <DotGridShader />
              </div>
              <div>
                <div className="mb-8 flex items-center gap-2">
                  <Image src="/images/aenfinite-logo.svg" alt="Aenfinite" width={150} height={40} />
                </div>

                <AnimatedHeading
                  className="text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl"
                  lines={["Brand", "Identity"]}
                />

                <p className="mt-4 max-w-[42ch] text-lg text-neutral-600">
                  Complete brand identities that tell your story and connect with your audience. We build brands that
                  resonate and endure.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button asChild size="lg" className="rounded-full">
                    <Link href="/home">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Home
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-full bg-transparent">
                    <Link href="https://aenfinite.com/contact">
                      Contact Us
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                <div className="mt-10">
                  <p className="mb-4 text-xs font-semibold tracking-widest text-neutral-500">CONNECT WITH US</p>
                  <div className="flex items-center gap-4">
                    <Link
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition-colors hover:bg-neutral-900 hover:text-white hover:border-neutral-900"
                      aria-label="GitHub"
                    >
                      <Github className="h-5 w-5" />
                    </Link>
                    <Link
                      href="https://linkedin.com/aenfinite"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition-colors hover:bg-neutral-900 hover:text-white hover:border-neutral-900"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </Link>
                    <Link
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition-colors hover:bg-neutral-900 hover:text-white hover:border-neutral-900"
                      aria-label="Twitter"
                    >
                      <Twitter className="h-5 w-5" />
                    </Link>
                    <Link
                      href="mailto:hello@aenfinite.com"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition-colors hover:bg-neutral-900 hover:text-white hover:border-neutral-900"
                      aria-label="Email"
                    >
                      <Mail className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </RevealOnView>
          </aside>

          <div className="space-y-4">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <p className="text-neutral-600">Loading projects...</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="flex items-center justify-center py-20">
                <p className="text-neutral-600">No branding projects available yet.</p>
              </div>
            ) : (
              projects.map((p, idx) => (
                <ProjectCard
                  key={p._id}
                  title={p.title}
                  subtitle={p.subtitle}
                  imageSrc={p.imageSrc}
                  images={p.images}
                  tags={p.tags}
                  imageContainerClassName="lg:h-full"
                  containerClassName="lg:h-[calc(100svh-2rem)]"
                  revealDelay={idx * 0.06}
                  onClick={() => handleProjectClick(p)}
                />
              ))
            )}
          </div>
        </div>
      </section>

      <ProjectModal project={selectedProject} open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  )
}
