export default function Footer() {
  return (
    <footer className="relative py-24 px-6 border-t border-white/5 bg-[#050508]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">
                Education <span className="text-[#8AB4F8]">Evolved</span>
              </h2>
              <p className="text-[#8AB4F8]/40 font-mono text-[10px] tracking-[0.4em] uppercase">
                Post-AGI Neural Learning Environment
              </p>
            </div>

            <div className="flex flex-wrap gap-8 text-[9px] font-mono text-white/30 uppercase tracking-[0.2em]">
              <div className="space-y-2">
                <div className="text-[#8AB4F8]/60">SYSTEM_UPTIME</div>
                <div className="text-white">1,240:12:44:02</div>
              </div>
              <div className="space-y-2">
                <div className="text-[#7C4DFF]/60">COGNITIVE_LOAD</div>
                <div className="text-white">OPTIMAL</div>
              </div>
              <div className="space-y-2">
                <div className="text-[#5EEAD4]/60">NEURAL_SYNC</div>
                <div className="text-white">99.98%</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="text-[10px] font-mono text-[#8AB4F8] tracking-widest uppercase">/RESOURCES</div>
              <ul className="space-y-2 text-[10px] font-mono text-white/40 uppercase">
                <li className="hover:text-white cursor-pointer transition-colors">Neural_Privacy</li>
                <li className="hover:text-white cursor-pointer transition-colors">Cognitive_Ethics</li>
                <li className="hover:text-white cursor-pointer transition-colors">System_Status</li>
              </ul>
            </div>
            <div className="space-y-4">
              <div className="text-[10px] font-mono text-[#7C4DFF] tracking-widest uppercase">/CONNECT</div>
              <ul className="space-y-2 text-[10px] font-mono text-white/40 uppercase">
                <li className="hover:text-white cursor-pointer transition-colors">Neural_Link</li>
                <li className="hover:text-white cursor-pointer transition-colors">Central_Hub</li>
                <li className="hover:text-white cursor-pointer transition-colors">Evolution_Logs</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[8px] font-mono text-white/20 uppercase tracking-[0.5em]">
          <div>SPIRIT_LEARN // ALL_RIGHTS_RESERVED // 2050</div>
          <div className="flex items-center gap-4">
            <span className="animate-pulse text-[#5EEAD4]">● SYSTEM_ONLINE</span>
            <span>SECURED_BY_QUANTUM_ENCRYPTION</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
