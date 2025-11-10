// app/api/subscribers/subscribe/route.ts
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
    if (subscriber) {
      return NextResponse.json({ error: "Email already subscribed" }, { status: 400 })
    }
    await Subscriber.create({ email: email.trim() })
    return NextResponse.json({
      success: true,
      message: "Subscribed successfully",
    })
  } catch (error) {
    console.error("Subscribe error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
