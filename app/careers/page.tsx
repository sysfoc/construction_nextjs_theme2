// app/careers/page.tsx
import CareersClient from "./CareersClient";
import { connectDB } from "@/lib/mongodb";
import SEOMetadata from "@/lib/models/SEOMetadata";
import { ChevronsRight } from "lucide-react";
import PageHeader from "../components/General/PageHeader";

async function getSEOMetadata() {
  try {
    await connectDB();
    const metadata = await SEOMetadata.findOne({ page: "careers" });
    return (
      metadata || {
        title: "Careers",
        description: "Explore current career opportunities and join our team.",
      }
    );
  } catch (error) {
    console.error("Error fetching SEO metadata:", error);
    return {
      title: "Careers",
      description: "Explore current career opportunities and join our team.",
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

export default function CareersPage() {
  return (
    <>
      <PageHeader title="Careers" />
      <CareersClient />
    </>
  );
}
