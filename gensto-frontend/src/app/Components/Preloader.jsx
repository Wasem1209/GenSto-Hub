'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onFinish }) {
    const [currentMessage, setCurrentMessage] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    const messages = [
        "Welcome to GenSto Hub",
        "Advancing the society with technology",
        "Enjoy your stay!!"
    ];

    useEffect(() => {
        const timers = [
            setTimeout(() => setCurrentMessage(1), 3000),
            setTimeout(() => setCurrentMessage(2), 6000),
            setTimeout(() => setIsVisible(false), 13000)
        ];
        return () => timers.forEach(clearTimeout);
    }, []);

    const handleExitComplete = () => {
        onFinish();
    };

    // Letter animation (staggered)
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
                    className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900 via-gray-900 to-black z-50"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                >
                    {/*  CENTERED TEXT CONTAINER */}
                    <div className="text-center px-4">
                        <motion.div key={currentMessage} className="flex flex-wrap justify-center">
                            {messages[currentMessage].split("").map((letter, i) => (
                                <motion.span
                                    key={i}
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