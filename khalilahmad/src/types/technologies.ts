import type { LucideIcon } from "lucide-react"

export type Category = "Frontend" | "Backend" | "Database" | "Design" | "Tech Stack" | "Others"

export interface TechItem {
  key: string
  name: string
  category: Category
  icon: LucideIcon
  href?: string
  tags?: string[]
  experienceMonths?: number
  projects?: number
}

export interface TechStackSectionProps {
  items?: TechItem[]
  className?: string
  title?: string
  subtitle?: string
  showPlusSuffix?: boolean
  defaultCategory?: Category | "All"
}

export interface TechTabsProps {
  categories: (Category | "All")[]
  activeCategory: Category | "All"
  onCategoryChange: (category: Category | "All") => void
  className?: string
}

export interface TechGridProps {
  items: TechItem[]
  showPlusSuffix?: boolean
  className?: string
}

export interface TechCardProps {
  item: TechItem
  showPlusSuffix?: boolean
  className?: string
}
