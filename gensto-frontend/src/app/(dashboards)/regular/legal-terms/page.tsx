'use client';

import React from 'react';
import { 
  FileText, ShieldCheck, UserCheck, CreditCard, 
  Copyright, AlertTriangle, RefreshCw, Gavel, Mail,
  ChevronRight, Database, Globe, ShieldAlert
} from 'lucide-react';

export default function TermsAndConditionsPage() {
  const sections = [
    { id: 'acceptance', title: '1. Acceptance of Terms', icon: UserCheck },
    { id: 'services', title: '2. Service Level & Availability', icon: RefreshCw },
    { id: 'responsibilities', title: '3. User Conduct & Security', icon: ShieldCheck },
    { id: 'data', title: '4. Data Protection (ISO/IEC 27001)', icon: Database },
    { id: 'payments', title: '5. Financial Transactions', icon: CreditCard },
    { id: 'intellectual', title: '6. Intellectual Property', icon: Copyright },
    { id: 'liability', title: '7. Limitation of Liability', icon: AlertTriangle },
    { id: 'governing', title: '8. Governing Law', icon: Gavel },
    { id: 'contact', title: '9. Incident Reporting', icon: Mail },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* ISO Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-600 rounded-lg">
                <FileText size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">ISO 27001 Framework</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg">
                <Globe size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">Compliance: NDPA/GDPR</span>
              </div>
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter">Terms of Service</h1>
          <p className="text-gray-500 text-sm max-w-xl">
            This document outlines the Master Service Agreement (MSA) and Information Security policies governing <strong>Inanst Digital Hub</strong>.
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Doc Ref: IN-TOS-2026</p>
          <p className="text-xs text-gray-500 font-medium">Last Audit: {new Date().getFullYear()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        
        {/* Navigation */}
        <aside className="hidden lg:block lg:col-span-1 space-y-1 sticky top-24 h-fit">
          <p className="text-[10px] font-black uppercase text-gray-400 mb-4 px-4 tracking-[0.2em]">Compliance Sections</p>
          {sections.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="w-full flex items-center gap-3 px-4 py-3 text-left text-xs font-bold text-gray-500 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all group"
            >
              <item.icon size={16} className="group-hover:scale-110 transition-transform" />
              {item.title.split('. ')[1]}
            </button>
          ))}
        </aside>

        {/* Content Section */}
        <div className="lg:col-span-3 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm overflow-hidden">
          <div className="p-8 md:p-12 space-y-12">
            
            {/* 1. Acceptance */}
            <section id="acceptance" className="space-y-4">
              <div className="flex items-center gap-3 text-gray-900">
                <UserCheck size={20} className="text-slate-600" />
                <h2 className="text-xl font-black tracking-tight">1. Acceptance of Terms</h2>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Utilization of Inanst’s digital assets, APIs, or training modules implies unconditional 
                acceptance of these terms. Under <strong>ISO 9001:2015</strong>, this agreement ensures 
                quality of service and accountability. If you are acting on behalf of a corporate entity, 
                you represent that you have the legal authority to bind said entity to these terms.
              </p>
            </section>

            {/* 2. Service Level */}
            <section id="services" className="space-y-4">
              <div className="flex items-center gap-3 text-gray-900">
                <RefreshCw size={20} className="text-slate-600" />
                <h2 className="text-xl font-black tracking-tight">2. Service Level & Availability</h2>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Inanst aims for a <strong>99.9% uptime</strong> for all digital service platforms. 
                However, &quot;Force Majeure&quot; events—including but not limited to carrier outages, 
                natural disasters, or upstream cloud failures (AWS/Vercel)—are exempt from 
                liability. Scheduled maintenance will be communicated at least 24 hours in advance.
              </p>
            </section>

            {/* 3. Security & Conduct */}
            <section id="responsibilities" className="space-y-4">
              <div className="flex items-center gap-3 text-gray-900">
                <ShieldAlert size={20} className="text-slate-600" />
                <h2 className="text-xl font-black tracking-tight">3. User Conduct & Security</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "No unauthorized penetration testing or vulnerability scanning.",
                  "Zero tolerance for SQL injection or Cross-Site Scripting (XSS) attempts.",
                  "Mandatory use of complex passwords as per ISO 27001 guidelines.",
                  "Responsibility for all activities performed under user credentials."
                ].map((text, i) => (
                  <div key={i} className="flex gap-3 p-4 bg-red-50/50 border border-red-100 rounded-2xl text-xs text-red-800 font-medium">
                    <ChevronRight size={14} className="text-red-400 shrink-0" />
                    {text}
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Data Protection */}
            <section id="data" className="space-y-4">
              <div className="flex items-center gap-3 text-gray-900">
                <Database size={20} className="text-slate-600" />
                <h2 className="text-xl font-black tracking-tight">4. Data Protection & Privacy</h2>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed italic border-l-4 border-slate-200 pl-4">
                In compliance with the <strong>Nigeria Data Protection Act (NDPA)</strong> and 
                GDPR principles, we employ AES-256 encryption for data at rest. Personal data is 
                collected solely for service provision and is never sold to third-party aggregators. 
                Users maintain the &quot;Right to be Forgotten&quot; via formal account deletion requests.
              </p>
            </section>

            {/* 5. Financials */}
            <section id="payments" className="space-y-4">
              <div className="flex items-center gap-3 text-gray-900">
                <CreditCard size={20} className="text-slate-600" />
                <h2 className="text-xl font-black tracking-tight">5. Financial Transactions</h2>
              </div>
              <div className="p-6 bg-slate-900 rounded-[2rem] text-white space-y-4">
                <div className="flex items-start gap-4">
                   <div className="p-3 bg-white/10 rounded-xl"><ShieldCheck size={20} /></div>
                   <div>
                      <p className="text-sm font-medium leading-relaxed">
                        All payments are processed via PCI-DSS compliant gateways. Bank transfers 
                        require manual verification (0 to 30 minutes) to prevent AML (Anti-Money Laundering) 
                        violations.
                      </p>
                   </div>
                </div>
              </div>
            </section>

            {/* 6. Governing Law */}
            <section id="governing" className="space-y-4">
              <div className="flex items-center gap-3 text-gray-900">
                <Gavel size={20} className="text-slate-600" />
                <h2 className="text-xl font-black tracking-tight">8. Governing Law & Arbitration</h2>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                This agreement is governed by the laws of the Federal Republic of Nigeria. 
                Before proceeding to litigation, both parties agree to attempt <strong>Mandatory 
                Binding Arbitration</strong> for a period of no less than 45 days.
              </p>
            </section>

            {/* Contact Footer */}
            <section id="contact" className="pt-10 border-t border-gray-100">
              <div className="bg-slate-50 p-8 rounded-[2rem] flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-white rounded-2xl shadow-sm text-slate-600">
                  <Mail size={24} />
                </div>
                <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs">Security & Incident Reporting</h3>
                <p className="text-xs text-gray-500 max-w-xs">
                  To report a security breach or legal concern, contact our DPO (Data Protection Officer) immediately.
                </p>
                <a 
                  href="mailto:genstohub1@gmail.com" 
                  className="text-sm font-black text-slate-600 hover:text-slate-800 transition-colors underline underline-offset-4"
                >
                  genstohub1@gmail.com
                </a>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}