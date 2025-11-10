import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import JobApplication from "@/lib/models/JobApplication"
import { sendEmail } from "@/lib/email/mailer"
import { jobApplicationTemplate } from "@/lib/email/templates"

export async function GET() {
  try {
    await connectDB()
    const applications = await JobApplication.find({}).sort({ createdAt: -1 })

    return NextResponse.json({
      applications: applications.map((app) => ({
        id: app._id,
        firstName: app.firstName,
        lastName: app.lastName,
        email: app.email,
        location: app.location,
        phone: app.phone,
        position: app.position,
        cv: app.cv,
        coverLetter: app.coverLetter,
        status: app.status,
        createdAt: app.createdAt,
      })),
    })
  } catch (error) {
    console.error("Get applications error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const applicationData = await request.json()
    const newApplication = await JobApplication.create(applicationData)

    const emailHtml = jobApplicationTemplate(
      newApplication.firstName,
      newApplication.lastName,
      newApplication.email,
      newApplication.position,
      newApplication.phone,
    )
    await sendEmail("sysfoc@gmail.com", "New Job Application", emailHtml)

    return NextResponse.json({
      application: {
        id: newApplication._id,
        firstName: newApplication.firstName,
        lastName: newApplication.lastName,
        email: newApplication.email,
        location: newApplication.location,
        phone: newApplication.phone,
        position: newApplication.position,
        cv: newApplication.cv,
        coverLetter: newApplication.coverLetter,
        status: newApplication.status,
      },
    })
  } catch (error) {
    console.error("Create application error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
