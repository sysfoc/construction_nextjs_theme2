import mongoose from "mongoose"

const partnerSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["partner", "stat"],
      required: true,
    },
    // For partners
    name: {
      type: String,
      default: null,
    },
    logo: {
      type: String,
      default: null,
    },
    // For stats
    statKey: {
      type: String,
      enum: ["activePartnerships", "projectValue", "safetyCompliance"],
      default: null,
    },
    value: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
)

export default mongoose.models.Partner || mongoose.model("Partner", partnerSchema)
