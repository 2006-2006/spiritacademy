import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, AnimatePresence } from 'framer-motion';

interface CognitiveState {
    focusDepth: number;
    learningVelocity: number;
    cognitiveLoad: number;
    peerResonance: number;
}

interface PeerSignal {
    id: string;
    x: number;
    y: number;
    intensity: number;
    skill: string;
    state: 'exploring' | 'mastering' | 'resonating';
}

interface SkillNode {
    id: string;
    name: string;
    x: number;
    y: number;
    mastery: number;
    peerMomentum: number;
    emerging: boolean;
}

export function CognitiveCollective() {
    const [initialized, setInitialized] = useState(false);
    const [syncActive, setSyncActive] = useState(false);
    const [cognitiveState, setCognitiveState] = useState<CognitiveState>({
        focusDepth: 0,
        learningVelocity: 0,
        cognitiveLoad: 0,
        peerResonance: 0,
    });
    const [peerSignals, setPeerSignals] = useState<PeerSignal[]>([]);
    const [skillNodes, setSkillNodes] = useState<SkillNode[]>([]);
    const [showManifesto, setShowManifesto] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const cursorEnergy = useMotionValue(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Initialize the collective
    useEffect(() => {
        const timer = setTimeout(() => setInitialized(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    // Generate peer signals
    useEffect(() => {
        if (!syncActive) return;

        const generatePeerSignals = () => {
            const signals: PeerSignal[] = Array.from({ length: 12 }, (_, i) => ({
                id: `peer-${i}`,
                x: Math.random() * 100,
                y: Math.random() * 100,
                intensity: 0.3 + Math.random() * 0.7,
                skill: ['AI', 'Data', 'Web3', 'Quantum', 'Neural', 'Cloud'][Math.floor(Math.random() * 6)],
                state: ['exploring', 'mastering', 'resonating'][Math.floor(Math.random() * 3)] as any,
            }));
            setPeerSignals(signals);
        };

        generatePeerSignals();
        const interval = setInterval(generatePeerSignals, 5000);
        return () => clearInterval(interval);
    }, [syncActive]);

    // Generate skill topology
    useEffect(() => {
        if (!syncActive) return;

        const nodes: SkillNode[] = [
            { id: '1', name: 'Neural Architecture', x: 30, y: 25, mastery: 0.6, peerMomentum: 0.8, emerging: false },
            { id: '2', name: 'Quantum Computing', x: 70, y: 30, mastery: 0.3, peerMomentum: 0.9, emerging: true },
            { id: '3', name: 'Collective Intelligence', x: 50, y: 50, mastery: 0.7, peerMomentum: 0.95, emerging: false },
            { id: '4', name: 'Consciousness Modeling', x: 25, y: 70, mastery: 0.2, peerMomentum: 0.6, emerging: true },
            { id: '5', name: 'Bio-Digital Synthesis', x: 75, y: 65, mastery: 0.4, peerMomentum: 0.7, emerging: true },
        ];
        setSkillNodes(nodes);
    }, [syncActive]);

    // Track cursor energy
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            mouseX.set(x);
            mouseY.set(y);

            // Simulate cognitive energy from movement
            cursorEnergy.set(Math.min(cursorEnergy.get() + 0.1, 1));
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Decay cursor energy
    useEffect(() => {
        const interval = setInterval(() => {
            cursorEnergy.set(Math.max(cursorEnergy.get() - 0.05, 0));
        }, 100);
        return () => clearInterval(interval);
    }, []);

    // Update cognitive state based on interactions
    useEffect(() => {
        if (!syncActive) return;

        const updateState = () => {
            setCognitiveState(prev => ({
                focusDepth: Math.min(prev.focusDepth + 0.01, 1),
                learningVelocity: 0.3 + Math.random() * 0.4,
                cognitiveLoad: 0.2 + Math.random() * 0.3,
                peerResonance: 0.5 + Math.random() * 0.5,
            }));
        };

        const interval = setInterval(updateState, 2000);
        return () => clearInterval(interval);
    }, [syncActive]);

    const getStateColor = () => {
        if (cognitiveState.focusDepth > 0.7) return '#60A5FA'; // Cognitive Blue
        if (cognitiveState.peerResonance > 0.7) return '#FFA500'; // Warm Amber
        if (cognitiveState.learningVelocity > 0.6) return '#00FFFF'; // Bioluminescent Cyan
        return '#A78BFA'; // Neural Violet
    };

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 bg-black overflow-hidden"
            style={{ perspective: '2000px' }}
        >
            {/* Ambient Peer Presence - Entry State */}
            <AnimatePresence>
                {!syncActive && initialized && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 3 }}
                        className="absolute inset-0"
                    >
                        {/* Peripheral signals */}
                        {Array.from({ length: 8 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 rounded-full"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    background: 'rgba(138, 180, 248, 0.3)',
                                    boxShadow: '0 0 20px rgba(138, 180, 248, 0.5)',
                                }}
                                animate={{
                                    opacity: [0.2, 0.6, 0.2],
                                    scale: [1, 1.5, 1],
                                }}
                                transition={{
                                    duration: 3 + Math.random() * 2,
                                    repeat: Infinity,
                                    delay: Math.random() * 2,
                                }}
                            />
                        ))}

                        {/* Early manifesto */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 0.3, y: 0 }}
                            transition={{ delay: 1, duration: 2 }}
                            className="absolute top-1/3 left-1/2 -translate-x-1/2 text-center"
                        >
                            <p className="text-white/30 text-sm md:text-base font-light tracking-[0.3em] uppercase">
                                Education is no longer preparation.
                            </p>
                            <p className="text-white/20 text-sm md:text-base font-light tracking-[0.3em] uppercase mt-2">
                                It is existence.
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Cognitive Core */}
            <AnimatePresence>
                {initialized && !syncActive && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 3, duration: 2 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                        {/* Core visualization */}
                        <div className="relative w-64 h-64 md:w-96 md:h-96">
                            {/* Outer rings */}
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    className="absolute inset-0 rounded-full border border-white/10"
                                    style={{
                                        scale: 1 + i * 0.2,
                                    }}
                                    animate={{
                                        rotate: 360,
                                        opacity: [0.1, 0.3, 0.1],
                                    }}
                                    transition={{
                                        rotate: { duration: 20 + i * 5, repeat: Infinity, ease: 'linear' },
                                        opacity: { duration: 3, repeat: Infinity, delay: i * 0.5 },
                                    }}
                                />
                            ))}

                            {/* Central core */}
                            <motion.div
                                className="absolute inset-0 rounded-full"
                                style={{
                                    background: `radial-gradient(circle, ${getStateColor()}40, transparent 70%)`,
                                }}
                                animate={{
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                }}
                            />

                            {/* Initiate button */}
                            <motion.button
                                onClick={() => setSyncActive(true)}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/20 rounded-full text-white font-light tracking-[0.2em] uppercase text-sm hover:bg-white/10 transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <motion.span
                                    animate={{
                                        opacity: [0.5, 1, 0.5],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                    }}
                                >
                                    Initiate Cognitive Sync
                                </motion.span>
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Active Cognitive Interface */}
            <AnimatePresence>
                {syncActive && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0"
                    >
                        {/* AI Mentor - Distributed Intelligence */}
                        <motion.div
                            className="absolute top-8 right-8 w-64 p-6 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl"
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-white/40 text-xs uppercase tracking-widest">Focus Depth</span>
                                    <span className="text-[#60A5FA] text-sm font-mono">{(cognitiveState.focusDepth * 100).toFixed(0)}%</span>
                                </div>
                                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-[#60A5FA] to-[#A78BFA]"
                                        style={{ width: `${cognitiveState.focusDepth * 100}%` }}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-white/40 text-xs uppercase tracking-widest">Learning Velocity</span>
                                    <span className="text-[#00FFFF] text-sm font-mono">{(cognitiveState.learningVelocity * 100).toFixed(0)}%</span>
                                </div>
                                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-[#00FFFF]"
                                        style={{ width: `${cognitiveState.learningVelocity * 100}%` }}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-white/40 text-xs uppercase tracking-widest">Peer Resonance</span>
                                    <span className="text-[#FFA500] text-sm font-mono">{(cognitiveState.peerResonance * 100).toFixed(0)}%</span>
                                </div>
                                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-[#FFA500]"
                                        style={{ width: `${cognitiveState.peerResonance * 100}%` }}
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Peer Intelligence Field */}
                        <div className="absolute inset-0 pointer-events-none">
                            {peerSignals.map((peer) => (
                                <motion.div
                                    key={peer.id}
                                    className="absolute"
                                    style={{
                                        left: `${peer.x}%`,
                                        top: `${peer.y}%`,
                                    }}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{
                                        opacity: [0, peer.intensity, 0],
                                        scale: [0, 1, 0],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        delay: Math.random() * 2,
                                    }}
                                >
                                    {/* Peer light signature */}
                                    <div
                                        className="w-3 h-3 rounded-full"
                                        style={{
                                            background: peer.state === 'exploring' ? '#60A5FA' :
                                                peer.state === 'mastering' ? '#FFFFFF' :
                                                    '#FFA500',
                                            boxShadow: `0 0 30px ${peer.state === 'exploring' ? '#60A5FA' :
                                                peer.state === 'mastering' ? '#FFFFFF' :
                                                    '#FFA500'}`,
                                        }}
                                    />

                                    {/* Skill pulse */}
                                    <motion.div
                                        className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-white/60 font-light tracking-wider"
                                        animate={{ opacity: [0, 0.6, 0] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    >
                                        {peer.skill}
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Skill Topology */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative w-full max-w-4xl h-[600px]">
                                {/* Connection lines */}
                                <svg className="absolute inset-0 w-full h-full">
                                    {skillNodes.map((node, i) =>
                                        skillNodes.slice(i + 1).map((otherNode, j) => (
                                            <motion.line
                                                key={`${i}-${j}`}
                                                x1={`${node.x}%`}
                                                y1={`${node.y}%`}
                                                x2={`${otherNode.x}%`}
                                                y2={`${otherNode.y}%`}
                                                stroke="rgba(138, 180, 248, 0.1)"
                                                strokeWidth="1"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: node.peerMomentum }}
                                                transition={{ duration: 2 }}
                                            />
                                        ))
                                    )}
                                </svg>

                                {/* Skill nodes */}
                                {skillNodes.map((node) => (
                                    <motion.div
                                        key={node.id}
                                        className="absolute group cursor-pointer"
                                        style={{
                                            left: `${node.x}%`,
                                            top: `${node.y}%`,
                                        }}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: parseFloat(node.id) * 0.2 }}
                                        whileHover={{ scale: 1.2 }}
                                    >
                                        {/* Node core */}
                                        <div
                                            className="w-16 h-16 rounded-full flex items-center justify-center relative"
                                            style={{
                                                background: `radial-gradient(circle, ${node.emerging ? '#A78BFA' : '#60A5FA'}60, transparent)`,
                                                border: `2px solid ${node.emerging ? '#A78BFA' : '#60A5FA'}40`,
                                            }}
                                        >
                                            <motion.div
                                                className="w-4 h-4 rounded-full"
                                                style={{
                                                    background: node.emerging ? '#A78BFA' : '#60A5FA',
                                                    boxShadow: `0 0 20px ${node.emerging ? '#A78BFA' : '#60A5FA'}`,
                                                }}
                                                animate={{
                                                    scale: [1, 1 + node.peerMomentum * 0.5, 1],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                }}
                                            />
                                        </div>

                                        {/* Node label */}
                                        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
                                            <p className="text-white text-sm font-light tracking-wide">{node.name}</p>
                                            <p className="text-white/40 text-xs mt-1">
                                                {node.emerging ? 'Emerging' : `${(node.mastery * 100).toFixed(0)}% Mastery`}
                                            </p>
                                        </div>

                                        {/* Hover info */}
                                        <motion.div
                                            className="absolute -top-16 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/80 backdrop-blur-xl border border-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                                        >
                                            <p className="text-white/60 text-xs">
                                                {Math.floor(node.peerMomentum * 100)} peers exploring this
                                            </p>
                                            <p className="text-[#FFA500] text-xs mt-1">
                                                Collective mastery forming
                                            </p>
                                        </motion.div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Terminal Recontextualization */}
                        <motion.button
                            onClick={() => setShowManifesto(true)}
                            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 text-xs uppercase tracking-[0.3em] hover:text-white/60 transition-colors"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 5 }}
                        >
                            Collective Manifesto
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Manifesto Modal */}
            <AnimatePresence>
                {showManifesto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/90 backdrop-blur-2xl flex items-center justify-center z-50"
                        onClick={() => setShowManifesto(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="max-w-2xl px-8 text-center"
                        >
                            <p className="text-white text-2xl md:text-4xl font-light tracking-[0.2em] uppercase mb-8">
                                Education is no longer preparation.
                            </p>
                            <p className="text-white text-2xl md:text-4xl font-light tracking-[0.2em] uppercase mb-12">
                                It is existence.
                            </p>
                            <p className="text-white/60 text-sm tracking-wide leading-relaxed">
                                This refers not to the individual — but to the collective.
                                <br />
                                <br />
                                You are learning with others — without being interrupted by them.
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
