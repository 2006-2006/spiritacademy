import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function SaaSHero() {
    return (
        <section
            className="relative min-h-screen flex flex-col items-center justify-start px-6 py-20 md:py-24"
            style={{
                animation: "fadeIn 0.6s ease-out"
            }}
        >
            <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

            <motion.aside
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8 inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-full border border-[#8AB4F8]/30 bg-[#8AB4F8]/10 backdrop-blur-sm max-w-full"
            >
                <span className="text-xs text-center whitespace-nowrap text-[#8AB4F8]">
                    🚀 New AI-Powered Learning Platform is Live!
                </span>
                <a
                    href="#features"
                    className="flex items-center gap-1 text-xs hover:text-white transition-all active:scale-95 whitespace-nowrap text-[#8AB4F8]"
                    aria-label="Read more about the new features"
                >
                    Explore Now
                    <ArrowRight size={12} />
                </a>
            </motion.aside>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-7xl font-black text-center max-w-4xl px-6 leading-tight mb-6 uppercase tracking-tighter"
                style={{
                    background: "linear-gradient(to bottom, #ffffff, #8AB4F8, rgba(138, 180, 248, 0.6))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                }}
            >
                Evolve Your Mind with <br />
                <span className="text-[#5EEAD4]">Neural Learning</span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-sm md:text-base text-center max-w-2xl px-6 mb-10 text-[#8AB4F8]/60 font-mono"
            >
                Advanced AI-powered courses designed for the future. <br />
                Master quantum computing, neural engineering, and beyond.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex items-center gap-4 relative z-10 mb-16"
            >
                <button
                    type="button"
                    className="rounded-lg flex items-center justify-center bg-gradient-to-b from-white via-white/95 to-white/60 text-black px-8 py-4 font-black uppercase tracking-wider hover:scale-105 active:scale-95 transition-transform shadow-[0_0_30px_rgba(138,180,248,0.3)]"
                    aria-label="Get started with the platform"
                >
                    Initialize Access
                </button>
            </motion.div>
        </section>
    );
}
