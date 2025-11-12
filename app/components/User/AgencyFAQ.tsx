"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import Loader from "../General/Loader";

interface FAQItem {
  _id: string;
  question: string;
  answer: string;
  showOnFAQPage: boolean;
}

const AgencyFAQ: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number>(1);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/faqs");
        const data = await response.json();
        const faqPageFAQs = data
          .filter((faq: FAQItem) => faq.showOnFAQPage)
          .slice(0, 4);
        setFaqs(faqPageFAQs);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const companies = [
    { name: "Clutch", image: "/companies/clutch.png" },
    { name: "Google", image: "/companies/google.png" },
    { name: "LinkedIn", image: "/companies/linkedIn.png" },
    { name: "Balkan", image: "/companies/balkan.png" },
    { name: "Alfred", image: "/companies/alfred.png" },
  ];

  return (
    <div className="w-full bg-[var(--color-background)] text-[var(--color-foreground)] py-6 px-5 sm:px-8 min-h-[400px]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - FAQ Accordion */}
          <div className="space-y-3">
            {loading ? (
             <Loader/>
            ) : (
              faqs.map((faq, index) => (
                <div
                  key={faq._id}
                  className="bg-[var(--color-header-background)] rounded-lg border border-[var(--color-border)] overflow-hidden hover:border-[var(--color-primary)] transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between gap-3 text-left p-4 group"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-primary)]/20 transition-all">
                        <span className="text-[var(--color-primary)] font-bold text-sm">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-[var(--color-header-text)] group-hover:text-[var(--color-primary)] transition-colors">
                        {faq.question}
                      </h3>
                    </div>
                    <div className={`w-6 h-6 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${openIndex === index ? 'rotate-180 bg-[var(--color-primary)]' : ''}`}>
                      <span className={`text-lg font-light transition-colors text-primary`}>
                        {openIndex === index ? "−" : "+"}
                      </span>
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openIndex === index
                        ? "max-h-32 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-4 pb-4 pl-16">
                      <p className="text-[var(--color-paragraph)] text-xs leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right Side - Image with Video Badge */}
          <div className="relative w-full max-w-md mx-auto">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/workers_02.png"
                alt="Construction workers"
                fill
                className="object-contain"
                priority
              />
              
              {/* Decorative Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Video Play Badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
              <div className="relative w-16 h-16 bg-[var(--color-primary-foreground)] rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform">
                <Play className="w-6 h-6 text-[var(--color-primary)] ml-1" fill="currentColor" />
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="text-[10px] font-semibold text-[var(--color-paragraph)] bg-[var(--color-background)]/90 px-2 py-1 rounded">
                  Watch Video
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Companies Section */}
        <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16">
            {companies.map((company, index) => (
              <div
                key={index}
                className="relative w-20 h-10 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
              >
                <Image
                  src={company.image}
                  alt={company.name}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgencyFAQ;