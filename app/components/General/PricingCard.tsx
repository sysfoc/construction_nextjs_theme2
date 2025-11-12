"use client";
import { ReactNode } from "react";
import Image from "next/image";
import SlantedButton from "./buttons/SlantedButton";

interface PricingCardProps {
  topLabel: string;
  price: string | number;
  billingInfo: ReactNode;
  description: string;
  imageSrc: string;
}

export default function PricingCard({
  topLabel,
  price,
  billingInfo,
  description,
  imageSrc,
}: PricingCardProps) {
  return (
    <div className="group w-[280px] sm:w-[300px] bg-[var(--color-background)] rounded-2xl overflow-hidden shadow-lg border-2 border-[var(--color-border)] hover:border-[var(--color-primary)] hover:shadow-2xl transition-all duration-300 flex flex-col relative">
      
      {/* Decorative Top Bar */}
      <div className="h-1.5 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary)]/70 to-[var(--color-primary)]"></div>

      {/* Content Section */}
      <div className="p-5 flex flex-col gap-3 relative z-10">
        
        {/* Label Badge */}
        <div className="inline-flex items-center gap-2 bg-[var(--color-primary)]/10 px-3 py-1.5 rounded-lg self-start">
          <div className="w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full"></div>
          <span className="text-[var(--color-primary)] text-[10px] font-bold uppercase tracking-wide">
            {topLabel}
          </span>
        </div>

        {/* Price Display */}
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-4xl font-black text-[var(--color-foreground)] group-hover:text-[var(--color-primary)] transition-colors">
            {price}
          </span>
          <span className="text-xs text-[var(--color-paragraph)] leading-tight">
            {billingInfo}
          </span>
        </div>

        {/* Description with Icon */}
        <div className="bg-[var(--color-header-background)] rounded-lg p-3 border-l-4 border-[var(--color-primary)]">
          <p className="text-xs text-[var(--color-paragraph)] leading-relaxed">
            {description}
          </p>
        </div>

        {/* Button */}
        <div className="mt-2">
          <SlantedButton 
            text="GET STARTED" 
            onClick={() => console.log(`${topLabel} plan clicked`)} 
          />
        </div>
      </div>

      {/* Image Section with Overlay */}
      <div className="relative w-full h-48 mt-auto overflow-hidden">
        <Image
          src={imageSrc}
          alt="Pricing illustration"
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />        
      </div>
    </div>
  );
}