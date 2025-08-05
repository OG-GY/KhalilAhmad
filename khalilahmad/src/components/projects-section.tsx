"use client"

import { useState } from "react"
import { projects } from "@/data/projects"
import { ProjectCard } from "./project-card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

export function ProjectsSection() {
  const [visibleProjects, setVisibleProjects] = useState(3)
  const [isExpanded, setIsExpanded] = useState(false)

  const handleLoadMore = () => {
    if (isExpanded) {
      // If expanded, collapse back to 3 projects
      setVisibleProjects(3)
      setIsExpanded(false)
      // Scroll back to the projects section
      document.getElementById('projects-section')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    } else {
      // If collapsed, show all projects
      setVisibleProjects(projects.length)
      setIsExpanded(true)
    }
  }

  const displayedProjects = projects.slice(0, visibleProjects)
  const hasMoreProjects = projects.length > visibleProjects

  return (
    <section id="projects" className="bg-black text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 sm:mb-12 lg:mb-16 text-center">
          <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
            <span className="text-white">Featured </span>
            <span className="text-amber-400">Projects</span>
          </h2>
          <p className="mx-auto max-w-3xl text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed">
            Here are some of the projects I&apos;ve worked on. Each project represents a unique challenge and learning
            experience in my development journey.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 auto-rows-fr">
          {displayedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Load More / Show Less Button */}
        {(hasMoreProjects || isExpanded) && (
          <div className="mt-8 sm:mt-12 text-center">
            <Button
              onClick={handleLoadMore}
              variant="outline"
              size="lg"
              className="group cursor-pointer border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black transition-all duration-300 px-6 py-3 text-base font-medium"
            >
              {isExpanded ? (
                <>
                  Show Less Projects
                  <ChevronUp className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                </>
              ) : (
                <>
                  View More Projects ({projects.length - visibleProjects} more)
                  <ChevronDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                </>
              )}
            </Button>
          </div>
        )}

        {/* Projects Counter */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Showing {displayedProjects.length} of {projects.length} projects
          </p>
        </div>
      </div>
    </section>
  )
}
