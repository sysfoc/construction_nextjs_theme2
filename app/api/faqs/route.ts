// app/api/faqs/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { FAQ } from "@/lib/models/FAQ"
import { connectDB } from "@/lib/mongodb"

export async function GET() {
  try {
    await connectDB()
    const faqs = await FAQ.find().sort({ createdAt: 1 })
    return NextResponse.json(faqs)
  } catch (error) {
    console.error("Error fetching FAQs:", error)
    return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()

    const faq = new FAQ({
      question: body.question,
      answer: body.answer,
      showOnFAQPage: body.showOnFAQPage || true,
    })

    await faq.save()
    return NextResponse.json(faq, { status: 201 })
  } catch (error) {
    console.error("Error creating FAQ:", error)
    return NextResponse.json({ error: "Failed to create FAQ" }, { status: 500 })
  }
}
