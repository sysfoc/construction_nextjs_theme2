import mongoose from "mongoose"

const newsletterSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    sentAt: {
      type: Date,
      default: Date.now,
    },
    recipientCount: { 
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
)

newsletterSchema.index({ sentAt: -1 })

const Newsletter = mongoose.models.Newsletter || mongoose.model("Newsletter", newsletterSchema)
export default Newsletter