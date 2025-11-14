// app/emergency-service/[slug]/page.tsx
"use client";

import { useEffect, useState } from "react";
import {
  MessageCircle,
  Mail as MailIcon,
  CheckCircle2,
  Clock,
  DollarSign,
  Phone,
  ArrowRight,
  Shield,
  Zap,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/app/components/General/Loader";

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
      <div className="flex items-start mt-20 justify-center min-h-screen">
        <Loader />
      </div>
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
    <main className="bg-background min-h-screen">
      {/* Compact Hero with Image Background */}
      <section className="relative h-72 overflow-hidden">
        <Image
          src={service.image || "/placeholder.svg"}
          alt={service.title}
          width={1920}
          height={400}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40"></div>

        <div className="absolute bottom-0 left-0 right-0 pb-6">
          <div className="max-w-6xl mx-auto px-6 sm:px-12">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                24/7 Emergency Service
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">
              {service.title}
            </h1>
            <p className="text-sm text-white/90 max-w-3xl">
              Professional {service.title.toLowerCase()} emergency response
              available 24/7. Our certified team handles urgent situations with
              expertise and care.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar - Horizontal Cards */}
      <section className="bg-header-background border-y border-border">
        <div className="max-w-6xl mx-auto px-6 sm:px-12 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold text-paragraph/70 uppercase mb-0.5">
                  Callout Fee
                </p>
                <p className="text-xl font-black text-header-text">
                  ${service.calloutPrice}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold text-paragraph/70 uppercase mb-0.5">
                  Response Time
                </p>
                <p className="text-xl font-black text-header-text">
                  {service.responseTime}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold text-paragraph/70 uppercase mb-0.5">
                  Service Price
                </p>
                <p className="text-xl font-black text-header-text">
                  ${service.price}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-xl mx-auto px-3 sm:px-6 mt-5 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <a
            href={`https://wa.me/${settings.emergencyPhone?.replace(
              /\D/g,
              ""
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-green-500 rounded-md p-2.5 shadow hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-[11px] text-white/90 font-semibold leading-tight">
                    Quick Response via WhatsApp
                  </p>
                  <p className="text-sm text-white font-bold leading-tight">
                    {settings.emergencyPhone}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
            </div>
          </a>

          <a
            href={`mailto:${settings.emergencyEmail}`}
            className="group bg-primary rounded-md p-2.5 shadow hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <MailIcon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-[11px] text-white/90 font-semibold leading-tight">
                    Email for Support
                  </p>
                  <p className="text-sm text-white font-bold truncate leading-tight">
                    {settings.emergencyEmail}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
            </div>
          </a>
        </div>
      </section>

      {/* How It Works - Numbered Steps in Grid */}
      <section className="max-w-6xl mx-auto px-6 sm:px-12 py-12">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full mb-3">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              Emergency Process
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-header-text">
            How It Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              title: "Call Us Immediately",
              description:
                "Contact our emergency team as soon as you discover the issue. Our dispatch center is available 24/7.",
              icon: Phone,
            },
            {
              step: "02",
              title: "Expert Assessment",
              description:
                "Our certified technician will assess the situation and provide immediate recommendations.",
              icon: AlertCircle,
            },
            {
              step: "03",
              title: "Professional Resolution",
              description:
                "We resolve the emergency efficiently with quality materials and guaranteed workmanship.",
              icon: Shield,
            },
          ].map((item) => (
            <div
              key={item.step}
              className="relative bg-background border-2 border-border rounded-xl p-6 hover:border-primary hover:shadow-lg transition-all group"
            >
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary text-white font-black text-lg flex items-center justify-center rounded-full shadow-lg">
                {item.step}
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-header-text mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-paragraph leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* What We Help With - Compact Grid with Checkmarks */}
      <section className="bg-header-background py-12">
        <div className="max-w-6xl mx-auto px-6 sm:px-12">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full mb-3">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                We Handle
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-header-text mb-2">
              {service.title} Emergencies We Can Help With
            </h2>
            <p className="text-sm text-paragraph">
              Comprehensive solutions for all {service.title.toLowerCase()}{" "}
              emergency situations
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {service.whatWeHelpWith.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all group"
              >
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:scale-110 transition-all">
                  <CheckCircle2 className="w-4 h-4 text-primary group-hover:text-white" />
                </div>
                <p className="text-sm text-paragraph font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner - Full Width Accent */}
      <section className="bg-primary py-12">
        <div className="max-w-6xl mx-auto px-6 sm:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
                Need Immediate Assistance?
              </h2>
              <p className="text-base text-white/90 mb-2">
                Our emergency response team is ready to help you 24/7
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-4">
                <div className="flex items-center gap-2 text-white/90 text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Certified Professionals</span>
                </div>
                <div className="flex items-center gap-2 text-white/90 text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Fast Response</span>
                </div>
                <div className="flex items-center gap-2 text-white/90 text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Guaranteed Work</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`https://wa.me/${settings.emergencyPhone?.replace(
                  /\D/g,
                  ""
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-3 justify-center transition-all hover:scale-105 shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                <div className="text-left">
                  <p className="text-xs opacity-90">Chat on</p>
                  <p className="text-sm">WhatsApp Now</p>
                </div>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={`mailto:${settings.emergencyEmail}`}
                className="group bg-white hover:bg-gray-100 text-primary px-4 py-2 rounded-lg font-bold flex items-center gap-3 justify-center transition-all hover:scale-105 shadow-lg"
              >
                <MailIcon className="w-5 h-5" />
                <div className="text-left">
                  <p className="text-xs opacity-70">Send us</p>
                  <p className="text-sm">Email</p>
                </div>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
