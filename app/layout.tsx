import type { Metadata } from "next"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Aditya Singh | Software Engineer",
  description:
    "Portfolio, writing, and projects from Aditya Singh — building at the intersection of data science, ML, and humane software.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`terminal ${GeistMono.className}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
