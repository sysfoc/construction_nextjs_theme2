import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import PrivacyPolicy from "@/lib/models/PrivacyPolicy"

export async function GET() {
  try {
    await connectDB()
    let privacyPolicy = await PrivacyPolicy.findOne()

    if (!privacyPolicy) {
      privacyPolicy = await PrivacyPolicy.create({
        title: "Privacy Policy",
        content: "Add your privacy policy here.",
      })
    }

    return NextResponse.json({
      _id: privacyPolicy._id,
      title: privacyPolicy.title,
      content: privacyPolicy.content,
      lastUpdated: privacyPolicy.lastUpdated,
    })
  } catch (error) {
    console.error("Get privacy policy error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB()

    const { title, content } = await request.json()

    let privacyPolicy = await PrivacyPolicy.findOne()

    if (!privacyPolicy) {
      privacyPolicy = await PrivacyPolicy.create({
        title,
        content,
        lastUpdated: new Date(),
      })
    } else {
      privacyPolicy.title = title
      privacyPolicy.content = content
      privacyPolicy.lastUpdated = new Date()
      await privacyPolicy.save()
    }

    return NextResponse.json({
      _id: privacyPolicy._id,
      title: privacyPolicy.title,
      content: privacyPolicy.content,
      lastUpdated: privacyPolicy.lastUpdated,
    })
  } catch (error) {
    console.error("Update privacy policy error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
