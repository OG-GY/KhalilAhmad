"use client";

import { Globe } from "lucide-react";
import { useState } from "react";
import { EnhancedTextarea } from "../ui/enhanced-textarea";
import { MessageSquare } from "lucide-react";
import { EnhancedInput } from "@/components/ui/en";
import { Mail, User } from "lucide-react";
import { CustomSelect } from "@/components/ui/Custom-Select";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  description?: string;
  group?: string;
  color?: string;
}

export default function GeneralContactForm() {
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [notes, setNotes] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");

  const projecttype = [
    {
      value: "us",
      label: "Full Stack Web Development",
      icon: <Globe className="h-4 w-4" />,
      description: "North America",
    },
    {
      value: "uk",
      label: "Frontend Development",
      icon: <Globe className="h-4 w-4" />,
      description: "Europe",
    },
    {
      value: "in",
      label: "UI/UX Design",
      icon: <Globe className="h-4 w-4" />,
      description: "Asia",
    },
    {
      value: "webs",
      label: "Web Scraping",
      icon: <Globe className="h-4 w-4" />,
      description: "Asia",
    },
  ];

  const budgettype = [
    {
      value: "50",
      label: "Under $50",
      icon: <Globe className="h-4 w-4" />,
      description: "North America",
    },
    {
      value: "100",
      label: "$100-$200",
      icon: <Globe className="h-4 w-4" />,
      description: "Europe",
    },
    {
      value: "200",
      label: "$200-$500",
      icon: <Globe className="h-4 w-4" />,
      description: "Asia",
    },
    {
      value: "500",
      label: "$500-$1000",
      icon: <Globe className="h-4 w-4" />,
      description: "Asia",
    },
    {
      value: "1000",
      label: "$1000+",
      icon: <Globe className="h-4 w-4" />,
      description: "Asia",
    },
    // Add more...
  ];

  const timelinetype = [
    {
      value: "10",
      label: "10 Days",
      icon: <Globe className="h-4 w-4" />,
      description: "North America",
    },
    {
      value: "20",
      label: "20 Days",
      icon: <Globe className="h-4 w-4" />,
      description: "Europe",
    },
    {
      value: "1",
      label: "1 Month",
      icon: <Globe className="h-4 w-4" />,
      description: "Asia",
    },
    {
      value: "2",
      label: "2-3 Months",
      icon: <Globe className="h-4 w-4" />,
      description: "Asia",
    },
    {
      value: "3",
      label: "3+ Month",
      icon: <Globe className="h-4 w-4" />,
      description: "Asia",
    },
    // Add more...
  ];

  return (
    <section className="mt-4">
      <div className="flex gap-8">
        <EnhancedInput
          variant="filled"
          size="lg"
          type="email"
          label="Email"
          leftIcon={<Mail className="h-4 w-4" />}
          showClearButton
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter your email"
        />

        <EnhancedInput
          variant="filled"
          size="lg"
          type="text"
          label="Name"
          leftIcon={<User className="h-4 w-4" />}
          showClearButton
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex gap-8 ">
        <CustomSelect
          options={projecttype}
          value={type}
          onChange={(val) => setType(val)}
          placeholder="Project Type"
        />
        <CustomSelect
          options={budgettype}
          value={budget}
          placeholder="Project Budget"
          onChange={(val) => setBudget(val)}
        />
        <CustomSelect
          options={timelinetype}
          value={timeline}
          placeholder="Timeline"
          onChange={(val) => setTimeline(val)}
        />
      </div>
      <div className="flex flex-col gap-4 mt-8">
        <EnhancedTextarea
          variant="filled"
          label="Description"
          leftIcon={<MessageSquare className="h-4 w-4" />}
          showClearButton
          showExpandButton
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Jot down your ideas..."
          minRows={6}
          maxRows={6}
          showCharacterCount
          maxLength={1000}
          autoResize={false}
        />
      </div>
      <div className="flex items-center justify-center">
        <button className="cursor-pointer border-2 border-amber-400 text-amber-400 px-3 py-2 rounded-sm hover:bg-amber-400 hover:text-black transition">Send Message</button>
      </div>
    </section>
  );
}
