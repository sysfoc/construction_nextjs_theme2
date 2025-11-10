import mongoose from "mongoose"

const careerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    deadline: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    payRange: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
)

const Career = mongoose.models.Career || mongoose.model("Career", careerSchema)

export default Career
