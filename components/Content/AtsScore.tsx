"use client";

import React, { useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useSpring, useTransform } from "framer-motion";
import { useTheme } from "@/components/theme";
import { cn } from "@/lib/utils";

interface ATSProps {
  score: number;
  issues: number;
  skills?: number;
  content?: number;
  grammar?: number;
  format?: number;
  style?: number;
}

const getScoreColor = (score: number, theme: string) => {
  if (score >= 80) return theme === "dark" ? "#059669" : "#10B981"; // Emerald
  if (score >= 60) return theme === "dark" ? "#D97706" : "#F59E0B"; // Amber
  return theme === "dark" ? "#DC2626" : "#EF4444"; // Red (softer)
};

const getAttributeScores = (content = 0, skills = 0, grammar = 0, format = 0, style = 0) => [
  { label: "CONTENT", value: content },
  { label: "SKILLS", value: skills },
  { label: "GRAMMAR", value: grammar },
  { label: "FORMAT", value: format },
  { label: "STYLE", value: style },
];

const ATS: React.FC<ATSProps> = ({
  score,
  skills = 0,
  content = 0,
  grammar = 0,
  format = 0,
  style = 0,
}) => {
  const { theme } = useTheme();
  const springScore = useSpring(0, { mass: 1, damping: 15, stiffness: 100 });
  const animatedScore = useTransform(springScore, Math.round);

  useEffect(() => {
    springScore.set(score);
  }, [score, springScore]);

  const attributeScores = useMemo(() => 
    getAttributeScores(content, skills, grammar, format, style), 
    [content, skills, grammar, format, style]
  );

  return (
    <Card className={cn(
      "relative overflow-hidden rounded-xl border bg-opacity-50 backdrop-blur-md shadow-lg",
      theme === "dark" 
        ? "border-gray-800 bg-gray-900/30" 
        : "border-gray-200 bg-white/50"
    )}>
      <CardContent className="p-6 flex flex-col items-center">
        <div className="relative w-48 h-48">
          <svg className="absolute w-full h-full" viewBox="0 0 100 50">
            <path
              d="M 10,50 A 40 40 0 0 1 90,50"
              fill="none"
              stroke={theme === "dark" ? "#374151" : "#E5E7EB"}
              strokeWidth="6"
            />
          </svg>

          <motion.svg className="absolute w-full h-full" viewBox="0 0 100 50">
            <motion.path
              d="M 10,50 A 40 40 0 0 1 90,50"
              fill="none"
              stroke={getScoreColor(score, theme)}
              strokeWidth="6"
              strokeLinecap="round"
              initial={{ strokeDasharray: 125, strokeDashoffset: 125 }}
              animate={{ strokeDashoffset: 125 - (125 * Math.min(score, 100)) / 100 }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          </motion.svg>

          <div className="absolute inset-0 flex flex-col items-center justify-end pb-6">
            <motion.div 
              className="text-4xl font-bold" 
              style={{ color: getScoreColor(score, theme) }}
            >
              {animatedScore}
            </motion.div>
            <span className={cn(
              "text-sm mt-1",
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            )}>
              /100
            </span>
          </div>
        </div>

        <div className="w-full mt-6 space-y-4">
          {attributeScores.map(({ label, value }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <span className={cn(
                  "text-sm",
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                )}>
                  {label}
                </span>
                <span 
                  className="text-sm font-semibold" 
                  style={{ color: getScoreColor(value, theme) }}
                >
                  {value}%
                </span>
              </div>
              <div className={cn(
                "h-2 rounded-full overflow-hidden",
                theme === "dark" ? "bg-gray-800" : "bg-gray-200"
              )}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${value}%` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: getScoreColor(value, theme) }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={cn(
            "mt-6 text-sm font-semibold px-4 py-2 rounded-full",
            theme === "dark" ? "bg-gray-800" : "bg-gray-100"
          )}
          style={{
            color: getScoreColor(score, theme),
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {score >= 80 ? "Excellent" : score >= 60 ? "Needs Work" : "Needs Improvement"}
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default ATS;