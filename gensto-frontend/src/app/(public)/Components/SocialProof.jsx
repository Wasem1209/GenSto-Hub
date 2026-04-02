'use client';

import { useEffect, useState } from "react";
import CountUp from 'react-countup';
import { motion, AnimatePresence } from "framer-motion";

const cards = [
    { count: 37, label: 'Students Trained' },
    { count: 5, label: 'Projects & Apps Delivered' },
    { count: 13, label: 'Certified Instructors' }, // Fixed typo: Certifield -> Certified
    { count: 4, label: 'Tech Communities Empowered' },
    { count: 9, label: 'Schools Connected' },
    { count: 48, label: 'Career Mentorships' },
];

export default function SocialProof() {
    const [index, setIndex] = useState(0);
    const [screenSize, setScreenSize] = useState('mobile');

    const headingText = "Trusted by Institutions & Impacted Lives";
    const letters = Array.from(headingText);

    // Update screen size 
    useEffect(() => {
        const updateScreenSize = () => {
            if (window.innerWidth < 768) setScreenSize('mobile');
            else if (window.innerWidth < 1024) setScreenSize('tablet');
            else setScreenSize('desktop');
        };
        updateScreenSize();
        window.addEventListener('resize', updateScreenSize);
        return () => window.removeEventListener('resize', updateScreenSize);
    }, []);

    // Handle the auto-sliding logic
    useEffect(() => {
        const step = screenSize === 'mobile' ? 1 : screenSize === 'tablet' ? 2 : 3;
        const interval = setInterval(() => {
            setIndex((prev) => (prev + step) % cards.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [screenSize]);

    // Determine which cards to show
    const getVisibleCards = () => {
        const count = screenSize === 'mobile' ? 1 : screenSize === 'tablet' ? 2 : 3;
        let visible = [];
        for (let i = 0; i < count; i++) {
            visible.push(cards[(index + i) % cards.length]);
        }
        return visible;
    };

    // Variants for Typewriter heading
    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.2 }
        }
    };

    const letterVariants = {
        hidden: { opacity: 0, display: "none" },
        visible: { opacity: 1, display: "inline" }
    };

    return (
        <section className="bg-gray-50 px-6 py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto text-center">

                {/* Typewriter Heading */}
                <div className="mb-16 min-h-[3rem]">
                    <motion.h2
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.8 }}
                        className="text-3xl md:text-4xl font-bold text-gray-900 border-r-4 border-gray-900 pr-1 inline-block animate-pulse-border"
                    >
                        {letters.map((char, i) => (
                            <motion.span key={i} variants={letterVariants}>{char}</motion.span>
                        ))}
                    </motion.h2>

                    {/* Heading */}
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "80px" }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.8, delay: 2 }}

                    />
                </div>
                »
                {/* Cards */}
                <div className="relative flex justify-center gap-6 min-h-[180px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-wrap justify-center gap-6 w-full"
                        >
                            {getVisibleCards().map((item, i) => (
                                <div
                                    key={`${item.label}-${i}`}
                                    className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 p-8 w-full md:w-[45%] lg:w-[30%] border border-gray-100 hover:border-blue-200 transition-colors"
                                >
                                    <h3 className="text-4xl md:text-5xl font-black text-blue-600 mb-2">
                                        <CountUp end={item.count} duration={2.5} separator="," />+
                                    </h3>
                                    <p className="text-gray-500 font-medium uppercase tracking-wide text-sm">
                                        {item.label}
                                    </p>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <style jsx>{`
        @keyframes blink {
          50% { border-color: transparent; }
        }
        .animate-pulse-border {
          animation: blink 0.8s step-end infinite;
        }
      `}</style>
        </section>
    );
}