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

    const updatedProject = await Project.findByIdAndUpdate(id, updateData, { new: true })

    if (!updatedProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json(updatedProject)
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
