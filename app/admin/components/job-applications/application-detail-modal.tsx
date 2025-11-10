"use client"

import { X, Download } from "lucide-react"

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

interface ApplicationDetailModalProps {
  application: JobApplication | null
  isOpen: boolean
  onClose: () => void
}

export function ApplicationDetailModal({ application, isOpen, onClose }: ApplicationDetailModalProps) {
  if (!isOpen || !application) return null

  const downloadCV = () => {
    try {
      const link = document.createElement("a")
      link.href = application.cv
      link.download = `${application.firstName}_${application.lastName}_CV.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Error downloading CV:", error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-[var(--background)] dark:bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-[var(--primary)] border-[var(--border-color)]">
          <h2 className="text-xl font-semibold text-[var(--primary-foreground)]">Application Details</h2>
          <button
            onClick={onClose}
            className="text-[var(--primary-foreground)] hover:text-[var(--primary)] hover:bg-[var(--primary-foreground)] transition-colors rounded-full p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-3">Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-[var(--paragraph-color)] font-medium">First Name</p>
                <p className="text-[var(--foreground)]">{application.firstName}</p>
              </div>
              <div>
                <p className="text-sm text-[var(--paragraph-color)] font-medium">Last Name</p>
                <p className="text-[var(--foreground)]">{application.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-[var(--paragraph-color)] font-medium">Email</p>
                <p className="text-[var(--foreground)]">{application.email}</p>
              </div>
              <div>
                <p className="text-sm text-[var(--paragraph-color)] font-medium">Phone</p>
                <p className="text-[var(--foreground)]">{application.phone}</p>
              </div>
              <div>
                <p className="text-sm text-[var(--paragraph-color)] font-medium">Location</p>
                <p className="text-[var(--foreground)]">{application.location}</p>
              </div>
              <div>
                <p className="text-sm text-[var(--paragraph-color)] font-medium">Applied Date</p>
                <p className="text-[var(--foreground)]">{new Date(application.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Position Information */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-3">Position Applied</h3>
            <p className="text-[var(--foreground)]">{application.position}</p>
          </div>

          {/* Cover Letter */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-3">Cover Letter</h3>
            <div className="bg-background p-4 rounded text-[var(--paragraph-color)] whitespace-pre-wrap break-words">
              {application.coverLetter}
            </div>
          </div>

          {/* CV Download */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-3">Resume/CV</h3>
            <button
              onClick={downloadCV}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              Download CV
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
