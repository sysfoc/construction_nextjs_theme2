// lib/models/Quote.ts means enquiries for quotes from users
import mongoose from "mongoose"

const quoteSchema = new mongoose.Schema(
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
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    details: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "completed"],
      default: "pending",
    },
  },
  { timestamps: true },
)

quoteSchema.index({ createdAt: -1 })

const Quote = mongoose.models.Quote || mongoose.model("Quote", quoteSchema)
export default Quote
