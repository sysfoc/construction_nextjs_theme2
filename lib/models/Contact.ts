// lib/models/Contact.ts
import mongoose from "mongoose"

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "replied"],
      default: "pending",
    },
  },
  { timestamps: true },
)

contactSchema.index({ createdAt: -1 })

const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema)
export default Contact
