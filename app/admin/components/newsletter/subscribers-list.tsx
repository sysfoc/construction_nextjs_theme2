// app/admin/components/newsletter/subscribers-list.tsx
"use client"

import { Edit2, Trash2 } from "lucide-react"
import { useState } from "react"

interface Subscriber {
  _id: string
  email: string
  status: "active" | "inactive"
  createdAt: string
}

interface SubscribersListProps {
  subscribers: Subscriber[]
  onUpdate: (id: string, status: string) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export function SubscribersList({ subscribers, onUpdate, onDelete }: SubscribersListProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editStatus, setEditStatus] = useState<"active" | "inactive">("active")
  const [isLoading, setIsLoading] = useState(false)

  const handleEdit = (subscriber: Subscriber) => {
    setEditingId(subscriber._id)
    setEditStatus(subscriber.status)
  }

  const handleSave = async () => {
    if (!editingId) return
    setIsLoading(true)
    try {
      await onUpdate(editingId, editStatus)
      setEditingId(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this subscriber?")) {
      setIsLoading(true)
      try {
        await onDelete(id)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {subscribers.map((subscriber) => (
        <div
          key={subscriber._id}
          className="bg-[var(--background)] border border-[var(--border-color)] rounded p-3 sm:p-4"
        >
          {editingId === subscriber._id ? (
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-[var(--header-text)]">Edit Subscriber</h3>
                <button onClick={() => setEditingId(null)} className="text-gray-500" disabled={isLoading}>
                  ✕
                </button>
              </div>

              <div>
                <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-1.5 sm:mb-2">Status</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as "active" | "inactive")}
                  className="w-full px-3 sm:px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm sm:text-base"
                  disabled={isLoading}
                >
                  <option className="bg-background" value="active">Active</option>
                  <option className="bg-background" value="inactive">Inactive</option>
                </select>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-2 pt-2">
                <button
                  onClick={() => setEditingId(null)}
                  className="w-full sm:w-auto px-4 py-2 border border-[var(--border-color)] rounded text-[var(--header-text)] text-sm sm:text-base"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="w-full sm:w-auto px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded font-medium text-sm sm:text-base disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-0">
              <div className="flex-1 min-w-0 w-full">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-semibold text-[var(--header-text)] text-sm sm:text-base break-all">
                    {subscriber.email}
                  </h3>
                  <span
                    className={`text-xs px-2 py-1 rounded whitespace-nowrap flex-shrink-0 ${
                      subscriber.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {subscriber.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Subscribed: {new Date(subscriber.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end sm:ml-4 flex-shrink-0">
                <button
                  onClick={() => handleEdit(subscriber)}
                  className="p-2 text-[var(--primary)] rounded disabled:opacity-50 hover:bg-gray-100"
                  disabled={isLoading}
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(subscriber._id)}
                  className="p-2 text-red-600 rounded disabled:opacity-50 hover:bg-red-50"
                  disabled={isLoading}
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
