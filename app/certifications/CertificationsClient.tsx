"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { isPageVisible } from "@/lib/api/pageVisibility";
import { useRouter } from "next/navigation";
import { Award, Shield, CheckCircle2 } from "lucide-react";
import Loader from "../components/General/Loader";

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
      <div className="flex items-start mt-20 justify-center min-h-screen">
        <Loader/>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 sm:px-6 py-8">
      <section className="max-w-4xl mx-auto">
        {/* Compact Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full mb-2">
            <Shield className="w-3.5 h-3.5 text-primary" />
            <span className="text-primary text-[10px] font-bold uppercase tracking-wide">
              Quality Standards
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-1">
            Certifications & Licenses
          </h1>
          <p className="text-xs sm:text-sm text-paragraph max-w-2xl">
            Verified credentials demonstrating our commitment to excellence and compliance
          </p>
        </div>

        {/* Stats Bar */}
        {certifications.length > 0 && (
          <div className="bg-header-background border-2 border-border rounded-xl p-3 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{certifications.length}</p>
                <p className="text-[10px] text-paragraph uppercase tracking-wide">Active Certifications</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-paragraph">
              <Award className="w-4 h-4 text-primary" />
              <span>Verified & Compliant</span>
            </div>
          </div>
        )}

        {/* Certifications - Horizontal Cards */}
        {certifications.length === 0 ? (
          <div className="text-center py-16 bg-header-background rounded-2xl border-2 border-dashed border-border">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="w-8 h-8 text-primary" />
            </div>
            <p className="text-paragraph text-sm font-medium">No certifications available</p>
          </div>
        ) : (
          <div className="space-y-3">
            {certifications.map((cert, index) => (
              <div
                key={cert._id}
                className="group bg-background border-2 border-border hover:border-primary rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex flex-col sm:flex-row items-stretch">
                  {/* Left - Compact Image */}
                  <div className="relative sm:w-32 h-32 sm:h-auto flex-shrink-0 bg-gradient-to-br from-primary/5 to-primary/10">
                    {cert.image ? (
                      <Image
                        src={cert.image || "/placeholder.svg"}
                        alt={cert.title}
                        fill
                        sizes="128px"
                        className="object-contain md:object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Award className="w-10 h-10 text-primary/40" />
                      </div>
                    )}
                    
                    {/* Order Badge */}
                    <div className="absolute top-2 left-2">
                      <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center shadow-lg">
                        <span className="text-[10px] font-bold text-primary-foreground">
                          #{index + 1}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right - Content */}
                  <div className="flex-1 p-4 flex flex-col justify-center min-w-0">
                    <div className="flex items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                          {cert.title}
                        </h3>
                        <p className="text-xs text-paragraph leading-relaxed line-clamp-2">
                          {cert.description}
                        </p>
                      </div>
                      
                      {/* Verified Badge */}
                      <div className="flex-shrink-0">
                        <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 rounded-md">
                          <CheckCircle2 className="w-3 h-3 text-primary" />
                          <span className="text-[9px] font-bold text-primary uppercase hidden sm:inline">
                            Verified
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}