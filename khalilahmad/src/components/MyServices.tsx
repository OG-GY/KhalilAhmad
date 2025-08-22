"use client"

import { ServiceCard } from "@/components/ServicesComponents/Scard"
import { Layers, AppWindow, PenTool, ServerCog } from "lucide-react"

export default function MyServices() {
  return (
    <main id="services" className="min-h-screen bg-zinc-950 px-6 py-12 text-zinc-100">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <h1 className="text-6xl font-bold tracking-tight">Services</h1>
          <p className="mt-1 text-sm text-zinc-400">
            What I can help you build — crafted with precision and performance.
          </p>
        </header>

        <section className="grid gap-5 md:grid-cols-2">
          <ServiceCard
            title="Full‑Stack Development"
            description="From data models to deploy: scalable backends, clean APIs, and delightful UIs."
            icon={Layers}
            highlights={["Next.js & React", "RDBMS & Prisma", "REST/GraphQL APIs", "CI/CD on Vercel"]}
            href="/services/full-stack-development"
            tag="Core Service"
            status="available"
            price="Custom"
          />
          <ServiceCard
            title="Frontend Development"
            description="Accessible, high‑performance interfaces with modern tooling and best practices."
            icon={AppWindow}
            highlights={["TypeScript", "React/Next.js", "Design Systems", "Accessibility (a11y)"]}
            href="/services/frontend-development"
            tag="Core Service"
            status="available"
            price="From $60/hr"
          />
          <ServiceCard
            title="UI/UX Design"
            description="Crisp visuals and intuitive flows — wireframes to production‑ready interfaces."
            icon={PenTool}
            highlights={["Wireframes", "Hi‑fi Mockups", "Design Systems", "Prototyping"]}
            href="/services/ui-ux-design"
            tag="Add‑on"
            status="limited"
            price="Project‑based"
          />
          <ServiceCard
            title="Web Scraping"
            description="Reliable integrations with third‑party services and robust API architectures."
            icon={ServerCog}
            highlights={["Auth & Security", "Third‑party APIs", "Webhooks", "Monitoring & Logs"]}
            href="/services/apis-and-integrations"
            tag="Specialty"
            status="available"
            price="From $80/hr"
          />
        </section>
      </div>
    </main>
  )
}
