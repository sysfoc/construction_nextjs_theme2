"use client"

import { Save } from "lucide-react"

interface CategoryFormProps {
  categoryName: string
  onNameChange: (name: string) => void
  onSave: () => void
}

export default function CategoryForm({ categoryName, onNameChange, onSave }: CategoryFormProps) {
  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={categoryName}
        onChange={(e) => onNameChange(e.target.value)}
        className="flex-1 px-2 py-1 rounded text-sm border border-gray-300 text-gray-900"
        autoFocus
      />
      <button
        onClick={(e) => {
          e.stopPropagation()
          onSave()
        }}
        className="p-1 text-[var(--primary-foreground)] bg-[var(--primary)] rounded transition-colors"
      >
        <Save className="w-4 h-4" />
      </button>
    </div>
  )
}
