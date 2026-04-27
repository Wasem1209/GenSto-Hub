'use client';

import React, { useState, useEffect } from 'react';
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
  GraduationCap,
  MessageCircle, 
  Loader2,
  Clock,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext'; 
import { REST_API, API_ROUTES } from '../../constant';

interface HubCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  color: string;
  isExternal?: boolean;
}

interface ApplicationData {
  status: 'pending' | 'accepted' | 'denied';
  roleTitle: string;
}

const HubCard = ({ title, description, icon: Icon, href, color, isExternal }: HubCardProps) => {
  const content = (
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
  );

  if (isExternal) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className="group">{content}</a>;
  }

  return <Link href={href} className="group">{content}</Link>;
};

export default function RegularPage() {
  const { user, login } = useAuth();
  const [verifying, setVerifying] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  
  // Internship specific state
  const [myApplication, setMyApplication] = useState<ApplicationData | null>(null);
  const [fetchingApp, setFetchingApp] = useState(true);

  useEffect(() => {
    const checkApplication = async () => {
      if (!user?.email) return;
      try {
        // Fetch the application filtered by the logged-in user's email
        const res = await fetch(`${API_ROUTES.INTERNSHIPS}?email=${user.email}`);
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          setMyApplication(data.data[0]);
        }
      } catch (err) {
        console.error("Failed to load internship status", err);
      } finally {
        setFetchingApp(false);
      }
    };
    checkApplication();
  }, [user]);

  // --- LOGIC: Verification Guard ---
  if (user && !user.isVerified) {
    const handleVerify = async (e: React.FormEvent) => {
      e.preventDefault();
      setVerifying(true);
      setError('');
      try {
        const res = await fetch(`${REST_API}/auth/verify-code`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: user.email, code: otp }),
        });
        const data = await res.json();
        if (res.ok) {
          login(data.token, data.user);
        } else {
          setError(data.msg || 'Invalid code');
        }
      } catch {
        setError('Verification failed. Check your connection.');
      } finally {
        setVerifying(false);
      }
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
        <div className="max-w-sm w-full bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <ShieldCheck className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900">Verify Your Email</h2>
          <p className="text-sm text-gray-500 mt-2">
            We sent a code to <span className="font-bold text-gray-900">{user.email}</span>
          </p>
          
          <form onSubmit={handleVerify} className="mt-6 space-y-4">
            <input 
              required 
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full text-center text-2xl font-bold tracking-[0.5rem] py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-blue-500" 
              placeholder="000000" 
            />
            {error && <p className="text-xs text-red-500 font-bold uppercase">{error}</p>}
            <button disabled={verifying} className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg uppercase tracking-widest text-[10px] flex items-center justify-center">
              {verifying ? <Loader2 className="animate-spin" /> : "Verify Account"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const hubItems = [
    {
      title: 'WhatsApp Community',
      description: 'Join our official group to network with other creatives and stay updated.',
      icon: MessageCircle,
      href: 'https://chat.whatsapp.com/HoQcoL4sXnbFWzO7SZoKhM?mode=gi_t', 
      color: 'bg-green-500',
      isExternal: true,
    },
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
      href: '/services',
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
    {
      title: 'Post Comments',
      description: 'Share your thought publicly and engage with the community.',
      icon: MessageCircle,
      href: '/regular/comments',
      color: 'bg-cyan-600',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="border-b border-gray-200 pb-6">
        <p className="text-sm text-gray-500 mt-1">Welcome back, <span className="text-gray-900 font-bold">{user?.name}</span>. Manage your growth here.</p>
      </div>

      {/* Internship Status Section (Only shows if applied) */}
      {!fetchingApp && myApplication && (
        <div className="mb-10">
          <div className={`p-8 rounded-[2.5rem] border-2 transition-all overflow-hidden relative ${
            myApplication.status === 'accepted' 
            ? 'bg-white border-emerald-500 shadow-xl shadow-emerald-50' 
            : 'bg-gray-50 border-dashed border-gray-200'
          }`}>
            <div className="flex justify-between items-start relative z-10">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
                  {myApplication.roleTitle}
                </span>
                <h3 className="text-2xl font-black mt-3 text-[#1a1f2e]">
                  {myApplication.status === 'accepted' ? 'Active Internship' : 'Application Pending'}
                </h3>
              </div>
              
              {myApplication.status === 'pending' ? (
                <Clock className="text-amber-500 animate-pulse" size={32} />
              ) : (
                <CheckCircle className="text-emerald-500" size={32} />
              )}
            </div>

            <div className="mt-6 relative z-10">
              {myApplication.status === 'accepted' ? (
                <Link 
                  href="/regular/internship/portal"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#1a1f2e] text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-blue-100"
                >
                  Enter Portal <ArrowRight size={14} />
                </Link>
              ) : (
                <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-md italic">
                  &quot;Our lead engineers are currently reviewing your portfolio and statement of purpose. Keep an eye on your email for the final decision.&quot;
                </p>
              )}
            </div>

            {/* Subtle background decoration for accepted state */}
            {myApplication.status === 'accepted' && (
              <GraduationCap className="absolute -bottom-6 -right-6 text-emerald-50 opacity-50" size={160} />
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {hubItems.map((item, index) => (
          <HubCard 
            key={index}
            title={item.title}
            description={item.description}
            icon={item.icon}
            href={item.href}
            color={item.color}
            isExternal={item.isExternal}
          />
        ))}
      </div>
    </div>
  );
}




/*
'use client';

import React, { useState } from 'react';
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
  GraduationCap,
  MessageCircle, 
  Loader2,
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext'; 
import { REST_API } from '../../constant';

interface HubCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  color: string;
  isExternal?: boolean;
}

const HubCard = ({ title, description, icon: Icon, href, color, isExternal }: HubCardProps) => {
  const content = (
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
  );

  if (isExternal) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className="group">{content}</a>;
  }

  return <Link href={href} className="group">{content}</Link>;
};

export default function RegularPage() {
  const { user, login } = useAuth();
  const [verifying, setVerifying] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  // --- LOGIC: Verification Guard ---
  // If user exists but is not verified, show the verification UI
  if (user && !user.isVerified) {
    const handleVerify = async (e: React.FormEvent) => {
      e.preventDefault();
      setVerifying(true);
      setError('');
      try {
        const res = await fetch(`${REST_API}/auth/verify-code`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: user.email, code: otp }),
        });
        const data = await res.json();
        if (res.ok) {
          login(data.token, data.user); // Persist verified state
        } else {
          setError(data.msg || 'Invalid code');
        }
      } catch {
        setError('Verification failed. Check your connection.');
      } finally {
        setVerifying(false);
      }
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
        <div className="max-w-sm w-full bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <ShieldCheck className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900">Verify Your Email</h2>
          <p className="text-sm text-gray-500 mt-2">
            We sent a code to <span className="font-bold text-gray-900">{user.email}</span>
          </p>
          
          <form onSubmit={handleVerify} className="mt-6 space-y-4">
            <input 
              required 
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full text-center text-2xl font-bold tracking-[0.5rem] py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-blue-500" 
              placeholder="000000" 
            />
            {error && <p className="text-xs text-red-500 font-bold uppercase">{error}</p>}
            <button disabled={verifying} className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg uppercase tracking-widest text-[10px] flex items-center justify-center">
              {verifying ? <Loader2 className="animate-spin" /> : "Verify Account"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const hubItems = [
    {
      title: 'WhatsApp Community',
      description: 'Join our official group to network with other creatives and stay updated.',
      icon: MessageCircle,
      href: 'https://chat.whatsapp.com/HoQcoL4sXnbFWzO7SZoKhM?mode=gi_t', 
      color: 'bg-green-500',
      isExternal: true,
    },
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
      href: '/regular/service',
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
    {
      title: 'Post Comments',
      description: 'Share your thought publicly and engage with the community.',
      icon: MessageCircle,
      href: '/regular/comments',
      color: 'bg-cyan-600',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="border-b border-gray-200 pb-6">
        <p className="text-sm text-gray-500 mt-1">Welcome back, <span className="text-gray-900 font-bold">{user?.name}</span>. Manage your growth here.</p>
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
            isExternal={item.isExternal}
          />
        ))}
      </div>
    </div>
  );
}
  */