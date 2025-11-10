import TestimonialsClient from "./TestimonialsClient"
import { connectDB } from "@/lib/mongodb"
import SEOMetadata from "@/lib/models/SEOMetadata"
import { ChevronsRight } from "lucide-react"
import PageHeader from "../components/General/PageHeader"

async function getSEOMetadata() {
  try {
    await connectDB()
    const metadata = await SEOMetadata.findOne({ page: "testimonials" })
    return (
      metadata || { title: "Customer Testimonials | Your Company Name", description: "Hear from our satisfied clients worldwide. Read genuine testimonials about our services and successful projects." }
    )
  } catch (error) {
    console.error("Error fetching SEO metadata:", error)
    return { title: "Customer Testimonials | Your Company Name", description: "Hear from our satisfied clients worldwide. Read genuine testimonials about our services and successful projects." }
  }
}

export async function generateMetadata() {
  const metadata = await getSEOMetadata()
  return {
    title: metadata.title,
    description: metadata.description,
  }
}

export default function TestimonialsPage() {
  return (
    <>
      <PageHeader title="Customer Testimonials" />
      <TestimonialsClient />
    </>
  )
}
