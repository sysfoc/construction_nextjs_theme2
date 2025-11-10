// app/api/contact/[id]/route.ts
import Contact from "@/lib/models/Contact"
import { connectDB } from "@/lib/mongodb"
import { type NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB()
  const { id } = await params
  const { status } = await request.json()

  if (!["pending", "replied"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 })
  }

  const updated = await Contact.findByIdAndUpdate(id, { status }, { new: true })

  if (!updated) {
    return NextResponse.json({ error: "Message not found" }, { status: 404 })
  }

  return NextResponse.json(updated)
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB()
  const { id } = await params

  const deleted = await Contact.findByIdAndDelete(id)

  if (!deleted) {
    return NextResponse.json({ error: "Message not found" }, { status: 404 })
  }

  return NextResponse.json({ success: true })
}
