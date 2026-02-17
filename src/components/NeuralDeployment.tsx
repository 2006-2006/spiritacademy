import { Atom, Scale, Layers } from 'lucide-react';

const portals = [
  {
    name: 'Quantum Systems Lab',
    description: 'Master probability, superposition, and reality manipulation',
    icon: Atom,
    color: '#8AB4F8',
    gradient: 'from-[#8AB4F8]/20 to-[#8AB4F8]/5',
  },
  {
    name: 'AI Ethics Simulation',
    description: 'Navigate moral complexity in synthetic consciousness',
    icon: Scale,
    color: '#7C4DFF',
    gradient: 'from-[#7C4DFF]/20 to-[#7C4DFF]/5',
  },
  {
    name: 'Synthetic Life Architect',
    description: 'Design biological circuits and neural tissue engineering',
    icon: Layers,
    color: '#5EEAD4',
    gradient: 'from-[#5EEAD4]/20 to-[#5EEAD4]/5',
  },
];

export default function NeuralDeployment() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-white uppercase">
            Learning <span className="font-light bg-gradient-to-r from-[#8AB4F8] via-[#7C4DFF] to-[#5EEAD4] bg-clip-text text-transparent">Portals</span>
          </h2>
          <div className="flex items-center justify-center gap-4 text-[#8AB4F8]/40 font-mono text-[10px] tracking-[0.5em] uppercase">
            <span className="w-8 h-px bg-[#8AB4F8]/20"></span>
            PROTOCOL: ACADEMIC_SYNC
            <span className="w-8 h-px bg-[#8AB4F8]/20"></span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {portals.map((portal, index) => (
            <div
              key={portal.name}
              className="group relative"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Complex Geometric Container */}
              <div className={`
                relative h-[450px] bg-[#0a0a12] clip-angled border border-[#8AB4F8]/20
                transition-all duration-700 hover:border-[#8AB4F8]/60 overflow-hidden
              `}>
                <div className={`absolute inset-0 bg-gradient-to-b ${portal.gradient} opacity-20`}></div>

                {/* Advanced Scanline */}
                <div className="absolute inset-0 advanced-bar opacity-20 group-hover:opacity-40 pointer-events-none transition-opacity"></div>

                {/* Technical Corner Metadata */}
                <div className="absolute top-4 left-4 font-mono text-[7px] text-[#8AB4F8]/40 space-y-1">
                  <div>PORTAL_ID: {index.toString(16).padStart(4, '0')}</div>
                  <div>CLASS: ADVANCED</div>
                </div>
                <div className="absolute top-4 right-4 font-mono text-[7px] text-[#8AB4F8]/40 text-right space-y-1 text-right">
                  <div>COORD_X: {23 + index * 4}.{Math.floor(Math.random() * 99)}</div>
                  <div>SYNC: STABLE</div>
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <div className="relative mb-10">
                    {/* Multi-layered Portal Glow */}
                    <div className="absolute inset-[-20px] rounded-full bg-[#8AB4F8]/10 blur-2xl animate-pulse"></div>
                    <div className="absolute inset-[-10px] rounded-full border border-[#8AB4F8]/20 animate-spin-slow"></div>

                    <div
                      className="relative w-24 h-24 rounded-full liquid-glass border border-[#8AB4F8]/30 flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-[0_0_30px_rgba(138,180,248,0.2)]"
                    >
                      <portal.icon className="w-10 h-10" style={{ color: portal.color }} />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-4 tracking-wider text-white font-mono uppercase border-b border-[#8AB4F8]/20 pb-2">
                    {portal.name}
                  </h3>
                  <p className="text-[11px] text-white/50 font-mono tracking-wide leading-relaxed uppercase">
                    {portal.description}
                  </p>

                  <div className="mt-10 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#5EEAD4] animate-pulse"></div>
                    <span className="text-[9px] text-[#5EEAD4] font-mono tracking-[0.3em] uppercase opacity-80 decoration-pulse">
                      ACCESS_GRANTED
                    </span>
                  </div>
                </div>

                {/* Particle Field - Visible on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none">
                  {[...Array(15)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-[2px] h-[2px] bg-white rounded-full animate-float"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                      }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Floor Shadow Reflection */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-[#8AB4F8]/10 blur-2xl -z-10 rounded-full scale-y-50"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
