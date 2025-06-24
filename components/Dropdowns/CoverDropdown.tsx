'use client'

import {
  Layout,
  FileText,
  File,
  BookOpen,
  ChevronRight
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '@/components/ui/card'

export function CoverLetterDropdown() {
  return (
    <div className="absolute top-full left-0 w-full backdrop-blur-md bg-white dark:bg-neutral-900 border-t border-border z-50 shadow-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-4 gap-6 ">
        {/* Templates */}
        <div>
          <CardHeader className="flex flex-row items-center gap-2">
            <Layout className="h-5 w-5" />
            <CardTitle className="text-base font-semibold">Cover Letter Templates</CardTitle>
            <ChevronRight className="h-4 w-4" />
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            <TemplateLink
              href="https://resumegenius.com/cover-letter-templates/modern-templates"
              icon={<Layout className="h-4 w-4" />}
              title="Modern Templates"
              description="Contemporary designs perfect for tech, creative, and startup roles"
            />
            <TemplateLink
              href="https://create.microsoft.com/en-us/templates/cover-letters"
              icon={<FileText className="h-4 w-4" />}
              title="Professional Templates"
              description="Classic formats ideal for corporate, legal, and executive positions"
            />
            <TemplateLink
              href="https://resumegenius.com/cover-letter-examples/academic-cover-letter-sample"
              icon={<File className="h-4 w-4" />}
              title="Academic Templates"
              description="Structured formats for academic and research positions"
            />
          </CardContent>
        </div>

        {/* Guides */}
        <div>
          <CardHeader className="flex flex-row items-center gap-2">
            <BookOpen className="h-5 w-5" />
            <CardTitle className="text-base font-semibold">Writing Guides</CardTitle>
            <ChevronRight className="h-4 w-4" />
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            <InternalLink
              href="/cover-letter-writing"
              title="Writing a Cover Letter"
              description="Step-by-step guide to crafting a compelling cover letter"
            />
            <GuideSection
              title="Opening Paragraphs"
              description="How to write attention-grabbing introductions that showcase your value"
            />
            <GuideSection
              title="Addressing Requirements"
              description="Techniques for matching your skills to job requirements effectively"
            />
          </CardContent>
        </div>

        {/* Examples */}
        <div>
          <CardHeader className="flex flex-row items-center gap-2">
            <Layout className="h-5 w-5" />
            <CardTitle className="text-base font-semibold">Industry Examples</CardTitle>
            <ChevronRight className="h-4 w-4" />
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-3">
              {['Software Engineer', 'Marketing Manager', 'Research Assistant', 'Product Manager'].map((role) => (
                <li key={role} className="hover:text-emerald-600 transition-colors">
                  <Link href={`/examples/${role.toLowerCase().replace(' ', '-')}`}>
                    {role}
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </div>

        {/* Preview */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="/cover-letter.png"
                alt="Cover letter preview"
                fill
                className="object-cover rounded-b-lg"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Reusable components
const TemplateLink = ({
  href,
  icon,
  title,
  description
}: {
  href: string
  icon: React.ReactNode
  title: string
  description: string
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
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
      </div>
    </div>
  </a>
)

const InternalLink = ({
  href,
  title,
  description
}: {
  href: string
  title: string
  description: string
}) => (
  <Link href={href} className="group block hover:no-underline">
    <div>
      <p className="font-medium group-hover:text-emerald-600 transition-colors">{title}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
    </div>
  </Link>
)

const GuideSection = ({
  title,
  description
}: {
  title: string
  description: string
}) => (
  <div className="group">
    <p className="font-medium text-gray-900 dark:text-white">{title}</p>
    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
  </div>
)
