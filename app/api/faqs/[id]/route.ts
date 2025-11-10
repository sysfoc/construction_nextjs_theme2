// app/api/faqs/[id]/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { FAQ } from "@/lib/models/FAQ"
import { connectDB } from "@/lib/mongodb"

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const body = await request.json()

    const { id } = await params

    const faq = await FAQ.findByIdAndUpdate(
      id,
      {
        question: body.question,
        answer: body.answer,
        showOnFAQPage: body.showOnFAQPage,
      },
      { new: true },
    )

    if (!faq) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 })
    }

    return NextResponse.json(faq)
  } catch (error) {
    console.error("Error updating FAQ:", error)
    return NextResponse.json({ error: "Failed to update FAQ" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()

    const { id } = await params

    const faq = await FAQ.findByIdAndDelete(id)

    if (!faq) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "FAQ deleted successfully" })
  } catch (error) {
    console.error("Error deleting FAQ:", error)
    return NextResponse.json({ error: "Failed to delete FAQ" }, { status: 500 })
  }
}
