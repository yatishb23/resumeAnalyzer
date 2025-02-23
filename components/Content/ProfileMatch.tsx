"use client";

import { Card, CardContent } from "../ui/card";
import { motion } from "framer-motion";
import { useTheme } from "../theme";
import { CheckCircle2, AlertTriangle, Lightbulb, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  score?: number;
  feedback?: {
    key_strengths?: string[];
    areas_for_improvement?: string[] | null;
    suggestions?: string;
  };
  keyword?: {
    hard_skills?: string[];
    soft_skills?: string[];
    tools_technologies?: string[];
    total_missing_keywords?: number;
  };
}

const ProfileMatch: React.FC<Props> = ({ score, feedback, keyword }) => {
  const { theme } = useTheme();

  // Provide default empty arrays for potentially undefined values
  const strengths = feedback?.key_strengths ?? [];
  const improvements = feedback?.areas_for_improvement ?? [];

  return (
    <Card
      className={cn(
        "rounded-xl border shadow-sm m-4 overflow-hidden",
        theme === "dark"
          ? "bg-gray-900/50 border-gray-800"
          : "bg-white border-gray-200"
      )}
    >
      <CardContent className="p-6 space-y-8">
        <div className="space-y-1 text-center">
          <h2 className="text-2xl font-semibold">Profile Compatibility Analysis</h2>
          <p className="text-sm text-muted-foreground">Comprehensive resume evaluation report</p>
        </div>

        {/* Score Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div
            className={cn(
              "rounded-full w-24 h-24 flex items-center justify-center",
              "bg-gradient-to-br from-teal-500 to-emerald-600",
              "shadow-lg shadow-teal-500/10"
            )}
          >
            <span className="text-2xl font-bold text-white">{score}%</span>
          </div>
          <p className="text-sm font-medium text-muted-foreground">
            Overall Match Score
          </p>
        </motion.div>

        {/* Key Strengths */}
        {strengths.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={cn(
              "p-4 rounded-lg border",
              theme === "dark"
                ? "border-emerald-800/50 bg-emerald-900/10"
                : "border-emerald-200 bg-emerald-50"
            )}
          >
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2
                className={cn(
                  "w-5 h-5",
                  theme === "dark" ? "text-emerald-400" : "text-emerald-600"
                )}
              />
              <h3 className="font-semibold">Key Strengths</h3>
            </div>
            <ul className="space-y-3">
              {strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-3 text-sm">
                  <span
                    className={cn(
                      "mt-0.5 text-xs",
                      theme === "dark" ? "text-emerald-400" : "text-emerald-600"
                    )}
                  >
                    ●
                  </span>
                  <span className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
                    {strength}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Areas for Improvement */}
        {improvements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={cn(
              "p-4 rounded-lg border",
              theme === "dark"
                ? "border-amber-800/50 bg-amber-900/10"
                : "border-amber-200 bg-amber-50"
            )}
          >
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle
                className={cn(
                  "w-5 h-5",
                  theme === "dark" ? "text-amber-400" : "text-amber-600"
                )}
              />
              <h3 className="font-semibold">Areas for Improvement</h3>
            </div>
            <ul className="space-y-3">
              {improvements.map((area, index) => (
                <li key={index} className="flex items-start gap-3 text-sm">
                  <span
                    className={cn(
                      "mt-0.5 text-xs",
                      theme === "dark" ? "text-amber-400" : "text-amber-600"
                    )}
                  >
                    ●
                  </span>
                  <span className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
                    {area}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Missing Keywords */}
        {keyword && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className={cn(
              "p-4 rounded-lg border",
              theme === "dark"
                ? "border-rose-800/50 bg-rose-900/10"
                : "border-rose-200 bg-rose-50"
            )}
          >
            <div className="flex items-center gap-3 mb-4">
              <Search
                className={cn(
                  "w-5 h-5",
                  theme === "dark" ? "text-rose-400" : "text-rose-600"
                )}
              />
              <h3 className="font-semibold">
                Missing Keywords ({keyword.total_missing_keywords ?? 0})
              </h3>
            </div>
            <div className="space-y-4">
              {Object.entries({
                "Technical Skills": keyword.hard_skills,
                "Soft Skills": keyword.soft_skills,
                "Tools & Technologies": keyword.tools_technologies,
              }).map(([title, items], sectionIndex) =>
                items?.length ? (
                  <div key={sectionIndex}>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">{title}</h4>
                    <div className="flex flex-wrap gap-2">
                      {(items || []).map((item, index) => (
                        <span
                          key={index}
                          className={cn(
                            "px-2.5 py-1 rounded-full text-xs font-medium",
                            theme === "dark"
                              ? "bg-rose-900/30 text-rose-300 border border-rose-800/50"
                              : "bg-rose-100 text-rose-700 border border-rose-200"
                          )}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </motion.div>
        )}

        {/* Suggestions */}
        {feedback?.suggestions && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className={cn(
              "p-4 rounded-lg border",
              theme === "dark"
                ? "border-blue-800/50 bg-blue-900/10"
                : "border-blue-200 bg-blue-50"
            )}
          >
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb
                className={cn(
                  "w-5 h-5",
                  theme === "dark" ? "text-blue-400" : "text-blue-600"
                )}
              />
              <h3 className="font-semibold">Optimization Suggestions</h3>
            </div>
            <div className="space-y-3 text-sm leading-relaxed">
              {feedback.suggestions.split("\n").map((line, index) => (
                <p
                  key={index}
                  className={cn(
                    "pl-5 relative before:absolute before:left-0 before:top-2",
                    "before:w-1.5 before:h-1.5 before:rounded-full",
                    theme === "dark"
                      ? "text-gray-300 before:bg-blue-400"
                      : "text-gray-700 before:bg-blue-600"
                  )}
                >
                  {line}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileMatch;
