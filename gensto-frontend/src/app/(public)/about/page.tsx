"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { 
  FaBullseye, FaLightbulb, FaChartLine, 
  FaUsers, FaEye, FaEnvelope, FaMapMarkerAlt, FaPhone 
} from "react-icons/fa";

interface TeamMember {
  name: string;
  title: string;
  image: string;
}

interface Pillar {
  title: string;
  icon: React.ReactNode;
  color: string;
  text: string;
  delay: number;
}

const AboutPage = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "Dev. Philip Terfa Wasem",
      title: "Founder/CEO",
      image: "/images/IMG-20260315-WA0365_2.png",
    },
    {
      name: "Dev.Okeke Chidera",
      title: "Co-Founder/Execution Lead",
      image: "/images/terse.jpg",
    },
    {
      name: "Engr. Success Agu",
      title: "Co-Founder/CTO",
      image: "/images/Success Agu.jpg",
    },
    {
      name: "Dev",
      title: "Co-Founder/COO",
      image: "/",
    },
    {
      name: "Engr. Yohana Gambo",
      title: "Co-Founder/CISO",
      image: "/images/Yohanna.jpg",
    },
    {
      name: "BoluwaTife Ima",
      title: "Co-Founder/Growth Lead",
      image: "/images/emmanuelah.jpg",
    },
  ];

  const pillars: Pillar[] = [
    { 
      title: "Innovation", 
      icon: <FaLightbulb />, 
      color: "border-yellow-500", 
      text: "Engineering indigenous hardware and software to reclaim technological sovereignty.",
      delay: 0.1 
    },
    { 
      title: "Analytics", 
      icon: <FaChartLine />, 
      color: "border-blue-600", 
      text: "Converting data into actionable intelligence for Agriculture, Health, and Security.",
      delay: 0.3 
    },
    { 
      title: "Societal Transformation", 
      icon: <FaUsers />, 
      color: "border-green-500", 
      text: "Empowering the next generation of creators through our integrated Ed-Tech loop.",
      delay: 0.5 
    }
  ];

  const cardVariants: Variants = {
    offscreen: { y: 50, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", bounce: 0.4, duration: 0.8 }
    }
  };

  return (
    <div className="bg-white">
      <div className="px-4 py-16 mt-8 max-w-7xl mx-auto">
        {/* Intro Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-6 tracking-tight">
            About <span className="text-blue-600">INANST</span>
          </h1>
          <p className="text-xl text-center text-gray-600 max-w-4xl mx-auto mb-16 leading-relaxed">
            <strong>INANST</strong> (Innovation, Analytics, and Societal Transformation) is the 
            architectural response to Nigeria&apos;s &quot;Long Technology Problem.&quot; We are building the 
            infrastructure that bridges academic knowledge with industrial execution.
          </p>
        </motion.div>

        {/* Pillars Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              className={`bg-white rounded-2xl shadow-xl p-8 text-center border-t-8 ${pillar.color} cursor-default`}
            >
              <div className={`text-5xl mb-4 flex justify-center ${pillar.color.replace('border', 'text')}`}>
                {pillar.icon}
              </div>
              <h2 className="text-2xl font-bold mb-3 text-gray-900">{pillar.title}</h2>
              <p className="text-gray-600 leading-relaxed">{pillar.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Vision/Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <motion.div 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -50 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-blue-50 p-10 rounded-3xl"
          >
            <div className="flex items-center mb-6">
              <FaEye className="text-4xl text-blue-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              To be the premier technological ecosystem in Africa, where every societal challenge 
              is met with an indigenous, data-driven, and innovative solution that competes 
              on a global scale.
            </p>
          </motion.div>

          <motion.div 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 50 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-green-50 p-10 rounded-3xl"
          >
            <div className="flex items-center mb-6">
              <FaBullseye className="text-4xl text-green-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              To dismantle the productivity gap in Nigeria by creating a unified stack of 
              education, hardware manufacturing, and software development that empowers 
              individuals and institutions.
            </p>
          </motion.div>
        </div>

        {/* Leadership Section */}
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Founding Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-32">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
            >
              {/* Increased height to h-96 and used object-top to prevent cutting faces */}
              <div className="relative h-96 w-full overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="font-bold text-xl text-gray-900">{member.name}</h3>
                <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm mt-1">
                  {member.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <section className="bg-gray-900 rounded-3xl p-12 text-white shadow-2xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-6">Get In Touch</h2>
              <p className="text-gray-400 mb-8 text-lg">
                Whether you are an investor, a potential partner, or a student ready to join 
                the transformation, we want to hear from you.
              </p>
              <div className="space-y-6">
                <a 
                  href="mailto:contact@inanst.com" 
                  className="flex items-center group w-fit"
                >
                  <div className="bg-gray-800 p-3 rounded-lg group-hover:bg-blue-600 transition-colors mr-4">
                    <FaEnvelope className="text-blue-500 group-hover:text-white text-xl" />
                  </div>
                  <span className="group-hover:text-blue-400 transition-colors">contact@inanst.com</span>
                </a>
                
                <div className="flex items-center w-fit">
                  <div className="bg-gray-800 p-3 rounded-lg mr-4">
                    <FaMapMarkerAlt className="text-blue-500 text-xl" />
                  </div>
                  <span>Abuja, Nigeria</span>
                </div>

                <a 
                  href="tel:+2348123456789" 
                  className="flex items-center group w-fit"
                >
                  <div className="bg-gray-800 p-3 rounded-lg group-hover:bg-blue-600 transition-colors mr-4">
                    <FaPhone className="text-blue-500 group-hover:text-white text-xl" />
                  </div>
                  <span className="group-hover:text-blue-400 transition-colors">+234 7061065498</span>
                </a>
              </div>
            </div>

            <form className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none" />
              <input type="email" placeholder="Email Address" className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none" />
              <textarea placeholder="How can we collaborate?" rows={4} className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none"></textarea>
              <button type="button" className="w-full py-4 bg-blue-600 hover:bg-blue-700 transition-all rounded-xl font-bold text-lg active:scale-95">
                Send Message
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;