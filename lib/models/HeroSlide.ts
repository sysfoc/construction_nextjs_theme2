// lib/models/HeroSlide.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IHeroSlide extends Document {
  image: string;
  heading: string;
  buttonText: string;
  buttonUrl: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const HeroSlideSchema = new Schema<IHeroSlide>(
  {
    image: {
      type: String,
      required: true,
    },
    heading: {
      type: String,
      required: true,
      trim: true,
    },
    buttonText: {
      type: String,
      required: true,
      trim: true,
    },
    buttonUrl: {
      type: String,
      required: true,
      trim: true,
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

HeroSlideSchema.index({ order: 1 });

export default mongoose.models.HeroSlide || mongoose.model<IHeroSlide>('HeroSlide', HeroSlideSchema);