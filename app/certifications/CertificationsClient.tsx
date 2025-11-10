"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { isPageVisible } from "@/lib/api/pageVisibility";
import { useRouter } from "next/navigation";
import { Award, Shield } from "lucide-react";

interface Certification {
  _id: string;
  title: string;
  description: string;
  image: string | null;
  order: number;
}

export default function CertificationsClient() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkVisibility = async () => {
      const visible = await isPageVisible("certifications");
      setIsVisible(visible);
      if (!visible) {
        router.push("/not-found");
      }
    };
    checkVisibility();
  }, [router]);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await fetch("/api/certifications");
        const data = await response.json();
        setCertifications(data);
      } catch (error) {
        console.error("Error fetching certifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, []);

  if (!isVisible) {
    return null;
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background dark:bg-gray-900 px-6 py-12">
        <section className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Loading certifications...</p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background dark:bg-gray-900 px-6 py-12">
      <section className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-primary text-sm font-semibold uppercase tracking-wide">Quality Assurance</span>
          </div>
          <h1 className="text-4xl font-bold text-primary uppercase tracking-tight mb-3">
            Certifications & Licenses
          </h1>
          <p className="text-paragraph dark:text-gray-300 text-sm max-w-3xl">
            Our certifications reflect our dedication to safety, quality, and
            sustainability in every construction project.
          </p>
        </div>

        {/* Certifications Grid */}
        {certifications.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">No certifications available at this moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <div
                key={cert._id}
                className="group bg-background dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:border-primary transition-all duration-300"
              >
                {/* Image Section */}
                <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
                  {cert.image ? (
                    <Image
                      src={cert.image || "/placeholder.svg"}
                      alt={cert.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Award className="w-12 h-12 text-gray-300 dark:text-gray-600" />
                    </div>
                  )}
                  
                  {/* Badge Overlay */}
                  <div className="absolute top-3 right-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 border-t-4 border-primary">
                  <h3 className="text-lg font-bold text-foreground dark:text-white mb-2 line-clamp-2">
                    {cert.title}
                  </h3>
                  <p className="text-paragraph dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {cert.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}