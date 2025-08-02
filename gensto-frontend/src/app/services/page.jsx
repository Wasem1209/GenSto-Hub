'use client';

import Link from 'next/link';
import {
  Monitor,
  Server,
  Globe,
  Layout,
  Smartphone,
  Shield,
  Wrench,
  PenTool,
  Users,
  Presentation,
  Headphones,
  Video,
  Briefcase
} from 'lucide-react';

const services = [
  { title: 'Computer Appreciation', icon: Monitor, desc: 'Basic computer literacy and skills training for beginners.' },
  { title: 'IT Infrastructure', icon: Server, desc: 'Building and maintaining strong IT foundations for businesses.' },
  { title: 'Scalable Website', icon: Globe, desc: 'Creating websites that grow with your business needs.' },
  { title: 'Web Application', icon: Layout, desc: 'Developing powerful, interactive web-based applications.' },
  { title: 'Mobile App', icon: Smartphone, desc: 'Designing mobile apps for iOS and Android platforms.' },
  { title: 'Cyber Security Service', icon: Shield, desc: 'Protecting systems, networks, and data from threats.' },
  { title: 'Software Maintenance', icon: Wrench, desc: 'Keeping your software updated, secure, and efficient.' },
  { title: 'Product Designing', icon: PenTool, desc: 'Innovative UI/UX and product design solutions.' },
  { title: 'Seminars', icon: Users, desc: 'Hosting educational and industry-focused events.' },
  { title: 'Team Training', icon: Presentation, desc: 'Upskilling teams with the latest tech knowledge.' },
  { title: 'Consultation', icon: Headphones, desc: 'Expert advice to guide your technology strategies.' },
  { title: 'Webinars', icon: Video, desc: 'Engaging virtual sessions for learning and development.' },
  { title: 'Business Consultation', icon: Briefcase, desc: 'Helping businesses align tech solutions with goals.' },
];

export default function ServicesPage() {
  return (
    <section className="bg-gray-50 mt-8 py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Our Services
        </h1>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          At GenSto Hub, we deliver cutting-edge tech solutions, training, and consultation to help individuals, teams, and organizations grow with technology.
        </p>

        {/* Grid for services */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link
                href={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-transform p-6 flex flex-col items-center text-center"
              >
                <div className="bg-blue-100 p-4 rounded-full mb-4">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2">{service.desc}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}