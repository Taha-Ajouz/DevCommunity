import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import ProfileForm from '@/components/ProfileForm';

export const metadata: Metadata = {
  title: 'My Profile - DevCommunity',
  description: 'Edit your developer profile',
};

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/signin');
  }

  await connectDB();
  const user = await User.findOne({ email: session.user.email });

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Edit Your Profile</h1>
      <ProfileForm
        bio={user.bio || ''}
        skills={user.skills?.join(', ') || ''}
        githubUrl={user.githubUrl || ''}
        websiteUrl={user.websiteUrl || ''}
      />
    </div>
  );
}
