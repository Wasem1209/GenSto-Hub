'use client';

import { Mail, MessageCircle, Users, Lightbulb, Handshake } from 'lucide-react';


export default function CollaborationPage() {
  return (
    <section className="bg-gray-50 py-16 mt-8 px-4 sm:px-6 md:px-10 lg:px-16">
      <div className="max-w-6xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Collaborate With GenSto Hub
          </h1>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto text-sm sm:text-base md:text-lg">
            At <strong>GenSto Hub</strong>, we believe in the power of collaboration. Whether you're an individual,
            an organization, or a tech innovator, there’s always an opportunity to work together.
            Let’s build meaningful partnerships that drive <strong>technology, education, and innovation forward</strong>.
          </p>

        </div>



        {/*  Why Collaborate Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300">
            <Users className="w-12 h-12 mx-auto text-blue-600" />
            <h3 className="text-lg font-semibold mt-4">Community Impact</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Work with us to create programs that empower students, professionals, and innovators in tech.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300">
            <Lightbulb className="w-12 h-12 mx-auto text-yellow-500" />
            <h3 className="text-lg font-semibold mt-4">Innovation & Ideas</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Join forces to build groundbreaking solutions that merge education, technology, and real-world needs.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300">
            <Handshake className="w-12 h-12 mx-auto text-green-600" />
            <h3 className="text-lg font-semibold mt-4">Mutual Growth</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Collaborations that create win-win opportunities for skill development, exposure, and expansion.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-50 rounded-xl shadow-md p-8 sm:p-10 text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Let’s Build Together</h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            We’re always open to working with <strong>educational institutions</strong>, <strong>tech firms</strong>,
            <strong> NGOs</strong>, and <strong>industry leaders</strong> who share our vision of advancing
            society with technology.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <a
              href="mailto:genstohub1@gmail.com?subject=I%20want%20to%20Collaborate%20with%20GenSto%20Hub"
              className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition duration-300"
            >
              <Mail className="w-5 h-5" /> Email Us
            </a>
            <a
              href="https://wa.me/2347061065498?text=Hello%20GenSto%20Hub!%20I%20am%20interested%20in%20collaborating%20with%20you."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-200 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md transition duration-300"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp Us
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}