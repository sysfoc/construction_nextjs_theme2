// app/api/auth/me/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/jwt';
import { connectDB } from '@/lib/mongodb';
import User from '@/lib/models/User';

export async function GET() {
  try {
    await connectDB();
    
    const token =  (await cookies()).get('token')?.value;

    if (!token) {
      return NextResponse.json({ user: null });
    }

    const payload = await verifyToken(token);

    if (!payload) {
      return NextResponse.json({ user: null });
    }

    const user = await User.findById(payload.userId);

    if (!user) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Me API error:', error);
    return NextResponse.json({ user: null });
  }
}
