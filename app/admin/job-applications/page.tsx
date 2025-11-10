"use client"

import { useEffect, useState } from "react"
import { Search } from "lucide-react"
import { ApplicationCard } from "@/app/admin/components/job-applications/application-card"
import { ApplicationDetailModal } from "@/app/admin/components/job-applications/application-detail-modal"
import { StatusTabs } from "@/app/admin/components/job-applications/status-tabs"

interface JobApplication {
  id: string
  firstName: string
  lastName: string
  email: string
  location: string
  phone: string
  position: string
  cv: string
  coverLetter: string
  status: "pending" | "accepted" | "rejected"
  createdAt: string
}

export default function JobApplicationsPage() {
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [filteredApplications, setFilteredApplications] = useState<JobApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "accepted" | "rejected">("all")
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchApplications()
  }, [])

  useEffect(() => {
    filterApplications()
  }, [searchTerm, applications, activeTab])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/job-applications")
      const data = await response.json()
      setApplications(data.applications || [])
    } catch (error) {
      console.error("Error fetching applications:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterApplications = () => {
    let filtered = applications

    // Filter by status
    if (activeTab !== "all") {
      filtered = filtered.filter((app) => app.status === activeTab)
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (app) =>
          app.firstName.toLowerCase().includes(term) ||
          app.lastName.toLowerCase().includes(term) ||
          app.email.toLowerCase().includes(term) ||
          app.position.toLowerCase().includes(term) ||
          app.location.toLowerCase().includes(term),
      )
    }

    setFilteredApplications(filtered)
  }

  const handleStatusChange = async (id: string, newStatus: "accepted" | "rejected") => {
    try {
      const response = await fetch(`/api/job-applications/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        setApplications((prev) => prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app)))
      }
    } catch (error) {
      console.error("Error updating application:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this application?")) return

    try {
      const response = await fetch(`/api/job-applications/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setApplications((prev) => prev.filter((app) => app.id !== id))
      }
    } catch (error) {
      console.error("Error deleting application:", error)
    }
  }

  const getCounts = () => ({
    all: applications.length,
    pending: applications.filter((app) => app.status === "pending").length,
    accepted: applications.filter((app) => app.status === "accepted").length,
    rejected: applications.filter((app) => app.status === "rejected").length,
  })

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[var(--background)] dark:bg-gray-950 flex items-center justify-center">
        <p className="text-[var(--paragraph-color)]">Loading applications...</p>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-[var(--background)] dark:bg-gray-950 overflow-x-hidden">
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold text-[var(--foreground)] mb-6">Job Applications</h1>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-[var(--paragraph-color)]" />
          <input
            type="text"
            placeholder="Search by name, email, position, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[var(--border-color)] rounded-lg text-[var(--foreground)] placeholder:text-[var(--paragraph-color)] outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
        </div>

        {/* Status Tabs */}
        <StatusTabs activeTab={activeTab} onTabChange={setActiveTab} counts={getCounts()} />

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[var(--paragraph-color)]">
                {applications.length === 0 ? "No applications yet" : "No applications match your search"}
              </p>
            </div>
          ) : (
            filteredApplications.map((app) => (
              <ApplicationCard
                key={app.id}
                application={app}
                onViewDetails={(application) => {
                  setSelectedApplication(application)
                  setIsModalOpen(true)
                }}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>

      {/* Detail Modal */}
      <ApplicationDetailModal
        application={selectedApplication}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedApplication(null)
        }}
      />
    </div>
  )
}
