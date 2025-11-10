// app/api/emergency-services/route.ts
import { connectDB } from "@/lib/mongodb"
import { EmergencyServiceConfig } from "@/lib/models/emergency-service"

export async function GET() {
  try {
    await connectDB()
    let config = await EmergencyServiceConfig.findOne({})

    // If no config exists, create one
    if (!config) {
      config = await EmergencyServiceConfig.create({
        globalSettings: { emergencyEmail: "", emergencyPhone: "" },
        services: [],
      })
    }

    return Response.json(config.services)
  } catch (error) {
    console.error("[v0] Error fetching services:", error)
    return Response.json({ error: "Failed to fetch services" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()
    const data = await request.json()

    let config = await EmergencyServiceConfig.findOne({})
    if (!config) {
      config = await EmergencyServiceConfig.create({
        globalSettings: { emergencyEmail: "", emergencyPhone: "" },
        services: [],
      })
    }

    const { Types } = await import("mongoose")
    const newService = {
      _id: new Types.ObjectId(),
      ...data,
    }
    config.services.push(newService)
    await config.save()

    return Response.json(newService, { status: 201 })
  } catch (error) {
    console.error("[v0] Error creating service:", error)
    return Response.json({ error: "Failed to create service" }, { status: 500 })
  }
}
