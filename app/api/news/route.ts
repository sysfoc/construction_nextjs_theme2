// app/api/news/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import News from "@/lib/models/News"

export async function GET() {
  try {
    await connectDB()
    const news = await News.find({}).sort({ createdAt: -1 })

    return NextResponse.json(
      news.map((article) => ({
        id: article._id,
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        date: article.date,
        author: article.author,
        image: article.image,
        content: article.content,
        createdAt: article.createdAt,
        updatedAt: article.updatedAt,
      })),
    )
  } catch (error) {
    console.error("Get news error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const newsData = await request.json()

    const { title, slug, excerpt, date, author, image, content } = newsData

    if (!title || !slug || !excerpt || !date || !author || !image || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newArticle = await News.create({
      title,
      slug,
      excerpt,
      date,
      author,
      image,
      content,
    })

    return NextResponse.json(
      {
        id: newArticle._id,
        slug: newArticle.slug,
        title: newArticle.title,
        excerpt: newArticle.excerpt,
        date: newArticle.date,
        author: newArticle.author,
        image: newArticle.image,
        content: newArticle.content,
        createdAt: newArticle.createdAt,
        updatedAt: newArticle.updatedAt,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create news error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
