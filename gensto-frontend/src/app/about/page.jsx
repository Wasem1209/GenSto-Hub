"use client";

import { title } from "process";
import React from "react";
import { FaBullseye, FaLightbulb, FaCrosshairs } from "react-icons/fa";

const AboutPage = () => {
  // Example static data (you'll load dynamically from DB later)

  const teamMembers = [

    {
      name: "Okeke Chidera",
      title: "Execution Lead",
      image: "/images/terse.jpg",
    },

    {
      name: "Mr. Success Agu",
      title: "Chief Technology Officer",
      image: "/images/Success Agu.jpg",

    },

    {
      name: "Mr. Yohanna Gambo",
      title: "Cyber Security Enginneer",
      image: "/images/Yohanna.jpg",
    },


  ];

  return (
    <>
      <div className="px-4 py-16 mt-8 max-w-7xl mx-auto">
        {/* Intro */}
        <h1 className="text-4xl font-bold text-center text-gray-600 mb-4">
          About GenSto Hub
        </h1>
        <p className="text-lg text-center text-gray-700 max-w-3xl mx-auto mb-10">
          At <strong>GenSto Hub</strong>, we are committed to advancing society with technology.
          From EdTech solutions to real-world problem-solving software, we empower students, workers,
          and the agricultural community. Our mission is to bridge the gap between school and skills,
          agriculture and technology, society and innovation.
        </p>

        {/* Vision, Mission, Objectives */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <FaLightbulb className="text-4xl text-yellow-500 mx-auto mb-2" />
            <h2 className="text-xl font-semibold mb-2">Our Vision</h2>
            <p className="text-gray-600">
              To build a generation of creators, leaders, and changemakers through innovation and technology.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <FaBullseye className="text-4xl text-blue-500 mx-auto mb-2" />
            <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
            <p className="text-gray-600">
              To empower individuals with digital and soft skills, provide EdTech, and create tech-driven solutions
              to real-world challenges.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <FaCrosshairs className="text-4xl text-blue-500 mx-auto mb-2" />
            <h2 className="text-xl font-semibold mb-2">Our Objectives</h2>
            <ul className="text-gray-600 list-disc list-inside text-left mt-2">
              <li>Provide career-building skills for students & workers</li>
              <li>Bridge agriculture with smart technology</li>
              <li>Offer software services to solve societal problems</li>
              <li>Create a network of innovation & collaboration</li>
            </ul>
          </div>
        </div>



        {/* Team Members */}
        <h2 className="text-3xl font-bold text-center text-blue-500 mb-6">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md rounded-xl p-4 text-center"
            >
              <img
                src={member.image}
                alt={member.name}
                className="rounded-xl w-full h-64ss object-cover mb-4"
              />
              <h3 className="font-semibold text-lg text-gray-800">
                {member.name}
              </h3>
              <p className="text-blue-300">{member.title}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AboutPage;