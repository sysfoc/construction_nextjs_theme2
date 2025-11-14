import TermsAndConditionsPage from "./terms-and-conditions"
import { connectDB } from "@/lib/mongodb"
import SEOMetadata from "@/lib/models/SEOMetadata"
import PageHeader from "../components/General/PageHeader"

async function getSEOMetadata() {
  try {
    await connectDB()
    const metadata = await SEOMetadata.findOne({ page: "terms-and-conditions" })
    return (
      metadata || {
        title: "Terms & Conditions | Construction Company",
        description: "Read the terms and conditions of our services, including policies, user responsibilities, and legal disclaimers."
      }
    )
  } catch (error) {
    console.error("Error fetching SEO metadata:", error)
    return {
      title: "Terms & Conditions | Construction Company",
      description: "Read the terms and conditions of our services, including policies, user responsibilities, and legal disclaimers."
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

export default function TermsPage() {
  return (
    <>
      <PageHeader title="Terms & conditions" />
      <TermsAndConditionsPage />
    </>
  )
}
