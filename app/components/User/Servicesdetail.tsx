"use client";
import React, { useState } from "react";
import { Check } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SolidButton from "../General/buttons/SolidButton";

interface Stat {
  number: string;
  label: string;
}

interface TabContentData {
  description: string;
  stats: Stat[];
  consulting: string[];
}

interface TabContentMap {
  architecture: TabContentData;
  renovation: TabContentData;
  material: TabContentData;
}

type TabKey = keyof TabContentMap;

export default function ConstructionSection(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<TabKey>("architecture");
  const router = useRouter();

  const tabContent: TabContentMap = {
    architecture: {
      description:
        "For each project we establish relationships with partners who we know will help us create added value for your project, bringing together public and private sectors.",
      stats: [
        { number: "434+", label: "Projects Completed" },
        { number: "20+", label: "Awards Won" },
      ],
      consulting: ["General Consulting", "Project Management", "Strategic Planning"],
    },
    renovation: {
      description:
        "Our renovation services transform structures into modern, efficient spaces while preserving character and ensuring compliance with standards.",
      stats: [
        { number: "285+", label: "Buildings Renovated" },
        { number: "42+", label: "Heritage Restorations" },
      ],
      consulting: ["Structural Assessment", "Interior Redesign", "Energy Efficiency"],
    },
    material: {
      description:
        "We provide material supply solutions for all scales, ensuring timely delivery, high quality, competitive pricing, and expert guidance.",
      stats: [
        { number: "520+", label: "Supply Projects" },
        { number: "95+", label: "Partner Suppliers" },
      ],
      consulting: ["Material Sourcing", "Quality Control", "Logistics Management"],
    },
  };

  const currentContent = tabContent[activeTab];

  return (
    <div className="bg-[var(--color-foreground)] dark:bg-gray-800 text-[var(--color-primary-foreground)] py-12 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-gray-800 to-transparent rotate-12"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-gray-800 to-transparent -rotate-12"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Tabs */}
        <div className="flex gap-3 mb-6 text-xs font-semibold">
          {(["architecture", "renovation", "material"] as TabKey[]).map((tabKey) => (
            <button
              key={tabKey}
              onClick={() => setActiveTab(tabKey)}
              className={`px-3 py-1 transition rounded ${
                activeTab === tabKey
                  ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
                  : "bg-[var(--color-header-background)] text-[var(--color-header-text)] hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700"
              }`}
            >
              {tabKey === "architecture"
                ? "Architecture Design"
                : tabKey === "renovation"
                ? "Building Renovation"
                : "Material Supply"}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left - Image + Financing Box (kept original layout) */}
          <div className="flex items-end justify-center gap-0">
            {/* Construction Image */}
            <div className="hidden sm:flex flex-1 min-w-0 h-44 relative">
              <Image
                src="/priceCard/priceCard_02.png"
                alt="Construction Site"
                fill
                className="object-cover"
              />
            </div>

            {/* Mortgage Financing Box */}
            <div className="bg-[var(--color-primary)] p-6 flex flex-col justify-center items-center text-center flex-shrink-0 w-64 h-44">
              <div className="text-[var(--color-primary-foreground)] text-lg font-medium mb-2">
                Start From
              </div>
              <div className="text-[var(--color-primary-foreground)] text-xs mb-2">
                Mortgage Credit
              </div>
              <div className="text-[var(--color-primary-foreground)] text-5xl font-bold mb-2">
                15.5
              </div>
              <div className="text-[var(--color-primary-foreground)] text-sm flex items-center gap-1">
                % interest →
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="flex flex-col justify-between gap-4">
            <p className="text-background text-sm leading-snug">{currentContent.description}</p>

            {/* Stats */}
            <div className="flex gap-4">
              {currentContent.stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-8 h-8 flex items-center justify-center rounded">
                    <Image
                      src={`/serviceDetail/serviceDetail_0${i + 1}.png`}
                      alt={stat.label}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[var(--color-primary)] text-xl font-bold">
                      {stat.number}
                    </span>
                    <span className="text-background text-xs">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-2">
              <SolidButton text="Our Projects" onClick={() => router.push("/projects")} />
              <SolidButton text="Emergency Services" onClick={() => router.push("/emergency-services")} />
            </div>

            {/* Consulting Labels */}
            <div className="flex gap-4 flex-wrap mt-2">
              {currentContent.consulting.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1 text-xs">
                  <div className="w-4 h-4 flex items-center justify-center rounded-full border-[1.5px] border-[var(--color-primary)]">
                    <Check className="w-3 h-3 text-[var(--color-primary)]" />
                  </div>
                  <span className="text-background">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
