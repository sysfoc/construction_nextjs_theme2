import mongoose from "mongoose"

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    content: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true },
)

const News = mongoose.models.News || mongoose.model("News", newsSchema)

export default News

export interface NewsArticle {
  _id: string
  title: string
  slug: string
  excerpt: string
  date: string
  author: string
  image: string
  content: string[]
  createdAt: string
  updatedAt: string
}
