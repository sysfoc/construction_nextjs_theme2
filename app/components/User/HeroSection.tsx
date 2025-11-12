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
          heading: "We are Providing Industry Roofing Solution",
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent z-[1]"></div>

        {/* Navigation Buttons - Desktop */}
        <button
          onClick={handlePrev}
          disabled={slides.length <= 1}
          className="absolute left-8 top-1/2 z-50 -translate-y-1/2 w-12 h-12 bg-primary/90 backdrop-blur-sm rounded-lg hidden lg:flex items-center justify-center cursor-pointer shadow-xl hover:bg-primary hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowRight className="w-5 h-5 text-primary-foreground rotate-180" />
        </button>

        <button
          onClick={handleNext}
          disabled={slides.length <= 1}
          className="absolute right-8 top-1/2 z-50 -translate-y-1/2 w-12 h-12 bg-primary/90 backdrop-blur-sm rounded-lg hidden lg:flex items-center justify-center cursor-pointer shadow-xl hover:bg-primary hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowRight className="w-5 h-5 text-primary-foreground" />
        </button>

        {/* Main Content */}
        <div className="relative z-10 w-full h-full flex flex-col justify-center items-center px-6 lg:px-20 pt-20 lg:pt-24">
          <div className="max-w-3xl w-full space-y-4 text-center">
            {/* Welcome Badge */}
            <div className="inline-flex items-center gap-2 bg-primary-foreground/95 backdrop-blur-sm text-primary rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider shadow-lg">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
              <span>Welcome You To Construct</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-hero-heading text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold leading-tight drop-shadow-2xl">
              {currentSlide.heading.split("\n").map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>

            {/* CTA Section */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link href={currentSlide.buttonUrl}>
                <SolidButton text={currentSlide.buttonText} />
              </Link>

              <div className="flex items-center gap-2.5 bg-background/95 backdrop-blur-sm px-4 py-1 rounded-md shadow-xl border border-primary/20">
                <div className="flex flex-col leading-tight">
                  <div className="flex gap-2 items-center ">
                    <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-[9px] text-foreground/70 font-medium uppercase">
                      Call Us Now
                    </span>
                  </div>
                  <p className="text-foreground font-bold text-sm">
                    {settings?.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex justify-center gap-4 mt-10 lg:hidden pb-12 z-[2]">
            <button
              onClick={handlePrev}
              disabled={slides.length <= 1}
              className="w-12 h-12 bg-primary/90 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-xl active:scale-95 transition-all disabled:opacity-50"
            >
              <ArrowRight className="w-5 h-5 text-primary-foreground rotate-180" />
            </button>
            <button
              onClick={handleNext}
              disabled={slides.length <= 1}
              className="w-12 h-12 bg-primary/90 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-xl active:scale-95 transition-all disabled:opacity-50"
            >
              <ArrowRight className="w-5 h-5 text-primary-foreground" />
            </button>
          </div>

          {/* Slide Indicators */}
          {slides.length > 1 && (
            <div className="absolute bottom-12 sm:bottom-24 md:bottom-32 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-primary"
                      : "w-1.5 bg-primary-foreground/50 hover:bg-primary-foreground"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <HeroBanner />
    </>
  );
}
