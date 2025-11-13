"use client";
import { useState, useEffect } from "react";
import HeroSectionForm from "@/app/admin/components/about/HeroSectionForm";
import WhatWeDoForm from "@/app/admin/components/about/WhatWeDoForm";
import ServicesForm from "@/app/admin/components/about/ServicesForm";
import Loader from "@/app/components/General/Loader";

interface AboutPageData {
  _id?: string;
  hero: {
    heading: string;
    image: string;
    paragraph: string;
    subheadings: Array<{ title: string; description: string }>;
    buttonText: string;
    buttonUrl: string;
  };
  whatWeDo: {
    firstHeading: string;
    firstSteps: string[];
    secondHeading: string;
    secondSteps: string[];
  };
  services: {
    services: Array<{
      image: string;
      title: string;
      description: string;
      buttonText: string;
      buttonUrl: string;
    }>;
  };
}

export default function AboutManagementPage() {
  const [data, setData] = useState<AboutPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [activeSection, setActiveSection] = useState<
    "hero" | "whatWeDo" | "services"
  >("hero");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/about");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching about page:", error);
      setMessage({ type: "error", text: "Failed to fetch data" });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (updatedData: AboutPageData) => {
    try {
      const response = await fetch("/api/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error("Failed to save");

      const result = await response.json();
      setData(result);
      setMessage({ type: "success", text: "Changes saved successfully" });

      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error("Error saving:", error);
      setMessage({ type: "error", text: "Failed to save changes" });
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader/>
      </div>
    );

  if (!data)
    return (
      <div className="p-6 text-center text-red-600">Failed to load data</div>
    );

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[var(--page-heading)] dark:text-white mb-2">
            About Page Management
          </h1>
          <p className="text-paragraph">
            Manage content for all three sections
          </p>
        </div>

        {/* Message Alert */}
        {message && (
          <div
            className={`mb-4 p-3 rounded text-sm ${
              message.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Section Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          <button
            onClick={() => setActiveSection("hero")}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
              activeSection === "hero"
                ? "border-b-2 border-[var(--primary)] text-[var(--primary)]"
                : "text-paragraph"
            }`}
          >
            Hero Section
          </button>
          <button
            onClick={() => setActiveSection("whatWeDo")}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
              activeSection === "whatWeDo"
                ? "border-b-2 border-[var(--primary)] text-[var(--primary)]"
                : "text-paragraph"
            }`}
          >
            What We Do
          </button>
          <button
            onClick={() => setActiveSection("services")}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
              activeSection === "services"
                ? "border-b-2 border-[var(--primary)] text-[var(--primary)]"
                : "text-paragraph"
            }`}
          >
            Services
          </button>
        </div>

        {/* Content Sections */}
        {activeSection === "hero" && (
          <HeroSectionForm data={data} onSave={handleSave} />
        )}
        {activeSection === "whatWeDo" && (
          <WhatWeDoForm data={data} onSave={handleSave} />
        )}
        {activeSection === "services" && (
          <ServicesForm data={data} onSave={handleSave} />
        )}
      </div>
    </main>
  );
}
