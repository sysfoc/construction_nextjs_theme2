// app/api/job-applications/[id]/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import JobApplication from "@/lib/models/JobApplication"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()

    const { id } = await params
    const { status } = await request.json()

    if (!["pending", "accepted", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    const updatedApplication = await JobApplication.findByIdAndUpdate(id, { status }, { new: true })

    if (!updatedApplication) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 })
    }

    return NextResponse.json({
      application: {
        id: updatedApplication._id,
        status: updatedApplication.status,
      },
    })
  } catch (error) {
    console.error("Update application error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()

    const { id } = await params

    const deletedApplication = await JobApplication.findByIdAndDelete(id)

    if (!deletedApplication) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Application deleted successfully" })
  } catch (error) {
    console.error("Delete application error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
