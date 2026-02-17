import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Brain, Target, Activity, Share2, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SkillNode {
    id: string;
    label: string;
    description: string;
    x: number;
    y: number;
    mastery: number;
    connections: string[];
    state: 'emerging' | 'active' | 'mastered';
    category: 'Core' | 'Applied' | 'Theoretical';
}

const INITIAL_NODES: SkillNode[] = [
    { id: '1', label: 'Neural Architectures', description: 'Designing deep-synthetic neural pathways for 2050 standards.', x: 0, y: 0, mastery: 0.85, connections: ['2', '3', '6'], state: 'mastered', category: 'Core' },
    { id: '2', label: 'Quantum Logic', description: 'Mastering superposition-based decision trees.', x: 250, y: -120, mastery: 0.45, connections: ['1', '4'], state: 'active', category: 'Theoretical' },
    { id: '3', label: 'Bio-Sync Protcols', description: 'Interfacing biological grey matter with silicon nodes.', x: -280, y: 150, mastery: 0.15, connections: ['1', '5'], state: 'emerging', category: 'Applied' },
    { id: '4', label: 'Consciousness Theory', description: 'The mathematical framework of emergent awareness.', x: 350, y: 150, mastery: 0.95, connections: ['2', '5'], state: 'mastered', category: 'Theoretical' },
    { id: '5', label: 'AI Alignment', description: 'Ensuring synthetic goals remain aligned with human evolution.', x: 50, y: 280, mastery: 0.35, connections: ['3', '4', '6'], state: 'active', category: 'Core' },
    { id: '6', label: 'Synthetic Biology', description: 'Programming cellular hardware for carbon-based compute.', x: -320, y: -80, mastery: 0.25, connections: ['1', '5'], state: 'emerging', category: 'Applied' },
];

export function SkillTopology() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [nodes] = useState<SkillNode[]>(INITIAL_NODES);
    const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);
    const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const requestRef = useRef<number>();

    // Pulse state for connections
    const pulsesRef = useRef<{ id: string; from: string; to: string; progress: number; speed: number }[]>([]);

    const draw = useCallback((time: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const { width, height } = canvas;
        const centerX = width / 2;
        const centerY = height / 2;

        ctx.clearRect(0, 0, width, height);

        // Draw scanning grid (subtle)
        ctx.strokeStyle = 'rgba(138, 180, 248, 0.03)';
        ctx.lineWidth = 1;
        const gridSize = 50;
        for (let x = 0; x < width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        for (let y = 0; y < height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        // Update Pulses
        if (Math.random() < 0.05) {
            const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
            if (randomNode.connections.length > 0) {
                const targetId = randomNode.connections[Math.floor(Math.random() * randomNode.connections.length)];
                pulsesRef.current.push({
                    id: Math.random().toString(),
                    from: randomNode.id,
                    to: targetId,
                    progress: 0,
                    speed: 0.01 + Math.random() * 0.02
                });
            }
        }
        pulsesRef.current = pulsesRef.current.filter(p => p.progress < 1);
        pulsesRef.current.forEach(p => p.progress += p.speed);

        // Draw Connections
        nodes.forEach(node => {
            const nX = centerX + node.x + Math.sin(time / 2000 + parseInt(node.id)) * 10;
            const nY = centerY + node.y + Math.cos(time / 2000 + parseInt(node.id)) * 10;

            node.connections.forEach(connId => {
                const targetNode = nodes.find(n => n.id === connId);
                if (!targetNode) return;

                const tX = centerX + targetNode.x + Math.sin(time / 2000 + parseInt(targetNode.id)) * 10;
                const tY = centerY + targetNode.y + Math.cos(time / 2000 + parseInt(targetNode.id)) * 10;

                // Connection line
                const isRelevant = hoveredNodeId === node.id || hoveredNodeId === targetNode.id || selectedNode?.id === node.id || selectedNode?.id === targetNode.id;

                ctx.beginPath();
                ctx.moveTo(nX, nY);
                ctx.lineTo(tX, tY);
                ctx.strokeStyle = isRelevant ? 'rgba(138, 180, 248, 0.4)' : 'rgba(138, 180, 248, 0.1)';
                ctx.lineWidth = isRelevant ? 2 : 1;
                ctx.stroke();

                // Draw pulses on this connection
                pulsesRef.current.filter(p => (p.from === node.id && p.to === targetNode.id)).forEach(p => {
                    const pX = nX + (tX - nX) * p.progress;
                    const pY = nY + (tY - nY) * p.progress;

                    const grad = ctx.createRadialGradient(pX, pY, 0, pX, pY, 15);
                    grad.addColorStop(0, 'rgba(138, 180, 248, 1)');
                    grad.addColorStop(1, 'rgba(138, 180, 248, 0)');

                    ctx.fillStyle = grad;
                    ctx.beginPath();
                    ctx.arc(pX, pY, 15, 0, Math.PI * 2);
                    ctx.fill();

                    ctx.fillStyle = '#fff';
                    ctx.beginPath();
                    ctx.arc(pX, pY, 2, 0, Math.PI * 2);
                    ctx.fill();
                });
            });
        });

        // Draw Nodes
        nodes.forEach(node => {
            const nX = centerX + node.x + Math.sin(time / 2000 + parseInt(node.id)) * 10;
            const nY = centerY + node.y + Math.cos(time / 2000 + parseInt(node.id)) * 10;
            const radius = 15 + node.mastery * 25;
            const isHovered = hoveredNodeId === node.id;
            const isSelected = selectedNode?.id === node.id;

            const color = node.state === 'mastered' ? '#8AB4F8' : node.state === 'active' ? '#7C4DFF' : '#5EEAD4';

            // Glow
            const glowRadius = radius * (isHovered || isSelected ? 3 : 2);
            const grad = ctx.createRadialGradient(nX, nY, 0, nX, nY, glowRadius);
            grad.addColorStop(0, color + '40');
            grad.addColorStop(1, color + '00');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(nX, nY, glowRadius, 0, Math.PI * 2);
            ctx.fill();

            // Core
            ctx.fillStyle = isHovered || isSelected ? '#fff' : color;
            ctx.beginPath();
            ctx.arc(nX, nY, radius, 0, Math.PI * 2);
            ctx.fill();

            // Orbital Ring for Mastery
            ctx.beginPath();
            ctx.arc(nX, nY, radius + 5, -Math.PI / 2, -Math.PI / 2 + (node.mastery * Math.PI * 2));
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.stroke();
        });

        requestRef.current = requestAnimationFrame(draw);
    }, [nodes, hoveredNodeId, selectedNode]);

    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        requestRef.current = requestAnimationFrame(draw);
        return () => {
            window.removeEventListener('resize', handleResize);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [draw]);

    const handleMouseMove = (e: React.MouseEvent) => {
        setMousePos({ x: e.clientX, y: e.clientY });
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - canvas.width / 2;
        const mouseY = e.clientY - rect.top - canvas.height / 2;

        let foundId: string | null = null;
        nodes.forEach(node => {
            const distance = Math.sqrt(Math.pow(mouseX - node.x, 2) + Math.pow(mouseY - node.y, 2));
            if (distance < 40) foundId = node.id;
        });
        setHoveredNodeId(foundId);
    };

    const handleClick = () => {
        if (hoveredNodeId) {
            setSelectedNode(nodes.find(n => n.id === hoveredNodeId) || null);
        } else {
            setSelectedNode(null);
        }
    };

    return (
        <div className="relative w-full h-screen bg-[#0a0a12] overflow-hidden cursor-crosshair">
            <canvas
                ref={canvasRef}
                onMouseMove={handleMouseMove}
                onClick={handleClick}
                className="absolute inset-0"
            />

            {/* Neural Labels - Floating overlay */}
            {nodes.map((node, i) => (
                <motion.div
                    key={node.id}
                    className="absolute pointer-events-none"
                    style={{ left: '50%', top: '50%' }}
                    animate={{
                        x: node.x + Math.sin(Date.now() / 2000 + i) * 10,
                        y: node.y + Math.cos(Date.now() / 2000 + i) * 10,
                        opacity: selectedNode?.id === node.id ? 1 : hoveredNodeId === node.id ? 1 : 0.4,
                    }}
                >
                    <div className="transform -translate-x-1/2 -translate-y-[150%] flex flex-col items-center">
                        <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-white/40 mb-1">{node.category}</span>
                        <span className={cn(
                            "text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border backdrop-blur-md",
                            node.state === 'mastered' ? "border-[#8AB4F8]/40 text-[#8AB4F8]" :
                                node.state === 'active' ? "border-[#7C4DFF]/40 text-[#7C4DFF]" :
                                    "border-[#5EEAD4]/40 text-[#5EEAD4]"
                        )}>
                            {node.label}
                        </span>
                    </div>
                </motion.div>
            ))}

            {/* Selection Card - The "Best UI" Detail Pane */}
            <AnimatePresence>
                {selectedNode && (
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        className="fixed right-8 bottom-8 w-96 z-[100]"
                    >
                        <div className="bg-[#0a0a12]/80 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-8 relative overflow-hidden max-h-[85vh] overflow-y-auto scrollbar-hide">
                            {/* Decorative Background Hex */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#8AB4F8]/10 blur-[50px] rounded-full" />

                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                                        <Brain className="text-[#8AB4F8]" size={24} />
                                    </div>
                                    <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-[#8AB4F8]">Node Verified</span>
                                </div>

                                <h2 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter leading-none">
                                    {selectedNode.label}
                                </h2>
                                <p className="text-white/60 text-sm leading-relaxed mb-8">
                                    {selectedNode.description}
                                </p>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                                        <Activity size={16} className="text-[#7C4DFF] mb-2" />
                                        <div className="text-[10px] uppercase text-white/40 mb-1">Mastery</div>
                                        <div className="text-xl font-black text-white">{Math.round(selectedNode.mastery * 100)}%</div>
                                    </div>
                                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                                        <Target size={16} className="text-[#5EEAD4] mb-2" />
                                        <div className="text-[10px] uppercase text-white/40 mb-1">Status</div>
                                        <div className="text-xl font-black text-white uppercase">{selectedNode.state}</div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <button className="w-full py-4 rounded-xl bg-gradient-to-r from-[#8AB4F8] to-[#7C4DFF] text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
                                        <Zap size={14} />
                                        Deep Learning Mode
                                    </button>
                                    <button onClick={() => setSelectedNode(null)} className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white/60 font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-colors">
                                        Close Interface
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Instruction Overlay */}
            <div className="absolute left-8 bottom-8 pointer-events-none">
                <div className="flex items-center gap-4">
                    <div className="p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
                        <Share2 size={24} className="text-[#8AB4F8]" />
                    </div>
                    <div>
                        <h4 className="text-white font-black uppercase tracking-tighter">Skill Topology V4.0</h4>
                        <p className="text-[#8AB4F8]/60 text-[10px] uppercase tracking-widest">Neural Mapping Protocol Engaged</p>
                    </div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                className="absolute left-1/2 top-8 -translate-x-1/2 flex items-center gap-2 px-6 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full"
            >
                <Info size={12} className="text-[#8AB4F8]" />
                <span className="text-[10px] text-white/60 uppercase tracking-[0.2em]">Drift Mouse to hover • Click to expand node details</span>
            </motion.div>
            <style dangerouslySetInnerHTML={{ __html: styles }} />
        </div >
    );
}

const styles = `
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
`;
