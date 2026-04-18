import { NextRequest, NextResponse } from "next/server";
import { fetchORC } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { base64String, jobDescription } = body;
  
    if (!base64String) {
      return NextResponse.json(
        { error: "No PDF data provided" },
        { status: 400 },
      );
    }

    const AiFeedback = await fetchORC(base64String, jobDescription);
    
    return NextResponse.json(AiFeedback);
  } catch (error) {
    console.error("Error fetching issue count:", error);
    return NextResponse.json(
      { error: "Failed to fetch issue count" },
      { status: 500 },
    );
  }
}
