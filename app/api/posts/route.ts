import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Post from '@/models/Post';
import { auth } from '@/auth';

export async function GET() {
  try {
    await connectDB();
    const posts = await Post.find().populate('author', 'name image').sort({ createdAt: -1 });
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    const { title, content, tags } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content required' }, { status: 400 });
    }

    const post = await Post.create({
      title,
      content,
      tags: tags || [],
      author: session.user.id,
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
