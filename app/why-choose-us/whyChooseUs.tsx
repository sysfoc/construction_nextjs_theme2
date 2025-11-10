'use client';
import type React from "react"
import { useState, useEffect } from "react"
import { ProcessSteps } from "@/app/components/User/why-choose-us/process-steps"
import { BannerSection } from "@/app/components/User/why-choose-us/banner-section"
import { isPageVisible } from "@/lib/api/pageVisibility";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
const [isVisible, setIsVisible] = useState(true);
const router = useRouter();

useEffect(() => {
  const checkVisibility = async () => {
    const visible = await isPageVisible("why-choose-us");
    setIsVisible(visible);
    if (!visible) {
      router.push("/not-found");
    }
  };
  checkVisibility();
}, [router]);

if (!isVisible) {
  return null;
}

  return (
    <div className="w-full">
      <ProcessSteps />
      <BannerSection />
    </div>
  )
}
export default Page
