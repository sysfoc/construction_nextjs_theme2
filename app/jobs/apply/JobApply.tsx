// app/jobs/apply/JobApply.tsx
"use client"

export const dynamic = "force-dynamic"

import type React from "react"
import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { isPageVisible } from "@/lib/api/pageVisibility"
import { Briefcase, CheckCircle2, Upload, Send } from "lucide-react"

export default function JobApply() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const position = searchParams.get("position") || ""
  const [isVisible, setIsVisible] = useState(true)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const checkVisibility = async () => {
      const visible = await isPageVisible("jobs")
      setIsVisible(visible)
      if (!visible) {
        router.push("/not-found")
      }
    }
    checkVisibility()
  }, [router])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const cvFile = formData.get("cv") as File

    let cvBase64 = ""
    if (cvFile) {
      const reader = new FileReader()
      reader.onloadend = async () => {
        cvBase64 = reader.result as string

        try {
          const response = await fetch("/api/job-applications", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              firstName: formData.get("fname"),
              lastName: formData.get("lname"),
              email: formData.get("email"),
              location: formData.get("location"),
              phone: formData.get("phone"),
              position: formData.get("position"),
              cv: cvBase64,
              coverLetter: formData.get("coverLetter"),
            }),
          })

          if (response.ok) {
            setSubmitted(true)
            window.scrollTo(0, 0)
            setTimeout(() => {
              router.push("/careers")
            }, 2000)
          }
        } catch (error) {
          console.error("Error submitting application:", error)
        } finally {
          setLoading(false)
        }
      }
      reader.readAsDataURL(cvFile)
    }
  }

  if (!isVisible) {
    return null
  }

  if (submitted) {
    return (
      <section className="py-20 px-6 flex items-center justify-center min-h-screen bg-[var(--background)]">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl font-bold mb-3 text-[var(--foreground)]">Application Submitted</h2>
          <p className="text-[var(--paragraph-color)] text-sm">
            Thank you for applying! We will review your application and get back to you soon.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 px-6 bg-[var(--background)]">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 border-l-4 border-[var(--primary)] pl-5">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="w-5 h-5 text-[var(--primary)]" />
            <span className="text-[var(--primary)] text-xs font-bold uppercase tracking-widest">
              Job Apply Now
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-2 text-[var(--foreground)]">Apply for this Job</h2>
          <p className="text-[var(--paragraph-color)] text-sm max-w-2xl">
            Complete the form below to submit your application. We review all applications carefully.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-[var(--background)] border border-[var(--border-color)] rounded-lg p-6 shadow-sm">
          <div className="space-y-6">
            {/* Personal Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4 pb-2 border-b border-[var(--border-color)]">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="fname" className="text-xs font-semibold text-[var(--foreground)] uppercase tracking-wide">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="fname"
                    name="fname"
                    required
                    autoComplete="on"
                    placeholder="Enter first name"
                    className="border border-[var(--border-color)] text-[var(--foreground)] text-sm rounded-md w-full px-3 py-2.5 placeholder:text-[var(--paragraph-color)] outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="lname" className="text-xs font-semibold text-[var(--foreground)] uppercase tracking-wide">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lname"
                    name="lname"
                    required
                    autoComplete="on"
                    placeholder="Enter last name"
                    className="border border-[var(--border-color)] text-[var(--foreground)] text-sm rounded-md w-full px-3 py-2.5 placeholder:text-[var(--paragraph-color)] outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4 pb-2 border-b border-[var(--border-color)]">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-semibold text-[var(--foreground)] uppercase tracking-wide">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    autoComplete="on"
                    placeholder="your.email@example.com"
                    className="border border-[var(--border-color)] text-[var(--foreground)] text-sm rounded-md w-full px-3 py-2.5 placeholder:text-[var(--paragraph-color)] outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="text-xs font-semibold text-[var(--foreground)] uppercase tracking-wide">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    autoComplete="on"
                    placeholder="+1 (555) 000-0000"
                    className="border border-[var(--border-color)] text-[var(--foreground)] text-sm rounded-md w-full px-3 py-2.5 placeholder:text-[var(--paragraph-color)] outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
                  />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label htmlFor="location" className="text-xs font-semibold text-[var(--foreground)] uppercase tracking-wide">
                    Location (City) *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    required
                    autoComplete="on"
                    placeholder="Enter your city"
                    className="border border-[var(--border-color)] text-[var(--foreground)] text-sm rounded-md w-full px-3 py-2.5 placeholder:text-[var(--paragraph-color)] outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Position & Documents Section */}
            <div>
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4 pb-2 border-b border-[var(--border-color)]">
                Position & Documents
              </h3>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="position" className="text-xs font-semibold text-[var(--foreground)] uppercase tracking-wide">
                    Applying For *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="position"
                      name="position"
                      value={position}
                      readOnly
                      className="border border-[var(--border-color)] bg-gray-50 dark:bg-gray-800 text-[var(--foreground)] text-sm rounded-md w-full px-3 py-2.5 cursor-not-allowed outline-none"
                    />
                    <Briefcase className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--primary)]" />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label htmlFor="cv" className="text-xs font-semibold text-[var(--foreground)] uppercase tracking-wide flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload CV/Resume *
                  </label>
                  <input
                    type="file"
                    id="cv"
                    name="cv"
                    accept=".pdf,.doc,.docx"
                    required
                    className="border border-[var(--border-color)] text-[var(--foreground)] text-sm rounded-md w-full px-3 py-2.5 outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[var(--primary)] file:text-[var(--primary-foreground)] hover:file:bg-opacity-90"
                  />
                  <p className="text-xs text-[var(--paragraph-color)] mt-1">Accepted formats: PDF, DOC, DOCX</p>
                </div>
              </div>
            </div>

            {/* Cover Letter Section */}
            <div>
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4 pb-2 border-b border-[var(--border-color)]">
                Cover Letter
              </h3>
              <div className="space-y-1.5">
                <label htmlFor="coverLetter" className="text-xs font-semibold text-[var(--foreground)] uppercase tracking-wide">
                  Tell us about yourself *
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  required
                  rows={6}
                  placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                  className="border border-[var(--border-color)] text-[var(--foreground)] text-sm rounded-md w-full px-3 py-2.5 placeholder:text-[var(--paragraph-color)] outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent resize-none transition-all"
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-[var(--border-color)]">
              <button
                type="submit"
                disabled={loading}
                onClick={(e) => {
                  const form = e.currentTarget.closest('form');
                  if (form) handleSubmit(e as any);
                }}
                className="w-full md:w-auto bg-[var(--primary)] hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-[var(--primary-foreground)] text-sm font-semibold px-8 py-3 rounded-md uppercase flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Application
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}