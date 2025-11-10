// app/api/emergency-services/[id]/route.ts

import { connectDB } from "@/lib/mongodb"
import { EmergencyServiceConfig, type IService } from "@/lib/models/emergency-service"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await connectDB()
    const config = await EmergencyServiceConfig.findOne({})

    if (!config) return Response.json({ error: "Config not found" }, { status: 404 })

    const service = config.services.find((s: IService) => s._id?.toString() === id)
    if (!service) return Response.json({ error: "Service not found" }, { status: 404 })

    return Response.json(service)
  } catch (error) {
    console.error("[v0] Error fetching service:", error)
    return Response.json({ error: "Failed to fetch service" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await connectDB()
    const data = await request.json()

    const config = await EmergencyServiceConfig.findOne({})
    if (!config) return Response.json({ error: "Config not found" }, { status: 404 })

    const serviceIndex = config.services.findIndex((s: IService) => s._id?.toString() === id)
    if (serviceIndex === -1) return Response.json({ error: "Service not found" }, { status: 404 })

    config.services[serviceIndex] = { ...config.services[serviceIndex], ...data }
    await config.save()

    return Response.json(config.services[serviceIndex])
  } catch (error) {
    console.error("[v0] Error updating service:", error)
    return Response.json({ error: "Failed to update service" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await connectDB()
    const config = await EmergencyServiceConfig.findOne({})

    if (!config) return Response.json({ error: "Config not found" }, { status: 404 })

    const serviceIndex = config.services.findIndex((s: IService) => s._id?.toString() === id)
    if (serviceIndex === -1) return Response.json({ error: "Service not found" }, { status: 404 })

    config.services.splice(serviceIndex, 1)
    await config.save()

    return Response.json({ message: "Service deleted" })
  } catch (error) {
    console.error("[v0] Error deleting service:", error)
    return Response.json({ error: "Failed to delete service" }, { status: 500 })
  }
}
