import { motion } from 'framer-motion';

export function SpiritLogo({ className = "", showLabel = true, showAura = true }: { className?: string; showLabel?: boolean; showAura?: boolean }) {
    return (
        <div className={`relative flex items-center justify-center ${className} select-none group`}>
            {/* Advanced Filter Definitions */}
            <svg className="absolute w-0 h-0">
                <defs>
                    <filter id="chromatic-aberration-extreme">
                        <feOffset in="SourceGraphic" dx="-2" dy="0" result="red" />
                        <feOffset in="SourceGraphic" dx="2" dy="0" result="blue" />
                        <feColorMatrix in="red" type="matrix" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" result="redOnly" />
                        <feColorMatrix in="blue" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0" result="blueOnly" />
                        <feBlend in="redOnly" in2="blueOnly" mode="screen" result="aberration" />
                        <feBlend in="aberration" in2="SourceGraphic" mode="screen" />
                    </filter>

                    <linearGradient id="logo-grad-supernova" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fff">
                            <animate attributeName="stop-color" values="#fff;#8AB4F8;#fff" dur="2s" repeatCount="indefinite" />
                        </stop>
                        <stop offset="40%" stopColor="#8AB4F8" />
                        <stop offset="70%" stopColor="#7C4DFF" />
                        <stop offset="100%" stopColor="#5EEAD4" />
                    </linearGradient>

                    <filter id="ultra-glow" x="-100%" y="-100%" width="300%" height="300%">
                        <feGaussianBlur stdDeviation="3.5" result="blur" />
                        <feFlood floodColor="#8AB4F8" floodOpacity="0.8" result="color" />
                        <feComposite in="color" in2="blur" operator="in" result="glow" />
                        <feMerge>
                            <feMergeNode in="glow" />
                            <feMergeNode in="glow" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    <radialGradient id="inner-aurora" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#8AB4F8" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                </defs>
            </svg>

            {/* External Core Aura */}
            {showAura && (
                <motion.div
                    animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.2, 0.4, 0.2],
                        rotate: [0, 90, 180, 270, 360]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-40%] bg-gradient-to-tr from-[#8AB4F8]/20 via-[#7C4DFF]/10 to-transparent blur-3xl rounded-full"
                />
            )}

            {/* High-Speed Rotating HUD Rings */}
            {showAura && (
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-15%] opacity-60"
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full text-[#8AB4F8]">
                        <circle cx="50" cy="50" r="49.5" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 12" />
                        <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.1" strokeOpacity="0.2" />
                    </svg>
                </motion.div>
            )}

            {/* Main Logo Container */}
            <div className="relative w-full h-full bg-[#050510] border border-white/30 rounded-2xl flex items-center justify-center overflow-hidden shadow-[0_0_60px_rgba(138,180,248,0.3)] group-hover:shadow-[0_0_80px_rgba(138,180,248,0.5)] transition-shadow duration-500">
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(138,180,248,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(138,180,248,0.1)_1px,transparent_1px)] bg-[size:10%_10%]" />

                {/* Shimmer Sweep Effect */}
                <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 z-0 pointer-events-none"
                />

                {/* Reticle / Corner Brackets (More vibrant) */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#8AB4F8] shadow-[0_0_10px_#8AB4F8]" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#8AB4F8] shadow-[0_0_10px_#8AB4F8]" />

                {/* Center Content Group */}
                <div className="relative z-10 flex items-center justify-center w-full h-full" style={{ filter: 'url(#chromatic-aberration-extreme)' }}>
                    {/* The S-Path with intense glow */}
                    <svg viewBox="0 0 40 40" className="w-12 h-12">
                        <motion.path
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            d="M10 30C10 30 13 34 20 34C27 34 30 30 30 24C30 18 25 16 20 16C15 16 10 14 10 9C10 4 13 1 20 1C27 1 30 4 30 4"
                            fill="none"
                            stroke="url(#logo-grad-supernova)"
                            strokeWidth="4.5"
                            strokeLinecap="round"
                            filter="url(#ultra-glow)"
                        />

                        {/* Quantum Nodes (Pulsing intensely) */}
                        <motion.circle
                            animate={{
                                scale: [0.8, 1.5, 0.8],
                                fill: ["#ffffff", "#8AB4F8", "#ffffff"],
                                opacity: [0.7, 1, 0.7]
                            }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            cx="10" cy="30" r="3.5"
                        />
                        <motion.circle
                            animate={{
                                scale: [0.8, 1.5, 0.8],
                                fill: ["#ffffff", "#5EEAD4", "#ffffff"],
                                opacity: [0.7, 1, 0.7]
                            }}
                            transition={{ duration: 0.9, repeat: Infinity, delay: 0.2 }}
                            cx="30" cy="4" r="3.5"
                        />

                        {/* Central Lens Flare / Spark */}
                        <motion.circle
                            animate={{
                                opacity: [0, 0.8, 0],
                                scale: [0.5, 2, 0.5]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                            cx="20" cy="18" r="8"
                            fill="url(#inner-aurora)"
                        />
                    </svg>
                </div>

                {/* Scanline Overlay (Fast & Subtle) */}
                <motion.div
                    animate={{ y: ["-100%", "300%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-x-0 h-4 bg-white/5 blur-md z-0 pointer-events-none"
                />

                {/* Glitch Flash (Periodic brightness boost) */}
                <motion.div
                    animate={{ opacity: [0, 0, 1, 0, 0.5, 0] }}
                    transition={{ duration: 7, repeat: Infinity, times: [0, 0.94, 0.95, 0.96, 0.97, 1] }}
                    className="absolute inset-0 bg-white mix-blend-overlay pointer-events-none"
                />
            </div>

            {/* Label Underneath */}
            {showLabel && (
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[6px] font-black text-[#8AB4F8] tracking-[0.5em] uppercase whitespace-nowrap">Neural Core Active</span>
                </div>
            )}
        </div>
    );
}
