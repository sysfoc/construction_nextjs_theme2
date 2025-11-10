import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Testimonial from "@/lib/models/Testimonial"

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params 
    await connectDB()

    const testimonialData = await request.json()
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(id, testimonialData, { new: true })

    if (!updatedTestimonial) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 })
    }

    return NextResponse.json({
      testimonial: {
        id: updatedTestimonial._id,
        name: updatedTestimonial.name,
        designation: updatedTestimonial.designation,
        company: updatedTestimonial.company,
        location: updatedTestimonial.location,
        photo: updatedTestimonial.photo,
        comment: updatedTestimonial.comment,
        date: updatedTestimonial.date,
        stars: updatedTestimonial.stars,
      },
    })
  } catch (error) {
    console.error("Update testimonial error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params 
    await connectDB()

    const deletedTestimonial = await Testimonial.findByIdAndDelete(id)

    if (!deletedTestimonial) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete testimonial error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
