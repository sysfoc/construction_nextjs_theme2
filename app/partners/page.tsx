import PartnersClient from "./PartnersClient"
import { connectDB } from "@/lib/mongodb"
import SEOMetadata from "@/lib/models/SEOMetadata"
import { ChevronsRight } from "lucide-react"
import PageHeader from "../components/General/PageHeader"

async function getSEOMetadata() {
  try {
    await connectDB()
    const metadata = await SEOMetadata.findOne({ page: "partners" })
    return (
      metadata || { title: "Partners", description: "Our collaborations with trusted organizations help us deliver lasting value through joint expertise and sustainable project delivery." }
    )
  } catch (error) {
    console.error("Error fetching SEO metadata:", error)
    return { title: "Partners", description: "Our collaborations with trusted organizations help us deliver lasting value through joint expertise and sustainable project delivery." }
  }
}

export async function generateMetadata() {
  const metadata = await getSEOMetadata()
  return {
    title: metadata.title,
    description: metadata.description,
  }
}

export default function PartnersPage() {
  return (
    <>
      <PageHeader title="Partners" />
      <PartnersClient />
    </>
  )
}
