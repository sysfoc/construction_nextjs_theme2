"use client"

import { Eye, Trash2, CheckCircle, XCircle } from "lucide-react"

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

interface ApplicationCardProps {
  application: JobApplication
  onViewDetails: (app: JobApplication) => void
  onStatusChange: (id: string, status: "accepted" | "rejected") => void
  onDelete: (id: string) => void
}

export function ApplicationCard({ application, onViewDetails, onStatusChange, onDelete }: ApplicationCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    }
  }

  return (
    <div className="bg-[var(--background)] border border-[var(--border-color)] rounded-lg p-4 dark:bg-gray-900">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Left Section - Application Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <h3 className="text-base font-semibold text-[var(--foreground)]">
              {application.firstName} {application.lastName}
            </h3>
            <span className={`text-xs px-2 py-1 rounded font-medium ${getStatusColor(application.status)}`}>
              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
            </span>
          </div>
          <div className="space-y-1 text-sm text-[var(--paragraph-color)]">
            <p>
              <span className="font-medium">Position:</span> {application.position}
            </p>
            <p>
              <span className="font-medium">Email:</span> {application.email}
            </p>
            <p>
              <span className="font-medium">Applied:</span> {new Date(application.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Right Section - Action Buttons */}
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <button
            onClick={() => onViewDetails(application)}
            className="flex items-center justify-center gap-2 px-3 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded text-sm font-medium transition-colors"
            title="View details"
          >
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">View</span>
          </button>

          {application.status === "pending" && (
            <>
              <button
                onClick={() => onStatusChange(application.id, "accepted")}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded text-sm font-medium transition-colors"
                title="Accept application"
              >
                <CheckCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Accept</span>
              </button>
              <button
                onClick={() => onStatusChange(application.id, "rejected")}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded text-sm font-medium transition-colors"
                title="Reject application"
              >
                <XCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Reject</span>
              </button>
            </>
          )}

          <button
            onClick={() => onDelete(application.id)}
            className="flex items-center justify-center gap-2 px-3 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded text-sm font-medium transition-colors"
            title="Delete application"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>
      </div>
    </div>
  )
}
