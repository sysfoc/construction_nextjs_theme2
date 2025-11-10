// app/admin/newsletter/page.tsx
"use client"

import { useState, useEffect } from "react"
import { StatsCards } from "@/app/admin/components/newsletter/stats-cards"
import { SubscribersList } from "@/app/admin/components/newsletter/subscribers-list"
import { NewsletterForm } from "@/app/admin/components/newsletter/newsletter-form"
import { NewslettersList } from "@/app/admin/components/newsletter/newsletters-list"

interface Subscriber {
  _id: string
  email: string
  status: "active" | "inactive"
  createdAt: string
}

interface Newsletter {
  _id: string
  subject: string
  content: string
  sentAt: string
  recipientCount: number 
}

export default function NewsletterManagementPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [newsletters, setNewsletters] = useState<Newsletter[]>([])
  const [activeTab, setActiveTab] = useState<"subscribers" | "newsletters">("subscribers")
  const [showNewsletterForm, setShowNewsletterForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all")
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  // Fetch subscribers
  const fetchSubscribers = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      if (statusFilter !== "all") params.append("status", statusFilter)
      if (searchQuery) params.append("search", searchQuery)

      const response = await fetch(`/api/subscribers?${params}`)
      if (!response.ok) throw new Error("Failed to fetch subscribers")
      const data = await response.json()
      setSubscribers(data)
    } catch (error) {
      console.error("Error fetching subscribers:", error)
      setMessage({ type: "error", text: "Failed to fetch subscribers" })
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch newsletters
  const fetchNewsletters = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/newsletters")
      if (!response.ok) throw new Error("Failed to fetch newsletters")
      const data = await response.json()
      setNewsletters(data)
    } catch (error) {
      console.error("Error fetching newsletters:", error)
      setMessage({ type: "error", text: "Failed to fetch newsletters" })
    } finally {
      setIsLoading(false)
    }
  }

  // Initial fetch
  useEffect(() => {
    fetchSubscribers()
  }, [])

  // Fetch based on active tab
  useEffect(() => {
    if (activeTab === "newsletters") {
      fetchNewsletters()
    } else {
      fetchSubscribers()
    }
  }, [activeTab])

  // Refetch when filters change
  useEffect(() => {
    if (activeTab === "subscribers") {
      fetchSubscribers()
    }
  }, [statusFilter, searchQuery])

  // Clear message after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [message])

  const handleUpdateSubscriber = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/subscribers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) throw new Error("Failed to update subscriber")
      setMessage({ type: "success", text: "Subscriber updated successfully" })
      fetchSubscribers()
    } catch (error) {
      console.error("Error updating subscriber:", error)
      setMessage({ type: "error", text: "Failed to update subscriber" })
    }
  }

  const handleDeleteSubscriber = async (id: string) => {
    try {
      const response = await fetch(`/api/subscribers?id=${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete subscriber")
      setMessage({ type: "success", text: "Subscriber deleted successfully" })
      fetchSubscribers()
    } catch (error) {
      console.error("Error deleting subscriber:", error)
      setMessage({ type: "error", text: "Failed to delete subscriber" })
    }
  }

  const handleSendNewsletter = async (subject: string, content: string) => {
    try {
      const response = await fetch("/api/newsletters/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, content }),
      })

      if (!response.ok) throw new Error("Failed to send newsletter")
      setMessage({ type: "success", text: "Newsletter sent successfully" })
      setShowNewsletterForm(false)
      fetchSubscribers()
      fetchNewsletters()
    } catch (error) {
      console.error("Error sending newsletter:", error)
      setMessage({ type: "error", text: "Failed to send newsletter" })
      throw error
    }
  }

  const handleDeleteNewsletter = async (id: string) => {
    try {
      const response = await fetch(`/api/newsletters/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete newsletter")
      setMessage({ type: "success", text: "Newsletter deleted successfully" })
      fetchNewsletters()
    } catch (error) {
      console.error("Error deleting newsletter:", error)
      setMessage({ type: "error", text: "Failed to delete newsletter" })
    }
  }

  const activeSubscribersCount = subscribers.filter((s) => s.status === "active").length

  return (
    <div className="w-full min-h-screen bg-background overflow-x-hidden">
      <div className="p-4 sm:p-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 items-stretch sm:items-center justify-between mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-[var(--header-text)] break-words">
            Newsletter Management
          </h1>
          <div className="flex gap-2">
            {activeTab === "newsletters" && (
              <button
                onClick={() => setShowNewsletterForm(!showNewsletterForm)}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded font-medium text-sm sm:text-base whitespace-nowrap"
              >
                {showNewsletterForm ? "Cancel" : "New Newsletter"}
              </button>
            )}
          </div>
        </div>

        {/* Message Alert */}
        {message && (
          <div
            className={`mb-4 p-3 rounded text-sm ${
              message.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Stats Cards */}
        <StatsCards totalSubscribers={subscribers.length} activeSubscribers={activeSubscribersCount} />

        {/* Tabs */}
        <div className="flex gap-2 mb-4 border-b border-[var(--border-color)]">
          <button
            onClick={() => setActiveTab("subscribers")}
            className={`px-4 py-2 text-sm sm:text-base font-medium ${
              activeTab === "subscribers" ? "border-b-2 border-[var(--primary)] text-[var(--primary)]" : "text-gray-500"
            }`}
          >
            Subscribers
          </button>
          <button
            onClick={() => setActiveTab("newsletters")}
            className={`px-4 py-2 text-sm sm:text-base font-medium ${
              activeTab === "newsletters" ? "border-b-2 border-[var(--primary)] text-[var(--primary)]" : "text-gray-500"
            }`}
          >
            Newsletters
          </button>
        </div>

        {/* Subscribers Tab */}
        {activeTab === "subscribers" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Search by email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as "all" | "active" | "inactive")}
                className="px-4 py-2 border border-[var(--border-color)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm"
              >
                <option className="bg-background" value="all">All</option>
                <option className="bg-background" value="active">Active</option>
                <option className="bg-background" value="inactive">Inactive</option>
              </select>
            </div>

            {isLoading ? (
              <div className="text-center py-8 text-gray-500">Loading subscribers...</div>
            ) : subscribers.length > 0 ? (
              <SubscribersList
                subscribers={subscribers}
                onUpdate={handleUpdateSubscriber}
                onDelete={handleDeleteSubscriber}
              />
            ) : (
              <div className="text-center py-8 text-gray-500">No subscribers found</div>
            )}
          </div>
        )}

        {/* Newsletters Tab */}
        {activeTab === "newsletters" && (
          <div className="space-y-4">
            {showNewsletterForm && (
              <NewsletterForm
                activeSubscribers={activeSubscribersCount}
                onSend={handleSendNewsletter}
                onClose={() => setShowNewsletterForm(false)}
              />
            )}
            {!showNewsletterForm && (
              <>
                {isLoading ? (
                  <div className="text-center py-8 text-gray-500">Loading newsletters...</div>
                ) : newsletters.length > 0 ? (
                  <NewslettersList newsletters={newsletters} onDelete={handleDeleteNewsletter} />
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No newsletters sent yet. Click "New Newsletter" to create one.
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
