import BlogsPage from "./BlogsClient"
import { connectDB } from "@/lib/mongodb"
import SEOMetadata from "@/lib/models/SEOMetadata"
import PageHeader from "../components/General/PageHeader"

async function getSEOMetadata() {
  try {
    await connectDB()
    const metadata = await SEOMetadata.findOne({ page: "blogs" })
    return (
      metadata || {
        title: "Construction Insights & Industry Updates | Expert Building & Infrastructure Blogs",
        description:
          "Explore expert-written construction blogs covering concrete diagnostics, site safety, project management, modern building materials, equipment trends, and real-world solutions for contractors and engineers.",
      }
    )
  } catch (error) {
    console.error("Error fetching SEO metadata:", error)
    return {
      title: "Construction Insights & Industry Updates | Expert Building & Infrastructure Blogs",
      description:
        "Explore expert-written construction blogs covering concrete diagnostics, site safety, project management, modern building materials, equipment trends, and real-world solutions for contractors and engineers.",
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

export default function Page() {
  return (
    <>
      <PageHeader title="Blogs" />
      <BlogsPage />
    </>
  )
}
