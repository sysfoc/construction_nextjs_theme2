import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Partner from "@/lib/models/Partner"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()

    const { id } = await params
    const updateData = await request.json()

    const updatedPartner = await Partner.findByIdAndUpdate(id, updateData, { new: true })

    if (!updatedPartner) {
      return NextResponse.json({ error: "Partner not found" }, { status: 404 })
    }

    return NextResponse.json({
      id: updatedPartner._id,
      type: updatedPartner.type,
      name: updatedPartner.name,
      logo: updatedPartner.logo,
      statKey: updatedPartner.statKey,
      value: updatedPartner.value,
    })
  } catch (error) {
    console.error("Update partner error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()

    const { id } = await params

    const deletedPartner = await Partner.findByIdAndDelete(id)

    if (!deletedPartner) {
      return NextResponse.json({ error: "Partner not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Partner deleted successfully" })
  } catch (error) {
    console.error("Delete partner error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
