import Newsletter from "./Newsletter"
import { connectDB } from "@/lib/mongodb"
import SEOMetadata from "@/lib/models/SEOMetadata"
import { ChevronsRight } from "lucide-react"
import PageHeader from "../components/General/PageHeader"

async function getSEOMetadata() {
  try {
    await connectDB()
    const metadata = await SEOMetadata.findOne({ page: "newsletter" })
    return (
      metadata || { 
        title: "Newsletter | Construction Company", 
        description: "Subscribe to our newsletter and stay updated with the latest construction industry news, trends, and company updates." 
      }
    )
  } catch (error) {
    console.error("Error fetching SEO metadata:", error)
    return { 
      title: "Newsletter | Construction Company", 
      description: "Subscribe to our newsletter and stay updated with the latest construction industry news, trends, and company updates." 
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

export default function NewsletterPage() {
  return (
    <>
      <PageHeader title="Newsletter" />
      <Newsletter />
    </>
  )
}
