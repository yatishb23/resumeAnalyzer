"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_KEY;

if (!API_KEY) {
  throw new Error("Missing API Key. Ensure GEMINI_KEY is set in environment variables.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

// Get the model instance
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// Export a function to generate content
type PromptType = string | string[];

export const generateContent = async (prompt: PromptType) => {
  const result = await model.generateContent(prompt);
  return result.response.text();
};
