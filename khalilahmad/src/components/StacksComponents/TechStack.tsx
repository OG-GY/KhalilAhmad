"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Link from "next/link"
import {
  type LucideIcon,
  Atom,
  PanelsTopLeft,
  Server,
  Database,
  Leaf,
  Figma,
  Layers,
//   ArrowUpRight,
  Clock,
  Briefcase,
} from "lucide-react"
import { motion, useReducedMotion, type Variants } from "framer-motion"

type Category = "Frontend" | "Backend" | "Database" | "Design" | "Stack"

type TechItem = {
  key: string
  name: string
  category: Category
  icon: LucideIcon
  href?: string
  tags?: string[]
  experienceYears?: number
  projects?: number
}

const defaultItems: TechItem[] = [
  {
    key: "react",
    name: "React JS",
    category: "Frontend",
    icon: Atom,
    href: "https://react.dev",
    tags: ["TypeScript", "SPA/SSR"],
    experienceYears: 3,
    projects: 25,
  },
  {
    key: "next",
    name: "Next.js",
    category: "Frontend",
    icon: PanelsTopLeft,
    href: "https://nextjs.org",
    tags: ["App Router", "RSC"],
    experienceYears: 3,
    projects: 18,
  },
  {
    key: "node",
    name: "Node.js",
    category: "Backend",
    icon: Server,
    href: "https://nodejs.org",
    tags: ["APIs", "Tooling"],
    experienceYears: 4,
    projects: 30,
  },
  {
    key: "postgres",
    name: "PostgreSQL",
    category: "Database",
    icon: Database,
    href: "https://www.postgresql.org",
    tags: ["SQL", "Migrations"],
    experienceYears: 3,
    projects: 12,
  },
  {
    key: "mern",
    name: "MERN Stack",
    category: "Stack",
    icon: Layers,
    tags: ["MongoDB", "Express", "React", "Node"],
    experienceYears: 4,
    projects: 20,
  },
  {
    key: "mongo",
    name: "MongoDB",
    category: "Database",
    icon: Leaf,
    href: "https://www.mongodb.com",
    tags: ["NoSQL"],
    experienceYears: 4,
    projects: 20,
  },
  {
    key: "figma",
    name: "Figma",
    category: "Design",
    icon: Figma,
    href: "https://www.figma.com",
    tags: ["UI/UX", "Prototyping"],
    experienceYears: 3,
    projects: 15,
  },
]

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}

export type TechStackSectionProps = {
  items?: TechItem[]
  className?: string
  title?: string
  subtitle?: string
  showPlusSuffix?: boolean // "3+" vs "3"
}

export function TechStackSection({
  items = defaultItems,
  className,
  title = "Tech Stack",
  subtitle = "Tools I use to design, build, and ship reliable products.",
  showPlusSuffix = true,
}: TechStackSectionProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      className={cn("w-full bg-zinc-950 px-6 py-12 text-zinc-100", className)}
      aria-labelledby="tech-stack-title"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <h2 id="tech-stack-title" className="text-6xl font-bold tracking-tight">
            {title}
          </h2>
          <p className="mt-1 text-sm text-zinc-400">{subtitle}</p>
        </header>

        <motion.ul
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
          role="list"
          variants={containerVariants}
          {...(!shouldReduceMotion
            ? { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.15 } }
            : {})}
        >
          {items.map((item) => (
            <StackCard key={item.key} item={item} showPlusSuffix={showPlusSuffix} />
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

function StackCard({ item, showPlusSuffix }: { item: TechItem; showPlusSuffix: boolean }) {
  const isMern = item.key === "mern"
  const years = item.experienceYears
  const projects = item.projects

  const Content = (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 transition-colors duration-200",
        "hover:bg-zinc-900 focus-within:bg-zinc-900",
        "focus-within:ring-2 focus-within:ring-yellow-600/40",
        // Left accent bar
        "before:absolute before:left-0 before:top-3 before:bottom-3 before:w-1 before:rounded-full before:bg-yellow-600/70 before:content-['']",
        // Corner micro-mark
        "after:absolute after:left-3 after:top-3 after:h-1.5 after:w-1.5 after:rotate-45 after:rounded-sm after:bg-yellow-600 after:content-['']",
        isMern ? "xl:col-span-2" : "",
      )}
      role="listitem"
      aria-label={`${item.name} — ${item.category}`}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg",
            "border border-zinc-800 bg-zinc-950 text-yellow-600",
            "transition-transform duration-200 group-hover:-translate-y-0.5",
          )}
          aria-hidden="true"
        >
          <item.icon className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-base font-medium text-zinc-100" title={item.name}>
              {item.name}
            </h3>
            <Badge variant="secondary" className="border-yellow-700/50 bg-zinc-950 text-yellow-600">
              {item.category}
            </Badge>
          </div>
{/* 
          {item.tags && item.tags.length > 0 ? (
            <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Related">
              {item.tags.map((t, i) => (
                <li key={t + i}>
                  <span className="rounded-md border border-zinc-800 bg-zinc-950/60 px-2 py-0.5 text-xs text-zinc-400">
                    {t}
                  </span>
                </li>
              ))}
            </ul>
          ) : null} */}

          {(years !== undefined || projects !== undefined) && (
            <div
              className="mt-3 flex items-center gap-4 text-xs"
              aria-label={`Experience and project metrics for ${item.name}`}
            >
              {years !== undefined && (
                <div className="flex items-center gap-1.5 text-zinc-400">
                  <Clock className="h-3.5 w-3.5 text-yellow-600" aria-hidden="true" />
                  <span>
                    <span className="text-zinc-200">{formatValue(years, showPlusSuffix)}</span>{" "}
                    <span className="sr-only">years of experience</span>
                    <span aria-hidden="true">yrs</span>
                  </span>
                </div>
              )}
              {years !== undefined && projects !== undefined && (
                <span className="h-3 w-px bg-zinc-800" aria-hidden="true" />
              )}
              {projects !== undefined && (
                <div className="flex items-center gap-1.5 text-zinc-400">
                  <Briefcase className="h-3.5 w-3.5 text-yellow-600" aria-hidden="true" />
                  <span>
                    <span className="text-zinc-200">{formatValue(projects, showPlusSuffix)}</span>{" "}
                    <span className="sr-only">completed projects</span>
                    <span aria-hidden="true">projects</span>
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* {item.href ? (
          <span
            className={cn(
              "ml-auto inline-flex h-8 w-8 items-center justify-center rounded-md border border-zinc-800",
              "text-zinc-300 transition-colors hover:text-yellow-600",
              "bg-zinc-950",
            )}
            aria-hidden="true"
            title="Open documentation"
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        ) : null} */}
      </div>
    </div>
  )

  const shouldReduceMotion = useReducedMotion()
  const MotionLi = motion.li as typeof motion.li

  return (
    <MotionLi variants={itemVariants} {...(!shouldReduceMotion ? {} : {})}>
      {item.href ? (
        <Link
          href={item.href}
          className="block outline-none"
          target="_blank"
          rel="noreferrer"
          aria-label={`${item.name} documentation (opens in a new tab)`}
        >
          {Content}
        </Link>
      ) : (
        Content
      )}
    </MotionLi>
  )
}

function formatValue(n: number, plus: boolean) {
  return plus ? `${n}+` : `${n}`
}
