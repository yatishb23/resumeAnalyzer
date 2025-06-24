import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle } from "lucide-react"

interface SkillsAssessmentProps {
  analysis: {
    skills: {
      matching_skills: string[]
    }
    missing_keywords: {
      hard_skills: string[]
      soft_skills: string[]
    }
  }
}

export function SkillsAssessment({ analysis }: SkillsAssessmentProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Matched Skills</h3>
          <Badge
            variant="secondary"
            className="bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
          >
            {analysis.skills.matching_skills.length}
          </Badge>
        </div>
        <div className="space-y-2">
          {analysis.skills.matching_skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700"
            >
              <CheckCircle className="h-4 w-4 text-neutral-700 dark:text-neutral-300 mr-3 flex-shrink-0" />
              <span className="text-sm font-medium text-slate-900 dark:text-white">{skill}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Skills to Consider</h3>
          <Badge
            variant="secondary"
            className="bg-neutral-300 dark:bg-neutral-600 text-neutral-800 dark:text-neutral-200"
          >
            {analysis.missing_keywords.hard_skills.length + analysis.missing_keywords.soft_skills.length}
          </Badge>
        </div>
        <div className="space-y-2">
          {[...analysis.missing_keywords.hard_skills, ...analysis.missing_keywords.soft_skills]
            .slice(0, 8)
            .map((skill, index) => (
              <div
                key={index}
                className="flex items-center p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700"
              >
                <AlertCircle className="h-4 w-4 text-neutral-600 dark:text-neutral-400 mr-3 flex-shrink-0" />
                <span className="text-sm font-medium text-slate-900 dark:text-white">{skill}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
