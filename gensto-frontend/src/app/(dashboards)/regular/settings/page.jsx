'use client';

import React, { useState, useEffect } from 'react';
import { User, Lock, Eye, EyeOff, Save, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
// Reverted to your preferred consistent import
import { REST_API } from '../../../constant';

export default function SettingsPage() {
    const [activeSection, setActiveSection] = useState('profile');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [statusMsg, setStatusMsg] = useState({ text: '', type: '' });

    // Form States
    const [bio, setBio] = useState('');
    const [userData, setUserData] = useState({ fullName: '', email: '' });
    const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' });

    // Fetch User Data on Load
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error("No authorization token found");

                // Using REST_API directly with template literals
                const res = await fetch(`${REST_API}/settings/profile`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                const result = await res.json();

                if (result.success) {
                    setUserData({
                        fullName: result.data.fullName,
                        email: result.data.email
                    });
                    setBio(result.data.bio || '');
                }
            } catch (err) {
                console.error("Failed to fetch profile:", err);
                setStatusMsg({ text: 'Session expired. Please login again.', type: 'error' });
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    const handlePasswordChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const validateAndSave = async () => {
        setSaving(true);
        setStatusMsg({ text: '', type: '' });
        const token = localStorage.getItem('token');

        try {
            // Update Bio Logic
            if (activeSection === 'profile') {
                const res = await fetch(`${REST_API}/settings/update-bio`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ bio })
                });

                const result = await res.json();
                if (result.success) {
                    setStatusMsg({ text: 'Bio updated successfully!', type: 'success' });
                } else {
                    throw new Error(result.message || "Update failed");
                }
            }

            // Change Password Logic
            else if (activeSection === 'security') {
                if (!passwords.current || !passwords.next) {
                    throw new Error('Please fill in all password fields');
                }
                if (passwords.next !== passwords.confirm) {
                    throw new Error('Passwords do not match');
                }

                const res = await fetch(`${REST_API}/settings/change-password`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        currentPassword: passwords.current,
                        newPassword: passwords.next
                    })
                });

                const data = await res.json();
                if (!data.success) throw new Error(data.message || 'Failed to update password');

                setStatusMsg({ text: 'Password updated successfully!', type: 'success' });
                setPasswords({ current: '', next: '', confirm: '' });
            }
        } catch (err) {
            setStatusMsg({ text: err.message, type: 'error' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="flex h-screen items-center justify-center bg-[#0F1113]">
            <Loader2 className="animate-spin text-blue-600" size={40} />
        </div>
    );

    return (
        <div className="p-6 lg:p-10 max-w-5xl mx-auto animate-in fade-in duration-500">
            <div className="mb-10">
                <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Account Settings</h1>
                <p className="text-slate-500 text-sm mt-1">Manage your digital identity and hub preferences.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar Navigation */}
                <div className="space-y-2">
                    {[
                        { id: 'profile', label: 'Identity', icon: User },
                        { id: 'security', label: 'Security', icon: Lock },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => { setActiveSection(item.id); setStatusMsg({ text: '', type: '' }); }}
                            className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeSection === item.id
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                                : 'text-slate-500 hover:bg-[#1A1D21] hover:text-slate-300'
                                }`}
                        >
                            <item.icon size={16} />
                            {item.label}
                        </button>
                    ))}
                </div>

                <div className="lg:col-span-3 space-y-6">
                    {/* PROFILE SECTION */}
                    {activeSection === 'profile' && (
                        <div className="bg-[#1A1D21] border border-slate-800 rounded-[2.5rem] p-8 md:p-10 space-y-8 animate-in slide-in-from-right-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2 opacity-60">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Full Name (Locked)</label>
                                    <input type="text" value={userData.fullName} readOnly className="w-full bg-[#0F1113] border border-slate-800/50 rounded-2xl p-4 text-slate-400 text-sm cursor-not-allowed outline-none" />
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

                    {/* Feedback Messages */}
                    {statusMsg.text && (
                        <div className={`flex items-center gap-3 p-4 rounded-2xl border ${statusMsg.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-green-500/10 border-green-500/20 text-green-500'}`}>
                            {statusMsg.type === 'error' ? <AlertTriangle size={18} /> : <CheckCircle2 size={18} />}
                            <p className="text-[10px] font-black uppercase tracking-widest">{statusMsg.text}</p>
                        </div>
                    )}

                    {/* Action Button */}
                    <div className="flex items-center justify-end gap-4 pt-4">
                        <button
                            onClick={validateAndSave}
                            disabled={saving}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-10 py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all flex items-center gap-3 shadow-xl shadow-blue-900/20"
                        >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save size={18} />}
                            {saving ? 'Processing...' : 'Sync Settings'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}