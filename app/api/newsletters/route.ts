// app/api/newsletters/route.ts
import Newsletter from "@/lib/models/Newsletter"
import Subscriber from "@/lib/models/Subscriber"
import { connectDB } from "@/lib/mongodb"
import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    await connectDB()
    const newsletters = await Newsletter.find().sort({ sentAt: -1 })

    return NextResponse.json(newsletters)
  } catch (error) {
    console.error("Error fetching newsletters:", error)
    return NextResponse.json({ error: "Failed to fetch newsletters" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const { subject, content } = await request.json()

    if (!subject || !content) {
      return NextResponse.json({ error: "Subject and content are required" }, { status: 400 })
    }

    const activeSubscribers = await Subscriber.find({ status: "active" })

    if (activeSubscribers.length === 0) {
      return NextResponse.json({ error: "No active subscribers" }, { status: 400 })
    }

   await Newsletter.create({
  subject,
  content,
  sentAt: new Date(),
  recipientCount: activeSubscribers.length,
})

    return NextResponse.json(
      { success: true, message: `Newsletter created for ${activeSubscribers.length} subscribers` },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating newsletter:", error)
    return NextResponse.json({ error: "Failed to create newsletter" }, { status: 500 })
  }
}
