"use client"

import { useState, useEffect, useCallback } from "react"
import { Loader2, CheckCircle, FileText, Target, Brain, BarChart3, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { CardContent } from "@/components/ui/card"

const analysisSteps = [
  {
    id: 1,
    title: "Processing Resume",
    description: "Extracting and analyzing content",
    icon: FileText,
  },
  {
    id: 2,
    title: "ATS Compatibility",
    description: "Checking system compatibility",
    icon: Target,
  },
  {
    id: 3,
    title: "Skills Analysis",
    description: "Evaluating your skills profile",
    icon: Brain,
  },
  {
    id: 4,
    title: "Job Matching",
    description: "Comparing with job requirements",
    icon: BarChart3,
  },
  {
    id: 5,
    title: "Generating Report",
    description: "Creating comprehensive feedback",
    icon: Sparkles,
  },
]



export default function Animation() {
  const [currentStep, setCurrentStep] = useState(0)

  const fetchResumeAnalysis = useCallback(async () => {
      const stepInterval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < analysisSteps.length - 1) {
            return prev + 1;
          }
          clearInterval(stepInterval);
          return prev;
        });
      }, 800);

  }, []);

  useEffect(() => {
      fetchResumeAnalysis();
  }, [fetchResumeAnalysis]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="">
            <CardContent className="p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-6 h-6 dark:text-white text-black" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Analyzing Your Resume</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Please wait while we process your resume</p>
              </div>

              {/* Progress Steps */}
              <div className="space-y-4 mb-6">
                {analysisSteps.map((step, index) => {
                  const Icon = step.icon
                  const isActive = currentStep === index
                  const isCompleted = currentStep > index

                  return (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={cn(
                        "flex items-center space-x-3 p-3 rounded-lg transition-all duration-300",
                        isActive && "bg-neutral-200 dark:bg-neutral-800",
                        isCompleted && "bg-green-50 dark:bg-green-900/20",
                      )}
                    >
                      <div
                        className={cn(
                          "flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300",
                          isActive && "dark:bg-neutral-900 text-white bg-neutral-600",
                          isCompleted && "bg-green-600 text-white",
                          !isActive && !isCompleted && "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400",
                        )}
                      >
                        {isActive ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : isCompleted ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Icon className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3
                          className={cn(
                            "text-sm font-medium transition-colors",
                            isActive && "text-black dark:text-white",
                            isCompleted && "text-green-900 dark:text-green-100",
                            !isActive && !isCompleted && "text-gray-700 dark:text-gray-300",
                          )}
                        >
                          {step.title}
                        </h3>
                        <p
                          className={cn(
                            "text-xs transition-colors",
                            isActive && "text-black dark:text-white",
                            isCompleted && "text-green-700 dark:text-green-300",
                            !isActive && !isCompleted && "text-gray-500 dark:text-gray-500",
                          )}
                        >
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                  <span>Progress</span>
                  <span>{Math.round(((currentStep + 1) / analysisSteps.length) * 100)}%</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-neutral-600 to-neutral-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / analysisSteps.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            </CardContent>
          </div>
        </motion.div>
      </div>
  )
}
