"use client"
import { Save, Plus, Trash2, Upload, Edit2, X } from "lucide-react"
import type React from "react"

import Image from "next/image"
import { useState, useEffect } from "react"

interface Slide {
  id: string
  image: string
  heading: string
  buttonText: string
  buttonUrl: string
  order: number
}

interface FormData {
  heading: string
  buttonText: string
  buttonUrl: string
  imagePreview: string
}

export default function HeroSliderPage() {
  const [slides, setSlides] = useState<Slide[]>([])
  const [loading, setLoading] = useState(true)
  const [editingSlide, setEditingSlide] = useState<string | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    heading: "",
    buttonText: "",
    buttonUrl: "",
    imagePreview: "",
  })

  useEffect(() => {
    fetchSlides()
  }, [])

  const fetchSlides = async () => {
    try {
      const response = await fetch("/api/hero-slides")
      const data = await response.json()
      if (response.ok) {
        setSlides(data.slides)
      }
    } catch (error) {
      console.error("Error fetching slides:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (slide: Slide) => {
    setIsAddingNew(false)
    setEditingSlide(slide.id)
    setFormData({
      heading: slide.heading,
      buttonText: slide.buttonText,
      buttonUrl: slide.buttonUrl,
      imagePreview: slide.image,
    })
  }

  const handleAddSlide = () => {
    setIsAddingNew(true)
    setEditingSlide("new")
    setFormData({
      heading: "",
      buttonText: "",
      buttonUrl: "",
      imagePreview: "",
    })
  }

  const handleCancel = () => {
    setEditingSlide(null)
    setIsAddingNew(false)
    setFormData({
      heading: "",
      buttonText: "",
      buttonUrl: "",
      imagePreview: "",
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          imagePreview: reader.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveSlide = async () => {
    try {
      if (isAddingNew) {
        // Create new slide
        const response = await fetch("/api/hero-slides", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: formData.imagePreview || "/Herosection/constructionImage_01.png",
            heading: formData.heading,
            buttonText: formData.buttonText,
            buttonUrl: formData.buttonUrl,
          }),
        })

        if (response.ok) {
          await fetchSlides()
          handleCancel()
        }
      } else {
        // Update existing slide
        const response = await fetch(`/api/hero-slides/${editingSlide}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: formData.imagePreview,
            heading: formData.heading,
            buttonText: formData.buttonText,
            buttonUrl: formData.buttonUrl,
          }),
        })

        if (response.ok) {
          await fetchSlides()
          handleCancel()
        }
      }
    } catch (error) {
      console.error("Error saving slide:", error)
    }
  }

  const handleDeleteSlide = async (id: string) => {
    try {
      const response = await fetch(`/api/hero-slides/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await fetchSlides()
      }
    } catch (error) {
      console.error("Error deleting slide:", error)
    }
  }

  if (loading) {
    return (
      <div className="p-6 max-w-5xl mx-auto bg-background min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto bg-background min-h-screen">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-6">
        <h1 className="text-lg sm:text-2xl font-semibold text-[var(--header-text)]">Hero Slider Management</h1>
        <button
          onClick={handleAddSlide}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded font-medium whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          Add Slide
        </button>
      </div>

      <div className="space-y-4">
        {isAddingNew && editingSlide === "new" && (
          <div className="bg-[var(--background)] border border-[var(--border-color)] rounded p-3 sm:p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-[var(--header-text)]">New Slide</h3>
                <button onClick={handleCancel} className="text-gray-500">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <label className="block text-sm text-[var(--header-text)] mb-2">Slide Image</label>
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="relative w-full sm:w-40 h-24 border-2 border-dashed border-[var(--border-color)] rounded flex items-center justify-center bg-gray-50 dark:bg-gray-900 shrink-0">
                    {formData.imagePreview ? (
                      <div className="relative w-full h-full rounded overflow-hidden">
                        <Image
                          src={formData.imagePreview || "/placeholder.svg"}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <Upload className="w-6 h-6 text-gray-400" />
                    )}
                  </div>

                  <div className="flex-1 w-full min-w-0">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="block text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-[var(--primary)] file:text-[var(--primary-foreground)] cursor-pointer"
                    />
                    <p className="text-xs text-gray-500 mt-2">Recommended size: 1920x600px</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-[var(--header-text)] mb-2">Heading</label>
                <input
                  type="text"
                  name="heading"
                  value={formData.heading}
                  onChange={handleInputChange}
                  maxLength={120}
                  className="w-full px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[var(--header-text)] mb-2">Button Text</label>
                  <input
                    type="text"
                    name="buttonText"
                    value={formData.buttonText}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[var(--header-text)] mb-2">Button URL</label>
                  <input
                    type="text"
                    name="buttonUrl"
                    value={formData.buttonUrl}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-2 pt-2">
                <button
                  onClick={handleCancel}
                  className="w-full sm:w-auto px-4 py-2 border border-[var(--border-color)] rounded text-[var(--header-text)]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveSlide}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded font-medium"
                >
                  <Save className="w-4 h-4" />
                  Save Slide
                </button>
              </div>
            </div>
          </div>
        )}

        {slides.map((slide, index) => (
          <div key={slide.id} className="bg-[var(--background)] border border-[var(--border-color)] rounded p-3 sm:p-4">
            {editingSlide === slide.id ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-[var(--header-text)]">
                    Edit Slide {index + 1}
                  </h3>
                  <button onClick={handleCancel} className="text-gray-500">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div>
                  <label className="block text-sm text-[var(--header-text)] mb-2">Slide Image</label>
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className="relative w-full sm:w-40 h-24 border-2 border-dashed border-[var(--border-color)] rounded flex items-center justify-center bg-gray-50 dark:bg-gray-900 shrink-0">
                      {formData.imagePreview ? (
                        <div className="relative w-full h-full rounded overflow-hidden">
                          <Image
                            src={formData.imagePreview || "/placeholder.svg"}
                            alt="Preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <Upload className="w-6 h-6 text-gray-400" />
                      )}
                    </div>

                    <div className="flex-1 w-full min-w-0">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-[var(--primary)] file:text-[var(--primary-foreground)] cursor-pointer"
                      />
                      <p className="text-xs text-gray-500 mt-2">Recommended size: 1920x600px</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[var(--header-text)] mb-2">Heading</label>
                  <input
                    type="text"
                    name="heading"
                    value={formData.heading}
                    onChange={handleInputChange}
                    maxLength={120}
                    className="w-full px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[var(--header-text)] mb-2">Button Text</label>
                    <input
                      type="text"
                      name="buttonText"
                      value={formData.buttonText}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-[var(--header-text)] mb-2">Button URL</label>
                    <input
                      type="text"
                      name="buttonUrl"
                      value={formData.buttonUrl}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-2 pt-2">
                  <button
                    onClick={handleCancel}
                    className="w-full sm:w-auto px-4 py-2 border border-[var(--border-color)] rounded text-[var(--header-text)]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveSlide}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded font-medium"
                  >
                    <Save className="w-4 h-4" />
                    Save Slide
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                <div className="flex items-start gap-3 sm:gap-4 flex-1 w-full min-w-0">
                  <div className="relative w-24 sm:w-32 h-16 sm:h-20 bg-gray-100 border border-[var(--border-color)] rounded flex items-center justify-center overflow-hidden shrink-0">
                    {slide.image ? (
                      <Image
                        src={slide.image || "/placeholder.svg"}
                        alt="Slide"
                        fill
                        className="object-cover rounded"
                      />
                    ) : (
                      <span className="text-xs text-gray-400">No Image</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-[var(--header-text)] mb-1 text-sm sm:text-base">
                      Slide {index + 1}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-1 break-words">{slide.heading}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs text-gray-500">
                      <span className="break-words">Button: {slide.buttonText}</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="break-all">URL: {slide.buttonUrl}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button onClick={() => handleEdit(slide)} className="p-2 text-[var(--primary)] rounded">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDeleteSlide(slide.id)} className="p-2 text-red-600 rounded">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
