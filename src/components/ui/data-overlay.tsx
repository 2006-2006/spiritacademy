import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function DataOverlay() {
    const [time, setTime] = useState(new Date());
    const [latency, setLatency] = useState(42);

    useEffect(() => {
        const timeInterval = setInterval(() => setTime(new Date()), 1000);
        const latencyInterval = setInterval(() => {
            setLatency(prev => Math.max(12, Math.min(99, prev + (Math.random() > 0.5 ? 2 : -2))));
        }, 2000);

        return () => {
            clearInterval(timeInterval);
            clearInterval(latencyInterval);
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
            {/* Scanlines Effect */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,118,0.06))] bg-[length:100%_2px,3px_100%]" />

            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] opacity-50" />

            {/* Corner Markers */}
            <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-[#8AB4F8]/20" />
            <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-[#8AB4F8]/20" />
            <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-[#8AB4F8]/20" />
            <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-[#8AB4F8]/20" />

            {/* Static HUD Elements */}
            <div className="absolute top-8 left-24 flex items-center gap-4">
                <div className="text-[10px] font-mono text-[#8AB4F8]/40 tracking-[0.3em] uppercase">
                    SYSTEM_STATE: STABLE • {time.toLocaleTimeString([], { hour12: false })}
                </div>
                <div className="w-16 h-1 bg-[#8AB4F8]/10 rounded-full overflow-hidden">
                    <motion.div
                        animate={{ x: [-64, 64] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-full bg-[#8AB4F8]/40"
                    />
                </div>
            </div>

            <div className="absolute bottom-8 right-24 text-right">
                <div className="text-[10px] font-mono text-[#8AB4F8]/40 tracking-[0.3em] uppercase mb-1">COGNITIVE_SYNC: ACTIVE</div>
                <div className="text-[8px] font-mono text-white/10 uppercase">
                    ENCRYPTED_CHANNEL: 0x882A...F21 • LATENCY: {latency}MS
                </div>
            </div>

            {/* Noise/Grain */}
            <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none animate-noise bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
    );
}
