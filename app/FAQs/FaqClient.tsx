"use client";
import type React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { isPageVisible } from "@/lib/api/pageVisibility";
import { useRouter } from "next/navigation";
import {
  HelpCircle,
  ChevronRight,
  MessageCircle,
  Plus,
  Minus,
} from "lucide-react";
import Link from "next/link";
import Loader from "../components/General/Loader";

interface FAQItem {
  _id: string;
  question: string;
  answer: string;
  showOnFAQPage: boolean;
}

const FaqClient: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number>(0);

  useEffect(() => {
    const checkVisibility = async () => {
      const visible = await isPageVisible("faqs");
      setIsVisible(visible);
      if (!visible) {
        router.push("/not-found");
      }
    };
    checkVisibility();
    fetchFAQs();
  }, [router]);

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/faqs");
      const data = await response.json();
      const faqPageFAQs = data.filter((faq: FAQItem) => faq.showOnFAQPage);
      setFaqs(faqPageFAQs);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isVisible) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex items-start mt-20 justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="bg-[var(--color-background)] min-h-screen py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Compact Header with Side Images */}
        <div className="grid lg:grid-cols-[200px_1fr_200px] gap-6 items-start mb-8">
          {/* Left Image - Hidden on mobile */}
          <div className="hidden lg:block relative w-full h-64 rounded-2xl overflow-hidden border-2 border-[var(--color-border)] shadow-lg">
            <Image
              src="/FAQ/infrastructure-3.jpg"
              alt="Construction worker"
              fill
              className="object-cover"
            />
          </div>

          {/* Center Header */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-[var(--color-primary)]/10 px-3 py-1 rounded-full mb-2">
              <MessageCircle className="w-3.5 h-3.5 text-[var(--color-primary)]" />
              <span className="text-[var(--color-primary)] text-[10px] font-bold uppercase tracking-wide">
                Got Questions?
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-foreground)] mb-2">
              Frequently Asked Questions
            </h1>
            <p className="text-xs sm:text-sm text-[var(--color-paragraph)] max-w-xl mx-auto">
              Find answers to common questions about our construction services
              and processes
            </p>

            {/* Stats Bar */}
            <div className="bg-[var(--color-header-background)] border-2 border-[var(--color-border)] rounded-xl p-3 my-6 md:my-10 flex items-center justify-between max-w-3xl mx-auto">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[var(--color-primary)]/10 rounded-lg flex items-center justify-center">
                  <HelpCircle className="w-4 h-4 text-[var(--color-primary)]" />
                </div>
                <div>
                  <p className="text-lg font-bold text-[var(--color-foreground)]">
                    {faqs.length}
                  </p>
                  <p className="text-[10px] text-[var(--color-paragraph)] uppercase tracking-wide">
                    Questions Answered
                  </p>
                </div>
              </div>
              <div className="text-xs text-[var(--color-paragraph)] hidden sm:block">
                Click to expand answers
              </div>
            </div>
          </div>

          {/* Right Image - Hidden on mobile */}
          <div className="hidden lg:block relative w-full h-64 rounded-2xl overflow-hidden border-2 border-[var(--color-border)] shadow-lg">
            <Image
              src="/FAQ/construction (1).jpg"
              alt="Construction workers"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Two Column FAQ Grid */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 gap-3">
            {faqs.map((faq, index) => (
              <div
                key={faq._id}
                className="group bg-[var(--color-background)] border-2 border-[var(--color-border)] rounded-xl overflow-hidden hover:border-[var(--color-primary)] hover:shadow-lg transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <div
                        className={`w-6 h-6 rounded-md flex items-center justify-center transition-all duration-300 ${
                          openIndex === index
                            ? "bg-[var(--color-primary)]"
                            : "bg-[var(--color-primary)]/10"
                        }`}
                      >
                        {openIndex === index ? (
                          <Minus className="w-3.5 h-3.5 text-white" />
                        ) : (
                          <Plus className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                        )}
                      </div>
                    </div>

                    <h3 className="flex-1 text-sm font-bold text-[var(--color-header-text)] group-hover:text-[var(--color-primary)] transition-colors leading-snug">
                      {faq.question}
                    </h3>

                    <ChevronRight
                      className={`w-4 h-4 text-[var(--color-primary)] flex-shrink-0 transition-transform duration-300 ${
                        openIndex === index ? "rotate-90" : ""
                      }`}
                    />
                  </div>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      openIndex === index ? "max-h-96 mt-2" : "max-h-0"
                    }`}
                  >
                    <div className="pl-9 pr-2">
                      <p className="text-xs text-[var(--color-paragraph)] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Compact Bottom CTA */}
        <div className="mt-8 text-center max-w-3xl mx-auto">
          <div className="bg-[var(--color-header-background)] border-2 border-[var(--color-border)] rounded-xl p-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[var(--color-primary)]/10 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-[var(--color-primary)]" />
                </div>
                <span className="text-sm font-medium text-[var(--color-foreground)]">
                  Need more help?
                </span>
              </div>
              <Link
                href="/contact"
                className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] rounded-lg text-xs font-bold uppercase hover:opacity-90 transition-opacity"
              >
                Contact Support
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqClient;
