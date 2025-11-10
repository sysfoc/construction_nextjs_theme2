import mongoose from "mongoose"

const howWeWorkSchema = new mongoose.Schema(
  {
    step: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imgSrc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

const HowWeWork = mongoose.models.HowWeWork || mongoose.model("HowWeWork", howWeWorkSchema)

export default HowWeWork

export interface HowWeWorkData {
  _id: string
  step: number
  title: string
  description: string
  imgSrc: string
  createdAt: string
  updatedAt: string
}
