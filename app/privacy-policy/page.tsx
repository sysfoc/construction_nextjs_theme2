import PrivacyPolicyPage from "./privacy-policy"
import { connectDB } from "@/lib/mongodb"
import SEOMetadata from "@/lib/models/SEOMetadata"
import PageHeader from "../components/General/PageHeader"

async function getSEOMetadata() {
  try {
    await connectDB()
    const metadata = await SEOMetadata.findOne({ page: "privacy-policy" })
    return (
      metadata || {
        title: "Privacy Policy | Construction Company",
        description: "Learn how we collect, use, and protect your personal information while using our services."
      }
    )
  } catch (error) {
    console.error("Error fetching SEO metadata:", error)
    return {
      title: "Privacy Policy | Construction Company",
      description: "Learn how we collect, use, and protect your personal information while using our services."
    }
  }
}


export async function generateMetadata() {
  const metadata = await getSEOMetadata()
  return {
    title: metadata.title,
    description: metadata.description,
  }
}

export default function PrivacyPage() {
  return (
    <>
      <PageHeader title="Privacy policy" />
      <PrivacyPolicyPage />
    </>
  )
}
