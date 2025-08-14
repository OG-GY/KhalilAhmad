"use client";

import type React from "react";

import { useMemo, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Globe,
  Loader2,
  Mail,
  MessagesSquare,
  Shield,
  Zap,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

type ContactSectionProps = {
  className?: string;
  title?: string;
  subtitle?: string;
  contactEmail?: string;
  schedulingUrl?: string;
};

type FormState = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  url: string;
  message: string;
  consent: boolean;
  company: string; // honeypot
};

type FormErrors = Partial<Record<keyof FormState, string>> & { api?: string };

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export function ContactSection({
  className,
  title = "Contact Me",
  subtitle = "Tell me about your project. I typically reply within 24 hours.",
  contactEmail = "reachkhalilhere@gmail.com",
  schedulingUrl = "#",
}: ContactSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    timeline: "",
    url: "",
    message: "",
    consent: false,
    company: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(
      `New inquiry from ${form.name || "your website"}`
    );
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Project Type: ${form.projectType || "-"}`,
        `Budget: ${form.budget || "-"}`,
        `Timeline: ${form.timeline || "-"}`,
        `URL: ${form.url || "-"}`,
        "",
        "Message:",
        form.message,
      ].join("\n")
    );
    return `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  }, [form, contactEmail]);

  function validate(values: FormState): FormErrors {
    const e: FormErrors = {};
    if (!values.name || values.name.trim().length < 2) {
      e.name = "Please enter your full name.";
    }
    if (!values.email || !/^\S+@\S+\.\S+$/.test(values.email)) {
      e.email = "Please enter a valid email.";
    }
    if (!values.message || values.message.trim().length < 10) {
      e.message = "Please provide more details (at least 10 characters).";
    }
    if (values.url && !/^https?:\/\/.+/i.test(values.url)) {
      e.url = "Please enter a valid URL (https://...).";
    }
    if (!values.consent) {
      e.consent = "Please consent to be contacted.";
    }
    // honeypot: if filled, treat as spam → don't block, but auto-"succeed"
    return e;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const eMap = validate(form);
    setErrors(eMap);

    // Honeypot: if filled, treat as spam (auto-succeed, don't send)
    if (form.company) {
      setSubmitted(true);
      return;
    }

    if (Object.keys(eMap).length > 0) return;

    setSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          projectType: form.projectType,
          budget: form.budget,
          timeline: form.timeline,
          url: form.url,
          message: form.message,
          honeypot: '', // not used, but for API compatibility
        }),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setSubmitted(true);
      } else {
        setErrors((prev) => ({ ...prev, api: result.error || 'Failed to send message.' }));
      }
    } catch (_err) {
      setErrors((prev) => ({ ...prev, api: 'Failed to send message. Please try again later.' }));
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section
        className={cn(
          "w-full rounded-3xl bg-zinc-950 px-6 py-12 text-zinc-100",
          className
        )}
        aria-labelledby="contact-title"
      >
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8">
            {/* Accent elements */}
            <div
              className="absolute left-0 top-6 bottom-6 w-1 rounded-full bg-yellow-600/70"
              aria-hidden="true"
            />
            <div
              className="absolute left-3 top-3 h-1.5 w-1.5 rotate-45 rounded-sm bg-yellow-600"
              aria-hidden="true"
            />

            <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 text-yellow-600">
                  <CheckCircle2 className="h-6 w-6" />
                </span>
                <div>
                  <h2
                    id="contact-title"
                    className="text-xl font-semibold tracking-tight"
                  >
                    Thanks — your message is on its way
                  </h2>
                  <p className="mt-1 text-sm text-zinc-400">
                    I’ll review your details and get back to you within one
                    business day.
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  asChild
                  variant="secondary"
                  className="border-yellow-700/50 bg-zinc-950 text-yellow-600"
                >
                  <Link href={mailtoHref}>Open email draft</Link>
                </Button>
                <Button
                  onClick={() => setSubmitted(false)}
                  className="bg-yellow-600 text-zinc-950 hover:bg-yellow-500"
                >
                  Send another
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn(
        "w-full rounded-3xl bg-zinc-950 px-6 py-12 text-zinc-100 mx-auto max-w-7xl",
        className
      )}
      aria-labelledby="contact-title"
    >
      <header className="mb-8">
        <h1 className="text-6xl font-bold tracking-tight">Contact Me</h1>
        <p className="mt-1 text-sm text-zinc-400">
          What I can help you build — crafted with precision and performance.
        </p>
      </header>

      <div className="l">
        <motion.div
          className="grid gap-10 lg:grid-cols-5"
          variants={containerVariants}
          {...(!shouldReduceMotion
            ? {
                initial: "hidden",
                whileInView: "show",
                viewport: { once: true, amount: 0.15 },
              }
            : {})}
        >
          {/* Left: Info panel */}
          <motion.aside
            variants={itemVariants}
            className={cn(
              "relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 p-7 md:p-8 lg:col-span-2",
              "before:absolute before:left-0 before:top-6 before:bottom-6 before:w-1 before:rounded-full before:bg-yellow-600/70 before:content-['']",
              "after:absolute after:left-3 after:top-3 after:h-1.5 after:w-1.5 after:rotate-45 after:rounded-sm after:bg-yellow-600 after:content-['']"
            )}
            aria-label="Contact information"
          >
            <div className="flex items-start gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 text-yellow-600">
                <MessagesSquare className="h-6 w-6" />
              </span>
              <div>
                <h2
                  id="contact-title"
                  className="text-xl font-semibold tracking-tight"
                >
                  {title}
                </h2>
                <p className="mt-1 text-sm text-zinc-400">{subtitle}</p>
              </div>
            </div>

            <ul
              className="mt-6 space-y-3.5 text-sm text-zinc-300"
              aria-label="Expectations"
            >
              <li className="flex items-start gap-2">
                <Zap
                  className="mt-0.5 h-4 w-4 text-yellow-600"
                  aria-hidden="true"
                />
                <span>Response in 24h, Mon–Fri.</span>
              </li>
              <li className="flex items-start gap-2">
                <CalendarClock
                  className="mt-0.5 h-4 w-4 text-yellow-600"
                  aria-hidden="true"
                />
                <span>
                  Availability: limited for UI/UX, open for Full‑Stack.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Globe
                  className="mt-0.5 h-4 w-4 text-yellow-600"
                  aria-hidden="true"
                />
                <span>Remote worldwide. Timezone friendly.</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield
                  className="mt-0.5 h-4 w-4 text-yellow-600"
                  aria-hidden="true"
                />
                <span>Your details are kept confidential.</span>
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              <Button
                asChild
                variant="secondary"
                className="border-yellow-700/50 bg-zinc-950 text-yellow-600"
              >
                <Link href={`mailto:${contactEmail}`}>
                  <Mail className="mr-1.5 h-4 w-4" />
                  {contactEmail}
                </Link>
              </Button>
              {schedulingUrl !== "#" && (
                <Button
                  asChild
                  className="bg-yellow-600 text-zinc-950 hover:bg-yellow-500"
                >
                  <Link href={schedulingUrl} target="_blank" rel="noreferrer">
                    Book a call
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </motion.aside>

          {/* Right: Form panel */}
          <motion.div
            variants={itemVariants}
            className={cn(
              "relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 p-7 md:p-8 lg:col-span-3",
              "before:absolute before:left-0 before:top-6 before:bottom-6 before:w-1 before:rounded-full before:bg-yellow-600/70 before:content-['']",
              "after:absolute after:left-3 after:top-3 after:h-1.5 after:w-1.5 after:rotate-45 after:rounded-sm after:bg-yellow-600 after:content-['']"
            )}
          >
            <form onSubmit={onSubmit} noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Full name"
                  htmlFor="name"
                  error={errors.name}
                  required
                  input={
                    <Input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      placeholder="Your full name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "error-name" : undefined}
                      className="h-11 bg-zinc-950 text-[15px] text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-yellow-600"
                    />
                  }
                />

                <Field
                  label="Email"
                  htmlFor="email"
                  error={errors.email}
                  required
                  input={
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, email: e.target.value }))
                      }
                      placeholder="you@example.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={
                        errors.email ? "error-email" : undefined
                      }
                      className="h-11 bg-zinc-950 text-[15px] text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-yellow-600"
                    />
                  }
                />

                <Field
                  label="Project type"
                  htmlFor="projectType"
                  input={
                    <select
                      id="projectType"
                      name="projectType"
                      value={form.projectType}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, projectType: e.target.value }))
                      }
                      className={selectClassName}
                    >
                      <option value="">{"Select..."}</option>
                      <option>Full‑Stack Web App</option>
                      <option>Frontend UI</option>
                      <option>API / Integrations</option>
                      <option>UI/UX Design</option>
                      <option>Other</option>
                    </select>
                  }
                />

                <Field
                  label="Budget"
                  htmlFor="budget"
                  input={
                    <select
                      id="budget"
                      name="budget"
                      value={form.budget}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, budget: e.target.value }))
                      }
                      className={selectClassName}
                    >
                      <option value="">{"Select..."}</option>
                      <option>Less than $1k</option>
                      <option>$1k–$5k</option>
                      <option>$5k–$10k</option>
                      <option>$10k+</option>
                      <option>Undisclosed</option>
                    </select>
                  }
                />

                <Field
                  label="Timeline"
                  htmlFor="timeline"
                  input={
                    <select
                      id="timeline"
                      name="timeline"
                      value={form.timeline}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, timeline: e.target.value }))
                      }
                      className={selectClassName}
                    >
                      <option value="">{"Select..."}</option>
                      <option>ASAP</option>
                      <option>1–2 months</option>
                      <option>3+ months</option>
                    </select>
                  }
                />

                <Field
                  label="Reference URL (optional)"
                  htmlFor="url"
                  error={errors.url}
                  input={
                    <Input
                      id="url"
                      name="url"
                      type="url"
                      value={form.url}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, url: e.target.value }))
                      }
                      placeholder="https://example.com"
                      aria-invalid={!!errors.url}
                      aria-describedby={errors.url ? "error-url" : undefined}
                      className="h-11 bg-zinc-950 text-[15px] text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-yellow-600"
                    />
                  }
                />
              </div>

              <div className="mt-4">
                <Label htmlFor="message" className="text-zinc-300">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  placeholder="Tell me about your goals, scope, deadlines, and any constraints."
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? "error-message" : undefined
                  }
                  className="mt-2.5 min-h-[160px] bg-zinc-950 text-[15px] text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-yellow-600"
                />
                {errors.message && (
                  <p id="error-message" className="mt-1 text-xs text-red-500">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Consent + actions */}
              <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="consent"
                    checked={form.consent}
                    onCheckedChange={(v) =>
                      setForm((f) => ({ ...f, consent: Boolean(v) }))
                    }
                    className="h-5 w-5 data-[state=checked]:bg-yellow-600 data-[state=checked]:border-yellow-600"
                  />
                  <div>
                    <Label htmlFor="consent" className="text-zinc-300">
                      I consent to be contacted about my inquiry
                    </Label>
                    {errors.consent && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.consent}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2.5">
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="bg-yellow-600 text-zinc-950 hover:bg-yellow-500"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send message
                        <ArrowRight className="ml-1.5 h-4 w-4" />
                      </>
                    )}
                  </Button>
                  <Button
                    asChild
                    variant="secondary"
                    className="border-yellow-700/50 bg-zinc-950 text-yellow-600"
                  >
                    <Link href={mailtoHref}>Use email app</Link>
                  </Button>
                </div>
              </div>

              {/* Honeypot */}
              <div className="sr-only" aria-hidden="true">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  value={form.company}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, company: e.target.value }))
                  }
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Status */}
              <div className="mt-3" aria-live="polite" aria-atomic="true">
                {(errors.name || errors.email) && (
                  <p className="text-xs text-zinc-400">
                    Please correct the highlighted fields and try again.
                  </p>
                )}
                {errors.api && (
                  <p className="text-xs text-red-500">{errors.api}</p>
                )}
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  input,
  error,
  required,
}: {
  label: string;
  htmlFor: string;
  input: React.ReactNode;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <Label
        htmlFor={htmlFor}
        className="mb-2 block text-sm font-medium text-zinc-300"
      >
        {label} {required && <span className="text-yellow-600">*</span>}
      </Label>
      <div className="mt-0">{input}</div>
      {error && (
        <p id={`error-${htmlFor}`} className="mt-1.5 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

const selectClassName =
  "w-full h-11 rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-[15px] text-zinc-100 outline-none ring-offset-0 transition-colors placeholder:text-zinc-500 focus-visible:ring-2 focus-visible:ring-yellow-600";
