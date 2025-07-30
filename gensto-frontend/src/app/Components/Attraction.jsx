'use client';

import Image from 'next/image';
import { MessageCircle } from 'lucide-react';

export default function JoinCommunity() {
    return (
        <section className="relative bg-gray-50 py-16 px-4 sm:px-6 lg:px-12">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">

                {/* Left side content */}
                <div className="flex-1 text-center lg:text-left">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
                        Join Our Growing Community
                    </h2>
                    <p className="mt-4 text-gray-600 text-base sm:text-lg max-w-xl">
                        Become part of a vibrant network of innovators, learners, and tech enthusiasts.
                        Our WhatsApp community connects you with <strong>exclusive updates</strong>,
                        <strong>networking opportunities</strong>, and <strong>direct access</strong> to our team.
                    </p>

                    {/* CTA Button */}
                    <a
                        href="https://wa.me/2348012345678?text=Hello! I want to join the GenSto Hub Community."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 hover:shadow-lg transition-all duration-300"
                    >
                        <MessageCircle className="w-5 h-5" />
                        Join WhatsApp Group
                    </a>
                </div>

                {/* Right side illustration */}
                <div className="flex-1 flex justify-center lg:justify-end">
                    <Image
                        src="/images/Official-philip.png"
                        alt="Join Community"
                        width={400}
                        height={400}
                        className="drop-shadow-lg"
                    />
                </div>
            </div>
        </section>
    );
}