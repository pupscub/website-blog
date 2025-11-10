"use client"

import { useMemo } from "react"
import { Music, Slash } from "lucide-react"
import { useMusic } from "@/components/MusicProvider"

export function MusicToggle() {
  const { isPlaying, toggleMusic, hasPlaylist, activeTrackIndex } = useMusic()

  const ariaLabel = useMemo(() => {
    if (!hasPlaylist) {
      return "Background music unavailable"
    }
    if (activeTrackIndex === null) {
      return "Play background music (track 1)"
    }
    const nextIndex = activeTrackIndex + 1
    if (nextIndex < 4) { // PLAYLIST.length is 4
      return `Switch to track ${nextIndex + 1}`
    }
    return "Turn off background music"
  }, [activeTrackIndex, hasPlaylist])

  return (
    <button
      type="button"
      onClick={toggleMusic}
      aria-label={ariaLabel}
      disabled={!hasPlaylist}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 bg-[var(--card)] text-slate-600 shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 hover:text-sky-600 dark:border-slate-700 dark:text-slate-300 dark:hover:text-amber-300 ${
        isPlaying ? "text-sky-600 dark:text-amber-300" : ""
      } disabled:cursor-not-allowed disabled:opacity-40`}
    >
      <span className="relative inline-flex items-center justify-center">
        <Music className="h-4 w-4" aria-hidden />
        {!isPlaying && <Slash className="absolute inset-0 h-4 w-4" aria-hidden />}
      </span>
    </button>
  )
}
