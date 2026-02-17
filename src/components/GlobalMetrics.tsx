import { useState, useEffect } from 'react';
import { Users, TrendingUp, Zap } from 'lucide-react';

export default function GlobalMetrics() {
  const [metrics, setMetrics] = useState({
    upskilled: 1247853,
    transformed: 89432,
    evolved: 3421,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        upskilled: prev.upskilled + Math.floor(Math.random() * 10) + 1,
        transformed: prev.transformed + Math.floor(Math.random() * 3),
        evolved: prev.evolved + Math.floor(Math.random() * 2),
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-8">
          <div className="text-left">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-white uppercase leading-none">
              Academic <span className="font-light bg-gradient-to-r from-[#8AB4F8] to-[#5EEAD4] bg-clip-text text-transparent italic">Impact</span>
            </h2>
            <div className="flex items-center gap-3">
              <div className="h-1 w-12 bg-[#8AB4F8]/30"></div>
              <p className="text-[#8AB4F8]/60 font-mono text-[10px] tracking-[0.4em] uppercase">Humanity upskilling in real-time</p>
            </div>
          </div>
          {/* ... status badges ... */}
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <MetricCard
              icon={<Users className="w-5 h-5" />}
              label="Humans upskilled today"
              value={metrics.upskilled.toLocaleString()}
              color="#8AB4F8"
              large
            />
          </div>
          <MetricCard
            icon={<TrendingUp className="w-4 h-4" />}
            label="Knowledge Mastery"
            value={metrics.transformed.toLocaleString()}
            color="#7C4DFF"
          />
          <MetricCard
            icon={<Zap className="w-4 h-4" />}
            label="Sync / Minute"
            value={metrics.evolved.toLocaleString()}
            color="#5EEAD4"
          />
        </div>

        {/* ... bottom CTA section (compacted) ... */}
        <div className="mt-12 group relative overflow-hidden clip-angled border border-white/5 bg-[#0a0a12] p-8">
          {/* ... background elements ... */}

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-left">
              {/* ... */}
              <h3 className="text-2xl md:text-4xl font-black text-white mb-4 tracking-tight uppercase">
                Cognitive Acceleration
              </h3>
              {/* ... */}
            </div>
            {/* ... button ... */}
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricCard({ icon, label, value, color, large = false }: { icon: React.ReactNode; label: string; value: string; color: string; large?: boolean }) {
  return (
    <div className="relative group h-full">
      <div className={`
        relative ${large ? 'h-64' : 'h-48'} bg-[#0a0a12] border border-white/10 
        p-6 flex flex-col justify-between transition-all duration-500
        hover:border-white/30 group-hover:translate-x-1 group-hover:-translate-y-1
      `}>
        {/* ... decorations ... */}

        <div className="flex items-center justify-between">
          <div className="p-2 bg-white/5 rounded-lg" style={{ color }}>
            {icon}
          </div>
          <span className="text-[8px] font-mono text-white/20 tracking-widest uppercase">REAL_TIME_FEED</span>
        </div>

        <div>
          <div
            className={`${large ? 'text-5xl md:text-6xl' : 'text-3xl md:text-4xl'} font-bold mb-2 font-mono tracking-tighter`}
            style={{ color }}
          >
            {value}
          </div>
          <div className="text-[9px] text-white/40 font-mono tracking-widest uppercase italic">
            {label}
          </div>
        </div>

        {/* ... streaming indicator ... */}
      </div>
      {/* ... offset decorator ... */}
    </div>
  );
}
