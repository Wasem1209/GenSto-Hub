'use client';

import React, { useState, useEffect, useRef, use } from 'react';
import {
    Mic, MicOff, MonitorUp, MessageSquare,
    Send, Users, ShieldCheck, X,
    Camera, CameraOff, Maximize, Minimize,
    AlertCircle, Hand, Circle,
    LayoutGrid, UserSquare
} from 'lucide-react';
import { io } from 'socket.io-client';
import { useRouter } from 'next/navigation';

/**
 * LearningRoomPage - Full-Screen Professional Live Classroom
 * Path: /regular/learning-room/[id]/page.jsx
 */
export default function LearningRoomPage({ params }) {
    const router = useRouter();

    // --- UNWRAP NEXT.JS 15 ASYNC PARAMS ---
    const unwrappedParams = use(params);
    const roomId = unwrappedParams.id;

    // --- UI & MEDIA STATE ---
    const [isMuted, setIsMuted] = useState(true);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [isSharingScreen, setIsSharingScreen] = useState(false);
    const [isChatMaximized, setIsChatMaximized] = useState(false);
    const [viewMode, setViewMode] = useState('speaker');
    const [isHandRaised, setIsHandRaised] = useState(false);
    const [showEndConfirm, setShowEndConfirm] = useState(false);

    // --- DATA STATE ---
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [participants, setParticipants] = useState(1);
    const [socket, setSocket] = useState(null);

    const mainVideoRef = useRef(null);
    const selfVideoRef = useRef(null);
    const cameraStreamRef = useRef(null);
    const screenTrackRef = useRef(null);
    const chatEndRef = useRef(null);

    // --- WEBSOCKET CONNECTION ---
    useEffect(() => {
        const newSocket = io('https://your-websocket-server.com', {
            query: { roomId: roomId }
        });

        newSocket.on('connect', () => {
            newSocket.emit('join-room', { roomId: roomId, role: 'student' });
        });

        newSocket.on('new-message', (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        newSocket.on('room-update', (data) => {
            setParticipants(data.count);
        });

        setSocket(newSocket);
        return () => { if (newSocket) newSocket.disconnect(); };
    }, [roomId]);

    // --- AUTO-SCROLL CHAT ---
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // --- MEDIA HANDLERS ---
    const toggleMic = async () => {
        try {
            if (isMuted) {
                await navigator.mediaDevices.getUserMedia({ audio: true });
                setIsMuted(false);
            } else {
                setIsMuted(true);
            }
            socket?.emit('toggle-audio', { roomId, muted: !isMuted });
        } catch (err) {
            console.error("Mic access denied", err);
        }
    };

    const toggleCamera = async () => {
        try {
            if (!isCameraOn) {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                cameraStreamRef.current = stream;
                if (selfVideoRef.current) {
                    selfVideoRef.current.srcObject = stream;
                }
                setIsCameraOn(true);
            } else {
                cameraStreamRef.current?.getTracks().forEach(track => track.stop());
                setIsCameraOn(false);
            }
            socket?.emit('toggle-video', { roomId, enabled: !isCameraOn });
        } catch (err) {
            console.error("Camera error", err);
        }
    };

    // Ensure self-video starts if camera is toggled on
    useEffect(() => {
        if (isCameraOn && cameraStreamRef.current && selfVideoRef.current) {
            selfVideoRef.current.srcObject = cameraStreamRef.current;
        }
    }, [isCameraOn]);

    const toggleScreenShare = async () => {
        try {
            if (!isSharingScreen) {
                const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
                screenTrackRef.current = stream.getTracks()[0];
                if (mainVideoRef.current) mainVideoRef.current.srcObject = stream;
                screenTrackRef.current.onended = () => setIsSharingScreen(false);
                setIsSharingScreen(true);
            } else {
                screenTrackRef.current?.stop();
                setIsSharingScreen(false);
            }
        } catch (err) {
            console.error("Screen share error", err);
        }
    };

    const handleRaiseHand = () => {
        const newState = !isHandRaised;
        setIsHandRaised(newState);
        socket?.emit('raise-hand', { roomId, raised: newState });
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;
        const msgData = {
            id: Date.now(),
            text: inputText,
            sender: 'You',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        socket?.emit('send-message', { roomId, ...msgData });
        setMessages((prev) => [...prev, msgData]);
        setInputText('');
    };

    /** * REDIRECT LOGIC: 
     
     */
    const handleLeaveClass = () => {
        // 1. Stop Camera
        if (cameraStreamRef.current) {
            cameraStreamRef.current.getTracks().forEach(track => track.stop());
        }
        // 2. Stop Screen Share
        if (screenTrackRef.current) {
            screenTrackRef.current.stop();
        }
        // 3. Navigate back to my-classes
        router.push('/regular/my-class');
    };

    return (
        <div className="fixed inset-0 z-[9999] flex flex-col h-screen bg-[#0F1113] text-slate-200 overflow-hidden font-sans">

            {/* TOP BAR */}
            <header className="h-12 bg-[#1A1D21] border-b border-slate-800 flex items-center justify-between px-4 z-20 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-slate-800/50 px-2 py-1 rounded border border-slate-700">
                        <ShieldCheck size={14} className="text-green-500" />
                        <span className="text-[10px] font-bold text-slate-300 uppercase">Secure Connection</span>
                    </div>
                    <div className="h-4 w-[1px] bg-slate-700 mx-1" />
                    <span className="text-xs font-black tracking-tight text-white uppercase">
                        Inanst Tech Hub <span className="text-slate-500 mx-2 font-normal">|</span>
                        <span className="text-blue-400 font-medium normal-case">Room: {roomId}</span>
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-red-500/10 border border-red-500/20">
                        <Circle size={8} className="fill-red-500 text-red-500 animate-pulse" />
                        <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Live Recording</span>
                    </div>
                </div>
            </header>

            {/* VIEWPORT */}
            <main className="flex-1 flex overflow-hidden">
                <div className="flex-1 flex flex-col relative bg-black">
                    {/* Toggles */}
                    <div className="absolute top-4 left-4 z-10 flex gap-1 bg-black/40 backdrop-blur-md p-1 rounded-lg border border-white/10">
                        <button
                            onClick={() => setViewMode('speaker')}
                            className={`p-1.5 rounded-md flex items-center gap-2 text-[10px] font-bold uppercase transition-all ${viewMode === 'speaker' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
                        >
                            <UserSquare size={14} /> Speaker
                        </button>
                        <button
                            onClick={() => setViewMode('gallery')}
                            className={`p-1.5 rounded-md flex items-center gap-2 text-[10px] font-bold uppercase transition-all ${viewMode === 'gallery' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
                        >
                            <LayoutGrid size={14} /> Gallery
                        </button>
                    </div>

                    {/* VIDEO STAGE */}
                    <div className={`flex-1 flex items-center justify-center p-4 ${viewMode === 'gallery' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'relative'}`}>

                        {/* Instructor View */}
                        <div className="relative w-full h-full bg-[#1A1D21] rounded-2xl flex items-center justify-center border border-white/5 overflow-hidden group">
                            <video ref={mainVideoRef} autoPlay playsInline className="w-full h-full object-contain" />
                            {!isSharingScreen && (
                                <div className="text-center">
                                    <div className="w-20 h-20 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-4 text-blue-500/50">
                                        <Users size={32} />
                                    </div>
                                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Instructor Stream</p>
                                </div>
                            )}
                            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold border border-white/5">
                                Instructor: Dr. Sarah James
                            </div>
                        </div>

                        {/* Student (Self) View */}
                        {(viewMode === 'gallery' || isCameraOn) && (
                            <div className={`${viewMode === 'gallery' ? 'relative w-full h-full' : 'absolute bottom-6 right-6 w-52 aspect-video'} bg-[#1A1D21] rounded-2xl border-2 ${isHandRaised ? 'border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.2)]' : 'border-blue-600'} overflow-hidden shadow-2xl transition-all duration-300 z-10`}>
                                {isCameraOn ? (
                                    <video ref={selfVideoRef} autoPlay muted playsInline className="w-full h-full object-cover -scale-x-100" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-slate-800">
                                        <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-black text-slate-500 uppercase">You</div>
                                    </div>
                                )}
                                <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 rounded text-[9px] font-bold flex items-center gap-2">
                                    You {isMuted && <MicOff size={10} className="text-red-500" />}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* SIDEBAR CHAT */}
                {isChatMaximized && (
                    <aside className="w-80 bg-[#1A1D21] border-l border-slate-800 flex flex-col">
                        <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                            <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Class Chat</h2>
                            <X size={14} className="text-slate-600 cursor-pointer" onClick={() => setIsChatMaximized(false)} />
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map(msg => (
                                <div key={msg.id}>
                                    <span className="font-bold text-blue-400 text-[10px] block mb-1 uppercase tracking-tighter">{msg.sender} • {msg.time}</span>
                                    <div className="text-slate-300 text-xs leading-relaxed bg-[#0F1113] p-3 rounded-xl border border-slate-800">{msg.text}</div>
                                </div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>
                        <form onSubmit={sendMessage} className="p-4 border-t border-slate-800">
                            <div className="flex items-center gap-2 bg-[#0F1113] border border-slate-700 rounded-xl px-3 py-2">
                                <input
                                    type="text" value={inputText} onChange={(e) => setInputText(e.target.value)}
                                    placeholder="Ask a question..." className="flex-1 bg-transparent outline-none text-xs text-slate-200"
                                />
                                <button type="submit" className="text-blue-500"><Send size={16} /></button>
                            </div>
                        </form>
                    </aside>
                )}
            </main>

            {/* FOOTER CONTROLS */}
            <footer className="h-20 bg-[#1A1D21] border-t border-slate-800 px-8 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                    <div className="flex flex-col items-center w-16">
                        <button onClick={toggleMic} className={`p-3 rounded-xl transition-all ${isMuted ? 'text-red-500 bg-red-500/5 border border-red-500/20' : 'hover:bg-slate-700 text-slate-300'}`}>
                            {isMuted ? <MicOff size={22} /> : <Mic size={22} />}
                        </button>
                        <span className="text-[8px] font-black uppercase tracking-widest mt-1.5 text-slate-500">Mute</span>
                    </div>
                    <div className="flex flex-col items-center w-16">
                        <button onClick={toggleCamera} className={`p-3 rounded-xl transition-all ${!isCameraOn ? 'text-red-500 bg-red-500/5 border border-red-500/20' : 'hover:bg-slate-700 text-slate-300'}`}>
                            {isCameraOn ? <Camera size={22} /> : <CameraOff size={22} />}
                        </button>
                        <span className="text-[8px] font-black uppercase tracking-widest mt-1.5 text-slate-500">Video</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex flex-col items-center w-16 group" onClick={toggleScreenShare}>
                        <div className={`p-3 rounded-xl transition-all ${isSharingScreen ? 'text-green-500 bg-green-500/10' : 'hover:bg-slate-700 text-slate-300'}`}>
                            <MonitorUp size={22} />
                        </div>
                        <span className="text-[8px] font-black uppercase tracking-widest mt-1.5 text-slate-500">Share</span>
                    </div>

                    <div className="flex flex-col items-center w-16 group" onClick={handleRaiseHand}>
                        <div className={`p-3 rounded-xl transition-all ${isHandRaised ? 'text-yellow-500 bg-yellow-500/10' : 'hover:bg-slate-700 text-slate-300'}`}>
                            <Hand size={22} />
                        </div>
                        <span className="text-[8px] font-black uppercase tracking-widest mt-1.5 text-slate-500">Hand</span>
                    </div>

                    <div className="flex flex-col items-center w-16 group" onClick={() => setIsChatMaximized(!isChatMaximized)}>
                        <div className={`p-3 rounded-xl transition-all ${isChatMaximized ? 'text-blue-500 bg-blue-500/10' : 'hover:bg-slate-700 text-slate-300'}`}>
                            <MessageSquare size={22} />
                        </div>
                        <span className="text-[8px] font-black uppercase tracking-widest mt-1.5 text-slate-500">Chat</span>
                    </div>
                </div>

                <button
                    onClick={() => setShowEndConfirm(true)}
                    className="bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border border-red-500/20"
                >
                    Leave
                </button>
            </footer>

            {/* CONFIRMATION MODAL */}
            {showEndConfirm && (
                <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-[#1A1D21] border border-slate-800 rounded-[2.5rem] p-10 max-w-sm w-full text-center space-y-6 shadow-2xl">
                        <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto border border-red-500/20">
                            <AlertCircle size={32} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-white uppercase tracking-tight">Exit Classroom?</h3>
                            <p className="text-slate-500 text-xs mt-2 leading-relaxed">Are you sure you want to disconnect from the live session?</p>
                        </div>
                        <div className="flex flex-col gap-2 pt-2">
                            <button
                                onClick={handleLeaveClass}
                                className="w-full bg-red-600 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-red-700 transition-all shadow-lg"
                            >
                                Confirm & Leave
                            </button>
                            <button
                                onClick={() => setShowEndConfirm(false)}
                                className="w-full bg-slate-800 text-slate-400 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:text-white transition-all"
                            >
                                Stay in Class
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}