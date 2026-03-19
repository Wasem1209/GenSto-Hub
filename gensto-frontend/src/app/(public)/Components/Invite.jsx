'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function JoinCommunity() {
    return (
        <section className="relative  bg-gray-50 py-16 px-6 md:px-12 lg:px-20 overflow-hidden">

            {/* TEXT CONTENT */}
            <div className=" text-center md:text-center">
                <p className="mt-4 text-gray-600 text-center sm:text-lg md:text-xl max-w-lg mx-auto md:mx-auto">
                    Become part of a vibrant network of students, tech enthusiasts, and innovators.
                    Share ideas, gain insights, and collaborate to create solutions that matter.
                </p>

                {/* CTA BUTTON */}
                <div className="mt-6">
                    <Link href="https://chat.whatsapp.com/KM6t9EI89LQ0O3ZCvADNMt" target="_blank">
                        <button className="bg-gray-400 hover:bg-gray-700 text-white font-medium px-15 py-3 rounded-full shadow-md transition-all duration-300 ">
                            Way In  →
                        </button>
                    </Link>
                </div>
            </div>

        </section>
    );
}