import { type NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import News from "@/lib/models/News";

export async function GET(request: NextRequest, context: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await context.params; 
    await connectDB();
    const article = await News.findOne({ slug });

    if (!article) return NextResponse.json({ error: "Article not found" }, { status: 404 });

    return NextResponse.json(article);
  } catch (error) {
    console.error("Get article error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await context.params; 
    await connectDB();
    const updateData = await request.json();

    const article = await News.findOneAndUpdate({ slug }, updateData, { new: true });
    if (!article) return NextResponse.json({ error: "Article not found" }, { status: 404 });

    return NextResponse.json(article);
  } catch (error) {
    console.error("Update article error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await context.params;
    await connectDB();
    const article = await News.findOneAndDelete({ slug });

    if (!article) return NextResponse.json({ error: "Article not found" }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete article error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
