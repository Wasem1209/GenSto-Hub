
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { REST_API } from '../../../constant';

// Define the structure of your API constant to satisfy ESLint
interface ApiConstants {
  COMMENTS: string;
  [key: string]: string; // Allows for other endpoints like LOGIN, etc.
}

interface CommentFormData {
  name: string;
  comment: string;
}

export default function PostComment() {
  const router = useRouter();
  const [formData, setFormData] = useState<CommentFormData>({ name: '', comment: '' });
  const [loading, setLoading] = useState<boolean>(false);

  // Type assertion instead of 'any' to satisfy ESLint & TypeScript
  const apiEndpoints = REST_API as unknown as ApiConstants;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(apiEndpoints.COMMENTS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          comment: formData.comment,
        }),
      });

      if (res.ok) {
        router.push('/regular');
      }
    } catch (err) {
      console.error("Error posting comment:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 md:px-16 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-center mb-10">
        <span className="text-gray-900">Post a </span>
        <span className="text-blue-900">Com</span>
        <span className="text-blue-900">ment</span>
      </h2>

      <div className="w-full max-w-2xl bg-gray-100 p-6 md:p-10 rounded-3xl shadow-sm border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-900 font-semibold mb-2 ml-1">Full Name</label>
            <input
              type="text"
              required
              placeholder="Your Name..."
              className="w-full p-4 rounded-xl border-none outline-none focus:ring-2 focus:ring-blue-900 transition-all shadow-inner bg-white text-gray-800"
              value={formData.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-gray-900 font-semibold mb-2 ml-1">Your Experience</label>
            <textarea
              required
              rows={5}
              placeholder="How was your experience with GenSto Hub?"
              className="w-full p-4 rounded-xl border-none outline-none focus:ring-2 focus:ring-blue-900 transition-all shadow-inner resize-none bg-white text-gray-800"
              value={formData.comment}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => 
                setFormData({ ...formData, comment: e.target.value })
              }
            />
          </div>

          <div className="flex justify-center md:justify-start">
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-12 py-4 bg-blue-900 text-white font-bold rounded-2xl hover:bg-blue-800 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-md disabled:opacity-70"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Posting...</span>
                </>
              ) : (
                'Submit Comment'
              )}
            </button>
          </div>
        </form>

        {/* Live Preview Card */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">Live Card Preview</p>
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-50 transition-all min-h-[120px] flex flex-col justify-center">
            <h4 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-100 pb-2 px-2">
              {formData.name || 'Your Name'}
            </h4>
            <p className="text-gray-700 italic break-words leading-relaxed px-2">
              “{formData.comment || 'Type something to see your preview here...'}”
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}