"use client";

import type React from "react";

import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Building2,
  Globe,
  ArrowUpRight,
  Code,
  Palette,
  GraduationCap,
  Calendar,
  MapPin,
  TrendingUp,
  Users,
  Award,
  Zap,
} from "lucide-react";

type LocationType = "remote" | "onsite" | "hybrid";
type ExperienceType =
  | "internship"
  | "full-time"
  | "part-time"
  | "contract"
  | "freelance";

export type ProfessionalRole = {
  title: string;
  start: string;
  end?: string;
  type: ExperienceType;
  locationType?: LocationType;
  location?: string;
  description: string;
  technologies?: string[];
  achievements?: string[];
  metrics?: {
    label: string;
    value: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
};

export type ProfessionalExperienceItem = {
  id: string;
  company: string;
  companyUrl?: string;
  industry?: string;
  locationType?: LocationType;
  roles: ProfessionalRole[];
  tags?: string[];
  companyLogo?: string;
  primaryColor?: string;
};

export type ProfessionalExperienceSectionProps = {
  items?: ProfessionalExperienceItem[];
  title?: string;
  subtitle?: string;
  className?: string;
  defaultCollapsedCount?: number;
};

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export function ProfessionalExperienceSection({
  items = defaultProfessionalExperiences,
  className,
  defaultCollapsedCount = 2,
}: ProfessionalExperienceSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className={cn(
        "w-full rounded-3xl bg-zinc-950 px-6 py-12 text-zinc-100",
        className
      )}
      aria-labelledby="professional-experience-title"
    >
      <div className="mx-auto max-w-7xl">
                <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Professional <span className="text-yellow-400">Experience</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            How much I&#39;ve got from industry.
          </p>
        </div>
        
        <div className="relative">
          {/* Vertical timeline rail */}
          <div
            className="pointer-events-none absolute left-[14px] top-0 bottom-0 hidden w-px bg-zinc-800 sm:block"
            aria-hidden="true"
          />
          <motion.ul
            className="space-y-6"
            role="list"
            variants={containerVariants}
            {...(!shouldReduceMotion
              ? {
                  initial: "hidden",
                  whileInView: "show",
                  viewport: { once: true, amount: 0.15 },
                }
              : {})}
          >
            {items.map((item, idx) => (
              <ProfessionalTimelineItem
                key={item.id}
                item={item}
                _index={idx}
                defaultCollapsedCount={defaultCollapsedCount}
              />
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

function ProfessionalTimelineItem({
  item,
  _index,
  defaultCollapsedCount,
}: {
  item: ProfessionalExperienceItem;
  _index: number;
  defaultCollapsedCount: number;
}) {
  const [expanded, _setExpanded] = useState(false);
  const [activeRole, setActiveRole] = useState(0);

  const visibleRoles = expanded
    ? item.roles
    : item.roles.slice(0, defaultCollapsedCount);
  const _hasMore = item.roles.length > visibleRoles.length;
  const currentRole = item.roles[activeRole];

  const getCompanyIcon = () => {
    if (item.industry === "Gaming") return Code;
    if (item.industry === "Design") return Palette;
    if (item.industry === "Education") return GraduationCap;
    return item.locationType === "onsite"
      ? Building2
      : item.locationType === "remote"
      ? Globe
      : Briefcase;
  };

  const CompanyIcon = getCompanyIcon();

  return (
    <motion.li className="relative pl-10" variants={itemVariants}>
      {/* Node dot on the rail (desktop) */}
      <span className="absolute left-2 top-6 hidden h-3 w-3 -translate-x-1/2 rounded-full bg-yellow-600 sm:block" />

      <article
        className={cn(
          "group relative overflow-hidden rounded-3xl border border-zinc-800 p-8",
          "bg-gradient-to-br from-zinc-900/80 to-zinc-900/40",
          "transition-all duration-500 hover:border-yellow-600/30",
          "focus-within:ring-2 focus-within:ring-yellow-600/40",
          // Left accent bar
          "before:absolute before:left-0 before:top-6 before:bottom-6 before:w-1 before:rounded-full before:bg-yellow-600/70 before:content-['']",
          // Corner micro-mark
          "after:absolute after:left-4 after:top-4 after:h-2 after:w-2 after:rotate-45 after:rounded-sm after:bg-yellow-600 after:content-['']"
        )}
        aria-label={`${item.company} professional experience`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-600 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-600 rounded-full blur-2xl" />
        </div>

        {/* Company Header */}
        <header className="relative mb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "relative p-4 rounded-2xl border border-zinc-800 bg-zinc-950",
                  "transition-transform duration-300 group-hover:scale-110"
                )}
              >
                <CompanyIcon className="h-8 w-8 text-yellow-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-600 rounded-full animate-pulse" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-zinc-100">
                  {item.company}
                </h3>
                <span className="flex items-center gap-1 text-zinc-500">
                  <Calendar className="h-4 w-4" />
                  {currentRole.start} - {currentRole.end || "Present"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {item.companyUrl && (
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-yellow-600 hover:bg-yellow-600/10"
                >
                  <Link href={item.companyUrl} target="_blank" rel="noreferrer">
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {/* Tags */}
          {/* {item.tags && (
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="border-zinc-700 bg-zinc-800/50 text-zinc-300">
                  {tag}
                </Badge>
              ))}
            </div>
          )} */}
        </header>

        {/* Role Tabs */}
        {item.roles.length > 1 && (
          <div className="mb-6">
            <div className="flex gap-2 p-1 bg-zinc-800/50 rounded-xl">
              {item.roles.map((role, index) => (
                <button
                  key={index}
                  onClick={() => setActiveRole(index)}
                  className={cn(
                    "flex-1 px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200",
                    activeRole === index
                      ? "bg-yellow-600 text-zinc-900"
                      : "text-zinc-400 hover:text-zinc-300 hover:bg-zinc-700/50"
                  )}
                >
                  {role.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Current Role Details */}
        <div className="space-y-6">
          {/* Role Header */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xl font-semibold text-zinc-100 ">
                {currentRole.title}
              </h4>
              <div className="flex items-center gap-4 mt-2 text-sm text-zinc-400">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {currentRole.location ||
                    (currentRole.locationType === "remote"
                      ? "Remote"
                      : "Remote")}
                </span>
              </div>
            </div>

            <Badge
              className={cn(
                "px-3 py-1",
                currentRole.type === "internship" &&
                  "border-blue-600/50 bg-blue-950 text-blue-400",
                currentRole.type === "contract" &&
                  "border-green-600/50 bg-green-950 text-green-400",
                currentRole.type === "part-time" &&
                  "border-purple-600/50 bg-purple-950 text-purple-400",
                !currentRole.end &&
                  "border-yellow-600/50 bg-yellow-950 text-yellow-400"
              )}
            >
              {currentRole.type.charAt(0).toUpperCase() +
                currentRole.type.slice(1)}
            </Badge>
          </div>

          {/* Description */}
          {/* <p className="text-zinc-300 leading-relaxed">
            {currentRole.description}
          </p> */}

            <div className="flex justify-between">

          {/* Metrics */}
          {currentRole.metrics && (
            <div className="grid grid-cols-2 gap-4">
              {currentRole.metrics.map((metric, index) => (
                <div
                  key={index}
                  className="relative p-4 rounded-xl border border-zinc-800 bg-zinc-950/60"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-yellow-600/10 border border-yellow-600/20">
                      <metric.icon className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-600">
                        {metric.value}
                      </div>
                      <div className="text-xs text-zinc-400">
                        {metric.label}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Technologies */}
          {currentRole.technologies && (
            <div>
              <h5 className="text-sm font-medium text-zinc-300 mb-3 flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-600" />
                Technologies Used
              </h5>
              <div className="flex flex-wrap gap-2">
                {currentRole.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium bg-zinc-800/50 border border-zinc-700 rounded-full text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
            </div>
              {/* Key Achievements */}
              {currentRole.achievements && (
                <div>
                  <h5 className="text-sm font-medium text-zinc-300 mb-3 flex items-center gap-2">
                    <Award className="h-4 w-4 text-yellow-600" />
                    Key Achievements
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentRole.achievements
                      .slice(0, 4)
                      .map((achievement, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 rounded-lg bg-zinc-800/30 border border-zinc-800"
                        >
                          <div className="w-2 h-2 rounded-full bg-yellow-600 mt-2 flex-shrink-0" />
                          <span className="text-sm text-zinc-300 leading-relaxed">
                            {achievement}
                          </span>
                        </div>
                      ))}
                  </div>
                  
                </div>
              )}
        </div>

        {/* Role Progress Indicator */}
        {item.roles.length > 1 && (
          <div className="absolute bottom-4 right-4">
            <div className="flex gap-1">
              {item.roles.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors duration-200",
                    activeRole === index ? "bg-yellow-600" : "bg-zinc-700"
                  )}
                />
              ))}
            </div>
          </div>
        )}
      </article>
    </motion.li>
  );
}

const defaultProfessionalExperiences: ProfessionalExperienceItem[] = [
  {
    id: "uet-game-studio",
    company: "UET Game Studio",
    industry: "Gaming & Web Development",
    locationType: "onsite",
    tags: ["Game Development", "Web Development", "Full-Stack"],
    roles: [
      {
        title: "Full Stack Web Developer",
        start: "Nov 2024",
        end: "Present",
        type: "part-time",
        locationType: "onsite",
        location: "Lahore, Pakistan",
        description:
          "Developed cutting-edge web solutions for game showcases and studio portfolio. Built interactive experiences that brought games to life on the web platform.",
        technologies: [
          "React",
          "Next.js",
          "Node.js",
          "Prisma",
          "TypeScript",
          "Tailwind CSS",
        ],
        metrics: [
          { label: "Projects Involvement", value: "5+", icon: TrendingUp },
          { label: "Satisfaction", value: "98%", icon: Users },
        ],
        achievements: [
          "Developed responsive gaming portal with 40% improved loading speed",
          "Developed Portfolio website for UET Game Studio to incrase online presence by 90%",
          "Leading startup project team of UET Game Studio",
          "Collaborated with game developers and worked as game artist, designer and QA",
        ],
      },
    ],
  },
  {
    id: "d3-studio",
    company: "D3 Studio",
    industry: "Technology & Education",
    locationType: "remote",
    tags: ["UI/UX Design", "Education", "Mentorship", "Design Systems"],
    roles: [
      {
        title: "UI/UX Design Tutor",
        start: "Sep 2024",
        type: "contract",
        locationType: "hybrid",
        description:
          "Empowering the next generation of designers through comprehensive UI/UX education. Teaching design thinking, prototyping, and user research to create impactful digital experiences.",
        technologies: [
          "Figma",
          "Design Systems",
          "Color Schemes",
          "User Interface",
          "User Experience"
        ],
        metrics: [
          { label: "Students Mentored", value: "25+", icon: Users },
          { label: "Days Course", value: "14", icon: Award },
        ],
        achievements: [
          "Successfully mentored 25+ students in UI/UX design fundamentals",
          "Developed comprehensive curriculum covering design thinking to prototyping",
          "Created design system templates used by 20+ students in their projects",
          "Achieved 98% student satisfaction rate in course evaluations",
        ],
      },
    ],
  },
];
