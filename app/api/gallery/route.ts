import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/jwt"
import { connectDB } from "@/lib/mongodb"
import Gallery from "@/lib/models/Gallery"
import mongoose from "mongoose"

export async function GET() {
  try {
    await connectDB()
    let gallery = await Gallery.findOne()

    if (!gallery) {
      gallery = new Gallery({
        categories: [],
        images: [],
      })
      await gallery.save()
    }

    return NextResponse.json({
      categories: gallery.categories,
      images: gallery.images,
    })
  } catch (error) {
    console.error("Error fetching gallery:", error)
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = (await cookies()).get("token")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = await verifyToken(token)

    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { action, data } = await request.json()
    await connectDB()

    let gallery = await Gallery.findOne()
    if (!gallery) {
      gallery = new Gallery({
        categories: [],
        images: [],
      })
    }

    if (action === "addCategory") {
      const newCategory = {
        _id: new mongoose.Types.ObjectId(),
        name: data.name,
      }
      gallery.categories.push(newCategory)
    } else if (action === "addImage") {
      const newImage = {
        _id: new mongoose.Types.ObjectId(),
        categoryId: data.categoryId,
        src: data.src,
        type: data.type || "photo",
      }
      gallery.images.push(newImage)
    }

    await gallery.save()
    return NextResponse.json({
      categories: gallery.categories,
      images: gallery.images,
    })
  } catch (error) {
    console.error("Error adding to gallery:", error)
    return NextResponse.json({ error: "Failed to add to gallery" }, { status: 500 })
  }
}
