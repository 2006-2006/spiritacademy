import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface DecryptionTextProps {
    text: string;
    className?: string;
    speed?: number;
    maxIterations?: number;
    revealDirection?: 'start' | 'end' | 'center';
    animateOnHover?: boolean;
}

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

export const DecryptionText: React.FC<DecryptionTextProps> = ({
    text,
    className = "",
    speed = 30,
    maxIterations = 10,
    revealDirection = 'start',
    animateOnHover = true
}) => {
    const [displayText, setDisplayText] = useState(text);
    const [isAnimating, setIsAnimating] = useState(false);
    const intervalRef = useRef<number | null>(null);

    const startAnimation = () => {
        if (isAnimating) return;
        setIsAnimating(true);

        let iteration = 0;

        clearInterval(intervalRef.current as number);

        intervalRef.current = window.setInterval(() => {
            setDisplayText(prev =>
                text
                    .split("")
                    .map((char, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                clearInterval(intervalRef.current as number);
                setIsAnimating(false);
            }

            iteration += 1 / 3; // Slower reveal
        }, speed);
    };

    useEffect(() => {
        startAnimation();
        return () => clearInterval(intervalRef.current as number);
    }, [text]);

    const handleInteraction = () => {
        if (animateOnHover) {
            startAnimation();
        }
    };

    return (
        <motion.span
            className={`inline-block font-mono ${className}`}
            onMouseEnter={handleInteraction}
            onClick={handleInteraction}
            whileHover={{ scale: 1.02 }}
        >
            {displayText}
        </motion.span>
    );
};
