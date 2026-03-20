'use client';

import React, { useState } from 'react';
import { 
  Award, CheckCircle2, Lock, Timer, FileText, CreditCard, 
  ArrowRight, ShieldCheck, AlertCircle, GraduationCap, 
  X, Banknote, Upload 
} from 'lucide-react';

// Define the shape of our Exam data
interface Exam {
  id: string;
  title: string;
  duration: string;
  questions: number;
  price: number;
  status: 'locked' | 'pending' | 'unlocked';
}

type PaymentMethod = 'card' | 'transfer' | null;

export default function CertificateExamsPage() {
  // 1. Fixed TypeScript state definitions
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);

  // This would eventually come from an API call
  const certifications: Exam[] = [
    {
      id: 'm101',
      title: 'Full-Stack MERN Professional',
      duration: '120 mins',
      questions: 60,
      price: 85,
      status: 'locked', 
    },
    {
      id: 'd202',
      title: 'UI/UX Design Systems',
      duration: '90 mins',
      questions: 45,
      price: 50,
      status: 'pending',
    },
    {
      id: 'a303',
      title: 'Cloud Infrastructure (AWS/Vercel)',
      duration: '150 mins',
      questions: 75,
      price: 120,
      status: 'unlocked',
    }
  ];

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // API INTEGRATION POINT: 
    // const formData = new FormData(e.currentTarget as HTMLFormElement);
    // await axios.post('/api/payments/verify', formData);
    
    alert("Payment details submitted. Verification in progress.");
    setShowPaymentModal(false);
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-6 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 relative">
      
      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-black text-gray-900">Checkout</h3>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">
                    {selectedExam?.title} — ${selectedExam?.price}
                  </p>
                </div>
                <button 
                  onClick={() => { setShowPaymentModal(false); setPaymentMethod(null); }} 
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {!paymentMethod ? (
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setPaymentMethod('transfer')}
                    className="flex flex-col items-center gap-3 p-6 border-2 border-gray-100 rounded-3xl hover:border-purple-500 hover:bg-purple-50 transition-all group"
                  >
                    <Banknote className="text-gray-400 group-hover:text-purple-600" size={32} />
                    <span className="text-xs font-black uppercase tracking-widest text-gray-600">Transfer</span>
                  </button>
                  <button 
                    onClick={() => setPaymentMethod('card')}
                    className="flex flex-col items-center gap-3 p-6 border-2 border-gray-100 rounded-3xl hover:border-purple-500 hover:bg-purple-50 transition-all group"
                  >
                    <CreditCard className="text-gray-400 group-hover:text-purple-600" size={32} />
                    <span className="text-xs font-black uppercase tracking-widest text-gray-600">Card</span>
                  </button>
                </div>
              ) : paymentMethod === 'transfer' ? (
                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200 space-y-2">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Bank Account Details</p>
                    <p className="text-sm font-black text-gray-900">Inanst Digital Hub</p>
                    <p className="text-lg font-mono text-purple-600 tracking-tighter">0123456789 — GTBank</p>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Upload Receipt</label>
                    <div className="relative h-24 border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 cursor-pointer transition-all">
                      <Upload size={20} />
                      <span className="text-[10px] font-bold mt-2">Click to select image</span>
                      <input type="file" required name="receipt" className="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>
                  </div>
                  <button type="submit" className="w-full py-4 bg-purple-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-purple-200">
                    Submit for Approval
                  </button>
                </form>
              ) : (
                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <div className="space-y-3">
                    <input required type="text" placeholder="Card Number" className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-purple-500" />
                    <div className="grid grid-cols-2 gap-4">
                      <input required type="text" placeholder="MM/YY" className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm" />
                      <input required type="text" placeholder="CVV" className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm" />
                    </div>
                  </div>
                  <button type="submit" className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl">
                    Pay ${selectedExam?.price}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500 text-gray-900 rounded-lg">
            <Award size={14} className="fill-white" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white">Certification Portal</span>
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter">Professional Assessments</h1>
          <p className="text-gray-500 text-sm italic">Unlock higher career tiers with verified certification.</p>
        </div>
        
        <div className="flex items-center gap-4 p-4 bg-amber-50 border border-amber-100 rounded-2xl max-w-sm">
          <AlertCircle className="text-amber-600 shrink-0" size={20} />
          <p className="text-[11px] text-amber-800 leading-tight">
            <strong>System Note:</strong> Payments are processed securely. Transfer verification typically takes 1-12 hours by admin.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 ml-2">Available Exams</h2>
          {certifications.map((exam) => (
            <div 
              key={exam.id}
              onClick={() => setSelectedExam(exam)}
              className={`group bg-white border rounded-[2rem] p-6 cursor-pointer transition-all duration-300 ${
                selectedExam?.id === exam.id ? 'border-gray-900 ring-1 ring-gray-900 shadow-lg' : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-2xl ${exam.status === 'locked' ? 'bg-gray-50 text-gray-300' : exam.status === 'pending' ? 'bg-amber-50 text-amber-500' : 'bg-emerald-50 text-emerald-600'}`}>
                    {exam.status === 'locked' ? <Lock size={20} /> : <GraduationCap size={20} />}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{exam.title}</h3>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1"><Timer size={12}/> {exam.duration}</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1"><FileText size={12}/> {exam.questions} Qs</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-gray-900">${exam.price}</p>
                  <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
                    exam.status === 'unlocked' ? 'bg-emerald-100 text-emerald-600' : 
                    exam.status === 'pending' ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {exam.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-gray-900 rounded-[2.5rem] p-8 text-white shadow-2xl">
            {selectedExam ? (
              <div className="space-y-6 animate-in fade-in duration-500">
                <h3 className="text-xl font-black tracking-tight">{selectedExam.title}</h3>
                <ul className="space-y-4">
                  {["One-time attempt per purchase.", "75% required to pass.", "No tab-switching allowed.", "Instant Digital Certificate."].map((text, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs text-gray-400 leading-relaxed">
                      <CheckCircle2 size={14} className="text-gray-500 mt-0.5 shrink-0" />
                      {text}
                    </li>
                  ))}
                </ul>

                <div className="pt-6 border-t border-white/10">
                  {selectedExam.status === 'locked' ? (
                    <button onClick={() => setShowPaymentModal(true)} className="w-full py-4 bg-cyan-500 text-gray-900 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-cyan-400 transition-all active:scale-95">
                      Unlock for ${selectedExam.price}
                    </button>
                  ) : selectedExam.status === 'pending' ? (
                    <div className="w-full py-4 bg-white/5 border border-white/20 text-amber-400 rounded-2xl font-black uppercase text-[10px] tracking-widest text-center italic">
                      Admin Verification...
                    </div>
                  ) : (
                    <button className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-500 transition-all active:scale-95">
                      Enter Exam Room <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-gray-600">
                  <Award size={32} />
                </div>
                <p className="text-sm text-gray-500 font-medium">Please select an assessment <br/> to view prerequisites.</p>
              </div>
            )}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-gray-500">
              <ShieldCheck size={14} className="text-purple-500" /> Secure Encryption Active
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}