// app/api/subscribers/route.ts
import Subscriber from "@/lib/models/Subscriber"
import { connectDB } from "@/lib/mongodb"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const search = searchParams.get("search")

    interface QueryFilter {
      status?: string
      $or?: Array<{ email: { $regex: string; $options: string } }>
    }

    const query: QueryFilter = {}

    if (status) {
      query.status = status
    }

    if (search) {
      query.$or = [{ email: { $regex: search, $options: "i" } }]
    }

    const subscribers = await Subscriber.find(query).sort({ createdAt: -1 })

    return NextResponse.json(subscribers)
  } catch (error) {
    console.error("Get subscribers error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    await Subscriber.findByIdAndDelete(id)

    return NextResponse.json({ success: true, message: "Subscriber deleted" })
  } catch (error) {
    console.error("Delete subscriber error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
