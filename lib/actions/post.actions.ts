'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import Post from '@/models/Post';
import { auth } from '@/auth';

export async function createPost(formData: FormData) {
  const session = await auth();
  
  if (!session?.user) {
    throw new Error('You must be signed in to create a post');
  }

  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const tagsString = formData.get('tags') as string;
  const tags = tagsString ? tagsString.split(',').map(tag => tag.trim()) : [];

  if (!title || !content) {
    throw new Error('Title and content are required');
  }

  await connectDB();

  const post = await Post.create({
    title,
    content,
    tags,
    author: session.user.id,
  });

  revalidatePath('/posts');
  redirect(`/posts/${post._id}`);
}

export async function updatePost(postId: string, formData: FormData) {
  const session = await auth();
  
  if (!session?.user) {
    throw new Error('You must be signed in to update a post');
  }

  await connectDB();

  const post = await Post.findById(postId);

  if (!post) {
    throw new Error('Post not found');
  }

  if (post.author.toString() !== session.user.id) {
    throw new Error('You can only edit your own posts');
  }

  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const tagsString = formData.get('tags') as string;
  const tags = tagsString ? tagsString.split(',').map(tag => tag.trim()) : [];

  post.title = title;
  post.content = content;
  post.tags = tags;
  post.updatedAt = new Date();

  await post.save();

  revalidatePath(`/posts/${postId}`);
  revalidatePath('/posts');
  redirect(`/posts/${postId}`);
}

export async function deletePost(postId: string) {
  const session = await auth();
  
  if (!session?.user) {
    throw new Error('You must be signed in to delete a post');
  }

  await connectDB();

  const post = await Post.findById(postId);

  if (!post) {
    throw new Error('Post not found');
  }

  if (post.author.toString() !== session.user.id) {
    throw new Error('You can only delete your own posts');
  }

  await Post.findByIdAndDelete(postId);

  revalidatePath('/posts');
  redirect('/posts');
}
