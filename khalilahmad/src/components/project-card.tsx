"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Github, Globe, Calendar, Folder } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Project } from "@/types/project"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-gradient-to-br p-[1px]",
        "hover:scale-[1.01] transition-all duration-500 ease-out",
        "hover:shadow-2xl",
        "h-full flex flex-col",
        "border-zinc-800 bg-zinc-900/60 transition-colors",
        "hover:bg-zinc-900 focus-within:bg-zinc-900",
        "focus-within:ring-2 focus-within:ring-yellow-600/40",
        "duration-200", // Ensure equal height
      )}
      // style={{
      //   background: `linear-gradient(135deg, transparent, #f59e0b15, transparent)`,
      // }}
    >
      <div className="relative h-full overflow-hidden rounded-2xl bg-zinc-950/80 backdrop-blur-xl flex flex-col">
        {/* Status Badge */}
        <div className="absolute top-4 right-4 z-10">
          <Badge
            variant={project.status === "completed" ? "default" : "secondary"}
            className={cn(
              "backdrop-blur-sm bg-black/80 border-0",
              project.status === "completed" && "bg-amber-500/20 text-amber-700 dark:text-amber-300",
            )}
          >
            {project.status.replace("-", " ")}
          </Badge>
        </div>

        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-black" />
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* Floating Icons */}
          <div className="absolute top-4 left-4 flex gap-2">
            <div className="rounded-full p-2 backdrop-blur-sm bg-gradient-to-r from-amber-400 to-amber-500">
              <Folder className="h-4 w-4 text-black" />
            </div>
          </div>
        </div>

        {/* Content - Flex grow to fill remaining space */}
        <div className="p-6 space-y-4 flex-1 flex flex-col">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {project.year}
              </div>
              <Badge variant="outline" className="text-xs border-amber-300 text-amber-600 dark:text-amber-300">
                {project.category}
              </Badge>
            </div>
            <h3 className="text-xl font-bold tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-amber-500 group-hover:to-amber-600 transition-all duration-300">
              {project.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">{project.description}</p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1">
            {project.technologies.slice(0, 4).map((tech, i) => (
              <Badge
                key={tech}
                variant="secondary"
                className="text-xs bg-amber-950/40 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors"
                style={{
                  animationDelay: `${i * 100}ms`,
                }}
              >
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 4 && (
              <Badge variant="secondary" className="text-xs bg-amber-950/40 border-2 border-amber-800 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
                +{project.technologies.length - 4}
              </Badge>
            )}
          </div>

          {/* Actions - Always at bottom */}
          <div className="flex items-center justify-between pt-4 mt-auto">
            <div className="flex gap-2">
              {project.links.github && (
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-amber-100 dark:hover:bg-amber-900/30" asChild>
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {project.links.live && (
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-amber-100 dark:hover:bg-amber-900/30" asChild>
                  <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>

            <Button
              asChild
              className="cursor-pointer group/btn bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 border-0 text-black font-medium"
            >
              <Link href={`/projects/${project.id}`}>
                View
                <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -bottom-2 -right-2 h-24 w-24 rounded-full bg-gradient-to-br from-amber-500/10 to-amber-600/5 blur-2xl transition-opacity group-hover:opacity-75" />
        <div className="absolute -top-2 -left-2 h-16 w-16 rounded-full bg-gradient-to-br from-amber-400/10 to-amber-500/5 blur-xl transition-opacity group-hover:opacity-75" />
      </div>
    </div>
  )
}
