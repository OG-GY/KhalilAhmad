"use client";

import { Globe, Send, CheckCircle, AlertCircle } from "lucide-react";
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

interface FormData {
  name: string;
  email: string;
  message: string;
  projectType: string;
  budget: string;
  timeline: string;
  honeypot: string; // Spam protection
}

interface SubmissionState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
}

export default function RequestQuoteForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    projectType: "",
    budget: "",
    timeline: "",
    honeypot: ""
  });

  const [submission, setSubmission] = useState<SubmissionState>({
    isSubmitting: false,
    isSuccess: false,
    error: null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Don't submit if already submitting
    if (submission.isSubmitting) return;

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmission({
        isSubmitting: false,
        isSuccess: false,
        error: "Please fill in all required fields."
      });
      return;
    }

    setSubmission({
      isSubmitting: true,
      isSuccess: false,
      error: null
    });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          projectType: formData.projectType,
          budget: formData.budget,
          timeline: formData.timeline,
          honeypot: formData.honeypot // Should be empty
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmission({
          isSubmitting: false,
          isSuccess: true,
          error: null
        });
        
        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          message: "",
          projectType: "",
          budget: "",
          timeline: "",
          honeypot: ""
        });

        // Reset success state after 5 seconds
        setTimeout(() => {
          setSubmission(prev => ({ ...prev, isSuccess: false }));
        }, 5000);

      } else {
        setSubmission({
          isSubmitting: false,
          isSuccess: false,
          error: result.error || 'Failed to send quote request. Please try again.'
        });
      }
    } catch (error) {
      console.error('Quote form error:', error);
      setSubmission({
        isSubmitting: false,
        isSuccess: false,
        error: 'Network error. Please check your connection and try again.'
      });
    }
  };

  const updateFormData = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    
    // Clear error when user starts typing
    if (submission.error) {
      setSubmission(prev => ({ ...prev, error: null }));
    }
  };

  const updateSelectField = (field: keyof FormData) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user makes a selection
    if (submission.error) {
      setSubmission(prev => ({ ...prev, error: null }));
    }
  };

  const projecttype = [
    {
      value: "us",
      label: "Web Development",
      icon: <Globe className="h-4 w-4" />,
    },
    {
      value: "uk",
      label: "Frontend Development",
      icon: <Globe className="h-4 w-4" />,
    },
    {
      value: "in",
      label: "UI/UX Design",
      icon: <Globe className="h-4 w-4" />,
    },
    {
      value: "webs",
      label: "Web Scraping",
      icon: <Globe className="h-4 w-4" />,
    },
  ];

  const budgettype = [
    {
      value: "50",
      label: "> $50",
      icon: <Globe className="h-4 w-4" />,
    },
    {
      value: "100",
      label: "$100-$200",
      icon: <Globe className="h-4 w-4" />,
    },
    {
      value: "200",
      label: "$200-$500",
      icon: <Globe className="h-4 w-4" />,
    },
    {
      value: "500",
      label: "$500-$1000",
      icon: <Globe className="h-4 w-4" />,
    },
    {
      value: "1000",
      label: "$1000+",
      icon: <Globe className="h-4 w-4" />,
    },
    // Add more...
  ];

  const timelinetype = [
    {
      value: "10",
      label: "10D",
      icon: <Globe className="h-4 w-4" />,
    },
    {
      value: "20",
      label: "20D",
      icon: <Globe className="h-4 w-4" />,
    },
    {
      value: "1",
      label: "1M",
      icon: <Globe className="h-4 w-4" />,
    },
    {
      value: "2",
      label: "2M",
      icon: <Globe className="h-4 w-4" />,
    },
    {
      value: "3",
      label: "3+M",
      icon: <Globe className="h-4 w-4" />,
    },
    // Add more...
  ];

  return (
    <section className="py-4">
      <form onSubmit={handleSubmit}>
        {/* Honeypot field - hidden from users, for spam protection */}
        <div style={{ display: 'none' }}>
          <input
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={updateFormData('honeypot')}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="flex gap-8">
          <EnhancedInput
            variant="filled"
            size="lg"
            type="email"
            label="Email"
            leftIcon={<Mail className="h-4 w-4" />}
            showClearButton
            value={formData.email}
            onChange={updateFormData('email')}
            placeholder="Enter your email"
            required
          />

          <EnhancedInput
            variant="filled"
            size="lg"
            type="text"
            label="Name"
            leftIcon={<User className="h-4 w-4" />}
            showClearButton
            value={formData.name}
            onChange={updateFormData('name')}
            placeholder="Enter your name"
            required
          />
        </div>
        
        <div className="flex gap-4 mt-4">
          <div className="flex-[2]">
            <CustomSelect
              options={projecttype}
              value={formData.projectType}
              onChange={updateSelectField('projectType')}
              placeholder="Project Type"
            />
          </div>
          <div className="flex-1">
            <CustomSelect
              options={budgettype}
              value={formData.budget}
              placeholder="Budget"
              onChange={updateSelectField('budget')}
            />
          </div>
          <div className="flex-1">
            <CustomSelect
              options={timelinetype}
              value={formData.timeline}
              placeholder="Timeline"
              onChange={updateSelectField('timeline')}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <EnhancedTextarea
            variant="filled"
            label="Description"
            leftIcon={<MessageSquare className="h-4 w-4" />}
            showClearButton
            showExpandButton
            value={formData.message}
            onChange={updateFormData('message')}
            placeholder="Describe your project requirements..."
            minRows={6}
            maxRows={6}
            showCharacterCount
            maxLength={1000}
            autoResize={false}
            required
          />

          {/* Error Message */}
          {submission.error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm">{submission.error}</span>
            </div>
          )}

          {/* Success Message */}
          {submission.isSuccess && (
            <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg border border-green-200">
              <CheckCircle className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm">Quote request sent successfully! I&apos;ll get back to you soon.</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-center mt-4">
          <button 
            type="submit"
            disabled={submission.isSubmitting}
            className={`
              cursor-pointer border-2 border-amber-400 text-black px-6 py-3 rounded-sm 
              bg-amber-400 hover:bg-yellow-400/0 hover:text-yellow-400 
              transition duration-200 flex items-center gap-2 min-w-[160px] justify-center
              ${submission.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {submission.isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"></div>
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Request Quote
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
