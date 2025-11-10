import FaqClient from "./FaqClient"
import { connectDB } from "@/lib/mongodb"
import SEOMetadata from "@/lib/models/SEOMetadata"
import { ChevronsRight } from "lucide-react"
import PageHeader from "../components/General/PageHeader"

async function getSEOMetadata() {
  try {
    await connectDB()
    const metadata = await SEOMetadata.findOne({ page: "faqs" })
    return (
      metadata || { title: "FAQs | Construction Expertise", description: "Find answers to the most frequently asked questions about our construction services and offerings." }
    )
  } catch (error) {
    console.error("Error fetching SEO metadata:", error)
    return { title: "FAQs | Construction Expertise", description: "Find answers to the most frequently asked questions about our construction services and offerings." }
  }
}

export async function generateMetadata() {
  const metadata = await getSEOMetadata()
  return {
    title: metadata.title,
    description: metadata.description,
  }
}

export default function Page() {
  return (
    <>
     <PageHeader title="FAQs" />
      <FaqClient />
    </>
  )
}
