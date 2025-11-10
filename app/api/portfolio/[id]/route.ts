// app/api/portfolio/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/jwt"
import { connectDB } from "@/lib/mongodb"
import Portfolio from "@/lib/models/Portfolio"

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

    const updatedProject = await Portfolio.findByIdAndUpdate(id, updateData, { new: true })

    if (!updatedProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({
      project: {
        id: updatedProject._id,
        title: updatedProject.title,
        category: updatedProject.category,
        photos: updatedProject.photos,
      },
    })
  } catch (error) {
    console.error("Update portfolio error:", error)
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

    const deletedProject = await Portfolio.findByIdAndDelete(id)

    if (!deletedProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Project deleted successfully" })
  } catch (error) {
    console.error("Delete portfolio error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
