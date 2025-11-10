"use client";
import { useState } from "react";
import Image from "next/image";
import { Phone } from "lucide-react";

import { useGeneralSettings } from "@/app/context/GeneralSettingsContext";

interface HeroData {
  heading: string;
  image: string;
  paragraph: string;
  subheadings: Array<{ title: string; description: string }>;
  buttonText: string;
  buttonUrl: string;
}

interface AboutHeroSectionProps {
  data: HeroData;
}

export default function AboutHeroSection({ data }: AboutHeroSectionProps) {
  const [activeTab, setActiveTab] = useState(0);
  const { settings } = useGeneralSettings();

  if (!data || !data.heading) {
    return null;
  }

  const currentSubheading = data.subheadings?.[activeTab] || {
    title: "",
    description: "",
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-6 lg:py-8">
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
        
        {/* Image Section */}
        {data.image && (
          <div className="relative order-1">
            <div className="relative aspect-[16/11] rounded-xl overflow-hidden shadow-xl">
              <Image
                src={data.image || "/placeholder.svg"}
                alt="About section"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              
              {/* Experience Badge */}
              <div className="absolute bottom-4 left-4 bg-primary text-primary-foreground rounded-lg px-4 py-3 shadow-lg">
                <div className="flex items-end gap-2">
                  <span className="text-4xl sm:text-5xl font-black leading-none">25</span>
                  <div className="pb-0.5">
                    <div className="text-[10px] font-semibold uppercase tracking-wide opacity-90">Years</div>
                    <div className="text-sm font-bold uppercase">Experience</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-3 -right-3 w-20 h-20 bg-primary/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary/5 rounded-full blur-3xl"></div>
          </div>
        )}

        {/* Content Section */}
        <div className="order-2 space-y-4">
          {/* Header Badge */}
          <div className="inline-flex items-center gap-2 bg-header-background dark:bg-header-background px-3 py-1.5 rounded-full border border-primary/20">
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
            <span className="text-primary dark:text-primary text-[11px] sm:text-xs font-semibold uppercase tracking-wide">
              About Our Company
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold leading-tight text-(--page-heading) dark:text-white">
            {data.heading}
          </h1>

          {/* Paragraph */}
          <p className="text-paragraph dark:text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed">
            {data.paragraph}
          </p>

          {/* Interactive Tabs */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-1.5">
              {data.subheadings?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-3 py-1.5 text-[11px] sm:text-xs font-semibold rounded-lg transition-all duration-300 ${
                    activeTab === index
                      ? "bg-primary text-primary-foreground shadow-md scale-105"
                      : "bg-header-background dark:bg-header-background text-paragraph dark:text-paragraph hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {data.subheadings[index]?.title}
                </button>
              ))}
            </div>

            {/* Tab Content Card */}
            {currentSubheading && (
              <div className="bg-gradient-to-br from-header-background to-header-background/50 dark:from-header-background dark:to-header-background/50 rounded-lg p-3.5 border-l-4 border-primary shadow-md">
                <p className="text-paragraph dark:text-paragraph text-xs sm:text-sm leading-relaxed">
                  {currentSubheading.description}
                </p>
              </div>
            )}
          </div>

          {/* Action Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-1">
            <a
              href={data.buttonUrl || "#"}
              className="group bg-primary text-primary-foreground px-6 py-2.5 text-xs font-bold uppercase tracking-wide rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto text-center"
            >
              {data.buttonText || "Learn More"}
            </a>
            
            <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-header-background/50 dark:bg-header-background/50">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-all">
                  <Phone className="w-4 h-4 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] text-paragraph dark:text-paragraph font-medium">Want to Discuss:</span>
                <span className="text-base font-bold text-(--page-heading) dark:text-hero-heading">
                  {settings?.phone}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}