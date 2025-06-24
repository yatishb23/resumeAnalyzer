import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle } from "lucide-react"

interface KeywordsAnalysisProps {
  analysis: {
    matching_keywords: string[]
    missing_keywords: {
      hard_skills: string[]
      soft_skills: string[]
      total_missing_keywords: number
    }
  }
}

export function KeywordsAnalysis({ analysis }: KeywordsAnalysisProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Matched Keywords</h3>
          <Badge
            variant="secondary"
            className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
          >
            {analysis.matching_keywords.length}
          </Badge>
        </div>
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800/30">
          <div className="flex flex-wrap gap-2">
            {analysis.matching_keywords.map((keyword, index) => (
              <Badge
                key={index}
                className="bg-white dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/40"
              >
                {keyword}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <XCircle className="w-5 h-5 text-red-500 dark:text-red-400" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Missing Keywords</h3>
          <Badge variant="secondary" className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
            {analysis.missing_keywords.total_missing_keywords}
          </Badge>
        </div>
        <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800/30">
          <div className="space-y-3">
            {analysis.missing_keywords.hard_skills.length > 0 && (
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Technical Skills</p>
                <div className="flex flex-wrap gap-2">
                  {analysis.missing_keywords.hard_skills.map((skill, index) => (
                    <Badge
                      key={index}
                      className="bg-white dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700/50 hover:bg-red-100 dark:hover:bg-red-900/40"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {analysis.missing_keywords.soft_skills.length > 0 && (
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Soft Skills</p>
                <div className="flex flex-wrap gap-2">
                  {analysis.missing_keywords.soft_skills.map((skill, index) => (
                    <Badge
                      key={index}
                      className="bg-white dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700/50 hover:bg-red-100 dark:hover:bg-red-900/40"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
