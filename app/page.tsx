"use client";

import { generateContent } from "@/lib/Summarize"
import {
  useState,
  useEffect,
  type DragEvent,
  type ChangeEvent,
  useRef,
} from "react";
import {
  Loader2,
  FileText,
  UploadCloud,
  CheckCircle,
  Upload,
  Target,
  Users,
  TrendingUp,
  Award,
  Shield,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import mammoth from "mammoth"
import { useScore } from "@/components/Context/FileData";
import { useRouter } from "next/navigation";
import { useJobDescription } from "@/components/Context/JobDec";
import UploadAlert from "@/components/uploadAlert";



const features = [
  {
    icon: Target,
    title: "ATS Optimization",
    description:
      "Ensure your resume passes Applicant Tracking Systems with 98% compatibility rate",
  },
  {
    icon: Award,
    title: "Expert Analysis",
    description:
      "Get professional insights from our AI trained on thousands of successful resumes",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "Your data is encrypted and never stored. Complete privacy guaranteed",
  },
  {
    icon: Clock,
    title: "Instant Results",
    description:
      "Get comprehensive analysis and actionable feedback in under 30 seconds",
  },
];

export default function ResumeAnalyzer() {
  const [userFile, setUserFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isEvaluateButtonDisabled, setIsEvaluateButtonDisabled] = useState(true)
  const [done, setDone] = useState(false)
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

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile){
      setUserFile(selectedFile)
      await processFile(selectedFile)
    } 
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
      setDone(true)
    } catch (error) {
      console.error("Error:", error instanceof Error ? error.message : error)
    }
  }

  const handleEvaluateClick = async () => {
    if (userFile && jobDescription.trim()) {
      setIsLoading(true)

      try {
        for (let i = 0; i < 2; i++) {
          await new Promise((resolve) => setTimeout(resolve, 1500))
        }
        if(!done) await processFile(userFile)
        router.push("/dashboard")
      } catch (error) {
        console.error("Error:", error instanceof Error ? error.message : error)
      } finally {
        setIsLoading(false)
      }
    }
  }


  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 max-w-7xl pt-28">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Trusted by 50,000+ professionals
          </Badge>
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Optimize Your Resume with
            <br />
            <span className="bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
              AI-Powered Analysis
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Get instant, professional feedback on your resume. Our advanced AI
            analyzes your resume against job descriptions, ensuring ATS
            compatibility and maximizing your interview chances.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Free to use</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Instant results</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Privacy guaranteed</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-16">
          {/* Resume Upload Card */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                <Upload className="w-5 h-5" />
                <span>Upload Your Resume</span>
              </CardTitle>
              <CardDescription className="text-sm">
                Upload your resume in PDF, DOC, or DOCX format for instant
                analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={cn(
                  "border-2 border-dashed rounded-lg p-6 sm:p-8 text-center transition-all duration-200",
                  isDragging
                    ? "border-black/40 bg-muted/50"
                    : "border-border "
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleCancel}
                onDrop={handleDrop}
              >
                {!userFile ? (
                  <div>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                      id="resume-upload"
                      ref={fileInputRef}
                    />
                    <label
                      htmlFor="resume-upload"
                      className="cursor-pointer block"
                    >
                      <UploadCloud className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-base sm:text-lg font-medium mb-2">
                        Drop your resume or tap to browse
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Supports PDF, DOC, DOCX (Max 10MB)
                      </p>
                    </label>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-3 flex-1">
                        <FileText className="h-10 w-10 text-muted-foreground" />
                        <div className="text-left overflow-hidden">
                          <p className="text-sm sm:text-base font-medium truncate">
                            {userFile.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {(userFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 sm:items-end w-full sm:w-auto">
                        {userFile.type === "application/pdf" && (
                          <Button
                            onClick={handleOpenPdf}
                            variant="ghost"
                            size="sm"
                            className="h-8 px-3 text-xs"
                          >
                            Open PDF
                          </Button>
                        )}
                        <Button
                          onClick={handleCancel}
                          variant="ghost"
                          size="sm"
                          className="h-8 px-3 text-xs text-red-600 hover:text-red-700"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Job Description Card */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">
                Job Description
              </CardTitle>
              <CardDescription className="text-sm">
                Paste the job description to get targeted analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here to get personalized recommendations..."
                className="h-32 w-full resize-none rounded-lg border p-3 sm:p-4 text-sm focus:ring-2 focus:border-transparent bg-background"
              />
              <Button
                onClick={handleEvaluateClick}
                disabled={isEvaluateButtonDisabled || isLoading}
                className="w-full mt-4 border dark:bg-neutral-800/30 dark:text-neutral-200 dark:border-neutral-700 dark:hover:bg-neutral-700/50 bg-neutral-100 text-neutral-800 border-neutral-300 hover:bg-neutral-200 h-12"
                // border dark:bg-neutral-800/30 dark:text-neutral-200 dark:border-neutral-700 dark:hover:bg-neutral-700/50 bg-neutral-100 text-neutral-800 border-neutral-300 hover:bg-neutral-200 p-2 text-lg md:text-lg font-medium mb-4 flex gap-2
                size="lg"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Analyzing Resume...
                  </div>
                ) : (
                  "Start Analysis"
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Target,
              value: "98%",
              label: "ATS Compatibility",
              description: "Pass rate for major ATS systems",
            },
            {
              icon: Users,
              value: "50K+",
              label: "Resumes Analyzed",
              description: "Professionals trust our platform",
            },
            {
              icon: TrendingUp,
              value: "3x",
              label: "Interview Rate",
              description: "Average improvement reported",
            },
          ].map((stat, index) => (
            <Card key={index} className="text-center border-0 shadow-lg">
              <CardContent className="pt-8 pb-6">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="font-semibold mb-1">{stat.label}</div>
                <p className="text-sm text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <section id="features" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose ResumeAI?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform combines cutting-edge AI technology with industry
              expertise to give you the competitive edge
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t mt-10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold">ResumeAI</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-black transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-black transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-black transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
      <UploadAlert visible={done} />
    </div>
  );
}
