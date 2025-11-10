import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/jwt"
import { connectDB } from "@/lib/mongodb"
import SEOMetadata from "@/lib/models/SEOMetadata"

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const page = searchParams.get("page")

    if (page) {
      const metadata = await SEOMetadata.findOne({ page })
      if (!metadata) {
        return NextResponse.json({ error: "Page not found" }, { status: 404 })
      }
      return NextResponse.json(metadata)
    }

    const allMetadata = await SEOMetadata.find({})
    return NextResponse.json(allMetadata)
  } catch (error) {
    console.error("Get SEO metadata error:", error)
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

    const { page, title, description } = await request.json()

    const metadata = await SEOMetadata.findOneAndUpdate(
      { page },
      { page, title, description },
      { upsert: true, new: true },
    )

    return NextResponse.json(metadata)
  } catch (error) {
    console.error("Create SEO metadata error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
