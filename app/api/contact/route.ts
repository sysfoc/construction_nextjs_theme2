// app/api/contact/route.ts
import Contact from "@/lib/models/Contact"
import { connectDB } from "@/lib/mongodb"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  await connectDB()

  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")
  const search = searchParams.get("search")

  interface QueryFilter {
    status?: string
    $or?: Array<Record<string, { $regex: string; $options: string }>>
  }
  const query: QueryFilter = {}

  if (status && status !== "all") {
    query.status = status
  }

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { message: { $regex: search, $options: "i" } },
    ]
  }

  const messages = await Contact.find(query).sort({ createdAt: -1 })
  return NextResponse.json(messages)
}
