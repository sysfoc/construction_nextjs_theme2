// lib/models/BookService.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBooking extends Document {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: Date;
  details: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true },
    service: {
      type: String,
      required: true,
      enum: [
        "Residential Construction",
        "Commercial Renovation",
        "Site Inspection",
        "Material Supply",
        "Custom Project",
      ],
    },
    date: { type: Date, required: true },
    details: { type: String, required: true },
  },
  { timestamps: true }
);

const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", bookingSchema);

export default Booking;
