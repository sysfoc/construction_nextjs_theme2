// app/api/newsletters/send/route.ts
import Newsletter from "@/lib/models/Newsletter"
import Subscriber from "@/lib/models/Subscriber"
import { connectDB } from "@/lib/mongodb"
import { sendNewsletter } from "@/lib/email/newletter/template"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const { subject, content } = await request.json()

    if (!subject || !content) {
      return NextResponse.json({ error: "Subject and content are required" }, { status: 400 })
    }

    const activeSubscribers = await Subscriber.find({ status: "active" })

    if (activeSubscribers.length === 0) {
      return NextResponse.json({ error: "No active subscribers to send to" }, { status: 400 })
    }

    let successCount = 0
    let failureCount = 0

    for (const subscriber of activeSubscribers) {
      try {
        await sendNewsletter(subscriber.email, subject, content)
        successCount++
      } catch (error) {
        console.error(`Failed to send to ${subscriber.email}:`, error)
        failureCount++
      }
    }

   await Newsletter.create({
  subject,
  content,
  sentAt: new Date(),
  recipientCount: activeSubscribers.length,
})

    return NextResponse.json({
      success: true,
      message: `Newsletter sent to ${successCount} subscribers`,
      successCount,
      failureCount,
      totalRecipients: activeSubscribers.length,
    })
  } catch (error) {
    console.error("Send newsletter error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
