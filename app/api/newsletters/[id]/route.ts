// app/api/newsletters/[id]/route.ts
import Newsletter from "@/lib/models/Newsletter"
import { connectDB } from "@/lib/mongodb"
import { type NextRequest, NextResponse } from "next/server"

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()
    const { id } = await params

    await Newsletter.findByIdAndDelete(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting newsletter:", error)
    return NextResponse.json({ error: "Failed to delete newsletter" }, { status: 500 })
  }
}
