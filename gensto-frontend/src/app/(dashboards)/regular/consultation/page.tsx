'use client';

import React, { useState } from 'react';
import { 
  MessageSquare, Code, Palette, LineChart, 
  Clock, ChevronRight, Lock, GraduationCap, X,
  CheckCircle2, Calendar, Trash2
} from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  duration: string;
  icon: React.ReactNode;
  color: string;
}

interface Booking {
  id: string;
  serviceTitle: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed';
}

const services: Service[] = [
  {
    id: 'tech-guidance',
    title: 'Technical Guidance',
    description: 'Architecture review, MERN stack optimization, or cloud infrastructure planning.',
    duration: '45 Mins',
    icon: <Code size={24} />,
    color: 'text-indigo-600 bg-indigo-50',
  },
  {
    id: 'security-audit',
    title: 'Security & Privacy',
    description: 'End-to-end encryption audits, database security, and vulnerability assessments.',
    duration: '60 Mins',
    icon: <Lock size={24} />,
    color: 'text-red-600 bg-red-50',
  },
  {
    id: 'career-tech',
    title: 'Career in Tech',
    description: 'Personalized roadmap for B.Sc. students, portfolio reviews, and dev-career scaling.',
    duration: '30 Mins',
    icon: <GraduationCap size={24} />,
    color: 'text-amber-600 bg-amber-50',
  },
  {
    id: 'creative-direction',
    title: 'Creative Direction',
    description: 'Branding strategy, UI/UX audit, or multi-service hub creative workflows.',
    duration: '60 Mins',
    icon: <Palette size={24} />,
    color: 'text-pink-600 bg-pink-50',
  },
  {
    id: 'business-strategy',
    title: 'Business Strategy',
    description: 'Operational management, technical education scaling, or SDG-aligned growth.',
    duration: '30 Mins',
    icon: <LineChart size={24} />,
    color: 'text-emerald-600 bg-emerald-50',
  }
];

export default function ConsultationPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [myBookings, setMyBookings] = useState<Booking[]>([
    { id: '1', serviceTitle: 'Technical Guidance', date: '2026-03-25', time: '14:00', status: 'confirmed' }
  ]);

  const handleBookingConfirm = () => {
    if (selectedService) {
      const newBooking: Booking = {
        id: Math.random().toString(36).substr(2, 9),
        serviceTitle: selectedService.title,
        date: 'TBD', // In a real app, you'd pull from state
        time: 'TBD',
        status: 'pending'
      };
      setMyBookings([...myBookings, newBooking]);
    }
    setSelectedService(null);
    setShowSuccess(true);
  };

  const cancelBooking = (id: string) => {
    setMyBookings(myBookings.filter(b => b.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-32 px-4 md:px-6 animate-in fade-in duration-700">
      
      {/* Header */}
      <div className="text-center space-y-4 py-10">
        <div className="inline-flex items-center space-x-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full mb-2">
          <MessageSquare size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest">Expert Access</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Strategic Consultation</h1>
        <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
          Bridge the gap between vision and execution with focused sessions, managed entirely within the Inanst ecosystem.
        </p>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => setSelectedService(service)}
            className="group text-left flex flex-col bg-white border border-gray-100 rounded-[2.5rem] p-6 md:p-8 hover:border-indigo-600 hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500"
          >
            <div className={`p-4 rounded-2xl inline-block w-fit mb-6 ${service.color} group-hover:scale-110 transition-transform`}>
              {service.icon}
            </div>
            <div className="flex-grow space-y-3">
              <h3 className="text-xl font-black text-gray-900">{service.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{service.description}</p>
            </div>
            <div className="mt-8 flex items-center justify-between pt-6 border-t border-gray-50">
              <div className="flex items-center text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                <Clock size={14} className="mr-1.5" /> {service.duration}
              </div>
              <div className="text-indigo-600 text-[10px] font-black uppercase tracking-widest flex items-center">
                Schedule <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Booking Management Section */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="h-px flex-grow bg-gray-100"></div>
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">My Active Sessions</h2>
          <div className="h-px flex-grow bg-gray-100"></div>
        </div>

        {myBookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between bg-gray-50 border border-gray-100 p-6 rounded-[2rem]">
                <div className="flex items-center space-x-4">
                  <div className="bg-white p-3 rounded-xl shadow-sm">
                    <Calendar size={20} className="text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-gray-900">{booking.serviceTitle}</h4>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">
                      {booking.date} • {booking.time} • <span className={booking.status === 'confirmed' ? 'text-emerald-500' : 'text-amber-500'}>{booking.status}</span>
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => cancelBooking(booking.id)}
                  className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  title="Cancel Session"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 text-sm italic py-8">No upcoming sessions found.</p>
        )}
      </div>

      {/* Enterprise Contact */}
      <div className="bg-gray-900 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <h2 className="text-3xl font-black mb-4 leading-tight">Need something custom?</h2>
          <p className="text-gray-400 mb-8 text-sm md:text-base leading-relaxed">For long-term partnerships, multi-service hub development, or dedicated technical education programs.</p>
          <button 
            onClick={() => window.location.href = "mailto:enterprise@inanst.com"}
            className="w-full md:w-auto bg-white text-gray-900 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all shadow-lg"
          >
            Contact Enterprise via Email
          </button>
        </div>
        <div className="absolute -bottom-10 -right-10 opacity-10">
          <MessageSquare size={300} className="text-white" />
        </div>
      </div>

      {/* Booking Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="p-6 md:p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div>
                <h3 className="text-xl md:text-2xl font-black text-gray-900">{selectedService.title}</h3>
                <p className="text-xs md:text-sm text-gray-400 tracking-tight">Request a {selectedService.duration} internal session</p>
              </div>
              <button onClick={() => setSelectedService(null)} className="p-2 hover:bg-white rounded-full transition-colors shadow-sm">
                <X size={20} className="text-gray-400" />
              </button>
            </div>
            
            <div className="p-6 md:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Date</label>
                  <input 
                    type="date" 
                    className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 appearance-none" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Time</label>
                  <input 
                    type="time" 
                    className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 appearance-none" 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Session Goals</label>
                <textarea 
                  placeholder="e.g., Auditing my MERN stack architecture..."
                  className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 min-h-[100px] resize-none"
                />
              </div>

              <button 
                onClick={handleBookingConfirm}
                className="w-full py-5 bg-indigo-600 text-white rounded-2xl md:rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-gray-900 transition-all shadow-xl shadow-indigo-100"
              >
                Confirm Session Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-white/80 backdrop-blur-md animate-in fade-in duration-500">
          <div className="bg-white border border-gray-100 w-full max-w-md rounded-[3rem] p-8 md:p-12 text-center shadow-2xl animate-in zoom-in-95 duration-500">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 tracking-tight">Request Received</h3>
            <p className="text-xs md:text-sm text-gray-500 leading-relaxed mb-10">
              Your request is now in our system. You can track its status in the &quot;My Active Sessions&quot; section.
            </p>
            <button 
              onClick={() => setShowSuccess(false)}
              className="w-full py-5 bg-gray-900 text-white rounded-[2rem] font-black uppercase tracking-widest text-[10px] hover:bg-indigo-600 transition-all"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}