// app/api/quote/route.ts
import Quote from "@/lib/models/Quote"
import { connectDB } from "@/lib/mongodb"
import { type NextRequest, NextResponse } from "next/server"

interface QueryFilter {
  status?: string
  $or?: Array<{
    name?: { $regex: string; $options: string }
    email?: { $regex: string; $options: string }
    phone?: { $regex: string; $options: string }
    details?: { $regex: string; $options: string }
  }>
}

export async function GET(request: NextRequest) {
  await connectDB()

  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")
  const search = searchParams.get("search")

  const query: QueryFilter = {}

  if (status && status !== "all") {
    query.status = status
  }

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
      { details: { $regex: search, $options: "i" } },
    ]
  }

  try {
    const quotes = await Quote.find(query).sort({ createdAt: -1 })
    return NextResponse.json(quotes)
  } catch (error) {
    console.error("Fetch quotes error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
