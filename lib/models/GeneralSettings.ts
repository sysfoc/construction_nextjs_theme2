import mongoose from "mongoose"

const generalSettingsSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    officeHours: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      default: null,
    },
    socialLinks: [
      {
        platform: String,
        url: String,
      },
    ],
  },
  { timestamps: true },
)

const GeneralSettings = mongoose.models.GeneralSettings || mongoose.model("GeneralSettings", generalSettingsSchema)

export default GeneralSettings

export interface SocialLink {
  platform: string
  url: string
}

export interface GeneralSettingsData {
  _id: string
  companyName: string
  address: string
  phone: string
  email: string
  officeHours: string
  logo: string | null
  socialLinks: SocialLink[]
  createdAt: string
  updatedAt: string
}
