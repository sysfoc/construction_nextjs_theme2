import RequestQuote from "./RequestQuote"
import { connectDB } from "@/lib/mongodb"
import SEOMetadata from "@/lib/models/SEOMetadata"
import { ChevronsRight } from "lucide-react"
import PageHeader from "../components/General/PageHeader"

async function getSEOMetadata() {
  try {
    await connectDB()
    const metadata = await SEOMetadata.findOne({ page: "quote" })
    return (
      metadata || { 
        title: "Request a Quote | Construction Company", 
        description: "Request a detailed project quote from our construction experts and get professional assistance for your next project." 
      }
    )
  } catch (error) {
    console.error("Error fetching SEO metadata:", error)
    return { 
      title: "Request a Quote | Construction Company", 
      description: "Request a detailed project quote from our construction experts and get professional assistance for your next project." 
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

export default function RequestQuotePage() {
  return (
    <>
      <PageHeader title="Request a Quote" />
      <RequestQuote />
    </>
  )
}
