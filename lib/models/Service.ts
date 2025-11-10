// lib/models/Service.ts
import mongoose from "mongoose"

const serviceSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["service", "button"],
      default: "service",
    },
    icon: String,
    title: String,
    subtitle: String,
    description: String,
    buttonText: String,
    buttonUrl: String,
  },
  { timestamps: true },
)

export default mongoose.models.Service || mongoose.model("Service", serviceSchema)
