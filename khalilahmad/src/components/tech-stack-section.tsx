"use client";

import { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TechTabs } from "./TechnologiesComponents/tech-tabs";
import { TechGrid } from "./TechnologiesComponents/tech-grid";
import type { TechStackSectionProps, Category } from "@/types/technologies";
import { defaultTechItems } from "@/data/technologies";

export function TechStackSection({
  items = defaultTechItems,
  className,
  title = "Technologies / Tools",
  subtitle = "Tools I use to design, build, and ship reliable products.",
  showPlusSuffix = true,
  defaultCategory = "Tech Stack",
}: TechStackSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<Category | "All">(
    defaultCategory
  );

  // Extract unique categories from items and add "All"
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(items.map((item) => item.category))
    );
    return ["All", ...uniqueCategories.sort()] as (Category | "All")[];
  }, [items]);

  // Filter items based on active category
  const filteredItems = useMemo(() => {
    if (activeCategory === "All") {
      return items;
    }
    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory]);

  return (
    <section
      id="technologies"
      className={cn("w-full bg-zinc-950 px-6 py-12 text-zinc-100", className)}
      aria-labelledby="tech-stack-title"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.header
          className="mb-8"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2
            id="tech-stack-title"
            className="text-4xl font-bold tracking-tight lg:text-6xl"
          >
            {title}
          </h2>
          <p className="mt-2 text-base text-zinc-400 lg:text-lg">{subtitle}</p>
        </motion.header>

        {/* Category Tabs */}
        <motion.div
          className="mb-8"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <TechTabs
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </motion.div>

        {/* Tech Grid */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <TechGrid items={filteredItems} showPlusSuffix={showPlusSuffix} />
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-8 text-center"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-sm text-zinc-400">
            Showing {filteredItems.length} of {items.length} technologies
            {activeCategory !== "All" && (
              <span className="ml-1 text-yellow-600">in {activeCategory}</span>
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
