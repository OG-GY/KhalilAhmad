"use client"

import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { TechTabsProps, Category } from "@/types/technologies"

export function TechTabs({ categories, activeCategory, onCategoryChange, className }: TechTabsProps) {
  const shouldReduceMotion = useReducedMotion()

  // Define your preferred tab order here
  const preferredOrder: Array<Category | "All"> = [
    "All",
    "Frontend", 
    "Backend",
    "Tech Stack",
    "Database",
    "Design",
    "Others"
  ]

  // Sort categories based on preferred order
  const sortedCategories = preferredOrder.filter(cat => categories.includes(cat))

  return (
    <div className={cn("flex flex-wrap gap-2 items-center justify-center", className)}>
      {sortedCategories.map((category, index) => (
        <motion.div
          key={category}
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Button
            variant={activeCategory === category ? "default" : "secondary"}
            onClick={() => onCategoryChange(category)}
            className={cn(
              "group relative transition-all duration-200",
              activeCategory === category
                ? "bg-yellow-600 text-zinc-950 hover:bg-yellow-500"
                : "border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:bg-zinc-900 hover:text-yellow-600 cursor-pointer",
            )}
          >
            {category}
            {activeCategory === category && (
              <motion.div
                className="absolute -bottom-1 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-yellow-600"
                layoutId="activeTab"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </Button>
        </motion.div>
      ))}
    </div>
  )
}
