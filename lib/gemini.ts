import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
  type SafetySetting,
} from "@google/generative-ai";

// Define safety settings with proper TypeScript types
const safetySettings: SafetySetting[] = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];

// Initialize Google Generative AI with environment variable
const API_KEY = process.env.GEMINI_KEY;

if (!API_KEY) {
  throw new Error(
    "Missing API Key. Ensure GEMINI_KEY is set in environment variables."
  );
}

const genAI = new GoogleGenerativeAI(API_KEY);

// Configure model with TypeScript type assertion
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  safetySettings,
});

// Start chat with typed history
const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [{ text: "Hello" }],
    },
    {
      role: "model",
      parts: [{ text: "Great to meet you. What would you like to know?" }],
    },
  ],
});

export default chat;
