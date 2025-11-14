// app/jobs/apply/JobApply.tsx
"use client"

export const dynamic = "force-dynamic"

import type React from "react"
import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { isPageVisible } from "@/lib/api/pageVisibility"
import { Briefcase, CheckCircle2, Upload, Send, User, Mail, Phone, MapPin, FileText } from "lucide-react"

export default function JobApply() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const position = searchParams.get("position") || ""
  const [isVisible, setIsVisible] = useState(true)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    location: "",
    coverLetter: "",
    cv: null as File | null
  })

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, cv: e.target.files[0] })
    }
  }

  const handleSubmit = async () => {
    if (!formData.cv) {
      alert("Please upload your CV")
      return
    }

    setLoading(true)

    const reader = new FileReader()
    reader.onloadend = async () => {
      const cvBase64 = reader.result as string

      try {
        const response = await fetch("/api/job-applications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: formData.fname,
            lastName: formData.lname,
            email: formData.email,
            location: formData.location,
            phone: formData.phone,
            position: position,
            cv: cvBase64,
            coverLetter: formData.coverLetter,
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
    reader.readAsDataURL(formData.cv)
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
      <div className="max-w-6xl mx-auto">
        {/* Compact Top Header */}
        <div className="bg-[var(--background)] border border-[var(--border-color)] rounded-lg p-5 mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Briefcase className="w-5 h-5 text-[var(--primary)]" />
            <span className="text-[var(--primary)] text-xs font-bold uppercase tracking-widest">
              Job Apply Now
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-2 text-[var(--foreground)]">Apply for this Job</h2>
          <p className="text-[var(--paragraph-color)] text-sm">
            Complete the form below to submit your application. We review all applications carefully.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Personal & Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Info Card */}
            <div className="bg-[var(--background)] border border-[var(--border-color)] rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-[var(--primary)]" />
                <h3 className="text-lg font-semibold text-[var(--foreground)]">Personal Information</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
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
                    value={formData.fname}
                    onChange={handleInputChange}
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
                    value={formData.lname}
                    onChange={handleInputChange}
                    placeholder="Enter last name"
                    className="border border-[var(--border-color)] text-[var(--foreground)] text-sm rounded-md w-full px-3 py-2.5 placeholder:text-[var(--paragraph-color)] outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Contact Info Card */}
            <div className="bg-[var(--background)] border border-[var(--border-color)] rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Mail className="w-5 h-5 text-[var(--primary)]" />
                <h3 className="text-lg font-semibold text-[var(--foreground)]">Contact Information</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
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
                    value={formData.email}
                    onChange={handleInputChange}
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
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                    className="border border-[var(--border-color)] text-[var(--foreground)] text-sm rounded-md w-full px-3 py-2.5 placeholder:text-[var(--paragraph-color)] outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
                  />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label htmlFor="location" className="text-xs font-semibold text-[var(--foreground)] uppercase tracking-wide">
                    Location (City) *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--paragraph-color)]" />
                    <input
                      type="text"
                      id="location"
                      name="location"
                      required
                      autoComplete="on"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Enter your city"
                      className="border border-[var(--border-color)] text-[var(--foreground)] text-sm rounded-md w-full pl-10 pr-3 py-2.5 placeholder:text-[var(--paragraph-color)] outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Cover Letter Card */}
            <div className="bg-[var(--background)] border border-[var(--border-color)] rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-[var(--primary)]" />
                <h3 className="text-lg font-semibold text-[var(--foreground)]">Cover Letter</h3>
              </div>
              <div className="space-y-1.5">
                <label htmlFor="coverLetter" className="text-xs font-semibold text-[var(--foreground)] uppercase tracking-wide">
                  Tell us about yourself *
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  required
                  rows={6}
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                  className="border border-[var(--border-color)] text-[var(--foreground)] text-sm rounded-md w-full px-3 py-2.5 placeholder:text-[var(--paragraph-color)] outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent resize-none transition-all"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Right Column - Position & Documents */}
          <div className="lg:col-span-1 space-y-6">
            {/* Position Card */}
            <div className="bg-[var(--background)] border border-[var(--border-color)] rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-5 h-5 text-[var(--primary)]" />
                <h3 className="text-lg font-semibold text-[var(--foreground)]">Position</h3>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[var(--foreground)] uppercase tracking-wide">
                  Applying For *
                </label>
                <div className="bg-[var(--primary)]/5 border-2 border-[var(--primary)]/20 rounded-lg p-4">
                  <p className="text-[var(--foreground)] text-sm font-semibold">{position}</p>
                </div>
              </div>
            </div>

            {/* Upload CV Card */}
            <div className="bg-[var(--background)] border border-[var(--border-color)] rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Upload className="w-5 h-5 text-[var(--primary)]" />
                <h3 className="text-lg font-semibold text-[var(--foreground)]">Documents</h3>
              </div>
              <div className="space-y-1.5">
                <label htmlFor="cv" className="text-xs font-semibold text-[var(--foreground)] uppercase tracking-wide">
                  Upload CV/Resume *
                </label>
                <input
                  type="file"
                  id="cv"
                  name="cv"
                  accept=".pdf,.doc,.docx"
                  required
                  onChange={handleFileChange}
                  className="border border-[var(--border-color)] text-[var(--foreground)] text-sm rounded-md w-full px-3 py-2.5 outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[var(--primary)] file:text-[var(--primary-foreground)] hover:file:bg-opacity-90"
                />
                <p className="text-xs text-[var(--paragraph-color)] mt-1">Accepted formats: PDF, DOC, DOCX</p>
              </div>
            </div>

            {/* Application Tips Card */}
            <div className="bg-[var(--primary)]/5 border border-[var(--primary)]/20 rounded-lg p-5">
              <h4 className="text-sm font-semibold text-[var(--foreground)] mb-3">Application Tips</h4>
              <ul className="space-y-2">
                {[
                  'Ensure CV is up-to-date',
                  'Double-check contact info',
                  'Be specific in cover letter',
                  'Review before submitting'
                ].map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-[var(--paragraph-color)]">
                    <CheckCircle2 className="w-3 h-3 text-[var(--primary)] mt-0.5 flex-shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-[var(--primary)] hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-[var(--primary-foreground)] text-sm font-semibold px-8 py-3 rounded-md uppercase flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md"
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
    </section>
  )
}