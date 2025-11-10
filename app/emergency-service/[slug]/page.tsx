// app/emergency-service/[slug]/page.tsx
"use client";

import { useEffect, useState } from "react";
import {
  MessageCircle,
  Mail as MailIcon,
  CheckCircle2,
  Clock,
  DollarSign,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

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

export default function EmergencyServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [service, setService] = useState<EmergencyService | null>(null);
  const [settings, setSettings] = useState<Settings>({
    emergencyEmail: "",
    emergencyPhone: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        const [servicesRes, settingsRes] = await Promise.all([
          fetch("/api/emergency-services"),
          fetch("/api/emergency-services/settings"),
        ]);

        if (!servicesRes.ok) throw new Error("Failed to fetch services");
        if (!settingsRes.ok) throw new Error("Failed to fetch settings");

        const allServices = await servicesRes.json();
        const settingsData = await settingsRes.json();

        const foundService = allServices.find(
          (s: EmergencyService) => s.slug === slug
        );

        if (!foundService) {
          router.push("/emergency-service");
          return;
        }

        setService(foundService);
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
  }, [slug, router]);

  if (loading) {
    return (
      <main className="max-w-6xl mx-auto min-h-[400px]">
        <div className="px-6 sm:px-12 py-12 text-center">
          <p className="text-gray-600">Loading service details...</p>
        </div>
      </main>
    );
  }

  if (error || !service) {
    return (
      <main className="max-w-6xl mx-auto">
        <div className="px-6 sm:px-12 py-12 text-center text-red-600">
          <p>Error: {error || "Service not found"}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto">
      {/* Hero Section - Reversed Layout */}
      <section className="px-6 sm:px-12 py-8 bg-background">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/5">
            <div className="relative h-64 lg:h-80 min-h-[320px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src={service.image || "/placeholder.svg"}
                alt={service.title}
                width={600}
                height={700}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50"></div>
            </div>
          </div>

          <div className="lg:w-3/5 space-y-4">
            <div>
              <div className="inline-block px-3 py-1 bg-primary/10 rounded-full mb-2">
                <span className="text-xs font-bold text-primary uppercase">
                  24/7 Emergency Service
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-header-text mb-2">
                {service.title}
              </h1>
              <p className="text-sm text-paragraph leading-relaxed">
                Professional {service.title.toLowerCase()} emergency response
                available 24/7. Our certified team handles urgent situations
                with expertise and care.
              </p>
            </div>

            <div className="flex sm:flex-row flex-col gap-3">
              <div className="flex-1 p-4 bg-background rounded-lg border-l-4 border-primary">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign size={16} className="text-primary" />
                  <p className="text-xs font-bold text-primary uppercase">
                    Callout Fee
                  </p>
                </div>
                <p className="text-2xl font-bold text-header-text">
                  ${service.calloutPrice}
                </p>
              </div>
              <div className="flex-1 p-4 bg-background rounded-lg border-l-4 border-primary">
                <div className="flex items-center gap-2 mb-1">
                  <Clock size={16} className="text-primary" />
                  <p className="text-xs font-bold text-primary uppercase">
                    Response Time
                  </p>
                </div>
                <p className="text-2xl font-bold text-header-text">
                  {service.responseTime}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={`https://wa.me/${settings.emergencyPhone?.replace(
                  /\D/g,
                  ""
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center gap-3 p-4 bg-green-500 text-primary-foreground rounded-lg hover:bg-green-600 transition-colors"
              >
                <div className="w-11 h-11 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={20} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-xs font-semibold opacity-90">
                    Quick Response via WhatsApp
                  </p>
                  <p className="text-sm font-bold truncate">
                    {settings.emergencyPhone}
                  </p>
                </div>
              </a>
              <a
                href={`mailto:${settings.emergencyEmail}`}
                className="flex-1 flex items-center gap-3 p-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <div className="w-11 h-11 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <MailIcon size={20} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-xs font-semibold opacity-90">
                    Email for Support
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

      {/* How It Works - Horizontal Timeline */}
      <section className="px-6 sm:px-12 py-8 bg-background">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold mb-5 text-header-text">
            How It Works
          </h2>
          <div className="space-y-4">
            {[
              {
                step: "1",
                title: "Call Us Immediately",
                description:
                  "Contact our emergency team as soon as you discover the issue. Our dispatch center is available 24/7.",
              },
              {
                step: "2",
                title: "Expert Assessment",
                description:
                  "Our certified technician will assess the situation and provide immediate recommendations.",
              },
              {
                step: "3",
                title: "Professional Resolution",
                description:
                  "We resolve the emergency efficiently with quality materials and guaranteed workmanship.",
              },
            ].map((item, index) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-white font-bold text-lg flex items-center justify-center flex-shrink-0">
                    {item.step}
                  </div>
                  {index < 2 && (
                    <div className="w-0.5 h-full bg-primary/30 my-2"></div>
                  )}
                </div>
                <div className="flex-1 pb-6">
                  <h3 className="text-base font-bold mb-1 text-header-text">
                    {item.title}
                  </h3>
                  <p className="text-sm text-paragraph leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Help With - Two Column Layout */}
      <section className="px-6 sm:px-12 py-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold mb-5 text-header-text">
            In What {service.title} Emergencies We Can Help You With
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-2">
            {service.whatWeHelpWith.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 bg-background rounded-md"
              >
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 size={14} className="text-primary" />
                </div>
                <p className="text-sm text-paragraph flex-1">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA - Side by Side Layout */}
      <section className="px-6 sm:px-12 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-background rounded-lg border-2 border-primary/20 p-6">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-1/2 text-center md:text-left">
                <h2 className="text-xl sm:text-2xl font-bold mb-2 text-header-text">
                  Need Immediate Assistance?
                </h2>
                <p className="text-sm text-paragraph">
                  Our emergency response team is ready to help you 24/7
                </p>
              </div>
              <div className="md:w-1/2 flex flex-col sm:flex-row gap-3 w-full">
                <a
                  href={`https://wa.me/${settings.emergencyPhone?.replace(
                    /\D/g,
                    ""
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-6 py-3 text-sm font-bold text-primary-foreground rounded-lg bg-green-600 hover:bg-green-700 inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle size={18} />
                  WhatsApp Now
                </a>
                <a
                  href={`mailto:${settings.emergencyEmail}`}
                  className="flex-1 px-6 py-3 text-sm font-bold text-primary-foreground rounded-lg bg-primary hover:bg-primary/90 inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <MailIcon size={18} />
                  Send Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
