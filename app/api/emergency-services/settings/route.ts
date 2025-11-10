// app/api/emergency-services/settings/route.ts

import { connectDB } from "@/lib/mongodb"
import { EmergencyServiceConfig } from "@/lib/models/emergency-service"
import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    await connectDB()
    let config = await EmergencyServiceConfig.findOne({})

    if (!config) {
      config = await EmergencyServiceConfig.create({
        globalSettings: { emergencyEmail: "", emergencyPhone: "" },
        services: [],
      })
    }

    return NextResponse.json(config.globalSettings)
  } catch (error) {
    console.error("[v0] Error fetching settings:", error)
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const { emergencyEmail, emergencyPhone } = await request.json()

    let config = await EmergencyServiceConfig.findOne({})
    if (!config) {
      config = await EmergencyServiceConfig.create({
        globalSettings: { emergencyEmail, emergencyPhone },
        services: [],
      })
    } else {
      config.globalSettings.emergencyEmail = emergencyEmail
      config.globalSettings.emergencyPhone = emergencyPhone
      await config.save()
    }

    return NextResponse.json(config.globalSettings)
  } catch (error) {
    console.error("[v0] Error updating settings:", error)
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
  }
}
