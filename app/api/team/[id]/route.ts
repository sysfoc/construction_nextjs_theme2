// app/api/team/[id]/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Team from "@/lib/models/Team"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()

    const { id } = await params
    const updateData = await request.json()

    const updatedMember = await Team.findByIdAndUpdate(id, updateData, { new: true })

    if (!updatedMember) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 })
    }

    return NextResponse.json({
      teamMember: {
        id: updatedMember._id,
        name: updatedMember.name,
        designation: updatedMember.designation,
        photo: updatedMember.photo,
      },
    })
  } catch (error) {
    console.error("Update team member error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()

    const { id } = await params

    const deletedMember = await Team.findByIdAndDelete(id)

    if (!deletedMember) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Team member deleted successfully" })
  } catch (error) {
    console.error("Delete team member error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}