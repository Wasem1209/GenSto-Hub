'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Preloader from "./Components/Preloader";
import SocialProof from "./Components/SocialProof";
import SolutionSection from "./Components/SolutionSection";
import Testmonial from "./Components/Testmonial";
import Services from "./Components/Services";
import About from "./Components/About";
import NewsLatter from "./Components/NewsLatter";
import School from "./Components/School";
import Advert from "./Components/Advert";



export default function Hero() {
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <>
      {showPreloader ? (
        <Preloader onFinish={() => setShowPreloader(false)} />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="w-full"
        >
          {/* Hero Section with slight fade-in delay */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
            className="relative w-full mt-10 md:h-[768px] bg-cover bg-center bg-no-repeat flex items-center justify-center px-6 text-white text-center md:pb-40 bg-[url('/images/Team-work.jpeg')]"
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Content */}
            <div className="relative max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between mt-4 w-full">
              <div className="md:w-1/2 md:px-12 text-left md:pt-20">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 pt-10">
                  Create Your Future!
                </h1>
                <p className="text-lg text-white/80 mb-6">
                  We provide hands-on training programs and build scalable, custom tech products for clients across sectors.
                </p>
                <Link href="/course" passHref>
                  <button className="bg-gray-800 hover:bg-blue-700 text-white px-6 py-3 rounded-md mb-2 transition duration-300">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </motion.section>

          {/* Rest of the sections (fade in smoothly after hero) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1.2, ease: "easeOut" }}
          >
            <SocialProof />
            <SolutionSection />
            <Testmonial />
            <About />
              <School />
              <Advert />
            <Services />
            <NewsLatter />
          </motion.div>
        </motion.div>
      )}
    </>
  );
}