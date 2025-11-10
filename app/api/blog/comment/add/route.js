import { connectDB } from "@/lib/mongodb";
import Blog from "@/lib/models/blog.model";
import { NextResponse } from "next/server";
export async function POST(req) {
  await connectDB();
  const { slug, fname, lname, email, comment } = await req.json();

  if (!slug || !fname || !lname || !email || !comment) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }
  try {
    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    blog.comments.push({ fname, lname, email, comment });

    await blog.save();

    return NextResponse.json(
      { message: "Comment added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
