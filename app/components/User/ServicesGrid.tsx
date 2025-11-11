"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import SlantedButton from "../General/buttons/SlantedButton";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Service {
  id: string;
  type: "service" | "button";
  icon?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
}

export default function ServicesGrid() {
  const [services, setServices] = useState<Service[]>([]);
  const [button, setButton] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/services");
      const data = await res.json();
      const allServices = data.services || [];
      const buttonService = allServices.find(
        (s: Service) => s.type === "button"
      );
      const regularServices = allServices.filter(
        (s: Service) => s.type === "service"
      );
      setServices(regularServices);
      setButton(buttonService || null);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-7 min-h-[450px]">
        <div className="container mx-auto px-5 sm:px-12 flex items-center justify-center min-h-80">
          <p className="text-paragraph text-sm">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-7 min-h-[450px]">
      <div className="container mx-auto px-5 sm:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-background rounded-xl p-5 border border-[var(--color-primary)]/20 hover:border-[var(--color-primary)] hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-[var(--color-primary)]/5 rounded-bl-full"></div>

              {/* Icon and Title Section */}
              <div className="flex items-start gap-3 mb-3 relative z-10">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Image
                    src={service.icon || "/placeholder.svg"}
                    alt={service.title || "Service"}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-paragraph font-bold text-base mb-1 leading-tight">
                    {service.title || "Service"}
                  </h3>
                  <div className="inline-flex items-center gap-1.5 bg-[var(--color-primary)]/10 px-2 py-0.5 rounded">
                    <div className="w-1 h-1 bg-[var(--color-primary)] rounded-full"></div>
                    <h4 className="text-paragraph font-semibold text-[9px] uppercase tracking-wider">
                      {service.subtitle || "Subtitle"}
                    </h4>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-paragraph text-xs leading-relaxed relative z-10">
                {service.description || "No description available"}
              </p>

              {/* Bottom Accent Line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-[var(--color-primary)] group-hover:w-full transition-all duration-500"></div>
            </div>
          ))}

          {/* Call to Action Card */}
          <div className="bg-gradient-to-br from-[var(--color-primary)]/10 via-[var(--color-primary)]/5 to-transparent rounded-xl p-6 border-2 border-dashed border-[var(--color-primary)]/30 hover:border-[var(--color-primary)] hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center text-center relative overflow-hidden group">
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-[var(--color-primary)]/0 group-hover:bg-[var(--color-primary)]/5 transition-all duration-300"></div>

            {/* Content */}
            <div className="relative z-10 space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                <svg
                  className="w-7 h-7 text-[var(--color-primary)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>

              <div>
                <h3 className="text-paragraph font-bold text-base mb-1">
                  Ready to Start?
                </h3>
                <p className="text-paragraph text-xs mb-4 opacity-70">
                  Let's bring your vision to life
                </p>
              </div>

              {button && (
                <SlantedButton
                  text={button.buttonText}
                  onClick={() => router.push(button.buttonUrl || "#")}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
