'use client';

import React, { useState } from 'react';
import {
    User, Lock, Bell, Eye, EyeOff, Camera,
    Shield, Save, CheckCircle2, AlertTriangle
} from 'lucide-react';

export default function SettingsPage() {
    const [activeSection, setActiveSection] = useState('profile');
    const [showPassword, setShowPassword] = useState(false);
    const [saving, setSaving] = useState(false);
    const [statusMsg, setStatusMsg] = useState('');

    // Form States
    const [bio, setBio] = useState('Full-stack Developer | MERN Expert');
    const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' });
    const [notifications, setNotifications] = useState(true);

    // Read-only Mock Data (From Signup)
    const userData = {
        name: "John Doe",
        email: "john.doe@inanstench.com"
    };

    const handlePasswordChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const validateAndSave = () => {
        setSaving(true);
        setStatusMsg('');

        // Logic for Security Validation
        if (activeSection === 'security') {
            if (passwords.next !== passwords.confirm) {
                setStatusMsg('Passwords do not match');
                setSaving(false);
                return;
            }
            if (passwords.next.length < 8) {
                setStatusMsg('New password must be at least 8 characters');
                setSaving(false);
                return;
            }
        }

        // Mock API Call
        setTimeout(() => {
            setSaving(false);
            setStatusMsg(activeSection === 'security'
                ? 'Password updated. A confirmation email has been sent.'
                : 'Settings synchronized successfully.');

            // Reset password fields if successful
            if (activeSection === 'security') setPasswords({ current: '', next: '', confirm: '' });
        }, 1500);
    };

    return (
        <div className="p-6 lg:p-10 max-w-5xl mx-auto animate-in fade-in duration-500">
            <div className="mb-10">
                <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Account Settings</h1>
                <p className="text-slate-500 text-sm mt-1">Manage your digital identity and hub preferences.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="space-y-2">
                    {[
                        { id: 'profile', label: 'Identity', icon: User },
                        { id: 'security', label: 'Security', icon: Lock },
                        { id: 'notifications', label: 'System Alerts', icon: Bell },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => { setActiveSection(item.id); setStatusMsg(''); }}
                            className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeSection === item.id
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'text-slate-500 hover:bg-[#1A1D21] hover:text-slate-300'
                                }`}
                        >
                            <item.icon size={16} />
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="lg:col-span-3 space-y-6">

                    {/* PROFILE SECTION */}
                    {activeSection === 'profile' && (
                        <div className="bg-[#1A1D21] border border-slate-800 rounded-[2.5rem] p-8 md:p-10 space-y-8 animate-in slide-in-from-right-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2 opacity-60">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Full Name (Locked)</label>
                                    <input type="text" value={userData.name} readOnly className="w-full bg-[#0F1113] border border-slate-800/50 rounded-2xl p-4 text-slate-400 text-sm cursor-not-allowed outline-none" />
                                </div>
                                <div className="space-y-2 opacity-60">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Email (Locked)</label>
                                    <input type="text" value={userData.email} readOnly className="w-full bg-[#0F1113] border border-slate-800/50 rounded-2xl p-4 text-slate-400 text-sm cursor-not-allowed outline-none" />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Your Bio</label>
                                    <textarea
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        rows={4}
                                        placeholder="Tell us about your technical expertise..."
                                        className="w-full bg-[#0F1113] border border-slate-800 rounded-2xl p-4 text-white text-sm focus:border-blue-600 outline-none transition-all resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SECURITY SECTION */}
                    {activeSection === 'security' && (
                        <div className="bg-[#1A1D21] border border-slate-800 rounded-[2.5rem] p-8 md:p-10 space-y-8 animate-in slide-in-from-right-4">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Current Password</label>
                                    <input
                                        name="current"
                                        type="password"
                                        value={passwords.current}
                                        onChange={handlePasswordChange}
                                        placeholder="••••••••"
                                        className="w-full bg-[#0F1113] border border-slate-800 rounded-2xl p-4 text-white text-sm focus:border-blue-600 outline-none"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2 relative">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">New Password</label>
                                        <input
                                            name="next"
                                            type={showPassword ? "text" : "password"}
                                            value={passwords.next}
                                            onChange={handlePasswordChange}
                                            placeholder="••••••••"
                                            className="w-full bg-[#0F1113] border border-slate-800 rounded-2xl p-4 text-white text-sm focus:border-blue-600 outline-none"
                                        />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-10 text-slate-600">
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Confirm New Password</label>
                                        <input
                                            name="confirm"
                                            type="password"
                                            value={passwords.confirm}
                                            onChange={handlePasswordChange}
                                            placeholder="••••••••"
                                            className="w-full bg-[#0F1113] border border-slate-800 rounded-2xl p-4 text-white text-sm focus:border-blue-600 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* NOTIFICATIONS SECTION */}
                    {activeSection === 'notifications' && (
                        <div className="bg-[#1A1D21] border border-slate-800 rounded-[2.5rem] p-8 md:p-10 space-y-6 animate-in slide-in-from-right-4">
                            <div className="flex items-center justify-between p-6 bg-[#0F1113] rounded-3xl border border-slate-800">
                                <div className="space-y-1">
                                    <h4 className="text-sm font-bold text-white uppercase tracking-tight">System Notifications</h4>
                                    <p className="text-xs text-slate-500">Receive alerts regarding ticket updates and hub activity.</p>
                                </div>
                                <button
                                    onClick={() => setNotifications(!notifications)}
                                    className={`w-14 h-8 rounded-full transition-all flex items-center px-1 ${notifications ? 'bg-blue-600' : 'bg-slate-800'}`}
                                >
                                    <div className={`w-6 h-6 bg-white rounded-full shadow-lg transform transition-transform ${notifications ? 'translate-x-6' : 'translate-x-0'}`} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Status Messages */}
                    {statusMsg && (
                        <div className={`flex items-center gap-3 p-4 rounded-2xl border ${statusMsg.includes('match') || statusMsg.includes('characters') ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-green-500/10 border-green-500/20 text-green-500'}`}>
                            {statusMsg.includes('match') ? <AlertTriangle size={18} /> : <CheckCircle2 size={18} />}
                            <p className="text-[10px] font-black uppercase tracking-widest">{statusMsg}</p>
                        </div>
                    )}

                    {/* Action Bar */}
                    <div className="flex items-center justify-end gap-4 pt-4">
                        <button
                            onClick={validateAndSave}
                            disabled={saving}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-10 py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all flex items-center gap-3 shadow-xl shadow-blue-900/20"
                        >
                            {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={18} />}
                            {saving ? 'Processing...' : 'Sync Settings'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}