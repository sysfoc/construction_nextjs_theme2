// app/admin/why-choose-us/page.tsx
"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Trash2, Edit2, Plus, Upload, X, Save } from "lucide-react"

interface Step {
  _id: string
  title: string
  description: string
  iconSrc: string
  isReversed: boolean
  order: number
}

interface FormData {
  title: string
  description: string
  iconSrc: string
  isReversed: boolean
  order: number
  iconPreview: string | null
}

export default function StepsAdmin() {
  const [steps, setSteps] = useState<Step[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    iconSrc: "",
    isReversed: false,
    order: 0,
    iconPreview: null,
  })

  useEffect(() => {
    fetchSteps()
  }, [])

  const fetchSteps = async () => {
    try {
      const response = await fetch("/api/why-choose-us")
      const data = await response.json()
      setSteps(data)
    } catch (error) {
      console.error("Failed to fetch steps:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (step: Step) => {
    setEditingId(step._id)
    setFormData({
      title: step.title,
      description: step.description,
      iconSrc: step.iconSrc,
      isReversed: step.isReversed,
      order: step.order,
      iconPreview: step.iconSrc,
    })
  }

  const handleCancel = () => {
    setEditingId(null)
    setIsAddingNew(false)
    setFormData({
      title: "",
      description: "",
      iconSrc: "",
      isReversed: false,
      order: 0,
      iconPreview: null,
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          iconPreview: reader.result as string,
          iconSrc: reader.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    try {
      const method = editingId && !isAddingNew ? "PUT" : "POST"
      const url = editingId && !isAddingNew ? `/api/why-choose-us/${editingId}` : "/api/why-choose-us"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          iconSrc: formData.iconSrc,
          isReversed: formData.isReversed,
          order: formData.order,
        }),
      })

      if (response.ok) {
        setEditingId(null)
        setIsAddingNew(false)
        setFormData({
          title: "",
          description: "",
          iconSrc: "",
          isReversed: false,
          order: 0,
          iconPreview: null,
        })
        fetchSteps()
      }
    } catch (error) {
      console.error("Failed to save step:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure?")) {
      try {
        await fetch(`/api/why-choose-us/${id}`, { method: "DELETE" })
        fetchSteps()
      } catch (error) {
        console.error("Failed to delete step:", error)
      }
    }
  }

  const handleAddStep = () => {
    setIsAddingNew(true)
    setEditingId(null)
    setFormData({
      title: "",
      description: "",
      iconSrc: "",
      isReversed: false,
      order: 0,
      iconPreview: null,
    })
  }

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <div className="p-4 sm:p-6 mx-auto bg-background min-h-screen">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-6">
        <h1 className="text-lg sm:text-2xl font-semibold text-[var(--header-text)]">Steps Management</h1>
        <button
          onClick={handleAddStep}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded font-medium whitespace-nowrap"
        >
          <Plus className="w-4 h-4" /> Add Step
        </button>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {isAddingNew && (
          <div className="bg-[var(--background)] border border-[var(--border-color)] rounded p-3 sm:p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-[var(--header-text)]">Add New Step</h3>
              <button onClick={handleCancel} className="text-gray-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[var(--header-text)] mb-2">Step Icon Image</label>
                <div className="relative w-40 h-32 border-2 border-dashed border-[var(--border-color)] rounded flex items-center justify-center bg-background mb-2 overflow-hidden">
                  {formData.iconPreview ? (
                    <img
                      src={formData.iconPreview || "/placeholder.svg"}
                      alt="Icon preview"
                      className="w-full h-full object-contain rounded"
                    />
                  ) : (
                    <Upload className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-[var(--primary)] file:text-[var(--primary-foreground)] cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-1">Recommended: 100x100px</p>
              </div>

              <div>
                <label className="block text-sm text-[var(--header-text)] mb-2">Title</label>
                <input
                  type="text"
                  placeholder="Step title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-[var(--border-color)] rounded bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
              </div>

              <div>
                <label className="block text-sm text-[var(--header-text)] mb-2">Description</label>
                <textarea
                  placeholder="Step description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-[var(--border-color)] rounded bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm text-[var(--header-text)] mb-2">Order</label>
                <input
                  type="number"
                  placeholder="Order"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: Number.parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-[var(--border-color)] rounded bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
              </div>

              <label className="flex items-center gap-2 text-[var(--foreground)]">
                <input
                  type="checkbox"
                  checked={formData.isReversed}
                  onChange={(e) => setFormData({ ...formData, isReversed: e.target.checked })}
                />
                <span className="text-sm">Reversed Layout (Icon at top)</span>
              </label>

              <div className="flex flex-col sm:flex-row justify-end gap-2 pt-2">
                <button
                  onClick={handleCancel}
                  className="w-full sm:w-auto px-4 py-2 border border-[var(--border-color)] rounded text-[var(--header-text)]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded font-medium"
                >
                  <Save className="w-4 h-4" />
                  Save Step
                </button>
              </div>
            </div>
          </div>
        )}

        {steps.map((step) => (
          <div key={step._id} className="bg-[var(--background)] border border-[var(--border-color)] rounded p-3 sm:p-4 hover:shadow-md transition-shadow">
            {editingId === step._id ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-[var(--header-text)]">Edit Step</h3>
                  <button onClick={handleCancel} className="text-gray-500">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-[var(--header-text)] mb-2">Step Icon Image</label>
                    <div className="relative w-40 h-32 border-2 border-dashed border-[var(--border-color)] rounded flex items-center justify-center bg-background mb-2 overflow-hidden">
                      {formData.iconPreview ? (
                        <img
                          src={formData.iconPreview || "/placeholder.svg"}
                          alt="Icon preview"
                          className="w-full h-full object-contain rounded"
                        />
                      ) : (
                        <Upload className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="block text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-[var(--primary)] file:text-[var(--primary-foreground)] cursor-pointer"
                    />
                    <p className="text-xs text-gray-500 mt-1">Recommended: 100x100px</p>
                  </div>

                  <div>
                    <label className="block text-sm text-[var(--header-text)] mb-2">Title</label>
                    <input
                      type="text"
                      placeholder="Step title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-[var(--border-color)] rounded bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-[var(--header-text)] mb-2">Description</label>
                    <textarea
                      placeholder="Step description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2 border border-[var(--border-color)] rounded bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-[var(--header-text)] mb-2">Order</label>
                    <input
                      type="number"
                      placeholder="Order"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: Number.parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-[var(--border-color)] rounded bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    />
                  </div>

                  <label className="flex items-center gap-2 text-[var(--foreground)]">
                    <input
                      type="checkbox"
                      checked={formData.isReversed}
                      onChange={(e) => setFormData({ ...formData, isReversed: e.target.checked })}
                    />
                    <span className="text-sm">Reversed Layout (Icon at top)</span>
                  </label>

                  <div className="flex flex-col sm:flex-row justify-end gap-2 pt-2">
                    <button
                      onClick={handleCancel}
                      className="w-full sm:w-auto px-4 py-2 border border-[var(--border-color)] rounded text-[var(--header-text)]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded font-medium"
                    >
                      <Save className="w-4 h-4" />
                      Save Step
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-0">
                <div className="flex items-start gap-3 sm:gap-4 flex-1 w-full min-w-0">
                  <div className="w-20 h-20 bg-gray-100 border border-[var(--border-color)] rounded flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {step.iconSrc ? (
                      <img
                        src={step.iconSrc || "/placeholder.svg"}
                        alt="Step icon"
                        className="w-full h-full object-contain rounded"
                      />
                    ) : (
                      <span className="text-xs text-gray-400">No Icon</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[var(--header-text)] mb-1 text-sm sm:text-base break-words">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 break-words mb-2">{step.description}</p>
                    <div className="flex gap-4 text-xs text-gray-500">
                      <span>Order: {step.order}</span>
                      <span>{step.isReversed ? "Reversed" : "Normal"}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button onClick={() => handleEdit(step)} className="p-2 text-[var(--primary)] rounded">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(step._id)} className="p-2 text-red-600 rounded">
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