'use client';

import { updateProfile } from '@/lib/actions/user.actions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ProfileFormProps {
  bio: string;
  skills: string;
  githubUrl: string;
  websiteUrl: string;
}

export default function ProfileForm({
  bio,
  skills,
  githubUrl,
  websiteUrl,
}: ProfileFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    try {
      await updateProfile(formData);
      alert('Profile updated successfully!');
      router.refresh();
    } catch (error: any) {
      alert(error.message || 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      action={handleSubmit}
      className="bg-white text-black rounded-lg shadow-md p-6 space-y-6"
    >
      <div>
        <label
          htmlFor="bio"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={4}
          defaultValue={bio}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Tell us about yourself..."
        />
      </div>

      <div>
        <label
          htmlFor="skills"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Skills (comma separated)
        </label>
        <input
          type="text"
          id="skills"
          name="skills"
          defaultValue={skills}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="JavaScript, React, Node.js"
        />
      </div>

      <div>
        <label
          htmlFor="githubUrl"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          GitHub URL
        </label>
        <input
          type="url"
          id="githubUrl"
          name="githubUrl"
          defaultValue={githubUrl}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://github.com/username"
        />
      </div>

      <div>
        <label
          htmlFor="websiteUrl"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Website URL
        </label>
        <input
          type="url"
          id="websiteUrl"
          name="websiteUrl"
          defaultValue={websiteUrl}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://yourwebsite.com"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
      >
        {isSubmitting ? 'Saving...' : 'Save Profile'}
      </button>
    </form>
  );
}
