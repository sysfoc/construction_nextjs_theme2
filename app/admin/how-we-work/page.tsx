"use client"

import { Save, Plus, Trash2, Edit2, X, Upload } from "lucide-react"
import Image from "next/image"
import { useState, type ChangeEvent, useEffect } from "react"
import type { HowWeWorkData } from "@/lib/models/HowWeWork"

interface FormData {
  title: string
  description: string
  imgSrc: string
  imagePreview: string | null
}

export default function HowWeWorkManagementPage() {
  const [steps, setSteps] = useState<HowWeWorkData[]>([])
  const [loading, setLoading] = useState(true)
  const [editingStep, setEditingStep] = useState<string | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    imgSrc: "",
    imagePreview: null,
  })

  useEffect(() => {
    fetchSteps()
  }, [])

  const fetchSteps = async () => {
    try {
      const response = await fetch("/api/how-we-work")
      const data = await response.json()
      setSteps(data.steps || [])
    } catch (error) {
      console.error("Error fetching steps:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (step: HowWeWorkData) => {
    setEditingStep(step._id)
    setFormData({
      title: step.title,
      description: step.description,
      imgSrc: step.imgSrc,
      imagePreview: step.imgSrc,
    })
  }

  const handleCancel = () => {
    setEditingStep(null)
    setIsAddingNew(false)
    setFormData({
      title: "",
      description: "",
      imgSrc: "",
      imagePreview: null,
    })
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          imagePreview: reader.result as string,
          imgSrc: reader.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveStep = async () => {
    try {
      if (isAddingNew) {
        const response = await fetch("/api/how-we-work", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            imgSrc: formData.imgSrc,
          }),
        })

        if (response.ok) {
          await fetchSteps()
          handleCancel()
        }
      } else if (editingStep) {
        const response = await fetch(`/api/how-we-work/${editingStep}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            imgSrc: formData.imgSrc,
          }),
        })

        if (response.ok) {
          await fetchSteps()
          handleCancel()
        }
      }
    } catch (error) {
      console.error("Error saving step:", error)
    }
  }

  const handleAddStep = () => {
    setIsAddingNew(true)
    setFormData({
      title: "",
      description: "",
      imgSrc: "",
      imagePreview: null,
    })
  }

  const handleDeleteStep = async (id: string) => {
    try {
      const response = await fetch(`/api/how-we-work/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await fetchSteps()
      }
    } catch (error) {
      console.error("Error deleting step:", error)
    }
  }

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-background flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-background overflow-x-hidden">
      <div className="p-4 sm:p-6 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 items-stretch sm:items-center justify-between mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-[var(--header-text)] break-words">
            How We Work Management
          </h1>
          <button
            onClick={handleAddStep}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded font-medium text-sm sm:text-base whitespace-nowrap"
          >
            <Plus className="w-4 h-4 flex-shrink-0" />
            <span>Add Step</span>
          </button>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {isAddingNew && (
            <div className="bg-[var(--background)] border border-[var(--border-color)] rounded p-3 sm:p-4 w-full overflow-hidden">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-[var(--header-text)]">Add New Step</h3>
                  <button onClick={handleCancel} className="text-gray-500 flex-shrink-0">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="w-full">
                  <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-2">Step Image</label>
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-32 h-32 sm:w-40 sm:h-28 border-2 border-dashed border-[var(--border-color)] rounded flex items-center justify-center flex-shrink-0 relative">
                      {formData.imagePreview ? (
                        <Image
                          src={formData.imagePreview || "/placeholder.svg"}
                          alt="Image preview"
                          fill
                          className="object-cover rounded"
                        />
                      ) : (
                        <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block text-xs sm:text-sm text-gray-600 file:mr-2 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded file:border-0 file:text-xs sm:file:text-sm file:font-medium file:bg-[var(--primary)] file:text-[var(--primary-foreground)] cursor-pointer"
                      />
                      <p className="text-xs text-gray-500 mt-2">Recommended: 600x400px</p>
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-1.5 sm:mb-2">
                    Step Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm sm:text-base"
                  />
                </div>

                <div className="w-full">
                  <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-1.5 sm:mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 sm:px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm sm:text-base resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-2 pt-2 w-full">
                  <button
                    onClick={handleCancel}
                    className="w-full sm:w-auto px-4 py-2 border border-[var(--border-color)] rounded text-[var(--header-text)] text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveStep}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded font-medium text-sm sm:text-base"
                  >
                    <Save className="w-4 h-4 flex-shrink-0" />
                    <span>Save Step</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {steps.map((step) => (
            <div
              key={step._id}
              className="bg-[var(--background)] border border-[var(--border-color)] rounded p-3 sm:p-4 w-full overflow-hidden"
            >
              {editingStep === step._id ? (
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h3 className="text-base sm:text-lg font-semibold text-[var(--header-text)]">Edit Step</h3>
                    <button onClick={handleCancel} className="text-gray-500 flex-shrink-0">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="w-full">
                    <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-2">Step Image</label>
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-32 h-32 sm:w-40 sm:h-28 border-2 border-dashed border-[var(--border-color)] rounded flex items-center justify-center flex-shrink-0 relative">
                        {formData.imagePreview ? (
                          <Image
                            src={formData.imagePreview || "/placeholder.svg"}
                            alt="Image preview"
                            fill
                            className="object-cover rounded"
                          />
                        ) : (
                          <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="block text-xs sm:text-sm text-gray-600 file:mr-2 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded file:border-0 file:text-xs sm:file:text-sm file:font-medium file:bg-[var(--primary)] file:text-[var(--primary-foreground)] cursor-pointer"
                        />
                        <p className="text-xs text-gray-500 mt-2">Recommended: 600x400px</p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full">
                    <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-1.5 sm:mb-2">
                      Step Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm sm:text-base"
                    />
                  </div>

                  <div className="w-full">
                    <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-1.5 sm:mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 sm:px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm sm:text-base resize-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-2 pt-2 w-full">
                    <button
                      onClick={handleCancel}
                      className="w-full sm:w-auto px-4 py-2 border border-[var(--border-color)] rounded text-[var(--header-text)] text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveStep}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded font-medium text-sm sm:text-base"
                    >
                      <Save className="w-4 h-4 flex-shrink-0" />
                      <span>Save Step</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-0 w-full">
                  <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0 w-full">
                    <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold flex-shrink-0 text-sm sm:text-base">
                      {step.step}
                    </div>
                    <div className="w-20 h-20 sm:w-24 sm:h-20 bg-gray-100 border border-[var(--border-color)] rounded flex items-center justify-center flex-shrink-0 relative">
                      {step.imgSrc ? (
                        <Image
                          src={step.imgSrc || "/placeholder.svg"}
                          alt="Step image"
                          fill
                          className="object-cover rounded"
                        />
                      ) : (
                        <span className="text-xs text-gray-400">No Image</span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[var(--header-text)] mb-1 sm:mb-2 text-sm sm:text-base break-words">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 break-words">{step.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end sm:ml-4 flex-shrink-0">
                    <button onClick={() => handleEdit(step)} className="p-2 text-[var(--primary)] rounded">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDeleteStep(step._id)} className="p-2 text-red-600 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
