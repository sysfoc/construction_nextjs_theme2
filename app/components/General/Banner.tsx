'use client';
import React from "react";
import Image from "next/image";
import SolidButton from "../General/buttons/SolidButton";
import { useRouter } from "next/navigation";

const ConstructionCTA: React.FC = () => {
  const router = useRouter();
  return (
    <section className="relative w-full h-96 sm:h-[300px] lg:h-[400px] overflow-hidden flex items-center justify-center">
      {/* Background Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/worker_03.jpg"
          alt="Construction worker"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>
      </div>

      {/* Content Box */}
      <div className="relative z-10 max-w-3xl text-center px-6">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight">
          Build With Confidence
        </h2>
        <p className="text-white/90 text-sm sm:text-base lg:text-lg mb-8 leading-relaxed">
          Discover how our expert team delivers construction projects with precision, quality, and reliability. Let's create spaces that inspire.
        </p>

        {/* Buttons */}
        <div className="flex w-fit mx-auto flex-col sm:flex-row gap-4">
          <SolidButton
            text="How We Work"
            onClick={() => router.push("/how-we-work")}
          />
          <SolidButton
            text="Book Service"
            onClick={() => router.push("/book-service")}
          />
        </div>
      </div>

      {/* Decorative Accent Shapes */}
      <div className="hidden lg:block absolute -top-10 -left-10 w-32 h-32 bg-primary/40 rounded-full animate-pulse"></div>
      <div className="hidden lg:block absolute -bottom-12 -right-12 w-40 h-40 bg-secondary/30 rounded-full animate-pulse"></div>
    </section>
  );
};

export default ConstructionCTA;
