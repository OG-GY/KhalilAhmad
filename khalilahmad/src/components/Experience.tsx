"use client";

import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, Building2, Globe, ArrowUpRight } from "lucide-react";

type LocationType = "remote" | "onsite" | "hybrid";

export type Role = {
  title: string;
  start: string; // free-form: "Jan 2022"
  end?: string; // "Present" or a date string
  locationType?: LocationType;
  location?: string; // city or "Remote"
  highlights?: string[]; // short bullets
};

export type ExperienceItem = {
  id: string;
  org: string;
  orgUrl?: string;
  locationType?: LocationType; // default for roles if not set individually
  roles: Role[];
  tags?: string[]; // optional tags like "Volunteer", "Community"
};

export type ExperienceSectionProps = {
  items?: ExperienceItem[];
  title?: string;
  subtitle?: string;
  className?: string;
  defaultCollapsedCount?: number; // number of roles to show before "Show more"
};

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export function ExperienceSection({
  items = defaultExperiences,
  title = "Experience",
  subtitle = "Growth through real work — roles, promotions, and impact.",
  className,
  defaultCollapsedCount = 2,
}: ExperienceSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className={cn(
        "w-full rounded-3xl bg-zinc-950 px-6 py-12 text-zinc-100",
        className
      )}
      aria-labelledby="experience-title"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <h2
            id="experience-title"
            className="text-2xl font-semibold tracking-tight"
          >
            {title}
          </h2>
          <p className="mt-1 text-sm text-zinc-400">{subtitle}</p>
        </header>

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
              <TimelineItem
                key={item.id}
                item={item}
                index={idx}
                defaultCollapsedCount={defaultCollapsedCount}
              />
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  item,
  index,
  defaultCollapsedCount,
}: {
  item: ExperienceItem;
  index: number;
  defaultCollapsedCount: number;
}) {
  const [expanded, setExpanded] = useState(false);

  const visibleRoles = expanded
    ? item.roles
    : item.roles.slice(0, defaultCollapsedCount);
  const hasMore = item.roles.length > visibleRoles.length;

  const orgIcon =
    item.locationType === "onsite"
      ? Building2
      : item.locationType === "remote"
      ? Globe
      : Briefcase;

  return (
    <motion.li className="relative pl-10" variants={itemVariants}>
      {/* Node dot on the rail (desktop) */}
      <span className="absolute left-2 top-6 hidden h-3 w-3 -translate-x-1/2 rounded-full bg-yellow-600 sm:block" />

      <article
        className={cn(
          "group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5",
          "transition-colors duration-200 hover:bg-zinc-900 focus-within:bg-zinc-900",
          "focus-within:ring-2 focus-within:ring-yellow-600/40",
          // Left accent bar
          "before:absolute before:left-0 before:top-4 before:bottom-4 before:w-1 before:rounded-full before:bg-yellow-600/70 before:content-['']",
          // Corner micro-mark
          "after:absolute after:left-3 after:top-3 after:h-1.5 after:w-1.5 after:rotate-45 after:rounded-sm after:bg-yellow-600 after:content-['']"
        )}
        aria-label={`${item.org} experience`}
      >
        <header className="flex items-start gap-3">
          <span
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-lg",
              "border border-zinc-800 bg-zinc-950 text-yellow-600",
              "transition-transform duration-200 group-hover:-translate-y-0.5"
            )}
            aria-hidden="true"
          >
            <orgIcon className="h-5 w-5" />
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-base font-semibold text-zinc-100">
                {item.org}
              </h3>
              {item.orgUrl ? (
                <Badge
                  asChild
                  variant="secondary"
                  className="border-yellow-700/50 bg-zinc-950 text-yellow-600"
                >
                  <Link
                    href={item.orgUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${item.org} website`}
                  >
                    Visit <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </Badge>
              ) : null}
              {item.tags?.map((t) => (
                <Badge
                  key={t}
                  variant="secondary"
                  className="border-zinc-800 bg-zinc-950 text-zinc-300"
                >
                  {t}
                </Badge>
              ))}
            </div>

            {/* Roles list */}
            <div className="mt-3 space-y-3">
              {visibleRoles.map((role, i) => (
                <RoleRow
                  key={role.title + role.start + i}
                  role={role}
                  fallbackLocType={item.locationType}
                />
              ))}
            </div>

            {/* Show more / less */}
            {hasMore && (
              <div className="mt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setExpanded((v) => !v)}
                  className="border-yellow-700/50 bg-zinc-950 text-yellow-600"
                >
                  {expanded
                    ? "Show less"
                    : `Show ${item.roles.length - visibleRoles.length} more`}
                </Button>
              </div>
            )}
          </div>
        </header>
      </article>
    </motion.li>
  );
}

function RoleRow({
  role,
  fallbackLocType,
}: {
  role: Role;
  fallbackLocType?: LocationType;
}) {
  const locType = role.locationType || fallbackLocType;
  const LocIcon =
    locType === "onsite" ? Building2 : locType === "remote" ? Globe : Briefcase;

  return (
    <div className="relative rounded-lg border border-zinc-800 bg-zinc-950/60 p-3">
      {/* inner rail and node */}
      <div
        className="absolute left-3 top-3 bottom-3 w-px bg-zinc-800"
        aria-hidden="true"
      />
      <span
        className="absolute left-3 top-3 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-yellow-600"
        aria-hidden="true"
      />

      <div className="pl-6">
        <div className="flex flex-wrap items-center gap-2">
          <h4 className="text-sm font-medium text-zinc-100">{role.title}</h4>
          {role.end?.toLowerCase() === "present" && (
            <Badge className="h-5 border-yellow-700/50 bg-zinc-950 px-1.5 text-[11px] leading-none text-yellow-600">
              Present
            </Badge>
          )}
        </div>
        <div className="mt-0.5 flex flex-wrap items-center gap-3 text-xs text-zinc-400">
          <span className="inline-flex items-center gap-1">
            <LocIcon className="h-3.5 w-3.5 text-yellow-600" />
            <span>
              {role.location
                ? role.location
                : locType === "remote"
                ? "Remote"
                : locType === "onsite"
                ? "On‑site"
                : "Hybrid"}
            </span>
          </span>
          <span className="h-3 w-px bg-zinc-800" aria-hidden="true" />
          <span>
            {role.start} {" — "} {role.end || "—"}
          </span>
        </div>

        {role.highlights && role.highlights.length > 0 && (
          <ul
            className="mt-2 list-disc space-y-1 pl-4 text-xs text-zinc-300"
            aria-label="Highlights"
          >
            {role.highlights.map((h, i) => (
              <li key={h + i} className="leading-snug">
                {h}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/**
 * Defaults derived from your description. Replace dates and add highlights as needed.
 */
const defaultExperiences: ExperienceItem[] = [
  {
    id: "ye",
    org: "Youth Empowerment Community",
    orgUrl: undefined,
    locationType: "remote",
    tags: ["Community"],
    roles: [
      {
        title: "Community Lead",
        start: "2023",
        end: "Present",
        locationType: "remote",
        highlights: [
          "Leading strategy, mentorship, and growth of community programs.",
        ],
      },
      {
        title: "General Secretary",
        start: "2022",
        end: "2023",
        locationType: "remote",
        highlights: [
          "Coordinated programs and managed internal communication.",
        ],
      },
      {
        title: "Team Member",
        start: "2021",
        end: "2022",
        locationType: "remote",
        highlights: ["Supported initiatives and community outreach."],
      },
    ],
  },
  {
    id: "uet-gs",
    org: "UET Game Studio",
    orgUrl: undefined,
    locationType: "onsite",
    tags: ["On‑site"],
    roles: [
      {
        title: "Full‑Stack Web Developer",
        start: "2024",
        end: "Present",
        locationType: "onsite",
        highlights: [
          "Built new features end‑to‑end; improved performance and deployment workflows.",
        ],
      },
      {
        title: "Web Developer",
        start: "2023",
        end: "2024",
        locationType: "onsite",
        highlights: [
          "Developed the studio website; implemented CMS content updates.",
        ],
      },
      {
        title: "UI/UX Designer",
        start: "2022",
        end: "2023",
        locationType: "onsite",
        highlights: [
          "Designed game UI flows and visual systems; conducted quick user tests.",
        ],
      },
    ],
  },
];
