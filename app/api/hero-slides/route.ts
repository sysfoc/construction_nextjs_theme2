// app/api/hero-slides/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/jwt';
import { connectDB } from '@/lib/mongodb';
import HeroSlide from '@/lib/models/HeroSlide';

export async function GET() {
  try {
    await connectDB();
    
    const slides = await HeroSlide.find({}).sort({ order: 1 });
    
    return NextResponse.json({ 
      slides: slides.map(slide => ({
        id: slide._id.toString(),
        image: slide.image,
        heading: slide.heading,
        buttonText: slide.buttonText,
        buttonUrl: slide.buttonUrl,
        order: slide.order,
      }))
    });
  } catch (error) {
    console.error('Get hero slides error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const token = (await cookies()).get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await verifyToken(token);

    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const data = await request.json();
    
    if (!data.image || !data.heading || !data.buttonText || !data.buttonUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const slideCount = await HeroSlide.countDocuments();
    
    const newSlide = await HeroSlide.create({
      image: data.image,
      heading: data.heading,
      buttonText: data.buttonText,
      buttonUrl: data.buttonUrl,
      order: slideCount,
    });

    return NextResponse.json({ 
      slide: {
        id: newSlide._id.toString(),
        image: newSlide.image,
        heading: newSlide.heading,
        buttonText: newSlide.buttonText,
        buttonUrl: newSlide.buttonUrl,
        order: newSlide.order,
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Create hero slide error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}