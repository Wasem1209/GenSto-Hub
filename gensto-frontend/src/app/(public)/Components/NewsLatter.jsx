'use client';
import { useState } from 'react';
import { REST_API } from '../../constant';
import { Loader2 } from 'lucide-react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const res = await fetch(`${REST_API}/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage({ text: data.msg, type: 'success' });
        setEmail(''); // Clear input
      } else {
        setMessage({ text: data.msg || 'Something went wrong', type: 'error' });
      }
    } catch (err) {
      setMessage({ text: 'Connection failed', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-100 text-gray-800 py-10 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="mb-6 text-sm md:text-base text-gray-600">
          Stay updated with the latest news, tips, and updates from our platform.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full sm:w-80 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium min-w-[120px] flex items-center justify-center"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Subscribe'}
          </button>
        </form>

        {message.text && (
          <p className={`mt-4 text-sm font-bold ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {message.text}
          </p>
        )}
      </div>
    </section>
  );
};

export default NewsletterSignup;