import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, GraduationCap, Briefcase, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from "@/lib/utils";

interface StudentDetails {
    fullName: string;
    email: string;
    phone: string;
    education: string;
    currentRole: string;
    learningGoals: string[];
    experience: string;
}

interface StudentOnboardingProps {
    userEmail?: string;
    onComplete: (details: StudentDetails) => void;
}

const LEARNING_GOALS = [
    'Web Development',
    'Data Science',
    'AI & Machine Learning',
    'Mobile Development',
    'Cloud Computing',
    'Cybersecurity',
    'DevOps',
    'Blockchain',
];

const EXPERIENCE_LEVELS = [
    { value: 'beginner', label: 'Beginner', desc: 'Just starting out' },
    { value: 'intermediate', label: 'Intermediate', desc: 'Some experience' },
    { value: 'advanced', label: 'Advanced', desc: 'Professional level' },
];

export function StudentOnboarding({ userEmail, onComplete }: StudentOnboardingProps) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<StudentDetails>({
        fullName: '',
        email: userEmail || '',
        phone: '',
        education: '',
        currentRole: '',
        learningGoals: [],
        experience: 'beginner',
    });

    const totalSteps = 3;

    const handleNext = () => {
        if (step < totalSteps) {
            setStep(step + 1);
        } else {
            onComplete(formData);
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const toggleGoal = (goal: string) => {
        setFormData(prev => ({
            ...prev,
            learningGoals: prev.learningGoals.includes(goal)
                ? prev.learningGoals.filter(g => g !== goal)
                : [...prev.learningGoals, goal]
        }));
    };

    const canProceed = () => {
        switch (step) {
            case 1:
                return formData.fullName && formData.email;
            case 2:
                return formData.education && formData.currentRole;
            case 3:
                return formData.learningGoals.length > 0 && formData.experience;
            default:
                return false;
        }
    };

    return (
        <div className="min-h-screen w-screen bg-black relative overflow-hidden flex items-center justify-center">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#8AB4F8]/10 via-[#7C4DFF]/10 to-black" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#8AB4F8]/5 blur-[150px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#7C4DFF]/5 blur-[150px] rounded-full" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl relative z-10 px-6"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#8AB4F8]/10 to-[#7C4DFF]/10 border border-white/10 rounded-full backdrop-blur-xl mb-6">
                        <Sparkles className="w-5 h-5 text-[#8AB4F8]" />
                        <span className="text-lg font-black text-white uppercase tracking-wider">Spirit Learning</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-3">
                        Complete Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8AB4F8] to-[#7C4DFF]">Profile</span>
                    </h1>
                    <p className="text-white/60 text-lg">
                        Help us personalize your learning journey
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className="flex items-center flex-1">
                                <div className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center font-black text-sm transition-all duration-300",
                                    step >= s
                                        ? "bg-gradient-to-br from-[#8AB4F8] to-[#7C4DFF] text-white shadow-lg shadow-[#8AB4F8]/30"
                                        : "bg-white/5 border border-white/10 text-white/40"
                                )}>
                                    {s}
                                </div>
                                {s < 3 && (
                                    <div className={cn(
                                        "flex-1 h-1 mx-2 rounded-full transition-all duration-300",
                                        step > s ? "bg-gradient-to-r from-[#8AB4F8] to-[#7C4DFF]" : "bg-white/10"
                                    )} />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-xs text-white/40 uppercase tracking-wider font-bold">
                        <span>Personal Info</span>
                        <span>Background</span>
                        <span>Goals</span>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl">
                    <AnimatePresence mode="wait">
                        {/* Step 1: Personal Information */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-6">
                                    Personal Information
                                </h2>

                                <div className="space-y-4">
                                    {/* Full Name */}
                                    <div>
                                        <label className="block text-sm font-bold text-white/80 mb-2 uppercase tracking-wider">
                                            Full Name *
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                            <input
                                                type="text"
                                                value={formData.fullName}
                                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                placeholder="Enter your full name"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white placeholder:text-white/30 focus:border-[#8AB4F8] focus:outline-none focus:ring-2 focus:ring-[#8AB4F8]/20 transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-bold text-white/80 mb-2 uppercase tracking-wider">
                                            Email Address *
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="your.email@example.com"
                                                disabled={!!userEmail}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white placeholder:text-white/30 focus:border-[#8AB4F8] focus:outline-none focus:ring-2 focus:ring-[#8AB4F8]/20 transition-all disabled:opacity-50"
                                            />
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="block text-sm font-bold text-white/80 mb-2 uppercase tracking-wider">
                                            Phone Number
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                placeholder="+1 (555) 000-0000 (Optional)"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white placeholder:text-white/30 focus:border-[#8AB4F8] focus:outline-none focus:ring-2 focus:ring-[#8AB4F8]/20 transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2: Background */}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-6">
                                    Educational Background
                                </h2>

                                <div className="space-y-4">
                                    {/* Education */}
                                    <div>
                                        <label className="block text-sm font-bold text-white/80 mb-2 uppercase tracking-wider">
                                            Highest Education *
                                        </label>
                                        <div className="relative">
                                            <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                            <input
                                                type="text"
                                                value={formData.education}
                                                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                                                placeholder="e.g., Bachelor's in Computer Science"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white placeholder:text-white/30 focus:border-[#8AB4F8] focus:outline-none focus:ring-2 focus:ring-[#8AB4F8]/20 transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Current Role */}
                                    <div>
                                        <label className="block text-sm font-bold text-white/80 mb-2 uppercase tracking-wider">
                                            Current Role/Status *
                                        </label>
                                        <div className="relative">
                                            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                            <input
                                                type="text"
                                                value={formData.currentRole}
                                                onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
                                                placeholder="e.g., Student, Software Engineer, Career Changer"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white placeholder:text-white/30 focus:border-[#8AB4F8] focus:outline-none focus:ring-2 focus:ring-[#8AB4F8]/20 transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Experience Level */}
                                    <div>
                                        <label className="block text-sm font-bold text-white/80 mb-3 uppercase tracking-wider">
                                            Experience Level *
                                        </label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {EXPERIENCE_LEVELS.map((level) => (
                                                <button
                                                    key={level.value}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, experience: level.value })}
                                                    className={cn(
                                                        "p-4 rounded-xl border-2 transition-all duration-300 text-left",
                                                        formData.experience === level.value
                                                            ? "border-[#8AB4F8] bg-[#8AB4F8]/10 shadow-lg shadow-[#8AB4F8]/20"
                                                            : "border-white/10 bg-white/5 hover:bg-white/10"
                                                    )}
                                                >
                                                    <div className="font-black text-white text-sm uppercase tracking-wider mb-1">
                                                        {level.label}
                                                    </div>
                                                    <div className="text-xs text-white/60">{level.desc}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: Learning Goals */}
                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2">
                                    Learning Goals
                                </h2>
                                <p className="text-white/60 mb-6">Select all areas you're interested in learning</p>

                                <div className="grid grid-cols-2 gap-3">
                                    {LEARNING_GOALS.map((goal) => (
                                        <button
                                            key={goal}
                                            type="button"
                                            onClick={() => toggleGoal(goal)}
                                            className={cn(
                                                "p-4 rounded-xl border-2 transition-all duration-300 text-left flex items-center gap-3",
                                                formData.learningGoals.includes(goal)
                                                    ? "border-[#8AB4F8] bg-[#8AB4F8]/10 shadow-lg shadow-[#8AB4F8]/20"
                                                    : "border-white/10 bg-white/5 hover:bg-white/10"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all",
                                                formData.learningGoals.includes(goal)
                                                    ? "border-[#8AB4F8] bg-[#8AB4F8]"
                                                    : "border-white/30"
                                            )}>
                                                {formData.learningGoals.includes(goal) && (
                                                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </div>
                                            <span className="font-bold text-white text-sm">{goal}</span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                        <button
                            type="button"
                            onClick={handleBack}
                            disabled={step === 1}
                            className={cn(
                                "px-6 py-3 rounded-xl font-black uppercase tracking-wider transition-all",
                                step === 1
                                    ? "opacity-0 pointer-events-none"
                                    : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                            )}
                        >
                            Back
                        </button>

                        <button
                            type="button"
                            onClick={handleNext}
                            disabled={!canProceed()}
                            className={cn(
                                "px-8 py-3 rounded-xl font-black uppercase tracking-wider transition-all flex items-center gap-2",
                                canProceed()
                                    ? "bg-gradient-to-r from-[#8AB4F8] to-[#7C4DFF] text-white hover:scale-105 shadow-lg shadow-[#8AB4F8]/30"
                                    : "bg-white/5 text-white/30 cursor-not-allowed"
                            )}
                        >
                            {step === totalSteps ? 'Complete' : 'Next'}
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
