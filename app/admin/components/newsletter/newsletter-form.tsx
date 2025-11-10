// app/admin/components/newsletter/newsletter-form.tsx
"use client"

import { useState } from "react"

interface NewsletterFormProps {
  activeSubscribers: number
  onSend: (subject: string, content: string) => Promise<void>
  onClose: () => void
}

export function NewsletterForm({ activeSubscribers, onSend, onClose }: NewsletterFormProps) {
  const [subject, setSubject] = useState("")
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleSubmit = async () => {
    if (!subject.trim() || !content.trim()) {
      setMessage({ type: "error", text: "Subject and content are required" })
      return
    }

    setIsLoading(true)
    try {
      await onSend(subject, content)
      setMessage({ type: "success", text: "Newsletter sent successfully!" })
      setSubject("")
      setContent("")
      setTimeout(() => onClose(), 2000)
    } catch (error) {
      setMessage({ type: "error", text: "Failed to send newsletter" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-[var(--background)] border border-[var(--border-color)] rounded p-3 sm:p-4 w-full overflow-hidden">
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3 className="text-base sm:text-lg font-semibold text-[var(--header-text)]">Create Newsletter</h3>
          <button onClick={onClose} className="text-gray-500" disabled={isLoading}>
            ✕
          </button>
        </div>

        <div>
          <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-1.5 sm:mb-2">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter newsletter subject"
            className="w-full px-3 sm:px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm sm:text-base"
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm text-[var(--header-text)] mb-1.5 sm:mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            placeholder="Enter newsletter content"
            className="w-full px-3 sm:px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm sm:text-base resize-none"
            disabled={isLoading}
          />
        </div>

        <div className="border bg-background w-fit border-blue-200 rounded p-3">
          <p className="text-xs sm:text-sm text-blue-800">
            This newsletter will be sent to <strong>{activeSubscribers}</strong> active subscribers.
          </p>
        </div>

        {message && (
          <div
            className={`p-3 rounded text-sm ${
              message.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 border border-[var(--border-color)] rounded text-[var(--header-text)] text-sm sm:text-base disabled:opacity-50"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="w-full sm:w-auto px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded font-medium text-sm sm:text-base disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Newsletter"}
          </button>
        </div>
      </div>
    </div>
  )
}
