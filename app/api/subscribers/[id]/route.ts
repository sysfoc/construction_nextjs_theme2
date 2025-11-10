// app/api/subscribers/[id]/route.ts
import Subscriber from "@/lib/models/Subscriber"
import { connectDB } from "@/lib/mongodb"
import { type NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()
    const { id } = await params
    const { status } = await request.json()

    if (!status || !["active", "inactive"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    const subscriber = await Subscriber.findByIdAndUpdate(id, { status }, { new: true })

    if (!subscriber) {
      return NextResponse.json({ error: "Subscriber not found" }, { status: 404 })
    }

    return NextResponse.json(subscriber)
  } catch (error) {
    console.error("Update subscriber error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
