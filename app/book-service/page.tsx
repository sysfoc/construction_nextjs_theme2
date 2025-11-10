import BookService from "./BookService"
import { connectDB } from "@/lib/mongodb"
import SEOMetadata from "@/lib/models/SEOMetadata"
import { ChevronsRight } from "lucide-react"
import PageHeader from "../components/General/PageHeader"

async function getSEOMetadata() {
  try {
    await connectDB()
    const metadata = await SEOMetadata.findOne({ page: "book-service" })
    return (
      metadata || { 
        title: "Book Service | Construction Company", 
        description: "Easily book our professional construction services and get expert support tailored to your project needs." 
      }
    )
  } catch (error) {
    console.error("Error fetching SEO metadata:", error)
    return { 
      title: "Book Service | Construction Company", 
      description: "Easily book our professional construction services and get expert support tailored to your project needs." 
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

export default function BookServicePage() {
  return (
    <>
      <PageHeader title="Book Service" />
      <BookService />
    </>
  )
}
