import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, MessageSquare, Globe, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Student {
    id: string;
    name: string;
    avatar: string;
    status: 'online' | 'neural_sync' | 'away';
    focus: string;
    compatibility: number;
}

const STUDENTS: Student[] = [
    { id: '1', name: 'Aria Chen', avatar: '👩‍💻', status: 'neural_sync', focus: 'Quantum Logic', compatibility: 98 },
    { id: '2', name: 'Leo Varma', avatar: '👨‍🔬', status: 'online', focus: 'Neural Architectures', compatibility: 92 },
    { id: '3', name: 'Elena Frost', avatar: '👩‍🎨', status: 'away', focus: 'Bio-Digital Ethics', compatibility: 85 },
    { id: '4', name: 'Marcus Sol', avatar: '👨‍🚀', status: 'online', focus: 'Space Engineering', compatibility: 78 },
];

const NeuralConnectSuccess = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.circle
            cx="6" cy="12" r="3"
            fill="currentColor"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
        />
        <motion.circle
            cx="18" cy="12" r="3"
            fill="currentColor"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2, delay: 0.1 }}
        />
        <motion.path
            d="M9 12H15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
        />
        <motion.circle
            cx="12" cy="12" r="8"
            stroke="currentColor"
            strokeWidth="1"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
        />
    </svg>
);

function FriendButton() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const handleClick = () => {
        if (status !== 'idle') return;
        setStatus('loading');

        // Simulate network request
        setTimeout(() => {
            setStatus('success');
        }, 1500);
    };

    return (
        <motion.button
            onClick={handleClick}
            className={cn(
                "py-4 rounded-2xl font-black flex items-center justify-center transition-all shadow-lg active:scale-95 relative overflow-hidden",
                status === 'success' ? "bg-[#00FFFF] text-black shadow-[#00FFFF]/20" : "bg-[#8AB4F8] text-black hover:bg-white shadow-[#8AB4F8]/20"
            )}
            whileTap={{ scale: 0.95 }}
            layout
        >
            <AnimatePresence mode="wait">
                {status === 'idle' && (
                    <motion.div
                        key="idle"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                    >
                        <UserPlus size={20} />
                    </motion.div>
                )}
                {status === 'loading' && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                    >
                        <Loader2 size={20} className="animate-spin" />
                    </motion.div>
                )}
                {status === 'success' && (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                    >
                        <NeuralConnectSuccess />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Success Ripple Effect */}
            {status === 'success' && (
                <motion.div
                    className="absolute inset-0 bg-white/40"
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                />
            )}
        </motion.button>
    );
}

interface ScanButtonProps {
    isScanning: boolean;
    onClick: () => void;
}

function ScanButton({ isScanning, onClick }: ScanButtonProps) {
    return (
        <motion.button
            onClick={onClick}
            disabled={isScanning}
            className="relative group px-12 py-5 rounded-2xl bg-white text-[#0a0a12] font-black uppercase tracking-widest overflow-hidden mx-auto flex items-center gap-3 shadow-2xl shadow-white/10"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8AB4F8]/20 to-transparent"
                animate={{
                    x: ['-100%', '200%']
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            <motion.div
                animate={isScanning ? { rotate: 360 } : { rotate: 0 }}
                transition={isScanning ? { duration: 2, repeat: Infinity, ease: "linear" } : { duration: 0 }}
            >
                {isScanning ? <Loader2 size={20} className="text-[#0a0a12]" /> : <Globe size={20} className="text-[#0a0a12]" />}
            </motion.div>

            <span className="relative z-10">
                {isScanning ? "Scanning Matrix..." : "Scan Global Peer Directory"}
            </span>

            <motion.div
                className="absolute inset-0 border-2 border-[#8AB4F8] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{
                    scale: [1, 1.02, 1],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                }}
            />
        </motion.button>
    );
}

export function NeuralNetwork() {
    const [isScanning, setIsScanning] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);
    const [scanLogs, setScanLogs] = useState<string[]>([]);
    const [peers, setPeers] = useState(STUDENTS);
    const [searchTerm, setSearchTerm] = useState('');


    const logMessages = [
        "ESTABLISHING QUANTUM LINK...",
        "BYPASSING NEURAL FIREWALLS...",
        "MAPPING COGNITIVE TOPOLOGY...",
        "DECRYPTING PEER SIGNATURES...",
        "SYNCHRONIZING ARCHITECTURES...",
        "CHANNEL SECURED."
    ];

    // Pool of unique peers to discover
    const PEER_POOL: Student[] = [
        { id: '5', name: 'Zion Black', avatar: '🥷', status: 'online', focus: 'Stealth Protocols', compatibility: 99 },
        { id: '6', name: 'Nova Skye', avatar: '👩‍🚀', status: 'neural_sync', focus: 'Astro-Navigation', compatibility: 95 },
        { id: '7', name: 'Kai Nexus', avatar: '🧑‍💻', status: 'online', focus: 'Cyber Warfare', compatibility: 88 },
        { id: '8', name: 'Luna Cipher', avatar: '👩‍🔬', status: 'neural_sync', focus: 'Quantum Encryption', compatibility: 94 },
        { id: '9', name: 'Orion Steel', avatar: '🦾', status: 'away', focus: 'Mech Engineering', compatibility: 82 },
        { id: '10', name: 'Sage Quantum', avatar: '🧙', status: 'neural_sync', focus: 'Reality Manipulation', compatibility: 97 },
        { id: '11', name: 'Phoenix Blaze', avatar: '🔥', status: 'online', focus: 'Energy Systems', compatibility: 91 },
        { id: '12', name: 'Echo Void', avatar: '👤', status: 'away', focus: 'Dark Matter Research', compatibility: 86 }
    ];

    const containerRef = useRef<HTMLDivElement>(null);
    const [scanComplete, setScanComplete] = useState<string | null>(null);

    const handleStartScan = () => {
        // Prevent multiple scans at once
        if (isScanning) return;

        setIsScanning(true);
        setScanComplete(null);
        setScanProgress(0);
        setScanLogs([]);

        let step = 0;
        const interval = setInterval(() => {
            setScanProgress(prev => {
                // Add log messages at specific progress points
                if (prev % 20 === 0 && step < logMessages.length) {
                    setScanLogs(l => [...l, logMessages[step]].slice(-3));
                    step++;
                }

                if (prev >= 100) {
                    clearInterval(interval);

                    // Complete scan and discover unique peers
                    setTimeout(() => {
                        setIsScanning(false);

                        // Get current peer IDs to avoid duplicates
                        setPeers(prevPeers => {
                            const existingIds = new Set(prevPeers.map(p => p.id));

                            // Filter out peers that already exist
                            const availablePeers = PEER_POOL.filter(p => !existingIds.has(p.id));

                            if (availablePeers.length === 0) {
                                setScanComplete("All potential neural links already established.");
                                return prevPeers;
                            }

                            // Randomly select 2-3 unique new peers
                            const numToAdd = Math.min(
                                Math.floor(Math.random() * 2) + 2,
                                availablePeers.length
                            );

                            const shuffled = [...availablePeers].sort(() => Math.random() - 0.5);
                            const newPeers = shuffled.slice(0, numToAdd);

                            setScanComplete(`${newPeers.length} New Cognitive Links Established!`);

                            // Scroll to top to see new peers
                            setTimeout(() => {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }, 300);

                            // Return combined array with no duplicates
                            return [...prevPeers, ...newPeers];
                        });
                    }, 500);
                    return 100;
                }
                return prev + 2; // Increment by 2 for smoother animation
            });
        }, 20);
    };

    return (
        <div ref={containerRef} className="min-h-screen pt-24 px-6 relative overflow-hidden bg-[#0a0a12] scroll-smooth">
            {/* Background Orbs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#8AB4F8]/5 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#7C4DFF]/5 blur-[120px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-6xl font-black text-white uppercase tracking-tighter leading-none mb-4">
                            Neural <span className="text-[#8AB4F8]">Connections</span>
                        </h1>
                        <p className="text-white/40 text-sm tracking-widest uppercase">Sync your evolution with the collective consciousness</p>
                    </div>

                    <div className="relative w-full md:w-80">
                        <input
                            type="text"
                            placeholder="Find neural peers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 outline-none focus:border-[#8AB4F8]/50 transition-all font-mono text-sm"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    <AnimatePresence mode="popLayout">
                        {peers.filter(s =>
                            s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            s.focus.toLowerCase().includes(searchTerm.toLowerCase())
                        ).map((student, i) => (
                            <motion.div
                                key={student.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8, rotateX: 90 }}
                                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                                exit={{ opacity: 0, scale: 0.8, rotateX: -90 }}
                                transition={{
                                    type: 'spring',
                                    damping: 12,
                                    stiffness: 100,
                                    delay: i * 0.1
                                }}
                                whileHover={{
                                    y: -12,
                                    scale: 1.03,
                                    boxShadow: '0 20px 40px -10px rgba(138, 180, 248, 0.1)'
                                }}
                                className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl relative group overflow-hidden perspective-1000"
                            >
                                {/* Animated Background Gradient */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-[#8AB4F8]/5 to-[#7C4DFF]/5 opacity-0 group-hover:opacity-100 transition-opacity"
                                    animate={{
                                        background: [
                                            'linear-gradient(135deg, rgba(138,180,248,0.05), rgba(124,77,255,0.05))',
                                            'linear-gradient(225deg, rgba(124,77,255,0.05), rgba(138,180,248,0.05))',
                                            'linear-gradient(135deg, rgba(138,180,248,0.05), rgba(124,77,255,0.05))'
                                        ]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                />

                                {/* Scanning Line Effect */}
                                <motion.div
                                    className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#8AB4F8]/50 to-transparent"
                                    animate={{
                                        x: ['-100%', '200%']
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatDelay: 3
                                    }}
                                />

                                <div className="relative mb-6">
                                    {/* Floating Avatar with Pulse */}
                                    <motion.div
                                        animate={{
                                            y: [0, -8, 0],
                                            rotate: [0, 2, -2, 0]
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                        className="w-24 h-24 rounded-full bg-[#0a0a12] border-2 border-white/10 flex items-center justify-center text-4xl shadow-2xl relative mx-auto group-hover:border-[#8AB4F8]/50 transition-colors"
                                    >
                                        {/* Multiple Pulsing Rings */}
                                        <motion.div
                                            className="absolute inset-0 rounded-full bg-[#8AB4F8]/10"
                                            animate={{
                                                scale: [1, 1.3, 1],
                                                opacity: [0.3, 0, 0.3]
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity
                                            }}
                                        />
                                        <motion.div
                                            className="absolute inset-0 rounded-full bg-[#7C4DFF]/10"
                                            animate={{
                                                scale: [1, 1.5, 1],
                                                opacity: [0.2, 0, 0.2]
                                            }}
                                            transition={{
                                                duration: 2.5,
                                                repeat: Infinity,
                                                delay: 0.5
                                            }}
                                        />

                                        <span className="relative z-10">{student.avatar}</span>

                                        {/* Animated Status Indicator */}
                                        <motion.div
                                            className={cn(
                                                "absolute bottom-1 right-1 w-5 h-5 rounded-full border-4 border-[#0a0a12] z-20",
                                                student.status === 'online' ? "bg-green-500" :
                                                    student.status === 'neural_sync' ? "bg-[#8AB4F8]" :
                                                        "bg-yellow-500"
                                            )}
                                            animate={
                                                student.status === 'neural_sync' ? {
                                                    boxShadow: [
                                                        '0 0 0px rgba(138,180,248,0.5)',
                                                        '0 0 15px rgba(138,180,248,0.8)',
                                                        '0 0 0px rgba(138,180,248,0.5)'
                                                    ]
                                                } : student.status === 'online' ? {
                                                    scale: [1, 1.2, 1]
                                                } : {}
                                            }
                                            transition={{
                                                duration: 1.5,
                                                repeat: Infinity
                                            }}
                                        />
                                    </motion.div>
                                </div>

                                <div className="text-center mb-6 relative z-10">
                                    <motion.h3
                                        className="text-2xl font-black text-white mb-2 tracking-tight group-hover:text-[#8AB4F8] transition-colors"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        {student.name}
                                    </motion.h3>
                                    <div className="text-[10px] text-white/40 font-mono mb-2 uppercase tracking-widest">
                                        ID: {student.id.padStart(8, '0')}
                                    </div>
                                    <div className="inline-block px-3 py-1 bg-white/5 rounded-full border border-white/10">
                                        <p className="text-[#8AB4F8] text-[9px] uppercase tracking-[0.25em] font-mono font-bold">{student.focus}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-5 bg-black/40 rounded-3xl mb-8 border border-white/5">
                                    <div className="text-center flex-1 border-r border-white/10">
                                        <div className="text-[9px] uppercase text-white/40 mb-1 font-bold tracking-widest">Link</div>
                                        <motion.div
                                            className="text-lg font-black text-white"
                                            animate={{
                                                color: student.compatibility > 90 ? ['#fff', '#8AB4F8', '#fff'] : '#fff'
                                            }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            {student.compatibility}%
                                        </motion.div>
                                    </div>
                                    <div className="text-center flex-1">
                                        <div className="text-[9px] uppercase text-white/40 mb-1 font-bold tracking-widest">Type</div>
                                        <div className="text-[9px] font-black text-[#8AB4F8] uppercase whitespace-nowrap px-2">
                                            {student.status.replace('_', ' ')}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 relative z-10">
                                    <FriendButton />
                                    <button className="py-4 rounded-2xl bg-white/5 text-white border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all active:scale-95">
                                        <MessageSquare size={20} />
                                    </button>
                                </div>

                                {/* New Connection Pulse for first entry */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 1.5 }}
                                    animate={{ opacity: [0, 1, 0], scale: 1 }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="absolute inset-0 rounded-[2.5rem] border-2 border-[#8AB4F8] pointer-events-none"
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="bg-gradient-to-r from-[#8AB4F8]/10 to-[#7C4DFF]/10 border border-white/10 rounded-[2.5rem] p-16 text-center backdrop-blur-3xl relative overflow-hidden group pb-32">
                    <AnimatePresence>
                        {isScanning && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 z-20 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-12"
                            >
                                <div className="w-full max-w-md h-1 bg-white/10 rounded-full overflow-hidden mb-6">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-[#8AB4F8] to-[#7C4DFF]"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${scanProgress}%` }}
                                    />
                                </div>
                                <div className="font-mono text-[10px] text-[#8AB4F8] space-y-1">
                                    {scanLogs.map((log, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                        >
                                            {">"} {log}
                                        </motion.div>
                                    ))}
                                </div>
                                <p className="mt-8 text-white/40 font-mono text-xs uppercase tracking-[0.4em]">Synchronizing: {scanProgress}%</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(138,180,248,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />

                    <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Initiate Global Neural Sync</h2>
                    <p className="text-white/60 text-lg mb-12 max-w-2xl mx-auto tracking-tight">Connect your cognitive architecture with researchers worldwide to accelerate collective intelligence evolution.</p>

                    <ScanButton isScanning={isScanning} onClick={handleStartScan} />

                    <AnimatePresence>
                        {scanComplete && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="mt-8 text-[#8AB4F8] font-mono text-sm uppercase tracking-widest bg-[#8AB4F8]/10 inline-block px-4 py-2 rounded-lg border border-[#8AB4F8]/20"
                            >
                                {scanComplete}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
