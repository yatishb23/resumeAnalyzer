"use client";

import { Card,CardContent } from "./ui/card";
import { motion } from "framer-motion";
import { useTheme } from "./theme";
import { cn } from "@/lib/utils";

interface Props {
  content: string[];
}

const ResumeContent: React.FC<Props> = ({ content }) => {
  const { theme } = useTheme();
  const feedbackContent = content ?? [];

  return (
    <Card
      className={cn(
        "rounded-xl border shadow-sm m-4 overflow-hidden",
        theme === "dark"
          ? "bg-gray-900/50 border-gray-800"
          : "bg-white border-gray-200"
      )}
    >
      <CardContent className="p-6 space-y-6">
        <div className="text-center">
          <h2
            className={cn(
              "text-2xl font-semibold",
              theme === "dark" ? "text-white" : "text-gray-900"
            )}
          >
            Content Feedback
          </h2>
          <p className="text-sm text-muted-foreground">
            Detailed feedback on your resume content.
          </p>
        </div>
        {feedbackContent.length > 0 ? (
          feedbackContent.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "p-4 rounded-lg border",
                theme === "dark"
                  ? "border-blue-800/50 bg-blue-900/10"
                  : "border-blue-200 bg-blue-50"
              )}
            >
              <p
                className={cn(
                  "text-sm",
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                )}
              >
                {item}
              </p>
            </motion.div>
          ))
        ) : (
          <p
            className={cn(
              "text-center text-sm",
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            )}
          >
            No content feedback provided.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ResumeContent;
