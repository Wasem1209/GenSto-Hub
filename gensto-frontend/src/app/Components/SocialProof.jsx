'use client'

import { useEffect, useState } from "react";
import CountUp from 'react-countup';

const cards = [
    { count: 37, label: 'Students Trained' },
    { count: 5, label: 'Projects & Apps Delivered' },
    { count: 13, label: 'Certifield Instructors' },
    { count: 4, label: 'Tech Communites Empowered' },
    { count: 9, label: 'Schools Connected' },
    { count: 48, label: 'Career Mentorships' },
]

export default function SocialProof() {
    const [visibleIndexes, setVisibleIndexes] = useState([0]);
    const [screenSize, setScreenSize] = useState('mobile');
    useEffect(() => {
        const updateScreenSize = () => {
            if (window.innerWidth < 768) {
                setScreenSize('mobile');
            } else if (window.innerWidth < 1024) {
                setScreenSize('tablet');
            } else {
                setScreenSize('desktop');
            }
        };
        updateScreenSize();
        window.addEventListener('resize', updateScreenSize);

        let index = 0;

        const interval = setInterval(() => {
            if (screenSize === 'mobile') {
                setVisibleIndexes([(index % cards.length)]);
                index = (index + 1) % cards.length;
            } else if (screenSize === 'tablet') {
                setVisibleIndexes([(index % cards.length), ((index + 1) % cards.length)]);
                index = (index + 2) % cards.length;
            } else {
                setVisibleIndexes([(index % cards.length),
                ((index + 1) % cards.length),
                ((index + 2) % cards.length)
                ]);
                index = (index + 3) % cards.length;
            }

        }, 5000);
        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', updateScreenSize);
        };

    }, [screenSize]);

    return (
        <section className="bg-gray-50 px-6 py-16">
            <h2 className="text-center text-3xl md:text-4xl font-bold text-green-800 mb-10">Trusted by Institutions & Impacted Lives</h2>

            <div className="flex flex-wrap justify-center gap-6 transition-all duration-700 ease-in-out">
                {cards.map((cards, i) =>
                    visibleIndexes.includes(i) ? (
                        <div key={i}
                            className="bg-white rounded-xl shadow-md p-8 w-full md:w-[45%] lg:w-[30%] animat-fade-in">
                            <h3 className="text-4xl font-bold text-blue-600">
                                <CountUp end={cards.count} duration={2} separator="," />+
                            </h3>
                            <p className="mt-2 text-gray-600">{cards.label}</p>
                        </div>
                    )
                        : null
                )}
            </div>
        </section>
    );
}