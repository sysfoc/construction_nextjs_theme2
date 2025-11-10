// lib/models/Subscriber.ts
import mongoose from "mongoose"

const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true },
)

subscriberSchema.index({ createdAt: -1 })

const Subscriber = mongoose.models.Subscriber || mongoose.model("Subscriber", subscriberSchema)
export default Subscriber
