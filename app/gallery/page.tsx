import Gallery from "./Gallery"
import { connectDB } from "@/lib/mongodb"
import SEOMetadata from "@/lib/models/SEOMetadata"
import { ChevronsRight } from "lucide-react"
import PageHeader from "../components/General/PageHeader"

async function getSEOMetadata() {
  try {
    await connectDB()
    const metadata = await SEOMetadata.findOne({ page: "gallery" })
    return (
      metadata || { 
        title: "Gallery | Construction Company", 
        description: "Explore our construction project gallery showcasing completed works, ongoing projects, and professional craftsmanship." 
      }
    )
  } catch (error) {
    console.error("Error fetching SEO metadata:", error)
    return { 
      title: "Gallery | Construction Company", 
      description: "Explore our construction project gallery showcasing completed works, ongoing projects, and professional craftsmanship." 
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

export default function GalleryPage() {
  return (
    <>
      <PageHeader title="Gallery" />
      <Gallery />
    </>
  )
}
