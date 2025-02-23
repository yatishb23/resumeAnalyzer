"use client";
import React, { JSX, ReactNode } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Target,
  Award,
  CheckCircle2,
  AlertTriangle,
  Clock,
  User,
  Briefcase,
  ScrollText,
} from "lucide-react";
import { NavBar } from "@/components/NavBar";
import { useTheme } from "@/components/theme";
import { Link } from "react-router-dom";

const ResumeBlogPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
    {/* Navigation Bar */}
    
    {/* Hero Section */}
    <div className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background pb-16 pt-24">
      <div className="absolute inset-0 bg-grid-white/10" />
      <div className="relative mx-auto max-w-[1200px] px-4 text-center">
        <div className="inline-flex items-center rounded-full bg-primary/10 px-6 py-2 text-primary mb-8">
          <FileText className="mr-2 h-4 w-4" />
          Comprehensive Resume Guide
        </div>
        <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
          Write a Professional Resume That <br />
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Gets You Hired
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Master the art of resume writing with our step-by-step guide to create a powerful,
          professional resume that stands out to employers
        </p>
      </div>
    </div>

    <div className="max-w-[1200px] mx-auto px-4 py-16 space-y-12">
      {/* Quick Tips */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        {[
          {
            icon: <Clock className="h-8 w-8 text-primary" />, title: "Keep it Brief", description: "Aim for 1-2 pages maximum"
          },
          {
            icon: <Target className="h-8 w-8 text-primary" />, title: "Be Relevant", description: "Tailor content to the job"
          },
          {
            icon: <ScrollText className="h-8 w-8 text-primary" />, title: "Stay Clear", description: "Use simple, direct language"
          },
          {
            icon: <CheckCircle2 className="h-8 w-8 text-primary" />, title: "Proofread", description: "Check for errors thoroughly"
          }
        ].map((item, index) => (
          <Card key={index} className="relative overflow-hidden border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="pt-6">
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Resume Sections Guide */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl">Essential Resume Sections</CardTitle>
          <CardDescription>How to write each section of your resume effectively</CardDescription>
        </CardHeader>
        <CardContent className="text-left space-y-8">
          {[
            {
              icon: <User className="h-6 w-6 text-primary" />, title: "Contact Information", content: "Include your full name, professional email, phone number, and location. Add relevant LinkedIn profile or portfolio links if applicable.", tips: ["Use a professional email address", "Include city and state only", "Ensure phone number is current"]
            },
            {
              icon: <ScrollText className="h-6 w-6 text-primary" />, title: "Professional Summary", content: "Write 2-3 sentences highlighting your key professional attributes, major achievements, and career goals.", tips: ["Tailor to the job description", "Include years of experience", "Highlight key skills"]
            },
            {
              icon: <Briefcase className="h-6 w-6 text-primary" />, title: "Work Experience", content: "List relevant positions in reverse chronological order. Include company name, job title, dates, and key achievements.", tips: ["Use action verbs", "Include measurable results", "Focus on achievements over duties"]
            }
          ].map((section, index) => (
            <div key={index} className="p-6 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                {section.icon}
                <h3 className="text-xl font-semibold">{section.title}</h3>
              </div>
              <p className="text-muted-foreground mb-4">{section.content}</p>
              <div className="grid gap-2">
                {section.tips.map((tip, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Formatting Tips */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>Professional Formatting Guidelines</CardTitle>
          <CardDescription>Make your resume visually appealing and easy to read</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Font & Spacing", tips: ["Use standard fonts like Arial or Calibri", "Keep font size between 10-12 points", "Maintain consistent line spacing", "Use clear section headings"]
              },
              {
                title: "Layout & Design", tips: ["Include ample white space", "Use bullet points for clarity", "Keep margins between 0.5-1 inch", "Ensure consistent formatting"]
              }
            ].map((section, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-lg font-semibold">{section.title}</h3>
                <div className="space-y-2">
                  {section.tips.map((tip, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 rounded bg-secondary">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Common Mistakes */}
      <Card className="border-destructive/20 bg-gradient-to-br from-destructive/5 to-background">
        <CardHeader className="flex flex-row items-center gap-4">
          <AlertTriangle className="h-8 w-8 text-destructive" />
          <div>
            <CardTitle>Common Resume Mistakes</CardTitle>
            <CardDescription>Avoid these critical errors</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Using generic objective statements", "Including personal information (age, marital status)", "Adding irrelevant work experience", "Making spelling and grammar mistakes", "Using complicated fonts or designs", "Including references on resume", "Writing long paragraphs", "Using outdated contact information"
            ].map((mistake, index) => (
              <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10">
                <span className="text-destructive">✕</span>
                <span className="text-foreground">{mistake}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/60" />
        <CardContent className="relative p-12 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Create Your Professional Resume?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Use our AI-powered Resume Analyzer to ensure your resume follows best practices and stands out to employers.
          </p>
          <div className="bg-background text-foreground hover:bg-background/90 text-lg px-8 py-3 rounded-lg inline-block">
            Analyze Your Resume
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);
};

export default ResumeBlogPage;
