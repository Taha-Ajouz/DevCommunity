import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Post from '@/models/Post';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    await connectDB();
    const user = await User.findById(params.id);
    
    if (!user) {
      return {
        title: 'Developer Not Found',
      };
    }

    return {
      title: `${user.name} - DevCommunity`,
      description: user.bio || `View ${user.name}'s profile on DevCommunity`,
    };
  } catch {
    return {
      title: 'Developer Not Found',
    };
  }
}

export default async function DeveloperProfilePage({ params }: { params: { id: string } }) {
  await connectDB();
  
  const user = await User.findById(params.id);
  if (!user) {
    notFound();
  }

  const posts = await Post.find({ author: params.id }).sort({ createdAt: -1 });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div className="flex items-start gap-6">
          {user.image && (
            <Image
              src={user.image}
              alt={user.name}
              width={120}
              height={120}
              className="rounded-full"
            />
          )}
          
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{user.name}</h1>
            <p className="text-gray-600 mb-4">{user.email}</p>
            
            {user.bio && (
              <p className="text-gray-700 mb-4">{user.bio}</p>
            )}

            {user.skills && user.skills.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              {user.githubUrl && (
                <a
                  href={user.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  GitHub →
                </a>
              )}
              {user.websiteUrl && (
                <a
                  href={user.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Website →
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Posts by {user.name}
        </h2>

        {posts.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">No posts yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <article key={post._id.toString()} className="bg-white rounded-lg shadow-md p-6">
                <Link href={`/posts/${post._id}`}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-gray-600 mb-4 line-clamp-2">{post.content}</p>
                <p className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
