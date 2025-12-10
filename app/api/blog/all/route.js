// app/api/blog/all/route.js
import { NextResponse } from "next/server"
import { connectDB } from "../../../../lib/mongodb"
import Blog from "../../../../lib/models/blog.model"

export async function GET() {
  await connectDB()
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 })
    if (!blogs) {
      return NextResponse.json({ message: "No blogs found" }, { status: 404 })
    }
    return NextResponse.json({ blogs }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
