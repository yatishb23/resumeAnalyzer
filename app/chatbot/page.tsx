"use client";

import type React from "react";

import { useRef, useState, useEffect } from "react";
import {
  Send,
  Paperclip,
  Bot,
  User,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import TextareaAutosize from "react-textarea-autosize";
import { cn } from "@/lib/utils";
import chat from "@/lib/gemini";
import MarkMessage from "@/components/Markdown";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  isComplete: boolean;
  timestamp: Date;
}

function ChatBotCard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const handleSend = async () => {
    if (newMessage.trim() && !isLoading) {
      const userMessage: Message = {
        id: generateId(),
        text: newMessage,
        sender: "user",
        isComplete: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setNewMessage("");
      await botMessage(newMessage);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const botMessage = async (userMessage: string) => {
    setIsLoading(true);
    const botMessageId = generateId();

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
      ]);

      const result = await chat.sendMessageStream(userMessage);
      let accumulatedText = "";

      for await (const chunk of result.stream) {
        const chunkText = chunk.text ?? "";
        accumulatedText += chunkText;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessageId ? { ...msg, text: accumulatedText } : msg,
          ),
        );
      }

      // Mark as complete
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId ? { ...msg, isComplete: true } : msg,
        ),
      );
    } catch (error) {
      console.error("Error generating response:", error);
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
      );
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const regenerateResponse = (messageId: string) => {
    const messageIndex = messages.findIndex((msg) => msg.id === messageId);
    if (messageIndex > 0) {
      const previousUserMessage = messages[messageIndex - 1];
      if (previousUserMessage.sender === "user") {
        // Remove the bot message and regenerate
        setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
        botMessage(previousUserMessage.text);
      }
    }
  };

  return (
    <div className="fixed inset-x-0 top-16 bottom-0 bg-background text-foreground flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-border bg-background px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">Bob</h1>
              <p className="text-xs text-muted-foreground">
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
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Bot className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">
                How can I help you today?
              </h2>
              <p className="text-muted-foreground mb-8">
                I&apos;m here to assist you with questions, provide information,
                and help with various tasks.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-lg mx-auto">
                {[
                  "Explain a complex topic",
                  "Help with writing",
                  "Analyze data or code",
                  "Creative brainstorming",
                ].map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setNewMessage(suggestion)}
                    className="p-3 text-left border border-border rounded-lg hover:bg-muted transition-colors"
                  >
                    <span className="text-sm text-foreground">
                      {suggestion}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Messages
          <div className="pb-6">
            {messages.map((message) => (
              <div key={message.id} className={cn("group relative")}>
                <div className="max-w-3xl mx-auto px-4 py-6">
                  <div className="flex space-x-4">
                    {/* Avatar */}
                    <div className="flex-shrink-0 mt-1">
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center",
                          message.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted",
                        )}
                      >
                        {message.sender === "user" ? (
                          <User className="w-4 h-4" />
                        ) : (
                          <Bot className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>

                    {/* Message Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium text-foreground">
                          {message.sender === "user" ? "You" : "Bob"}
                        </span>
                      </div>

                      <div className="prose prose-sm max-w-none text-foreground leading-relaxed">
                        {message.text ? (
                          <MarkMessage text={message.text} />
                        ) : (
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-75"></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-150"></div>
                          </div>
                        )}
                      </div>

                      {/* Message Actions */}
                      {message.sender === "bot" && (
                        <div className="flex items-center space-x-1 mt-3 transition-opacity">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 w-7 p-0 hover:bg-muted"
                                  onClick={() => copyToClipboard(message.text)}
                                  disabled={!message.text}
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
                                  className="h-7 w-7 p-0 hover:bg-muted"
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
                                  className="h-7 w-7 p-0 hover:bg-muted"
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
                                  className="h-7 w-7 p-0 hover:bg-muted"
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
      <div className="flex-shrink-0 border-t border-border bg-background">
        <div className="max-w-3xl mx-auto p-4">
          <div className="relative">
            <div className="flex items-end space-x-3 bg-background border border-border rounded-2xl shadow-sm focus-within:border-foreground/30 transition-colors">
              <div className="flex-1 min-h-[44px]">
                <TextareaAutosize
                  ref={textareaRef}
                  className="w-full resize-none bg-transparent px-4 py-3 focus:outline-none placeholder-muted-foreground text-foreground"
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
                  className="h-8 w-8 p-0 hover:bg-muted"
                >
                  <Paperclip className="h-4 w-4 text-muted-foreground" />
                </Button>

                <Button
                  onClick={handleSend}
                  disabled={isLoading || !newMessage.trim()}
                  size="sm"
                  className={cn(
                    "h-8 w-8 p-0 rounded-lg transition-all",
                    newMessage.trim() && !isLoading
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : "bg-muted text-muted-foreground cursor-not-allowed",
                  )}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <p className="text-xs text-muted-foreground mt-2 text-center">
            AI can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChatBotCard;
