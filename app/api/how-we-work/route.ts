import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/jwt"
import { connectDB } from "@/lib/mongodb"
import HowWeWork from "@/lib/models/HowWeWork"

export async function GET() {
  try {
    await connectDB()
    const steps = await HowWeWork.find({}).sort({ step: 1 })

    return NextResponse.json({
      steps: steps.map((s) => ({
        _id: s._id,
        step: s.step,
        title: s.title,
        description: s.description,
        imgSrc: s.imgSrc,
      })),
    })
  } catch (error) {
    console.error("Get how-we-work error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const token = (await cookies()).get("token")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = await verifyToken(token)

    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const stepData = await request.json()

    // Get the next step number
    const lastStep = await HowWeWork.findOne({}).sort({ step: -1 })
    const nextStep = lastStep ? lastStep.step + 1 : 1

    const newStep = await HowWeWork.create({
      ...stepData,
      step: nextStep,
    })

    return NextResponse.json({
      step: {
        _id: newStep._id,
        step: newStep.step,
        title: newStep.title,
        description: newStep.description,
        imgSrc: newStep.imgSrc,
      },
    })
  } catch (error) {
    console.error("Create how-we-work error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
