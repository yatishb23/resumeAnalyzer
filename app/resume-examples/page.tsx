"use client";

import Image from "next/image";
import React from "react";
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
  Download,
  Eye,
  Code,
  Database,
  Briefcase,
  LineChart,
} from "lucide-react";

interface ResumeExample {
  title: string;
  description: string;
  icon: React.ReactNode; // Change `any` to `React.ReactNode`
  previewImage: string;
  pdfUrl: string;
  fileName: string;
  highlights: string[];
}

const ResumeExamplesPage: React.FC = () => {
  const resumeExamples: ResumeExample[] = [
    {
      title: "Software Engineer",
      description: "10+ years of full-stack development experience",
      icon: <Code className="h-6 w-6" />,
      previewImage: "/softwareEngg.png",
      pdfUrl: "/softwareEngg.pdf",
      fileName: "softwareEngg.pdf",
      highlights: [
        "Clean, modular code structure",
        "Strong emphasis on technical skills",
        "Project-focused achievements",
        "Clear career progression",
      ],
    },
    {
      title: "Data Scientist",
      description: "Machine learning and analytics professional",
      icon: <Database className="h-6 w-6" />,
      previewImage: "/dataScientist.png",
      pdfUrl: "/dataScientist.pdf",
      fileName: "dataScientist.pdf",
      highlights: [
        "Quantifiable project outcomes",
        "Emphasis on strengths",
        "Technical toolkit showcase",
        "Industry certifications",
      ],
    },
    {
      title: "Project Manager",
      description: "PMP certified with agile expertise",
      icon: <Briefcase className="h-6 w-6" />,
      previewImage: "/projectManager.png",
      pdfUrl: "/projectManager.pdf",
      fileName: "projectManager.pdf",
      highlights: [
        "Project portfolio highlights",
        "Team leadership examples",
        "Budget management success",
        "Stakeholder communications",
      ],
    },
    {
      title: "Business Analyst",
      description: "Strategic analysis and process improvement",
      icon: <LineChart className="h-6 w-6" />,
      previewImage: "/businessAnalyst.png",
      pdfUrl: "/businessAnalyst.pdf",
      fileName: "businessAnalyst.pdf",
      highlights: [
        "Process improvement metrics",
        "Requirements gathering",
        "Data-driven decisions",
        "Cross-functional collaboration",
      ],
    },
  ];

  const handlePreviewClick = (pdfUrl: string) => {
    window.open(pdfUrl, "_blank");
  };

  const handleDownload = (pdfUrl: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background pb-16 pt-24">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="relative mx-auto max-w-[1200px] px-4 text-center">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-6 py-2 text-primary mb-8">
            <FileText className="mr-2 h-4 w-4" />
            Professional Resume Examples
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
            Industry-Specific Resume <br />
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Templates & Examples
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Explore our curated collection of professional resume examples
            tailored for different roles. Click on any example to view the full
            PDF version.
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {resumeExamples.map((example, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-primary/20"
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="text-primary">{example.icon}</div>
                  <div className="text-center flex-1">
                    <CardTitle className="text-lg font-bold">
                      {example.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {example.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div
                  className="relative cursor-pointer overflow-hidden rounded-lg"
                  onClick={() => handlePreviewClick(example.pdfUrl)}
                >
                  <Image
                    src={example.previewImage}
                    alt={`${example.title} Resume Example`}
                    width={500}
                    height={300}
                    className="w-full h-auto"
                  />
                </div>
                <div className="flex gap-4">
                  <Button
                    className="flex-1 gap-2"
                    onClick={() => handlePreviewClick(example.pdfUrl)}
                  >
                    <Eye className="h-4 w-4" />
                    Preview
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 gap-2"
                    onClick={() =>
                      handleDownload(example.pdfUrl, example.fileName)
                    }
                  >
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeExamplesPage;
