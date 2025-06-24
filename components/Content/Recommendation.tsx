import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, AlertCircle, TrendingUp, Award, Lightbulb } from "lucide-react"

interface RecommendationsProps {
  analysis: {
    job_description_analysis: {
      key_strengths: string[]
      areas_for_improvement: string[]
      suggestions: string
    }
  }
}

export function Recommendations({ analysis }: RecommendationsProps) {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
          <CardHeader className="pb-4">
            <CardTitle className="text-neutral-800 dark:text-neutral-200 flex items-center text-lg">
              <div className="w-8 h-8 bg-neutral-200 dark:bg-neutral-700 rounded-lg flex items-center justify-center mr-3 border border-neutral-300 dark:border-neutral-600">
                <Award className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
              </div>
              Key Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {analysis.job_description_analysis.key_strengths.map((strength, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-neutral-700 dark:text-neutral-300 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-neutral-800 dark:text-neutral-200">{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700">
          <CardHeader className="pb-4">
            <CardTitle className="text-neutral-800 dark:text-neutral-200 flex items-center text-lg">
              <div className="w-8 h-8 bg-neutral-200 dark:bg-neutral-700 rounded-lg flex items-center justify-center mr-3 border border-neutral-300 dark:border-neutral-600">
                <TrendingUp className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
              </div>
              Areas for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {analysis.job_description_analysis.areas_for_improvement.map((area, index) => (
                <li key={index} className="flex items-start">
                  <AlertCircle className="h-4 w-4 text-neutral-600 dark:text-neutral-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-neutral-800 dark:text-neutral-200">{area}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {analysis.job_description_analysis.suggestions && (
        <Card className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
          <CardHeader className="pb-4">
            <CardTitle className="text-neutral-800 dark:text-neutral-200 flex items-center text-lg">
              <div className="w-8 h-8 bg-neutral-200 dark:bg-neutral-700 rounded-lg flex items-center justify-center mr-3 border border-neutral-300 dark:border-neutral-600">
                <Lightbulb className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
              </div>
              Actionable Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed">
              {analysis.job_description_analysis.suggestions}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
