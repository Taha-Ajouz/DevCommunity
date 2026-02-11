'use server';

import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { auth } from '@/auth';

export async function updateProfile(formData: FormData) {
  const session = await auth();
  
  if (!session?.user?.email) {
    throw new Error('You must be signed in to update your profile');
  }

  const bio = formData.get('bio') as string;
  const skillsString = formData.get('skills') as string;
  const skills = skillsString ? skillsString.split(',').map(skill => skill.trim()) : [];
  const githubUrl = formData.get('githubUrl') as string;
  const websiteUrl = formData.get('websiteUrl') as string;

  await connectDB();

  const user = await User.findOne({ email: session.user.email });

  if (!user) {
    throw new Error('User not found');
  }

  user.bio = bio || user.bio;
  user.skills = skills.length > 0 ? skills : user.skills;
  user.githubUrl = githubUrl || user.githubUrl;
  user.websiteUrl = websiteUrl || user.websiteUrl;

  await user.save();

  revalidatePath('/profile');
  revalidatePath(`/developers/${user._id}`);
  
  return { success: true };
}
