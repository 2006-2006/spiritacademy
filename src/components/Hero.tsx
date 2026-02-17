import { Zap, Cpu, Dna, Activity } from 'lucide-react';
import { CyberButton } from './atoms/CyberButton';
import { GlitchText } from './atoms/GlitchText';
import { HoloCard } from './atoms/HoloCard';
import { DecryptionText } from './atoms/DecryptionText';
import { GalaxySparkles } from './atoms/GalaxySparkles';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* ... (background code remains the same) ... */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-full max-w-4xl h-96">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-pulse-glow"
              style={{
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: [
                  'radial-gradient(circle, rgba(138, 180, 248, 0.8) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(94, 234, 212, 0.8) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(124, 77, 255, 0.8) 0%, transparent 70%)',
                ][Math.floor(Math.random() * 3)],
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 2 + 2}s`,
              }}
            />
          ))}

          {[...Array(15)].map((_, i) => (
            <svg
              key={`line-${i}`}
              className="absolute inset-0 w-full h-full opacity-20"
              style={{
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              <line
                x1={`${Math.random() * 100}%`}
                y1={`${Math.random() * 100}%`}
                x2={`${Math.random() * 100}%`}
                y2={`${Math.random() * 100}%`}
                stroke="url(#gradient)"
                strokeWidth="1"
                className="animate-pulse-glow"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(138, 180, 248, 0.5)" />
                  <stop offset="50%" stopColor="rgba(124, 77, 255, 0.5)" />
                  <stop offset="100%" stopColor="rgba(94, 234, 212, 0.5)" />
                </linearGradient>
              </defs>
            </svg>
          ))}
        </div>
      </div>

      <div className="relative z-10 text-center px-6 space-y-12">
        <div className="space-y-6">
          <h1 className="text-6xl md:text-8xl font-extralight tracking-wide flex flex-col items-center gap-2">
            <DecryptionText
              text="Education no longer"
              className="block text-white/80 text-3xl md:text-5xl"
              speed={50}
            />
            <DecryptionText
              text="TEACHES"
              className="block font-light bg-gradient-to-r from-[#8AB4F8] via-[#7C4DFF] to-[#5EEAD4] bg-clip-text text-transparent font-bold tracking-[0.2em]"
              speed={40}
            />
            <div className="mt-4">
              <GlitchText text="IT EVOLVES YOU" className="text-5xl md:text-7xl text-white" />
            </div>
          </h1>

          <div className="flex flex-wrap justify-center gap-6 mt-12">
            <HoloCard className="w-48">
              <div className="flex flex-col items-center gap-3">
                <Cpu className="w-8 h-8 text-[#8AB4F8]" />
                <span className="text-xs tracking-widest text-[#8AB4F8]">NEURAL AI</span>
              </div>
            </HoloCard>
            <HoloCard className="w-48">
              <div className="flex flex-col items-center gap-3">
                <Dna className="w-8 h-8 text-[#7C4DFF]" />
                <span className="text-xs tracking-widest text-[#7C4DFF]">SKILL DNA</span>
              </div>
            </HoloCard>
            <HoloCard className="w-48">
              <div className="flex flex-col items-center gap-3">
                <Activity className="w-8 h-8 text-[#5EEAD4]" />
                <span className="text-xs tracking-widest text-[#5EEAD4]">COGNITION</span>
              </div>
            </HoloCard>
          </div>
        </div>

        <div className="pt-8 relative inline-block">
          <CyberButton icon={<Zap className="w-5 h-5" />}>
            INITIATE NEURAL SYNC
          </CyberButton>
          <GalaxySparkles className="absolute -top-6 -right-6" />
        </div>

        <div className="flex justify-center gap-12 text-[#8AB4F8]/40 font-mono text-[10px] tracking-[0.3em] uppercase">
          <div className="flex flex-col items-center">
            <span className="opacity-60 mb-1">LATENCY</span>
            <span className="text-white/80">0.02ms</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="opacity-60 mb-1">SYNC_RATE</span>
            <span className="text-white/80">98.4%</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="opacity-60 mb-1">NEURAL_LOAD</span>
            <span className="text-white/80">MODERATE</span>
          </div>
        </div>

        <div className="pt-4">
          <div className="inline-block px-4 py-1 border border-[#8AB4F8]/10 rounded-full bg-[#8AB4F8]/5">
            <span className="text-[10px] text-[#8AB4F8] font-mono tracking-widest animate-pulse">
              [ SECURE_ENCRYPTION_ACTIVE ]
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-px h-16 bg-gradient-to-b from-[#8AB4F8] to-transparent"></div>
      </div>
    </section>
  );
}
