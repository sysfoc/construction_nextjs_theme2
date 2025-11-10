"use client";

import { StepRow } from "@/app/components/User/how-we-work/step-row";
import { WorkProcessSection } from "@/app/components/User/how-we-work/WorkProcessSection";
import type { HowWeWorkData } from "@/lib/models/HowWeWork";
import { useEffect, useState } from "react";
import { isPageVisible } from "@/lib/api/pageVisibility";
import { useRouter } from "next/navigation";

export default function HowWeWorkPage() {
  const [steps, setSteps] = useState<HowWeWorkData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkVisibility = async () => {
      const visible = await isPageVisible("how-we-work");
      setIsVisible(visible);
      if (!visible) {
        router.push("/not-found");
      }
    };
    checkVisibility();
  }, [router]);

  useEffect(() => {
    async function fetchSteps() {
      try {
        const response = await fetch("/api/how-we-work", {
          cache: "no-store",
        });
        const data = await response.json();
        setSteps(data.steps || []);
      } catch (error) {
        console.error("Failed to fetch steps:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSteps();
  }, []);

  if (!isVisible) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <main className="mx-auto w-full max-w-4xl px-3 py-5">
        {/* Compact header */}
        <header className="m-3">
          <h1 className="mt-1 font-semibold leading-tight text-xl text-[var(--page-heading,_var(--foreground))]">
            How We Work
          </h1>
          <p className="mt-1 text-sm leading-tight text-[var(--paragraph-color,_var(--foreground))]">
            A direct, efficient, and accountable process for reliable project
            delivery.
          </p>
        </header>

        {/* Steps: alternating number/content layout with compact spacing */}
        <div className="sm:mt-16 mt-5 flex flex-col gap-2">
          {steps.map((s, i) => (
            <StepRow
              key={s._id}
              index={i}
              title={s.title}
              description={s.description}
              imageSrc={s.imgSrc}
            />
          ))}
        </div>
      </main>
      <WorkProcessSection />
    </>
  );
}
