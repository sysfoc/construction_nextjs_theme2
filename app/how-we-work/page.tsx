import HowWeWorkClient from "./HowWeWorkClient"
import { connectDB } from "@/lib/mongodb"
import SEOMetadata from "@/lib/models/SEOMetadata"
import { ChevronsRight } from "lucide-react"
import PageHeader from "../components/General/PageHeader"

async function getSEOMetadata() {
  try {
    await connectDB()
    const metadata = await SEOMetadata.findOne({ page: "how-we-work" })
    return (
      metadata || { title: "How We Work", description: "Discover our organized and efficient work process for every project." }
    )
  } catch (error) {
    console.error("Error fetching SEO metadata:", error)
    return { title: "How We Work", description: "Discover our organized and efficient work process for every project." }
  }
}

export async function generateMetadata() {
  const metadata = await getSEOMetadata()
  return {
    title: metadata.title,
    description: metadata.description,
  }
}

export default function HowWeWorkPage() {
  return (
    <>
      <PageHeader title="How We Work" />
      <HowWeWorkClient />
    </>
  )
}
