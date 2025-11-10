"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/api/testimonials");
        const data = await response.json();
        setTestimonials(data.testimonials?.slice(0, 3) || []);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      }
    };
    fetchTestimonials();
  }, []);

  if (!testimonials.length) return null;
  const selectedTestimonial = testimonials[selectedIndex];

  return (
    <section className="relative w-full min-h-[45vh] sm:min-h-[50vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/construction_01.jpg"
          alt="Construction background"
          fill
          priority
          quality={100}
          className="object-cover object-top sm:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)]/90 via-[var(--color-background)]/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-8 sm:py-10">
        <div className="bg-[var(--color-background)]/75 backdrop-blur-md rounded-2xl shadow-lg border border-[var(--color-border)] overflow-hidden">
          {/* Testimonial Card */}
          <div className="p-6 md:p-4">
            <div className="mb-2">
              <svg className="w-10 h-10 text-[var(--color-primary)] opacity-30" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
              </svg>
            </div>

            <div className="flex gap-1 mb-2">
              {[...Array(selectedTestimonial.stars)].map((_, i) => (
                <svg key={i} className="w-4 h-4 fill-[var(--color-primary)]" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>

            <p className="text-[var(--color-paragraph)] text-base md:text-lg leading-snug mb-6 italic">
              "{selectedTestimonial.comment}"
            </p>

            <div className="flex items-center gap-3 border-b border-[var(--color-border)] pb-3">
              <div className="relative w-12 h-12 flex-shrink-0">
                {selectedTestimonial.photo ? (
                  <Image
                    src={selectedTestimonial.photo}
                    alt={selectedTestimonial.name}
                    fill
                    className="rounded-full object-cover border-2 border-[var(--color-primary)] shadow-md"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-200 border-2 border-[var(--color-primary)] shadow-md" />
                )}
              </div>
              <div>
                <h4 className="text-sm md:text-base font-bold text-[var(--color-header-text)]">{selectedTestimonial.name}</h4>
                <p className="text-xs md:text-sm text-[var(--color-primary)] font-semibold">{selectedTestimonial.designation}</p>
              </div>
            </div>
          </div>

          {/* Team Selector */}
          <div className="bg-[var(--color-background)]/50 px-6 md:px-10 py-4 border-t border-[var(--color-border)]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                {testimonials.map((member, index) => (
                  <div
                    key={member.id}
                    onClick={() => setSelectedIndex(index)}
                    className={`group cursor-pointer transition-all duration-300 ${selectedIndex === index ? 'scale-110' : 'opacity-60 hover:opacity-100'}`}
                  >
                    <div className="relative w-10 h-10 md:w-12 md:h-12">
                      {member.photo ? (
                        <Image
                          src={member.photo}
                          alt={member.name}
                          fill
                          className={`rounded-full object-cover border-2 shadow-md transition-all ${selectedIndex === index ? 'border-[var(--color-primary)]' : 'border-[var(--color-border)] group-hover:border-[var(--color-primary)]'}`}
                        />
                      ) : (
                        <div className={`w-full h-full rounded-full bg-gray-200 border-2 shadow-md transition-all ${selectedIndex === index ? 'border-[var(--color-primary)]' : 'border-[var(--color-border)] group-hover:border-[var(--color-primary)]'}`} />
                      )}
                      {selectedIndex === index && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[var(--color-primary)] rounded-full border-2 border-[var(--color-background)]" />
                      )}
                      {index === 0 && selectedIndex !== index && (
                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[var(--color-border)] rounded-full border border-[var(--color-background)]" />
                      )}
                      {index === 2 && selectedIndex !== index && (
                        <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-[var(--color-border)] rounded-full border border-[var(--color-background)]" />
                      )}
                    </div>
                    <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity mt-1 text-center">
                      <p className="text-[10px] md:text-xs font-semibold text-[var(--color-header-text)] whitespace-nowrap">{member.name}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => router.push("/testimonials")}
                className="flex items-center gap-1.5 text-xs md:text-sm text-[var(--color-primary)] font-bold hover:gap-2 transition-all duration-300 group whitespace-nowrap"
              >
                <span>View All Testimonials</span>
                <svg 
                  className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConstructionTestimonial;
