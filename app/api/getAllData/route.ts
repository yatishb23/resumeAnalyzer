import { NextRequest, NextResponse } from "next/server";
import { generateContent } from "@/lib/Summarize";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { scoreResult, jobDescription } = body;

    if (!scoreResult) {
      return NextResponse.json(
        { error: "No PDF data provided" },
        { status: 400 }
      );
    }

    const AiFeedback = await generateContent(
      `${scoreResult} 
        ${jobDescription}
        You are an expert ATS (Applicant Tracking System) and resume analysis system. Analyze the provided resume and job description, then generate a comprehensive analysis in JSON format with the following strict requirements:

1. The output MUST be valid JSON format, matching exactly this structure:
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
    "skills_rating": <integer 0-100>,
    "skills_feedback": [<array of string>],
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
    }
  }
}

Task Instructions:
1. Evaluate the resume against standard ATS criteria and the job description
2. Calculate scores for each category (content, formatting, grammar, skills, style)
3. Identify missing keywords across different categories
4. Provide specific, actionable feedback in each feedback field
5. Ensure all numeric values are within their specified ranges
6. Keep feedback more detailed and informative keep feedback 6-7 lines
7. Include only relevant issues in the issues array
8. Calculate total missing keywords as sum of all missing keyword arrays
9. Ensure matching_percentage reflects overall resume-job fit

Remember: 
- All output must be in valid JSON format
- All arrays must be properly formatted, even if empty
- All string values must be properly escaped
- All numeric values must be integers within specified ranges`
    );

    console.log(NextResponse.json(AiFeedback));

    return NextResponse.json(AiFeedback);
  } catch (error) {
    console.error("Error fetching issue count:", error);
    return NextResponse.json(
      { error: "Failed to fetch issue count" },
      { status: 500 }
    );
  }
}
