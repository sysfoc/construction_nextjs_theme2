import NewsClient from "./NewsClient"
import { connectDB } from "@/lib/mongodb"
import SEOMetadata from "@/lib/models/SEOMetadata"
import { ChevronsRight } from "lucide-react"
import PageHeader from "../components/General/PageHeader"

async function getSEOMetadata() {
  try {
    await connectDB()
    const metadata = await SEOMetadata.findOne({ page: "news" })
    return (
      metadata || { title: "News", description: "Stay updated with the latest company news and announcements." }
    )
  } catch (error) {
    console.error("Error fetching SEO metadata:", error)
    return { title: "News", description: "Stay updated with the latest company news and announcements." }
  }
}

export async function generateMetadata() {
  const metadata = await getSEOMetadata()
  return {
    title: metadata.title,
    description: metadata.description,
  }
}

export default function NewsPage() {
  return (
    <>
      <PageHeader title="News" />
      <NewsClient />
    </>
  )
}
