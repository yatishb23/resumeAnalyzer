import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, XCircle } from "lucide-react"

interface OverallAssessmentProps {
  score: number
}

export function OverallAssessment({ score }: OverallAssessmentProps) {
  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-neutral-50 border-neutral-300 dark:bg-neutral-900 dark:border-neutral-700"
    if (score >= 60) return "bg-neutral-100 border-neutral-400 dark:bg-neutral-800 dark:border-neutral-600"
    return "bg-neutral-200 border-neutral-500 dark:bg-neutral-700 dark:border-neutral-500"
  }

  return (
    <Card className="mb-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl text-slate-900 dark:text-white">Overall Assessment</CardTitle>
      </CardHeader>
      <CardContent>
        <Alert className={`${getScoreBg(score)} border`}>
          {score >= 80 ? (
            <CheckCircle className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
          ) : score >= 60 ? (
            <AlertCircle className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
          ) : (
            <XCircle className="h-5 w-5 text-neutral-500 dark:text-neutral-500" />
          )}
          <AlertDescription className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
            {score >= 80
              ? "Excellent! Your resume has high ATS compatibility and should pass most screening systems effectively."
              : score >= 60
                ? "Good foundation! Some targeted improvements could significantly boost your ATS compatibility."
                : "Significant improvements needed. Your resume may struggle with ATS screening in its current form."}
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}
