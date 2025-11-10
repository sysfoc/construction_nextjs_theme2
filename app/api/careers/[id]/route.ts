// app/api/careers/[id]/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Career from "@/lib/models/Career"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()

    const { id } = await params
    const updateData = await request.json()

    const updatedJob = await Career.findByIdAndUpdate(id, updateData, { new: true })

    if (!updatedJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }

    return NextResponse.json({
      job: {
        id: updatedJob._id,
        title: updatedJob.title,
        description: updatedJob.description,
        location: updatedJob.location,
        deadline: updatedJob.deadline,
        jobType: updatedJob.jobType,
        payRange: updatedJob.payRange,
        image: updatedJob.image,
      },
    })
  } catch (error) {
    console.error("Update job error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()

    const { id } = await params

    const deletedJob = await Career.findByIdAndDelete(id)

    if (!deletedJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Job deleted successfully" })
  } catch (error) {
    console.error("Delete job error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
