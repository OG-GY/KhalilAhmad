import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink, Github, Globe } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { projects } from "@/data/projects"

interface ProjectPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }))
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params
  const project = projects.find((p) => p.id === id)

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen py-8 bg-zinc-950">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-8 hover:bg-zinc-900/70 hover:text-white">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </Button>

        {/* Project Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-4">
            <h1 className="text-3xl font-bold sm:text-4xl bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
              {project.title}
            </h1>
            <Badge
              variant={
                project.status === "completed" ? "default" : project.status === "prototype" ? "secondary" : "outline"
              }
              className={
                project.status === "completed" 
                  ? "bg-amber-500/20 text-white dark:text-white border-amber-500" 
                  : project.status === "prototype"
                  ? "bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-300"
                  : ""
              }
            >
              {project.status.replace("-", " ")}
            </Badge>
          </div>

          {/* Project Links */}
          <div className="flex flex-wrap gap-3">
            {project.links.github && (
              <Button variant="outline" asChild className="border-amber-300 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/30">
                <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </a>
              </Button>
            )}
            {project.links.live && (
              <Button asChild className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-black font-medium">
                <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                  <Globe className="mr-2 h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            )}
            {project.links.demo && (
              <Button variant="secondary" asChild className="bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-200">
                <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Demo
                </a>
              </Button>
            )}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Project Image */}
            <div className="mb-8 overflow-hidden rounded-lg">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                width={800}
                height={500}
                className="h-64 w-full object-cover sm:h-80"
              />
            </div>

            {/* Description */}
            <Card className="mb-8 bg-black border-2 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-amber-600 dark:text-amber-300">About This Project</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">{project.longDescription}</p>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="bg-black border-2 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-amber-600 dark:text-amber-300">Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Technologies */}
            <Card className="bg-black border-2 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-amber-600 dark:text-amber-300">Technologies Used</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-amber-500/20 border-amber-500 text-white dark:bg-amber-900/30 dark:text-amber-200">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tech Stack */}
            {/* <Card className="border-amber-200 dark:border-yellow-400">
              <CardHeader>
                <CardTitle className="text-amber-600 dark:text-amber-300">Tech Stack</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {project.techStack.frontend && (
                  <div>
                    <h4 className="mb-2 text-sm font-semibold text-amber-700 dark:text-amber-300">Frontend</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.frontend.map((tech: string) => (
                        <Badge key={tech} variant="outline" className="text-xs border-amber-300 text-amber-600 dark:text-amber-300">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {project.techStack.backend && (
                  <>
                    <Separator className="bg-amber-200 dark:bg-yellow-400" />
                    <div>
                      <h4 className="mb-2 text-sm font-semibold text-amber-700 dark:text-amber-300">Backend</h4>
                      <div className="flex flex-wrap gap-1">
                        {project.techStack.backend.map((tech: string) => (
                          <Badge key={tech} variant="outline" className="text-xs border-amber-300 text-amber-600 dark:text-amber-300">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {project.techStack.database && (
                  <>
                    <Separator className="bg-amber-200 dark:bg-yellow-400" />
                    <div>
                      <h4 className="mb-2 text-sm font-semibold text-amber-700 dark:text-amber-300">Database</h4>
                      <div className="flex flex-wrap gap-1">
                        {project.techStack.database.map((tech: string) => (
                          <Badge key={tech} variant="outline" className="text-xs border-amber-300 text-amber-600 dark:text-amber-300">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {project.techStack.tools && (
                  <>
                    <Separator className="bg-amber-200 dark:bg-yellow-400" />
                    <div>
                      <h4 className="mb-2 text-sm font-semibold text-amber-700 dark:text-amber-300">Tools & Services</h4>
                      <div className="flex flex-wrap gap-1">
                        {project.techStack.tools.map((tech: string) => (
                          <Badge key={tech} variant="outline" className="text-xs border-amber-300 text-amber-600 dark:text-amber-300">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card> */}

            {/* Project Info */}
            <Card className="bg-black border-2 border-zinc-800">
              <CardHeader>
                <CardTitle className=" text-amber-500">Project Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="text-sm font-semibold text-amber-500">Status</h4>
                  <p className="text-sm capitalize text-gray-300">{project.status.replace("-", " ")}</p>
                </div>
                <Separator />
                <div>
                  <h4 className="text-sm font-semibold text-amber-500">Type</h4>
                  <p className="text-sm text-gray-300">Full Stack Web Application</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
