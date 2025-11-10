// app/api/testimonials/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Testimonial from "@/lib/models/Testimonial"

export async function GET() {
  try {
    await connectDB()
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 })

    return NextResponse.json({
      testimonials: testimonials.map((t) => ({
        id: t._id,
        name: t.name,
        designation: t.designation,
        company: t.company,
        location: t.location,
        photo: t.photo,
        comment: t.comment,
        date: t.date,
        stars: t.stars,
      })),
    })
  } catch (error) {
    console.error("Get testimonials error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const testimonialData = await request.json()

    const newTestimonial = await Testimonial.create(testimonialData)

    return NextResponse.json({
      testimonial: {
        id: newTestimonial._id,
        name: newTestimonial.name,
        designation: newTestimonial.designation,
        company: newTestimonial.company,
        location: newTestimonial.location,
        photo: newTestimonial.photo,
        comment: newTestimonial.comment,
        date: newTestimonial.date,
        stars: newTestimonial.stars,
      },
    })
  } catch (error) {
    console.error("Create testimonial error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
