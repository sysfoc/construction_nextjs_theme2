// app/api/blog/delete/[slug]/route.js
import { connectDB } from "../../../../../lib/mongodb"
import Blog from "../../../../../lib/models/blog.model"
import { NextResponse } from "next/server"

export async function DELETE(req, { params }) {
  const { slug } = await params

  await connectDB()

  try {
    const blog = await Blog.findOneAndDelete({ slug })
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 })
    }
    return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
