import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const BootSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [step, setStep] = useState(0);
    const [text, setText] = useState('');

    const bootText = [
        "INITIALIZING ACADEMIC CORE...",
        "LOADING VIRTUAL CAMPUS...",
        "CONNECTING TO GLOBAL KNOWLEDGE_BASE...",
        "SYNCING LEARNER DATA...",
        "ACADEMY READY."
    ];

    useEffect(() => {
        let currentStep = 0;

        // Simulate boot steps
        const interval = setInterval(() => {
            if (currentStep < bootText.length) {
                setText(bootText[currentStep]);
                setStep(currentStep + 1);
                currentStep++;
            } else {
                clearInterval(interval);
                setTimeout(onComplete, 800);
            }
        }, 600);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-[#000] flex flex-col items-center justify-center font-mono"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
        >
            <div className="w-80 space-y-4">
                {/* Loading Bar */}
                <div className="h-1 w-full bg-[#1a1a2e] overflow-hidden relative">
                    <motion.div
                        className="h-full bg-[#8AB4F8]"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 3.5, ease: "easeInOut" }}
                    />
                </div>

                {/* Text Output */}
                <div className="flex justify-between items-end text-xs text-[#8AB4F8] tracking-widest h-6">
                    <span className="truncate pr-2">{text}</span>
                    <span>{Math.min(step * 20, 100)}%</span>
                </div>

                {/* Cryptic Hash */}
                <div className="text-[10px] text-[#8AB4F8]/30 break-all h-8 overflow-hidden">
                    {Array(4).fill(0).map((_, i) => (
                        <div key={i}>{Math.random().toString(36).substring(2, 15).toUpperCase()}</div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};
