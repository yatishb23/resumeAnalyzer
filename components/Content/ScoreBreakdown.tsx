import { Progress } from "@/components/ui/progress"
import { FileText, BookOpen, Award, Search, Users, Target } from "lucide-react"

interface ScoreBreakdownProps {
  analysis: {
    content_rating: number
    grammar_rating: number
    formatting_rating: number
    keyword_match: number
    skills: { skills_rating: number }
    style_rating: number
  }
}

export function ScoreBreakdown({ analysis }: ScoreBreakdownProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-slate-900 dark:text-white"
    if (score >= 60) return "text-neutral-700 dark:text-neutral-300"
    return "text-neutral-600 dark:text-neutral-400"
  }

  const scoreItems = [
    {
      label: "Content Quality",
      value: analysis.content_rating,
      icon: FileText,
    },
    {
      label: "Grammar & Style",
      value: analysis.grammar_rating,
      icon: BookOpen,
    },
    {
      label: "Format & Structure",
      value: analysis.formatting_rating,
      icon: Award,
    },
    {
      label: "Keyword Optimization",
      value: analysis.keyword_match,
      icon: Search,
    },
    {
      label: "Skills Alignment",
      value: analysis.skills.skills_rating,
      icon: Users,
    },
    {
      label: "Style Consistency",
      value: analysis.style_rating,
      icon: Target,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {scoreItems.map((item, index) => (
        <div
          key={index}
          className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white dark:bg-neutral-900 rounded-lg flex items-center justify-center shadow-sm border border-neutral-200 dark:border-neutral-700">
                <item.icon className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
              </div>
              <div>
                <h3 className="font-medium text-slate-900 dark:text-white">{item.label}</h3>
                <p className={`text-2xl font-bold ${getScoreColor(item.value)}`}>{item.value}%</p>
              </div>
            </div>
          </div>
          <Progress value={item.value} className="h-2 bg-neutral-200 dark:bg-neutral-700" />
        </div>
      ))}
    </div>
  )
}
