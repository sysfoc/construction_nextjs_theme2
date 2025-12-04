// lib/models/Project.ts
import mongoose from "mongoose"

const projectSchema = new mongoose.Schema(
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
    status: {
      type: String,
      enum: ["ongoing", "completed", "upcoming"],
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      default: null,
    },
    image: {
      type: String,
      required: true,
    },
    team: {
      type: Number,
      required: true,
    },
    progress: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
)

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema)

export default Project

export interface ProjectData {
  _id: string
  title: string
  description: string
  location: string
  status: "ongoing" | "completed" | "upcoming"
  startDate: string
  endDate?: string
  image: string
  team: number
  progress?: number
  createdAt: string
  updatedAt: string
}