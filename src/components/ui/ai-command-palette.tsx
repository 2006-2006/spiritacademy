import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    BookOpen,
    Award,
    LayoutDashboard,
    Users,
    Sparkles,
    ArrowRight,
    Command
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CommandItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    category: string;
    action: () => void;
}

interface AICommandPaletteProps {
    onNavigate?: (page: string, params?: any) => void;
}

export function AICommandPalette({ onNavigate }: AICommandPaletteProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);

    const commands: CommandItem[] = [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} />, category: 'Navigate', action: () => onNavigate?.('dashboard') },
        { id: 'courses', label: 'Browse Courses', icon: <BookOpen size={18} />, category: 'Navigate', action: () => onNavigate?.('courses') },
        { id: 'certificates', label: 'Future Achievements', icon: <Award size={18} />, category: 'Navigate', action: () => onNavigate?.('certificates') },
        { id: 'mentors', label: 'Find Mentors', icon: <Users size={18} />, category: 'Navigate', action: () => onNavigate?.('mentors') },
        { id: 'ai-tutor', label: 'AI Tutor', icon: <Sparkles size={18} />, category: 'Navigate', action: () => onNavigate?.('ai-tutor') },
        { id: 'skills', label: 'Skill Topology', icon: <Search size={18} />, category: 'System', action: () => onNavigate?.('skills') },
        { id: 'learn-python', label: 'Learn Python', icon: <Search size={18} />, category: 'Quick Actions', action: () => onNavigate?.('courses', { courseId: 'python-mastery' }) },
        { id: 'continue-course', label: 'Continue Course', icon: <ArrowRight size={18} />, category: 'Quick Actions', action: () => onNavigate?.('courses') },
        { id: 'show-certificates', label: 'Show Certificates', icon: <Award size={18} />, category: 'Quick Actions', action: () => onNavigate?.('certificates') },
    ];

    const filteredCommands = commands.filter(cmd =>
        cmd.label.toLowerCase().includes(search.toLowerCase())
    );

    const groupedCommands = filteredCommands.reduce((acc, cmd) => {
        if (!acc[cmd.category]) acc[cmd.category] = [];
        acc[cmd.category].push(cmd);
        return acc;
    }, {} as Record<string, CommandItem[]>);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Open with / or Cmd+K
            if (e.key === '/' || (e.metaKey && e.key === 'k') || (e.ctrlKey && e.key === 'k')) {
                e.preventDefault();
                setIsOpen(true);
            }

            // Close with Escape
            if (e.key === 'Escape') {
                setIsOpen(false);
                setSearch('');
                setSelectedIndex(0);
            }

            // Navigate with arrows
            if (isOpen) {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1));
                }
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setSelectedIndex(prev => Math.max(prev - 1, 0));
                }
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const selected = filteredCommands[selectedIndex];
                    if (selected) {
                        selected.action();
                        setIsOpen(false);
                        setSearch('');
                        setSelectedIndex(0);
                    }
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, selectedIndex, filteredCommands]);

    return (
        <>
            {/* Trigger Button - Floating */}
            <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setIsOpen(true)}
                className="fixed top-6 right-24 z-50 px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-[#8AB4F8]/30 text-white/60 hover:text-white hover:border-[#8AB4F8]/60 transition-all flex items-center gap-2"
            >
                <Command size={16} />
                <span className="text-sm">Press / to search</span>
                <kbd className="px-2 py-0.5 text-xs bg-white/10 rounded">
                    /
                </kbd>
            </motion.button>

            {/* Command Palette Modal */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
                        />

                        {/* Palette */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="fixed top-[20%] left-1/2 transform -translate-x-1/2 w-full max-w-2xl z-[101]"
                        >
                            <div className="bg-[#0a0a12]/95 backdrop-blur-2xl border border-[#8AB4F8]/30 rounded-2xl shadow-2xl overflow-hidden">
                                {/* Search Input */}
                                <div className="flex items-center gap-3 px-6 py-4 border-b border-[#8AB4F8]/20">
                                    <Search className="text-[#8AB4F8]" size={20} />
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                            setSelectedIndex(0);
                                        }}
                                        placeholder="What do you want to do?"
                                        autoFocus
                                        className="flex-1 bg-transparent text-white placeholder:text-white/40 outline-none text-lg"
                                    />
                                    <kbd className="px-3 py-1 text-xs bg-white/10 rounded text-white/60">
                                        ESC
                                    </kbd>
                                </div>

                                {/* Commands List */}
                                <div className="max-h-96 overflow-y-auto p-2">
                                    {Object.entries(groupedCommands).map(([category, items]) => (
                                        <div key={category} className="mb-4">
                                            <div className="px-4 py-2 text-xs uppercase tracking-widest text-[#8AB4F8]/60 font-mono">
                                                {category}
                                            </div>
                                            {items.map((cmd) => {
                                                const globalIndex = filteredCommands.indexOf(cmd);
                                                const isSelected = globalIndex === selectedIndex;

                                                return (
                                                    <motion.button
                                                        key={cmd.id}
                                                        onClick={() => {
                                                            cmd.action();
                                                            setIsOpen(false);
                                                            setSearch('');
                                                            setSelectedIndex(0);
                                                        }}
                                                        onMouseEnter={() => setSelectedIndex(globalIndex)}
                                                        className={cn(
                                                            "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left",
                                                            isSelected
                                                                ? "bg-[#8AB4F8]/20 text-white"
                                                                : "text-white/60 hover:bg-white/5 hover:text-white"
                                                        )}
                                                    >
                                                        <div className={cn(
                                                            "p-2 rounded-lg transition-all",
                                                            isSelected ? "bg-[#8AB4F8]/30" : "bg-white/5"
                                                        )}>
                                                            {cmd.icon}
                                                        </div>
                                                        <span className="flex-1">{cmd.label}</span>
                                                        {isSelected && (
                                                            <kbd className="px-2 py-1 text-xs bg-white/10 rounded">
                                                                ↵
                                                            </kbd>
                                                        )}
                                                    </motion.button>
                                                );
                                            })}
                                        </div>
                                    ))}

                                    {filteredCommands.length === 0 && (
                                        <div className="px-4 py-12 text-center text-white/40">
                                            <Sparkles className="mx-auto mb-4 opacity-40" size={32} />
                                            <p>No commands found</p>
                                            <p className="text-xs mt-2">Try "learn python" or "show certificates"</p>
                                        </div>
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between px-6 py-3 border-t border-[#8AB4F8]/20 bg-black/20">
                                    <div className="flex items-center gap-4 text-xs text-white/40">
                                        <div className="flex items-center gap-1">
                                            <kbd className="px-2 py-1 bg-white/10 rounded">↑</kbd>
                                            <kbd className="px-2 py-1 bg-white/10 rounded">↓</kbd>
                                            <span>Navigate</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <kbd className="px-2 py-1 bg-white/10 rounded">↵</kbd>
                                            <span>Select</span>
                                        </div>
                                    </div>
                                    <div className="text-xs text-white/40">
                                        Powered by AI
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
