import { type NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"
import Certification from "@/lib/models/Certification"

const MONGODB_URI = process.env.MONGODB_URI

async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return
  }
  await mongoose.connect(MONGODB_URI!)
}

export async function GET() {
  try {
    await connectDB()
    const certifications = await Certification.find().sort({ order: 1 })
    return NextResponse.json(certifications)
  } catch (error) {
    console.error("Error fetching certifications:", error)
    return NextResponse.json({ error: "Failed to fetch certifications" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { title, description, image } = body

    const maxOrder = await Certification.findOne().sort({ order: -1 })
    const newOrder = maxOrder ? maxOrder.order + 1 : 1

    const certification = new Certification({
      title,
      description,
      image: image || null,
      order: newOrder,
    })

    await certification.save()
    return NextResponse.json(certification, { status: 201 })
  } catch (error) {
    console.error("Error creating certification:", error)
    return NextResponse.json({ error: "Failed to create certification" }, { status: 500 })
  }
}
