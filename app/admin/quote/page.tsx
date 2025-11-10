"use client"

import { useState, useEffect } from "react"
import { Trash2, Reply } from "lucide-react"
import ReplyModal from "@/app/admin/components/quote-reply/reply-modal"

interface Quote {
  _id: string
  name: string
  email: string
  phone: string
  details: string
  status: "pending" | "completed"
  createdAt: string
}

export default function QuoteManagement() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([])
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "completed">("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [replyModal, setReplyModal] = useState({
    isOpen: false,
    email: "",
    phone: "",
  })

  useEffect(() => {
    fetchQuotes()
  }, [])

  useEffect(() => {
    filterQuotes()
  }, [quotes, activeTab, searchTerm])

  const fetchQuotes = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/quote")
      const data = await response.json()
      setQuotes(data)
    } catch (error) {
      console.error("Error fetching quotes:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterQuotes = () => {
    let filtered = quotes

    if (activeTab !== "all") {
      filtered = filtered.filter((quote) => quote.status === activeTab)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (quote) =>
          quote.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          quote.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          quote.phone.includes(searchTerm) ||
          quote.details.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredQuotes(filtered)
  }

  const handleStatusChange = async (id: string, newStatus: "pending" | "completed" ) => {
    try {
      const response = await fetch(`/api/quote/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        setQuotes(quotes.map((quote) => (quote._id === id ? { ...quote, status: newStatus } : quote)))
      }
    } catch (error) {
      console.error("Error updating status:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this quote?")) return

    try {
      const response = await fetch(`/api/quote/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setQuotes(quotes.filter((quote) => quote._id !== id))
      }
    } catch (error) {
      console.error("Error deleting quote:", error)
    }
  }

  const openReplyModal = (email: string, phone: string) => {
    setReplyModal({ isOpen: true, email, phone })
  }

  const closeReplyModal = () => {
    setReplyModal({ isOpen: false, email: "", phone: "" })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  return (
    <main className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8">Quote Requests</h1>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name, email, phone, or details..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff6600]"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200 overflow-x-auto">
          {["all", "pending", "completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as "all" | "pending" | "completed" )}
              className={`px-4 py-2 font-medium capitalize transition-colors whitespace-nowrap ${
                activeTab === tab ? "text-[#ff6600] border-b-2 border-[#ff6600]" : "text-paragraph"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Quotes List */}
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading...</div>
        ) : filteredQuotes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No quotes found</div>
        ) : (
          <div className="space-y-4">
            {filteredQuotes.map((quote) => (
              <div key={quote._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{quote.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(quote.status)}`}>
                        {quote.status}
                      </span>
                    </div>

                    <div className="w-fit flex flex-col gap-1 mb-3 text-sm text-gray-600">
                      <a href={`mailto:${quote.email}`} className="text-[#ff6600] hover:underline">
                        {quote.email}
                      </a>
                      <p className="text-paragraph">{quote.phone}</p>
                    </div>

                    <p className="text-paragraph mb-3 whitespace-pre-wrap line-clamp-2">{quote.details}</p>
                    <p className="text-sm text-paragraph">{formatDate(quote.createdAt)}</p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => openReplyModal(quote.email, quote.phone)}
                      className="px-3 py-1 bg-[var(--primary)] text-[var(--primary-foreground)] rounded text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-1"
                    >
                      <Reply size={16} />
                      Reply
                    </button>
                    <button
                      onClick={() =>
                        handleStatusChange(quote._id, quote.status === "pending" ? "completed" : "pending")
                      }
                      className="px-3 py-1 bg-[var(--primary)] text-[var(--primary-foreground)] rounded text-sm hover:opacity-90 transition-opacity"
                    >
                      Mark {quote.status === "pending" ? "Done" : "Pending"}
                    </button>
                    <button
                      onClick={() => handleDelete(quote._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-1"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ReplyModal
        isOpen={replyModal.isOpen}
        onClose={closeReplyModal}
        email={replyModal.email}
        phone={replyModal.phone}
      />
    </main>
  )
}
