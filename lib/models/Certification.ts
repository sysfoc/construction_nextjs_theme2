import mongoose, { Schema, type Document } from "mongoose"

export interface ICertification extends Document {
  _id: string
  title: string
  description: string
  image: string | null
  order: number
  createdAt: Date
  updatedAt: Date
}

const CertificationSchema = new Schema<ICertification>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    order: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
)

export default mongoose.models.Certification || mongoose.model<ICertification>("Certification", CertificationSchema)
