"use client"

import { useState, useEffect, useCallback } from "react"
import { useScore } from "./Context/FileData"
import { useJobDescription } from "./Context/JobDec"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Animation from "./animation"
import { AlertCircle, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { MetricsOverview } from "./Content/Metrics"
import { OverallAssessment } from "./Content/Overall"
import { ScoreBreakdown } from "./Content/ScoreBreakdown"
import { KeywordsAnalysis } from "./Content/KeywordAnalysis"
import { SkillsAssessment } from "./Content/Skills"
import { DetailedFeedback } from "./Content/DetailedFeedBack"
import { Recommendations } from "./Content/Recommendation"

interface AnalysisData {
  ATS_score: number
  issues_count: number
  matching_percentage: number
  matching_keywords: string[]
  keyword_match: number
  missing_keywords: {
    hard_skills: string[]
    soft_skills: string[]
    tools_technologies: string[]
    total_missing_keywords: number
  }
  job_description_analysis: {
    key_strengths: string[]
    areas_for_improvement: string[]
    suggestions: string
  }
  skills: {
    skills_rating: number
    skills_feedback: string[]
    matching_skills: string[]
  }
  content_rating: number
  grammar_rating: number
  formatting_rating: number
  style_rating: number
  content_feedback: string[]
  formatting_feedback: string[]
  grammar_feedback: string[]
  style_feedback: string[]
}

interface ApiError {
  message: string
  details?: string
}

export default function Feedback() {
  const { scoreResult } = useScore()
  const { jobDescription } = useJobDescription()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null)
  const [error, setError] = useState<ApiError | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const analysisSteps = [1, 2, 3, 4, 5]

  const fetchResumeAnalysis = useCallback(async () => {
    try {
      const stepInterval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < analysisSteps.length - 1) {
            return prev + 1
          }
          clearInterval(stepInterval)
          return prev
        })
      }, 800)

      const response = await fetch("/api/getAllData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scoreResult, jobDescription }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Analysis failed")
      }

      let data = await response.json()
      console.log(data)

      if (typeof data === "string" && data.length > 6) {
        data = data.slice(7, -4)
      }

      data = JSON.parse(data)
      setAnalysis(data.resume_analysis)

      clearInterval(stepInterval)
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "Unknown error occurred",
        details: err instanceof Error ? err.stack : undefined,
      })
    } finally {
      setLoading(false)
      setCurrentStep(0)
    }
  }, [scoreResult, jobDescription, analysisSteps.length])

  useEffect(() => {
    if (scoreResult) {
      fetchResumeAnalysis()
    } else {
      router.push("/")
    }
  }, [scoreResult, fetchResumeAnalysis, router])

  if (loading) {
    return <Animation />
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-black">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-sm sm:max-w-md w-full space-y-4 sm:space-y-6 px-4"
        >
          <div className="w-16 h-16 mx-auto rounded-full bg-red-50 dark:bg-red-950/20 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-500 dark:text-red-400" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Analysis Failed</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">{error.message}</p>
          </div>
          <Button
            onClick={() => window.location.reload()}
            className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200"
            size="lg"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </motion.div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4">
          Step {currentStep + 1} of {analysisSteps.length}
        </p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      {analysis && (
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-7xl pt-20 sm:pt-24">
          {/* Header with Theme Toggle */}
          <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Resume Analysis Dashboard
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Comprehensive analysis of your resume&apos;s ATS compatibility and job match
              </p>
            </div>
          </div>

          {/* Key Metrics Overview */}
          <MetricsOverview analysis={analysis} />

          {/* Overall Assessment */}
          <OverallAssessment score={analysis.ATS_score} />

          {/* Detailed Analysis Tabs */}
          <Card className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <Tabs defaultValue="breakdown" className="w-full">
              <CardHeader className="pb-0">
                <TabsList className="w-full flex overflow-x-auto bg-slate-100 dark:bg-neutral-800 h-12 p-1 gap-1 scrollbar-hide">
                  <TabsTrigger
                    value="breakdown"
                    className="flex-shrink-0 min-w-[100px] sm:min-w-[120px] data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-900 data-[state=active]:text-slate-900 dark:data-[state=active]:text-white dark:text-neutral-400 text-xs sm:text-sm px-3 sm:px-4"
                  >
                    Score
                  </TabsTrigger>
                  <TabsTrigger
                    value="keywords"
                    className="flex-shrink-0 min-w-[100px] sm:min-w-[120px] data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-900 data-[state=active]:text-slate-900 dark:data-[state=active]:text-white dark:text-neutral-400 text-xs sm:text-sm px-3 sm:px-4"
                  >
                    Keywords
                  </TabsTrigger>
                  <TabsTrigger
                    value="skills"
                    className="flex-shrink-0 min-w-[100px] sm:min-w-[120px] data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-900 data-[state=active]:text-slate-900 dark:data-[state=active]:text-white dark:text-neutral-400 text-xs sm:text-sm px-3 sm:px-4"
                  >
                    Skills
                  </TabsTrigger>
                  <TabsTrigger
                    value="feedback"
                    className="flex-shrink-0 min-w-[100px] sm:min-w-[120px] data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-900 data-[state=active]:text-slate-900 dark:data-[state=active]:text-white dark:text-neutral-400 text-xs sm:text-sm px-3 sm:px-4"
                  >
                    Feedback
                  </TabsTrigger>
                  <TabsTrigger
                    value="recommendations"
                    className="flex-shrink-0 min-w-[100px] sm:min-w-[120px] data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-900 data-[state=active]:text-slate-900 dark:data-[state=active]:text-white dark:text-neutral-400 text-xs sm:text-sm px-3 sm:px-4"
                  >
                    Tips
                  </TabsTrigger>
                </TabsList>
              </CardHeader>

              <div className="p-4 sm:p-6">
                <TabsContent value="breakdown" className="mt-0 space-y-6">
                  <ScoreBreakdown analysis={analysis} />
                </TabsContent>

                <TabsContent value="keywords" className="mt-0 space-y-6">
                  <KeywordsAnalysis analysis={analysis} />
                </TabsContent>

                <TabsContent value="skills" className="mt-0 space-y-6">
                  <SkillsAssessment analysis={analysis} />
                </TabsContent>

                <TabsContent value="feedback" className="mt-0 space-y-6">
                  <DetailedFeedback analysis={analysis} />
                </TabsContent>

                <TabsContent value="recommendations" className="mt-0 space-y-6">
                  <Recommendations analysis={analysis} />
                </TabsContent>
              </div>
            </Tabs>
          </Card>
        </div>
      )}

      {/* <Button
        variant="outline"
        className="fixed bottom-6 right-6 z-50 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
        onClick={() => {
          localStorage.removeItem("cachedResumeAnalysis");
          window.location.reload();
        }}
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Refresh Analysis
      </Button> */}
    </motion.div>
  )
}
