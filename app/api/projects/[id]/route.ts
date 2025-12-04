// app/api/projects/[id]/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Project from "@/lib/models/Project"
import { Types } from "mongoose"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()

    const { id } = await params

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid project ID" }, { status: 400 })
    }

    const updateData = await request.json()
    
    // Convert date strings to Date objects
    const processedData = {
      ...updateData,
      startDate: updateData.startDate ? new Date(updateData.startDate) : null,
      endDate: updateData.endDate ? new Date(updateData.endDate) : null,
    }

    const updatedProject = await Project.findByIdAndUpdate(id, processedData, { new: true })

    if (!updatedProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Convert back to string format for response
    const responseProject = {
      ...updatedProject.toObject(),
      _id: updatedProject._id.toString(),
      startDate: updatedProject.startDate ? new Date(updatedProject.startDate).toISOString().split('T')[0] : '',
      endDate: updatedProject.endDate ? new Date(updatedProject.endDate).toISOString().split('T')[0] : null,
      createdAt: updatedProject.createdAt.toISOString(),
      updatedAt: updatedProject.updatedAt.toISOString(),
    }

    return NextResponse.json(responseProject)
  } catch (error) {
    console.error("Update project error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()

    const { id } = await params

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid project ID" }, { status: 400 })
    }

    const deletedProject = await Project.findByIdAndDelete(id)

    if (!deletedProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Project deleted successfully" })
  } catch (error) {
    console.error("Delete project error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}