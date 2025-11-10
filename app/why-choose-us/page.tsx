import WhyChooseUs from "@/app/why-choose-us/whyChooseUs";
import { connectDB } from "@/lib/mongodb";
import SEOMetadata from "@/lib/models/SEOMetadata";
import { ChevronsRight } from "lucide-react";
import type React from "react";
import PageHeader from "../components/General/PageHeader";

async function getSEOMetadata() {
  try {
    await connectDB();
    const metadata = await SEOMetadata.findOne({ page: "why-choose-us" });
    return (
      metadata || {
        title: "Why Choose Us | Construction Expertise",
        description:
          "Discover why clients trust our construction company for quality, reliability, and years of proven experience.",
      }
    );
  } catch (error) {
    console.error("Error fetching SEO metadata:", error);
    return {
      title: "Why Choose Us | Construction Expertise",
      description:
        "Discover why clients trust our construction company for quality, reliability, and years of proven experience.",
    };
  }
}

export async function generateMetadata() {
  const metadata = await getSEOMetadata();
  return {
    title: metadata.title,
    description: metadata.description,
  };
}

const Page: React.FC = () => {
  return (
    <div className="w-full">
      <PageHeader title="Why Choose Us" />
      <WhyChooseUs />
    </div>
  );
};

export default Page;
