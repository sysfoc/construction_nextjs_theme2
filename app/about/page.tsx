// app/about/page.tsx
import { connectDB } from "@/lib/mongodb"
import SEOMetadata from "@/lib/models/SEOMetadata"
import PageHeader from "../components/General/PageHeader"
import  AboutClient from "./AboutClient" 

async function getSEOMetadata() {
  try {
    await connectDB()
    const metadata = await SEOMetadata.findOne({ page: "about" })
    return (
      metadata || { title: "About Us | Quality Construction", description: "Learn about our mission, values, expertise, and commitment to quality construction services." }
    )
  } catch (error) {
    console.error("Error fetching SEO metadata:", error)
    return { title: "About Us | Quality Construction", description: "Learn about our mission, values, expertise, and commitment to quality construction services." }
  }
}

export async function generateMetadata() {
  const metadata = await getSEOMetadata()
  return {
    title: metadata.title,
    description: metadata.description,
  }
}

export default function AboutPage() {
  return (
  <>
  <PageHeader title="About Us" />
  <AboutClient />

  </>)
}
