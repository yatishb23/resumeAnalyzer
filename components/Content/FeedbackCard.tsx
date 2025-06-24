import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { LucideIcon } from "lucide-react"

interface FeedbackCardProps {
  title: string
  feedback: string[]
  icon: LucideIcon
}

export function FeedbackCard({ title, feedback, icon: Icon }: FeedbackCardProps) {
  if (!feedback || feedback.length === 0) return null

  return (
    <Card className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-slate-900 dark:text-white flex items-center text-lg">
          <div className="w-8 h-8 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center mr-3 border border-neutral-200 dark:border-neutral-700">
            <Icon className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
          </div>
          {title}
          <Badge
            variant="secondary"
            className="ml-2 bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
          >
            {feedback.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {feedback.map((item, index) => (
            <div
              key={index}
              className="flex items-start p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700"
            >
              <div className="w-6 h-6 bg-neutral-200 dark:bg-neutral-700 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 border border-neutral-300 dark:border-neutral-600">
                <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">{index + 1}</span>
              </div>
              <p className="text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
