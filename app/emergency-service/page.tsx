import EmergencyService from "./EmergencyService"
import { connectDB } from "@/lib/mongodb"
import SEOMetadata from "@/lib/models/SEOMetadata"
import PageHeader from "../components/General/PageHeader"

async function getSEOMetadata() {
  try {
    await connectDB()
    const metadata = await SEOMetadata.findOne({ page: "emergency-service" })
    return ( metadata )
  } catch (error) {
    console.error("Error fetching SEO metadata:", error)  }
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
     <PageHeader title="Emergency Services" />
      <EmergencyService />
    </>
  )
}
