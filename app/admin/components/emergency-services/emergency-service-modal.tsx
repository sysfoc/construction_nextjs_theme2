"use client"

import type React from "react"
import { X } from "lucide-react"
import type { EmergencyServiceForm } from "./emergency-services-form"

interface EmergencyServiceModalProps {
  isOpen: boolean
  editingId: string | null
  form: EmergencyServiceForm
  submitting: boolean
  onClose: () => void
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export function EmergencyServiceModal({
  isOpen,
  editingId,
  form,
  submitting,
  onClose,
  onFormChange,
  onTitleChange,
  onSubmit,
}: EmergencyServiceModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-background rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-background border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold">
            {editingId ? "Edit Service" : "Add Emergency Service"}
          </h2>
          <button onClick={onClose} className="text-gray-400">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-4 sm:p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Service Title *</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={onTitleChange}
              placeholder="e.g., Water Damage"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug (auto-generated) *</label>
            <input
              type="text"
              name="slug"
              value={form.slug}
              onChange={onFormChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={onFormChange}
              placeholder="Service description"
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image *</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  const reader = new FileReader()
                  reader.onloadend = () => {
                    onFormChange({
                      target: { name: "image", value: reader.result as string },
                    } as any)
                  }
                  reader.readAsDataURL(file)
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required={!form.image}
            />
            {form.image && (
              <img
                src={form.image || "/placeholder.svg"}
                alt="Preview"
                className="mt-2 h-20 w-20 object-cover rounded"
              />
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Callout Price ($) *</label>
              <input
                type="number"
                name="calloutPrice"
                value={form.calloutPrice}
                onChange={onFormChange}
                placeholder="150"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Price ($) *</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={onFormChange}
                placeholder="500"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Response Time *</label>
            <input
              type="text"
              name="responseTime"
              value={form.responseTime}
              onChange={onFormChange}
              placeholder="60-90 minutes"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">What We Help With (one per line) *</label>
            <textarea
              name="whatWeHelpWith"
              value={form.whatWeHelpWith}
              onChange={onFormChange}
              placeholder="Burst pipes&#10;Water leakage&#10;Drain issues"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Enter each item on a new line</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 font-medium rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg disabled:opacity-50"
            >
              {submitting ? "Saving..." : editingId ? "Update Service" : "Create Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
