import { Metadata } from 'next';
import PostsList from '@/components/PostsList';

export const metadata: Metadata = {
  title: 'Community Posts - DevCommunity',
  description: 'Browse posts from developers in our community',
};

export default function PostsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Community Posts</h1>
        <p className="text-gray-600">Discover what developers are sharing</p>
      </div>
      <PostsList />
    </div>
  );
}
