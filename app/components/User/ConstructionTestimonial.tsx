"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loader from "../General/Loader"

interface Testimonial {
  id: string;
  name: string;
  designation: string;
  photo: string | null;
  stars: number;
  comment: string;
}

const ConstructionTestimonial: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/api/testimonials");
        const data = await response.json();
        setTestimonials(data.testimonials?.slice(0, 3) || []);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  if (loading) {
    return (
        <Loader height="440px" />
    );
  }

  if (!testimonials.length) return null;
  const selectedTestimonial = testimonials[selectedIndex];

  return (
    <section className="relative w-full py-8 px-4 bg-[var(--color-background)]">
      <div className="max-w-6xl mx-auto">
        {/* Header Badge */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-2 bg-[var(--color-primary)]/10 px-3 py-1.5 rounded-full mb-2">
            <svg
              className="w-4 h-4 text-[var(--color-primary)]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
            </svg>
            <span className="text-[var(--color-primary)] text-[10px] font-bold uppercase tracking-wide">
              Client Feedback
            </span>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Left: Background Image Card */}
          <div className="relative lg:col-span-1 h-64 lg:h-auto rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/construction_01.jpg"
              alt="Construction"
              fill
              priority
              className="object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

            {/* Floating Stats */}
            <div className="absolute bottom-4 left-4 right-4 space-y-2">
              <div className="bg-background backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-paragraph">
                    Customer Satisfaction
                  </span>
                  <span className="text-lg font-semibold text-[var(--color-primary)]">
                    Reliable
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Center: Testimonial Content */}
          <div className="lg:col-span-2 bg-gradient-to-br from-[var(--color-header-background)] to-[var(--color-header-background)]/50 rounded-xl p-5 border-l-4 border-[var(--color-primary)] shadow-lg">
            {/* Stars */}
            <div className="flex gap-0.5 mb-3">
              {[...Array(selectedTestimonial.stars)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 fill-[var(--color-primary)]"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>

            {/* Comment */}
            <p className="text-[var(--color-paragraph)] text-sm md:text-base leading-relaxed mb-4 italic">
              "{selectedTestimonial.comment}"
            </p>

            {/* Author Info */}
            <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border)]">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 flex-shrink-0">
                  {selectedTestimonial.photo ? (
                    <Image
                      src={selectedTestimonial.photo}
                      alt={selectedTestimonial.name}
                      fill
                      className="rounded-lg object-cover border-2 border-[var(--color-primary)]"
                    />
                  ) : (
                    <div className="w-full h-full rounded-lg bg-[var(--color-primary)]/10 border-2 border-[var(--color-primary)]" />
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--color-header-text)]">
                    {selectedTestimonial.name}
                  </h4>
                  <p className="text-xs text-[var(--color-primary)] font-semibold">
                    {selectedTestimonial.designation}
                  </p>
                </div>
              </div>

              {/* Navigation Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    className={`transition-all duration-300 rounded-full ${
                      selectedIndex === index
                        ? "w-6 h-2 bg-[var(--color-primary)]"
                        : "w-2 h-2 bg-[var(--color-border)] hover:bg-[var(--color-primary)]/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Avatar Selector + CTA */}
        <div className="mt-5 bg-[var(--color-header-background)] rounded-xl p-4 border border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {testimonials.map((member, index) => (
              <button
                key={member.id}
                onClick={() => setSelectedIndex(index)}
                className={`relative transition-all duration-300 ${
                  selectedIndex === index
                    ? "scale-110"
                    : "opacity-50 hover:opacity-100"
                }`}
              >
                <div className="relative w-10 h-10">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className={`rounded-full object-cover border-2 ${
                        selectedIndex === index
                          ? "border-[var(--color-primary)]"
                          : "border-[var(--color-border)]"
                      }`}
                    />
                  ) : (
                    <div
                      className={`w-full h-full rounded-full bg-[var(--color-primary)]/10 border-2 ${
                        selectedIndex === index
                          ? "border-[var(--color-primary)]"
                          : "border-[var(--color-border)]"
                      }`}
                    />
                  )}
                  {selectedIndex === index && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[var(--color-primary)] rounded-full border-2 border-[var(--color-background)]" />
                  )}
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={() => router.push("/testimonials")}
            className="flex items-center gap-2 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] px-5 py-2 rounded-lg text-xs font-bold hover:shadow-lg transition-all hover:gap-3"
          >
            <span>View All</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ConstructionTestimonial;
