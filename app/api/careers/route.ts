// app/api/careers/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Career from "@/lib/models/Career"

export async function GET() {
  try {
    await connectDB()
    const jobs = await Career.find({}).sort({ createdAt: -1 })

    return NextResponse.json({
      jobs: jobs.map((job) => ({
        id: job._id,
        title: job.title,
        description: job.description,
        location: job.location,
        deadline: job.deadline,
        jobType: job.jobType,
        payRange: job.payRange,
        image: job.image,
      })),
    })
  } catch (error) {
    console.error("Get jobs error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const jobData = await request.json()
    const newJob = await Career.create(jobData)

    return NextResponse.json({
      job: {
        id: newJob._id,
        title: newJob.title,
        description: newJob.description,
        location: newJob.location,
        deadline: newJob.deadline,
        jobType: newJob.jobType,
        payRange: newJob.payRange,
        image: newJob.image,
      },
    })
  } catch (error) {
    console.error("Create job error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
