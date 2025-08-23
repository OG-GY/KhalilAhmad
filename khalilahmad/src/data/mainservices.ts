import {
  Layers,
  AppWindow,
  PenTool,
  ServerCog
} from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

// Type for MyServices component data
export type MyServiceCard = {
  title: string;
  description: string;
  icon: LucideIcon;
  highlights: string[];
  href: string;
  tag: string;
  status: "available" | "limited" | "waitlist";
  price: string;
}

// Data for MyServices component
export const myServicesData: MyServiceCard[] = [
  {
    title: "Full‑Stack Development",
    description: "From data models to deploy: scalable backends, clean APIs, and delightful UIs.",
    icon: Layers,
    highlights: ["Next.js & React", "RDBMS & Prisma", "CI/CD on Vercel"],
    href: "/services/full-stack-development",
    tag: "Core Service",
    status: "available",
    price: "Custom"
  },
  {
    title: "Frontend Development",
    description: "Accessible, high‑performance interfaces with modern tooling and best practices.",
    icon: AppWindow,
    highlights: ["TypeScript", "React/Next.js", "Design Systems", "Accessibility (a11y)"],
    href: "/services/frontend-development",
    tag: "Core Service",
    status: "available",
    price: "From $30"
  },
  {
    title: "UI/UX Design",
    description: "Crisp visuals and intuitive flows — wireframes to production‑ready interfaces.",
    icon: PenTool,
    highlights: ["Wireframes", "Hi‑fi Mockups", "Design Systems", "Prototyping"],
    href: "/services/ui-ux-design",
    tag: "Add‑on",
    status: "limited",
    price: "Project‑based"
  },
  {
    title: "Web Scraping",
    description: "Reliable integrations with third‑party services and robust API architectures.",
    icon: ServerCog,
    highlights: ["Auth & Security", "Third‑party APIs", "Webhooks", "Monitoring & Logs"],
    href: "/services/web-scraping",
    tag: "Specialty",
    status: "available",
    price: "From $12"
  }
];
