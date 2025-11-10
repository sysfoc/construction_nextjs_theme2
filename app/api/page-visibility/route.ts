import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import PageVisibility from "@/lib/models/PageVisibility"

export async function GET() {
  try {
    await connectDB()
    const pages = await PageVisibility.find({}).sort({ createdAt: -1 })
    return NextResponse.json(pages)
  } catch (error) {
    console.error("Get page visibility error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const data = await request.json()
    const newPage = await PageVisibility.create(data)
    return NextResponse.json(newPage)
  } catch (error) {
    console.error("Create page visibility error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
