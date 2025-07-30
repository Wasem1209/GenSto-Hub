'use client';

import Link from "next/link";
import SocialProof from "./Components/SocialProof";
import SolutionSection from "./Components/SolutionSection";
import Testmonial from "./Components/Testmonial";
import Services from "./Components/Services";
import About from "./Components/About";
import NewsLatter from "./Components/NewsLatter";
import School from "./Components/School";
import Attraction  from "./Components/Attraction";



export default function Hero() {
  return (
    <>
      <section className="relative w-full md:h-[768px] bg-cover bg-center bg-no-repeat flex items-center justify-center px-6  text-white text-center md:pb-40 bg-[url('/images/Team-work.jpeg')]">
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between mt-4 w-full">
          
          {/* Text Content */}
          <div className="md:w-1/2 md:px-12 text-left pt-5 md:pt-20">
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
      </section>
      <SocialProof />
      <SolutionSection />
      <Testmonial />
      <About />
      <Attraction />
      <School />
       <Services />
      <NewsLatter />
     
    </>
  );
}