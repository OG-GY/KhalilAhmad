"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, User, Bot, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function PortfolioChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await fetch("/api/portfolio-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const botResponse = await response.text();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: botResponse,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const quickTopics = ["Skills", "Projects", "Experience", "Contact"];

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <div className="relative group">
          {/* Pulsing Ring */}
          <div className="absolute inset-0 rounded-full bg-yellow-600/20 animate-ping" />
          <div className="absolute inset-0 rounded-full bg-yellow-600/10 animate-pulse" />

          {/* Main Button */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "relative h-14 w-14 rounded-full border border-zinc-800 bg-zinc-900 shadow-2xl transition-all duration-300",
                "hover:bg-zinc-800 hover:border-yellow-600/50",
                "before:absolute before:left-0 before:top-3 before:bottom-3 before:w-1 before:rounded-full before:bg-yellow-600/70 before:content-['']",
                "after:absolute after:left-2 after:top-2 after:h-1.5 after:w-1.5 after:rotate-45 after:rounded-sm after:bg-yellow-600 after:content-['']"
              )}
            >
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                {isOpen ? (
                  <X className="h-6 w-6 text-yellow-600" />
                ) : (
                  <MessageCircle className="h-6 w-6 text-yellow-600" />
                )}
              </motion.div>
            </Button>
          </motion.div>

          {/* Notification Badge */}
          <AnimatePresence>
            {!isOpen && messages.length === 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-2 -right-2 h-6 w-6 bg-yellow-600 rounded-full flex items-center justify-center border-2 border-zinc-950"
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="text-xs text-zinc-950 font-bold"
                >
                  !
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "fixed bottom-24 right-8 z-40 w-96 h-[500px]",
              "bg-zinc-950 backdrop-blur-xl rounded-2xl shadow-2xl border border-zinc-800",
              "overflow-hidden",
              // Signature design elements
              "before:absolute before:left-0 before:top-6 before:bottom-6 before:w-1 before:rounded-full before:bg-yellow-600/70 before:content-['']",
              "after:absolute after:left-3 after:top-3 after:h-1.5 after:w-1.5 after:rotate-45 after:rounded-sm after:bg-yellow-600 after:content-['']"
            )}
          >
            {/* Header */}
            <div className="border-b border-zinc-800 p-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg border border-zinc-800 bg-zinc-900 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-medium text-zinc-100">
                    OGGY - Portfolio Assistant
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Hey this is OGGY - Khalil's assistant
                  </p>
                </div>
                <div className="ml-auto">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto py-4 px-4 space-y-4 h-80 bg-zinc-950/50">
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-6"
                >
                  <div className="mb-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 mb-3">
                      <Sparkles className="h-6 w-6 text-yellow-600" />
                    </div>
                    <h4 className="font-semibold text-zinc-100 mb-2">
                      Hello! 👋
                    </h4>
                    <p className="text-zinc-300 text-sm leading-relaxed max-w-xs mx-auto mb-4">
                      I'm here to help you learn about Khalil Ahmad - Full Stack
                      Developer specializing in modern web technologies.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {quickTopics.map((topic, index) => (
                      <motion.button
                        key={topic}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="px-3 py-1.5 bg-zinc-900 text-yellow-600 rounded-lg text-xs font-medium border border-zinc-800 hover:bg-zinc-800 hover:border-yellow-600/50 transition-all"
                        onClick={() =>
                          setInput(
                            `Tell me about Khalil's ${topic.toLowerCase()}`
                          )
                        }
                      >
                        {topic}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "flex items-start space-x-3",
                    message.role === "user"
                      ? "flex-row-reverse space-x-reverse"
                      : "flex-row"
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border",
                      message.role === "user"
                        ? "bg-yellow-600 border-yellow-600 text-zinc-950"
                        : "bg-zinc-900 border-zinc-800 text-yellow-600"
                    )}
                  >
                    {message.role === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>

                  <div
                    className={cn(
                      "max-w-[75%] px-3 py-2 rounded-xl border",
                      message.role === "user"
                        ? "bg-yellow-600 text-zinc-950 border-yellow-600 rounded-tr-sm"
                        : "bg-zinc-900 text-zinc-100 border-zinc-800 rounded-tl-sm"
                    )}
                  >
                    {message.role === "assistant" ? (
                      <div className="text-xs sm:text-xs prose prose-invert prose-sm max-w-none [&>*]:text-zinc-100 [&>p]:leading-relaxed [&>p]:mb-2 [&>ul]:mb-2 [&>ol]:mb-2 [&>h1]:text-zinc-100 [&>h2]:text-zinc-100 [&>h3]:text-zinc-100 [&>code]:text-yellow-400 [&>code]:bg-zinc-800 [&>code]:px-1 [&>code]:py-0.5 [&>code]:rounded">
                      <ReactMarkdown>
                        {message.content}
                      </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-xs sm:text-xs leading-relaxed whitespace-pre-wrap">
                      {message.content}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start space-x-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl rounded-tl-sm">
                    <div className="flex space-x-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-yellow-600 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 1,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="border-t border-zinc-800 p-4">
              <form onSubmit={handleSubmit} className="flex space-x-3">
                <div className="flex-1 relative">
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask about Khalil's skills, projects..."
                    className={cn(
                      "w-full rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-100 placeholder:text-zinc-400",
                      "focus:border-yellow-600 focus:ring-2 focus:ring-yellow-600/20 transition-all duration-300",
                      "pl-4 pr-12 py-3 text-sm"
                    )}
                    disabled={isLoading}
                  />
                  <Sparkles className="absolute right-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-yellow-600 animate-pulse" />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className={cn(
                    "rounded-lg w-12 h-12 p-0 transition-all duration-300",
                    "bg-yellow-600 hover:bg-yellow-500 text-zinc-950",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "border border-yellow-600"
                  )}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>

              <p className="text-xs text-zinc-500 mt-2 text-center">
                Powered by AI • Press Enter to send
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Responsive Styles */}
      <style jsx global>{`
        @media (max-width: 640px) {
          .fixed.bottom-24.right-8 {
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
  );
}
