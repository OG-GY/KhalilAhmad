"use client"

import { ServiceCard } from "@/components/ServicesComponents/Scard"
import { myServicesData } from "@/data/mainservices"

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
          {myServicesData.map((service, index) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              icon={service.icon}
              highlights={service.highlights}
              href={service.href}
              tag={service.tag}
              status={service.status}
              price={service.price}
              index={index}
            />
          ))}
        </section>
      </div>
    </main>
  )
}
