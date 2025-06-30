"use client";

import { useState } from "react";
import { EnhancedTextarea } from "../ui/enhanced-textarea";
import {
  MessageSquare,
} from "lucide-react";
import { EnhancedInput } from "@/components/ui/en";
import { Mail, User } from "lucide-react";

export default function GeneralContactForm() {
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <section className="">
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
      <div className="flex flex-col gap-4 mt-2">
        <EnhancedTextarea
          variant="filled"
          label="Quick Notes"
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
        <button>Send Message</button>
      </div>
    </section>
  );
}
