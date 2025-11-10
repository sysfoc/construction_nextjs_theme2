import mongoose from "mongoose"

const gallerySchema = new mongoose.Schema(
  {
    categories: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          default: () => new mongoose.Types.ObjectId(),
        },
        name: {
          type: String,
          required: true,
        },
      },
    ],
    images: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          default: () => new mongoose.Types.ObjectId(),
        },
        categoryId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        src: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          enum: ["photo", "video"],
          default: "photo",
        },
      },
    ],
  },
  { timestamps: true },
)

const Gallery = mongoose.models.Gallery || mongoose.model("Gallery", gallerySchema)

export default Gallery

export interface GalleryCategory {
  _id: string
  name: string
}

export interface GalleryImage {
  _id: string
  categoryId: string
  src: string
  type: "photo" | "video"
}

export interface GalleryData {
  _id: string
  categories: GalleryCategory[]
  images: GalleryImage[]
  createdAt: string
  updatedAt: string
}
