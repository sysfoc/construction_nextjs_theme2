"use client"
import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { isPageVisible } from "@/lib/api/pageVisibility"
import { useRouter } from "next/navigation"
import { HelpCircle, ChevronDown, MessageCircle } from "lucide-react"
import Link from "next/link"

interface FAQItem {
  _id: string
  question: string
  answer: string
  showOnFAQPage: boolean
}

const FaqClient: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [faqs, setFaqs] = useState<FAQItem[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const [openIndex, setOpenIndex] = useState<number>(0)

  useEffect(() => {
    const checkVisibility = async () => {
      const visible = await isPageVisible("faqs")
      setIsVisible(visible)
      if (!visible) {
        router.push("/not-found")
      }
    }
    checkVisibility()
    fetchFAQs()
  }, [router])

  const fetchFAQs = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/faqs")
      const data = await response.json()
      const faqPageFAQs = data.filter((faq: FAQItem) => faq.showOnFAQPage)
      setFaqs(faqPageFAQs)
    } catch (error) {
      console.error("Error fetching FAQs:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!isVisible) {
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-[var(--color-paragraph)] text-sm">Loading FAQs...</p>
        </div>
      </div>
    )
  }

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index)
  }

  return (
    <div className="bg-[var(--color-background)] text-[var(--color-foreground)] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top Section - Images in horizontal row */}
        <div className="mb-12">
          <div className="flex flex-wrap md:flex-nowrap gap-4 items-center justify-center">
            <div className="relative w-64 h-80 flex-shrink-0">
              <Image src="/FAQ/FAQ_01.png" alt="Construction worker" fill className="object-contain rounded-lg" />
            </div>
            <div className="relative w-64 h-80 flex-shrink-0">
              <Image src="/FAQ/FAQ_02.png" alt="Construction workers" fill className="object-contain rounded-lg" />
            </div>
          </div>
        </div>

        {/* Header - Centered */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3">
            <MessageCircle className="w-6 h-6 text-[var(--color-primary)]" />
            <span className="text-[var(--color-primary)] text-sm font-bold uppercase tracking-widest">
              Great Experience in building
            </span>
          </div>
          <p className="text-[var(--color-paragraph)] text-sm leading-relaxed">
            Aliquam tempus libero eget arcu euismod. In bibendum nisl posuere. Donec gravida sem eu odio rhoncus
            viverra. In vel cursus ante.
          </p>
        </div>

        {/* FAQ Accordion - Single Column Centered */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={faq._id}
                className="bg-[var(--color-background)] border-2 border-[var(--color-border)] rounded-xl overflow-hidden hover:border-[var(--color-primary)] transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center gap-4 p-3 text-left group"
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      openIndex === index 
                        ? 'bg-[var(--color-primary)] text-white' 
                        : 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                    }`}>
                      <HelpCircle className="w-5 h-5" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-sm sm:text-lg font-bold text-[var(--color-header-text)] group-hover:text-[var(--color-primary)] transition-colors">
                      {faq.question}
                    </h3>
                  </div>

                  <div className="flex-shrink-0">
                    <ChevronDown 
                      className={`w-6 h-6 text-[var(--color-primary)] transition-transform duration-300 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-5 pb-5 sm:pl-[4.5rem]">
                    <div className="border-l-2 border-[var(--color-primary)] pl-4">
                      <p className="text-[var(--color-paragraph)] text-xs sm:text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-primary)]/10 rounded-full">
            <MessageCircle className="w-5 h-5 text-[var(--color-primary)]" />
            <span className="text-[var(--color-foreground)] text-sm font-medium">
              Still have questions? <Link href="/contact" className="text-[var(--color-primary)] font-bold hover:underline">Contact us</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FaqClient