"use client";

import { useRef, useState, useEffect } from "react";
import { Send, X, File} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import TextareaAutosize from "react-textarea-autosize";
import { useTheme } from "@/components/theme";
import { cn } from "@/lib/utils";
import chat from "@/lib/gemini";
import MarkMessage from "@/components/Markdown";

interface Message {
  text: string;
  sender: "user" | "bot";
  isComplete: boolean;
}

function ChatBotCard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [file, setFile] = useState<File | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (newMessage.trim()) {
      const userMessage: Message = {
        text: newMessage,
        sender: "user",
        isComplete: true,
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
    let botMessageIndex: number;

    try {
      setMessages((prev: any) => {
        const updated = [
          ...prev,
          { text: "", sender: "bot", isComplete: false },
        ];
        botMessageIndex = updated.length - 1;
        return updated;
      });

      const result = await chat.sendMessageStream(userMessage);
      let accumulatedText = "";

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        accumulatedText += chunkText;

        setMessages((prev) => {
          const updated = [...prev];
          if (updated[botMessageIndex]) {
            updated[botMessageIndex].text = accumulatedText;
          }
          return updated;
        });
      }

      setMessages((prev) => {
        const updated = [...prev];
        if (updated[botMessageIndex]) {
          updated[botMessageIndex].isComplete = true;
        }
        return updated;
      });
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, I encountered an error. Please try again.",
          sender: "bot",
          isComplete: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const removeAttachment = () => setFile(null);

  return (
    <Card
      className={cn(
        " fixed w-full h-[690px] flex flex-col shadow-xl border mt-16",
        theme === "dark"
          ? "bg-black border-gray-800"
          : "bg-white border-gray-200"
      )}
    >
      <CardHeader className="flex-shrink-0 flex flex-row items-center justify-between p-4">
        <h2
          className={cn(
            "text-xl font-semibold pl-6",
            theme === "dark" ? "text-gray-100" : "text-gray-800"
          )}
        >
          ChatBot
        </h2>
      </CardHeader>

      <CardContent className="px-6 md:px-20 flex flex-col h-[calc(100%-5rem)] overflow-hidden">
        <div className="flex-grow overflow-y-auto space-y-4 p-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={cn(
                  "p-3 rounded-md max-w-[80%]",
                  msg.sender === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : cn(
                        "bg-gray-100 dark:bg-gray-800",
                        theme === "dark" ? "text-gray-100" : "text-gray-800"
                      )
                )}
              >
                <MarkMessage text={msg.text}/>
              </div>
            </div>
          ))}

          {isLoading && (
            <div
              className={cn(
                "flex items-center space-x-2",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )}
            >
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current" />
              <span className="text-sm">Generating response...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>

      <div
        className={cn(
          "border-t p-4 sticky bottom-0",
          theme === "dark"
            ? "bg-black border-gray-800"
            : "bg-white border-gray-200"
        )}
      >
        <div
          className={cn(
            "relative flex flex-col w-full rounded-lg transition-colors",
            theme === "dark"
              ? "bg-gray-900 border-gray-700"
              : "bg-gray-50 border-gray-200"
          )}
        >
          {file && (
            <div
              className={cn(
                "p-3 rounded-md flex items-center space-x-2 mb-2",
                theme === "dark" ? "bg-gray-800" : "bg-gray-100"
              )}
            >
              <File
                className={cn(
                  "h-6 w-6",
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                )}
              />
              <span
                className={cn(
                  "text-sm truncate max-w-full",
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                )}
              >
                {file.name}
              </span>
              <button
                onClick={removeAttachment}
                className={cn(
                  "hover:text-gray-200",
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                )}
              >
                <X size={16} />
              </button>
            </div>
          )}

          <div className="relative flex items-center w-full">
            <label
              htmlFor="file-input"
              className={cn(
                "absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )}
            >
              <File className="h-5 w-5" />
            </label>

            <input
              type="file"
              id="file-input"
              className="hidden"
              onChange={handleAttachment}
            />

            <TextareaAutosize
              className={cn(
                "pl-12 flex-grow resize-none bg-transparent py-3 focus:outline-none",
                "placeholder-gray-400 disabled:opacity-50",
                theme === "dark" ? "text-gray-100" : "text-gray-800"
              )}
              placeholder="Send a message or drop a file..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              minRows={1}
              maxRows={6}
              disabled={isLoading}
            />

            <button
              onClick={handleSend}
              disabled={isLoading}
              className={cn(
                "flex items-center justify-center h-10 w-10 mr-3",
                "disabled:opacity-50 transition-colors",
                theme === "dark"
                  ? "text-gray-400 hover:text-gray-200"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ChatBotCard;
