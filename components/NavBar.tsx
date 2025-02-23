"use client";

import { ChevronDown } from "lucide-react";
import { ResumeDropdown } from "./Dropdowns/ResumeDropdown";
import { CoverLetterDropdown } from "./Dropdowns/CoverDropdown";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/theme";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export function NavBar() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCoverLetterOpen, setIsCoverLetterOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  // Close dropdowns on route change
  useEffect(() => {
    setIsResumeOpen(false);
    setIsCoverLetterOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b/20 shadow-md backdrop-blur-sm transition-all ${
        theme === "dark"
          ? "bg-gray-900/80 text-white border-gray-700"
          : "bg-white/80 text-black border-gray-200"
      }`}
    >
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left Section */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <svg
              className={`h-8 w-8 ${
                theme === "dark" ? "text-white" : "text-black-500"
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
            </svg>
            <span className="text-xl font-semibold">ScaleUp</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <button
              className="flex items-center gap-2"
              onClick={() => {
                setIsResumeOpen(!isResumeOpen);
                setIsCoverLetterOpen(false);
              }}
              onMouseOver={() => {
                setIsResumeOpen(true);
                setIsCoverLetterOpen(false);
              }}
            >
              Resume
              <ChevronDown className="h-4 w-4" />
            </button>
            <button
              className="flex items-center gap-2 "
              onClick={() => {
                setIsCoverLetterOpen(!isCoverLetterOpen);
                setIsResumeOpen(false);
              }}
              onMouseOver={() => {
                setIsCoverLetterOpen(true);
                setIsResumeOpen(false);
              }}
            >
              Cover Letter
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-colors duration-300 bg-gray-200 dark:bg-gray-800 shadow-lg hover:shadow-xl hover:bg-gray-300 "
            aria-label="Toggle theme"
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              key={theme}
              initial={{ rotate: 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -180, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {theme === "dark" ? (
                <Sun className="h-6 w-6 text-yellow-400" />
              ) : (
                <Moon className="h-6 w-6 text-blue-500" />
              )}
            </motion.div>
          </motion.button>

          {/* New Ask AI Button */}
          <button
            onClick={() => router.push("/chatbot")}
            className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            Ask AI
          </button>

          <button onClick={() => router.push("/login")}>
            <Link href="/login">Log In</Link>
          </button>
          <button>
            <Link href="/signup">Sign Up</Link>
          </button>
        </div>
      </div>

      {/* Resume Dropdown */}
      <div
        className={`absolute top-full left-0 w-full bg-white shadow-lg border-t transform transition-all duration-300 ${
          isResumeOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
        onMouseLeave={() => setIsResumeOpen(false)}
      >
        {isResumeOpen && <ResumeDropdown />}
      </div>

      {/* Cover Letter Dropdown */}
      <div
        className={`absolute top-full left-0 w-full bg-white shadow-lg border-t transform transition-all duration-300 ${
          isCoverLetterOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
        onMouseLeave={() => setIsCoverLetterOpen(false)}
      >
        {isCoverLetterOpen && <CoverLetterDropdown />}
      </div>
    </nav>
  );
}