// lib/models/PageVisibility.ts
import mongoose from "mongoose"

const pageVisibilitySchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
)

export default mongoose.models.PageVisibility || mongoose.model("PageVisibility", pageVisibilitySchema)
