"use client"

import { motion, useReducedMotion, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Github, Linkedin, Twitter, Globe, ArrowUpRight, Heart, Code, Coffee, MapPin } from "lucide-react"

export type FooterProps = {
  className?: string
  name?: string
  tagline?: string
  email?: string
  location?: string
  socialLinks?: {
    github?: string
    linkedin?: string
    twitter?: string
    website?: string
  }
  quickLinks?: Array<{ label: string; href: string }>
  services?: Array<{ label: string; href: string }>
  showAvailability?: boolean
  availabilityStatus?: "available" | "limited" | "unavailable"
}

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
}

const availabilityConfig = {
  available: { text: "Available for work", color: "bg-green-500", badge: "Open" },
  limited: { text: "Limited availability", color: "bg-yellow-500", badge: "Limited" },
  unavailable: { text: "Currently unavailable", color: "bg-zinc-500", badge: "Closed" },
}

export function Footer({
  className,
  name = "Khalil Ahmad",
  tagline = "Full‑Stack Developer & UI/UX Designer",
  email = "reachkhalilhere@gmail.com",
  location = "Lahore, Pakistan",
  socialLinks = {
    github: "https://github.com/khalil-ahmad",
    linkedin: "https://linkedin.com/in/khalil-ahmad",
    twitter: "https://twitter.com/khalil_ahmad",
    website: "https://khalil-ahmad.vercel.app",
  },
  quickLinks = [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Experience", href: "/experience" },
    { label: "Contact", href: "/contact" },
  ],
  services = [
    { label: "Full‑Stack Development", href: "/services/full-stack-development" },
    { label: "Frontend Development", href: "/services/frontend-development" },
    { label: "UI/UX Design", href: "/services/ui-ux-design" },
    { label: "API Development", href: "/services/api-development" },
  ],
  showAvailability = true,
  availabilityStatus = "available",
}: FooterProps) {
  const shouldReduceMotion = useReducedMotion()
  const currentYear = new Date().getFullYear()
  const availability = availabilityConfig[availabilityStatus]

  return (
    <footer
      className={cn("w-full bg-black mt-24 border-t-2 border-amber-600 px-0 py-12 text-zinc-100", className)}
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="px-24">
        <motion.div
          variants={containerVariants}
          {...(!shouldReduceMotion
            ? { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.15 } }
            : {})}
        >
          {/* Main footer content */}
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Brand section */}
            <motion.div
              variants={itemVariants}
              className={cn(
                "relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 lg:col-span-5",
                "before:absolute before:left-0 before:top-6 before:bottom-6 before:w-1 before:rounded-full before:bg-yellow-600/70 before:content-['']",
                "after:absolute after:left-3 after:top-3 after:h-1.5 after:w-1.5 after:rotate-45 after:rounded-sm after:bg-yellow-600 after:content-['']",
              )}
            >
              <div className="flex items-start gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 text-yellow-600">
                  <Code className="h-6 w-6" />
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg font-semibold tracking-tight">{name}</h2>
                  <p className="mt-1 text-sm text-zinc-400">{tagline}</p>
                </div>
              </div>

              {showAvailability && (
                <div className="mt-4 flex items-center gap-2">
                  <span className={cn("h-2.5 w-2.5 rounded-full", availability.color)} aria-hidden="true" />
                  <span className="text-xs text-zinc-300">{availability.text}</span>
                  <Badge variant="secondary" className="border-yellow-700/50 bg-zinc-950 text-yellow-600">
                    {availability.badge}
                  </Badge>
                </div>
              )}

              <div className="mt-4 flex items-center gap-2 text-xs text-zinc-400">
                <MapPin className="h-3.5 w-3.5 text-yellow-600" />
                <span>{location}</span>
              </div>

              {/* Social links */}
              <div className="mt-5 flex flex-wrap gap-2">
                {socialLinks.github && (
                  <Button asChild variant="secondary" size="sm" className="border-zinc-800 bg-zinc-950 text-zinc-300">
                    <Link href={socialLinks.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
                      <Github className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
                {socialLinks.linkedin && (
                  <Button asChild variant="secondary" size="sm" className="border-zinc-800 bg-zinc-950 text-zinc-300">
                    <Link href={socialLinks.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
                      <Linkedin className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
                {socialLinks.twitter && (
                  <Button asChild variant="secondary" size="sm" className="border-zinc-800 bg-zinc-950 text-zinc-300">
                    <Link href={socialLinks.twitter} target="_blank" rel="noreferrer" aria-label="Twitter profile">
                      <Twitter className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
                {socialLinks.website && (
                  <Button asChild variant="secondary" size="sm" className="border-zinc-800 bg-zinc-950 text-zinc-300">
                    <Link href={socialLinks.website} target="_blank" rel="noreferrer" aria-label="Personal website">
                      <Globe className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </motion.div>

            {/* Navigation sections */}
            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
              {/* Quick links */}
              <motion.nav variants={itemVariants} aria-label="Quick navigation">
                <h3 className="mb-4 text-sm font-medium text-zinc-100">Quick Links</h3>
                <ul className="space-y-2">
                  {quickLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex items-center gap-1 text-sm text-zinc-400 transition-colors hover:text-yellow-600"
                      >
                        {link.label}
                        <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.nav>

              {/* Services */}
              <motion.nav variants={itemVariants} aria-label="Services navigation">
                <h3 className="mb-4 text-sm font-medium text-zinc-100">Services</h3>
                <ul className="space-y-2">
                  {services.map((service) => (
                    <li key={service.href}>
                      <Link
                        href={service.href}
                        className="inline-flex items-center gap-1 text-sm text-zinc-400 transition-colors hover:text-yellow-600"
                      >
                        {service.label}
                        <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.nav>
            </div>
          </div>

          {/* Contact CTA */}
          <motion.div
            variants={itemVariants}
            className={cn(
              "relative mt-8 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6",
              "before:absolute before:left-0 before:top-6 before:bottom-6 before:w-1 before:rounded-full before:bg-yellow-600/70 before:content-['']",
              "after:absolute after:left-3 after:top-3 after:h-1.5 after:w-1.5 after:rotate-45 after:rounded-sm after:bg-yellow-600 after:content-['']",
            )}
          >
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 text-yellow-600">
                  <Coffee className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-base font-medium text-zinc-100">Let's work together</h3>
                  <p className="text-sm text-zinc-400">Have a project in mind? I'd love to hear about it.</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button asChild variant="secondary" className="border-yellow-700/50 bg-zinc-950 text-yellow-600">
                  <Link href={`mailto:${email}`}>
                    <Mail className="mr-1.5 h-4 w-4" />
                    {email}
                  </Link>
                </Button>
                <Button asChild className="bg-yellow-600 text-zinc-950 hover:bg-yellow-500">
                  <Link href="/contact">Get in touch</Link>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Bottom bar */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-6 sm:flex-row"
          >
            <div className="flex items-center gap-1 text-xs text-zinc-400">
              <span>
                © {currentYear} {name}. Made with
              </span>
              <Heart className="h-3 w-3 text-red-500" />
              <span>and lots of</span>
              <Coffee className="h-3 w-3 text-yellow-600" />
            </div>
            <div className="flex gap-4 text-xs text-zinc-400">
              <Link href="/privacy" className="transition-colors hover:text-yellow-600">
                Privacy
              </Link>
              <Link href="/terms" className="transition-colors hover:text-yellow-600">
                Terms
              </Link>
              <span>Built with Next.js & Tailwind</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}
