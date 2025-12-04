// app/api/projects/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Project from "@/lib/models/Project"

export async function GET() {
  try {
    await connectDB()
    const projects = await Project.find({}).sort({ createdAt: -1 })

    // Convert dates to ISO strings for frontend
    const formattedProjects = projects.map(project => ({
      ...project.toObject(),
      _id: project._id.toString(),
      startDate: project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : '',
      endDate: project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : null,
      createdAt: project.createdAt.toISOString(),
      updatedAt: project.updatedAt.toISOString(),
    }))

    return NextResponse.json(formattedProjects)
  } catch (error) {
    console.error("Get projects error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const projectData = await request.json()
    
    // Convert date strings to Date objects
    const processedData = {
      ...projectData,
      startDate: projectData.startDate ? new Date(projectData.startDate) : null,
      endDate: projectData.endDate ? new Date(projectData.endDate) : null,
    }

    const newProject = await Project.create(processedData)

    // Convert back to string format for response
    const responseProject = {
      ...newProject.toObject(),
      _id: newProject._id.toString(),
      startDate: newProject.startDate ? new Date(newProject.startDate).toISOString().split('T')[0] : '',
      endDate: newProject.endDate ? new Date(newProject.endDate).toISOString().split('T')[0] : null,
      createdAt: newProject.createdAt.toISOString(),
      updatedAt: newProject.updatedAt.toISOString(),
    }

    return NextResponse.json(responseProject)
  } catch (error) {
    console.error("Create project error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}