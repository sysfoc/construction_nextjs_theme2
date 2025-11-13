"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { isPageVisible } from "@/lib/api/pageVisibility"
import { FileText } from "lucide-react"
import Loader from "../components/General/Loader"

interface TermsAndConditions {
  _id: string
  title: string
  content: string
  lastUpdated: string
}

export default function TermsAndConditionsPage() {
  const [termsAndConditions, setTermsAndConditions] = useState<TermsAndConditions | null>(null)
  const [loading, setLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkVisibility = async () => {
      const visible = await isPageVisible("terms-and-conditions")
      setIsVisible(visible)
      if (!visible) {
        router.push("/not-found")
      }
    }
    checkVisibility()
  }, [router])

  useEffect(() => {
    const fetchTermsAndConditions = async () => {
      try {
        const response = await fetch("/api/terms-and-conditions")
        const data = await response.json()
        setTermsAndConditions(data)
      } catch (error) {
        console.error("Error fetching terms and conditions:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTermsAndConditions()
  }, [])

  if (!isVisible) {
    return null
  }

  if (loading) {
    return (
      <div className="flex items-start mt-20 justify-center min-h-screen">
              <Loader/>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background px-6 py-12">
      <section className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-6 h-6 text-primary" />
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              {termsAndConditions?.title || "Terms and Conditions"}
            </h1>
          </div>
          {termsAndConditions && (
            <p className="text-sm text-gray-500">
              Last updated: {new Date(termsAndConditions.lastUpdated).toLocaleDateString()}
            </p>
          )}
        </div>

        {/* Content */}
        {termsAndConditions ? (
          <div className="bg-card border border-border rounded-lg p-6 sm:p-8">
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <div
                className="text-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: termsAndConditions.content }}
              />
            </div>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <p className="text-gray-500">No terms and conditions available at this time.</p>
          </div>
        )}
      </section>
    </main>
  )
}
