"use client"
import { useState } from "react"
import { Trash2 } from "lucide-react"

interface WhatWeDoFormProps {
  data: any
  onSave: (data: any) => void
}

export default function WhatWeDoForm({ data, onSave }: WhatWeDoFormProps) {
  const [formData, setFormData] = useState(data.whatWeDo)

  const handleHeadingChange = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleStepChange = (section: string, index: number, value: string) => {
    const key = section === "first" ? "firstSteps" : "secondSteps"
    const newSteps = [...formData[key]]
    newSteps[index] = value
    setFormData((prev: any) => ({
      ...prev,
      [key]: newSteps,
    }))
  }

  const addStep = (section: string) => {
    const key = section === "first" ? "firstSteps" : "secondSteps"
    setFormData((prev: any) => ({
      ...prev,
      [key]: [...prev[key], ""],
    }))
  }

  const removeStep = (section: string, index: number) => {
    const key = section === "first" ? "firstSteps" : "secondSteps"
    setFormData((prev: any) => ({
      ...prev,
      [key]: prev[key].filter((_: string, i: number) => i !== index),
    }))
  }

  const handleSubmit = () => {
    onSave({
      ...data,
      whatWeDo: formData,
    })
  }

  return (
    <div className="bg-background rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="space-y-6">
        {/* First Section */}
        <div className="pb-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium mb-4">First Section</h3>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Heading</label>
            <input
              type="text"
              value={formData.firstHeading}
              onChange={(e) => handleHeadingChange("firstHeading", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              placeholder="Enter heading"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium ">Steps/Items</label>
              <button
                onClick={() => addStep("first")}
                className="px-3 py-1 text-sm bg-[var(--primary)] text-[var(--primary-foreground)] rounded hover:opacity-90 transition-opacity"
              >
                Add Item
              </button>
            </div>
            {formData.firstSteps.map((step: string, index: number) => (
              <div key={index} className="flex gap-2 items-start">
                <input
                  type="text"
                  value={step}
                  onChange={(e) => handleStepChange("first", index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  placeholder={`Step ${index + 1}`}
                />
                <button
                  onClick={() => removeStep("first", index)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Second Section */}
        <div>
          <h3 className="text-lg font-medium mb-4">Second Section</h3>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Heading</label>
            <input
              type="text"
              value={formData.secondHeading}
              onChange={(e) => handleHeadingChange("secondHeading", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              placeholder="Enter heading"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium ">Steps/Items</label>
              <button
                onClick={() => addStep("second")}
                className="px-3 py-1 text-sm bg-[var(--primary)] text-[var(--primary-foreground)] rounded hover:opacity-90 transition-opacity"
              >
                Add Item
              </button>
            </div>
            {formData.secondSteps.map((step: string, index: number) => (
              <div key={index} className="flex gap-2 items-start">
                <input
                  type="text"
                  value={step}
                  onChange={(e) => handleStepChange("second", index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  placeholder={`Step ${index + 1}`}
                />
                <button
                  onClick={() => removeStep("second", index)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSubmit}
          className="w-full mt-4 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded font-medium hover:opacity-90 transition-opacity"
        >
          Save What We Do Section
        </button>
      </div>
    </div>
  )
}
