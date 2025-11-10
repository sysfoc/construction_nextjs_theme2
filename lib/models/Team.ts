// lib/models/Team.ts
import mongoose, { Schema, model, models } from "mongoose"

export interface ITeam {
  name: string
  designation: string
  photo: string | null
  createdAt?: Date
  updatedAt?: Date
}

const TeamSchema = new Schema<ITeam>(
  {
    name: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
)

const Team = models.Team || model<ITeam>("Team", TeamSchema)

export default Team