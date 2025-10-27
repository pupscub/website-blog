"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

import { ThemeToggle } from "@/components/ThemeToggle"

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [activeHash, setActiveHash] = useState("")

  useEffect(() => {
    if (typeof window === "undefined") return

    const updateHash = () => {
      setActiveHash(window.location.hash)
    }

    updateHash()
    window.addEventListener("hashchange", updateHash)

    return () => {
      window.removeEventListener("hashchange", updateHash)
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    setActiveHash(window.location.hash)
  }, [pathname])

  const hasActiveHash = activeHash.length > 0

  return (
    <div className="relative min-h-screen w-full bg-transparent text-[var(--foreground)] font-mono antialiased transition-colors duration-300 selection:bg-sky-400/80 selection:text-slate-950">
      <div aria-hidden className="background-layer background-sunrise"></div>
      <div aria-hidden className="background-layer background-starfield"></div>
      <div aria-hidden className="background-layer background-meteors"></div>
      <div className="relative mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center px-6 py-12 sm:px-8">
        <header className="relative mb-10 flex w-full max-w-3xl items-center justify-center text-center">
          <h1 className="text-lg font-semibold uppercase tracking-[0.28em] text-sky-600 drop-shadow-[0_0_18px_rgba(56,189,248,0.32)] dark:text-sky-300">
            Aditya Singh
          </h1>
          <div className="absolute right-0">
            <ThemeToggle />
          </div>
        </header>

        <nav className="mb-10 w-full max-w-3xl text-xs uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {NAV_ITEMS.map((item) => {
              const [itemPath, hashFragment] = item.href.split("#")
              const normalizedPath = itemPath || "/"
              const itemHash = hashFragment ? `#${hashFragment}` : ""

              const matchesPath =
                normalizedPath === "/"
                  ? pathname === "/"
                  : pathname === normalizedPath || pathname.startsWith(`${normalizedPath}/`)

              const isActive = (() => {
                if (itemHash) {
                  return pathname === "/" && activeHash === itemHash
                }
                if (normalizedPath === "/") {
                  return pathname === "/" && !hasActiveHash
                }
                return matchesPath
              })()

              const indicatorClass = isActive
                ? "text-slate-700 dark:text-slate-200"
                : "text-slate-400 dark:text-slate-600"

              const linkClass = `transition-colors duration-150 hover:text-sky-600 focus-visible:text-sky-600 dark:hover:text-sky-300 dark:focus-visible:text-sky-200 ${
                isActive ? "text-slate-800 dark:text-slate-200" : ""
              }`

              return (
                <span key={item.label} className="flex items-center gap-3">
                  <span className={indicatorClass}>{isActive ? ">" : "|"}</span>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </span>
              )
            })}
          </div>
        </nav>

        <main className="w-full max-w-3xl">
          <div className="border border-[var(--border)] bg-[var(--card)] p-8 text-[var(--foreground)] transition-colors duration-300">
            {children}
          </div>
        </main>

        <footer className="mt-10 w-full max-w-3xl text-[12px] uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
          <div className="flex flex-wrap items-center justify-center gap-5">
            <a
              href="mailto:iadtyasingh23@gmail.com"
              className="transition-colors duration-150 hover:text-sky-600 focus-visible:text-sky-600 dark:hover:text-sky-300 dark:focus-visible:text-sky-300"
            >
              Email
            </a>
            <a
              href="https://x.com/pupscub"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-150 hover:text-sky-600 focus-visible:text-sky-600 dark:hover:text-sky-300 dark:focus-visible:text-sky-300"
            >
              X
            </a>
            <a
              href="https://www.linkedin.com/in/aditya2312"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-150 hover:text-sky-600 focus-visible:text-sky-600 dark:hover:text-sky-300 dark:focus-visible:text-sky-300"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/pupscub"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-150 hover:text-sky-600 focus-visible:text-sky-600 dark:hover:text-sky-300 dark:focus-visible:text-sky-300"
            >
              GitHub
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}
