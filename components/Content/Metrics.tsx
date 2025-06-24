import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart3, Target, Search, Users } from "lucide-react"

interface MetricsOverviewProps {
  analysis: {
    ATS_score: number
    matching_percentage: number
    matching_keywords: string[]
    missing_keywords: { total_missing_keywords: number }
    skills: { skills_rating: number }
  }
}

export function MetricsOverview({ analysis }: MetricsOverviewProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-slate-900 dark:text-white"
    if (score >= 60) return "text-slate-700 dark:text-neutral-300"
    return "text-slate-600 dark:text-neutral-400"
  }

  const metrics = [
    {
      label: "ATS Score",
      value: analysis.ATS_score,
      icon: BarChart3,
    },
    {
      label: "Job Match",
      value: analysis.matching_percentage,
      icon: Target,
    },
    {
      label: "Keywords Found",
      value: analysis.matching_keywords.length,
      icon: Search,
      isCount: true,
      subtitle: `${analysis.missing_keywords.total_missing_keywords} missing`,
    },
    {
      label: "Skills Match",
      value: analysis.skills.skills_rating,
      icon: Users,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <Card
          key={index}
          className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">{metric.label}</p>
                <p
                  className={`text-3xl font-bold ${metric.isCount ? "text-slate-900 dark:text-white" : getScoreColor(metric.value as number)}`}
                >
                  {metric.value}
                  {!metric.isCount && "%"}
                </p>
              </div>
              <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center">
                <metric.icon className="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
              </div>
            </div>
            <div className="mt-4">
              {metric.isCount ? (
                <p className="text-sm text-neutral-500 dark:text-neutral-500">{metric.subtitle}</p>
              ) : (
                <Progress value={metric.value as number} className="h-2 bg-neutral-200 dark:bg-neutral-700" />
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
