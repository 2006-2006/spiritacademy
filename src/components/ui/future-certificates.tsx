import { motion, AnimatePresence } from 'framer-motion';
import { Award, TrendingUp, Lock, Sparkles, X, CheckCircle, Clock, BookOpen, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface Certificate {
    id: string;
    title: string;
    matchPercentage: number;
    estimatedTime: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    skills: string[];
    imageUrl: string;
    isUnlocked: boolean;
    learningPath: {
        modules: string[];
        prerequisites: string[];
        careerOutcomes: string[];
        weeklyHours: number;
        certificationBody: string;
    };
}

const certificates: Certificate[] = [
    {
        id: '1',
        title: 'Certified AI Architect',
        matchPercentage: 92,
        estimatedTime: '6 months',
        difficulty: 'Expert',
        skills: ['Neural Networks', 'Deep Learning', 'MLOps', 'AI Ethics'],
        imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=400',
        isUnlocked: false,
        learningPath: {
            modules: [
                'Foundations of Neural Networks',
                'Advanced Deep Learning Architectures',
                'Natural Language Processing',
                'Computer Vision & Image Recognition',
                'Reinforcement Learning',
                'MLOps & Production Deployment',
                'AI Ethics & Responsible AI',
                'Capstone: Build Production AI System'
            ],
            prerequisites: ['Python Programming', 'Linear Algebra', 'Calculus', 'Statistics'],
            careerOutcomes: [
                'Senior AI Engineer at Tech Giants',
                'ML Research Scientist',
                'AI Solutions Architect',
                'Head of AI/ML Department'
            ],
            weeklyHours: 15,
            certificationBody: 'Global AI Certification Institute'
        }
    },
    {
        id: '2',
        title: 'Quantum Computing Specialist',
        matchPercentage: 87,
        estimatedTime: '8 months',
        difficulty: 'Expert',
        skills: ['Quantum Mechanics', 'Qubits', 'Quantum Algorithms', 'Superposition'],
        imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400',
        isUnlocked: false,
        learningPath: {
            modules: [
                'Quantum Mechanics Fundamentals',
                'Quantum Information Theory',
                'Qubit Systems & Quantum Gates',
                'Quantum Algorithms (Shor, Grover)',
                'Quantum Error Correction',
                'Quantum Cryptography',
                'Quantum Machine Learning',
                'Capstone: Quantum Circuit Design'
            ],
            prerequisites: ['Advanced Mathematics', 'Linear Algebra', 'Complex Numbers', 'Classical Computing'],
            careerOutcomes: [
                'Quantum Software Engineer',
                'Quantum Research Scientist',
                'Cryptography Specialist',
                'Quantum Hardware Developer'
            ],
            weeklyHours: 20,
            certificationBody: 'International Quantum Computing Consortium'
        }
    },
    {
        id: '3',
        title: 'Robotics Expert',
        matchPercentage: 78,
        estimatedTime: '5 months',
        difficulty: 'Advanced',
        skills: ['Kinematics', 'Computer Vision', 'ROS', 'Sensor Fusion'],
        imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=400',
        isUnlocked: false,
        learningPath: {
            modules: [
                'Robot Operating System (ROS) Basics',
                'Forward & Inverse Kinematics',
                'Path Planning & Navigation',
                'Computer Vision for Robotics',
                'Sensor Integration & Fusion',
                'Control Systems & PID',
                'Autonomous Systems Design',
                'Capstone: Build Autonomous Robot'
            ],
            prerequisites: ['Programming (Python/C++)', 'Physics', 'Control Theory Basics'],
            careerOutcomes: [
                'Robotics Engineer',
                'Autonomous Systems Developer',
                'Robotics Research Scientist',
                'Industrial Automation Specialist'
            ],
            weeklyHours: 12,
            certificationBody: 'Robotics Engineering Association'
        }
    },
    {
        id: '4',
        title: 'Blockchain Developer',
        matchPercentage: 65,
        estimatedTime: '4 months',
        difficulty: 'Intermediate',
        skills: ['Smart Contracts', 'Solidity', 'Web3', 'DeFi'],
        imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=400',
        isUnlocked: false,
        learningPath: {
            modules: [
                'Blockchain Fundamentals',
                'Ethereum & Smart Contracts',
                'Solidity Programming',
                'Web3.js & DApp Development',
                'DeFi Protocols & Architecture',
                'NFT Standards & Marketplaces',
                'Security & Auditing',
                'Capstone: Launch Your DApp'
            ],
            prerequisites: ['JavaScript', 'Basic Cryptography', 'Web Development'],
            careerOutcomes: [
                'Blockchain Developer',
                'Smart Contract Engineer',
                'DeFi Protocol Developer',
                'Web3 Solutions Architect'
            ],
            weeklyHours: 10,
            certificationBody: 'Blockchain Certification Council'
        }
    }
];

export function FutureCertificates({ onCertificateClick }: { onCertificateClick?: (certId: string) => void }) {
    const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Beginner': return '#5EEAD4';
            case 'Intermediate': return '#8AB4F8';
            case 'Advanced': return '#7C4DFF';
            case 'Expert': return '#FF6B9D';
            default: return '#8AB4F8';
        }
    };

    return (
        <section className="py-20 px-6 relative">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            repeatType: 'reverse'
                        }}
                        className="inline-block mb-6"
                    >
                        <Award className="w-16 h-16 text-[#8AB4F8]" strokeWidth={1.5} />
                    </motion.div>

                    <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6">
                        Your Future <span className="bg-gradient-to-r from-[#8AB4F8] to-[#7C4DFF] bg-clip-text text-transparent">Achievements</span>
                    </h2>

                    <p className="text-[#8AB4F8]/60 text-lg max-w-2xl mx-auto font-mono">
                        AI has predicted your optimal learning paths. <br />
                        Click any certificate to unlock your journey.
                    </p>
                </motion.div>

                {/* Certificates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {certificates.map((cert, idx) => (
                        <motion.div
                            key={cert.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ scale: 1.02, y: -5 }}
                            onClick={() => onCertificateClick?.(cert.id)}
                            className="group relative cursor-pointer"
                        >
                            {/* Glow Effect */}
                            <motion.div
                                className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                    background: `linear-gradient(135deg, ${getDifficultyColor(cert.difficulty)}40, transparent)`,
                                    filter: 'blur(20px)'
                                }}
                            />

                            {/* Card */}
                            <div className="relative bg-[#0a0a12]/80 backdrop-blur-xl border border-[#8AB4F8]/20 rounded-2xl overflow-hidden">
                                {/* Image Header */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={cert.imageUrl}
                                        alt={cert.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-[#0a0a12]/50 to-transparent" />

                                    {/* Match Badge */}
                                    <motion.div
                                        className="absolute top-4 right-4 px-4 py-2 rounded-full backdrop-blur-xl border flex items-center gap-2"
                                        style={{
                                            background: `${getDifficultyColor(cert.difficulty)}20`,
                                            borderColor: `${getDifficultyColor(cert.difficulty)}40`
                                        }}
                                        animate={{
                                            boxShadow: [
                                                `0 0 20px ${getDifficultyColor(cert.difficulty)}40`,
                                                `0 0 30px ${getDifficultyColor(cert.difficulty)}60`,
                                                `0 0 20px ${getDifficultyColor(cert.difficulty)}40`,
                                            ]
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        <TrendingUp size={16} style={{ color: getDifficultyColor(cert.difficulty) }} />
                                        <span className="font-black text-white">{cert.matchPercentage}%</span>
                                        <span className="text-xs text-white/60">match</span>
                                    </motion.div>

                                    {/* Lock Icon for Locked */}
                                    {!cert.isUnlocked && (
                                        <div className="absolute top-4 left-4 p-3 rounded-full bg-black/60 backdrop-blur-xl border border-white/20">
                                            <Lock size={16} className="text-white/60" />
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-black text-white mb-2 group-hover:text-[#8AB4F8] transition-colors">
                                                {cert.title}
                                            </h3>
                                            <div className="flex items-center gap-3 text-sm text-white/60">
                                                <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">
                                                    {cert.difficulty}
                                                </span>
                                                <span>•</span>
                                                <span>{cert.estimatedTime}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Skills */}
                                    <div className="mb-4">
                                        <p className="text-xs uppercase tracking-widest text-[#8AB4F8]/60 mb-2 font-mono">
                                            Skills You'll Master
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {cert.skills.map((skill, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1 text-xs rounded-full bg-[#8AB4F8]/10 border border-[#8AB4F8]/20 text-[#8AB4F8]"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="mb-4">
                                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${cert.matchPercentage}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: idx * 0.1 + 0.5 }}
                                                className="h-full rounded-full"
                                                style={{
                                                    background: `linear-gradient(90deg, ${getDifficultyColor(cert.difficulty)}, ${getDifficultyColor(cert.difficulty)}80)`,
                                                    boxShadow: `0 0 10px ${getDifficultyColor(cert.difficulty)}`
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedCert(cert);
                                        }}
                                        className="w-full py-3 rounded-lg bg-gradient-to-r from-[#8AB4F8]/20 to-[#7C4DFF]/20 border border-[#8AB4F8]/30 text-white font-semibold flex items-center justify-center gap-2 group-hover:border-[#8AB4F8]/60 transition-all"
                                    >
                                        <Sparkles size={16} />
                                        <span>Unlock Learning Path</span>
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* AI Prediction Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 text-center"
                >
                    <p className="text-white/40 text-sm font-mono">
                        ✨ Predictions powered by AI analysis of your skills, interests, and learning patterns
                    </p>
                </motion.div>
            </div>

            {/* Learning Path Details Modal */}
            <AnimatePresence>
                {selectedCert && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedCert(null)}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#0a0a12] border border-[#8AB4F8]/30 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedCert(null)}
                                className="absolute top-6 right-6 z-10 p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all"
                            >
                                <X size={20} className="text-white" />
                            </button>

                            {/* Scrollable Content */}
                            <div className="overflow-y-auto max-h-[90vh] scrollbar-hide">
                                {/* Header */}
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={selectedCert.imageUrl}
                                        alt={selectedCert.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-[#0a0a12]/80 to-transparent" />
                                    <div className="absolute bottom-8 left-8 right-8">
                                        <h2 className="text-4xl font-black text-white mb-2">{selectedCert.title}</h2>
                                        <div className="flex items-center gap-4 text-sm">
                                            <span className="px-3 py-1 bg-white/10 rounded-full border border-white/20 text-white">
                                                {selectedCert.difficulty}
                                            </span>
                                            <span className="text-white/60 flex items-center gap-2">
                                                <Clock size={14} />
                                                {selectedCert.estimatedTime}
                                            </span>
                                            <span className="text-[#8AB4F8] font-black">{selectedCert.matchPercentage}% Match</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 space-y-8">
                                    {/* Overview Stats */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                                            <div className="flex items-center gap-3 mb-2">
                                                <Clock className="text-[#8AB4F8]" size={20} />
                                                <span className="text-xs uppercase tracking-widest text-white/40 font-black">Time Commitment</span>
                                            </div>
                                            <p className="text-2xl font-black text-white">{selectedCert.learningPath.weeklyHours} hrs/week</p>
                                        </div>
                                        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                                            <div className="flex items-center gap-3 mb-2">
                                                <Award className="text-[#8AB4F8]" size={20} />
                                                <span className="text-xs uppercase tracking-widest text-white/40 font-black">Certification</span>
                                            </div>
                                            <p className="text-sm font-bold text-white leading-tight">{selectedCert.learningPath.certificationBody}</p>
                                        </div>
                                    </div>

                                    {/* Prerequisites */}
                                    <div>
                                        <div className="flex items-center gap-3 mb-4">
                                            <CheckCircle className="text-[#8AB4F8]" size={24} />
                                            <h3 className="text-xl font-black text-white uppercase tracking-tight">Prerequisites</h3>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            {selectedCert.learningPath.prerequisites.map((prereq, i) => (
                                                <div key={i} className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl">
                                                    <div className="w-2 h-2 rounded-full bg-[#8AB4F8]" />
                                                    <span className="text-white/90 text-sm">{prereq}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Learning Modules */}
                                    <div>
                                        <div className="flex items-center gap-3 mb-4">
                                            <BookOpen className="text-[#7C4DFF]" size={24} />
                                            <h3 className="text-xl font-black text-white uppercase tracking-tight">Learning Modules</h3>
                                        </div>
                                        <div className="space-y-3">
                                            {selectedCert.learningPath.modules.map((module, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.05 }}
                                                    className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-[#7C4DFF]/30 transition-all group"
                                                >
                                                    <div className="w-8 h-8 rounded-lg bg-[#7C4DFF]/20 border border-[#7C4DFF]/30 flex items-center justify-center flex-shrink-0 group-hover:bg-[#7C4DFF]/30 transition-all">
                                                        <span className="text-[#7C4DFF] font-black text-sm">{i + 1}</span>
                                                    </div>
                                                    <span className="text-white/90 text-sm leading-relaxed">{module}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Career Outcomes */}
                                    <div>
                                        <div className="flex items-center gap-3 mb-4">
                                            <Target className="text-[#5EEAD4]" size={24} />
                                            <h3 className="text-xl font-black text-white uppercase tracking-tight">Career Outcomes</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {selectedCert.learningPath.careerOutcomes.map((outcome, i) => (
                                                <div key={i} className="p-4 bg-gradient-to-br from-[#5EEAD4]/10 to-transparent border border-[#5EEAD4]/20 rounded-xl">
                                                    <div className="flex items-start gap-3">
                                                        <TrendingUp className="text-[#5EEAD4] flex-shrink-0 mt-0.5" size={16} />
                                                        <span className="text-white/90 text-sm font-medium">{outcome}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-4 rounded-xl bg-gradient-to-r from-[#8AB4F8] to-[#7C4DFF] text-black font-black text-lg uppercase tracking-wide flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(138,180,248,0.3)]"
                                    >
                                        <Sparkles size={20} />
                                        <span>Begin Your Journey</span>
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
}
