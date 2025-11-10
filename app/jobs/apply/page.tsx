import JobApply from "./JobApply"
import { connectDB } from "@/lib/mongodb"
import SEOMetadata from "@/lib/models/SEOMetadata"
import { Suspense } from "react"

async function getSEOMetadata() {
  try {
    await connectDB()
    const metadata = await SEOMetadata.findOne({ page: "jobs" })
    return (
      metadata || { 
        title: "Job Apply | Construction Company", 
        description: "Apply for exciting career opportunities at our construction company and become part of a professional and innovative team." 
      }
    )
  } catch (error) {
    console.error("Error fetching SEO metadata:", error)
    return { 
      title: "Job Apply | Construction Company", 
      description: "Apply for exciting career opportunities at our construction company and become part of a professional and innovative team." 
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

export default function JobApplyPage() {
  return (
    <Suspense fallback={<div className="my-20 text-center">Loading...</div>}>
      <JobApply />
    </Suspense>
  )
}