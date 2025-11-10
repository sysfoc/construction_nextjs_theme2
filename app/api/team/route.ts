// app/api/team/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Team from "@/lib/models/Team"

export async function GET() {
  try {
    await connectDB()
    const teamMembers = await Team.find({}).sort({ createdAt: -1 })

    return NextResponse.json({
      teamMembers: teamMembers.map((member) => ({
        id: member._id,
        name: member.name,
        designation: member.designation,
        photo: member.photo,
      })),
    })
  } catch (error) {
    console.error("Get team members error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const memberData = await request.json()
    const newMember = await Team.create(memberData)

    return NextResponse.json({
      teamMember: {
        id: newMember._id,
        name: newMember.name,
        designation: newMember.designation,
        photo: newMember.photo,
      },
    })
  } catch (error) {
    console.error("Create team member error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}