// lib/models/Portfolio.ts
import mongoose from "mongoose"

const portfolioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    photos: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
)

export default mongoose.models.Portfolio || mongoose.model("Portfolio", portfolioSchema)
