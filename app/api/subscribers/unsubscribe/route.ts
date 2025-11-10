// app/api/subscribers/unsubscribe/route.ts
import Subscriber from "@/lib/models/Subscriber"
import { connectDB } from "@/lib/mongodb"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const { email } = await request.json()
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }
    const subscriber = await Subscriber.findOne({ email })
    if (!subscriber) {
      return NextResponse.json({ error: "We could not find your email" }, { status: 400 })
    }
    const deletedSubscriber = await Subscriber.deleteOne({
      email: email.trim(),
    })
    if (deletedSubscriber.deletedCount === 1) {
      return NextResponse.json({
        success: true,
        message: "Email Unsubscribed successfully",
      })
    } else {
      return NextResponse.json({ error: "Failed to unsubscribe" }, { status: 500 })
    }
  } catch (error) {
    console.error("Unsubscribe error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
