"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

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
          .slice(0, 4); // show only top 4
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
    <div className="w-full bg-[var(--color-background)] text-[var(--color-foreground)] py-6 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - FAQ */}
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-4 text-sm text-[var(--color-paragraph)]">
                Loading FAQs...
              </div>
            ) : (
              faqs.map((faq, index) => (
                <div
                  key={faq._id}
                  className="border-b border-[var(--color-border)] pb-4"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-start justify-between gap-4 text-left group"
                  >
                    <h3 className="text-lg font-semibold text-[var(--color-header-text)] transition-colors group-hover:text-[var(--color-primary)]">
                      {faq.question}
                    </h3>
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-[var(--color-primary)] text-2xl font-light transition-transform duration-300">
                      {openIndex === index ? "−" : "+"}
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openIndex === index
                        ? "max-h-40 opacity-100 mt-3"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-[var(--color-paragraph)] text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right Side - Image */}
          <div className="relative w-full max-w-md mx-auto aspect-[4/3]">
            <Image
              src="/workers_02.png"
              alt="Construction workers"
              fill
              className="object-contain"
              priority
            />

            {/* Badge */}
            <div className="absolute top-40 left-16 hidden md:flex items-center justify-center w-20 h-20 bg-[var(--color-primary-foreground)] rounded-full shadow-lg">
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src="/text.png"
                  alt="Watch Video Text"
                  fill
                  className="object-contain scale-90"
                />
                <Play className="absolute w-5 h-5 text-[var(--color-primary)] " />
              </div>
            </div>
          </div>
        </div>

        {/* Companies Section */}
        <div className="mt-10">
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-7 md:gap-14 lg:gap-28">
            {companies.map((company, index) => (
              <div
                key={index}
                className="relative w-24 h-12 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
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