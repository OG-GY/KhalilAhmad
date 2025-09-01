"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Users, Trophy, ArrowUpRight, Calendar } from "lucide-react";

type CommunityStatus = "active" | "completed";

export type CommunityRole = {
  title: string;
  start: string; // "Jan 2022"
  end?: string; // "Present" or date
  description?: string;
  achievements?: string[];
};

export type CommunityItem = {
  id: string;
  name: string;
  description: string;
  website?: string;
  status: CommunityStatus;
  roles: CommunityRole[];
  tags?: string[];
  totalMembers?: number;
  impactMetrics?: {
    label: string;
    value: string;
  }[];
};

export type CommunitySectionProps = {
  items?: CommunityItem[];
  title?: string;
  subtitle?: string;
  className?: string;
};

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export function CommunitySection({
  items = defaultCommunities,
  className,
}: CommunitySectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className={cn(
        "w-full rounded-3xl bg-zinc-950 px-4 py-12 text-zinc-100",
        className
      )}
      aria-labelledby="community-title"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Community <span className="text-yellow-400">Work</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            What & How I have contributed to peeps.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl">
        {/* <header className="mb-10">
          <h2 id="community-title" className="text-2xl font-semibold tracking-tight">
            {title}
          </h2>
          <p className="mt-2 text-sm text-zinc-400">{subtitle}</p>
        </header> */}

        <motion.div
          className="grid gap-8 md:grid-cols-2"
          variants={containerVariants}
          {...(!shouldReduceMotion
            ? {
                initial: "hidden",
                whileInView: "show",
                viewport: { once: true, amount: 0.15 },
              }
            : {})}
        >
          {items.map((community) => (
            <CommunityCard key={community.id} community={community} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CommunityCard({ community }: { community: CommunityItem }) {
  const isActive = community.status === "active";

  return (
    <motion.article
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6",
        "transition-all duration-300 hover:bg-zinc-900 hover:border-zinc-700",
        "focus-within:ring-2 focus-within:ring-yellow-600/40",
        // Left accent bar
        "before:absolute before:left-0 before:top-6 before:bottom-6 before:w-1 before:rounded-full before:content-['']",
        isActive ? "before:bg-yellow-600" : "before:bg-zinc-600",
        // Corner micro-mark
        "after:absolute after:left-4 after:top-4 after:h-2 after:w-2 after:rotate-45 after:rounded-sm after:content-['']",
        isActive ? "after:bg-yellow-600" : "after:bg-zinc-600"
      )}
      variants={itemVariants}
      aria-label={`${community.name} community work`}
    >
      {/* Header */}
      <header className="mb-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "inline-flex h-12 w-12 items-center justify-center rounded-xl border transition-transform duration-200 group-hover:-translate-y-1",
                isActive
                  ? "border-yellow-700/50 bg-zinc-950 text-yellow-600"
                  : "border-zinc-700 bg-zinc-950 text-zinc-400"
              )}
            >
              <Users className="h-6 w-6" />
            </span>
            <div>
              <h3 className="text-lg font-semibold text-zinc-100">
                {community.name}
              </h3>
              <p className="text-sm text-zinc-400">{community.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className={cn(
                "text-xs",
                isActive
                  ? "border-yellow-700/50 bg-zinc-950 text-yellow-600"
                  : "border-zinc-700 bg-zinc-950 text-zinc-400"
              )}
            >
              {isActive ? "Active" : "Completed"}
            </Badge>
            {community.website && (
              <Badge
                asChild
                variant="secondary"
                className="border-zinc-700 bg-zinc-950 text-zinc-300"
              >
                <Link href={community.website} target="_blank" rel="noreferrer">
                  Visit <ArrowUpRight className="ml-1 h-3 w-3" />
                </Link>
              </Badge>
            )}
          </div>
        </div>

        {/* Tags */}
        {community.tags && community.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {community.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-zinc-700 text-zinc-300"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </header>

      {/* Impact Metrics */}
      {community.impactMetrics && community.impactMetrics.length > 0 && (
        <div className="mb-6 grid grid-cols-2 gap-4">
          {community.impactMetrics.map((metric, index) => (
            <div
              key={index}
              className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-3 text-center"
            >
              <div className="text-lg font-semibold text-yellow-600">
                {metric.value}
              </div>
              <div className="text-xs text-zinc-400">{metric.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Roles Timeline */}
      <div className="space-y-4">
        <h4 className="flex items-center gap-2 text-sm font-medium text-zinc-300">
          <Trophy className="h-4 w-4 text-yellow-600" />
          Career Progression
        </h4>

        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-4 top-0 bottom-0 w-px bg-zinc-800"
            aria-hidden="true"
          />

          <div className="space-y-4">
            {community.roles.map((role, index) => (
              <div key={index} className="relative pl-10">
                {/* Timeline dot */}
                <span
                  className={cn(
                    "absolute left-4 top-2 h-2 w-2 -translate-x-1/2 rounded-full",
                    index === 0 && isActive ? "bg-yellow-600" : "bg-zinc-600"
                  )}
                />

                <div className="rounded-lg border border-zinc-800 bg-zinc-950/40 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <h5 className="font-medium text-zinc-100">{role.title}</h5>
                    {role.end?.toLowerCase() === "present" && (
                      <Badge className="h-5 border-yellow-700/50 bg-zinc-950 px-2 text-[10px] text-yellow-600">
                        Current
                      </Badge>
                    )}
                  </div>

                  <div className="mt-1 flex items-center gap-2 text-xs text-zinc-400">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {role.start} — {role.end || "Present"}
                    </span>
                  </div>

                  {role.description && (
                    <p className="mt-2 text-sm text-zinc-300">
                      {role.description}
                    </p>
                  )}

                  {role.achievements && role.achievements.length > 0 && (
                    <div className="mt-3">
                      {role.achievements.length > 0 ? (
                        <ul className="space-y-1 text-xs text-zinc-400">
                          {role.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="mt-1.5 h-1 w-1 rounded-full bg-yellow-600 flex-shrink-0" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <ul className="space-y-1 text-xs text-zinc-400">
                          {role.achievements
                            .slice(0, 2)
                            .map((achievement, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="mt-1.5 h-1 w-1 rounded-full bg-yellow-600 flex-shrink-0" />
                                {achievement}
                              </li>
                            ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Show more button */}
        {/* {community.roles.some((role) => role.achievements && role.achievements.length > 2) && (
          <div className="pt-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="border-yellow-700/50 bg-zinc-950 text-yellow-600 hover:bg-zinc-900"
            >
              {expanded ? "Show less" : "Show more achievements"}
            </Button>
          </div>
        )} */}
      </div>
    </motion.article>
  );
}

const defaultCommunities: CommunityItem[] = [
  {
    id: "mlsa-uet",
    name: "MLSA UET Lahore",
    description: "Microsoft Learn Student Ambassadors, UET",
    website: "https://studentambassadors.microsoft.com/",
    status: "completed",
    tags: [
      "Designing",
      "Creativity",
      "Technology",
      "Leadership",
      "Team Management",
    ],
    impactMetrics: [
      { label: "Events Organized", value: "35+" },
      { label: "Students Reached", value: "1000+" },
    ],
    roles: [
      {
        title: "Chair Creative Teams",
        start: "Oct 2024",
        end: "March 2025",
        description:
          "Led the entire MLSA chapter's creative teams part, overseeing all creative and graphics initiatives.",
        achievements: [
          "Increased chapter membership by 200% during tenure",
          "Organized 35+ Events",
          "Established partnerships with 2 local tech communities",
          "Lead a team of 20+ members",
        ],
      },
      {
        title: "Member Graphics Team",
        start: "May 2024",
        end: "Oct 2024",
        description:
          "Active participant in community events and designed posters technical sessions.",
        achievements: [
          "Completed MLSA ",
          "Participated in 10+ workshops",
          "Contributed to community events and initiatives",
        ],
      },
    ],
  },
  {
    id: "youth-empowerment",
    name: "Youth Empowerment Community",
    description: "Empowering young minds through education and mentorship",
    status: "active",
    tags: ["Education", "Mentorship", "Social Impact"],
    impactMetrics: [
      { label: "Students Mentored", value: "1000+" },
      { label: "Events Organized", value: "70+" },
    ],
    roles: [
      {
        title: "Community Lead",
        start: "March 2025",
        end: "Present",
        description:
          "Leading strategic initiatives and community growth programs.",
        achievements: [
          "Launched mentorship program connecting 10+ mentors with youth",
          "Organized weekly skill development workshops",
          "Increased community engagement by 300%",
        ],
      },
      {
        title: "Community Manager",
        start: "Sept 2024",
        end: "Feb 2025",
        description:
          "Managed the complete community by serving as heart of community.",
        achievements: [
          "Lead a team of 30+ members and team leads",
          "Organized 35+ events",
          "Organized educational workshops for local schools",
          "Participated in community outreach programs",
        ],
      },
    ],
  },
];
