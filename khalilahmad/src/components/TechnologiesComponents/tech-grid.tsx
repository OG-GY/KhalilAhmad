"use client"

import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import { TechCard } from "./tech-card"
import type { TechGridProps } from "@/types/technologies"

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
}

export function TechGrid({ items, showPlusSuffix = true, className }: TechGridProps) {
  const shouldReduceMotion = useReducedMotion()

  if (items.length === 0) {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/60">
        <div className="text-center">
          <p className="text-lg font-medium text-zinc-300">No technologies found</p>
          <p className="text-sm text-zinc-400">Try selecting a different category</p>
        </div>
      </div>
    )
  }

  return (
    <motion.ul
      className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-3", className)}
      role="list"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      key={items.length} // Re-trigger animation when items change
      {...(!shouldReduceMotion ? {} : {})}
    >
      {items.map((item) => (
        <TechCard key={item.key} item={item} showPlusSuffix={showPlusSuffix} />
      ))}
    </motion.ul>
  )
}
