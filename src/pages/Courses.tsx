import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowRight, X, Play, Clock, Award, CheckCircle } from 'lucide-react';

interface CoursesProps {
    onShowToast: (message: string) => void;
}

interface Course {
    id: string;
    title: string;
    level: string;
    icon: string;
    progress: number;
    status: 'synced' | 'locked' | 'available';
    description: string;
    modules: { title: string; duration: string; completed: boolean }[];
}

const COURSES_DATA: Course[] = [
    {
        id: 'neural-arch',
        title: 'Neural Architectures',
        level: 'Expert',
        icon: '🧠',
        progress: 65,
        status: 'synced',
        description: 'Advanced study of biological neural networks and their synthetic replications. Master the art of brain-computer interface design.',
        modules: [
            { title: 'Synaptic Bridging Protocols', duration: '45m', completed: true },
            { title: 'Cortex Mapping Levels 1-3', duration: '1h 20m', completed: true },
            { title: 'Neuroplasticity Simulation', duration: '55m', completed: false },
            { title: 'Direct Neural Injection', duration: '2h 10m', completed: false },
        ]
    },
    {
        id: 'bio-ethics',
        title: 'Bio-Digital Ethics',
        level: 'Advanced',
        icon: '🧬',
        progress: 12,
        status: 'locked',
        description: 'Navigating the moral landscape of synthetic life and memory modification. Essential for all high-level operators.',
        modules: [
            { title: 'The Consciousness Paradox', duration: '30m', completed: true },
            { title: 'Memory Editing Rights', duration: '45m', completed: false },
            { title: 'Synthetic Rights Declaration', duration: '1h', completed: false },
        ]
    },
    {
        id: 'quantum-crypto',
        title: 'Quantum Cryptography',
        level: 'Expert',
        icon: '💎',
        progress: 0,
        status: 'available',
        description: 'Secure your neural pathways against quantum decryption algorithms. Learn to encrypt thought patterns.',
        modules: [
            { title: 'Entanglement Basics', duration: '40m', completed: false },
            { title: 'Zero-Knowledge Thought Proofs', duration: '1h 15m', completed: false },
            { title: 'Quantum Key Distribution', duration: '2h', completed: false },
        ]
    },
    {
        id: 'synth-bio',
        title: 'Synthetic Biology',
        level: 'Intermediate',
        icon: '🔬',
        progress: 88,
        status: 'synced',
        description: 'Engineering biological systems for enhanced cognitive throughput. Designing organic storage mediums.',
        modules: [
            { title: 'DNA Data Storage', duration: '50m', completed: true },
            { title: 'Bio-Circuitry Fundamentals', duration: '1h 10m', completed: true },
            { title: 'Organic Computing Logic', duration: '2h 30m', completed: true },
            { title: 'Cellular Automata', duration: '1h', completed: false },
        ]
    },
    {
        id: 'space-time',
        title: 'Space-Time Engineering',
        level: 'Expert',
        icon: '🚀',
        progress: 45,
        status: 'synced',
        description: 'Theoretical and practical applications of non-linear temporal navigation within simulated environments.',
        modules: [
            { title: 'Chronological Anchoring', duration: '1h', completed: true },
            { title: 'Temporal Paradox Resolution', duration: '2h', completed: false },
        ]
    },
    {
        id: 'cog-offload',
        title: 'Cognitive Offloading',
        level: 'Advanced',
        icon: '⚡',
        progress: 0,
        status: 'available',
        description: 'Optimizing mental resources by externalizing memory and processing tasks to the neural cloud.',
        modules: [
            { title: 'External Memory Management', duration: '45m', completed: false },
            { title: 'Processing Distribution', duration: '1h 30m', completed: false },
        ]
    },
    {
        id: 'python-mastery',
        title: 'Python Neural Core',
        level: 'Core',
        icon: '🐍',
        progress: 0,
        status: 'available',
        description: 'The primary language of the neural collective. Master Python to interface directly with the cognitive core.',
        modules: [
            { title: 'Syntax & Semantics', duration: '1h', completed: false },
            { title: 'Data Structures', duration: '2h', completed: false },
            { title: 'Neural Scripting', duration: '3h', completed: false },
        ]
    }
];

// Helper to parse duration strings like "1h 20m", "45m" into minutes
const parseDuration = (durationStr: string): number => {
    let minutes = 0;
    const hoursMatch = durationStr.match(/(\d+)h/);
    const minsMatch = durationStr.match(/(\d+)m/);

    if (hoursMatch) minutes += parseInt(hoursMatch[1]) * 60;
    if (minsMatch) minutes += parseInt(minsMatch[1]);

    return minutes;
};

// Helper to format minutes back to string
const formatDuration = (totalMinutes: number): string => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h`;
    return `${minutes}m`;
};

export function Courses({ onShowToast, initialCourseId }: CoursesProps & { initialCourseId?: string }) {
    const [courses, setCourses] = useState(() => {
        const saved = localStorage.getItem('neural_courses_progress');
        if (saved) {
            try {
                // Merge saved data with initial structure to handle schema updates
                const parsed = JSON.parse(saved);
                return COURSES_DATA.map(c => {
                    const savedCourse = parsed.find((p: Course) => p.id === c.id);
                    return savedCourse ? { ...c, modules: savedCourse.modules, progress: savedCourse.progress, status: savedCourse.status } : c;
                });
            } catch (e) {
                console.error("Failed to parse course progress", e);
                return COURSES_DATA;
            }
        }
        return COURSES_DATA;
    });

    const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

    const selectedCourse = selectedCourseId ? courses.find(c => c.id === selectedCourseId) || null : null;

    useEffect(() => {
        if (initialCourseId) {
            const course = courses.find(c => c.id === initialCourseId);
            if (course) {
                setSelectedCourseId(course.id);
                onShowToast(`Auto-Accessing: ${course.title}`);
            }
        }
    }, [initialCourseId, onShowToast]);

    const handleModuleToggle = (courseId: string, moduleIndex: number) => {
        setCourses(prevCourses => {
            const updatedCourses = prevCourses.map(course => {
                if (course.id !== courseId) return course;

                const newModules = [...course.modules];
                newModules[moduleIndex] = {
                    ...newModules[moduleIndex],
                    completed: !newModules[moduleIndex].completed
                };

                const completedCount = newModules.filter(m => m.completed).length;
                const newProgress = Math.round((completedCount / newModules.length) * 100);

                // Auto-unlock logic could go here if we implemented dependencies

                return {
                    ...course,
                    modules: newModules,
                    progress: newProgress
                };
            });

            // Save to local storage
            localStorage.setItem('neural_courses_progress', JSON.stringify(updatedCourses));

            return updatedCourses;
        });
    };

    return (
        <div className="min-h-screen pt-24 px-6 relative overflow-hidden bg-[#0a0a12] text-white">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#8AB4F8]/10 blur-[120px]" />

            <div className="max-w-7xl mx-auto relative z-10">
                <h1 className="text-6xl font-black mb-12 uppercase tracking-tighter">
                    Quantum <span className="text-[#8AB4F8]">Library</span>
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
                    {courses.map((course, i) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className={cn(
                                "p-8 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-3xl hover:border-[#8AB4F8]/40 transition-all cursor-pointer group relative overflow-hidden",
                                course.status === 'locked' && "opacity-75 grayscale-[0.5]"
                            )}
                            onClick={() => {
                                if (course.status === 'locked') {
                                    onShowToast(`Access Denied: ${course.title} is currently Locked`);
                                } else {
                                    setSelectedCourseId(course.id);
                                    onShowToast(`Accessing: ${course.title}`);
                                }
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#8AB4F8]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="flex justify-between items-start mb-6">
                                <div className="text-5xl bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-[#8AB4F8]/10 transition-colors">
                                    {course.icon}
                                </div>
                                <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[10px] font-mono text-white/40 uppercase tracking-widest">
                                    {course.level}
                                </div>
                            </div>

                            <h3 className="text-2xl font-black text-white mb-4 group-hover:text-[#8AB4F8] transition-colors leading-tight">
                                {course.title}
                            </h3>

                            <div className="space-y-4">
                                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${course.progress}%` }}
                                        className="h-full bg-gradient-to-r from-[#8AB4F8] to-[#7C4DFF]"
                                    />
                                </div>
                                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                                    <span className="text-white/40">Progress</span>
                                    <span className="text-[#8AB4F8]">{course.progress}%</span>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                                <span className={cn(
                                    "text-[9px] font-black uppercase tracking-[0.2em]",
                                    course.status === 'locked' ? "text-red-400" : "text-[#5EEAD4]"
                                )}>
                                    {course.status}
                                </span>
                                <button className="text-white/60 group-hover:text-white transition-colors">
                                    {course.status === 'locked' ? <LockIcon /> : <ArrowRight size={16} />}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedCourse && (
                    <CourseDetailModal
                        course={selectedCourse}
                        onClose={() => setSelectedCourseId(null)}
                        onToggleModule={(index) => handleModuleToggle(selectedCourse.id, index)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

function CourseDetailModal({ course, onClose, onToggleModule }: { course: Course; onClose: () => void; onToggleModule: (index: number) => void }) {
    // Calculate stats
    const totalMinutes = course.modules.reduce((acc, m) => acc + parseDuration(m.duration), 0);
    const totalDuration = formatDuration(totalMinutes);
    const totalXP = Math.round(totalMinutes * 1.5); // 1.5 XP per minute -> 90 XP per hour

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="w-full max-w-4xl bg-[#0f0f16] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative h-64 bg-gradient-to-r from-[#8AB4F8]/10 to-[#7C4DFF]/10 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white backdrop-blur-md transition-colors"
                    >
                        <X size={20} />
                    </button>
                    <div className="absolute bottom-8 left-8 flex items-end gap-6">
                        <div className="text-8xl">{course.icon}</div>
                        <div>
                            <div className="px-3 py-1 inline-block bg-white/10 rounded-full border border-white/10 text-[10px] font-mono text-white/60 uppercase tracking-widest mb-2">
                                {course.level}
                            </div>
                            <h2 className="text-4xl font-black text-white uppercase tracking-tighter">{course.title}</h2>
                        </div>
                    </div>
                </div>

                <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-3">Course Synopsis</h3>
                            <p className="text-lg text-white/80 leading-relaxed font-light">{course.description}</p>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4">Curriculum Modules</h3>
                            <div className="space-y-3">
                                {course.modules.map((module, i) => (
                                    <div
                                        key={i}
                                        onClick={() => onToggleModule(i)}
                                        className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group cursor-pointer active:scale-[0.99] select-none"
                                    >
                                        <div className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center border transition-all",
                                            module.completed
                                                ? "bg-green-500/10 border-green-500/20 text-green-500"
                                                : "bg-white/5 border-white/10 text-white/20 group-hover:border-[#8AB4F8]/50 group-hover:text-[#8AB4F8]"
                                        )}>
                                            {module.completed ? <CheckCircle size={14} /> : <Play size={14} fill="currentColor" />}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className={cn("text-sm font-medium transition-colors", module.completed ? "text-white/60 line-through" : "text-white")}>
                                                {module.title}
                                            </h4>
                                        </div>
                                        <span className="text-xs text-white/30 font-mono">{module.duration}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10 space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-white/40">Progress</span>
                                <span className="text-white font-mono">{course.progress}%</span>
                            </div>
                            <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-[#8AB4F8]"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${course.progress}%` }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                />
                            </div>
                            <button className="w-full py-4 bg-[#8AB4F8] hover:bg-[#7C4DFF] text-black font-black rounded-xl uppercase tracking-widest transition-all flex items-center justify-center gap-2 active:scale-95">
                                <Play size={18} fill="currentColor" />
                                {course.progress === 100 ? 'Completed' : 'Continue'}
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center justify-center text-center">
                                <Clock className="text-[#8AB4F8] mb-2" size={20} />
                                <span className="text-xl font-bold text-white">{totalDuration}</span>
                                <span className="text-[9px] text-white/40 uppercase tracking-wider">Total Time</span>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center justify-center text-center">
                                <Award className="text-[#8AB4F8] mb-2" size={20} />
                                <span className="text-xl font-bold text-white">{totalXP}</span>
                                <span className="text-[9px] text-white/40 uppercase tracking-wider">XP Possible</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

function LockIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
    )
}
