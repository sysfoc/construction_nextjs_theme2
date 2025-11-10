"use client"
import { Save, Plus, Trash2, Edit2, X } from "lucide-react"
import type React from "react"

import { useState, useEffect } from "react"

interface FAQ {
  _id: string
  question: string
  answer: string
  showOnFAQPage: boolean
}

interface FormData {
  question: string
  answer: string
  showOnFAQPage: boolean
}

export default function FAQManagementPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [editingFAQ, setEditingFAQ] = useState<string | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    question: "",
    answer: "",
    showOnFAQPage: false,
  })

  useEffect(() => {
    fetchFAQs()
  }, [])

  const fetchFAQs = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/faqs")
      const data = await response.json()
      setFaqs(data.reverse())
    } catch (error) {
      console.error("Error fetching FAQs:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (faq: FAQ) => {
    setIsAddingNew(false)
    setEditingFAQ(faq._id)
    setFormData({
      question: faq.question,
      answer: faq.answer,
      showOnFAQPage: faq.showOnFAQPage,
    })
  }

  const handleAddFAQ = () => {
    setIsAddingNew(true)
    setEditingFAQ("new")
    setFormData({
      question: "",
      answer: "",
      showOnFAQPage: false,
    })
  }

  const handleCancel = () => {
    setEditingFAQ(null)
    setIsAddingNew(false)
    setFormData({
      question: "",
      answer: "",
      showOnFAQPage: false,
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSaveFAQ = async () => {
    try {
      if (isAddingNew) {
        // Create new FAQ
        const response = await fetch("/api/faqs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })

        if (response.ok) {
          await fetchFAQs()
          handleCancel()
        }
      } else {
        // Update existing FAQ
        const response = await fetch(`/api/faqs/${editingFAQ}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })

        if (response.ok) {
          await fetchFAQs()
          handleCancel()
        }
      }
    } catch (error) {
      console.error("Error saving FAQ:", error)
    }
  }

  const handleDeleteFAQ = async (id: string) => {
    try {
      const response = await fetch(`/api/faqs/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await fetchFAQs()
      }
    } catch (error) {
      console.error("Error deleting FAQ:", error)
    }
  }

  if (loading) {
    return <div className="p-4 text-center">Loading FAQs...</div>
  }

  return (
    <div className="p-4 mx-auto bg-background min-h-screen">
      <div className="flex sm:flex-row flex-col gap-2 items-center justify-between mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-[var(--header-text)]">FAQ Management</h1>
        <button
          onClick={handleAddFAQ}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded font-medium"
        >
          <Plus className="w-4 h-4" />
          Add FAQ
        </button>
      </div>

      <div className="space-y-4">
        {isAddingNew && editingFAQ === "new" && (
          <div className="bg-[var(--background)] border border-[var(--border-color)] rounded p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[var(--header-text)]">New FAQ</h3>
                <button onClick={handleCancel} className="text-gray-500">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <label className="block text-sm text-[var(--header-text)] mb-2">Question</label>
                <input
                  type="text"
                  name="question"
                  value={formData.question}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
              </div>

              <div>
                <label className="block text-sm text-[var(--header-text)] mb-2">Answer</label>
                <textarea
                  name="answer"
                  value={formData.answer}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
              </div>

              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="showOnFAQPage"
                    checked={formData.showOnFAQPage}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 border-[var(--border-color)] rounded focus:ring-2 focus:ring-[var(--primary)]"
                  />
                  <span className="text-sm text-[var(--header-text)]">Show on FAQ Page</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 border border-[var(--border-color)] rounded text-[var(--header-text)]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveFAQ}
                  className="flex items-center gap-2 px-3 py-1 bg-[var(--primary)] text-[var(--primary-foreground)] rounded"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {faqs.map((faq) => (
          <div key={faq._id} className="bg-[var(--background)] border border-[var(--border-color)] rounded p-4">
            {editingFAQ === faq._id ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[var(--header-text)]">Edit FAQ</h3>
                  <button onClick={handleCancel} className="text-gray-500">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div>
                  <label className="block text-sm text-[var(--header-text)] mb-2">Question</label>
                  <input
                    type="text"
                    name="question"
                    value={formData.question}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[var(--header-text)] mb-2">Answer</label>
                  <textarea
                    name="answer"
                    value={formData.answer}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="showOnFAQPage"
                      checked={formData.showOnFAQPage}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 border-[var(--border-color)] rounded focus:ring-2 focus:ring-[var(--primary)]"
                    />
                    <span className="text-sm text-[var(--header-text)]">Show on FAQ Page</span>
                  </label>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 border border-[var(--border-color)] rounded text-[var(--header-text)]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveFAQ}
                    className="flex items-center gap-2 px-3 py-1 bg-[var(--primary)] text-[var(--primary-foreground)] rounded"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-[var(--header-text)] mb-2">{faq.question}</h3>
                  <p className="text-sm text-gray-600 mb-3">{faq.answer}</p>
                  <div className="flex items-center gap-4 text-xs">
                    <span className={faq.showOnFAQPage ? "text-green-600" : "text-gray-400"}>
                      {faq.showOnFAQPage ? "FAQ Page" : "Not on FAQ Page"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button onClick={() => handleEdit(faq)} className="p-2 text-[var(--primary)] rounded">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDeleteFAQ(faq._id)} className="p-2 text-red-600 rounded">
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
