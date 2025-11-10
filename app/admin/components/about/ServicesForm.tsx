"use client"
import { useState } from "react"
import type React from "react"

import { Trash2, Plus } from "lucide-react"
import Image from "next/image"

interface ServicesFormProps {
  data: any
  onSave: (data: any) => void
}

export default function ServicesForm({ data, onSave }: ServicesFormProps) {
  const [formData, setFormData] = useState(data.services)
  const [imagePreviews, setImagePreviews] = useState<{ [key: number]: string }>({})

  const handleServiceChange = (index: number, field: string, value: string) => {
    const newServices = [...formData.services]
    newServices[index] = { ...newServices[index], [field]: value }
    setFormData((prev: any) => ({
      ...prev,
      services: newServices,
    }))
  }

  const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setImagePreviews((prev) => ({
          ...prev,
          [index]: base64String,
        }))
        handleServiceChange(index, "image", base64String)
      }
      reader.readAsDataURL(file)
    }
  }

  const addService = () => {
    setFormData((prev: any) => ({
      ...prev,
      services: [
        ...prev.services,
        {
          image: "",
          title: "",
          description: "",
          buttonText: "",
          buttonUrl: "",
        },
      ],
    }))
  }

  const removeService = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      services: prev.services.filter((_: any, i: number) => i !== index),
    }))
    const newPreviews = { ...imagePreviews }
    delete newPreviews[index]
    setImagePreviews(newPreviews)
  }

  const handleSubmit = () => {
    onSave({
      ...data,
      services: formData,
    })
  }

  return (
    <div className="bg-background rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Services</h3>
          <button
            onClick={addService}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-[var(--primary)] text-[var(--primary-foreground)] rounded hover:opacity-90 transition-opacity"
          >
            <Plus size={16} />
            Add Service
          </button>
        </div>

        <div className="space-y-4">
          {formData.services.map((service: any, index: number) => (
            <div
              key={index}
              className="p-4 rounded border border-gray-200 dark:border-gray-600"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium">Service {index + 1}</h4>
                <button
                  onClick={() => removeService(index)}
                  className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="space-y-3">
                {/* Image */}
                <div>
                  <label className="block text-xs font-medium mb-1">Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(index, e)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  />
                  {(imagePreviews[index] || service.image) && (
                    <div className="mt-2 relative w-32 h-32">
                      <Image
                        src={imagePreviews[index] || service.image}
                        alt="Preview"
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  )}
                </div>

                {/* Title */}
                <div>
                  <label className="block text-xs font-medium mb-1">Title</label>
                  <input
                    type="text"
                    value={service.title}
                    onChange={(e) => handleServiceChange(index, "title", e.target.value)}
                    className="w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    placeholder="Service title"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-medium mb-1">Description</label>
                  <textarea
                    value={service.description}
                    onChange={(e) => handleServiceChange(index, "description", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] min-h-16"
                    placeholder="Service description"
                  />
                </div>

                {/* Button */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Button Text
                    </label>
                    <input
                      type="text"
                      value={service.buttonText}
                      onChange={(e) => handleServiceChange(index, "buttonText", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                      placeholder="Button text"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Button URL
                    </label>
                    <input
                      type="text"
                      value={service.buttonUrl}
                      onChange={(e) => handleServiceChange(index, "buttonUrl", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                      placeholder="Button URL"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <button
          onClick={handleSubmit}
          className="w-full mt-4 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded font-medium hover:opacity-90 transition-opacity"
        >
          Save Services Section
        </button>
      </div>
    </div>
  )
}
