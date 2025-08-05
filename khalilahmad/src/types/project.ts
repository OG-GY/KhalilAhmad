export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  technologies: string[]
  techStack: {
    frontend?: string[]
    backend?: string[]
    database?: string[]
    tools?: string[]
  }
  links: {
    github?: string
    live?: string
    demo?: string
  }
  features: string[]
  status: "completed" | "in-progress" | "planned" | "prototype"
  year: number
  category: string
  color: string
}
