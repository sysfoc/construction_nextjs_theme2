import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import PageVisibility from "@/lib/models/PageVisibility"
import { Types } from "mongoose"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()
    const { id } = await params

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid page ID" }, { status: 400 })
    }

    const updateData = await request.json()
    const updatedPage = await PageVisibility.findByIdAndUpdate(id, updateData, { new: true })

    if (!updatedPage) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }

    return NextResponse.json(updatedPage)
  } catch (error) {
    console.error("Update page visibility error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()
    const { id } = await params

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid page ID" }, { status: 400 })
    }

    const deletedPage = await PageVisibility.findByIdAndDelete(id)

    if (!deletedPage) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Page deleted successfully" })
  } catch (error) {
    console.error("Delete page visibility error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
