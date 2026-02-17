import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BarChart3,
    TrendingUp,
    Timer,
    Award,
    Activity,
    ChevronRight,
    Search,
    Filter,
    ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SpiritLogo } from '@/components/ui/spirit-logo';

export function Analytics() {
    const [isSyncing, setIsSyncing] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsSyncing(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen pt-24 pb-12 px-8 relative bg-[#0a0a12] overflow-hidden text-white">
            {/* Background Aesthetics */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#8AB4F8]/5 blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#7C4DFF]/5 blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Top Status Bar */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10">
                            <SpiritLogo className="w-full h-full" />
                        </div>
                        <div className="font-mono text-[10px] tracking-[0.3em] text-[#8AB4F8]">
                            SYSTEM_STATE: <span className="text-green-500 animate-pulse">STABLE</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest hidden md:block">
                            Neural Link: <span className="text-white/40">Secure</span>
                        </div>
                        <div className="w-px h-4 bg-white/10 hidden md:block" />
                        <div className="font-mono text-[10px] text-white/40">
                            COORD: 42.3601° N, 71.0589° W
                        </div>
                    </div>
                </div>

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
                    <div className="space-y-2">
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-7xl font-black uppercase tracking-tighter leading-none"
                        >
                            Neural <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8AB4F8] to-[#7C4DFF]">Analytics</span>
                        </motion.h1>
                        <p className="text-white/40 text-xs tracking-[0.4em] uppercase font-medium">Real-time performance metrics and cognitive growth tracking</p>
                    </div>

                    <div className="flex gap-4">
                        <div className="px-8 py-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center min-w-[140px] group hover:border-[#8AB4F8]/50 transition-all cursor-default">
                            <span className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-2">Rank</span>
                            <span className="text-4xl font-black text-[#8AB4F8] shadow-[#8AB4F8]/20 shadow-xl">#7</span>
                        </div>
                        <div className="px-8 py-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center min-w-[140px] group hover:border-[#5EEAD4]/50 transition-all cursor-default">
                            <span className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-2">Avg Score</span>
                            <span className="text-4xl font-black text-[#5EEAD4] shadow-[#5EEAD4]/20 shadow-xl">93.3%</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
                    {/* Activity Heatmap Section */}
                    <div className="lg:col-span-3 p-10 bg-[#12121e]/40 border border-white/10 rounded-[2.5rem] backdrop-blur-3xl relative overflow-hidden">
                        <div className="flex items-center justify-between mb-10">
                            <h3 className="text-xl font-black text-white uppercase tracking-wider flex items-center gap-4">
                                <Activity className="text-[#8AB4F8]" size={24} strokeWidth={2.5} />
                                Cognitive Activity
                            </h3>
                            <div className="flex items-center gap-3 text-[10px] font-mono text-white/40 uppercase tracking-widest">
                                <span>Less</span>
                                <div className="flex gap-1.5">
                                    {[0.1, 0.3, 0.5, 0.7, 1].map((op, i) => (
                                        <div key={i} className="w-3.5 h-3.5 rounded-sm" style={{ backgroundColor: `rgba(138, 180, 248, ${op})` }} />
                                    ))}
                                </div>
                                <span>More</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 justify-center">
                            {Array.from({ length: 52 * 7 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.001 }}
                                    className={cn(
                                        "w-3.5 h-3.5 rounded-sm hover:ring-2 ring-white/30 transition-all cursor-pointer",
                                        Math.random() > 0.8 ? "bg-[#8AB4F8]" :
                                            Math.random() > 0.5 ? "bg-[#8AB4F8]/40" :
                                                Math.random() > 0.2 ? "bg-[#8AB4F8]/10" : "bg-white/[0.03]"
                                    )}
                                />
                            ))}
                        </div>

                        {/* Diagonal Accent */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#8AB4F8]/5 to-transparent pointer-events-none" />
                    </div>

                    {/* Stats Vertical Rail */}
                    <div className="flex flex-col gap-6">
                        <StatCard icon={<TrendingUp size={24} />} label="Tests Attempted" value="09" color="#8AB4F8" />
                        <StatCard icon={<Timer size={24} />} label="Time Utilized" value="0.28" color="#7C4DFF" />
                        <StatCard icon={<Award size={24} />} label="Total Score" value="310.2" color="#5EEAD4" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Radar Chart (Subject DNA) */}
                    <div className="p-10 bg-[#12121e]/40 border border-white/10 rounded-[2.5rem] backdrop-blur-3xl relative">
                        <h3 className="text-xl font-black text-white uppercase tracking-wider mb-12 flex items-center gap-4">
                            <BarChart3 className="text-[#8AB4F8]" size={24} strokeWidth={2.5} />
                            Subject DNA
                        </h3>
                        <div className="flex-1 flex items-center justify-center py-4">
                            <div className="relative w-80 h-80">
                                <RadarChart />
                                {/* Legend Labels */}
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Object Oriented</div>
                                <div className="absolute top-1/2 -right-16 -translate-y-1/2 rotate-90 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Data Science</div>
                                <div className="absolute top-1/2 -left-20 -translate-y-1/2 -rotate-90 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Cloud Foundations</div>
                                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Reinforcement</div>
                            </div>
                        </div>
                    </div>

                    {/* Test Overview List */}
                    <div className="p-10 bg-[#12121e]/40 border border-white/10 rounded-[2.5rem] backdrop-blur-3xl relative overflow-hidden">
                        <div className="flex items-center justify-between mb-10">
                            <h3 className="text-xl font-black text-white uppercase tracking-wider">Test Overview</h3>
                            <button className="text-[10px] font-black text-[#8AB4F8] hover:text-white transition-all uppercase tracking-[0.3em] flex items-center gap-2 group">
                                View History
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                        <div className="space-y-6">
                            {[
                                { subject: 'Object Oriented Software Eng', unit: 'Unit 2 Test 2', score: '91.67%', status: 'Complete', icon: '💻' },
                                { subject: 'Text and Speech Analytics', unit: 'Unit 2 Assessment 1', score: '93.33%', status: 'Complete', icon: '🗣️' },
                                { subject: 'Quantum Logic Systems', unit: 'Unit 1 Final', score: '88.00%', status: 'Analyzed', icon: '⚛️' }
                            ].map((test, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ x: 8 }}
                                    className="p-6 bg-black/40 border border-white/5 rounded-3xl flex items-center justify-between group cursor-pointer hover:border-[#8AB4F8]/30 transition-all"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 text-2xl shadow-inner group-hover:scale-110 transition-transform">
                                            {test.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-white font-black text-base uppercase tracking-tight">{test.subject}</h4>
                                            <p className="text-[#8AB4F8] text-[9px] uppercase font-mono tracking-widest mt-1.5">{test.unit}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[#8AB4F8] font-black text-2xl">{test.score}</div>
                                        <div className="text-[9px] uppercase font-black text-[#5EEAD4] tracking-[0.3em] mt-1">{test.status}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Floating Logo Ornament */}
                        <div className="absolute bottom-6 right-6 w-12 h-12 opacity-40 group-hover:opacity-100 transition-opacity">
                            <SpiritLogo className="w-full h-full" />
                        </div>
                    </div>
                </div>

                {/* Footer Branding from Screenshot */}
                <div className="mt-20 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 pt-12">
                    <div className="font-black text-[10px] text-white/10 uppercase tracking-[0.8em]">
                        We didn't design a website. We designed your future.
                    </div>
                    <div className="flex items-center gap-10">
                        <div className="text-right font-mono pointer-events-none">
                            <div className="text-[10px] text-[#8AB4F8] tracking-widest font-bold">COGNITIVE_SYNC: <span className="text-green-500">ACTIVE</span></div>
                            <div className="text-[8px] text-white/20 uppercase tracking-[0.2em] mt-1">Encrypted Channel: 0x882A...F21</div>
                        </div>
                        <div className="w-10 h-10 ring-1 ring-white/10 rounded-xl p-2 bg-white/[0.02]">
                            <SpiritLogo className="w-full h-full" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Sync Overlay - "God Mode" Touch */}
            <AnimatePresence>
                {isSyncing && (
                    <motion.div
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-[#0a0a12] flex flex-col items-center justify-center space-y-8"
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 180, 360],
                                filter: ["blur(0px)", "blur(2px)", "blur(0px)"]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-32 h-32"
                        >
                            <SpiritLogo className="w-full h-full" />
                        </motion.div>
                        <div className="space-y-4 text-center">
                            <h2 className="text-[#8AB4F8] font-mono text-xs uppercase tracking-[0.5em] animate-pulse">Syncing Neural Data...</h2>
                            <div className="w-64 h-0.5 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-[#8AB4F8] to-[#7C4DFF]"
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 2 }}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="p-8 bg-[#12121e]/40 border border-white/10 rounded-3xl flex items-center justify-between group hover:border-white/30 transition-all cursor-default overflow-hidden relative"
        >
            <div className="flex items-center gap-8 relative z-10">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 shadow-lg" style={{ color }}>
                    {icon}
                </div>
                <div>
                    <p className="text-[10px] uppercase text-white/40 font-black tracking-[0.3em] mb-2">{label}</p>
                    <h4 className="text-4xl font-black text-white tracking-tighter">{value}</h4>
                </div>
            </div>
            <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white/[0.03] to-transparent pointer-events-none" />
        </motion.div>
    );
}

function RadarChart() {
    return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_30px_rgba(138,180,248,0.3)]">
            <defs>
                <radialGradient id="radar-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#8AB4F8" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#7C4DFF" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="solid-poly" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8AB4F8" />
                    <stop offset="100%" stopColor="#7C4DFF" />
                </linearGradient>
            </defs>

            {/* Grid Rings */}
            {[20, 30, 40, 50].map(r => (
                <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="white" strokeWidth="0.1" strokeOpacity="0.1" />
            ))}

            {/* Axis Lines */}
            {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i * 45 * Math.PI) / 180;
                return (
                    <line key={i} x1="50" y1="50" x2={50 + 50 * Math.cos(angle)} y2={50 + 50 * Math.sin(angle)} stroke="white" strokeWidth="0.1" strokeOpacity="0.1" />
                );
            })}

            {/* Data Polygon */}
            <motion.polygon
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                points="50,15 75,35 85,60 65,85 35,85 15,60 25,35"
                fill="url(#radar-glow)"
                stroke="url(#solid-poly)"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />

            {/* Highlight Pips */}
            <circle cx="50" cy="15" r="1.5" fill="#fff" shadow-xl shadow-white />
            <circle cx="75" cy="35" r="1.5" fill="#fff" />
            <circle cx="25" cy="35" r="1.5" fill="#fff" />
        </svg>
    );
}
