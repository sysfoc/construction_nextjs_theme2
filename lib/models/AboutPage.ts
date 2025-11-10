import mongoose from "mongoose"

// Hero Section Schema
const heroSectionSchema = new mongoose.Schema({
  heading: String,
  image: String,
  paragraph: String,
  subheadings: [
    {
      title: String,
      description: String,
    },
  ],
  buttonText: String,
  buttonUrl: String,
})

// What We Do Section Schema
const whatWeDoSectionSchema = new mongoose.Schema({
  firstHeading: String,
  firstSteps: [String],
  secondHeading: String,
  secondSteps: [String],
})

// Service Item Schema
const serviceItemSchema = new mongoose.Schema({
  image: String,
  title: String,
  description: String,
  buttonText: String,
  buttonUrl: String,
})

// Services Section Schema
const servicesSectionSchema = new mongoose.Schema({
  services: [serviceItemSchema],
})

// Main About Page Schema
const aboutPageSchema = new mongoose.Schema(
  {
    hero: heroSectionSchema,
    whatWeDo: whatWeDoSectionSchema,
    services: servicesSectionSchema,
  },
  { timestamps: true },
)

export default mongoose.models.AboutPage || mongoose.model("AboutPage", aboutPageSchema)
