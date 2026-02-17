import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { MessageSquare, Zap } from 'lucide-react';

interface MentorsProps {
    onShowToast: (message: string) => void;
}

export function Mentors({ onShowToast }: MentorsProps) {
    return (
        <div className="min-h-screen pt-24 px-6 relative bg-[#0a0a12] overflow-hidden">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#7C4DFF]/10 blur-[120px]" />
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="mb-16">
                    <h1 className="text-7xl font-black text-white mb-4 uppercase tracking-tighter leading-none">
                        Neural <span className="text-[#7C4DFF]">Mentors</span>
                    </h1>
                    <p className="text-white/40 text-sm tracking-widest uppercase">Synchronize your consciousness with specialized intelligence nodes</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-32">
                    {[
                        { name: 'Dr. Orion', role: 'Quantum Logic', bio: 'Master of probability matrices and non-linear cognition.', icon: '⚛️', color: '#8AB4F8', sync: 98 },
                        { name: 'Sage v4.0', role: 'Bio-Sync', bio: 'Optimizing human-machine synergy through biological feedback loops.', icon: '🧬', color: '#7C4DFF', sync: 92 },
                        { name: 'Nova', role: 'Astro-Eng', bio: 'Engineering the infrastructures of the 2050 Martian colonization.', icon: '🚀', color: '#5EEAD4', sync: 85 }
                    ].map((mentor, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.02, y: -10 }}
                            className="p-10 bg-white/5 border border-white/10 rounded-[3.5rem] text-center backdrop-blur-3xl group relative overflow-hidden"
                            onClick={() => onShowToast(`Requesting sync with ${mentor.name}...`)}
                        >
                            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#7C4DFF]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative mb-10">
                                <div className="w-32 h-32 mx-auto rounded-full bg-[#0a0a12] border border-white/10 flex items-center justify-center text-6xl shadow-2xl group-hover:border-[#7C4DFF]/50 transition-colors relative">
                                    <div className="absolute inset-0 rounded-full bg-[#7C4DFF]/10 animate-pulse" />
                                    <span className="relative z-10">{mentor.icon}</span>
                                </div>
                                <div className="absolute top-0 right-[25%] bg-[#7C4DFF] text-black text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-tighter">
                                    LVL 9
                                </div>
                            </div>

                            <h3 className="text-4xl font-black text-white mb-2 group-hover:text-[#7C4DFF] transition-colors">{mentor.name}</h3>
                            <p className="text-[#7C4DFF] font-mono text-xs mb-8 uppercase tracking-[0.3em] font-bold">{mentor.role}</p>

                            <div className="p-6 bg-black/40 rounded-[2rem] mb-10 border border-white/5 min-h-[100px] flex items-center justify-center">
                                <p className="text-white/60 text-sm leading-relaxed italic">"{mentor.bio}"</p>
                            </div>

                            <div className="flex items-center gap-4 mb-10">
                                <div className="flex-1 bg-white/5 rounded-2xl p-4 border border-white/5">
                                    <div className="text-[9px] uppercase text-white/40 mb-1 font-bold tracking-widest">Sync Rate</div>
                                    <div className="text-xl font-black text-white">{mentor.sync}%</div>
                                </div>
                                <div className="flex-1 bg-white/5 rounded-2xl p-4 border border-white/5">
                                    <div className="text-[9px] uppercase text-white/40 mb-1 font-bold tracking-widest">Response</div>
                                    <div className="text-xl font-black text-[#5EEAD4]">~2ms</div>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button className="flex-1 py-5 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-[10px] hover:bg-[#7C4DFF] hover:text-white transition-all shadow-xl shadow-black/20 flex items-center justify-center gap-2">
                                    <Zap size={14} />
                                    Initiate Sync
                                </button>
                                <button className="p-5 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">
                                    <MessageSquare size={18} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
