// app/context/GeneralSettingsContext.tsx
"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { GeneralSettingsData } from "@/lib/models/GeneralSettings"

interface GeneralSettingsContextType {
  settings: GeneralSettingsData | null
}

const GeneralSettingsContext = createContext<GeneralSettingsContextType | undefined>(undefined)

export function GeneralSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<GeneralSettingsData | null>(null)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/general-settings")
        const data = await response.json()
        setSettings(data.settings)
      } catch (error) {
        console.error("Failed to fetch general settings:", error)
      }
    }

    fetchSettings()
  }, [])

  return <GeneralSettingsContext.Provider value={{ settings }}>{children}</GeneralSettingsContext.Provider>
}

export function useGeneralSettings() {
  const context = useContext(GeneralSettingsContext)
  if (context === undefined) {
    throw new Error("useGeneralSettings must be used within GeneralSettingsProvider")
  }
  return context
}
