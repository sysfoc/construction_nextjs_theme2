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
  Shield,
  Zap,
  Award,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Loader from "../components/General/Loader";

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
      <div className="flex items-start mt-20 justify-center min-h-screen">
        <Loader/>
      </div>
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
    <main className="bg-background min-h-screen">
      {/* Hero - Full Width Banner with Overlapping Contact Cards */}
      <section className="relative h-[450px] overflow-hidden">
        <Image
          src="/emergency-services/img_01 (4).jpg"
          alt="Emergency Response"
          width={1920}
          height={600}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  24/7 Emergency Response Active
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
                Emergency<br/>Services
              </h1>
              
              <p className="text-base text-white/90 leading-relaxed mb-6">
                Professional emergency response when you need it most. Our team
                of certified technicians is ready to handle any urgent situation
                affecting your property.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${settings.emergencyPhone?.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-all hover:shadow-lg"
                >
                  <MessageCircle size={20} />
                  <span>WhatsApp Now</span>
                </a>
                
                <a
                  href={`mailto:${settings.emergencyEmail}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-all hover:shadow-lg"
                >
                  <MailIcon size={20} />
                  <span>Send Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact Strip - Sticky on Scroll */}
      <section className="bg-primary shadow-lg">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Phone size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-white/80 font-semibold">Emergency Hotline</p>
                <p className="text-base text-white font-bold">{settings.emergencyPhone}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MailIcon size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-white/80 font-semibold">Emergency Email</p>
                <p className="text-base text-white font-bold truncate max-w-[200px]">{settings.emergencyEmail}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Icon Grid with Stats */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-3">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                Trusted Emergency Response
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-header-text mb-3">
              Why Choose Us?
            </h2>
            <p className="text-sm text-paragraph max-w-2xl mx-auto">
              When emergencies strike, trust matters. Here's why thousands rely on our services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-background border-2 border-border rounded-xl p-6 hover:border-primary hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Clock size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold text-header-text mb-2">
                Rapid Response
              </h3>
              <p className="text-sm text-paragraph mb-4">
                Our teams reach you within 1-2 hours of your emergency call.
              </p>
              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-paragraph uppercase font-semibold">Avg Response</span>
                  <span className="text-2xl font-black text-primary">1-2hrs</span>
                </div>
              </div>
            </div>

            <div className="bg-background border-2 border-border rounded-xl p-6 hover:border-primary hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Award size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold text-header-text mb-2">
                Certified Professionals
              </h3>
              <p className="text-sm text-paragraph mb-4">
                Fully licensed, insured, and trained in emergency response protocols.
              </p>
              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-paragraph uppercase font-semibold">Certified Team</span>
                  <span className="text-2xl font-black text-primary">100%</span>
                </div>
              </div>
            </div>

            <div className="bg-background border-2 border-border rounded-xl p-6 hover:border-primary hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold text-header-text mb-2">
                Always Available
              </h3>
              <p className="text-sm text-paragraph mb-4">
                24/7 emergency support with no holidays or off-hours.
              </p>
              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-paragraph uppercase font-semibold">Availability</span>
                  <span className="text-2xl font-black text-primary">24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services - Horizontal Card Layout with Image Left */}
      <section className="py-12 px-6 md:px-12 bg-header-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-3">
              <AlertCircle className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                Emergency Solutions
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-header-text mb-3">
              Services We Provide
            </h2>
            <p className="text-sm text-paragraph max-w-2xl mx-auto">
              Comprehensive emergency solutions for every property crisis
            </p>
          </div>

          <div className="space-y-4 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <div
                key={service._id}
                className="group bg-background rounded-xl border-2 border-border hover:border-primary hover:shadow-2xl transition-all overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-64 h-48 md:h-auto relative overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 flex-shrink-0">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
                        <p className="text-xs font-semibold text-paragraph/70 mb-0.5">Starting at</p>
                        <p className="text-xl font-black text-primary">${service.price}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h3 className="text-xl font-bold text-header-text group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full whitespace-nowrap">
                          {service.responseTime}
                        </span>
                      </div>
                      
                      {service.whatWeHelpWith && service.whatWeHelpWith.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {service.whatWeHelpWith.slice(0, 3).map((item, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 text-xs text-paragraph">
                              <CheckCircle2 size={14} className="text-primary flex-shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-sm text-paragraph">
                        <Clock size={16} className="text-primary" />
                        <span className="font-semibold">Callout: ${service.calloutPrice}</span>
                      </div>
                      <Link href={`/emergency-service/${service.slug}`}>
                        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-all group/btn">
                          <span>View Details</span>
                          <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

   {/* CTA Section - Ultra Compact Version */}
<section className="py-8 px-4 md:px-8 bg-primary relative overflow-hidden">
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl"></div>
    <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
  </div>

  <div className="max-w-5xl mx-auto relative z-10">
    <div className="text-center mb-5">
      <h2 className="text-2xl md:text-3xl font-black text-white mb-1.5">
        Need Emergency Assistance?
      </h2>
      <p className="text-sm text-white/90 max-w-2xl mx-auto">
        When disaster strikes, don't wait. Our team is ready to respond immediately to your emergency.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mb-5">
      <div className="flex items-center gap-2 p-2.5 bg-white/10 backdrop-blur-sm rounded-md border border-white/20">
        <CheckCircle2 size={20} className="text-white flex-shrink-0" />
        <span className="text-white font-semibold text-sm">Immediate response guaranteed</span>
      </div>
      <div className="flex items-center gap-2 p-2.5 bg-white/10 backdrop-blur-sm rounded-md border border-white/20">
        <CheckCircle2 size={20} className="text-white flex-shrink-0" />
        <span className="text-white font-semibold text-sm">Licensed & insured professionals</span>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <a
        href={`https://wa.me/${settings.emergencyPhone?.replace(/\D/g, "")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 p-3 bg-green-500 rounded-md hover:bg-green-600 transition-all hover:scale-105 hover:shadow-lg"
      >
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
          <MessageCircle size={20} className="text-white" />
        </div>
        <div className="flex-1">
          <p className="text-xs text-white/90 font-semibold leading-tight">
            Message on WhatsApp
          </p>
          <p className="text-sm text-white font-black leading-tight">
            {settings.emergencyPhone}
          </p>
        </div>
      </a>

      <a
        href={`mailto:${settings.emergencyEmail}`}
        className="flex items-center gap-2.5 p-3 bg-white rounded-md hover:shadow-lg transition-all hover:scale-105"
      >
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
          <MailIcon size={20} className="text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-xs text-paragraph font-semibold leading-tight">
            Send us an Email
          </p>
          <p className="text-sm text-primary font-black truncate leading-tight">
            {settings.emergencyEmail}
          </p>
        </div>
      </a>
    </div>
  </div>
</section>


    </main>
  );
}