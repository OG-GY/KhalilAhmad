"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CustomSelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  description?: string;
}

interface CustomSelectProps {
  label?: string;
  options: CustomSelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helperText?: string;
}

export function CustomSelect({
  label,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  helperText,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="w-full max-w-md">
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center justify-between w-full bg-[#131315] text-muted-foreground px-4 py-4 rounded-md shadow-sm hover:border-ring focus:outline-none focus:ring-2 focus:ring-ring/50 transition-all"
        >
          <span className="flex items-center gap-2">
            {selectedOption?.icon}
            {selectedOption?.label || placeholder}
          </span>
          <ChevronDown className={`h-4 w-4 transform transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {isOpen && (
          <ul className="absolute z-10 mt-1 w-full bg-black border border-input rounded-md shadow-lg max-h-60 overflow-auto transition-all animate-in fade-in slide-in-from-top-1">
            {options.map((opt) => (
              <li
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "cursor-pointer px-4 py-2 hover:bg-muted flex items-center gap-2 text-sm",
                  value === opt.value && "bg-muted font-semibold"
                )}
              >
                {opt.icon}
                <span>
                  {opt.label}
                  {opt.description && (
                    <span className="ml-2 text-xs text-muted-foreground">({opt.description})</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      {helperText && <p className="text-xs text-muted-foreground mt-1">{helperText}</p>}
    </div>
  );
}
