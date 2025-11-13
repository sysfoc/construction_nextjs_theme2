"use client";

import { useEffect, useState } from "react";
import { isPageVisible } from "@/lib/api/pageVisibility";
import AboutHeroSection from "@/app/components/User/about/AboutHeroSection";
import WhatWeDoSection from "@/app/components/User/about/WhatWeDoSection";
import ServicesAndTeamSection from "@/app/components/User/about/ServicesAndTeamSection";
import Loader from "../components/General/Loader";

export default function AboutPage() {
  const [aboutData, setAboutData] = useState<any>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [visible, aboutResponse] = await Promise.all([
          isPageVisible("about"),
          fetch(`/api/about`),
        ]);

        setIsVisible(visible);

        if (aboutResponse.ok) {
          const data = await aboutResponse.json();
          setAboutData(data);
        } else {
          console.error("Failed to fetch about data");
        }
      } catch (error) {
        console.error("Error loading about page:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-start mt-20 justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (!isVisible) {
    return null;
  }

  if (!aboutData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-gray-500">Unable to load about page content</p>
      </div>
    );
  }

  return (
    <div className="bg-background dark:bg-background">
      <AboutHeroSection data={aboutData.hero} />
      <WhatWeDoSection data={aboutData.whatWeDo} />
      <ServicesAndTeamSection data={aboutData.services} />
    </div>
  );
}
