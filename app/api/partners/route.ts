import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Partner from "@/lib/models/Partner"

export async function GET() {
  try {
    await connectDB()
    const partners = await Partner.find({}).sort({ createdAt: -1 })

    const stats = partners.filter((p) => p.type === "stat" && p.value)
    const partnersList = partners.filter((p) => p.type === "partner")

    return NextResponse.json({
      stats: stats.map((stat) => ({
        id: stat._id,
        statKey: stat.statKey,
        value: stat.value,
      })),
      partners: partnersList.map((partner) => ({
        id: partner._id,
        name: partner.name,
        logo: partner.logo,
      })),
    })
  } catch (error) {
    console.error("Get partners error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const data = await request.json()
    const newPartner = await Partner.create(data)

    return NextResponse.json({
      id: newPartner._id,
      type: newPartner.type,
      name: newPartner.name,
      logo: newPartner.logo,
      statKey: newPartner.statKey,
      value: newPartner.value,
    })
  } catch (error) {
    console.error("Create partner error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
