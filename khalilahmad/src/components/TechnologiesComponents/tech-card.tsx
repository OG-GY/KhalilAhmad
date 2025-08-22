"use client"

import { motion, useReducedMotion, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Clock, Briefcase } from "lucide-react"
import type { TechCardProps } from "@/types/technologies"

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
}

function formatValue(n: number, plus: boolean) {
  return plus ? `${n}+` : `${n}`
}

export function TechCard({ item, showPlusSuffix = true, className }: TechCardProps) {
  const shouldReduceMotion = useReducedMotion()
  const isMern = item.key === "mern"
  const months = item.experienceMonths
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
        className,
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

          {/* {item.tags && item.tags.length > 0 && (
            <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Related technologies">
              {item.tags.map((tag, i) => (
                <li key={`${tag}-${i}`}>
                  <span className="rounded-md border border-zinc-800 bg-zinc-950/60 px-2 py-0.5 text-xs text-zinc-400">
                    {tag}
                  </span>
                </li>
              ))}
            </ul>
          )} */}

          {(months !== undefined || projects !== undefined) && (
            <div
              className="mt-3 flex items-center gap-4 text-xs"
              aria-label={`Experience and project metrics for ${item.name}`}
            >
              {months !== undefined && (
                <div className="flex items-center gap-1.5 text-zinc-400">
                  <Clock className="h-3.5 w-3.5 text-yellow-600" aria-hidden="true" />
                  <span>
                    <span className="text-zinc-200">{formatValue(months, showPlusSuffix)}</span>{" "}
                    <span className="sr-only">months of experience</span>
                    <span aria-hidden="true">mos</span>
                  </span>
                </div>
              )}
              {months !== undefined && projects !== undefined && (
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
      </div>
    </div>
  )

  const MotionLi = motion.li as typeof motion.li

  return (
    <MotionLi variants={itemVariants} {...(!shouldReduceMotion ? {} : {})} className="h-fit">
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
