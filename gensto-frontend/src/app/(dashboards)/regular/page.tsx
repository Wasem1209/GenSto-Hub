'use client';

import React from 'react';
import { 
  ShoppingBag, 
  MessageSquare, 
  UserPlus, 
  Briefcase, 
  TrendingUp, 
  Handshake, 
  Users, 
  Award, 
  FileText, 
  ShieldCheck,
  ArrowRight,
  LucideIcon,
  GraduationCap // Added for Internship
} from 'lucide-react';
import Link from 'next/link';

interface HubCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  color: string;
}

const HubCard = ({ title, description, icon: Icon, href, color }: HubCardProps) => (
  <Link href={href} className="group">
    <div className="h-full p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300 flex flex-col">
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        <Icon className="text-white" size={24} />
      </div>
      <div className="flex-grow">
        <h3 className="font-bold text-gray-900 mb-2 flex items-center justify-between">
          {title}
          <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-600" />
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  </Link>
);

export default function RegularPage() {
  const hubItems = [
    {
      title: 'Inanst Products',
      description: 'Explore our curated digital assets, creative tools, and hardware offerings.',
      icon: ShoppingBag,
      href: '/regular/products',
      color: 'bg-blue-600',
    },
    {
      title: 'Consultation',
      description: 'Book a session with our experts for tech guidance or creative direction.',
      icon: MessageSquare,
      href: '/regular/consultation',
      color: 'bg-indigo-600',
    },
    {
      title: 'School Enrollments',
      description: 'Manage your active course registrations and upcoming training schedules.',
      icon: UserPlus,
      href: '/regular/school-enrollments',
      color: 'bg-emerald-600',
    },
    {
      title: 'Services',
      description: 'Request branding, photography, or custom software development services.',
      icon: Briefcase,
      href: '/regular/services',
      color: 'bg-violet-600',
    },
    {
      title: 'Internship',
      description: 'Gain real-world experience and build your portfolio with our hub teams.',
      icon: GraduationCap,
      href: '/regular/internship',
      color: 'bg-orange-500',
    },
    {
      title: 'Learning Progress',
      description: 'Track your curriculum completion, grades, and skill development milestones.',
      icon: TrendingUp,
      href: '/regular/classes',
      color: 'bg-amber-600',
    },
    {
      title: 'Partnership',
      description: 'Explore business opportunities and official partnership programs with Inanst.',
      icon: Handshake,
      href: '/regular/partnership',
      color: 'bg-rose-600',
    },
    {
      title: 'Collaboration',
      description: 'Connect with other creatives and students on active hub projects.',
      icon: Users,
      href: '/regular/chat',
      color: 'bg-cyan-600',
    },
    {
      title: 'Certificate Exams',
      description: 'Schedule and take your professional certification assessments.',
      icon: Award,
      href: '/regular/exam',
      color: 'bg-purple-600',
    },
    {
      title: 'Terms & Conditions',
      description: 'Review the legal framework and operational guidelines of our platform.',
      icon: FileText,
      href: '/regular/legal-terms',
      color: 'bg-slate-600',
    },
    {
      title: 'Privacy Policy',
      description: 'Learn how we protect your data and manage your digital privacy.',
      icon: ShieldCheck,
      href: '/regular/legal-policy',
      color: 'bg-gray-800',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="border-b border-gray-200 pb-6">
        <p className="text-sm text-gray-500 mt-1">Manage your professional growth and services in one place.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {hubItems.map((item, index) => (
          <HubCard 
            key={index}
            title={item.title}
            description={item.description}
            icon={item.icon}
            href={item.href}
            color={item.color}
          />
        ))}
      </div>
    </div>
  );
}