"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, User, Bot, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function PortfolioChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setIsTyping(true)

    try {
      const response = await fetch("/api/portfolio-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(msg => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const botResponse = await response.text()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: botResponse,
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      setIsTyping(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="relative group">
          {/* Pulsing Ring */}
          <div className="absolute inset-0 rounded-full bg-amber-500/30 animate-ping" />
          <div className="absolute inset-0 rounded-full bg-amber-500/20 animate-pulse" />

          {/* Main Button */}
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "cursor-pointer relative h-12 w-12 rounded-full shadow-2xl transition-all duration-500 ease-out",
              "bg-amber-500 hover:bg-amber-400 border-2 border-amber-400/50",
              "transform hover:scale-110 active:scale-95",
              "before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity",
              isOpen ? "rotate-180 scale-110" : "rotate-0",
            )}
          >
            <div className="relative z-10">
              {isOpen ? <X className="h-7 w-7 text-black" /> : <MessageCircle className="h-7 w-7 text-black" />}
            </div>
          </Button>

          {/* Notification Badge */}
          {!isOpen && messages.length === 0 && (
            <div className="absolute -top-2 -left-2 h-6 w-6 bg-amber-500 rounded-full flex items-center justify-center animate-bounce border-2 border-black">
              <span className="text-xs text-black font-bold">!</span>
            </div>
          )}
        </div>
      </div>

      {/* Chat Interface */}
      <div
        className={cn(
          "fixed bottom-28 right-8 z-40 w-96 h-[500px] transition-all duration-700 ease-out",
          "bg-black/95 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-amber-500/30",
          "transform origin-bottom-right overflow-hidden",
          isOpen
            ? "scale-100 opacity-100 translate-y-0 translate-x-0"
            : "scale-75 opacity-0 translate-y-12 translate-x-8 pointer-events-none",
        )}
      >
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto py-6 px-2 space-y-4 h-96 bg-black/50">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-lg animate-pulse" />
              </div>
              <h4 className="font-semibold text-white mb-2">Hello! 👋</h4>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xs mx-auto mb-4">
                I&apos;m here to help you learn about Khalil Ahmad - Full Stack Developer specializing in modern web
                technologies.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {["Skills", "Projects", "Experience", "Contact"].map((topic) => (
                  <span
                    key={topic}
                    className="px-3 py-1 bg-amber-500/10 text-amber-500 rounded-lg text-xs font-medium border border-amber-500/20 hover:bg-amber-500/20 transition-colors cursor-pointer"
                    onClick={() => setInput(`Tell me about Khalil's ${topic.toLowerCase()}`)}
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start space-x-1 animate-in slide-in-from-bottom-2 duration-300",
                message.role === "user" ? "flex-row-reverse space-x-reverse" : "flex-row",
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border",
                  message.role === "user"
                    ? "bg-amber-500/70 border-amber-400/70 text-black"
                    : "bg-gray-800 border-amber-500/30 text-amber-500",
                )}
              >
                {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>

              <div
                className={cn(
                  "max-w-[75%] px-2 py-1 rounded-xl border",
                  message.role === "user"
                    ? "bg-amber-500 text-black border-amber-400 rounded-tr-sm"
                    : "bg-gray-900 text-white border-gray-700 rounded-tl-sm",
                )}
              >
                <p className="text-xs leading-relaxed whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start space-x-3 animate-in slide-in-from-bottom-2">
              <div className="w-8 h-8 rounded-lg bg-gray-800 border border-amber-500/30 flex items-center justify-center">
                <Bot className="h-4 w-4 text-amber-500" />
              </div>
              <div className="bg-gray-900 border border-gray-700 p-3 rounded-xl rounded-tl-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  />
                  <div
                    className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <div className="p-2 border-t border-amber-500/20">
          <form onSubmit={handleSubmit} className="flex space-x-3">
            <div className="flex-1 relative">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask about Khalil's skills, projects..."
                className={cn(
                  "w-full rounded-md border-2 border-gray-700 bg-black/50 text-white placeholder:text-gray-400",
                  "focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300",
                  "pl-4 pr-12 py-3 text-sm",
                )}
                disabled={isLoading}
              />
              <Sparkles className="absolute right-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-500 animate-pulse" />
            </div>

            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className={cn(
                "rounded-xl w-12 h-12 p-0 transition-all duration-300",
                "bg-amber-500 hover:bg-amber-400 text-black",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "transform hover:scale-105 active:scale-95",
                "border-2 border-amber-400/50",
              )}
            >
              <Send className="h-3 w-3" />
            </Button>
          </form>

          <p className="text-xs text-gray-500 mt-0 text-center">Powered by AI • Press Enter to send</p>
        </div>
      </div>

      {/* Mobile Responsive Adjustments */}
      <style jsx global>{`
        @media (max-width: 640px) {
          .fixed.bottom-28.right-8 {
            width: calc(100vw - 2rem);
            right: 1rem;
            left: 1rem;
            height: 500px;
          }
          
          .fixed.bottom-8.right-8 {
            bottom: 1rem;
            right: 1rem;
          }
        }
      `}</style>
    </>
  )
}
