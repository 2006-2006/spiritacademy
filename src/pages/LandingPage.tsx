import { motion, useScroll, useTransform } from 'framer-motion';
import { LearningJourneyTimeline } from '../components/ui/learning-journey-timeline';
import { SignInCard } from '../components/ui/sign-in-card';
import CardStack from '../components/ui/card-stack';
import { useState, useRef } from 'react';
import { ArrowRight, Sparkles, Zap, Target, Users } from 'lucide-react';

interface LandingPageProps {
    onGetStarted?: (user?: any) => void;
}

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

export function LandingPage({ onGetStarted }: LandingPageProps) {
    const [showSignIn, setShowSignIn] = useState(false);
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

    const handleSignIn = (user: any) => {
        console.log('User signed in:', user);
        onGetStarted?.(user);
    };

    if (showSignIn) {
        return <SignInCard onSignIn={handleSignIn} />;
    }

    return (
        <div ref={targetRef} className="min-h-screen w-full bg-[#0a0a12] relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#8AB4F8]/10 via-[#7C4DFF]/10 to-[#0a0a12] pointer-events-none" />
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#8AB4F8]/5 blur-[150px] rounded-full pointer-events-none"
            />
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 5 }}
                className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#7C4DFF]/5 blur-[150px] rounded-full pointer-events-none"
            />

            {/* Hero Section */}
            <section className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
                <motion.div
                    style={{ opacity, scale }}
                    className="max-w-7xl mx-auto text-center"
                >
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="space-y-8"
                    >
                        {/* Logo */}
                        <motion.div variants={fadeInUp}>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#8AB4F8]/10 to-[#7C4DFF]/10 border border-white/10 rounded-full backdrop-blur-xl cursor-default"
                            >
                                <div className="w-10 h-10 bg-gradient-to-br from-[#8AB4F8] to-[#7C4DFF] rounded-xl flex items-center justify-center relative overflow-hidden">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 bg-white/20"
                                        style={{ transformOrigin: "40% 40%" }}
                                    />
                                    <Sparkles className="w-5 h-5 text-white relative z-10" />
                                </div>
                                <span className="text-xl font-black text-white uppercase tracking-wider">Spirit Learning</span>
                            </motion.div>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            variants={fadeInUp}
                            className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none"
                        >
                            Your <motion.span
                                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                className="text-transparent bg-clip-text bg-gradient-to-r from-[#8AB4F8] via-[#7C4DFF] to-[#8AB4F8] bg-[length:200%_auto]"
                            >
                                Neural
                            </motion.span><br />
                            Learning Journey
                        </motion.h1>

                        <motion.p
                            variants={fadeInUp}
                            className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed"
                        >
                            AI-powered education that adapts to your unique learning style. Master skills faster with personalized paths, expert mentors, and real-world projects.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={fadeInUp}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowSignIn(true)}
                                className="group px-8 py-4 bg-gradient-to-r from-[#8AB4F8] to-[#7C4DFF] rounded-2xl text-white font-black uppercase tracking-wider shadow-lg shadow-[#8AB4F8]/30 flex items-center gap-3 relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <span className="relative z-10 flex items-center gap-3">
                                    Start Your Journey
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-black uppercase tracking-wider transition-all duration-300 backdrop-blur-xl"
                            >
                                How It Works
                            </motion.button>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mt-20"
                        >
                            {[
                                { icon: Users, value: '50K+', label: 'Active Learners' },
                                { icon: Target, value: '95%', label: 'Success Rate' },
                                { icon: Zap, value: '3x', label: 'Faster Learning' },
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeInUp}
                                    whileHover={{ y: -10, transition: { duration: 0.2 } }}
                                    className="text-center group p-6 rounded-3xl hover:bg-white/5 transition-colors duration-300"
                                >
                                    <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-[#8AB4F8]/10 to-[#7C4DFF]/10 border border-white/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <stat.icon className="w-6 h-6 text-[#8AB4F8]" />
                                    </div>
                                    <div className="text-3xl font-black text-white">{stat.value}</div>
                                    <div className="text-sm text-white/40 uppercase tracking-wider font-bold group-hover:text-white/60 transition-colors">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </motion.div>
            </section>

            {/* Learning Journey Timeline Section */}
            <section id="how-it-works" className="relative z-10 py-20 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="max-w-7xl mx-auto mb-12 text-center"
                >
                    <h2 className="text-5xl font-black text-white uppercase tracking-tight mb-4">
                        How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8AB4F8] to-[#7C4DFF]">Works</span>
                    </h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        Our AI-powered platform guides you through a personalized learning journey designed for maximum skill acquisition and career growth.
                    </p>
                </motion.div>
                <LearningJourneyTimeline />
            </section>

            {/* Achievement Card Stack Section */}
            <section className="relative z-10 py-20 bg-black/20 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-7xl mx-auto mb-12 text-center px-6"
                >
                    <h2 className="text-5xl font-black text-white uppercase tracking-tight mb-4">
                        Your <motion.span
                            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                            className="text-transparent bg-clip-text bg-gradient-to-r from-[#8AB4F8] via-[#7C4DFF] to-[#8AB4F8] bg-[length:200%_auto]"
                        >
                            Achievements
                        </motion.span>
                    </h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        Explore the interactive gallery of certifications and skills you'll master on your journey.
                    </p>
                </motion.div>
                <CardStack />
            </section>

            {/* Final CTA Section */}
            <section className="relative z-10 py-32 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8 relative"
                    >
                        {/* Background Splatter */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-[#8AB4F8]/10 via-[#7C4DFF]/10 to-[#8AB4F8]/10 blur-3xl rounded-full -z-10" />

                        <h2 className="text-6xl font-black text-white uppercase tracking-tight leading-tight">
                            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8AB4F8] to-[#7C4DFF]">Transform</span><br />
                            Your Future?
                        </h2>
                        <p className="text-xl text-white/60 max-w-2xl mx-auto">
                            Join thousands of learners who are already mastering the skills of tomorrow with AI-powered education.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowSignIn(true)}
                            className="group px-10 py-5 bg-gradient-to-r from-[#8AB4F8] to-[#7C4DFF] rounded-2xl text-white font-black text-lg uppercase tracking-wider shadow-2xl shadow-[#8AB4F8]/40 flex items-center gap-3 mx-auto relative overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                Get Started Free
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/10 py-12 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-white/40 text-sm uppercase tracking-widest font-bold">
                        © 2026 Spirit Learning. We didn't design a website. We designed your future.
                    </p>
                </div>
            </footer>
        </div>
    );
}
