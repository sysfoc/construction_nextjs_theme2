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
    <div className="w-[280px] sm:w-[300px] bg-[var(--color-background)] rounded-xl overflow-hidden shadow-lg border border-[var(--color-border)] flex flex-col">
      
      {/* Top Label Ribbon */}
      <div className="bg-[var(--color-primary)] text-[var(--color-background)] text-xs font-semibold px-4 py-1 self-start rounded-br-xl">
        {topLabel}
      </div>

      {/* Price & Billing Info */}
      <div className="p-5 flex flex-col gap-2">
        <div className="flex items-end gap-2">
          <span className="text-4xl font-bold text-[var(--color-foreground)]">{price}</span>
          <span className="text-sm text-[var(--color-paragraph)] leading-tight">{billingInfo}</span>
        </div>

        {/* Divider */}
        <div className="border-t border-[var(--color-border)]" />

        {/* Description */}
        <p className="text-sm text-[var(--color-paragraph)] leading-snug">{description}</p>

        {/* Button */}
        <div className="mt-3">
          <SlantedButton text="GET STARTED" onClick={() => console.log(`${topLabel} plan clicked`)} />
        </div>
      </div>

      {/* Bottom Image */}
      <div className="w-full h-60 relative mt-auto">
        <Image
          src={imageSrc}
          alt="Pricing illustration"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
