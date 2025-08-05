// models/serviceModel.ts
// No unused imports needed
import { LucideIcon } from 'lucide-react';

export type Service = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  slug: string;
  url?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ServiceDetail = {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  detailedDescription: string;
  icon: LucideIcon;
  heroImage?: string;
  technologies: string[];
  features: string[];
  process: {
    step: string;
    description: string;
  }[];
  packages: {
    name: string;
    price: string;
    features: string[];
    timeline: string;
    popular?: boolean;
  }[];
  portfolio: {
    title: string;
    description: string;
    image?: string;
    technologies: string[];
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
  testimonials: {
    name: string;
    company: string;
    text: string;
    rating: number;
  }[];
};
