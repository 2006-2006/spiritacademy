import React from 'react';
import { motion } from 'framer-motion';

export const GalaxySparkles: React.FC<{ className?: string }> = ({ className = "" }) => {
    return (
        <div className={`relative inline-flex items-center justify-center ${className}`}>
            {/* Main Large Sparkle */}
            <motion.svg
                viewBox="0 0 24 24"
                className="w-8 h-8 text-[#8AB4F8]"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.8, 1, 0.8],
                    rotate: [0, 5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
                <path fill="currentColor" d="M12,0L14.6,9.4L24,12L14.6,14.6L12,24L9.4,14.6L0,12L9.4,9.4L12,0Z" />
            </motion.svg>
            {/* Secondary Left Sparkle */}
            <motion.svg
                viewBox="0 0 24 24"
                className="absolute -top-3 -left-3 w-4 h-4 text-[#7C4DFF]"
                animate={{
                    scale: [1, 0.8, 1],
                    opacity: [0.5, 1, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
                <path fill="currentColor" d="M12,0L14.6,9.4L24,12L14.6,14.6L12,24L9.4,14.6L0,12L9.4,9.4L12,0Z" />
            </motion.svg>
            {/* Secondary Right Sparkle */}
            <motion.svg
                viewBox="0 0 24 24"
                className="absolute -bottom-2 -right-3 w-5 h-5 text-[#5EEAD4]"
                animate={{
                    scale: [0.8, 1.1, 0.8],
                    opacity: [0.6, 1, 0.6],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
                <path fill="currentColor" d="M12,0L14.6,9.4L24,12L14.6,14.6L12,24L9.4,14.6L0,12L9.4,9.4L12,0Z" />
            </motion.svg>
        </div>
    );
};
