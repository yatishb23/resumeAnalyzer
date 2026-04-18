import { GoogleGenAI } from "@google/genai";

// pass API key explicitly OR via env
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_KEY,
});

const RETRYABLE_ERROR_PATTERN =
  /\b(429|500|503|504|UNAVAILABLE|RESOURCE_EXHAUSTED|DEADLINE_EXCEEDED)\b/i;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const isRetryableError = (error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  return RETRYABLE_ERROR_PATTERN.test(message);
};

const withRetry = async <T>(operation: () => Promise<T>, attempts = 3) => {
  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      if (attempt === attempts || !isRetryableError(error)) {
        throw error;
      }

      await delay(1000 * attempt);
    }
  }

  throw lastError;
};

export async function fetchResponse() {
  const response = await withRetry(() =>
    ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Explain how AI works in a few words",
    }),
  );

  console.log(response.text);
}

export async function fetchORC(base64String: string, jobDescription: string) {
  const contents = [
    {
      text: `You are an expert ATS (Applicant Tracking System), resume analysis system, and OCR engine.

Step 1: Perform Optical Character Recognition (OCR) on the provided resume file. Extract and clean all text content accurately. Do NOT include formatting, styling, or extra metadata—only meaningful text.

Step 2: Using the extracted resume text and the provided job description : ${jobDescription}, perform a complete ATS analysis.

Step 3: Return ONLY a valid JSON response in the exact structure below. Do not include explanations, markdown, or extra text outside JSON.

STRICT OUTPUT FORMAT:
{
  "resume_analysis": {
    "ATS_score": <integer 0-100>,
    "issues_count": <integer>,
    "issues": [<array of strings>],
    "content_rating": <integer 0-100>,
    "content_feedback": [<array of string>],
    "formatting_rating": <integer 0-100>,
    "formatting_feedback": [<array of string>],
    "grammar_rating": <integer 0-100>,
    "grammar_feedback": [<array of string>],
    "skills":{
      "skills_rating": <integer 0-100>,
      "skills_feedback": [<array of string>],
      "matching_skills":[<array of string>]
    },
    "keyword_match": <integer 0-100>,
    "style_rating": <integer 0-100>,
    "style_feedback": [<array of string>],
    "matching_percentage": <integer 0-100>,
    "job_description_analysis": {
      "key_strengths": [<array of strings>],
      "areas_for_improvement": [<array of strings>],
      "suggestions": <string>
    },
    "missing_keywords": {
      "hard_skills": [<array of strings>],
      "soft_skills": [<array of strings>],
      "certifications": [<array of strings>],
      "tools_technologies": [<array of strings>],
      "total_missing_keywords": <integer>
    },
    "matching_keywords":[<array of strings>]
  }
}

TASK INSTRUCTIONS:
1. First extract resume text using OCR, then analyze it.
2. Evaluate the resume against ATS best practices and the job description.
3. Calculate all scores (content, formatting, grammar, skills, style, keyword match).
4. Provide detailed, actionable feedback (6–7 lines per feedback section).
5. Identify only relevant issues.
6. Ensure all numbers are integers within given ranges.
7. Ensure matching_percentage reflects overall resume-job fit.
8. Identify missing keywords across all categories.
9. total_missing_keywords = sum of all missing keyword arrays.
10. Return ONLY valid JSON (no extra text).`,
    },
    {
      inlineData: {
        mimeType: "application/pdf",
        data: base64String,
      },
    },
  ];

  const response = await withRetry(() =>
    ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents,
    }),
  );

  return response.text;
}

export async function fetchChat(userMessage: string) {
  const response = await ai.models.generateContentStream({
    model: "gemini-3-flash-preview",
    contents: userMessage,
  });

  for await (const chunk of response) {
    console.log(chunk.text);
  }
}

const chat = {
  sendMessageStream: async (userMessage: string) => {
    const stream = await withRetry(() =>
      ai.models.generateContentStream({
        model: "gemini-3.1-flash-lite-preview",
        contents: userMessage,
      }),
    );

    return { stream };
  },
};

export default chat;
