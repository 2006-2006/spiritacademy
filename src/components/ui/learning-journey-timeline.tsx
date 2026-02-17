"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Zap, Target, Sparkles } from 'lucide-react';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface LearningStep {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    details: string[];
    duration: string;
    image: string;
    icon: React.ReactNode;
}

interface LearningJourneyTimelineProps {
    steps?: LearningStep[];
    defaultStep?: string;
}

const LEARNING_STEPS: LearningStep[] = [
    {
        id: "01",
        title: "Neural Assessment",
        subtitle: "Understanding Your Cognitive Profile",
        description: "We analyze your learning patterns, strengths, and goals to create a personalized AI-powered learning path tailored specifically for you.",
        details: ["Skill Gap Analysis", "Learning Style Assessment", "Career Goal Mapping", "AI Recommendation Engine"],
        duration: "1-2 days",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=800&fit=crop",
        icon: <Brain className="w-5 h-5" />
    },
    {
        id: "02",
        title: "Adaptive Learning Path",
        subtitle: "Your Personalized Curriculum",
        description: "Our AI creates a dynamic curriculum that adapts to your progress, ensuring optimal learning efficiency and retention.",
        details: ["Custom Module Selection", "Difficulty Progression", "Interactive Challenges", "Real-time Feedback"],
        duration: "Ongoing",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=800&fit=crop",
        icon: <Zap className="w-5 h-5" />
    },
    {
        id: "03",
        title: "Skill Mastery",
        subtitle: "Hands-on Learning Experience",
        description: "Apply your knowledge through real-world projects, mentorship sessions, and collaborative challenges with peers worldwide.",
        details: ["Live Projects", "Expert Mentorship", "Peer Collaboration", "Portfolio Building"],
        duration: "4-12 weeks",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=800&fit=crop",
        icon: <Target className="w-5 h-5" />
    },
    {
        id: "04",
        title: "Certification & Beyond",
        subtitle: "Validate Your Expertise",
        description: "Earn industry-recognized certifications and unlock career opportunities with our global network of partners and employers.",
        details: ["Certification Exams", "Career Placement", "Continuous Learning", "Alumni Network"],
        duration: "Lifetime Access",
        image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=800&fit=crop",
        icon: <Sparkles className="w-5 h-5" />
    },
];

export const LearningJourneyTimeline = ({ steps = LEARNING_STEPS, defaultStep }: LearningJourneyTimelineProps) => {
    const [activeStep, setActiveStep] = useState(defaultStep || steps[0]?.id);

    const activeStepData = steps.find(step => step.id === activeStep);
    const activeIndex = steps.findIndex(step => step.id === activeStep);

    return (
        <div className="w-full max-w-7xl mx-auto p-8 font-sans bg-[#0a0a12] rounded-3xl border border-white/10 backdrop-blur-xl relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#8AB4F8]/5 to-[#7C4DFF]/5 pointer-events-none" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#8AB4F8]/10 blur-[120px] rounded-full pointer-events-none" />

            {/* Top Navigation */}
            <TimelineNav steps={steps} activeStep={activeStep} onStepClick={setActiveStep} />

            {/* Main Content */}
            <AnimatePresence mode="wait">
                {activeStepData && (
                    <motion.div
                        key={activeStepData.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-12 grid md:grid-cols-2 gap-12 relative z-10"
                    >
                        <TimelineContent step={activeStepData} />
                        <TimelineVisual image={activeStepData.image} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bottom Timeline */}
            <BottomTimeline steps={steps} activeIndex={activeIndex} onStepClick={setActiveStep} />
        </div>
    );
};

const TimelineNav = ({ steps, activeStep, onStepClick }: { steps: LearningStep[], activeStep: string, onStepClick: (id: string) => void }) => (
    <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#8AB4F8] to-[#7C4DFF] rounded-2xl flex items-center justify-center font-black text-white shadow-lg shadow-[#8AB4F8]/20">
                S
            </div>
            <div>
                <span className="text-2xl font-black text-white uppercase tracking-tight">Learning Journey</span>
                <p className="text-xs text-white/40 uppercase tracking-widest">Neural-Powered Education</p>
            </div>
        </div>
        <div className="hidden md:flex items-center gap-2 p-1 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
            {steps.map(step => (
                <button
                    key={step.id}
                    onClick={() => onStepClick(step.id)}
                    className={cn(
                        "px-5 py-2 rounded-xl text-sm font-black uppercase tracking-wider transition-all duration-300",
                        activeStep === step.id
                            ? "bg-gradient-to-r from-[#8AB4F8] to-[#7C4DFF] text-white shadow-lg shadow-[#8AB4F8]/30"
                            : "text-white/40 hover:bg-white/5 hover:text-white/80"
                    )}
                >
                    {step.id}
                </button>
            ))}
        </div>
    </div>
);

const TimelineContent = ({ step }: { step: LearningStep }) => (
    <div className="space-y-6">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#8AB4F8]/10 border border-[#8AB4F8]/20 rounded-xl flex items-center justify-center text-[#8AB4F8]">
                {step.icon}
            </div>
            <span className="text-sm font-black text-[#8AB4F8] uppercase tracking-widest">Step {step.id}</span>
        </div>

        <div>
            <h2 className="text-4xl font-black text-white uppercase tracking-tight leading-tight">{step.title}</h2>
            <p className="mt-2 text-white/60 font-medium tracking-wide">{step.subtitle}</p>
        </div>

        <p className="text-white/80 leading-relaxed">{step.description}</p>

        <div className="grid sm:grid-cols-2 gap-3">
            {step.details.map((detail, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                >
                    <div className="w-6 h-6 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center justify-center text-green-500 text-xs font-black">✓</div>
                    <span className="text-sm text-white/90 font-medium">{detail}</span>
                </motion.div>
            ))}
        </div>

        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#8AB4F8]/10 to-[#7C4DFF]/10 border border-white/10 rounded-xl backdrop-blur-sm">
            <span className="text-2xl">⏱️</span>
            <div>
                <p className="text-xs text-white/40 uppercase tracking-widest font-bold">Duration</p>
                <span className="text-sm font-black text-white">{step.duration}</span>
            </div>
        </div>
    </div>
);

const TimelineVisual = ({ image }: { image: string }) => (
    <div className="flex items-center justify-center">
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-sm"
        >
            {/* Phone mockup */}
            <div className="relative w-full aspect-[9/16] bg-gradient-to-br from-[#1a1a2e] to-[#0a0a12] rounded-[3rem] p-3 border-4 border-white/10 shadow-2xl shadow-[#8AB4F8]/20">
                {/* Screen */}
                <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative">
                    <img src={image} alt="Learning Journey" className="w-full h-full object-cover" />

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Floating UI elements */}
                    <motion.div
                        className="absolute top-6 right-6 px-3 py-1 bg-green-500/90 backdrop-blur-sm rounded-full text-xs font-black text-white"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        ACTIVE
                    </motion.div>
                </div>

                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-3xl" />
            </div>

            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#8AB4F8]/20 to-[#7C4DFF]/20 blur-3xl -z-10" />
        </motion.div>
    </div>
);

const BottomTimeline = ({ steps, activeIndex, onStepClick }: { steps: LearningStep[], activeIndex: number, onStepClick: (id: string) => void }) => (
    <div className="mt-16 relative z-10">
        <div className="relative w-full h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
                className="absolute h-2 bg-gradient-to-r from-[#8AB4F8] to-[#7C4DFF] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(activeIndex / (steps.length - 1)) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute w-5 h-5 -top-1.5 rounded-full bg-white shadow-[0_0_20px_rgba(138,180,248,0.6)] border-2 border-[#8AB4F8]"
                initial={{ left: '0%' }}
                animate={{ left: `calc(${(activeIndex / (steps.length - 1)) * 100}% - 10px)` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            />
        </div>

        <div className="mt-6 grid grid-cols-4 gap-4">
            {steps.map((step, i) => (
                <button
                    key={step.id}
                    onClick={() => onStepClick(step.id)}
                    className="text-center group"
                >
                    <div className={cn(
                        "w-12 h-12 mx-auto mb-2 rounded-2xl flex items-center justify-center transition-all duration-300 border-2",
                        i <= activeIndex
                            ? "bg-gradient-to-br from-[#8AB4F8] to-[#7C4DFF] border-[#8AB4F8] text-white shadow-lg shadow-[#8AB4F8]/30"
                            : "bg-white/5 border-white/10 text-white/40 group-hover:bg-white/10"
                    )}>
                        {step.icon}
                    </div>
                    <span className={cn(
                        "text-xs font-black uppercase tracking-wider block transition-colors",
                        i <= activeIndex ? "text-[#8AB4F8]" : "text-white/40 group-hover:text-white/60"
                    )}>
                        {step.id}
                    </span>
                    <p className={cn(
                        "text-xs mt-1 transition-colors font-medium",
                        i <= activeIndex ? "text-white/80" : "text-white/30 group-hover:text-white/50"
                    )}>
                        {step.title.split(' ')[0]}
                    </p>
                </button>
            ))}
        </div>
    </div>
);
