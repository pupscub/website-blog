"use client"

import { createContext, useContext, useEffect, useMemo, useRef, useState, ReactNode } from "react"

// Update these paths to match the audio files stored in /public/audio
const PLAYLIST = [
  "/audio/jazz-1.mp3",
  "/audio/lofi-1.mp3",
  "/audio/lofi-2.mp3",
  "/audio/indian-flute.mp3",
]

interface MusicContextType {
  activeTrackIndex: number | null
  isPlaying: boolean
  toggleMusic: () => void
  hasPlaylist: boolean
  currentTrackName: string
}

const MusicContext = createContext<MusicContextType | undefined>(undefined)

const STORAGE_KEY = "music-state"

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [activeTrackIndex, setActiveTrackIndex] = useState<number | null>(null)
  const hasPlaylist = PLAYLIST.length > 0

  // Load initial state from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const { activeTrackIndex: storedIndex } = JSON.parse(stored)
        if (typeof storedIndex === "number" && storedIndex >= 0 && storedIndex < PLAYLIST.length) {
          setActiveTrackIndex(storedIndex)
        }
      }
    } catch (error) {
      console.error("Failed to load music state:", error)
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window === "undefined") return

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ activeTrackIndex }))
    } catch (error) {
      console.error("Failed to save music state:", error)
    }
  }, [activeTrackIndex])

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

  const toggleMusic = () => {
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

  const isPlaying = activeTrackIndex !== null

  const currentTrackName = useMemo(() => {
    if (activeTrackIndex === null) return ""
    const trackPath = PLAYLIST[activeTrackIndex]
    return trackPath.split("/").pop()?.replace(".mp3", "") || ""
  }, [activeTrackIndex])

  const contextValue = useMemo(() => ({
    activeTrackIndex,
    isPlaying,
    toggleMusic,
    hasPlaylist,
    currentTrackName,
  }), [activeTrackIndex, isPlaying, hasPlaylist, currentTrackName])

  return (
    <MusicContext.Provider value={contextValue}>
      {children}
    </MusicContext.Provider>
  )
}

export function useMusic() {
  const context = useContext(MusicContext)
  if (context === undefined) {
    throw new Error("useMusic must be used within a MusicProvider")
  }
  return context
}
