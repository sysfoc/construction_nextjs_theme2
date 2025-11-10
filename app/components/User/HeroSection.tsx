// app/components/User/HeroSection.tsx
"use client";
import Image from "next/image";
import { Phone, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import SolidButton from "../General/buttons/SolidButton";
import HeroBanner from "./HeroBanner";
import Link from "next/link";
import { useGeneralSettings } from "@/app/context/GeneralSettingsContext";

interface Slide {
  id: string;
  image: string;
  heading: string;
  buttonText: string;
  buttonUrl: string;
}

export default function HeroSection() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { settings } = useGeneralSettings();

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await fetch("/api/hero-slides");
      const data = await response.json();
      if (response.ok && data.slides.length > 0) {
        setSlides(data.slides);
      }
    } catch (error) {
      console.error("Error fetching slides:", error);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlide =
    slides.length > 0
      ? slides[currentIndex]
      : {
          id: "",
          image: "/Herosection/constructionImage_01.png",
          heading: "We are Providing\nIndustry Roofing\nSolution",
          buttonText: "GET STARTED",
          buttonUrl: "/get-started",
        };

  return (
    <>
      <div className="relative w-full h-screen min-h-[650px] overflow-hidden -mt-20 lg:-mt-24">
        {/* Background Image */}
        <Image
          src={currentSlide.image}
          alt="Construction background"
          fill
          priority
          fetchPriority="high"
          quality={100}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-opacity-40 z-[1]"></div>

        {/* Left Circular Element - desktop only */}
        <button
          onClick={handlePrev}
          disabled={slides.length <= 1}
          className="absolute left-6 top-1/2 z-50 -translate-y-1/2 w-14 h-14 bg-primary rounded-full hidden lg:flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-transform duration-200"
        >
          <ArrowRight className="w-6 h-6 text-primary-foreground rotate-180" />
        </button>

        {/* Right Circular Button - desktop only */}
        <button
          onClick={handleNext}
          disabled={slides.length <= 1}
          className="absolute right-6 top-1/2 z-50 -translate-y-1/2 w-14 h-14 bg-primary rounded-full hidden lg:flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-transform duration-200"
        >
          <ArrowRight className="w-6 h-6 text-primary-foreground" />
        </button>

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center px-6 lg:px-24 pt-20 lg:pt-24">
          <div className="max-w-2xl">
            <p className="bg-white w-fit text-blue-500 rounded-full px-3 py-1 text-xs sm:text-sm font-semibold mb-4 uppercase tracking-wide items-center gap-2 hidden lg:flex">
              <span className="w-2 h-2 bg-blue-500 rounded-full inline-block"></span>
              WELCOME YOU TO CONSTRUCT
            </p>

            <h1 className="text-hero-heading text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-8">
              {currentSlide.heading.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i < currentSlide.heading.split("\n").length - 1 && <br />}
                </span>
              ))}
            </h1>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 lg:gap-6">
              <Link href={currentSlide.buttonUrl}>
                <SolidButton text={currentSlide.buttonText} />
              </Link>

              <div className="flex items-center gap-3 bg-background px-5 py-3 lg:py-2 rounded-full shadow-lg">
                <div className="flex gap-2 justify-center items-center">
                  <Phone className="w-5 h-5 text-primary" />
                  <p className="text-foreground font-semibold">{settings?.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Decorative Arrows */}
          <div className="flex justify-center gap-6 mt-8 lg:hidden pb-16 z-[2]">
            <button
              onClick={handlePrev}
              disabled={slides.length <= 1}
              className="w-14 h-14 bg-primary rounded-full flex items-center justify-center cursor-pointer shadow-lg"
            >
              <ArrowRight className="w-6 h-6 text-primary-foreground rotate-180" />
            </button>
            <button
              onClick={handleNext}
              disabled={slides.length <= 1}
              className="w-14 h-14 bg-primary rounded-full flex items-center justify-center cursor-pointer shadow-lg"
            >
              <ArrowRight className="w-6 h-6 text-primary-foreground" />
            </button>
          </div>
        </div>
      </div>
      <HeroBanner />
    </>
  );
}
