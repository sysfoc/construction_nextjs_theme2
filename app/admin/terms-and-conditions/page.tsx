"use client"
import { Save } from "lucide-react"
import { useState, useEffect, type ChangeEvent } from "react"
import dynamic from "next/dynamic";
import Loader from "@/app/components/General/Loader";

const LazyJoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
interface TermsAndConditions {
  _id: string
  title: string
  content: string
  lastUpdated: string
}

export default function TermsAndConditionsManagementPage() {
  const [termsAndConditions, setTermsAndConditions] = useState<TermsAndConditions | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  })

  useEffect(() => {
    fetchTermsAndConditions()
  }, [])

  const fetchTermsAndConditions = async () => {
    try {
      const response = await fetch("/api/terms-and-conditions")
      const data = await response.json()
      setTermsAndConditions(data)
      setFormData({
        title: data.title,
        content: data.content,
      })
    } catch (error) {
      console.error("Error fetching terms and conditions:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleContentChange = (content: string) => {
    setFormData((prev) => ({ ...prev, content }))
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)
      const response = await fetch("/api/terms-and-conditions", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setTermsAndConditions(data)
        alert("Terms and Conditions updated successfully!")
      }
    } catch (error) {
      console.error("Error saving terms and conditions:", error)
      alert("Failed to save Terms and Conditions")
    } finally {
      setIsSaving(false)
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
    <div className="w-full min-h-screen bg-background overflow-x-hidden">
      <div className="p-4 sm:p-6 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 items-stretch sm:items-center justify-between mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-foreground break-words">
            Terms & Conditions Management
          </h1>
        </div>

        {termsAndConditions && (
          <div className="bg-background border border-border rounded p-3 sm:p-4 w-full overflow-hidden">
            <div className="space-y-3 sm:space-y-4">
              {/* Title Section */}
              <div className="w-full">
                <label className="block text-xs sm:text-sm text-foreground mb-1.5 sm:mb-2 font-medium">
                  Page Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                />
              </div>

              {/* Content Section */}
              <div className="w-full">
                <label className="block text-xs sm:text-sm text-foreground mb-1.5 sm:mb-2 font-medium">Content</label>
                <LazyJoditEditor className="text-black/80" value={formData.content} onBlur={handleContentChange} tabIndex={1} />
                <p className="text-xs text-gray-500 mt-2">
                  Last updated: {new Date(termsAndConditions.lastUpdated).toLocaleString()}
                </p>
              </div>

              {/* Save Button */}
              <div className="flex flex-col sm:flex-row justify-end gap-2 pt-2 w-full">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded font-medium text-sm sm:text-base hover:bg-opacity-90 disabled:opacity-50"
                >
                  <Save className="w-4 h-4 flex-shrink-0" />
                  <span>{isSaving ? "Saving..." : "Save Changes"}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
