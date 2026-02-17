import { ArrowRight } from 'lucide-react';

const stages = [
  { name: 'Learn', color: '#8AB4F8', intensity: 85 },
  { name: 'Integrate', color: '#7C4DFF', intensity: 65 },
  { name: 'Master', color: '#5EEAD4', intensity: 90 },
  { name: 'Evolve', color: '#8AB4F8', intensity: 100 },
];

export default function SystemPipeline() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-extralight tracking-wide mb-4 uppercase">
            Learning <span className="font-light bg-gradient-to-r from-[#8AB4F8] to-[#5EEAD4] bg-clip-text text-transparent italic">Trajectory</span>
          </h2>
          <p className="text-white/50 font-mono text-[10px] tracking-[0.3em] uppercase">Visualizing the path from theory to mastery</p>
        </div>

        <div className="relative">
          <div className="flex items-center justify-between gap-4">
            {stages.map((stage, index) => (
              <div key={stage.name} className="flex items-center flex-1">
                <div className="interactive group relative flex-1">
                  <div className="relative h-48 rounded-[2rem] liquid-glass overflow-hidden transition-all duration-500 hover:scale-105">
                    <div
                      className="absolute inset-0 transition-all duration-1000"
                      style={{
                        background: `linear-gradient(to top, ${stage.color}20, transparent)`,
                        height: `${stage.intensity}%`,
                        bottom: 0,
                      }}
                    ></div>

                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                      <div
                        className="text-3xl font-light mb-2 transition-all duration-500 group-hover:scale-110"
                        style={{ color: stage.color }}
                      >
                        {stage.name}
                      </div>

                      <div className="absolute bottom-4 w-full px-4">
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000 advanced-bar"
                            style={{
                              width: `${stage.intensity}%`,
                              background: `linear-gradient(90deg, ${stage.color}80, ${stage.color})`,
                              boxShadow: `0 0 10px ${stage.color}60`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div
                        className="absolute inset-0 animate-pulse"
                        style={{
                          background: `radial-gradient(circle at center, ${stage.color}30 0%, transparent 70%)`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                {index < stages.length - 1 && (
                  <div className="flex items-center justify-center px-4">
                    <ArrowRight className="w-6 h-6 text-white/20 animate-pulse-glow" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="absolute -bottom-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8AB4F8]/30 to-transparent"></div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 liquid-glass px-8 py-4 rounded-full">
            <span className="text-sm font-light text-white/60">Experience Density</span>
            <div className="w-32 h-1 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#8AB4F8] via-[#7C4DFF] to-[#5EEAD4] advanced-bar"
                style={{ width: '75%', boxShadow: '0 0 10px rgba(138, 180, 248, 0.5)' }}
              ></div>
            </div>
            <span className="text-sm font-light text-[#8AB4F8]">High</span>
          </div>
        </div>
      </div>
    </section>
  );
}
