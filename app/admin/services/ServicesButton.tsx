"use client"
import Loader from "@/app/components/General/Loader"
import { Save } from "lucide-react"
import { useState, type ChangeEvent, useEffect } from "react"

interface Service {
  id: string
  type: "service" | "button"
  icon?: string
  title?: string
  subtitle?: string
  description?: string
  buttonText?: string
  buttonUrl?: string
}

interface ButtonFormData {
  buttonText: string
  buttonUrl: string
}

interface ServicesButtonProps {
  onDataChange: () => void
}

export default function ServicesButton({ onDataChange }: ServicesButtonProps) {
  const [buttonService, setButtonService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)
  const [buttonFormData, setButtonFormData] = useState<ButtonFormData>({
    buttonText: "GET STARTED",
    buttonUrl: "#",
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/services")
      const data = await res.json()

      const allServices = data.services || []
      const button = allServices.find((s: Service) => s.type === "button")

      setButtonService(button || null)
      if (button) {
        setButtonFormData({
          buttonText: button.buttonText || "GET STARTED",
          buttonUrl: button.buttonUrl || "#",
        })
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleButtonInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setButtonFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveButton = async () => {
    try {
      if (buttonService) {
        const response = await fetch(`/api/services/${buttonService.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "button",
            buttonText: buttonFormData.buttonText,
            buttonUrl: buttonFormData.buttonUrl,
          }),
        })

        if (response.ok) {
          await fetchData()
          onDataChange()
        }
      } else {
        const response = await fetch("/api/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "button",
            buttonText: buttonFormData.buttonText,
            buttonUrl: buttonFormData.buttonUrl,
          }),
        })

        if (response.ok) {
          await fetchData()
          onDataChange()
        }
      }
    } catch (error) {
      console.error("Error saving button:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader/>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-lg sm:text-xl font-semibold text-[var(--header-text)] mb-6">Button Settings</h2>

      <div className="bg-[var(--background)] border border-[var(--border-color)] rounded p-4 sm:p-6 max-w-2xl">
        <div className="space-y-4 sm:space-y-6">
          <div className="w-full">
            <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-1.5 sm:mb-2 font-medium">
              Button Text
            </label>
            <input
              type="text"
              name="buttonText"
              value={buttonFormData.buttonText}
              onChange={handleButtonInputChange}
              className="w-full px-3 sm:px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm sm:text-base"
            />
          </div>

          <div className="w-full">
            <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-1.5 sm:mb-2 font-medium">
              Button URL
            </label>
            <input
              type="text"
              name="buttonUrl"
              value={buttonFormData.buttonUrl}
              onChange={handleButtonInputChange}
              placeholder="https://example.com"
              className="w-full px-3 sm:px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm sm:text-base"
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={handleSaveButton}
              className="flex items-center justify-center gap-2 px-6 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded font-medium text-sm sm:text-base"
            >
              <Save className="w-4 h-4 flex-shrink-0" />
              <span>Save Button Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}