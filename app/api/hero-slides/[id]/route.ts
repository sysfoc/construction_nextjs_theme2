// app/api/hero-slides/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/jwt';
import { connectDB } from '@/lib/mongodb';
import HeroSlide from '@/lib/models/HeroSlide';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
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
    const { id } = await params;

    if (!data.image || !data.heading || !data.buttonText || !data.buttonUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const updatedSlide = await HeroSlide.findByIdAndUpdate(
      id,
      {
        image: data.image,
        heading: data.heading,
        buttonText: data.buttonText,
        buttonUrl: data.buttonUrl,
      },
      { new: true }
    );

    if (!updatedSlide) {
      return NextResponse.json(
        { error: 'Slide not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      slide: {
        id: updatedSlide._id.toString(),
        image: updatedSlide.image,
        heading: updatedSlide.heading,
        buttonText: updatedSlide.buttonText,
        buttonUrl: updatedSlide.buttonUrl,
        order: updatedSlide.order,
      }
    });
  } catch (error) {
    console.error('Update hero slide error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
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

    const { id } = await params;

    const deletedSlide = await HeroSlide.findByIdAndDelete(id);

    if (!deletedSlide) {
      return NextResponse.json(
        { error: 'Slide not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      message: 'Slide deleted successfully' 
    });
  } catch (error) {
    console.error('Delete hero slide error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}