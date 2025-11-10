"use client";
import type React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { isPageVisible } from "@/lib/api/pageVisibility";
import { useRouter } from "next/navigation";

interface Testimonial {
  id: string;
  name: string;
  designation: string;
  company: string;
  location: string;
  photo: string | null;
  rating: number;
  comment: string;
  date: string;
  stars: number;
}

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({
  testimonial,
}) => {
  return (
    <div className="bg-[var(--background)] rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="p-5">
        <div className="flex items-start gap-4 mb-4">
          <div className="relative w-20 h-20 flex-shrink-0 rounded-full overflow-hidden bg-gradient-to-br from-[var(--primary)]/10 to-[var(--primary)]/20 p-1">
            <div className="w-full h-full rounded-full overflow-hidden bg-[var(--background)] flex items-center justify-center">
              {testimonial.photo ? (
                <Image
                  src={testimonial.photo || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={80}
                  height={80}
                  className="object-contain w-full h-full"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-[var(--foreground)] text-lg mb-0.5">
              {testimonial.name}
            </h3>
            <p className="text-sm text-[var(--paragraph-color)] mb-1">
              {testimonial.designation}
            </p>
            <div className="flex items-center gap-1.5 mb-2">
              <svg
                className="w-4 h-4 text-[var(--primary)]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-semibold text-[var(--foreground)] text-sm">
                {testimonial.company}
              </span>
            </div>
            <div className="flex gap-0.5">
              {[...Array(testimonial.stars)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 fill-[var(--primary)]"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
          </div>
        </div>

        <div className="relative pl-3 border-l-4 border-[var(--primary)] mb-4">
          <p className="text-[var(--paragraph-color)] text-sm leading-relaxed">
            {testimonial.comment}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center gap-1 text-xs text-[var(--paragraph-color)]">
            <MapPin className="w-3 h-3 text-[var(--primary)]" strokeWidth={2} />
            {testimonial.location}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--paragraph-color)]">
              {testimonial.date}
            </span>
            <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-1 rounded-full">
              ✓ Verified
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialsClient: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchTestimonials();
    checkVisibility();
  }, [router]);

  const checkVisibility = async () => {
    const visible = await isPageVisible("testimonials");
    setIsVisible(visible);
    if (!visible) {
      router.push("/not-found");
    }
  };

  const fetchTestimonials = async () => {
    try {
      const response = await fetch("/api/testimonials");
      const data = await response.json();
      setTestimonials(data.testimonials || []);
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div className="bg-[var(--background)] py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-[var(--page-heading)] mb-2">
              Trusted by Industry Leaders
            </h2>
            <p className="text-[var(--paragraph-color)] text-base max-w-2xl mx-auto">
              Don&apos;t just take our word for it. Here&apos;s what our clients
              have to say about their experience working with us.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-[var(--paragraph-color)]">
                Loading testimonials...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                />
              ))}
            </div>
          )}

          <div className="relative bg-[var(--primary)] rounded-2xl p-8 text-center shadow-xl overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-[var(--primary-foreground)] text-2xl font-bold mb-2">
                Ready to Join Our Success Stories?
              </h3>
              <p className="text-base text-[var(--primary-foreground)] mb-5">
                Over 500+ satisfied clients worldwide trust us with their
                business
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/quote">
                  <button className="bg-[var(--primary-foreground)] text-[var(--primary)] px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[var(--background)] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                    Get a Quote Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialsClient;
