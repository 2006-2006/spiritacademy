import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface HoloCardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
}

export const HoloCard: React.FC<HoloCardProps> = ({
    children,
    className = "",
    title
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={`relative group perspective-1000 ${className}`}
        >
            {/* Main Glass Panel */}
            <div
                className="relative z-10 bg-[#0a0a12]/80 backdrop-blur-xl border border-[#8AB4F8]/20 p-6 clip-angled transition-all duration-500 hover:border-[#8AB4F8]/50"
                style={{ transform: "translateZ(50px)" }}
            >

                {/* Header/Title Area */}
                {title && (
                    <div className="flex items-center justify-between mb-4 border-b border-[#8AB4F8]/10 pb-2">
                        <h3 className="text-[#8AB4F8] font-mono text-sm tracking-widest uppercase flex items-center gap-2">
                            <span className="w-2 h-2 bg-[#8AB4F8] rounded-full animate-pulse"></span>
                            {title}
                        </h3>
                        {/* Dynamic ID generation */}
                        <div className="text-[10px] text-white/30 font-mono">SYS.ID.{Math.floor(Math.random() * 9999)}</div>
                    </div>
                )}

                {/* Content */}
                <div className="relative">
                    {children}
                </div>

                {/* Decorative Corner Lines */}
                <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
                    <svg width="100%" height="100%" viewBox="0 0 64 64">
                        <path d="M64 0 L40 0 L40 8 L56 8 L56 24 L64 24 Z" fill="#8AB4F8" opacity="0.3" />
                    </svg>
                </div>
            </div>

            {/* Hover Glow Behind */}
            <div
                className="absolute -inset-0.5 bg-gradient-to-r from-[#8AB4F8] to-[#7C4DFF] opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-500 clip-angled"
                style={{ transform: "translateZ(-20px)" }}
            ></div>
        </motion.div>
    );
};
