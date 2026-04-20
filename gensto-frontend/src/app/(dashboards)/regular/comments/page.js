'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { REST_API } from '@/constant';

export default function PostComment() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', comment: '' });
  const [loading, setLoading] = useState(false);

  //  React.FormEvent' type annotation to fix ts(8010)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(REST_API.COMMENTS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          comment: formData.comment,
          image: '/images/default-avatar.jpg'
        }),
      });

      if (res.ok) {
        // Redirecting back to the regular dashboard
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

      <div className="w-full max-w-2xl bg-gray-100 p-8 md:p-10 rounded-3xl shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-900 font-semibold mb-2">Full Name</label>
            <input
              type="text"
              required
              placeholder="Your Name..."
              className="w-full p-4 rounded-xl border-none outline-none focus:ring-2 focus:ring-blue-900 transition-all shadow-inner"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-gray-900 font-semibold mb-2">Your Experience</label>
            <textarea
              required
              rows={5}
              placeholder="Share your thoughts with the community..."
              className="w-full p-4 rounded-xl border-none outline-none focus:ring-2 focus:ring-blue-900 transition-all shadow-inner resize-none"
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto px-10 py-4 bg-blue-900 text-white font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-md"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-3 border-gray-300 border-t-white rounded-full animate-spin"></div>
                <span>Posting...</span>
              </>
            ) : (
              'Submit Comment'
            )}
          </button>
        </form>

        {/* Live Preview Card */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Preview</p>
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex items-center gap-4">
            <div className="relative w-12 h-12">
              <Image
                src="/images/default-avatar.jpg"
                alt="Preview Avatar"
                fill
                className="rounded-full object-cover grayscale opacity-50"
              />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">{formData.name || 'Your Name'}</h4>
              <p className="text-gray-700 italic">“{formData.comment || 'Your comment will appear here...'}”</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}