import mongoose, { Schema, type Document } from "mongoose"

export interface IFAQ extends Document {
  question: string
  answer: string
  showOnFAQPage: boolean
  createdAt: Date
  updatedAt: Date
}

const FAQSchema = new Schema<IFAQ>(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    showOnFAQPage: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
)

export const FAQ = mongoose.models.FAQ || mongoose.model<IFAQ>("FAQ", FAQSchema)
