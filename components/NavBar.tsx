"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Menu, X, Zap, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResumeDropdown } from "./Dropdowns/ResumeDropdown";
import { CoverLetterDropdown } from "./Dropdowns/CoverDropdown";
import { ModeToggle } from "./theme-toggle";

export function NavBar() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCoverLetterOpen, setIsCoverLetterOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsResumeOpen(false);
    setIsCoverLetterOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-background/30 shadow-md border-b border-white/20 dark:border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white dark:text-black" />
          </div>
          <span className="text-black dark:text-white">ScaleUp</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          {/* Resume */}
          <div className="relative">
            <button
              className="flex items-center gap-1"
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
          </div>

          {/* Cover Letter */}
          <div className="relative">
            <button
              className="flex items-center gap-1"
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

          <button
            onClick={() => router.push("/chatbot")}
            className="hover:text-black dark:hover:text-white text-gray-700 dark:text-gray-300"
          >
            Ask AI
          </button>

          <Link
            href="/login"
            className="hover:text-black dark:hover:text-white text-gray-700 dark:text-gray-300"
          >
            Log In
          </Link>

          <Button
            onClick={() => router.push("/signup")}
            className="bg-black hover:bg-black/90 dark:bg-white dark:text-black text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Get Started
          </Button>

          <ModeToggle />
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          <ModeToggle />
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#0A0A0F] border-t border-gray-200 dark:border-gray-700 shadow-lg px-4 py-4 space-y-4 text-sm">
          <Link href="/resume" className="block" onClick={() => setMobileMenuOpen(false)}>
            Resume
          </Link>
          <Link href="/cover-letter" className="block" onClick={() => setMobileMenuOpen(false)}>
            Cover Letter
          </Link>
          <Link href="/pricing" className="block" onClick={() => setMobileMenuOpen(false)}>
            Pricing
          </Link>
          <button
            onClick={() => {
              router.push("/chatbot");
              setMobileMenuOpen(false);
            }}
            className="block text-left w-full"
          >
            Ask AI
          </button>
          <Link href="/login" className="block" onClick={() => setMobileMenuOpen(false)}>
            Log In
          </Link>
          <Button
            onClick={() => {
              router.push("/signup");
              setMobileMenuOpen(false);
            }}
            className="w-full"
          >
            Get Started
          </Button>
        </div>
      )}

      {/* Resume Dropdown */}
      <div
        className={`absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-700 transform transition-all duration-300 ${
          isResumeOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
        onMouseLeave={() => setIsResumeOpen(false)}
      >
        {isResumeOpen && <ResumeDropdown />}
      </div>

      {/* Cover Letter Dropdown */}
      <div
        className={`absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-700 transform transition-all duration-300 ${
          isCoverLetterOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
        onMouseLeave={() => setIsCoverLetterOpen(false)}
      >
        {isCoverLetterOpen && <CoverLetterDropdown />}
      </div>
    </nav>
  );
}
