"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { type LucideIcon, Layers, Check, ArrowRight } from "lucide-react"
import { motion, useReducedMotion, type Variants } from "framer-motion"

type ServiceStatus = "available" | "limited" | "waitlist"

export type ServiceCardProps = {
  title?: string
  description?: string
  icon?: LucideIcon
  highlights?: string[]
  href?: string
  tag?: string
  status?: ServiceStatus
  price?: string
  ariaLabel?: string
  className?: string
  index?: number // used for subtle stagger
}

const statusCopy: Record<ServiceStatus, string> = {
  available: "Available",
  limited: "Limited",
  waitlist: "Waitlist",
}

const statusDot: Record<ServiceStatus, string> = {
  available: "bg-green-500",
  limited: "bg-yellow-500",
  waitlist: "bg-zinc-500",
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      delay: Math.min(i * 0.06, 0.3),
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

export function ServiceCard(props: ServiceCardProps) {
  const {
    title = "Full‑Stack Development",
    description = "End‑to-end product engineering: robust backends, clean APIs, and polished interfaces.",
    icon: Icon = Layers,
    highlights = ["APIs & Integrations", "Databases", "Next.js & React", "CI/CD on Vercel"],
    href = "#",
    tag = "Core Service",
    status = "available",
    price = "Custom",
    ariaLabel,
    className,
    index = 0,
  } = props

  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.article
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 transition-colors",
        "hover:bg-zinc-900 focus-within:bg-zinc-900",
        "focus-within:ring-2 focus-within:ring-yellow-600/40",
        "duration-200",
        // Left accent bar
        "before:absolute before:left-0 before:top-4 before:bottom-4 before:w-1 before:rounded-full before:bg-yellow-600/70 before:content-['']",
        // Corner micro-mark
        "after:absolute after:left-3 after:top-3 after:h-1.5 after:w-1.5 after:rotate-45 after:rounded-sm after:bg-yellow-600 after:content-['']",
        className,
      )}
      role="region"
      aria-labelledby={`${slugify(title)}-title`}
      variants={cardVariants}
      custom={index}
      {...(!shouldReduceMotion
        ? { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.25, margin: "0px 0px -10% 0px" } }
        : {})}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-lg",
            "border border-zinc-800 bg-zinc-950 text-yellow-600",
            "transition-transform duration-200 group-hover:-translate-y-0.5",
          )}
          aria-hidden="true"
        >
          <Icon className="h-6 w-6" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 justify-between">
            <h3 id={`${slugify(title)}-title`} className="truncate text-xl md:text-2xl font-semibold text-zinc-100" title={title}>
              {title}
            </h3>
            {tag ? (
              <Badge variant="secondary" className="border-yellow-700/50 bg-zinc-950 text-yellow-600">
                {tag}
              </Badge>
            ) : null}
          </div>

          <p className="mt-1 line-clamp-3 text-sm text-zinc-400">{description}</p>
        </div>
      </div>

      {highlights?.length ? (
        <ul className="mt-4 grid gap-2 sm:grid-cols-2" aria-label="Highlights">
          {highlights.map((item, idx) => (
            <li key={`${item}-${idx}`} className="flex items-start gap-2 text-sm text-zinc-300">
              <Check className="mt-0.5 h-4 w-4 flex-none text-yellow-600" aria-hidden="true" />
              <span className="leading-snug">{item}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-5 flex items-center justify-between border-t border-zinc-800 pt-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className={cn("h-2.5 w-2.5 rounded-full", statusDot[status])} aria-hidden="true" />
            <span className="text-xs font-medium text-zinc-400">{statusCopy[status]}</span>
          </div>
          <span className="h-4 w-px bg-zinc-800" aria-hidden="true" />
          <div className="text-xs text-zinc-400">
            Pricing: <span className="text-zinc-200">{price}</span>
          </div>
        </div>

        <Button
          asChild
          variant="secondary"
          className={cn(
            "border-yellow-700/50 bg-zinc-950 text-yellow-600 hover:bg-zinc-900",
            "focus-visible:ring-yellow-600/40",
          )}
        >
          <Link href={href} aria-label={ariaLabel || `${title} — View details`}>
            <span className="inline-flex items-center gap-1.5">
              View details
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </span>
          </Link>
        </Button>
      </div>
    </motion.article>
  )
}

// Helper to create a simple id from the title
function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}
