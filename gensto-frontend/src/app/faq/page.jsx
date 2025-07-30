'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState('EdTech');

  //  FAQ Data Grouped by Categories
  const faqData = {
    EdTech: [
      {
        question: "What kind of EdTech courses does GenSto Hub offer?",
        answer:
          "We offer a range of courses including Computer Appreciation, Web Development, Cybersecurity, IT Infrastructure, and Software Maintenance. Each course equips students with job-ready skills.",
      },
      {
        question: "Are GenSto Hub certificates recognized?",
        answer:
          "Yes! Our certificates are recognized by industry professionals and companies, validating that you’ve gained hands-on experience and relevant knowledge.",
      },
      {
        question: "Who are the instructors at GenSto Hub?",
        answer:
          "Our instructors are certified experts with years of industry experience, delivering real-world insights and mentorship to students.",
      },
    ],
    Services: [
      {
        question: "Does GenSto Hub offer services beyond training?",
        answer:
          "Yes, we provide services like website & app development, cybersecurity, product design, software maintenance, and tech consultation.",
      },
      {
        question: "Can I hire GenSto Hub for a custom software project?",
        answer:
          "Absolutely! We build scalable websites, apps, and enterprise solutions tailored to client needs.",
      },
    ],
    Internship: [
      {
        question: "Does GenSto Hub offer internship programs?",
        answer:
          "Yes! We provide structured internship programs for students and fresh graduates to gain real-world experience.",
      },
      {
        question: "How can I apply for an internship at GenSto Hub?",
        answer:
          "Internship openings are posted on our website and social media platforms. You can also contact us directly to express interest.",
      },
    ],
    Partnership: [
      {
        question: "How can businesses partner or collaborate with GenSto Hub?",
        answer:
          "We welcome partnerships for training, tech product development, sponsorships, and collaborative research. Contact us to start a conversation.",
      },
      {
        question: "Does GenSto Hub accept sponsorships?",
        answer:
          "Yes! Organizations and individuals can sponsor students, projects, and community tech initiatives through GenSto Hub.",
      },
    ],
  };

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Page Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-6">
          Frequently Asked Questions
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Find answers about GenSto Hub, our EdTech programs, services, internships, and partnerships.
        </p>

        {/*  Category Tabs */}
        <div className="flex justify-center mb-8 space-x-4 flex-wrap">
          {Object.keys(faqData).map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setOpenIndex(null);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/*  FAQ Accordion */}
        <div className="space-y-4">
          {faqData[activeCategory].map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-4">
              {/* Question Row */}
              <button
                className="flex justify-between items-center w-full text-left"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-semibold text-gray-800">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-blue-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </button>

              {/* Answer Dropdown */}
              {openIndex === index && (
                <div className="mt-3 text-gray-600 border-t border-gray-200 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-blue-50 p-6 rounded-xl text-center shadow-md">
          <h2 className="text-xl font-bold text-gray-800">Still have questions?</h2>
          <p className="text-gray-600 mt-2 mb-4">
            Can’t find the answer you’re looking for? Contact our team for more details.
          </p>
          <Link href="/contact">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}