"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import { MapPin, Calendar, DollarSign, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { isPageVisible } from "@/lib/api/pageVisibility";

interface Job {
  id: string
  image: string | null
  title: string
  location: string
  deadline: string
  payRange: string
  description: string
  jobType: string
}

const CareerCard: React.FC<Job & { onApply: (title: string) => void }> = ({
  image,
  title,
  location,
  deadline,
  payRange,
  description,
  jobType,
  onApply,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkVisibility = async () => {
      const visible = await isPageVisible("careers");
      setIsVisible(visible);
      if (!visible) {
        router.push("/not-found");
      }
    };
    checkVisibility();
  }, [router]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="bg-[var(--background)] dark:bg-gray-900 rounded-xl overflow-hidden border border-[var(--border-color)] dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:border-[var(--primary)] group">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[var(--primary)]/5 to-transparent p-5 border-b border-[var(--border-color)] dark:border-gray-700">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 border-[var(--primary)]/20">
              {image ? (
                <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-xs text-gray-400">No Image</span>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-[var(--foreground)] dark:text-gray-100 group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                {title}
              </h3>
            </div>
          </div>
          <span className="px-3 py-1 text-xs font-semibold text-[var(--primary)] bg-[var(--primary)]/10 rounded-full whitespace-nowrap flex-shrink-0">
            {jobType}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Job Details Grid */}
        <div className="grid grid-cols-1 gap-2.5 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-[var(--primary)]" />
            </div>
            <span className="text-[var(--paragraph-color)] dark:text-gray-400">{location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-4 h-4 text-[var(--primary)]" />
            </div>
            <span className="text-[var(--paragraph-color)] dark:text-gray-400">{deadline}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0">
              <DollarSign className="w-4 h-4 text-[var(--primary)]" />
            </div>
            <span className="text-[var(--paragraph-color)] dark:text-gray-400 font-medium">{payRange}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-[var(--paragraph-color)] dark:text-gray-400 leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>

        {/* Apply Button */}
        <button
          onClick={() => onApply(title)}
          className="w-full bg-[var(--primary)] hover:bg-opacity-90 text-[var(--primary-foreground)] dark:text-white font-semibold py-2.5 px-4 rounded-lg text-sm transition-all duration-300 flex items-center justify-center gap-2 group/btn"
        >
          APPLY NOW
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  )
}

const CareersClient: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/careers")
      const data = await response.json()
      setJobs(data.jobs || [])
    } catch (error) {
      console.error("Error fetching jobs:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleApply = (jobTitle: string) => {
    router.push(`/jobs/apply?position=${encodeURIComponent(jobTitle)}`)
  }

  return (
    <div className="min-h-screen bg-[var(--background)] dark:bg-gray-950 p-4 py-10 lg:px-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Loading opportunities...</p>
            </div>
          </div>
        ) : jobs.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-600 dark:text-gray-400">No job openings available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <CareerCard key={job.id} {...job} onApply={handleApply} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CareersClient