import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme";
import { NavBar } from "@/components/NavBar";
import "./globals.css";
import { JobDescriptionProvider } from "@/components/Context/JobDec";
import { ScoreProvider } from "@/components/Context/FileData";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ScaleUp",
  description: "AI-powered resume analysis and optimization tool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider>
          <JobDescriptionProvider>
            <ScoreProvider>
              <div className="min-h-screen">
                <NavBar />
                <main>{children}</main>
              </div>
            </ScoreProvider>
          </JobDescriptionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
