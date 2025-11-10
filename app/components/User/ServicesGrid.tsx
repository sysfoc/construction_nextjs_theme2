"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import SlantedButton from "../General/buttons/SlantedButton";
import Link from "next/link";

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
      <div className="py-10 dark:bg-gray-900">
        <div className="container mx-auto px-5 sm:px-16 flex items-center justify-center min-h-80">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Loading services...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 dark:bg-gray-900">
      <div className="container mx-auto px-5 sm:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-background relative overflow-hidden group hover:shadow-lg transition-shadow duration-300"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--color-primary)]"></div>

              <div className="p-4">
                <div className="mb-4">
                  <div className="w-14 h-14 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                    <Image
                      src={service.icon || "/placeholder.svg"}
                      alt={service.title || "Service"}
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <h3 className="text-paragraph font-bold text-lg mb-1">
                    {service.title || "Service"}
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-0.5 bg-[var(--color-primary)]"></div>
                    <h4 className="text-paragraph font-semibold text-[10px] uppercase tracking-wide">
                      {service.subtitle || "Subtitle"}
                    </h4>
                  </div>
                </div>

                <p className="text-paragraph text-sm leading-snug">
                  {service.description || "No description available"}
                </p>
              </div>

              <div className="absolute bottom-0 right-0">
                <div className="w-14 h-14 bg-[var(--color-primary)]/20 transform rotate-45 translate-x-6 translate-y-6"></div>
              </div>
            </div>
          ))}

          {/* Call to Action */}
          <div className="bg-background relative overflow-hidden flex flex-col items-center justify-center p-6 group hover:shadow-lg transition-shadow duration-300">
            <div className="relative z-10 text-center">
              <h3 className="text-paragraph font-bold text-lg mb-1">
                Ready to Start?
              </h3>
              <p className="text-paragraph text-sm mb-4 opacity-80">
                Let's bring your vision to life
              </p>
              {button && (
                <Link href={button.buttonUrl || "#"}>
                  <SlantedButton text={button.buttonText || "GET STARTED"} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
