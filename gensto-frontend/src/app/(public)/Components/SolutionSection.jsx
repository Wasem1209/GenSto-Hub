'use client';

import { motion } from "framer-motion";
import { Code, Users, Briefcase, Rocket, Globe, Database } from "lucide-react";

export default function SolutionSection() {
    const services = [
        {
            title: 'Innovative Training',
            icon: <Code className="w-12 h-12 text-blue-600" />,
            description: 'Hands-on technical programs designed to bridge the gap between academic theory and industry-standard skills.',
        },
        {
            title: 'Custom Software',
            icon: <Briefcase className="w-12 h-12 text-blue-600" />,
            description: 'Engineering scalable, robust software products tailored for startups, NGOs, and growing organizations.',
        },
        {
            title: 'Mentorship & Support',
            icon: <Users className="w-12 h-12 text-blue-600" />,
            description: 'Personalized guidance from certified mentors to navigate project roadblocks and career transitions.',
        },
        {
            title: 'Career Empowerment',
            icon: <Rocket className="w-12 h-12 text-blue-600" />,
            description: 'Equipping students and professionals with the tools and network needed to launch successful tech careers.',
        },
        {
            title: 'Scalable Tech Hub',
            icon: <Globe className="w-12 h-12 text-blue-600" />,
            description: 'A digital ecosystem designed for modular management and collaborative product development.',
        },
        {
            title: 'Data-Driven Insights',
            icon: <Database className="w-12 h-12 text-blue-600" />,
            description: 'Leveraging modern stacks to build data-centric solutions that power informed business decisions.',
        }
    ];

    // Parent container variants: Controls the staggering of children
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    // Individual card variants
    const itemVariants = {
        hidden: { y: 40, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section className="bg-white py-20 px-6 sm:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-gray-800 font-bold tracking-widest uppercase text-sm mb-3">What we offer</h2>

                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        whileInView={{ width: "5rem", opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.8,
                            ease: "easeOut",
                            delay: 0.1
                        }}
                        className="h-1.5 bg-blue-600 mx-auto mt-6 rounded-full"
                    />
                </motion.div>

                {/* This acts as the parent and triggers the whileInView for all items */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    // amount: 0.1 means the animation starts when 10% of the grid is visible
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.03,
                                transition: { duration: 0.2 }
                            }}
                            className="group p-8 bg-gray-50 rounded-3xl border border-transparent hover:border-blue-100 hover:bg-white hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="bg-white group-hover:bg-blue-50 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-all">
                                {service.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h3>
                            <p className="text-gray-600 leading-relaxed text-base">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}