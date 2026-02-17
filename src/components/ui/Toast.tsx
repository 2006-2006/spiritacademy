import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';

interface ToastProps {
    message: string;
    isVisible: boolean;
    onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[200] w-full max-w-sm px-4"
                >
                    <div className="bg-[#0a0a12] border border-[#5EEAD4]/50 p-4 shadow-[0_0_30px_rgba(94,234,212,0.2)] flex items-center gap-4 relative overflow-hidden group">
                        {/* Status bar */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-[#5EEAD4]/20">
                            <motion.div
                                initial={{ width: "100%" }}
                                animate={{ width: "0%" }}
                                transition={{ duration: 5, ease: "linear" }}
                                className="h-full bg-[#5EEAD4]"
                            />
                        </div>

                        <div className="w-12 h-12 rounded-full bg-[#5EEAD4]/10 flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-6 h-6 text-[#5EEAD4]" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <h4 className="text-[10px] font-mono text-[#5EEAD4] uppercase tracking-widest mb-1">Authorization_Granted</h4>
                            <p className="text-white text-sm font-black uppercase tracking-tight truncate">{message}</p>
                        </div>

                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/5 transition-colors"
                        >
                            <X className="w-4 h-4 text-white/40" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
