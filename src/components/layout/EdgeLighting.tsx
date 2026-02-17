import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const EdgeLighting: React.FC = () => {
    const [active, setActive] = useState(false);
    const [color, setColor] = useState('#8AB4F8');

    useEffect(() => {
        // Simulate random incoming AI insights/notifications
        const trigger = () => {
            const colors = ['#8AB4F8', '#7C4DFF', '#5EEAD4'];
            setColor(colors[Math.floor(Math.random() * colors.length)]);
            setActive(true);
            setTimeout(() => setActive(false), 3000); // Duration of effect
        };

        const interval = setInterval(() => {
            if (Math.random() > 0.6) trigger(); // Random chance
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {active && (
                <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
                    {/* The glowing border container */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                    >
                        {/* Border Gradient Mask */}
                        <div
                            className="absolute inset-0"
                            style={{
                                boxShadow: `inset 0 0 20px 4px ${color}, inset 0 0 60px 10px ${color}40`,
                                borderRadius: '24px' // Subtle rounding like phone screen
                            }}
                        />

                        {/* Moving light streamer */}
                        <motion.div
                            className="absolute top-0 left-0 w-full h-[4px]"
                            style={{
                                background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                                boxShadow: `0 0 15px ${color}`
                            }}
                            animate={{
                                top: ['0%', '0%', '100%', '100%', '0%'],
                                left: ['0%', '100%', '100%', '0%', '0%'],
                                width: ['100%', '4px', '100%', '4px', '100%'],
                                height: ['4px', '100%', '4px', '100%', '4px']
                            }}
                            transition={{
                                duration: 2,
                                ease: "linear",
                                repeat: Infinity
                            }}
                        />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
