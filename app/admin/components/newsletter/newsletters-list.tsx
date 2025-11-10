// app/admin/components/newsletter/newsletters-list.tsx
"use client"

import { Trash2 } from "lucide-react"

interface Newsletter {
  _id: string
  subject: string
  content: string
  sentAt: string
}

interface NewslettersListProps {
  newsletters: Newsletter[]
  onDelete: (id: string) => void
}

export function NewslettersList({ newsletters, onDelete }: NewslettersListProps) {
  return (
    <div className="space-y-3">
      {newsletters.map((newsletter) => (
        <div
          key={newsletter._id}
          className="p-4 border border-[var(--border-color)] rounded bg-background hover:shadow-sm transition-shadow"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-[var(--header-text)] truncate">{newsletter.subject}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{newsletter.content}</p>
              <p className="text-xs text-gray-500 mt-2">
                Sent: {new Date(newsletter.sentAt).toLocaleDateString()} at{" "}
                {new Date(newsletter.sentAt).toLocaleTimeString()}
              </p>
            </div>
            <button
              onClick={() => onDelete(newsletter._id)}
              className="flex-shrink-0 p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
              title="Delete newsletter"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
