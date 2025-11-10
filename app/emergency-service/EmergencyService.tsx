// app/emergency-service/page.tsx
"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  Clock,
  MessageCircle,
  Mail as MailIcon,
  Phone,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface EmergencyService {
  _id: string;
  title: string;
  slug: string;
  image: string;
  calloutPrice: number;
  price: number;
  responseTime: string;
  whatWeHelpWith: string[];
}

interface Settings {
  emergencyEmail?: string;
  emergencyPhone?: string;
}

export default function EmergencyServicePage() {
  const [services, setServices] = useState<EmergencyService[]>([]);
  const [settings, setSettings] = useState<Settings>({
    emergencyEmail: "",
    emergencyPhone: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, settingsRes] = await Promise.all([
          fetch("/api/emergency-services"),
          fetch("/api/emergency-services/settings"),
        ]);

        if (!servicesRes.ok) throw new Error("Failed to fetch services");
        if (!settingsRes.ok) throw new Error("Failed to fetch settings");

        const servicesData = await servicesRes.json();
        const settingsData = await settingsRes.json();

        setServices(servicesData);
        setSettings({
          emergencyEmail: settingsData.emergencyEmail || "",
          emergencyPhone: settingsData.emergencyPhone || "",
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto min-h-[400px]">
        <div className="px-6 md:px-12 py-12 text-center">
          <p className="text-gray-600">Loading services...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-7xl mx-auto">
        <div className="px-6 md:px-12 py-12 text-center text-red-600">
          <p>Error: {error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto">
      {/* Hero Section - Asymmetric Layout */}
      <section className="px-6 md:px-12 py-8 bg-background">
        <div className="flex flex-col-reverse lg:flex-row gap-6">
          <div className="lg:w-2/5">
            <div className="relative h-64 md:h-72 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/emergency-services/img_01 (4).jpg"
                alt="Emergency Response"
                width={1024}
                height={1024}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>
          </div>

          <div className="lg:w-3/5 flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-xs font-bold text-primary uppercase">
                  Emergency Response Active
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-header-text">
                Emergency Services
              </h1>
              <p className="text-sm text-paragraph leading-relaxed max-w-2xl">
                Professional emergency response when you need it most. Our team
                of certified technicians is ready to handle any urgent situation
                affecting your property.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a
                href={`https://wa.me/${settings.emergencyPhone?.replace(
                  /\D/g,
                  ""
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 bg-green-500 text-primary-foreground rounded-md transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={18} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-xs font-semibold opacity-90">
                    Chat on WhatsApp
                  </p>
                  <p className="text-sm font-bold truncate">
                    {settings.emergencyPhone}
                  </p>
                </div>
              </a>

              <a
                href={`mailto:${settings.emergencyEmail}`}
                className="flex items-center gap-3 px-4 py-3 bg-primary text-primary-foreground rounded-md transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <MailIcon size={18} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-xs font-semibold opacity-90">
                    Send us an Email
                  </p>
                  <p className="text-sm font-bold truncate">
                    {settings.emergencyEmail}
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Horizontal Card Layout */}
      <section className="px-6 md:px-12 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-header-text">
              Why Choose Our Emergency Services?
            </h2>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-4 p-4 bg-background rounded-lg border border-gray-200 hover:border-primary/30 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock size={24} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-header-text mb-1">
                  Rapid Response
                </h3>
                <p className="text-sm text-paragraph">
                  Our teams reach you within 1-2 hours of your emergency call.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-background rounded-lg border border-gray-200 hover:border-primary/30 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <AlertCircle size={24} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-header-text mb-1">
                  Certified Professionals
                </h3>
                <p className="text-sm text-paragraph">
                  Fully licensed, insured, and trained in emergency response
                  protocols.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-background rounded-lg border border-gray-200 hover:border-primary/30 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MessageCircle size={24} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-header-text mb-1">
                  Always Available
                </h3>
                <p className="text-sm text-paragraph">
                  24/7 emergency support with no holidays or off-hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid - Modern Card Design */}
      <section className="px-6 md:px-12 py-8 bg-background">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-header-text mb-2">
            Services We Provide
          </h2>
          <p className="text-sm text-paragraph">
            Comprehensive emergency solutions for your property
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {services.map((service) => (
            <div
              key={service._id}
              className="group bg-background border border-gray-300 rounded-lg overflow-hidden hover:shadow-xl transition-all"
            >
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  width={300}
                  height={200}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-3 py-1 bg-background/95 rounded-full border border-gray-200">
                  <p className="text-xs font-bold text-primary">
                    ${service.price}
                  </p>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="text-base font-bold text-paragraph min-h-[48px] line-clamp-2">
                  {service.title}
                </h3>

                <div className="pt-2 border-t border-gray-200">
                  <Link href={`/emergency-service/${service.slug}`}>
                    <div className="w-full px-4 py-2.5 text-sm font-bold text-white rounded bg-primary hover:bg-primary/90 text-center transition-colors">
                      Explore More
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section - Split Layout */}
      <section className="px-6 md:px-12 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-background rounded-lg border-2 border-primary/20 p-6 md:p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/2 space-y-3">
                <h2 className="text-2xl md:text-3xl font-bold text-header-text">
                  Contact Us for Emergency Assistance
                </h2>
                <p className="text-sm text-paragraph leading-relaxed">
                  When disaster strikes, don't wait. Our team is ready to
                  respond immediately to your emergency.
                </p>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-sm text-paragraph">
                    <CheckCircle2
                      size={16}
                      className="text-primary flex-shrink-0"
                    />
                    <span>Immediate response guaranteed</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-paragraph">
                    <CheckCircle2
                      size={16}
                      className="text-primary flex-shrink-0"
                    />
                    <span>Licensed & insured professionals</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-paragraph">
                    <CheckCircle2
                      size={16}
                      className="text-primary flex-shrink-0"
                    />
                    <span>Available 24/7 every day of the year</span>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2 space-y-3">
                <a
                  href={`https://wa.me/${settings.emergencyPhone?.replace(
                    /\D/g,
                    ""
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex sm:flex-row flex-col items-center gap-4 p-4 bg-green-500 text-primary-foreground rounded-lg hover:bg-green-600 transition-colors"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle size={22} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-xs text-center font-semibold opacity-90 mb-0.5">
                      Message on WhatsApp
                    </p>
                    <p className="text-base text-center font-bold">
                      {settings.emergencyPhone}
                    </p>
                  </div>
                </a>

                <a
                  href={`mailto:${settings.emergencyEmail}`}
                  className="flex sm:flex-row flex-col items-center gap-4 p-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <MailIcon size={22} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-xs text-center font-semibold opacity-90 mb-0.5">
                      Send us an Email
                    </p>
                    <p className="text-base text-center font-bold truncate">
                      {settings.emergencyEmail}
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
