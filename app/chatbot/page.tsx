"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Send, Paperclip, Bot, User, Copy, ThumbsUp, ThumbsDown, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import TextareaAutosize from "react-textarea-autosize"
import { cn } from "@/lib/utils"
import chat from "@/lib/gemini"
import MarkMessage from "@/components/Markdown"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  isComplete: boolean
  timestamp: Date
}

function ChatBotCard() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const generateId = () => Math.random().toString(36).substr(2, 9)

  const handleSend = async () => {
    if (newMessage.trim() && !isLoading) {
      const userMessage: Message = {
        id: generateId(),
        text: newMessage,
        sender: "user",
        isComplete: true,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, userMessage])
      setNewMessage("")
      await botMessage(newMessage)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const botMessage = async (userMessage: string) => {
    setIsLoading(true)
    const botMessageId = generateId()

    try {
      // Add initial bot message
      setMessages((prev) => [
        ...prev,
        {
          id: botMessageId,
          text: "",
          sender: "bot",
          isComplete: false,
          timestamp: new Date(),
        },
      ])

      const result = await chat.sendMessageStream(userMessage)
      let accumulatedText = ""

      for await (const chunk of result.stream) {
        const chunkText = chunk.text()
        accumulatedText += chunkText

        setMessages((prev) => prev.map((msg) => (msg.id === botMessageId ? { ...msg, text: accumulatedText } : msg)))
      }

      // Mark as complete
      setMessages((prev) => prev.map((msg) => (msg.id === botMessageId ? { ...msg, isComplete: true } : msg)))
    } catch (error) {
      console.error("Error generating response:", error)
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId
            ? {
                ...msg,
                text: "I apologize, but I encountered an error. Please try again.",
                isComplete: true,
              }
            : msg,
        ),
      )
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const regenerateResponse = (messageId: string) => {
    const messageIndex = messages.findIndex((msg) => msg.id === messageId)
    if (messageIndex > 0) {
      const previousUserMessage = messages[messageIndex - 1]
      if (previousUserMessage.sender === "user") {
        // Remove the bot message and regenerate
        setMessages((prev) => prev.filter((msg) => msg.id !== messageId))
        botMessage(previousUserMessage.text)
      }
    }
  }

  return (
    <div className="fixed inset-0 mt-16 bg-white dark:bg-neutral-900 flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-slate-900 dark:text-white">Bob</h1>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {isLoading ? "Thinking..." : "Ready to help"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          // Welcome Screen
          <div className="h-full flex items-center justify-center">
            <div className="max-w-2xl mx-auto text-center px-4">
              <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bot className="w-8 h-8 text-neutral-600 dark:text-neutral-400" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">How can I help you today?</h2>
              <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                I&apos;m here to assist you with questions, provide information, and help with various tasks.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-lg mx-auto">
                {["Explain a complex topic", "Help with writing", "Analyze data or code", "Creative brainstorming"].map(
                  (suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setNewMessage(suggestion)}
                      className="p-3 text-left border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                    >
                      <span className="text-sm text-neutral-700 dark:text-neutral-300">{suggestion}</span>
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>
        ) : (
          // Messages
          <div className="pb-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "group relative",
                )}
              >
                <div className="max-w-3xl mx-auto px-4 py-6">
                  <div className="flex space-x-4">
                    {/* Avatar */}
                    <div className="flex-shrink-0 mt-1">
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center",
                          message.sender === "user"
                            ? "bg-neutral-900 dark:bg-white"
                            : "bg-neutral-200 dark:bg-neutral-700",
                        )}
                      >
                        {message.sender === "user" ? (
                          <User className="w-4 h-4 text-white dark:text-black" />
                        ) : (
                          <Bot className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
                        )}
                      </div>
                    </div>

                    {/* Message Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                          {message.sender === "user" ? "You" : "Bob"}
                        </span>
                      </div>

                      <div className="prose prose-sm max-w-none text-neutral-800 dark:text-neutral-200 leading-relaxed">
                        {message.text ? (
                          <MarkMessage text={message.text} />
                        ) : (
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-neutral-400 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-neutral-400 rounded-full animate-pulse delay-75"></div>
                            <div className="w-2 h-2 bg-neutral-400 rounded-full animate-pulse delay-150"></div>
                          </div>
                        )}
                      </div>

                      {/* Message Actions */}
                      {message.sender === "bot" && message.isComplete && message.text && (
                        <div className="flex items-center space-x-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 w-7 p-0 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                                  onClick={() => copyToClipboard(message.text)}
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Copy</TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 w-7 p-0 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                                >
                                  <ThumbsUp className="h-3 w-3" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Good response</TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 w-7 p-0 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                                >
                                  <ThumbsDown className="h-3 w-3" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Poor response</TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 w-7 p-0 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                                  onClick={() => regenerateResponse(message.id)}
                                  disabled={isLoading}
                                >
                                  <RotateCcw className="h-3 w-3" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Regenerate</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <div className="max-w-3xl mx-auto p-4">
          <div className="relative">
            <div className="flex items-end space-x-3 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded-2xl shadow-sm focus-within:border-neutral-400 dark:focus-within:border-neutral-500 transition-colors">
              <div className="flex-1 min-h-[44px]">
                <TextareaAutosize
                  ref={textareaRef}
                  className="w-full resize-none bg-transparent px-4 py-3 focus:outline-none placeholder-neutral-500 dark:placeholder-neutral-400 text-neutral-900 dark:text-white"
                  placeholder="Message Bob..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  minRows={1}
                  maxRows={8}
                  disabled={isLoading}
                />
              </div>

              <div className="flex items-center space-x-1 p-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  <Paperclip className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
                </Button>

                <Button
                  onClick={handleSend}
                  disabled={isLoading || !newMessage.trim()}
                  size="sm"
                  className={cn(
                    "h-8 w-8 p-0 rounded-lg transition-all",
                    newMessage.trim() && !isLoading
                      ? "bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black"
                      : "bg-neutral-200 dark:bg-neutral-700 text-neutral-400 dark:text-neutral-500 cursor-not-allowed",
                  )}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 text-center">
            AI can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ChatBotCard
