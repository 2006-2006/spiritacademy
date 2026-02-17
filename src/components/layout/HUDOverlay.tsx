import React, { useEffect, useState } from 'react';
import { DataStream } from './DataStream';

interface HUDOverlayProps {
    currentPage: string;
}

export const HUDOverlay: React.FC<HUDOverlayProps> = ({ currentPage }) => {
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toISOString().split('T')[1].split('.')[0]);
        };
        const interval = setInterval(updateTime, 1000);
        updateTime();
        return () => clearInterval(interval);
    }, []);

    const isHome = currentPage === 'home';

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {/* Grid Background Overlay */}
            <div className="absolute inset-0 grid-bg opacity-10"></div>

            {/* Corners with micro-data */}
            <div className="absolute top-4 left-4 w-48 h-20 flex items-start gap-3">
                <div className="w-16 h-16 border-l-2 border-t-2 border-[#8AB4F8]/30 rounded-tl-lg relative">
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#8AB4F8]"></div>
                    <div className="absolute top-0 left-full ml-2 w-20 h-[1px] bg-gradient-to-r from-[#8AB4F8]/40 to-transparent"></div>
                </div>
                <div className="font-mono text-[6px] text-[#8AB4F8]/40 space-y-1 uppercase tracking-wider">
                    <div className="text-[#8AB4F8]">LOCATION: ACADEMY_HUB_01</div>
                    <div>LAT: 40.7128 N</div>
                    <div>LNG: 74.0060 W</div>
                    <div className="pt-1 opacity-20">ENCRYPTION: AES-Q256</div>
                </div>
            </div>

            <div className="absolute bottom-4 right-4 w-48 h-20 flex items-end justify-end gap-3 text-right">
                <div className="font-mono text-[6px] text-[#8AB4F8]/40 space-y-1 uppercase tracking-wider">
                    <div className="text-[#5EEAD4]">NETWORK: QUANTUM_LINK_STABLE</div>
                    <div>RT_V: {(Math.random() * 100).toFixed(2)}</div>
                    <div>SYNC_RATE: 99.9%</div>
                    <div className="pt-1 opacity-20">SIGNAL: 1.2 THz</div>
                </div>
                <div className="w-16 h-16 border-r-2 border-b-2 border-[#8AB4F8]/30 rounded-br-lg relative">
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#5EEAD4]"></div>
                    <div className="absolute bottom-0 right-full mr-2 w-20 h-[1px] bg-gradient-to-l from-[#5EEAD4]/40 to-transparent"></div>
                </div>
            </div>

            {/* Top Info Bar - Advanced Telemetry */}
            <div className="absolute top-4 left-6 right-[450px] flex justify-between items-center text-[7px] font-mono text-[#8AB4F8]/50 tracking-[0.4em] uppercase">
                <div className="flex items-center gap-6">
                    <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_red]"></span>
                        SPIRIT_V4.0_CORE
                    </span>
                    <span className="opacity-20 select-none">//</span>
                    <span className="text-[#8AB4F8]/80">NEURAL_DOMAIN: ACTIVE</span>
                    <span className="opacity-20 select-none">//</span>
                    <span>BUFFER: 0ms</span>
                </div>
                <div className="flex items-center gap-12">
                    <div className="flex gap-6">
                        <span className="text-[#5EEAD4] flex items-center gap-1.5">
                            <span className="w-1 h-3 bg-[#5EEAD4]/20 inline-block relative">
                                <span className="absolute inset-0 bg-[#5EEAD4] animate-pulse"></span>
                            </span>
                            PWR: 84%
                        </span>
                        <span className="text-[#7C4DFF]">DIST: STABLE</span>
                    </div>
                    <span className="text-white/80 tabular-nums bg-white/5 px-2 py-0.5 rounded">{time}</span>
                </div>
            </div>

            {/* Vertical Data Lines */}
            <div className="absolute top-1/2 left-4 -translate-y-1/2 flex flex-col gap-2">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="w-1 h-[1px] bg-[#8AB4F8]/30"></div>
                ))}
            </div>
            <div className="absolute top-1/2 right-4 -translate-y-1/2 flex flex-col gap-2">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="w-1 h-[1px] bg-[#8AB4F8]/30"></div>
                ))}
            </div>

            {/* Central Impossible Ring Targeting - Removed for cleaner UI */}
            {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-10">
                <div className="absolute inset-0 border border-white/5 rounded-full animate-spin-slow"></div>
                <div className="absolute inset-20 border border-[#8AB4F8]/10 rounded-full border-dashed animate-spin-slow-reverse"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-px h-[40px] bg-[#8AB4F8]/40 absolute top-0"></div>
                    <div className="w-px h-[40px] bg-[#8AB4F8]/40 absolute bottom-0"></div>
                    <div className="h-px w-[40px] bg-[#8AB4F8]/40 absolute left-0"></div>
                    <div className="h-px w-[40px] bg-[#8AB4F8]/40 absolute right-0"></div>
                </div>
            </div> */}

            {/* Scanning Data Streams */}
            <DataStream side="left" />
            <DataStream side="right" />

            {/* Scanline Animation - Conditional */}
            {isHome && <div className="scanline"></div>}
        </div>
    );
};
