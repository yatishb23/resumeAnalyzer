import { Card, CardContent } from "@/components/ui/card"
import { FileText, BookOpen, Award, Target, Users } from "lucide-react"
import { FeedbackCard } from "./FeedbackCard"

interface DetailedFeedbackProps {
  analysis: {
    content_feedback: string[]
    grammar_feedback: string[]
    formatting_feedback: string[]
    style_feedback: string[]
    skills: {
      skills_feedback: string[]
    }
  }
}

export function DetailedFeedback({ analysis }: DetailedFeedbackProps) {
  const feedbackSections = [
    {
      title: "Content Feedback",
      feedback: analysis.content_feedback,
      icon: FileText,
    },
    {
      title: "Grammar & Language Feedback",
      feedback: analysis.grammar_feedback,
      icon: BookOpen,
    },
    {
      title: "Formatting & Structure Feedback",
      feedback: analysis.formatting_feedback,
      icon: Award,
    },
    {
      title: "Style & Presentation Feedback",
      feedback: analysis.style_feedback,
      icon: Target,
    },
    {
      title: "Skills & Competencies Feedback",
      feedback: analysis.skills.skills_feedback,
      icon: Users,
    },
  ]

  const hasAnyFeedback = feedbackSections.some((section) => section.feedback && section.feedback.length > 0)

  if (!hasAnyFeedback) {
    return (
      <Card className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center border border-neutral-200 dark:border-neutral-700">
            <FileText className="w-8 h-8 text-neutral-500 dark:text-neutral-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No Detailed Feedback Available</h3>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm">
            Detailed feedback will appear here once the analysis is complete.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-6">
      {feedbackSections.map((section, index) => (
        <FeedbackCard key={index} title={section.title} feedback={section.feedback} icon={section.icon} />
      ))}
    </div>
  )
}
