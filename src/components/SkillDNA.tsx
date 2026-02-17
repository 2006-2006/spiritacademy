import { Code, Palette, Database, Cpu, Globe, Sparkles } from 'lucide-react';
import { useRef, useState } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';

const skills = [
  { name: 'Quantum Core', icon: Cpu, state: 'active', color: '#8AB4F8', level: 92 },
  { name: 'Neural Fabric', icon: Palette, state: 'active', color: '#7C4DFF', level: 88 },
  { name: 'Synthetic Logic', icon: Sparkles, state: 'emerging', color: '#5EEAD4', level: 74 },
  { name: 'Bio-Sync Mesh', icon: Database, state: 'dormant', color: '#8AB4F8', level: 30 },
  { name: 'Spatial Matrix', icon: Globe, state: 'active', color: '#7C4DFF', level: 85 },
  { name: 'Meta-Compiler', icon: Code, state: 'emerging', color: '#5EEAD4', level: 65 },
];

export default function SkillDNA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useAnimationFrame((_, delta) => {
    if (!containerRef.current) return;

    // Non-linear variable speed rotation
    const baseSpeed = hoveredIndex !== null ? 0.005 : 0.015;
    const ripple = Math.sin(Date.now() * 0.001) * 0.005;
    rotationRef.current += (baseSpeed + ripple) * (delta / 10);

    containerRef.current.style.transform = `rotateX(60deg) rotateZ(${rotationRef.current}deg)`;
  });

  return (
    <section className="relative py-32 px-6 overflow-hidden perspective-1000">
      <div className="absolute inset-0 bg-[#0a0a12] -z-20"></div>

      {/* Background Grid - Conical Gradient for 'Warp' effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] -z-10 opacity-10 pointer-events-none">
        <div className="w-full h-full bg-[conic-gradient(from_0deg_at_50%_50%,rgba(138,180,248,0.1)_0deg,transparent_60deg,transparent_300deg,rgba(138,180,248,0.1)_360deg)] animate-spin-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto text-center mb-20 relative z-10">
        <h2 className="text-5xl md:text-7xl font-extralight tracking-tight mb-4 text-white uppercase">
          Neural <span className="font-bold bg-gradient-to-r from-[#8AB4F8] to-[#7C4DFF] bg-clip-text text-transparent">Architecture</span>
        </h2>
        <p className="text-[#8AB4F8]/60 font-mono tracking-widest text-sm uppercase">Mapping Cognitive Core Nodes</p>
      </div>

      <div className="relative flex items-center justify-center h-[600px] perspective-1000">

        {/* Core Central System */}
        <div className="absolute z-10 w-32 h-32 rounded-full flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-[#7C4DFF]/20 blur-xl animate-pulse"></div>
          <div className="relative w-full h-full bg-[#0a0a12]/90 rounded-full border border-[#7C4DFF]/50 flex items-center justify-center shadow-[0_0_30px_rgba(124,77,255,0.3)]">
            <div className="w-24 h-24 rounded-full border border-[#8AB4F8]/30 animate-spin-slow-reverse"></div>
            <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-[#8AB4F8] to-[#7C4DFF] opacity-80 blur-md"></div>
            <div className="absolute text-2xl animate-pulse text-white font-bold">AI</div>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-[800px] bg-gradient-to-b from-transparent via-[#7C4DFF]/30 to-transparent blur-sm -z-10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-1 bg-gradient-to-r from-transparent via-[#8AB4F8]/30 to-transparent blur-sm -z-10"></div>
        </div>

        {/* Orbitals Container */}
        <div
          ref={containerRef}
          className="relative w-[500px] h-[500px] transform-style-3d"
          style={{
            transform: `rotateX(60deg) rotateZ(0deg)`,
          }}
        >
          <div className="absolute inset-0 rounded-full border border-[#8AB4F8]/10 border-dashed animate-pulse-slow"></div>
          <div className="absolute inset-[-50px] rounded-full border border-[#7C4DFF]/10 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

          {skills.map((skill, index) => {
            const angleDeg = (360 / skills.length) * index;
            const angleRad = (angleDeg * Math.PI) / 180;
            const x = Math.cos(angleRad) * 240;
            const y = Math.sin(angleRad) * 240;

            return (
              <motion.div
                key={skill.name}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ x, y }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className="relative group cursor-pointer transform-style-3d transition-all duration-300"
                  style={{
                    transform: `rotateZ(-${angleDeg}deg) rotateX(-60deg)`
                  }}
                >
                  <div className={`
                          absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 
                          bg-[#0a0a12]/95 backdrop-blur-md border border-[#8AB4F8]/30 
                          p-4 rounded-lg text-left transition-all duration-300
                          shadow-[0_0_20px_rgba(138,180,248,0.1)]
                          ${hoveredIndex === index ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90 pointer-events-none'}
                      `}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex flex-col">
                        <span className="text-[7px] font-mono text-[#8AB4F8]/40 leading-none">ID_HASH</span>
                        <span className="text-[10px] font-mono text-[#8AB4F8]/80 tracking-tighter">0x{skill.level.toString(16).toUpperCase()}FF</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[7px] font-mono text-[#5EEAD4]/40 leading-none">STATUS</span>
                        <span className="text-[10px] font-mono text-[#5EEAD4]/80 block">SYNC_OK</span>
                      </div>
                    </div>
                    <h3 className="text-white font-bold text-sm mb-3 tracking-[0.1em] font-mono border-b border-white/10 pb-1">{skill.name}</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-[8px] font-mono text-white/30 mb-1">
                          <span>STABILITY</span>
                          <span>{skill.level}%</span>
                        </div>
                        <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-[#8AB4F8] via-[#7C4DFF] to-[#5EEAD4]"
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`
                          relative w-16 h-16 rounded-full liquid-glass border border-[#8AB4F8]/30
                          flex items-center justify-center
                          shadow-[0_0_15px_rgba(138,180,248,0.2)]
                          transition-all duration-300
                          ${hoveredIndex === index ? 'scale-125 border-[#8AB4F8] shadow-[0_0_30px_rgba(138,180,248,0.4)]' : ''}
                      `}>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent"></div>
                    <skill.icon className="w-6 h-6 text-white relative z-10" />
                    <motion.div
                      className="absolute inset-[-4px] rounded-full border border-white/10"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
