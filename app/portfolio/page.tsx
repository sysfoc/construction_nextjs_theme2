import PortfolioClient from "./PortfolioClient"
import { connectDB } from "@/lib/mongodb"
import SEOMetadata from "@/lib/models/SEOMetadata"
import { ChevronsRight } from "lucide-react"
import PageHeader from "../components/General/PageHeader"

async function getSEOMetadata() {
  try {
    await connectDB()
    const metadata = await SEOMetadata.findOne({ page: "portfolio" })
    return (
      metadata || { title: "Portfolio | Your Company Name", description: "Explore our portfolio of completed construction projects, showcasing quality, innovation, and excellence." }
    )
  } catch (error) {
    console.error("Error fetching SEO metadata:", error)
    return { title: "Portfolio | Your Company Name", description: "Explore our portfolio of completed construction projects, showcasing quality, innovation, and excellence." }
  }
}

export async function generateMetadata() {
  const metadata = await getSEOMetadata()
  return {
    title: metadata.title,
    description: metadata.description,
  }
}

export default function PortfolioPage() {
  return(
    <>
      <PageHeader title="Portfolio" />
      <PortfolioClient />
    </>
  )
}
