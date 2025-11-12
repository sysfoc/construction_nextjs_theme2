import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import TermsAndConditions from "@/lib/models/TermsAndConditions"

export async function GET() {
  try {
    await connectDB()
    let termsAndConditions = await TermsAndConditions.findOne()

    if (!termsAndConditions) {
      termsAndConditions = await TermsAndConditions.create({
        title: "Terms and Conditions",
        content: "Add your terms and conditions here.",
      })
    }

    return NextResponse.json({
      _id: termsAndConditions._id,
      title: termsAndConditions.title,
      content: termsAndConditions.content,
      lastUpdated: termsAndConditions.lastUpdated,
    })
  } catch (error) {
    console.error("Get terms and conditions error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB()

    const { title, content } = await request.json()

    let termsAndConditions = await TermsAndConditions.findOne()

    if (!termsAndConditions) {
      termsAndConditions = await TermsAndConditions.create({
        title,
        content,
        lastUpdated: new Date(),
      })
    } else {
      termsAndConditions.title = title
      termsAndConditions.content = content
      termsAndConditions.lastUpdated = new Date()
      await termsAndConditions.save()
    }

    return NextResponse.json({
      _id: termsAndConditions._id,
      title: termsAndConditions.title,
      content: termsAndConditions.content,
      lastUpdated: termsAndConditions.lastUpdated,
    })
  } catch (error) {
    console.error("Update terms and conditions error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
