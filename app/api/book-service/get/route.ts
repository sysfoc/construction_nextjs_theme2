// app/api/book-service/get/route.ts
import Booking from "@/lib/models/BookService";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const bookings = await Booking.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch bookings"},
      { status: 500 }
    );
  }
}