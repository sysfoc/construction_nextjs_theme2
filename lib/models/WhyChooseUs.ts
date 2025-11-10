import mongoose, { Schema, type Document } from "mongoose"

export interface IStep extends Document {
  _id: string
  title: string
  description: string
  iconSrc: string
  isReversed: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

const WhyChooseUsSchema = new Schema<IStep>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    iconSrc: {
      type: String,
      required: true,
    },
    isReversed: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true },
)

export default mongoose.models.WhyChooseUs || mongoose.model<IStep>("WhyChooseUs", WhyChooseUsSchema)
