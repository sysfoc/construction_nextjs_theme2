import ContactUs from "./ContactUs"
import { connectDB } from "@/lib/mongodb"
import SEOMetadata from "@/lib/models/SEOMetadata"
import PageHeader from "../components/General/PageHeader"

async function getSEOMetadata() {
  try {
    await connectDB()
    const metadata = await SEOMetadata.findOne({ page: "contact" })
    return (
      metadata || { 
        title: "Contact Us | Construction Company", 
        description: "Get in touch with our construction experts for inquiries, consultations, or project discussions. We're here to assist you." 
      }
    )
  } catch (error) {
    console.error("Error fetching SEO metadata:", error)
    return { 
      title: "Contact Us | Construction Company", 
      description: "Get in touch with our construction experts for inquiries, consultations, or project discussions. We're here to assist you." 
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

export default function ContactUsPage() {
  return (
    <>
      <PageHeader title="Contact Us" />
      <ContactUs />
    </>
  )
}
