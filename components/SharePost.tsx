"use client"

import { useState } from "react"

type SharePostProps = {
  title: string
  url: string
}

export function SharePost({ title, url }: SharePostProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied">("idle")

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title, url })
      } catch (error) {
        console.error("Share failed", error)
      }
      return
    }

    await handleCopy()
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopyStatus("copied")
      setTimeout(() => setCopyStatus("idle"), 2000)
    } catch (error) {
      console.error("Copy failed", error)
    }
  }

  const shareTargets = [
    {
      label: "Share",
      action: handleShare,
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title,
      )}&url=${encodeURIComponent(url)}`,
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      label: copyStatus === "copied" ? "Copied!" : "Copy Link",
      action: handleCopy,
    },
  ] as const

  return (
    <div className="mt-12 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-slate-600 dark:text-slate-400">
      <span className="text-slate-500 dark:text-slate-400">Share</span>
      <div className="flex flex-wrap items-center gap-2">
        {shareTargets.map((target) =>
          "href" in target ? (
            <a
              key={target.label}
              href={target.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-slate-400 px-3 py-1 text-slate-600 transition hover:border-sky-600 hover:text-sky-600 dark:border-slate-600 dark:text-slate-300 dark:hover:text-sky-300"
            >
              {target.label}
            </a>
          ) : (
            <button
              key={target.label}
              type="button"
              onClick={target.action}
              className="rounded border border-slate-400 px-3 py-1 text-slate-600 transition hover:border-sky-600 hover:text-sky-600 dark:border-slate-600 dark:text-slate-300 dark:hover:text-sky-300"
            >
              {target.label}
            </button>
          ),
        )}
      </div>
    </div>
  )
}
