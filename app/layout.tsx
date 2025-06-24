import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { ThemeProvider } from "@/components/theme-provider";
import { JobDescriptionProvider } from "@/components/Context/JobDec";
import { ScoreProvider } from "@/components/Context/FileData";

export const metadata = {
  title: "ScaleUp",
  description: "Product Designer & Developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <JobDescriptionProvider>
              <ScoreProvider>
                <NavBar />
                {children}
              </ScoreProvider>
            </JobDescriptionProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
