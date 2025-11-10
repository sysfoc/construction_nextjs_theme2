// app/api/services/[id]/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Service from "@/lib/models/Service"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()

    const { id } = await params
    const updateData = await request.json()

    const updatedService = await Service.findByIdAndUpdate(id, updateData, { new: true })

    if (!updatedService) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 })
    }

    return NextResponse.json({
      service: {
        id: updatedService._id,
        type: updatedService.type,
        icon: updatedService.icon,
        title: updatedService.title,
        subtitle: updatedService.subtitle,
        description: updatedService.description,
        buttonText: updatedService.buttonText,
        buttonUrl: updatedService.buttonUrl,
      },
    })
  } catch (error) {
    console.error("Update service error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()

    const { id } = await params

    const deletedService = await Service.findByIdAndDelete(id)

    if (!deletedService) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Service deleted successfully" })
  } catch (error) {
    console.error("Delete service error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
