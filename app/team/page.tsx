import TeamClient from "./TeamClient"
import { connectDB } from "@/lib/mongodb"
import SEOMetadata from "@/lib/models/SEOMetadata"
import { ChevronsRight } from "lucide-react"
import PageHeader from "../components/General/PageHeader"

async function getSEOMetadata() {
  try {
    await connectDB()
    const metadata = await SEOMetadata.findOne({ page: "team" })
    return (
      metadata || { title: "Our Team | Construction Company", description: "Meet our professional team with extensive experience in delivering successful construction projects." }
    )
  } catch (error) {
    console.error("Error fetching SEO metadata:", error)
    return { title: "Our Team | Construction Company", description: "Meet our professional team with extensive experience in delivering successful construction projects." }
  }
}

export async function generateMetadata() {
  const metadata = await getSEOMetadata()
  return {
    title: metadata.title,
    description: metadata.description,
  }
}

export default function TeamPage() {
  return (
    <>
      <PageHeader title="Our Team" />
      <TeamClient />
    </>
  )
}
