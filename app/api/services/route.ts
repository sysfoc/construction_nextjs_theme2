// app/api/services/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Service from "@/lib/models/Service"

export async function GET() {
  try {
    await connectDB()
    const services = await Service.find({}).sort({ createdAt: -1 })

    return NextResponse.json({
      services: services.map((service) => ({
        id: service._id,
        type: service.type,
        icon: service.icon,
        title: service.title,
        subtitle: service.subtitle,
        description: service.description,
        buttonText: service.buttonText,
        buttonUrl: service.buttonUrl,
      })),
    })
  } catch (error) {
    console.error("Get services error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const serviceData = await request.json()
    const newService = await Service.create(serviceData)

    return NextResponse.json({
      service: {
        id: newService._id,
        type: newService.type,
        icon: newService.icon,
        title: newService.title,
        subtitle: newService.subtitle,
        description: newService.description,
        buttonText: newService.buttonText,
        buttonUrl: newService.buttonUrl,
      },
    })
  } catch (error) {
    console.error("Create service error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
