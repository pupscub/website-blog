"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Music, Slash } from "lucide-react"

// Update these paths to match the audio files stored in /public/audio
const PLAYLIST = [
  "/audio/jazz-1.mp3",
  "/audio/lofi-1.mp3",
  "/audio/lofi-2.mp3",
  "/audio/indian-flute.mp3",
]

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [activeTrackIndex, setActiveTrackIndex] = useState<number | null>(null)
  const hasPlaylist = PLAYLIST.length > 0

  useEffect(() => {
    if (!hasPlaylist) return

    const audio = new Audio()
    audio.loop = false
    audio.volume = 0.3
    audioRef.current = audio

    const handleEnded = () => {
      setActiveTrackIndex((prev) => {
        if (prev === null) return null
        const nextIndex = (prev + 1) % PLAYLIST.length
        return nextIndex
      })
    }

    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("ended", handleEnded)
      audio.pause()
      audio.currentTime = 0
    }
  }, [hasPlaylist])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !hasPlaylist) return

    if (activeTrackIndex === null) {
      audio.pause()
      audio.currentTime = 0
      return
    }

    const nextSrc = PLAYLIST[activeTrackIndex]
    if (!nextSrc) {
      setActiveTrackIndex(null)
      return
    }

    audio.src = nextSrc
    audio.currentTime = 0

    audio.play().catch((error) => {
      console.error("Unable to continue playback:", error)
      setActiveTrackIndex(null)
    })
  }, [activeTrackIndex, hasPlaylist])

  const ariaLabel = useMemo(() => {
    if (!hasPlaylist) {
      return "Background music unavailable"
    }
    if (activeTrackIndex === null) {
      return "Play background music (track 1)"
    }
    const nextIndex = activeTrackIndex + 1
    if (nextIndex < PLAYLIST.length) {
      return `Switch to track ${nextIndex + 1}`
    }
    return "Turn off background music"
  }, [activeTrackIndex, hasPlaylist])

  function handleClick() {
    if (!hasPlaylist) return

    setActiveTrackIndex((prev) => {
      if (prev === null) {
        return 0
      }

      const nextIndex = prev + 1
      if (nextIndex >= PLAYLIST.length) {
        return null
      }

      return nextIndex
    })
  }

  const isActive = activeTrackIndex !== null

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel}
      disabled={!hasPlaylist}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 bg-[var(--card)] text-slate-600 shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 hover:text-sky-600 dark:border-slate-700 dark:text-slate-300 dark:hover:text-amber-300 ${
        isActive ? "text-sky-600 dark:text-amber-300" : ""
      } disabled:cursor-not-allowed disabled:opacity-40`}
    >
      <span className="relative inline-flex items-center justify-center">
        <Music className="h-4 w-4" aria-hidden />
        {!isActive && <Slash className="absolute inset-0 h-4 w-4" aria-hidden />}
      </span>
    </button>
  )
}
