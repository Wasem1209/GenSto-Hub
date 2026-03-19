'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onFinish }) {
    const [currentMessage, setCurrentMessage] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    const messages = [
        "Welcome to",
        "Innovation",
        "Analytics",
        "Societal Transformation",
    ];

    useEffect(() => {
        // Significantly reduced timers for a faster experience
        const timers = [
            setTimeout(() => setCurrentMessage(1), 500),  // Innovation
            setTimeout(() => setCurrentMessage(2), 1000), // Analytics
            setTimeout(() => setCurrentMessage(3), 1500), // Societal Transformation
            setTimeout(() => setIsVisible(false), 2200)   // Start Exit Animation
        ];

        document.body.style.overflow = 'hidden';

        return () => {
            timers.forEach(clearTimeout);
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleExitComplete = () => {
        window.scrollTo(0, 0);
        onFinish();
    };

    const letterAnimation = {
        hidden: { opacity: 0, y: 5 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, delay: i * 0.03 }
        })
    };

    return (
        <AnimatePresence onExitComplete={handleExitComplete}>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900 via-gray-900 to-black z-[9999]"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    <div className="text-center px-4">
                        <motion.div
                            key={currentMessage}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-wrap justify-center"
                        >
                            {messages[currentMessage].split("").map((letter, i) => (
                                <motion.span
                                    key={`${currentMessage}-${i}`}
                                    variants={letterAnimation}
                                    initial="hidden"
                                    animate="visible"
                                    custom={i}
                                    className="text-3xl sm:text-4xl md:text-5xl text-white font-bold"
                                >
                                    {letter === " " ? "\u00A0" : letter}
                                </motion.span>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}