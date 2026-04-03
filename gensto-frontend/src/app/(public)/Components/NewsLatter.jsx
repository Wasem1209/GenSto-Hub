'use client';
import { useState } from 'react';
import { REST_API } from '../../constant';
import { Loader2, CheckCircle2, X } from 'lucide-react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [showModal, setShowModal] = useState(false);

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
        setEmail(''); // Clear input
        setShowModal(true); // Trigger success modal
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
    <section className="bg-gray-100 text-gray-800 py-10 px-4 relative">
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

        {/* Inline Error Message (Success is now in the Modal) */}
        {message.type === 'error' && (
          <p className="mt-4 text-sm font-bold text-red-600 italic">
            {message.text}
          </p>
        )}
      </div>

      {/* Success Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center relative animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle2 size={48} className="text-green-600" />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-2">Awesome!</h3>
            <p className="text-gray-600 mb-6">
              Thanks for subscribing to our newsletter. You'll hear from us soon!
            </p>

            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default NewsletterSignup;