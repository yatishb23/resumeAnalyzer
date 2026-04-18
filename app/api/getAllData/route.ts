import { NextRequest, NextResponse } from "next/server";
import { fetchORC } from "@/lib/gemini";

export const maxDuration = 60;

const ANALYSIS_TIMEOUT_MS = 45_000;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { base64String, jobDescription } = body;

    if (!base64String) {
      return NextResponse.json(
        { message: "No PDF data provided" },
        { status: 400 },
      );
    }

    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(
        () => reject(new Error("ANALYSIS_TIMEOUT")),
        ANALYSIS_TIMEOUT_MS,
      );
    });

    const AiFeedback = await Promise.race([
      fetchORC(base64String, jobDescription),
      timeoutPromise,
    ]);

    return NextResponse.json(AiFeedback);
  } catch (error) {
    console.error("Error fetching issue count:", error);

    if (error instanceof Error && error.message === "ANALYSIS_TIMEOUT") {
      return NextResponse.json(
        {
          message:
            "Analysis is taking longer than expected. Please try again with a shorter job description or a smaller file.",
        },
        { status: 504 },
      );
    }

    return NextResponse.json(
      { message: "Failed to fetch issue count" },
      { status: 500 },
    );
  }
}
