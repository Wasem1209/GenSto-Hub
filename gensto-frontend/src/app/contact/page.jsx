'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  //  State for success message
  const [success, setSuccess] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // stop page reload
    setSuccess(true);

    //  Hide success message after 3 seconds
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };

  return (
    <section className="bg-gray-50 mt-8 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/*  Page Heading */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Contact Us</h1>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Have questions, suggestions, or want to work with us? Get in touch using the form below or reach us through our contact details.
          </p>
        </div>

        {/*  Show Success Alert */}
        {success && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg text-center">
            Message sent successfully!
          </div>
        )}

        {/*  Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Send Us a Message</h2>

            {/*  Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 font-medium">Full Name</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  required
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  required
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+234 800 000 0000"
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Title</label>
                <input
                  type="text"
                  placeholder="Subject or title"
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Message</label>
                <textarea
                  placeholder="Type your message..."
                  rows="5"
                  required
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              {/* Send Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info Section */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Mail className="text-blue-600 w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Email Us</h3>
                <p className="text-gray-600">genstohub1@gmail.com</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Phone className="text-green-600 w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Call Us</h3>
                <p className="text-gray-600">+234 7061065498</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 flex items-start space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <MapPin className="text-purple-600 w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Location</h3>
                <p className="text-gray-600">Abuja, Nigeria</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}