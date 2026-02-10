import Link from 'next/link';
import { auth, signOut } from '@/auth';

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-blue-400">
              DevCommunity
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link href="/posts" className="hover:text-blue-400 transition">
                Posts
              </Link>
              <Link href="/developers" className="hover:text-blue-400 transition">
                Developers
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {session?.user ? (
              <>
                <Link
                  href="/posts/new"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
                >
                  New Post
                </Link>
                <Link
                  href="/profile"
                  className="hover:text-blue-400 transition"
                >
                  Profile
                </Link>
                <form
                  action={async () => {
                    'use server';
                    await signOut({ redirectTo: '/' });
                  }}
                >
                  <button
                    type="submit"
                    className="hover:text-red-400 transition"
                  >
                    Sign Out
                  </button>
                </form>
              </>
            ) : (
              <Link
                href="/signin"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
