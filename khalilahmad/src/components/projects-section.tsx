"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import { ProjectCard } from "./project-card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

export function ProjectsSection() {
  const [visibleProjects, setVisibleProjects] = useState(3);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLoadMore = () => {
    if (isExpanded) {
      // If expanded, collapse back to 3 projects
      setVisibleProjects(3);
      setIsExpanded(false);
      // Scroll back to the projects section
      document.getElementById("projects-section")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      // If collapsed, show all projects
      setVisibleProjects(projects.length);
      setIsExpanded(true);
    }
  };

  const displayedProjects = projects.slice(0, visibleProjects);
  const hasMoreProjects = projects.length > visibleProjects;

  return (
    <section
      id="projects"
      className="bg-zinc-950 text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-6xl font-bold tracking-tight">Projects</h1>
          <p className="mt-2 text-sm text-zinc-400">
            What I have build so far, with my fascinating skills.
          </p>
        </header>

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
              className="group cursor-pointer bg-zinc-900 border-2 border-black hover:border-amber-400 text-amber-500 hover:bg-amber-400 hover:text-black transition-all duration-300 px-6 py-5 text-base font-medium"
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
  );
}
