'use client';

import React from 'react';
import { Card, CardHeader, CardContent, CardTitle} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Star, BookOpen, Bookmark } from "lucide-react";
import { useTheme } from "@/components/theme";
import Link from 'next/link';

const ResumeSummaryPage: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    interface Feature {
        icon: any;
        title: string;
        description: string;
    }

    interface SummaryExample {
        level: string;
        example: string;
    }

    interface KeyElement {
        title: string;
        content: string;
        example: string;
    }

    interface Tip {
        tip: string;
        description: string;
    }

    const features: Feature[] = [
        { icon: <Target className="h-6 w-6 text-primary" />, title: "Captures Attention", description: "Grabs the employer's interest in the first few seconds" },
        { icon: <BookOpen className="h-6 w-6 text-primary" />, title: "Showcases Value", description: "Highlights your most relevant qualifications and achievements" },
        { icon: <Bookmark className="h-6 w-6 text-primary" />, title: "Sets You Apart", description: "Differentiates you from other candidates" }
    ];

    const keyElements: KeyElement[] = [
        { title: "Your Professional Title", content: "Start with your current role or professional identity", example: "Experienced Digital Marketing Manager with 6+ years of expertise..." },
        { title: "Years of Experience", content: "Mention your relevant experience in the field", example: "Senior Software Developer with 8+ years of experience..." },
        { title: "Key Achievements", content: "Include 2-3 notable accomplishments with metrics", example: "...led teams to deliver 15+ successful projects, increasing client satisfaction by 40%" },
        { title: "Relevant Skills", content: "Highlight skills that match the job requirements", example: "...specializing in cloud architecture, agile methodologies, and team leadership" }
    ];

    const summaryExamples: SummaryExample[] = [
        { level: "Entry Level", example: "Recent Computer Science graduate with strong foundation in software engineering and programming principles..." },
        { level: "Mid-Career Professional", example: "Marketing Manager with 5+ years of experience in developing and executing comprehensive marketing strategies..." },
        { level: "Senior Professional", example: "Senior Project Manager with 10+ years of experience leading complex IT projects in the healthcare sector..." }
    ];

    const tips: Tip[] = [
        { tip: "Keep it concise", description: "Limit your summary to 3-5 impactful sentences" },
        { tip: "Use relevant keywords", description: "Include industry-specific terms from the job description" },
        { tip: "Focus on achievements", description: "Highlight quantifiable results and specific accomplishments" },
        { tip: "Tailor to the job", description: "Customize your summary for each position you apply to" },
        { tip: "Use active voice", description: "Write with strong, action-oriented language" },
        { tip: "Stay professional", description: "Maintain a formal tone and avoid personal pronouns" }
    ];

    return (
        <div className="min-h-screen bg-background">
            <div className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background pb-16 pt-24">
                <div className="absolute inset-0 bg-grid-white/10" />
                <div className="relative mx-auto max-w-[1200px] px-4 text-center">
                    <div className="inline-flex items-center rounded-full bg-primary/10 px-6 py-2 text-primary mb-8">
                        <Star className="mr-2 h-4 w-4" />
                        Resume Summary Guide
                    </div>
                    <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
                        Write a Powerful Resume Summary That <br />
                        <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            Captures Attention
                        </span>
                    </h1>
                </div>
            </div>
            <div className="max-w-[1200px] mx-auto px-4 py-16 space-y-12">
                <Card className="border-primary/20">
                    <CardHeader>
                        <CardTitle className="text-2xl">What is a Resume Summary?</CardTitle>
                    </CardHeader>
                    <CardContent className="text-left">
                        <p className="text-lg text-muted-foreground mb-6">
                            A resume summary is a brief statement that sits at the top of your resume and highlights your
                            qualifications, skills, and notable achievements.
                        </p>
                        <div className="grid md:grid-cols-3 gap-6">
                            {features.map((item, index) => (
                                <div key={index} className="p-6 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                                    <div className="mb-4">{item.icon}</div>
                                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                    <p className="text-muted-foreground">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <Card className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/60" />
                    <CardContent className="relative p-20 text-center text-primary-foreground">
                        <h2 className="text-3xl font-bold mb-6">
                            Ready to Perfect Your Resume Summary?
                        </h2>
                        <p className="text-xl mb-12 opacity-90">
                            Use our AI-powered Resume Analyzer to get instant feedback on your resume summary.
                        </p>
                        <Link href="/">
                            <Button className="bg-background text-foreground hover:bg-background/90 text-lg px-8 py-3 rounded-lg">
                                Analyze Your Resume
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ResumeSummaryPage;