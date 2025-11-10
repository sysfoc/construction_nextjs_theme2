import CertificationsClient from "./CertificationsClient";
import { connectDB } from "@/lib/mongodb";
import SEOMetadata from "@/lib/models/SEOMetadata";
import { ChevronsRight } from "lucide-react";
import PageHeader from "../components/General/PageHeader";

async function getSEOMetadata() {
  try {
    await connectDB();
    const metadata = await SEOMetadata.findOne({ page: "certifications" });
    return (
      metadata || {
        title: "Certifications",
        description:
          "Explore the certifications and licenses we have achieved.",
      }
    );
  } catch (error) {
    console.error("Error fetching SEO metadata:", error);
    return {
      title: "Certifications",
      description: "Explore the certifications and licenses we have achieved.",
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

export default function CertificationsPage() {
  return (
    <>
      <PageHeader title="Certifications" />
      <CertificationsClient />
    </>
  );
}
