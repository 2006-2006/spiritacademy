import { Brain, Activity, Heart, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AuraSystem() {
  const [metrics, setMetrics] = useState({
    cognitive: 72,
    focus: 85,
    emotional: 68,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        cognitive: Math.floor(Math.random() * 30) + 60,
        focus: Math.floor(Math.random() * 30) + 65,
        emotional: Math.floor(Math.random() * 30) + 55,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 animate-float">
      <div className="relative">
        <div className="liquid-glass rounded-[2rem] p-6 space-y-6 w-64 quantum-glow">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full bg-[#5EEAD4] animate-pulse-glow"></div>
            <span className="text-sm font-light tracking-widest text-[#8AB4F8]">AURA</span>
          </div>

          <div className="space-y-4">
            <MetricBar
              icon={<Brain className="w-4 h-4" />}
              label="Cognitive Load"
              value={metrics.cognitive}
              color="#8AB4F8"
            />
            <MetricBar
              icon={<Activity className="w-4 h-4" />}
              label="Focus Depth"
              value={metrics.focus}
              color="#7C4DFF"
            />
            <MetricBar
              icon={<Heart className="w-4 h-4" />}
              label="Emotional State"
              value={metrics.emotional}
              color="#5EEAD4"
            />
          </div>

          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs text-white/60">
              <Eye className="w-3 h-3" />
              <span className="font-light">Learning optimization detected</span>
            </div>
          </div>

          <div className="absolute -inset-px rounded-[2rem] bg-gradient-to-r from-[#8AB4F8]/20 via-[#7C4DFF]/20 to-[#5EEAD4]/20 opacity-0 group-hover:opacity-100 transition-opacity blur-lg -z-10"></div>
        </div>

        <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-8 h-px bg-gradient-to-l from-[#8AB4F8]/50 to-transparent"></div>
      </div>
    </div>
  );
}

function MetricBar({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: number; color: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-white/70">
          <span style={{ color }}>{icon}</span>
          <span className="font-light">{label}</span>
        </div>
        <span className="font-light text-white/50">{value}%</span>
      </div>
      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out advanced-bar"
          style={{
            width: `${value}%`,
            background: `linear-gradient(90deg, ${color}80, ${color})`,
            boxShadow: `0 0 10px ${color}40`,
          }}
        ></div>
      </div>
    </div>
  );
}
