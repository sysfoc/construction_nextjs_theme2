import mongoose from "mongoose"

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default: null,
    },
    comment: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    stars: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true },
)

export default mongoose.models.Testimonial || mongoose.model("Testimonial", testimonialSchema)
