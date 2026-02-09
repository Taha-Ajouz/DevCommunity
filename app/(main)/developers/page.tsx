import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export const metadata: Metadata = {
  title: 'Developers - DevCommunity',
  description: 'Browse developers in our community',
};

export default async function DevelopersPage() {
  await connectDB();
  const developers = await User.find().sort({ createdAt: -1 });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Developers</h1>
        <p className="text-gray-600">Connect with developers in our community</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {developers.map((developer) => (
          <Link
            key={developer._id.toString()}
            href={`/developers/${developer._id}`}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4 mb-4">
              {developer.image && (
                <Image
                  src={developer.image}
                  alt={developer.name}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              )}
              <div>
                <h3 className="text-xl font-bold text-gray-900">{developer.name}</h3>
                <p className="text-sm text-gray-500">{developer.email}</p>
              </div>
            </div>

            {developer.bio && (
              <p className="text-gray-600 mb-4 line-clamp-2">{developer.bio}</p>
            )}

            {developer.skills && developer.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {developer.skills.slice(0, 3).map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
                {developer.skills.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{developer.skills.length - 3} more
                  </span>
                )}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
