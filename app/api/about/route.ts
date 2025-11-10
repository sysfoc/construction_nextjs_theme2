import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import AboutPage from "@/lib/models/AboutPage"

export async function GET() {
  try {
    await connectDB()
    const aboutPage = await AboutPage.findOne({})

    if (!aboutPage) {
      return NextResponse.json({
        hero: {
          heading: "",
          image: "",
          paragraph: "",
          subheadings: [
            { title: "", description: "" },
            { title: "", description: "" },
            { title: "", description: "" },
          ],
          buttonText: "",
          buttonUrl: "",
        },
        whatWeDo: {
          firstHeading: "",
          firstSteps: [],
          secondHeading: "",
          secondSteps: [],
        },
        services: { services: [] },
      })
    }

    return NextResponse.json(aboutPage)
  } catch (error) {
    console.error("Error fetching about page:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const data = await request.json()

    let aboutPage = await AboutPage.findOne({})

    if (aboutPage) {
      aboutPage = await AboutPage.findByIdAndUpdate(aboutPage._id, data, { new: true })
    } else {
      aboutPage = await AboutPage.create(data)
    }

    return NextResponse.json(aboutPage)
  } catch (error) {
    console.error("Error updating about page:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
