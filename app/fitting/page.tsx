"use client";

import { useState, useEffect } from "react";
import { Card, CardContent} from "@/components/ui/card";
import { 
  Scissors,
  Maximize2,
  Layout,
  Type,
} from "lucide-react";
import Link from "next/link";

const OnePageResumePage: React.FC = () => {
  const [currentTip, setCurrentTip] = useState<number>(0);

  const quickTips: string[] = [
    "Remove irrelevant work experience",
    "Use concise bullet points",
    "Adjust margins and spacing",
    "Focus on recent achievements",
    "Eliminate redundant information"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % quickTips.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background pb-16 pt-24">
        <div className="relative mx-auto max-w-[1200px] px-4 text-center">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-6 py-2 text-primary mb-8">
            <Maximize2 className="mr-2 h-4 w-4" />
            One-Page Resume Guide
          </div>

          {/* Tips Slider */}
          <div className="h-12 mb-6">
            <p className="text-xl text-primary font-medium">
              Tip #{currentTip + 1}: {quickTips[currentTip]}
            </p>
          </div>

          <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
            Master the Art of Fitting Your Resume on <br />
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              One Perfect Page
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Learn expert techniques to condense your experience into a powerful single-page resume
            that hiring managers will love.
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-16 space-y-12">
        {/* Strategies */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <Scissors className="h-8 w-8" />, title: "Smart Trimming", description: "Strategic ways to cut content while preserving impact"
            },
            {
              icon: <Layout className="h-8 w-8" />, title: "Optimal Layout", description: "Maximize space with intelligent formatting choices"
            },
            {
              icon: <Type className="h-8 w-8" />, title: "Content Optimization", description: "Transform verbose text into powerful statements"
            }
          ].map((strategy, index) => (
            <Card key={index} className="group transition-all duration-300 hover:scale-105 border-primary/20">
              <CardContent className="pt-6">
                <div className="mb-4 text-primary group-hover:scale-110 transition-transform">
                  {strategy.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{strategy.title}</h3>
                <p className="text-muted-foreground">{strategy.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/60" />
          <CardContent className="relative p-12 text-center text-primary-foreground">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Perfect Your One-Page Resume?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Use our AI-powered Resume Analyzer to ensure your condensed resume maintains maximum impact.
            </p>
            <Link href="/" className="bg-background text-foreground hover:bg-background/90 text-lg px-8 py-3 rounded-lg inline-block">
              Analyze Your Resume
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnePageResumePage;
