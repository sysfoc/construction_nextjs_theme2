import mongoose, { Schema, type Document } from "mongoose"

export interface ITermsAndConditions extends Document {
  _id: string
  title: string
  content: string
  lastUpdated: Date
  createdAt: Date
  updatedAt: Date
}

const TermsAndConditionsSchema = new Schema<ITermsAndConditions>(
  {
    title: {
      type: String,
      required: true,
      default: "Terms and Conditions",
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

export default mongoose.models.TermsAndConditions ||
  mongoose.model<ITermsAndConditions>("TermsAndConditions", TermsAndConditionsSchema)
