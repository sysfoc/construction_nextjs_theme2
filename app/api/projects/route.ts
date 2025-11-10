// app/api/projects/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Project from "@/lib/models/Project"

export async function GET() {
  try {
    await connectDB()
    const projects = await Project.find({}).sort({ createdAt: -1 })

    return NextResponse.json(projects)
  } catch (error) {
    console.error("Get projects error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const projectData = await request.json()
    const newProject = await Project.create(projectData)

    return NextResponse.json(newProject)
  } catch (error) {
    console.error("Create project error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
