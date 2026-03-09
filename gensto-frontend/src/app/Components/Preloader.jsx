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
        // Step-by-step message sequence
        const timers = [
            setTimeout(() => setCurrentMessage(1), 2000), // Innovation
            setTimeout(() => setCurrentMessage(2), 4000), // Analytics
            setTimeout(() => setCurrentMessage(3), 6000), // Societal Transformation
            setTimeout(() => setIsVisible(false), 9000)   // Start Exit Animation
        ];

        // Lock scroll while preloading
        document.body.style.overflow = 'hidden';

        return () => {
            timers.forEach(clearTimeout);
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleExitComplete = () => {
        // Force scroll to top the moment the preloader is fully gone
        window.scrollTo(0, 0);
        onFinish();
    };

    const letterAnimation = {
        hidden: { opacity: 0, y: 10 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.05 }
        })
    };

    return (
        <AnimatePresence onExitComplete={handleExitComplete}>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900 via-gray-900 to-black z-[9999]"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
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