import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Loader2, User } from 'lucide-react';
import { SpiritLogo } from './spirit-logo';
import { cn } from "@/lib/utils";
import { db, supabase } from '@/lib/supabase';

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(
                "file:text-foreground placeholder:text-white/20 selection:bg-[#8AB4F8] selection:text-black bg-white/5 border-white/10 flex h-12 w-full min-w-0 rounded-xl border bg-transparent px-4 py-2 text-base shadow-lg transition-all duration-300 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-white",
                "focus:border-[#8AB4F8] focus:bg-white/10 focus:shadow-[0_0_20px_rgba(138,180,248,0.2)] focus:ring-1 focus:ring-[#8AB4F8]/50",
                "aria-invalid:ring-red-500/20 aria-invalid:border-red-500",
                className
            )}
            {...props}
        />
    )
}

interface SignInCardProps {
    onSignIn?: (user: any) => void;
}

export function SignInCard({ onSignIn }: SignInCardProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [focusedInput, setFocusedInput] = useState<string | null>(null);
    const [rememberMe, setRememberMe] = useState(false);

    const [view, setView] = useState<'sign-in' | 'sign-up' | 'forgot-password'>('sign-in');
    const [resetSent, setResetSent] = useState(false);
    const [signUpSuccess, setSignUpSuccess] = useState(false);

    // Load remembered email on mount
    useEffect(() => {
        const savedEmail = localStorage.getItem('remembered_email');
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }
    }, []);

    const handleForgotPassword = async (event: React.FormEvent) => {
        event.preventDefault();
        setError("");
        setIsLoading(true);

        if (!email) {
            setError("Please enter your email address");
            setIsLoading(false);
            return;
        }

        try {
            const { error } = await db.auth.resetPasswordForEmail(email, {
                redirectTo: window.location.origin,
            });

            if (error) throw error;
            setResetSent(true);
        } catch (err: any) {
            setError(err.message || "Failed to send reset email.");
        } finally {
            setIsLoading(false);
        }
    };

    // For 3D card effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
    const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left - rect.width / 2);
        mouseY.set(e.clientY - rect.top - rect.height / 2);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const [needsEmailConfirmation, setNeedsEmailConfirmation] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);

    const handleResendConfirmation = async () => {
        setResendLoading(true);
        try {
            const { error: resendError } = await supabase.auth.resend({
                type: 'signup',
                email: email
            });
            if (resendError) throw resendError;
            setError("Confirmation email sent! Please check your inbox.");
            setNeedsEmailConfirmation(false);
        } catch (err: any) {
            let msg = err.message || "Failed to resend confirmation.";
            if (msg.toLowerCase().includes("rate limit")) {
                msg = "Rate limit exceeded. Please wait a while or check your spam folder.";
            }
            setError(msg);
        } finally {
            setResendLoading(false);
        }
    };


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError("");
        setNeedsEmailConfirmation(false);

        // Validation
        if (!email || !password) {
            setError("Please enter both email and password");
            return;
        }

        if (!email.includes('@')) {
            setError("Please enter a valid email address");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setIsLoading(true);

        try {
            const { data, error: signInError } = await db.auth.signInWithPassword({
                email,
                password,
            });

            if (signInError) throw signInError;

            if (data?.user && onSignIn) {
                if (rememberMe) {
                    localStorage.setItem('remembered_email', email);
                } else {
                    localStorage.removeItem('remembered_email');
                }
                onSignIn(data.user);
            }
        } catch (err: any) {
            const msg = err.message || "Failed to sign in. Please check your credentials.";
            setError(msg);
            if (msg.includes("Email not confirmed")) {
                setNeedsEmailConfirmation(true);
            }
        } finally {
            setIsLoading(false);
        }
    };



    const handleSignUp = async (event: React.FormEvent) => {
        event.preventDefault();
        setError("");

        if (!email || !password || !fullName || !confirmPassword) {
            setError("Please fill in all fields");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setIsLoading(true);

        try {
            const { data, error: signUpError } = await db.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName
                    }
                }
            });

            if (signUpError) throw signUpError;

            if (data?.session) {
                if (onSignIn) onSignIn(data.user);
            } else if (data?.user) {
                setSignUpSuccess(true);
            }
        } catch (err: any) {
            setError(err.message || "Failed to sign up.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGuestLogin = () => {
        if (onSignIn) {
            onSignIn({
                id: 'guest_user',
                email: 'guest@example.com',
                user_metadata: { full_name: 'Guest User' }
            });
        }
    };

    if (view === 'sign-up') {
        return (
            <div className="min-h-screen w-full bg-[#0a0a12] relative overflow-hidden flex items-center justify-center">
                {/* Background gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#8AB4F8]/20 via-[#7C4DFF]/30 to-[#0a0a12]" />

                {/* Subtle noise texture overlay */}
                <div className="absolute inset-0 opacity-[0.03] mix-blend-soft-light"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        backgroundSize: '200px 200px'
                    }}
                />

                {/* Top radial glow */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120vh] h-[60vh] rounded-b-[50%] bg-[#8AB4F8]/20 blur-[80px]" />
                <motion.div
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[100vh] h-[60vh] rounded-b-full bg-[#8AB4F8]/20 blur-[60px]"
                    animate={{
                        opacity: [0.15, 0.3, 0.15],
                        scale: [0.98, 1.02, 0.98]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "mirror"
                    }}
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-sm relative z-10 px-4"
                >
                    <div className="relative bg-[#050510]/80 backdrop-blur-xl rounded-2xl p-8 border border-white/[0.08] shadow-2xl overflow-hidden">
                        {/* Logo and header */}
                        <div className="text-center space-y-4 mb-8 relative">
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", duration: 0.8 }}
                                className="mx-auto relative z-10 flex justify-center"
                            >
                                <div className="absolute inset-0 bg-[#8AB4F8]/20 blur-2xl rounded-full scale-125 animate-pulse" />
                                <SpiritLogo className="w-24 h-24 relative z-10" showLabel={false} showAura={false} />
                            </motion.div>

                            <div className="space-y-1">
                                <motion.h1
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-3xl font-black uppercase tracking-tight text-white"
                                >
                                    Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8AB4F8] to-[#7C4DFF]">Account</span>
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-white/40 text-[10px] font-mono uppercase tracking-[0.2em]"
                                >
                                    Initialize Identity Protocol
                                </motion.p>
                            </div>
                        </div>

                        {/* Success Message */}
                        <AnimatePresence>
                            {signUpSuccess ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-8"
                                >
                                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
                                        <Mail className="w-8 h-8 text-green-400" />
                                    </div>
                                    <h3 className="text-white font-bold text-lg mb-2">Check your email</h3>
                                    <p className="text-white/60 text-sm mb-6">
                                        We've sent a confirmation link to <br />
                                        <span className="text-white font-medium">{email}</span>
                                    </p>
                                    <button
                                        onClick={() => setView('sign-in')}
                                        className="text-[#8AB4F8] hover:text-[#7C4DFF] text-sm font-bold transition-colors"
                                    >
                                        Proceed to Sign In
                                    </button>
                                </motion.div>
                            ) : (
                                <>
                                    {/* Error Message */}
                                    <AnimatePresence>
                                        {error && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10, height: 0 }}
                                                animate={{ opacity: 1, y: 0, height: 'auto' }}
                                                exit={{ opacity: 0, y: -10, height: 0 }}
                                                className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3"
                                            >
                                                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                                                <p className="text-red-400 text-xs leading-relaxed font-medium">{error}</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <form onSubmit={handleSignUp} className="space-y-4">
                                        {/* Full Name */}
                                        <motion.div>
                                            <div className="relative flex items-center">
                                                <User className={`absolute left-4 w-4 h-4 transition-all duration-300 z-10 ${focusedInput === "fullName" ? 'text-[#8AB4F8]' : 'text-white/30'}`} />
                                                <Input
                                                    type="text"
                                                    placeholder="Full Name"
                                                    value={fullName}
                                                    onChange={(e) => setFullName(e.target.value)}
                                                    onFocus={() => setFocusedInput("fullName")}
                                                    onBlur={() => setFocusedInput(null)}
                                                    required
                                                    className="pl-11"
                                                />
                                            </div>
                                        </motion.div>

                                        {/* Email */}
                                        <motion.div>
                                            <div className="relative flex items-center">
                                                <Mail className={`absolute left-4 w-4 h-4 transition-all duration-300 z-10 ${focusedInput === "email" ? 'text-[#8AB4F8]' : 'text-white/30'}`} />
                                                <Input
                                                    type="email"
                                                    placeholder="Email address"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    onFocus={() => setFocusedInput("email")}
                                                    onBlur={() => setFocusedInput(null)}
                                                    required
                                                    className="pl-11"
                                                />
                                            </div>
                                        </motion.div>

                                        {/* Password */}
                                        <motion.div>
                                            <div className="relative flex items-center">
                                                <Lock className={`absolute left-4 w-4 h-4 transition-all duration-300 z-10 ${focusedInput === "password" ? 'text-[#8AB4F8]' : 'text-white/30'}`} />
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    onFocus={() => setFocusedInput("password")}
                                                    onBlur={() => setFocusedInput(null)}
                                                    required
                                                    minLength={6}
                                                    className="pl-11 pr-11"
                                                />
                                                <div
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-4 cursor-pointer z-10 p-1 hover:bg-white/5 rounded-full transition-colors"
                                                >
                                                    {showPassword ? (
                                                        <Eye className="w-4 h-4 text-white/40 hover:text-white transition-colors duration-300" />
                                                    ) : (
                                                        <EyeOff className="w-4 h-4 text-white/40 hover:text-white transition-colors duration-300" />
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>

                                        {/* Confirm Password */}
                                        <motion.div>
                                            <div className="relative flex items-center">
                                                <Lock className={`absolute left-4 w-4 h-4 transition-all duration-300 z-10 ${focusedInput === "confirmPassword" ? 'text-[#8AB4F8]' : 'text-white/30'}`} />
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Confirm Password"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    onFocus={() => setFocusedInput("confirmPassword")}
                                                    onBlur={() => setFocusedInput(null)}
                                                    required
                                                    minLength={6}
                                                    className="pl-11"
                                                />
                                            </div>
                                        </motion.div>

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full relative group/button mt-6"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-[#8AB4F8] to-[#7C4DFF] rounded-xl blur-lg opacity-40 group-hover/button:opacity-70 transition-opacity duration-300" />
                                            <div className="relative overflow-hidden bg-gradient-to-r from-[#8AB4F8] to-[#7C4DFF] text-white font-bold h-12 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg">
                                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/button:translate-y-0 transition-transform duration-300" />
                                                {isLoading ? (
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                ) : (
                                                    <span className="flex items-center justify-center gap-2 text-sm uppercase tracking-wider relative z-10">
                                                        Create Account
                                                        <ArrowRight className="w-4 h-4 group-hover/button:translate-x-1 transition-transform duration-300" />
                                                    </span>
                                                )}
                                            </div>
                                        </motion.button>
                                    </form>

                                    <div className="relative mt-4 mb-4 flex items-center">
                                        <div className="flex-grow border-t border-white/10"></div>
                                        <span className="mx-4 text-[10px] uppercase tracking-widest text-white/30 font-bold">Or</span>
                                        <div className="flex-grow border-t border-white/10"></div>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="button"
                                        onClick={handleGuestLogin}
                                        className="w-full relative group/guest mb-4"
                                    >
                                        <div className="relative overflow-hidden bg-white/5 hover:bg-white/10 text-white font-bold h-12 rounded-xl border border-white/10 hover:border-[#8AB4F8]/50 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg">
                                            <span className="text-white/80 group-hover/guest:text-white transition-colors text-sm font-bold tracking-wide relative z-10">
                                                Continue as Guest (Dev Bypass)
                                            </span>
                                        </div>
                                    </motion.button>



                                    <div className="text-center mt-6">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setView('sign-in');
                                                setError("");
                                            }}
                                            className="text-white/40 hover:text-white text-xs font-medium transition-colors"
                                        >
                                            Already have an identity? <span className="text-[#8AB4F8]">Sign In</span>
                                        </button>
                                    </div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        );
    }

    if (view === 'forgot-password') {
        return (
            <div className="min-h-screen w-full bg-[#0a0a12] relative overflow-hidden flex items-center justify-center">
                {/* Background gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#8AB4F8]/20 via-[#7C4DFF]/30 to-[#0a0a12]" />

                {/* Subtle noise texture overlay */}
                <div className="absolute inset-0 opacity-[0.03] mix-blend-soft-light"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        backgroundSize: '200px 200px'
                    }}
                />

                {/* Top radial glow */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120vh] h-[60vh] rounded-b-[50%] bg-[#8AB4F8]/20 blur-[80px]" />
                <motion.div
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[100vh] h-[60vh] rounded-b-full bg-[#8AB4F8]/20 blur-[60px]"
                    animate={{
                        opacity: [0.15, 0.3, 0.15],
                        scale: [0.98, 1.02, 0.98]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "mirror"
                    }}
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-sm relative z-10 px-4"
                >
                    <div className="relative bg-[#050510]/80 backdrop-blur-xl rounded-2xl p-8 border border-white/[0.08] shadow-2xl overflow-hidden">
                        {/* Logo and header */}
                        <div className="text-center space-y-4 mb-8 relative">
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", duration: 0.8 }}
                                className="mx-auto relative z-10 flex justify-center"
                            >
                                <div className="absolute inset-0 bg-[#8AB4F8]/20 blur-2xl rounded-full scale-125 animate-pulse" />
                                <SpiritLogo className="w-24 h-24 relative z-10" showLabel={false} showAura={false} />
                            </motion.div>

                            <div className="space-y-1">
                                <motion.h1
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-3xl font-black uppercase tracking-tight text-white"
                                >
                                    Reset <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8AB4F8] to-[#7C4DFF]">Password</span>
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-white/40 text-[10px] font-mono uppercase tracking-[0.2em]"
                                >
                                    Verify Identity Protocol
                                </motion.p>
                            </div>
                        </div>

                        {/* Success Message */}
                        <AnimatePresence>
                            {resetSent ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-8"
                                >
                                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
                                        <Mail className="w-8 h-8 text-green-400" />
                                    </div>
                                    <h3 className="text-white font-bold text-lg mb-2">Check your email</h3>
                                    <p className="text-white/60 text-sm mb-6">
                                        We've sent a password reset link to <br />
                                        <span className="text-white font-medium">{email}</span>
                                    </p>
                                    <button
                                        onClick={() => setView('sign-in')}
                                        className="text-[#8AB4F8] hover:text-[#7C4DFF] text-sm font-bold transition-colors"
                                    >
                                        Back to Sign In
                                    </button>
                                </motion.div>
                            ) : (
                                <>
                                    {/* Error Message */}
                                    <AnimatePresence>
                                        {error && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10, height: 0 }}
                                                animate={{ opacity: 1, y: 0, height: 'auto' }}
                                                exit={{ opacity: 0, y: -10, height: 0 }}
                                                className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3"
                                            >
                                                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                                                <p className="text-red-400 text-xs leading-relaxed font-medium">{error}</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <form onSubmit={handleForgotPassword} className="space-y-5">
                                        <motion.div>
                                            <div className="relative flex items-center">
                                                <Mail className={`absolute left-4 w-4 h-4 transition-all duration-300 z-10 ${focusedInput === "email" ? 'text-[#8AB4F8]' : 'text-white/30'}`} />
                                                <Input
                                                    type="email"
                                                    placeholder="Enter your email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    onFocus={() => setFocusedInput("email")}
                                                    onBlur={() => setFocusedInput(null)}
                                                    required
                                                    className="pl-11"
                                                />
                                            </div>
                                        </motion.div>

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full relative group/button mt-6"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-[#8AB4F8] to-[#7C4DFF] rounded-xl blur-lg opacity-40 group-hover/button:opacity-70 transition-opacity duration-300" />
                                            <div className="relative overflow-hidden bg-gradient-to-r from-[#8AB4F8] to-[#7C4DFF] text-white font-bold h-12 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg">
                                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/button:translate-y-0 transition-transform duration-300" />
                                                {isLoading ? (
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                ) : (
                                                    <span className="flex items-center justify-center gap-2 text-sm uppercase tracking-wider relative z-10">
                                                        Send Reset Link
                                                        <ArrowRight className="w-4 h-4 group-hover/button:translate-x-1 transition-transform duration-300" />
                                                    </span>
                                                )}
                                            </div>
                                        </motion.button>
                                    </form>

                                    <div className="text-center mt-6">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setView('sign-in');
                                                setError("");
                                            }}
                                            className="text-white/40 hover:text-white text-xs font-medium transition-colors"
                                        >
                                            Back to Sign In
                                        </button>
                                    </div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-[#0a0a12] relative overflow-hidden flex items-center justify-center">
            {/* Background gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#8AB4F8]/20 via-[#7C4DFF]/30 to-[#0a0a12]" />

            {/* Subtle noise texture overlay */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-soft-light"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundSize: '200px 200px'
                }}
            />

            {/* Top radial glow */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120vh] h-[60vh] rounded-b-[50%] bg-[#8AB4F8]/20 blur-[80px]" />
            <motion.div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[100vh] h-[60vh] rounded-b-full bg-[#8AB4F8]/20 blur-[60px]"
                animate={{
                    opacity: [0.15, 0.3, 0.15],
                    scale: [0.98, 1.02, 0.98]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "mirror"
                }}
            />

            {/* Animated glow spots - Toned down */}
            <div className="absolute left-1/4 top-1/4 w-96 h-96 bg-[#8AB4F8]/5 rounded-full blur-[120px] animate-pulse opacity-20" />
            <div className="absolute right-1/4 bottom-1/4 w-96 h-96 bg-[#7C4DFF]/5 rounded-full blur-[120px] animate-pulse delay-1000 opacity-20" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-sm relative z-10 px-4"
                style={{ perspective: 1500 }}
            >
                <motion.div
                    className="relative"
                    style={{ rotateX, rotateY }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    whileHover={{ z: 10 }}
                >
                    <div className="relative group">
                        {/* Card glow effect */}
                        <motion.div
                            className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-700"
                            animate={{
                                boxShadow: [
                                    "0 0 10px 2px rgba(138,180,248,0.03)",
                                    "0 0 15px 5px rgba(138,180,248,0.05)",
                                    "0 0 10px 2px rgba(138,180,248,0.03)"
                                ],
                                opacity: [0.2, 0.4, 0.2]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                                repeatType: "mirror"
                            }}
                        />

                        {/* Traveling light beam effect */}
                        <div className="absolute -inset-[1px] rounded-2xl overflow-hidden">
                            <motion.div
                                className="absolute top-0 left-0 h-[3px] w-[50%] bg-gradient-to-r from-transparent via-[#8AB4F8] to-transparent opacity-70"
                                initial={{ filter: "blur(2px)" }}
                                animate={{
                                    left: ["-50%", "100%"],
                                    opacity: [0.3, 0.7, 0.3],
                                }}
                                transition={{
                                    left: { duration: 3, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 },
                                    opacity: { duration: 1.2, repeat: Infinity, repeatType: "mirror" },
                                }}
                            />
                        </div>

                        {/* Glass card background */}
                        <div className="relative bg-[#050510]/80 backdrop-blur-xl rounded-2xl p-8 border border-white/[0.08] shadow-2xl overflow-hidden">
                            {/* Subtle card inner patterns */}
                            {/* Geometric Pattern Overlay */}
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat opacity-20" />
                            <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                                style={{
                                    backgroundImage: `
                                        linear-gradient(135deg, white 0.5px, transparent 0.5px), 
                                        linear-gradient(45deg, white 0.5px, transparent 0.5px),
                                        radial-gradient(circle at 50% 50%, rgba(138, 180, 248, 0.1) 0%, transparent 50%)
                                    `,
                                    backgroundSize: '30px 30px, 30px 30px, 100% 100%'
                                }}
                            />

                            {/* Scanning Line Effect */}
                            <motion.div
                                className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#8AB4F8]/50 to-transparent blur-sm z-20 pointer-events-none"
                                animate={{ top: ['0%', '100%', '0%'] }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            />

                            {/* Logo and header */}
                            <div className="text-center space-y-4 mb-8 relative">
                                <motion.div
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: "spring", duration: 0.8 }}
                                    className="mx-auto relative z-10 flex justify-center"
                                >
                                    <div className="absolute inset-0 bg-[#8AB4F8]/20 blur-2xl rounded-full scale-125 animate-pulse" />
                                    <SpiritLogo className="w-24 h-24 relative z-10" showLabel={false} showAura={false} />
                                </motion.div>

                                <div className="space-y-1">
                                    <motion.h1
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-3xl font-black uppercase tracking-tight text-white"
                                    >
                                        Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8AB4F8] to-[#7C4DFF]">Back</span>
                                    </motion.h1>

                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-white/40 text-[10px] font-mono uppercase tracking-[0.2em]"
                                    >
                                        Initialize Neural Handshake
                                    </motion.p>
                                </div>
                            </div>

                            {/* Error Message */}
                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, height: 0 }}
                                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                                        exit={{ opacity: 0, y: -10, height: 0 }}
                                        className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl flex flex-col gap-2"
                                    >
                                        <div className="flex items-start gap-3">
                                            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                                            <p className="text-red-400 text-xs leading-relaxed font-medium text-left">{error}</p>
                                        </div>

                                        {needsEmailConfirmation && (
                                            <button
                                                type="button"
                                                onClick={handleResendConfirmation}
                                                disabled={resendLoading}
                                                className="text-xs text-[#8AB4F8] hover:text-white underline ml-7 text-left disabled:opacity-50 transition-colors"
                                            >
                                                {resendLoading ? "Sending..." : "Resend Confirmation Email"}
                                            </button>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Login form */}
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <motion.div className="space-y-4">
                                    {/* Email input */}
                                    <motion.div
                                        className={`relative ${focusedInput === "email" ? 'z-10' : ''} `}
                                        whileFocus={{ scale: 1.01 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                    >
                                        <div className="relative flex items-center">
                                            <Mail className={`absolute left-4 w-4 h-4 transition-all duration-300 z-10 ${focusedInput === "email" ? 'text-[#8AB4F8]' : 'text-white/30'
                                                } `} />

                                            <Input
                                                type="email"
                                                placeholder="Email address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                onFocus={() => setFocusedInput("email")}
                                                onBlur={() => setFocusedInput(null)}
                                                required
                                                className="pl-11"
                                            />
                                        </div>
                                    </motion.div>

                                    {/* Password input */}
                                    <motion.div
                                        className={`relative ${focusedInput === "password" ? 'z-10' : ''} `}
                                        whileFocus={{ scale: 1.01 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                    >
                                        <div className="relative flex items-center">
                                            <Lock className={`absolute left-4 w-4 h-4 transition-all duration-300 z-10 ${focusedInput === "password" ? 'text-[#8AB4F8]' : 'text-white/30'
                                                } `} />

                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                onFocus={() => setFocusedInput("password")}
                                                onBlur={() => setFocusedInput(null)}
                                                required
                                                minLength={6}
                                                className="pl-11 pr-11"
                                            />

                                            <div
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 cursor-pointer z-10 p-1 hover:bg-white/5 rounded-full transition-colors"
                                            >
                                                {showPassword ? (
                                                    <Eye className="w-4 h-4 text-white/40 hover:text-white transition-colors duration-300" />
                                                ) : (
                                                    <EyeOff className="w-4 h-4 text-white/40 hover:text-white transition-colors duration-300" />
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>

                                {/* Remember me & Forgot password */}
                                <div className="flex items-center justify-between pt-1">
                                    <div className="flex items-center space-x-2.5">
                                        <div className="relative flex items-center">
                                            <input
                                                id="remember-me"
                                                name="remember-me"
                                                type="checkbox"
                                                checked={rememberMe}
                                                onChange={() => setRememberMe(!rememberMe)}
                                                className="peer appearance-none h-4 w-4 rounded-md border border-white/20 bg-white/5 checked:bg-[#8AB4F8] checked:border-[#8AB4F8] focus:outline-none transition-all duration-200 cursor-pointer"
                                            />
                                            <svg className="absolute w-3 h-3 text-black pointer-events-none opacity-0 peer-checked:opacity-100 left-0.5 top-0.5 transition-opacity" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </div>
                                        <label htmlFor="remember-me" className="text-xs font-medium text-white/60 hover:text-white transition-colors duration-200 cursor-pointer select-none">
                                            Remember me
                                        </label>
                                    </div>

                                    <div className="text-xs relative group/link">
                                        <button
                                            type="button"
                                            onClick={() => setView('forgot-password')}
                                            className="text-[#8AB4F8] hover:text-[#7C4DFF] transition-colors duration-300 font-medium"
                                        >
                                            Forgot password?
                                        </button>
                                    </div>
                                </div>

                                {/* Sign in button */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full relative group/button mt-6"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#8AB4F8] to-[#7C4DFF] rounded-xl blur-lg opacity-40 group-hover/button:opacity-70 transition-opacity duration-300" />

                                    <div className="relative overflow-hidden bg-gradient-to-r from-[#8AB4F8] to-[#7C4DFF] text-white font-bold h-12 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg">
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/button:translate-y-0 transition-transform duration-300" />

                                        <AnimatePresence mode="wait">
                                            {isLoading ? (
                                                <motion.div
                                                    key="loading"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="flex items-center justify-center"
                                                >
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                </motion.div>
                                            ) : (
                                                <motion.span
                                                    key="button-text"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="flex items-center justify-center gap-2 text-sm uppercase tracking-wider relative z-10"
                                                >
                                                    Initialize Session
                                                    <ArrowRight className="w-4 h-4 group-hover/button:translate-x-1 transition-transform duration-300" />
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.button>

                                <div className="relative mt-4 mb-4 flex items-center">
                                    <div className="flex-grow border-t border-white/10"></div>
                                    <span className="mx-4 text-[10px] uppercase tracking-widest text-white/30 font-bold">Or</span>
                                    <div className="flex-grow border-t border-white/10"></div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="button"
                                    onClick={handleGuestLogin}
                                    className="w-full relative group/guest"
                                >
                                    <div className="relative overflow-hidden bg-white/5 hover:bg-white/10 text-white font-bold h-12 rounded-xl border border-white/10 hover:border-[#8AB4F8]/50 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg">
                                        <span className="text-white/80 group-hover/guest:text-white transition-colors text-sm font-bold tracking-wide relative z-10">
                                            Continue as Guest (Dev Bypass)
                                        </span>
                                    </div>
                                </motion.button>



                                {/* Sign up link */}
                                <motion.div
                                    className="text-center mt-6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <p className="text-xs text-white/50">
                                        Don't have an identity profile?{' '}
                                        <button
                                            type="button"
                                            onClick={() => setView('sign-up')}
                                            className="text-[#8AB4F8] hover:text-[#7C4DFF] transition-colors duration-300 font-bold ml-1 hover:underline"
                                        >
                                            Initialize Registration
                                        </button>
                                    </p>
                                </motion.div>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
