import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/jwt"
import { connectDB } from "@/lib/mongodb"
import SEOMetadata from "@/lib/models/SEOMetadata"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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

    const { id } = await params
    const { title, description } = await request.json()

    const metadata = await SEOMetadata.findByIdAndUpdate(id, { title, description }, { new: true })

    if (!metadata) {
      return NextResponse.json({ error: "Metadata not found" }, { status: 404 })
    }

    return NextResponse.json(metadata)
  } catch (error) {
    console.error("Update SEO metadata error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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

    const { id } = await params

    const metadata = await SEOMetadata.findByIdAndDelete(id)

    if (!metadata) {
      return NextResponse.json({ error: "Metadata not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Metadata deleted successfully" })
  } catch (error) {
    console.error("Delete SEO metadata error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
