'use client';

import React, { useEffect, useRef } from 'react';
import { useParticipant } from '@videosdk.live/react-sdk';


export default function LiveParticipantView({ participant, isMainStage = false }) {
    const videoRef = useRef(null);
    const audioRef = useRef(null);

    // Grab the media streams for this specific participant
    const {
        webcamStream,
        micStream,
        screenShareStream,
        webcamOn,
        micOn,
        screenShareOn
    } = useParticipant(participant.id);

    //  STREAM PROCESSING & MOUNTING MATRIX 
    useEffect(() => {

        if (videoRef.current) {
            if (isMainStage && screenShareOn && screenShareStream) {
                const mediaStream = new MediaStream();
                mediaStream.addTrack(screenShareStream.track);
                videoRef.current.srcObject = mediaStream;
                videoRef.current.play().catch((err) => console.debug("Video stream play intercepted:", err));
            } else if (webcamOn && webcamStream) {
                const mediaStream = new MediaStream();
                mediaStream.addTrack(webcamStream.track);
                videoRef.current.srcObject = mediaStream;
                videoRef.current.play().catch((err) => console.debug("Video stream play intercepted:", err));
            } else {
                videoRef.current.srcObject = null;
            }
        }
    }, [webcamStream, screenShareStream, webcamOn, screenShareOn, isMainStage]);

    //  AUDIO HOOK LAYER
    useEffect(() => {
        if (audioRef.current) {
            if (micOn && micStream && !participant.local) {
                const mediaStream = new MediaStream();
                mediaStream.addTrack(micStream.track);
                audioRef.current.srcObject = mediaStream;
                audioRef.current.play().catch((err) => console.debug("Audio stream play intercepted:", err));
            } else {
                audioRef.current.srcObject = null;
            }
        }
    }, [micStream, micOn, participant.local]);

    return (
        <div className="w-full h-full relative flex items-center justify-center bg-black">

            {!participant.local && <audio ref={audioRef} autoPlay playsInline muted={false} />}

            {/* Active Video Stream Mirroring Layer */}
            {(webcamOn || (isMainStage && screenShareOn)) ? (
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    controls={false}
                    muted={true}

                    className={`w-full h-full object-contain ${!isMainStage ? '-scale-x-100' : ''}`}
                />
            ) : (

                <div className="text-center animate-pulse">
                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-black text-slate-500 uppercase tracking-tighter mx-auto">
                        {participant.displayName?.substring(0, 2) || "ST"}
                    </div>
                </div>
            )}
        </div>
    );
}