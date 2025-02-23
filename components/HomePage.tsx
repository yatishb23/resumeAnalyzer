"use client"

import { useState, useEffect, type DragEvent, type ChangeEvent, useRef } from "react"
import { useRouter } from "next/navigation"
import { Loader2, FileText, UploadCloud, CheckCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useTheme } from "@/components/theme"
import { motion, AnimatePresence } from "framer-motion"
import { generateContent } from "@/lib/Summarize"
import mammoth from "mammoth"
import { useJobDescription } from "./Context/JobDec"
import { useScore } from "./Context/FileData"

const analysisSteps = [
  { id: 1, title: "Upload Resume", description: "Your resume is securely uploaded" },
  { id: 2, title: "Extract Content", description: "We extract and process the text" },
  { id: 3, title: "Analyze Skills", description: "Your skills are identified and evaluated" },
  { id: 4, title: "Compare to Job", description: "We match your profile to the job description" },
  { id: 5, title: "Generate Report", description: "A comprehensive report is created" },
]

export default function ResumeChecker() {
  const { theme } = useTheme()
  const [userFile, setUserFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isEvaluateButtonDisabled, setIsEvaluateButtonDisabled] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { jobDescription, setJobDescription } = useJobDescription()
  const { setScoreResult } = useScore()

  useEffect(() => {
    setIsEvaluateButtonDisabled(!(userFile && jobDescription.trim().length > 0))
  }, [userFile, jobDescription])

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
    const droppedFile = event.dataTransfer.files[0]
    if (droppedFile) setUserFile(droppedFile)
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) setUserFile(selectedFile)
  }

  const handleOpenPdf = () => {
    if (userFile) {
      const url = URL.createObjectURL(userFile)
      window.open(url, "_blank")
    }
  }

  const handleCancel = () => {
    setUserFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const processFile = async (file: File) => {
    try {
      const fileType = file.type
      const isPdf = fileType === "application/pdf"
      const isDocx = fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

      if (!isPdf && !isDocx) {
        throw new Error("Unsupported file format. Please upload a PDF or DOCX file.")
      }

      let extractedText = ""

      if (isDocx) {
        extractedText = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = async (event) => {
            if (event.target?.result) {
              try {
                const result = await mammoth.extractRawText({
                  arrayBuffer: event.target.result as ArrayBuffer,
                })
                resolve(result.value.trim())
              } catch {
                reject("Failed to extract text from DOCX")
              }
            } else {
              reject("Failed to read DOCX file")
            }
          }
          reader.onerror = (error) => reject(error)
          reader.readAsArrayBuffer(file)
        })
      }

      const scoreResult = await generateContent([
        extractedText,
        "Please perform Optical Character Recognition (OCR) on the provided resume file. Extract and return only the text content, ensuring it is clean, accurate, and free from formatting or additional information.",
      ])

      setScoreResult(scoreResult)
    } catch (error) {
      console.error("Error:", error instanceof Error ? error.message : error)
    }
  }

  const handleEvaluateClick = async () => {
    if (userFile && jobDescription.trim()) {
      setIsLoading(true)

      try {
        for (let i = 0; i < analysisSteps.length; i++) {
          setCurrentStep(i)
          await new Promise((resolve) => setTimeout(resolve, 1500))
        }
        await processFile(userFile)
        router.push("/dashboard")
      } catch (error) {
        console.error("Error:", error instanceof Error ? error.message : error)
      } finally {
        setIsLoading(false)
        setCurrentStep(0)
      }
    }
  }

  return (
    <div
      className={cn(
        "min-h-screen w-full bg-gradient-to-br",
        theme === "dark" ? "from-gray-900 to-black text-gray-100" : "from-gray-50 to-white text-gray-900",
      )}
    >
      <div className="container flex min-h-screen flex-col md:flex-row items-center justify-center p-4 pt-20 gap-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-xl space-y-8"
        >
          <motion.div
            className="space-y-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className={cn("text-sm font-medium tracking-wider", theme === "dark" ? "text-gray-400" : "text-gray-600")}
            >
              RESUME CHECKER
            </motion.div>
            <motion.h1 className="text-4xl font-bold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
              Is Your Resume Interview&nbsp;Ready?
            </motion.h1>
          </motion.div>

          <motion.div whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className={cn(
                "border bg-opacity-50 backdrop-blur-sm transition-all shadow-lg",
                theme === "dark"
                  ? "border-gray-700 bg-gray-800/30 hover:border-gray-600"
                  : "border-gray-200 bg-white/50 hover:border-gray-300",
              )}
            >
              <CardContent className="p-8 text-center">
                <AnimatePresence mode="wait">
                  {!userFile ? (
                    <motion.div
                      key="upload"
                      className="space-y-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        className={cn(
                          "flex items-center justify-center h-16 w-16 rounded-full mx-auto",
                          theme === "dark" ? "bg-gray-700" : "bg-gray-200",
                        )}
                        animate={{
                          y: [-5, 5, -5],
                          transition: {
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                          },
                        }}
                      >
                        <UploadCloud className={cn("h-8 w-8", theme === "dark" ? "text-gray-300" : "text-gray-600")} />
                      </motion.div>
                      <p className={cn(theme === "dark" ? "text-gray-400" : "text-gray-600")}>
                        Drag & drop resume or{" "}
                        <label
                          className={cn(
                            "cursor-pointer underline transition-colors",
                            theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900",
                          )}
                        >
                          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                          browse files
                        </label>
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="userFile"
                      className="space-y-4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                            <FileText className={cn("h-12 w-12", theme === "dark" ? "text-gray-300" : "text-gray-600")} />
                          </motion.div>
                          <div className="text-left overflow-hidden">
                            <p
                              className={cn(
                                "text-lg font-medium truncate",
                                theme === "dark" ? "text-gray-200" : "text-gray-800",
                              )}
                            >
                              {userFile.name}
                            </p>
                            <p className={cn("text-sm", theme === "dark" ? "text-gray-400" : "text-gray-600")}>
                              {(userFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          {userFile.type === "application/pdf" && (
                            <Button
                              onClick={handleOpenPdf}
                              variant="ghost"
                              size="sm"
                              className={cn(
                                "h-8 px-3 text-xs",
                                theme === "dark"
                                  ? "text-blue-400 hover:bg-gray-700/50"
                                  : "text-blue-600 hover:bg-gray-100",
                              )}
                            >
                              Open PDF
                            </Button>
                          )}
                          <Button
                            onClick={handleCancel}
                            variant="ghost"
                            size="sm"
                            className={cn(
                              "h-8 px-3 text-xs",
                              theme === "dark"
                                ? "text-red-400 hover:bg-gray-700/50"
                                : "text-red-600 hover:bg-gray-100",
                            )}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Enter job description..."
              className={cn(
                "h-32 w-full resize-none rounded-lg border p-4 text-sm focus:ring-2 focus:border-transparent",
                theme === "dark"
                  ? "bg-gray-800/50 border-gray-700 placeholder-gray-500 text-gray-200 focus:ring-gray-600"
                  : "bg-white border-gray-300 placeholder-gray-400 text-gray-800 focus:ring-blue-400",
              )}
            />
            <Button
              onClick={handleEvaluateClick}
              disabled={isEvaluateButtonDisabled || isLoading}
              className={cn(
                "w-full py-4 text-lg font-medium transition-all",
                theme === "dark"
                  ? "bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white"
                  : "bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white",
                "disabled:opacity-50 disabled:cursor-not-allowed",
              )}
            >
              {isLoading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}>
                  <Loader2 className="h-5 w-5" />
                </motion.div>
              ) : (
                "Start Analysis"
              )}
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full max-w-md mt-10"
        >
          <Card
            className={cn(
              "border bg-opacity-50 backdrop-blur-sm shadow-lg",
              theme === "dark" ? "border-gray-700 bg-gray-800/30" : "border-gray-200 bg-white/70",
            )}
          >
            <CardContent className="p-6">
              <h2
                className={cn(
                  "text-2xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r",
                  theme === "dark" ? "from-blue-400 to-teal-300" : "from-blue-600 to-teal-500",
                )}
              >
                Analysis Process
              </h2>
              <div className="space-y-4">
                {analysisSteps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: currentStep >= index ? 1 : 0.5,
                      y: 0,
                    }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={cn(
                      "flex items-start space-x-3 p-3 rounded-lg",
                      currentStep >= index ? (theme === "dark" ? "bg-gray-700/50" : "bg-gray-100") : "bg-transparent",
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-full p-1",
                        currentStep >= index
                          ? "bg-gradient-to-r from-blue-500 to-teal-400"
                          : theme === "dark"
                            ? "bg-gray-600"
                            : "bg-gray-300",
                      )}
                    >
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className={cn("font-medium", theme === "dark" ? "text-gray-200" : "text-gray-800")}>
                        {step.title}
                      </h3>
                      <p className={cn("text-sm", theme === "dark" ? "text-gray-400" : "text-gray-600")}>
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}