'use client';

import React from 'react';
import { 
  ShieldCheck, Eye, Database, Share2, Clock, 
  Cookie, UserCircle, Lock, RefreshCw, Mail, 
  ChevronRight, FileLock, Server, Globe
} from 'lucide-react';

export default function PrivacyPolicyPage() {
  const sections = [
    { id: 'collection', title: '1. Data Collection Categories', icon: Database },
    { id: 'usage', title: '2. Processing Legal Basis', icon: RefreshCw },
    { id: 'sharing', title: '3. Third-Party Disclosures', icon: Share2 },
    { id: 'retention', title: '4. Retention & Archiving', icon: Clock },
    { id: 'cookies', title: '5. Tracking Technologies', icon: Cookie },
    { id: 'rights', title: '6. Data Subject Rights', icon: UserCircle },
    { id: 'security', title: '7. Technical Security (ISO 27001)', icon: Lock },
    { id: 'crossborder', title: '8. International Transfers', icon: Globe },
    { id: 'contact', title: '9. DPO Contact', icon: Mail },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* ISO Compliance Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-8">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-lg border border-green-100">
              <ShieldCheck size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest text-nowrap">ISO/IEC 27701 Compliant</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-600 rounded-lg">
              <FileLock size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest text-nowrap">Data Privacy Manual</span>
            </div>
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter">Privacy Policy</h1>
          <p className="text-gray-500 text-sm max-w-xl leading-relaxed">
            This policy defines how <strong>Inanst</strong> handles Personal Identifiable Information (PII) 
            in accordance with global data protection standards and the NDPA.
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest tracking-tighter">PIMS Ref: IN-PRV-2026</p>
          <p className="text-xs text-gray-500 font-medium tracking-tighter tracking-widest">Effective: March 2026</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        
        {/* Nav Sidebar */}
        <aside className="hidden lg:block lg:col-span-1 space-y-1 sticky top-24 h-fit">
          <p className="text-[10px] font-black uppercase text-gray-400 mb-4 px-4 tracking-[0.2em]">Framework</p>
          {sections.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="w-full flex items-center gap-3 px-4 py-3 text-left text-xs font-bold text-gray-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all group"
            >
              <item.icon size={16} className="group-hover:scale-110 transition-transform group-hover:text-slate-600" />
              {item.title.split('. ')[1]}
            </button>
          ))}
        </aside>

        {/* Policy Content */}
        <div className="lg:col-span-3 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm">
          <div className="p-8 md:p-12 space-y-16 text-sm">
            
            {/* 1. Collection */}
            <section id="collection" className="space-y-4">
              <div className="flex items-center gap-3 text-gray-900">
                <Database size={20} className="text-slate-600" />
                <h2 className="text-xl font-black tracking-tight">1. Data Collection Categories</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                We categorize the data we collect into three distinct streams to ensure transparency 
                under <strong>ISO 29100</strong> privacy principles:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <h4 className="font-bold text-gray-900 text-xs mb-2">Direct Identifiers</h4>
                  <p className="text-xs text-gray-500">Legal Name, Email, Phone, KYC Documents, and Billing Address.</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <h4 className="font-bold text-gray-900 text-xs mb-2">Technical Metadata</h4>
                  <p className="text-xs text-gray-500">IP Address, Device Fingerprinting, Browser Type, and Session Logs.</p>
                </div>
              </div>
            </section>

            {/* 2. Usage */}
            <section id="usage" className="space-y-4">
              <div className="flex items-center gap-3 text-gray-900">
                <RefreshCw size={20} className="text-slate-600" />
                <h2 className="text-xl font-black tracking-tight">2. Processing Legal Basis</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Inanst processes data only when a legal basis exists. This includes:
              </p>
              <ul className="space-y-3">
                {[
                  "Contractual Necessity: To fulfill our service agreement with you.",
                  "Legitimate Interest: For fraud prevention and network security.",
                  "Legal Obligation: For tax compliance and regulatory reporting.",
                  "Explicit Consent: For marketing and non-essential communications."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600">
                    <ChevronRight size={14} className="mt-1 text-slate-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 4. Retention */}
            <section id="retention" className="space-y-4">
              <div className="flex items-center gap-3 text-gray-900">
                <Clock size={20} className="text-slate-600" />
                <h2 className="text-xl font-black tracking-tight">4. Retention & Archiving</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                In line with <strong>ISO/IEC 27001:2022 Control 8.10</strong>, data is retained 
                only for the duration of the active account plus a 7-year statutory period for 
                financial records. Once data exceeds its retention window, it is subject to 
                <strong>Secure Erasure</strong> or irreversible anonymization.
              </p>
            </section>

            {/* 7. Security (High Emphasis) */}
            <section id="security" className="space-y-4 p-6 bg-slate-900 rounded-[2rem] text-slate-300">
              <div className="flex items-center gap-3 text-white">
                <Lock size={20} />
                <h2 className="text-xl font-black tracking-tight">7. Technical Security Measures</h2>
              </div>
              <p className="text-sm leading-relaxed opacity-90">
                Inanst implements a multi-layered security framework:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px]">
                <div className="flex gap-2">
                   <Server size={14} className="shrink-0 text-slate-500" />
                   <span><strong>Encryption:</strong> AES-256 for data at rest and TLS 1.3 for data in transit.</span>
                </div>
                <div className="flex gap-2">
                   <Eye size={14} className="shrink-0 text-slate-500" />
                   <span><strong>Audit Logs:</strong> Immutable logging of all administrative access.</span>
                </div>
                <div className="flex gap-2">
                   <ShieldCheck size={14} className="shrink-0 text-slate-500" />
                   <span><strong>Vulnerability:</strong> Continuous automated security scanning and quarterly audits.</span>
                </div>
                <div className="flex gap-2">
                   <UserCircle size={14} className="shrink-0 text-slate-500" />
                   <span><strong>Access:</strong> Principle of Least Privilege (PoLP) and MFA for all internal staff.</span>
                </div>
              </div>
            </section>

            {/* 9. Contact */}
            <section id="contact" className="pt-10 border-t border-gray-100">
              <div className="bg-slate-50 p-10 rounded-[2.5rem] flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-white rounded-2xl shadow-sm text-slate-600">
                  <Mail size={24} />
                </div>
                <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs">Data Protection Officer</h3>
                <p className="text-xs text-gray-500 max-w-sm">
                  For Data Subject Access Requests (DSAR) or to exercise your right to be forgotten, 
                  please contact our privacy team.
                </p>
                <a 
                  href="mailto:genstohub1@gmail.com" 
                  className="text-sm font-black text-slate-800 hover:text-slate-600 transition-colors underline underline-offset-8"
                >
                  genstohub1@gmail.com
                </a>
              </div>
            </section>

          </div>
        </div>
      </div>

      {/* ISO Footer Note */}
      <div className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em] py-10">
        Inanst Secure Information Systems Framework 2026
      </div>
    </div>
  );
}