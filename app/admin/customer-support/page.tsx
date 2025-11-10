// app/admin/customer-support/page.tsx

"use client"
import { Mail, MessageCircle, Clock, ChevronDown } from "lucide-react"
import { useState } from "react"

const faqs = [
  {
    question: "How do I add a new service?",
    answer: "Navigate to the Services section from the sidebar, click 'Add New Service', fill in the service details including title, description, and icon, then click save."
  },
  {
    question: "How can I manage hero slider images?",
    answer: "Go to Slider Management in the sidebar. You can add new slides by uploading images, setting headings, button text, and URLs. Use drag-and-drop to reorder slides."
  },
  {
    question: "How do I respond to quote requests?",
    answer: "Visit Quote Requests section to view all incoming requests. Click on a request to view details, then mark it as completed once you've responded to the customer via email or phone."
  },
  {
    question: "How can I update company information?",
    answer: "Go to Settings > General to update company name, address, phone, email, office hours, logo, and social media links. Don't forget to save changes."
  },
  {
    question: "How do I manage job applications?",
    answer: "Navigate to Job Applications section to view all submissions. You can review CVs, cover letters, and update application status to pending, accepted, or rejected."
  },
  {
    question: "How can I add team members?",
    answer: "Go to Team section, click 'Add Team Member', upload their photo, enter name and designation, then save. You can edit or delete members anytime."
  },
  {
    question: "How do I send newsletters to subscribers?",
    answer: "Visit the Newsletter section, create your newsletter with subject and content, then send it to all active subscribers. The system will track the recipient count automatically."
  }
]

export default function CustomerSupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleEmailClick = () => {
    window.open("mailto:support@sysfoc.com", "_blank")
  }

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/923006904440", "_blank")
  }

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <div className="w-full min-h-screen bg-background overflow-x-hidden">
      <div className="p-4 sm:p-6 max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-[var(--header-text)] mb-2">
            Need Help? We are here for you!
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            If you are facing any technical issue, have a question, please reach out to our support team using any of the options below.
          </p>
        </div>

        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Email Support Card */}
          <div className="bg-[var(--background)] border border-[var(--border-color)] rounded p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 bg-[var(--primary)]/10 rounded-full flex-shrink-0">
                <Mail className="w-5 h-5 text-[var(--primary)]" />
              </div>
              <h2 className="text-base font-semibold text-[var(--header-text)]">
                Email Support
              </h2>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Send us email at
            </p>
            
            <button
              onClick={handleEmailClick}
              className="text-[var(--primary)] font-medium text-sm hover:underline break-all mb-3"
            >
              support@sysfoc.com
            </button>
            
            <div className="flex items-start gap-2 pt-3 border-t border-[var(--border-color)]">
              <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Our team usually replies within 24 hours.
              </p>
            </div>
          </div>

          {/* WhatsApp Support Card */}
          <div className="bg-[var(--background)] border border-[var(--border-color)] rounded p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-base font-semibold text-[var(--header-text)]">
                WhatsApp Support
              </h2>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Contact us on WhatsApp
            </p>
            
            <button
              onClick={handleWhatsAppClick}
              className="text-green-600 dark:text-green-400 font-medium text-sm hover:underline mb-3"
            >
              (+92) 300 6904440
            </button>
            
            <div className="flex items-start gap-2 pt-3 border-t border-[var(--border-color)]">
              <MessageCircle className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Get instant responses via WhatsApp chat.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-[var(--header-text)] mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-[var(--background)] border border-[var(--border-color)] rounded overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 text-left transition-colors"
                >
                  <span className="text-sm font-medium text-[var(--header-text)] pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`transition-all duration-200 overflow-hidden ${
                    openFaq === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Website Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Visit our website at{" "}
            <a
              href="https://sysfoc.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--primary)] font-medium hover:underline"
            >
              sysfoc.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}