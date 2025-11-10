"use client"
import { useState } from "react"
import type React from "react"

import Image from "next/image"

interface HeroSectionFormProps {
  data: any
  onSave: (data: any) => void
}

export default function HeroSectionForm({ data, onSave }: HeroSectionFormProps) {
  const [formData, setFormData] = useState(data.hero)
  const [imagePreview, setImagePreview] = useState<string | null>(formData.image)

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubheadingChange = (index: number, field: string, value: string) => {
    const newSubheadings = [...formData.subheadings]
    newSubheadings[index] = { ...newSubheadings[index], [field]: value }
    setFormData((prev: any) => ({
      ...prev,
      subheadings: newSubheadings,
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setImagePreview(base64String)
        handleChange("image", base64String)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = () => {
    onSave({
      ...data,
      hero: formData,
    })
  }

  return (
    <div className="bg-background rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="space-y-4">
        {/* Main Heading */}
        <div>
          <label className="block text-sm font-medium text-paragraph mb-1">Main Heading</label>
          <input
            type="text"
            value={formData.heading}
            onChange={(e) => handleChange("heading", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-background text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            placeholder="Enter main heading"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium text-paragraph mb-1">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-background text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
          {imagePreview && (
            <div className="mt-3 relative w-48 h-48">
              <Image src={imagePreview || "/placeholder.svg"} alt="Preview" fill className="object-cover rounded" />
            </div>
          )}
        </div>

        {/* Paragraph */}
        <div>
          <label className="block text-sm font-medium text-paragraph mb-1">Paragraph</label>
          <textarea
            value={formData.paragraph}
            onChange={(e) => handleChange("paragraph", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] min-h-24"
            placeholder="Enter paragraph text"
          />
        </div>

        {/* Three Subheadings */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <h3 className="text-sm font-medium text-paragraph mb-4">Three Subheadings</h3>
          {formData.subheadings.map((subheading: any, index: number) => (
            <div key={index} className="mb-4 p-4 rounded">
              <label className="block text-xs font-medium mb-1">
                Subheading {index + 1} Title
              </label>
              <input
                type="text"
                value={subheading.title}
                onChange={(e) => handleSubheadingChange(index, "title", e.target.value)}
                className="w-full px-3 py-2 mb-2 border border-gray-300 rounded text-paragraph text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                placeholder={`Subheading ${index + 1} title`}
              />
              <label className="block text-xs font-medium mb-1">
                Subheading {index + 1} Description
              </label>
              <textarea
                value={subheading.description}
                onChange={(e) => handleSubheadingChange(index, "description", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] min-h-16"
                placeholder={`Subheading ${index + 1} description`}
              />
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="grid grid-cols-2 gap-4 border-t border-gray-200 dark:border-gray-700 pt-4">
          <div>
            <label className="block text-sm font-medium mb-1">Button Text</label>
            <input
              type="text"
              value={formData.buttonText}
              onChange={(e) => handleChange("buttonText", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              placeholder="Button text"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Button URL</label>
            <input
              type="text"
              value={formData.buttonUrl}
              onChange={(e) => handleChange("buttonUrl", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              placeholder="Button URL"
            />
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSubmit}
          className="w-full mt-4 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded font-medium hover:opacity-90 transition-opacity"
        >
          Save Hero Section
        </button>
      </div>
    </div>
  )
}
