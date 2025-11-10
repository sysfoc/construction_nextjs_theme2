import mongoose from "mongoose"

const seoMetadataSchema = new mongoose.Schema(
  {
    page: {
      type: String,
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
  },
  { timestamps: true },
)

const SEOMetadata = mongoose.models.SEOMetadata || mongoose.model("SEOMetadata", seoMetadataSchema)

export default SEOMetadata

export interface SEOMetadataData {
  _id: string
  page: string
  title: string
  description: string
  createdAt: string
  updatedAt: string
}
