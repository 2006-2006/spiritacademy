import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Check, AlertCircle, Eye, EyeOff, Loader2 } from 'lucide-react';
import { db } from '@/lib/supabase';
import { SpiritLogo } from './spirit-logo';

interface ChangePasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export function ChangePasswordModal({ isOpen, onClose, onSuccess }: ChangePasswordModalProps) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const { error: updateError } = await db.auth.updateUser({ password });
            if (updateError) throw updateError;
            setSuccess(true);
            setTimeout(() => {
                onSuccess?.();
                onClose();
            }, 2000);
        } catch (err: any) {
            setError(err.message || 'Failed to update password');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-md bg-[#0a0a12] border border-white/10 rounded-3xl p-8 overflow-hidden"
            >
                {/* Background Effects */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#7C4DFF]/10 blur-[80px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#8AB4F8]/10 blur-[80px] rounded-full pointer-events-none" />

                <div className="relative z-10">
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <div className="relative">
                                <div className="absolute inset-0 bg-[#8AB4F8]/20 blur-xl rounded-full" />
                                <SpiritLogo className="w-16 h-16 relative z-10" showLabel={false} />
                            </div>
                        </div>
                        <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2">
                            Update <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8AB4F8] to-[#7C4DFF]">Password</span>
                        </h2>
                        <p className="text-white/40 text-xs font-mono uppercase tracking-widest">
                            Secure your neural link identity
                        </p>
                    </div>

                    <AnimatePresence mode="wait">
                        {success ? (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center py-8"
                            >
                                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 ring-1 ring-green-500/20">
                                    <Check className="w-8 h-8 text-green-400" />
                                </div>
                                <h3 className="text-white font-bold text-lg">Password Updated</h3>
                                <p className="text-white/40 text-sm mt-2">Redirecting to session...</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-start gap-3"
                                    >
                                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                                        <p className="text-red-400 text-xs font-medium">{error}</p>
                                    </motion.div>
                                )}

                                <div className="space-y-4">
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="New Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-11 text-white placeholder:text-white/20 focus:border-[#8AB4F8]/50 focus:bg-white/10 transition-all outline-none text-sm"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>

                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Confirm Password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-11 text-white placeholder:text-white/20 focus:border-[#8AB4F8]/50 focus:bg-white/10 transition-all outline-none text-sm"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full relative group mt-6"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#8AB4F8] to-[#7C4DFF] rounded-xl blur opacity-40 group-hover:opacity-60 transition-opacity" />
                                    <div className="relative bg-[#0a0a12] border border-white/10 hover:border-white/20 text-white font-bold h-12 rounded-xl flex items-center justify-center transition-all">
                                        {loading ? (
                                            <Loader2 className="w-5 h-5 animate-spin text-[#8AB4F8]" />
                                        ) : (
                                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8AB4F8] to-[#7C4DFF] uppercase tracking-wider text-xs font-black group-hover:scale-105 transition-transform">
                                                Update Credentials
                                            </span>
                                        )}
                                    </div>
                                </button>
                            </form>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
