"use client";

import { useState, useEffect, useCallback } from "react";
import { useTheme } from "./theme";
import { useScore } from "./Context/FileData";
import { useJobDescription } from "./Context/JobDec";
import ATS from "./Content/AtsScore";
import { Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ProfileMatch from "./Content/ProfileMatch";
import ResumeContent from "./ResumeContent";
import SkillsFeedBack from "./SkillsFeedBack";
import StylesFeedBack from "./StylesFeedBack";
import FormatFeedBack from "./FormatFeedBack";
import GrammarFeedBack from "./GrammarFeedBack";

interface AnalysisData {
  ATS_score: number;
  issues_count: number;
  matching_percentage: number;
  missing_keywords: {
    hard_skills: string[];
    soft_skills: string[];
    tools_technologies: string[];
    total_missing_keywords: number;
  };
  job_description_analysis: {
    key_strengths: string[];
    areas_for_improvement: string[];
    suggestions: string;
  };
  skills_rating: number;
  content_rating: number;
  grammar_rating: number;
  formatting_rating: number;
  style_rating: number;
  content_feedback: string[];
  formatting_feedback: string[];
  grammar_feedback: string[];
  style_feedback: string[];
  skills_feedback: string[];
}

interface ApiError {
  message: string;
  details?: string;
}

export default function Feedback() {
  const { scoreResult } = useScore();
  const { jobDescription } = useJobDescription();
  const { theme } = useTheme();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchResumeAnalysis = useCallback(async () => {
    try {
      const response = await fetch("/api/getAllData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scoreResult, jobDescription }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Analysis failed");
      }

      let data = await response.json();
      if (typeof data === "string" && data.length > 6) {
        data = data.slice(7, -4);
      }

      data = JSON.parse(data);
      setAnalysis(data.resume_analysis);
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "Unknown error occurred",
        details: err instanceof Error ? err.stack : undefined,
      });
    } finally {
      setLoading(false);
    }
  }, [scoreResult, jobDescription]);

  useEffect(() => {
    if (scoreResult) {
      fetchResumeAnalysis();
    } else {
      router.push("/");
    }
  }, [scoreResult, fetchResumeAnalysis, router]);

  if (loading) {
    return (
      <div
        className={cn(
          "min-h-screen flex flex-col items-center justify-center pt-16",
          theme === "dark" ? "bg-[#0D0D0D]" : "bg-gray-50"
        )}
      >
        <Loader2 className="w-12 h-12 animate-spin text-[#007BFF] mb-4" />
        <p
          className={cn(
            "animate-pulse",
            theme === "dark" ? "text-gray-400" : "text-gray-700"
          )}
        >
          Analyzing your resume...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={cn(
          "min-h-screen flex flex-col items-center justify-center p-4 text-center pt-16",
          theme === "dark" ? "bg-[#0D0D0D]" : "bg-gray-50"
        )}
      >
        <div
          className={cn(
            "max-w-md space-y-4 p-6 rounded-lg shadow-lg border",
            theme === "dark"
              ? "bg-[#1A1A1A] border-gray-700"
              : "bg-white border-gray-300"
          )}
        >
          <AlertCircle className="w-12 h-12 mx-auto text-red-500" />
          <h2
            className={cn(
              "text-xl font-semibold",
              theme === "dark" ? "text-white" : "text-gray-900"
            )}
          >
            Analysis Failed
          </h2>
          <p
            className={cn(theme === "dark" ? "text-gray-400" : "text-gray-600")}
          >
            {error.message}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-[#007BFF] text-white rounded-lg hover:bg-[#0056b3] transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "min-h-screen w-full pt-16 flex flex-col",
        theme === "dark" ? "bg-[#0D0D0D]" : "bg-gray-50"
      )}
    >
      <div className="flex-1 container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-[400px,1fr] gap-8">
          {analysis && (
            <>
              {/* Left Column */}
              <div className="flex flex-col gap-3">
                <div
                  className={cn(
                    "pt-6 pl-6 pr-6 rounded-xl shadow-lg border",
                    theme === "dark"
                      ? "bg-[#1A1A1A] border-gray-700"
                      : "bg-white border-gray-300"
                  )}
                >
                  <div className="mb-8 space-y-4">
                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "text-2xl font-bold text-center",
                        theme === "dark" ? "text-white" : "text-gray-900"
                      )}
                    >
                      ATS Score
                    </motion.h2>
                    <ATS
                      score={analysis.ATS_score || 0}
                      issues={analysis.issues_count || 0}
                      skills={analysis.skills_rating || 0}
                      content={analysis.content_rating || 0}
                      grammar={analysis.grammar_rating || 0}
                      format={analysis.formatting_rating || 0}
                      style={analysis.style_rating || 0}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div
                className={cn(
                  "rounded-xl shadow-lg border overflow-y-auto p-6",
                  theme === "dark"
                    ? "h-[calc(100vh-6.5rem)] bg-[#1A1A1A] border-gray-700"
                    : "h-[calc(100vh-6.5rem)] bg-white border-gray-300"
                )}
              >
                <ProfileMatch
                  score={analysis.matching_percentage}
                  feedback={analysis.job_description_analysis}
                  keyword={analysis.missing_keywords}
                />
                {/* Uncomment and adjust ResumeContent as needed */}
                <ResumeContent content={analysis.content_feedback} />
                <SkillsFeedBack content={analysis.skills_feedback} />
                <StylesFeedBack content={analysis.style_feedback} />
                <FormatFeedBack content={analysis.formatting_feedback} />
                <GrammarFeedBack content={analysis.grammar_feedback} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
