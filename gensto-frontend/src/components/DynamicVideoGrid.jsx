'use client';

import React, { useEffect } from 'react';
import { useMeeting } from '@videosdk.live/react-sdk';
import { Mic, MicOff, Video, VideoOff, Monitor, Hand, MessageSquare, LogOut } from 'lucide-react';

export default function DynamicVideoGrid({ join, leave, participants }) {

    // Automate entry connection room when UI structure resolves
    useEffect(() => {
        join();
        return () => leave();
    }, []);

    const { toggleMic, toggleWebcam, toggleScreenShare, raiseHand } = useMeeting();

    // Filter list to find who the Instructor/Host is
    const activePresenters = Array.from(participants.values()).filter(
        (p) => p.mode === "CONFERENCE"
    );

    return (
        <div className="h-screen bg-[#0F1113] flex flex-col justify-between overflow-hidden text-gray-200 font-sans">

            {/* Top Meta Navigation Bar */}
            <div className="p-4 bg-[#1A1D21] flex justify-between items-center border-b border-[#2A2F35]">
                <div className="flex items-center gap-3">
                    <span className="bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] uppercase font-black px-2 py-1 rounded">SECURE CONNECTION</span>
                    <h2 className="text-sm font-bold tracking-tight">INANST TECH HUB</h2>
                </div>
                <div className="bg-red-500 text-white px-3 py-1 text-[10px] font-black tracking-widest uppercase rounded animate-pulse">
                    • LIVE RECORDING
                </div>
            </div>

            {/* Main Stream Presentation Window */}
            <div className="flex-1 p-6 flex gap-6 items-center justify-center relative">
                <div className="w-full h-full max-w-6xl rounded-2xl bg-black/40 border border-[#2A2F35] flex flex-wrap gap-4 p-4 justify-center items-center">
                    {activePresenters.length === 0 ? (
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Waiting for Instructor to start broadcast...</p>
                    ) : (
                        activePresenters.map((participant) => (
                            <PresenterVideoTile key={participant.id} participant={participant} />
                        ))
                    )}
                </div>
            </div>

            {/* Media Controller Toolbar Footer */}
            <div className="p-6 bg-[#1A1D21] border-t border-[#2A2F35] flex justify-between items-center px-12">
                <div className="flex gap-3">
                    <button onClick={toggleMic} className="p-4 bg-[#2A2F35] hover:bg-slate-700 rounded-xl transition-all">
                        <Mic size={18} />
                    </button>
                    <button onClick={toggleWebcam} className="p-4 bg-[#2A2F35] hover:bg-slate-700 rounded-xl transition-all">
                        <Video size={18} />
                    </button>
                </div>

                <div className="flex gap-4">
                    <button onClick={toggleScreenShare} className="p-4 bg-[#2A2F35] hover:bg-slate-700 rounded-xl flex items-center gap-2 text-xs font-bold uppercase px-6">
                        <Monitor size={16} /> Share Screen
                    </button>
                    <button onClick={raiseHand} className="p-4 bg-[#2A2F35] hover:bg-slate-700 rounded-xl transition-all">
                        <Hand size={18} />
                    </button>
                    <button className="p-4 bg-[#2A2F35] hover:bg-slate-700 rounded-xl transition-all">
                        <MessageSquare size={18} />
                    </button>
                </div>

                <button onClick={leave} className="p-4 bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white rounded-xl flex items-center gap-2 text-xs font-bold uppercase px-6 transition-all">
                    <LogOut size={16} /> Leave Room
                </button>
            </div>
        </div>
    );
}


function PresenterVideoTile({ participant }) {
    const { webcamStream, webcamOn } = participant;

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl w-full h-full max-h-[500px] relative overflow-hidden flex items-center justify-center">
            {webcamOn && webcamStream ? (
                <video
                    autoPlay
                    playsInline
                    muted={participant.local}
                    ref={(ref) => {
                        if (ref) {
                            const mediaStream = new MediaStream();
                            mediaStream.addTrack(webcamStream.track);
                            ref.srcObject = mediaStream;
                        }
                    }}
                    className="w-full h-full object-cover"
                />
            ) : (
                <div className="text-center space-y-2">
                    <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 mx-auto font-bold uppercase">
                        {participant.displayName.charAt(0)}
                    </div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{participant.displayName}</p>
                </div>
            )}
            <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1 rounded text-[10px] uppercase font-black tracking-widest text-white">
                {participant.displayName}
            </div>
        </div>
    );
}