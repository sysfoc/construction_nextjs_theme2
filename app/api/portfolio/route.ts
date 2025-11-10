// app/api/portfolio/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/jwt"
import { connectDB } from "@/lib/mongodb"
import Portfolio from "@/lib/models/Portfolio"

export async function GET() {
  try {
    await connectDB()
    const projects = await Portfolio.find({}).sort({ createdAt: -1 })

    return NextResponse.json({
      projects: projects.map((p) => ({
        id: p._id,
        title: p.title,
        category: p.category,
        photos: p.photos,
      })),
    })
  } catch (error) {
    console.error("Get portfolio error:", error)
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

    const projectData = await request.json()
    const newProject = await Portfolio.create(projectData)

    return NextResponse.json({
      project: {
        id: newProject._id,
        title: newProject.title,
        category: newProject.category,
        photos: newProject.photos,
      },
    })
  } catch (error) {
    console.error("Create portfolio error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
