"use client";

import { useState } from "react";
import { EnhancedTextarea } from "../ui/enhanced-textarea";
import { MessageSquare, Send, CheckCircle, AlertCircle } from "lucide-react";
import { EnhancedInput } from "@/components/ui/en";
import { Mail, User } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  message: string;
  honeypot: string; // Spam protection
}

interface SubmissionState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
}

export default function GeneralContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
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
          error: result.error || 'Failed to send message. Please try again.'
        });
      }
    } catch (error) {
      console.error('Contact form error:', error);
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
        
        <div className="flex flex-col gap-4 mt-2">
          <EnhancedTextarea
            variant="filled"
            label="Quick Notes"
            leftIcon={<MessageSquare className="h-4 w-4" />}
            showClearButton
            showExpandButton
            value={formData.message}
            onChange={updateFormData('message')}
            placeholder="Jot down your ideas..."
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
              <span className="text-sm">Message sent successfully! I&apos;ll get back to you soon.</span>
            </div>
          )}

          <div className="flex items-center justify-center">
            <button 
              type="submit"
              disabled={submission.isSubmitting}
              className={`
                cursor-pointer border-2 border-amber-400 text-black px-6 py-3 rounded-sm 
                bg-amber-400 hover:bg-yellow-400/0 hover:text-yellow-400 
                transition duration-200 flex items-center gap-2 min-w-[140px] justify-center
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
                  Send Message
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
