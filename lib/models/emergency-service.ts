// lib/models/emergency-service.ts
import mongoose, { Schema, type Document } from "mongoose"

export interface IGlobalSettings {
  emergencyEmail: string
  emergencyPhone: string
}

export interface IService {
  _id?: string
  title: string
  slug: string
  description?: string
  image: string
  calloutPrice: number
  price: number
  responseTime: string
  whatWeHelpWith: string[]
}

export interface IEmergencyServiceConfig extends Document {
  globalSettings: IGlobalSettings
  services: IService[]
  createdAt: Date
  updatedAt: Date
}

const GlobalSettingsSchema = new Schema<IGlobalSettings>({
  emergencyEmail: {
    type: String,
    required: true,
  },
  emergencyPhone: {
    type: String,
    required: true,
  },
})

const ServiceSchema = new Schema<IService>({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  calloutPrice: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  responseTime: {
    type: String,
    required: true,
  },
  whatWeHelpWith: {
    type: [String],
    required: true,
  },
})

const EmergencyServiceConfigSchema = new Schema<IEmergencyServiceConfig>(
  {
    globalSettings: {
      type: GlobalSettingsSchema,
      required: true,
      default: {
        emergencyEmail: "",
        emergencyPhone: "",
      },
    },
    services: {
      type: [ServiceSchema],
      default: [],
    },
  },
  { timestamps: true },
)

export const EmergencyServiceConfig =
  mongoose.models.EmergencyServiceConfig ||
  mongoose.model<IEmergencyServiceConfig>("EmergencyServiceConfig", EmergencyServiceConfigSchema)
