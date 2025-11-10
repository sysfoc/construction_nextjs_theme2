import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/jwt"
import { connectDB } from "@/lib/mongodb"
import HowWeWork from "@/lib/models/HowWeWork"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()

    const token = (await cookies()).get("token")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = await verifyToken(token)

    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { id } = await params
    const updateData = await request.json()

    const updatedStep = await HowWeWork.findByIdAndUpdate(id, updateData, { new: true })

    if (!updatedStep) {
      return NextResponse.json({ error: "Step not found" }, { status: 404 })
    }

    return NextResponse.json({
      step: {
        _id: updatedStep._id,
        step: updatedStep.step,
        title: updatedStep.title,
        description: updatedStep.description,
        imgSrc: updatedStep.imgSrc,
      },
    })
  } catch (error) {
    console.error("Update how-we-work error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()

    const token = (await cookies()).get("token")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = await verifyToken(token)

    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { id } = await params

    // Get the step being deleted to know its step number
    const stepToDelete = await HowWeWork.findById(id)

    if (!stepToDelete) {
      return NextResponse.json({ error: "Step not found" }, { status: 404 })
    }

    const deletedStepNumber = stepToDelete.step

    // Delete the step
    await HowWeWork.findByIdAndDelete(id)

    await HowWeWork.updateMany({ step: { $gt: deletedStepNumber } }, { $inc: { step: -1 } })

    return NextResponse.json({ message: "Step deleted successfully" })
  } catch (error) {
    console.error("Delete how-we-work error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
