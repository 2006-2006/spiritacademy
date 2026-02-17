import { motion } from 'framer-motion';
import { LayoutDashboard, BookOpen, Users, Settings, Brain, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

import { SpiritLogo } from './spirit-logo';

interface NavRailProps {
    activePage: string;
    onNavigate: (page: string) => void;
}

export function NavigationRail({ activePage, onNavigate }: NavRailProps) {
    const navItems = [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Core' },
        { id: 'courses', icon: BookOpen, label: 'Library' },
        { id: 'analytics', icon: BarChart3, label: 'Stats' },
        { id: 'skills', icon: Brain, label: 'DNA' },
        { id: 'network', icon: Users, label: 'Social' },
    ];

    return (
        <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="fixed left-0 top-0 bottom-0 w-20 bg-black/40 backdrop-blur-3xl border-r border-white/5 z-[60] flex flex-col items-center py-10 gap-8"
        >
            <div className="w-12 h-12 mb-4 cursor-pointer group" onClick={() => onNavigate('dashboard')}>
                <SpiritLogo className="w-full h-full" />
            </div>

            <div className="flex-1 flex flex-col gap-4">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onNavigate(item.id)}
                        className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center transition-all relative group",
                            activePage === item.id
                                ? "bg-white/10 text-[#8AB4F8] border border-[#8AB4F8]/30 shadow-[0_0_15px_rgba(138,180,248,0.1)]"
                                : "text-white/30 hover:text-white hover:bg-white/5"
                        )}
                    >
                        <item.icon size={20} />

                        {/* Label Tooltip */}
                        <div className="absolute left-full ml-4 px-3 py-1 bg-[#0a0a12] border border-white/10 rounded-lg text-[10px] uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                            {item.label}
                        </div>

                        {activePage === item.id && (
                            <motion.div
                                layoutId="activeNav"
                                className="absolute -left-1 w-1.5 h-8 bg-[#8AB4F8] rounded-full shadow-[0_0_20px_#8AB4F8,0_0_40px_rgba(138,180,248,0.5)] z-10"
                            />
                        )}
                        {activePage === item.id && (
                            <motion.div
                                layoutId="activeBg"
                                className="absolute inset-0 bg-[#8AB4F8]/10 rounded-xl border border-[#8AB4F8]/20"
                            />
                        )}
                    </button>
                ))}
            </div>

            <button
                onClick={() => onNavigate('settings')}
                className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-all relative group",
                    activePage === 'settings'
                        ? "bg-[#8AB4F8]/10 text-[#8AB4F8] border border-[#8AB4F8]/30 shadow-[0_0_15px_rgba(138,180,248,0.1)]"
                        : "text-white/30 hover:text-white hover:bg-white/5"
                )}
            >
                <Settings size={20} />
                <div className="absolute left-full ml-4 px-3 py-1 bg-[#0a0a12] border border-white/10 rounded-lg text-[10px] uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                    Protocols
                </div>
                {activePage === 'settings' && (
                    <motion.div
                        layoutId="activeNav"
                        className="absolute -left-1 w-1.5 h-8 bg-[#8AB4F8] rounded-full shadow-[0_0_20px_#8AB4F8,0_0_40px_rgba(138,180,248,0.5)] z-10"
                    />
                )}
            </button>
        </motion.div>
    );
}
