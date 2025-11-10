import { connectDB } from "@/lib/mongodb"
import WhyChooseUs from "@/lib/models/WhyChooseUs"
import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    await connectDB()
    const steps = await WhyChooseUs.find().sort({ order: 1 })
    return NextResponse.json(steps)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch steps" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    const step = new WhyChooseUs(body)
    await step.save()
    return NextResponse.json(step, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create step" }, { status: 500 })
  }
}
