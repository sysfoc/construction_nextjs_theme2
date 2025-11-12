import mongoose, { Schema, type Document } from "mongoose"

export interface IPrivacyPolicy extends Document {
  _id: string
  title: string
  content: string
  lastUpdated: Date
  createdAt: Date
  updatedAt: Date
}

const PrivacyPolicySchema = new Schema<IPrivacyPolicy>(
  {
    title: {
      type: String,
      required: true,
      default: "Privacy Policy",
    },
    content: {
      type: String,
      required: true,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
)

export default mongoose.models.PrivacyPolicy || mongoose.model<IPrivacyPolicy>("PrivacyPolicy", PrivacyPolicySchema)
