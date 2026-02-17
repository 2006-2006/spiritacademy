import {
    ArrowRight,
    Play,
    Target,
    Crown,
    Star,
    // Brand Icons
    Hexagon,
    Triangle,
    Command,
    Ghost,
    Gem,
    Cpu
} from "lucide-react";

// --- MOCK BRANDS ---
// Replaced PNGs with Lucide icons to simulate tech logos
const CLIENTS = [
    { name: "CORTEX", icon: Hexagon },
    { name: "NEURAL_LINK", icon: Triangle },
    { name: "AGI_CORE", icon: Command },
    { name: "SYNAPSE", icon: Ghost },
    { name: "GHOST_WIRE", icon: Gem },
    { name: "CHIPSET_X", icon: Cpu },
];

// --- SUB-COMPONENTS ---
const StatItem = ({ value, label }: { value: string; label: string }) => (
    <div className="flex flex-col items-center justify-center transition-transform hover:-translate-y-1 cursor-default">
        <span className="text-xl font-bold text-white sm:text-2xl">{value}</span>
        <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium sm:text-xs">{label}</span>
    </div>
);

// --- MAIN COMPONENT ---
export default function HeroSection() {
    return (
        <div className="relative w-full bg-transparent text-white overflow-hidden font-sans">
            {/* 
        SCOPED ANIMATIONS 
      */}
            <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-fade-in {
          animation: fadeSlideIn 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-marquee {
          animation: marquee 40s linear infinite; /* Slower for readability */
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>

            {/* Background Image with Gradient Mask */}
            <div
                className="absolute inset-0 z-0 bg-[url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop)] bg-cover bg-center opacity-40"
                style={{
                    maskImage: "linear-gradient(180deg, transparent, black 0%, black 70%, transparent)",
                    WebkitMaskImage: "linear-gradient(180deg, transparent, black 0%, black 70%, transparent)",
                }}
            />

            <div className="relative z-10 mx-auto max-w-7xl px-4 pt-24 pb-12 sm:px-6 md:pt-32 md:pb-20 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-start">

                    {/* --- LEFT COLUMN --- */}
                    <div className="lg:col-span-7 flex flex-col justify-center space-y-8 pt-8">

                        {/* Badge */}
                        <div className="animate-fade-in delay-100">
                            <div className="inline-flex items-center gap-2 rounded-none border border-[#8AB4F8]/10 bg-[#8AB4F8]/5 px-3 py-1.5 backdrop-blur-md transition-colors hover:bg-[#8AB4F8]/10">
                                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#8AB4F8] flex items-center gap-2">
                                    EDUCATION_EVOLVED_PLATFORM
                                    <Star className="w-3 h-3 fill-[#8AB4F8]" />
                                </span>
                            </div>
                        </div>

                        {/* Heading */}
                        <h1
                            className="animate-fade-in delay-200 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.8] uppercase"
                        >
                            Education<br />
                            <span className="bg-gradient-to-br from-white via-white to-[#8AB4F8] bg-clip-text text-transparent">
                                Evolved
                            </span><br />
                            For The AGI Era
                        </h1>

                        {/* Description */}
                        <p className="animate-fade-in delay-300 max-w-xl text-base text-white/30 font-mono uppercase tracking-widest leading-relaxed">
                            Master high-fidelity skills that transcend traditional learning. We synthesize data into direct cognitive growth for the next generation of creators.
                        </p>

                        {/* CTA Buttons */}
                        <div className="animate-fade-in delay-400 flex flex-col sm:flex-row gap-4">
                            <button className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-zinc-950 transition-all hover:scale-[1.02] hover:bg-zinc-200 active:scale-[0.98]">
                                START_LEARNING
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </button>

                            <button className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10 hover:border-white/20">
                                <Play className="w-4 h-4 fill-current" />
                                WATCH_TRAILER
                            </button>
                        </div>
                    </div>

                    {/* --- RIGHT COLUMN --- */}
                    <div className="lg:col-span-5 space-y-6 lg:mt-12">

                        {/* Stats Card */}
                        <div className="animate-fade-in delay-500 relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl">
                            {/* Card Glow Effect */}
                            <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
                                        <Target className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold tracking-tight text-white">850K+</div>
                                        <div className="text-sm text-zinc-400">Students Upskilled</div>
                                    </div>
                                </div>

                                {/* Progress Bar Section */}
                                <div className="space-y-3 mb-8">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-zinc-400">Course Completion Rate</span>
                                        <span className="text-white font-medium">94%</span>
                                    </div>
                                    <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800/50">
                                        <div className="h-full w-[94%] rounded-full bg-gradient-to-r from-white to-[#8AB4F8]" />
                                    </div>
                                </div>

                                <div className="h-px w-full bg-white/10 mb-6" />

                                {/* Mini Stats Grid */}
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <StatItem value="V2.0" label="Curriculum" />
                                    <div className="w-px h-full bg-white/10 mx-auto" />
                                    <StatItem value="98%" label="Accuracy" />
                                    <div className="w-px h-full bg-white/10 mx-auto" />
                                    <StatItem value="ACTIVE" label="Status" />
                                </div>

                                {/* Tag Pills */}
                                <div className="mt-8 flex flex-wrap gap-2">
                                    <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium tracking-wide text-zinc-300">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>
                                        ACTIVE
                                    </div>
                                    <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium tracking-wide text-zinc-300">
                                        <Crown className="w-3 h-3 text-yellow-500" />
                                        PREMIUM
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Marquee Card */}
                        <div className="animate-fade-in delay-500 relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 py-8 backdrop-blur-xl">
                            <h3 className="mb-6 px-8 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400">Connected Global Consortia</h3>

                            <div
                                className="relative flex overflow-hidden"
                                style={{
                                    maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
                                    WebkitMaskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)"
                                }}
                            >
                                <div className="animate-marquee flex gap-12 whitespace-nowrap px-4">
                                    {/* Triple list for seamless loop */}
                                    {[...CLIENTS, ...CLIENTS, ...CLIENTS].map((client, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-2 opacity-50 transition-all hover:opacity-100 hover:scale-105 cursor-default grayscale hover:grayscale-0"
                                        >
                                            {/* Brand Icon */}
                                            <client.icon className="h-6 w-6 text-white fill-current" />
                                            {/* Brand Name */}
                                            <span className="text-lg font-bold text-white tracking-tight">
                                                {client.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
