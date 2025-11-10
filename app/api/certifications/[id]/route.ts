import { type NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"
import Certification from "@/lib/models/Certification"

const MONGODB_URI = process.env.MONGODB_URI

async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return
  }
  await mongoose.connect(MONGODB_URI!)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()

    const { id } = await params
    const body = await request.json()
    const { title, description, image } = body

    const certification = await Certification.findByIdAndUpdate(
      id,
      { title, description, image: image || null },
      { new: true },
    )

    if (!certification) {
      return NextResponse.json({ error: "Certification not found" }, { status: 404 })
    }

    return NextResponse.json(certification)
  } catch (error) {
    console.error("Error updating certification:", error)
    return NextResponse.json({ error: "Failed to update certification" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()

    const { id } = await params
    const certification = await Certification.findByIdAndDelete(id)

    if (!certification) {
      return NextResponse.json({ error: "Certification not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Certification deleted successfully" })
  } catch (error) {
    console.error("Error deleting certification:", error)
    return NextResponse.json({ error: "Failed to delete certification" }, { status: 500 })
  }
}
