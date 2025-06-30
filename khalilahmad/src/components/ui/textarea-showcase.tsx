"use client"

import { EnhancedTextarea } from "./enhanced-textarea"
import { MessageSquare, FileText, Edit3, Lightbulb, Star, Code } from "lucide-react"
import { useState } from "react"

export default function TextareaShowcase() {
  const [message, setMessage] = useState("")
  const [feedback, setFeedback] = useState("")
  const [notes, setNotes] = useState("")
  const [review, setReview] = useState("")
  const [code, setCode] = useState("")
  const [longText, setLongText] = useState("")

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Enhanced Textarea Components
        </h1>
        <p className="text-lg text-muted-foreground">
          Auto-resizing, feature-rich textarea components with beautiful animations
        </p>
      </div>

      {/* Default Variant */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Default Variant</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <EnhancedTextarea
            label="Message"
            leftIcon={<MessageSquare className="h-4 w-4" />}
            showClearButton
            showExpandButton
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            helperText="Write your message here"
            placeholder="Type your message..."
            minRows={3}
            maxRows={8}
          />

          <EnhancedTextarea
            label="Feedback"
            leftIcon={<Edit3 className="h-4 w-4" />}
            maxLength={500}
            showCharacterCount
            showClearButton
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            helperText="Share your thoughts with us"
            placeholder="Your feedback is valuable to us..."
            minRows={4}
          />
        </div>
      </section>

      {/* Filled Variant */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Filled Variant</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <EnhancedTextarea
            variant="filled"
            label="Quick Notes"
            leftIcon={<FileText className="h-4 w-4" />}
            showClearButton
            showExpandButton
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Jot down your ideas..."
            minRows={3}
            maxRows={6}
          />

          <EnhancedTextarea
            variant="filled"
            label="Product Review"
            leftIcon={<Star className="h-4 w-4" />}
            success="Thank you for your review!"
            defaultValue="This product exceeded my expectations. The quality is outstanding and the customer service was excellent. I would definitely recommend this to others looking for a reliable solution."
            minRows={4}
          />
        </div>
      </section>

      {/* Underlined Variant */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Underlined Variant</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <EnhancedTextarea
            variant="underlined"
            label="Ideas & Suggestions"
            leftIcon={<Lightbulb className="h-4 w-4" />}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your creative ideas..."
            minRows={3}
          />

          <EnhancedTextarea
            variant="underlined"
            label="Code Snippet"
            leftIcon={<Code className="h-4 w-4" />}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            error="Invalid syntax detected"
            placeholder="Paste your code here..."
            minRows={4}
            className="font-mono"
          />
        </div>
      </section>

      {/* Different Sizes */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Different Sizes</h2>
        <div className="space-y-4">
          <EnhancedTextarea
            size="sm"
            label="Small Textarea"
            leftIcon={<MessageSquare className="h-3 w-3" />}
            placeholder="Small size textarea"
            minRows={2}
            maxRows={4}
          />

          <EnhancedTextarea
            size="md"
            label="Medium Textarea"
            leftIcon={<MessageSquare className="h-4 w-4" />}
            placeholder="Medium size textarea (default)"
            minRows={3}
            maxRows={6}
          />

          <EnhancedTextarea
            size="lg"
            label="Large Textarea"
            leftIcon={<MessageSquare className="h-5 w-5" />}
            placeholder="Large size textarea"
            minRows={4}
            maxRows={8}
          />
        </div>
      </section>

      {/* Advanced Features */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Advanced Features</h2>
        <div className="space-y-6">
          <EnhancedTextarea
            label="Long Form Content"
            leftIcon={<FileText className="h-4 w-4" />}
            maxLength={1000}
            showCharacterCount
            showClearButton
            showExpandButton
            value={longText}
            onChange={(e) => setLongText(e.target.value)}
            helperText="Write a detailed description or article"
            placeholder="Start writing your long-form content here. This textarea will automatically resize as you type and provides character counting with visual feedback..."
            minRows={5}
            maxRows={12}
          />

          <div className="grid md:grid-cols-2 gap-6">
            <EnhancedTextarea
              label="Success State"
              leftIcon={<MessageSquare className="h-4 w-4" />}
              success="Message saved successfully!"
              defaultValue="Your message has been saved and will be processed shortly."
              minRows={3}
            />

            <EnhancedTextarea
              label="Disabled State"
              leftIcon={<FileText className="h-4 w-4" />}
              disabled
              defaultValue="This textarea is disabled and cannot be edited."
              minRows={3}
            />
          </div>
        </div>
      </section>

      {/* No Auto-resize Example */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Fixed Height (No Auto-resize)</h2>
        <EnhancedTextarea
          label="Fixed Height Textarea"
          leftIcon={<Edit3 className="h-4 w-4" />}
          autoResize={false}
          rows={6}
          showClearButton
          placeholder="This textarea has a fixed height and will show scrollbars when content overflows..."
          helperText="Auto-resize is disabled for this textarea"
        />
      </section>
    </div>
  )
}
