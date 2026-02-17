import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, TrendingUp, Globe, DollarSign, Zap, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SpiritLogo } from './spirit-logo';

interface FutureProfile {
    currentTitle: string;
    futureTitle: string;
    skillsMastered: string[];
    globalImpact: string;
    salaryProjection: string;
    innovations: string[];
    yearsToAchieve: number;
}

const futureProfiles: Record<string, FutureProfile> = {
    'AI Engineer': {
        currentTitle: 'Aspiring Learner',
        futureTitle: 'Global AI Architect',
        skillsMastered: ['Neural Networks', 'Deep Learning', 'MLOps', 'AI Ethics', 'Quantum ML'],
        globalImpact: 'Impacting 50M+ lives through AI solutions',
        salaryProjection: '$450K - $800K annually',
        innovations: ['Autonomous Healthcare AI', 'Climate Prediction Models', 'Neural Interface Systems'],
        yearsToAchieve: 3
    },
    'Quantum Scientist': {
        currentTitle: 'Aspiring Learner',
        futureTitle: 'Quantum Computing Pioneer',
        skillsMastered: ['Quantum Mechanics', 'Qubit Engineering', 'Quantum Algorithms', 'Superconductivity'],
        globalImpact: 'Revolutionizing cryptography & drug discovery',
        salaryProjection: '$600K - $1.2M annually',
        innovations: ['Quantum Encryption', 'Molecular Simulation', 'Quantum Internet'],
        yearsToAchieve: 5
    },
    'Space Engineer': {
        currentTitle: 'Aspiring Learner',
        futureTitle: 'Interplanetary Systems Designer',
        skillsMastered: ['Orbital Mechanics', 'Propulsion Systems', 'Life Support', 'Robotics'],
        globalImpact: 'Enabling human civilization beyond Earth',
        salaryProjection: '$380K - $650K annually',
        innovations: ['Mars Habitat Systems', 'Asteroid Mining Tech', 'Deep Space Propulsion'],
        yearsToAchieve: 4
    }
};

export function FutureYou({ onStartJourney }: { onStartJourney?: () => void }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedPath, setSelectedPath] = useState<string>('AI Engineer');
    const [showTimeline, setShowTimeline] = useState(false);

    const profile = futureProfiles[selectedPath];

    return (
        <div className="relative min-h-screen flex items-center justify-center px-6 py-20">
            {/* Holographic Background Effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute inset-0"
                    animate={{
                        background: [
                            'radial-gradient(circle at 20% 50%, rgba(138, 180, 248, 0.15), transparent 50%)',
                            'radial-gradient(circle at 80% 50%, rgba(124, 77, 255, 0.15), transparent 50%)',
                            'radial-gradient(circle at 20% 50%, rgba(138, 180, 248, 0.15), transparent 50%)',
                        ]
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                />
            </div>

            <AnimatePresence mode="wait">
                {!isExpanded ? (
                    // Initial Card - "Meet Future You"
                    <motion.div
                        key="initial"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        transition={{ type: 'spring', damping: 20 }}
                        className="relative max-w-2xl w-full"
                    >
                        {/* Glow Effect */}
                        <motion.div
                            className="absolute -inset-4 rounded-3xl opacity-50"
                            animate={{
                                boxShadow: [
                                    '0 0 60px rgba(138, 180, 248, 0.3)',
                                    '0 0 100px rgba(124, 77, 255, 0.4)',
                                    '0 0 60px rgba(138, 180, 248, 0.3)',
                                ]
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />

                        {/* Card */}
                        <div className="relative bg-gradient-to-br from-[#0a0a12]/90 to-[#1a1a2e]/90 backdrop-blur-2xl border border-[#8AB4F8]/30 rounded-3xl p-12 overflow-hidden">
                            {/* Particle Effect */}
                            <div className="absolute inset-0 overflow-hidden">
                                {[...Array(20)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute w-1 h-1 bg-[#8AB4F8] rounded-full"
                                        style={{
                                            left: `${Math.random() * 100}%`,
                                            top: `${Math.random() * 100}%`,
                                        }}
                                        animate={{
                                            y: [0, -100, 0],
                                            opacity: [0, 1, 0],
                                            scale: [0, 1.5, 0],
                                        }}
                                        transition={{
                                            duration: 3 + Math.random() * 2,
                                            repeat: Infinity,
                                            delay: Math.random() * 2,
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Content */}
                            <div className="relative z-10 text-center">
                                <motion.div
                                    animate={{
                                        rotate: [0, 360],
                                        scale: [1, 1.1, 1],
                                    }}
                                    transition={{
                                        rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                                        scale: { duration: 2, repeat: Infinity, repeatType: 'reverse' }
                                    }}
                                    className="inline-block mb-8 w-24 h-24"
                                >
                                    <SpiritLogo className="w-full h-full" />
                                </motion.div>

                                <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-[#8AB4F8] to-[#7C4DFF] bg-clip-text text-transparent">
                                    Meet The Version of You
                                    <br />
                                    From 2050
                                </h1>

                                <p className="text-xl text-white/60 mb-12 max-w-xl mx-auto">
                                    AI has analyzed your potential. Ready to see who you could become?
                                </p>

                                {/* Path Selection */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                                    {Object.keys(futureProfiles).map((path) => (
                                        <motion.button
                                            key={path}
                                            onClick={() => setSelectedPath(path)}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={cn(
                                                "p-4 rounded-xl border-2 transition-all",
                                                selectedPath === path
                                                    ? "bg-[#8AB4F8]/20 border-[#8AB4F8] text-white"
                                                    : "bg-white/5 border-white/10 text-white/60 hover:border-white/30"
                                            )}
                                        >
                                            <div className="font-bold text-sm">{path}</div>
                                        </motion.button>
                                    ))}
                                </div>

                                {/* CTA */}
                                <motion.button
                                    onClick={() => {
                                        setIsExpanded(true);
                                        // Optional: pre-trigger some haptic or sound
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group relative px-12 py-6 rounded-full bg-gradient-to-r from-[#8AB4F8] to-[#7C4DFF] text-white font-black text-xl uppercase tracking-wider overflow-hidden"
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-white"
                                        initial={{ x: '-100%' }}
                                        whileHover={{ x: '100%' }}
                                        transition={{ duration: 0.5 }}
                                        style={{ opacity: 0.2 }}
                                    />
                                    <span className="relative flex items-center gap-3">
                                        Reveal My Future
                                        <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                                    </span>
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                ) : !showTimeline ? (
                    // Expanded View - Future Profile
                    <motion.div
                        key="expanded"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative max-w-6xl w-full"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left - Current You */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-[#0a0a12]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
                            >
                                <div className="text-center mb-6">
                                    <div className="text-sm uppercase tracking-widest text-white/40 mb-2">Present You</div>
                                    <h3 className="text-3xl font-black text-white/60">{profile.currentTitle}</h3>
                                </div>
                                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/20 flex items-center justify-center">
                                    <div className="text-6xl">👤</div>
                                </div>
                            </motion.div>

                            {/* Right - Future You */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="relative bg-gradient-to-br from-[#8AB4F8]/20 to-[#7C4DFF]/20 backdrop-blur-xl border-2 border-[#8AB4F8]/50 rounded-2xl p-8 overflow-hidden"
                            >
                                <motion.div
                                    className="absolute inset-0"
                                    animate={{
                                        background: [
                                            'radial-gradient(circle at 0% 0%, rgba(138, 180, 248, 0.2), transparent)',
                                            'radial-gradient(circle at 100% 100%, rgba(124, 77, 255, 0.2), transparent)',
                                            'radial-gradient(circle at 0% 0%, rgba(138, 180, 248, 0.2), transparent)',
                                        ]
                                    }}
                                    transition={{ duration: 5, repeat: Infinity }}
                                />

                                <div className="relative z-10">
                                    <div className="text-center mb-6">
                                        <div className="text-sm uppercase tracking-widest text-[#8AB4F8] mb-2">Future You • 2050</div>
                                        <h3 className="text-4xl font-black bg-gradient-to-r from-white to-[#8AB4F8] bg-clip-text text-transparent">
                                            {profile.futureTitle}
                                        </h3>
                                    </div>
                                    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-[#8AB4F8] to-[#7C4DFF] border-4 border-white/20 flex items-center justify-center shadow-2xl shadow-[#8AB4F8]/50">
                                        <div className="text-6xl">✨</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Stats Grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8"
                        >
                            <StatCard
                                icon={<TrendingUp />}
                                label="Skills Mastered"
                                value={profile.skillsMastered.length.toString()}
                                delay={0.7}
                            />
                            <StatCard
                                icon={<Globe />}
                                label="Global Impact"
                                value={profile.globalImpact}
                                delay={0.8}
                            />
                            <StatCard
                                icon={<DollarSign />}
                                label="Salary Range"
                                value={profile.salaryProjection}
                                delay={0.9}
                            />
                            <StatCard
                                icon={<Zap />}
                                label="Time to Achieve"
                                value={`${profile.yearsToAchieve} years`}
                                delay={1.0}
                            />
                        </motion.div>

                        {/* Skills & Innovations */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.1 }}
                                className="bg-[#0a0a12]/60 backdrop-blur-xl border border-[#8AB4F8]/20 rounded-2xl p-6"
                            >
                                <h4 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                                    <Sparkles size={20} className="text-[#8AB4F8]" />
                                    Skills You'll Master
                                </h4>
                                <div className="space-y-2">
                                    {profile.skillsMastered.map((skill, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 1.2 + i * 0.1 }}
                                            className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
                                        >
                                            <div className="w-2 h-2 rounded-full bg-[#8AB4F8]" />
                                            <span className="text-white/80">{skill}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.3 }}
                                className="bg-[#0a0a12]/60 backdrop-blur-xl border border-[#7C4DFF]/20 rounded-2xl p-6"
                            >
                                <h4 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                                    <Zap size={20} className="text-[#7C4DFF]" />
                                    Innovations You'll Create
                                </h4>
                                <div className="space-y-2">
                                    {profile.innovations.map((innovation, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 1.4 + i * 0.1 }}
                                            className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
                                        >
                                            <div className="w-2 h-2 rounded-full bg-[#7C4DFF]" />
                                            <span className="text-white/80">{innovation}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.7 }}
                            className="text-center mt-12 flex justify-center gap-6"
                        >
                            <motion.button
                                onClick={() => setShowTimeline(true)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-12 py-6 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 text-white font-black text-xl uppercase tracking-wider backdrop-blur-md transition-all"
                            >
                                View Timeline
                            </motion.button>

                            <motion.button
                                onClick={onStartJourney}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-12 py-6 rounded-full bg-gradient-to-r from-[#8AB4F8] to-[#7C4DFF] text-white font-black text-xl uppercase tracking-wider shadow-lg shadow-[#7C4DFF]/20"
                            >
                                Enter Command Center →
                            </motion.button>
                        </motion.div>
                    </motion.div>
                ) : (
                    // Timeline View
                    <motion.div
                        key="timeline"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center text-white"
                    >
                        <h2 className="text-6xl font-black mb-8 bg-gradient-to-r from-white to-[#8AB4F8] bg-clip-text text-transparent">Your Transformation Timeline</h2>
                        <p className="text-2xl text-white/60 mb-12">Cognitive synchronization complete. Neural pathways mapped.</p>

                        <motion.button
                            onClick={onStartJourney}
                            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(138, 180, 248, 0.5)' }}
                            whileTap={{ scale: 0.95 }}
                            className="px-16 py-8 rounded-full bg-gradient-to-r from-[#8AB4F8] to-[#7C4DFF] text-white font-black text-2xl uppercase tracking-widest shadow-2xl"
                        >
                            Enter Command Center →
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function StatCard({ icon, label, value, delay }: { icon: React.ReactNode; label: string; value: string; delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="bg-[#0a0a12]/60 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-[#8AB4F8]/50 transition-all"
        >
            <div className="text-[#8AB4F8] mb-3">{icon}</div>
            <div className="text-xs uppercase tracking-widest text-white/40 mb-2">{label}</div>
            <div className="text-lg font-bold text-white">{value}</div>
        </motion.div>
    );
}
