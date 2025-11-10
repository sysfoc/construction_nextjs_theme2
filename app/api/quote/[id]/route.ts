// app/api/quote/[id]/route.ts
import Quote from "@/lib/models/Quote"
import { connectDB } from "@/lib/mongodb"
import { type NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB()
  const { id } = await params
  const { status } = await request.json()

  try {
    const updatedQuote = await Quote.findByIdAndUpdate(id, { status }, { new: true })
    if (!updatedQuote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 })
    }
    return NextResponse.json(updatedQuote)
  } catch (error) {
    console.error("Update quote error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB()
  const { id } = await params

  try {
    const deletedQuote = await Quote.findByIdAndDelete(id)
    if (!deletedQuote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 })
    }
    return NextResponse.json({ message: "Quote deleted successfully" })
  } catch (error) {
    console.error("Delete quote error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
