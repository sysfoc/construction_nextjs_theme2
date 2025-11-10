import { connectDB } from "@/lib/mongodb"
import WhyChooseUs from "@/lib/models/WhyChooseUs"
import { type NextRequest, NextResponse } from "next/server"
import { Types } from "mongoose"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid step ID" }, { status: 400 })
    }

    await connectDB()
    const body = await request.json()
    const step = await WhyChooseUs.findByIdAndUpdate(id, body, { new: true })

    if (!step) {
      return NextResponse.json({ error: "Step not found" }, { status: 404 })
    }

    return NextResponse.json(step)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update step" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid step ID" }, { status: 400 })
    }

    await connectDB()
    const step = await WhyChooseUs.findByIdAndDelete(id)

    if (!step) {
      return NextResponse.json({ error: "Step not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Step deleted" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete step" }, { status: 500 })
  }
}
