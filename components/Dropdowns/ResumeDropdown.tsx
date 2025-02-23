'use client';

import {  Layout, FileText, File, BookOpen, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/components/theme';

export function ResumeDropdown() {
  const { theme } = useTheme();

  return (
    <div
      className={`absolute top-full left-0 w-full shadow-lg border-t transform transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Templates Column */}
        <div className="flex flex-col gap-6">
          <h3 className="flex items-center gap-2 font-medium mb-2">
            <Layout className="h-5 w-5" />
            <span>Resume Templates</span>
            <ChevronRight className="h-4 w-4" />
          </h3>
          
          <div className="space-y-6">
            <TemplateLink
              href="https://www.overleaf.com/latex/templates/tagged/cv"
              icon={<Layout className="h-4 w-4" />}
              title="Creative Templates"
              description="Creative resume for creative industries to capture the recruiter's attention"
            />

            <TemplateLink
              href="https://enhancv.com/resume-templates/traditional/"
              icon={<FileText className="h-4 w-4" />}
              title="Traditional Templates"
              description="For conservative industries when you need to show your career accomplishments"
            />

            <TemplateLink
              href="https://resumegenius.com/resume-templates/basic-templates"
              icon={<File className="h-4 w-4" />}
              title="Simple Templates"
              description="Focus on your skills and accomplishments with simple resume templates"
            />
          </div>
        </div>

        {/* Guides Column */}
        <div className="flex flex-col gap-6">
          <h3 className="flex items-center gap-2 font-medium mb-2">
            <BookOpen className="h-5 w-5" />
            <span>Resume Writing Guides</span>
            <ChevronRight className="h-4 w-4" />
          </h3>

          <div className="space-y-6">
            <InternalLink
              href="/resume-writing"
              title="Writing a Resume"
              description="The most comprehensive guide on the internet about writing a resume"
            />

            <InternalLink
              href="/summary"
              title="Resume Summary"
              description="How to include and write a summary that gets your point across quickly"
            />

            <InternalLink
              href="/fitting"
              title="Fitting Experience on One Page"
              description="The tricks behind fitting a lot of experience on a single page"
            />
          </div>
        </div>

        {/* Examples Column */}
        <div className="flex flex-col gap-6">
          <h3 className="flex items-center gap-2 font-medium mb-2">
            <Layout className="h-5 w-5" />
            <span>Resume Examples</span>
            <ChevronRight className="h-4 w-4" />
          </h3>
          
          <ul className="space-y-3">
            {['Project Manager', 'Data Scientist', 'Scrum Master', 'Business Analyst'].map((role) => (
              <li key={role} className="hover:text-emerald-600 transition-colors">
                <Link href={`/examples/${role.toLowerCase().replace(' ', '-')}`}>
                  {role}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Preview Column */}
        <div className={`rounded-lg p-6 ${
          theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
        }`}>
          <h3 className="text-2xl font-bold mb-4">
            ATS-friendly resume builder
          </h3>
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/resume.png"
              alt="ATS-friendly resume preview"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable link components
const TemplateLink = ({ href, icon, title, description }: { 
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group block hover:no-underline"
  >
    <div className="flex items-start gap-3">
      <span className="text-emerald-600 group-hover:text-emerald-700 transition-colors">
        {icon}
      </span>
      <div>
        <p className="font-medium group-hover:text-emerald-600 transition-colors">
          {title}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {description}
        </p>
      </div>
    </div>
  </a>
);

const InternalLink = ({ href, title, description }: { 
  href: string;
  title: string;
  description: string;
}) => (
  <Link href={href} className="group block hover:no-underline">
    <div>
      <p className="font-medium group-hover:text-emerald-600 transition-colors">
        {title}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
        {description}
      </p>
    </div>
  </Link>
);