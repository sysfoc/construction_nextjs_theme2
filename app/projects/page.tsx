import ProjectsClient from "./ProjectsClient"
import { connectDB } from "@/lib/mongodb"
import SEOMetadata from "@/lib/models/SEOMetadata"
import { ChevronsRight } from "lucide-react"
import PageHeader from "../components/General/PageHeader"

async function getSEOMetadata() {
  try {
    await connectDB()
    const metadata = await SEOMetadata.findOne({ page: "projects" })
    return (
      metadata || { title: "Projects | Construction Company", description: "Browse our ongoing, completed, and upcoming construction projects showcasing quality and innovation." }
    )
  } catch (error) {
    console.error("Error fetching SEO metadata:", error)
    return { title: "Projects | Construction Company", description: "Browse our ongoing, completed, and upcoming construction projects showcasing quality and innovation." }
  }
}

export async function generateMetadata() {
  const metadata = await getSEOMetadata()
  return {
    title: metadata.title,
    description: metadata.description,
  }
}

export default function ProjectsPage() {
  return (
    <>
      <PageHeader title="Projects" />
      <ProjectsClient />
    </>
  )
}
