// app/api/general-settings/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import GeneralSettings from "@/lib/models/GeneralSettings"

export async function GET() {
  try {
    await connectDB()
    const settings = await GeneralSettings.findOne({})

    if (!settings) {
      return NextResponse.json({ settings: null })
    }

    return NextResponse.json({
      settings: {
        _id: settings._id,
        companyName: settings.companyName,
        address: settings.address,
        phone: settings.phone,
        email: settings.email,
        officeHours: settings.officeHours,
        logo: settings.logo,
        socialLinks: settings.socialLinks || [],
      },
    })
  } catch (error) {
    console.error("Get general settings error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const settingsData = await request.json()

    const settings = await GeneralSettings.findOneAndUpdate({}, settingsData, { upsert: true, new: true })

    return NextResponse.json({
      settings: {
        _id: settings._id,
        companyName: settings.companyName,
        address: settings.address,
        phone: settings.phone,
        email: settings.email,
        officeHours: settings.officeHours,
        logo: settings.logo,
        facebook: settings.facebook,
        twitter: settings.twitter,
        instagram: settings.instagram,
        linkedin: settings.linkedin,
        youtube: settings.youtube,
      },
    })
  } catch (error) {
    console.error("Update general settings error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
