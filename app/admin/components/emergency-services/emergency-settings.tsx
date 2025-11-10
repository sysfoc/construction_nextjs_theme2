"use client"

import type React from "react"
import { useState } from "react"

interface GlobalSettings {
  emergencyEmail: string
  emergencyPhone: string
}

interface EmergencySettingsProps {
  initialSettings: GlobalSettings
  onSettingsSaved: () => void
}

export function EmergencySettings({ initialSettings, onSettingsSaved }: EmergencySettingsProps) {
  const [settings, setSettings] = useState<GlobalSettings>(initialSettings)
  const [settingsSaving, setSettingsSaving] = useState(false)

  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!settings.emergencyEmail || !settings.emergencyPhone) {
      alert("Please fill in both email and phone number")
      return
    }

    try {
      setSettingsSaving(true)
      const response = await fetch("/api/emergency-services/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      })

      if (!response.ok) throw new Error("Failed to save settings")
      alert("Emergency contact settings saved successfully")
      onSettingsSaved()
    } catch (error) {
      alert("Failed to save settings")
    } finally {
      setSettingsSaving(false)
    }
  }

  return (
    <div className="bg-background p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg sm:text-xl font-bold mb-6 text-paragraph">Global Emergency Contact Settings</h2>
      <form onSubmit={handleSaveSettings} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-paragraph mb-1">Emergency Email *</label>
          <input
            type="email"
            name="emergencyEmail"
            value={settings.emergencyEmail}
            onChange={handleSettingsChange}
            placeholder="emergency@company.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-paragraph mb-1">Emergency Phone *</label>
          <input
            type="tel"
            name="emergencyPhone"
            value={settings.emergencyPhone}
            onChange={handleSettingsChange}
            placeholder="(555) 123-4567"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={settingsSaving}
          className="col-span-1 max-w-72 sm:col-span-2 px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg disabled:opacity-50"
        >
          {settingsSaving ? "Saving..." : "Save Emergency Contact Settings"}
        </button>
      </form>
    </div>
  )
}
