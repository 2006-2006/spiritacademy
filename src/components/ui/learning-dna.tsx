import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import { Share2, Info } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

interface SkillNode {
    id: string;
    label: string;
    x: number;
    y: number;
    mastery: number;
    category: 'core' | 'advanced' | 'emerging';
    connections: string[];
}

const skillsData: SkillNode[] = [
    // Core Skills
    { id: '1', label: 'Python', x: 0, y: 0, mastery: 0.9, category: 'core', connections: ['2', '3', '4'] },
    { id: '2', label: 'Mathematics', x: -150, y: -100, mastery: 0.8, category: 'core', connections: ['1', '5'] },
    { id: '3', label: 'Data Structures', x: 150, y: -100, mastery: 0.85, category: 'core', connections: ['1', '6'] },

    // Advanced Skills
    { id: '4', label: 'Machine Learning', x: 0, y: 150, mastery: 0.7, category: 'advanced', connections: ['1', '5', '7'] },
    { id: '5', label: 'Deep Learning', x: -200, y: 100, mastery: 0.6, category: 'advanced', connections: ['2', '4', '8'] },
    { id: '6', label: 'Algorithms', x: 200, y: 100, mastery: 0.75, category: 'advanced', connections: ['3', '7'] },

    // Emerging Skills
    { id: '7', label: 'Neural Networks', x: 100, y: 250, mastery: 0.4, category: 'emerging', connections: ['4', '6', '8'] },
    { id: '8', label: 'Quantum ML', x: -100, y: 250, mastery: 0.2, category: 'emerging', connections: ['5', '7'] },
];

export function LearningDNA() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    const animationRef = useRef<number>();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = Math.min(800, window.innerWidth - 40);
        canvas.height = 600;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        const getCategoryColor = (category: string) => {
            switch (category) {
                case 'core': return '#8AB4F8'; // Blue
                case 'advanced': return '#7C4DFF'; // Purple
                case 'emerging': return '#5EEAD4'; // Cyan
                default: return '#8AB4F8';
            }
        };

        const animate = (time: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw connections with flowing energy
            skillsData.forEach(node => {
                node.connections.forEach(connId => {
                    const targetNode = skillsData.find(n => n.id === connId);
                    if (!targetNode) return;

                    const x1 = centerX + node.x;
                    const y1 = centerY + node.y;
                    const x2 = centerX + targetNode.x;
                    const y2 = centerY + targetNode.y;

                    // Connection line
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);

                    const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
                    gradient.addColorStop(0, getCategoryColor(node.category) + '40');
                    gradient.addColorStop(1, getCategoryColor(targetNode.category) + '40');

                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 2;
                    ctx.stroke();

                    // Flowing energy particles
                    const progress = (time / 2000) % 1;
                    const particleX = x1 + (x2 - x1) * progress;
                    const particleY = y1 + (y2 - y1) * progress;

                    ctx.beginPath();
                    ctx.arc(particleX, particleY, 3, 0, Math.PI * 2);
                    ctx.fillStyle = getCategoryColor(node.category);
                    ctx.fill();
                });
            });

            // Draw nodes
            skillsData.forEach(node => {
                const x = centerX + node.x;
                const y = centerY + node.y;
                const baseRadius = 40;
                const radius = baseRadius + (node.mastery * 20);
                const isHovered = hoveredNode === node.id;

                // Outer glow (pulsing)
                const pulseRadius = radius + Math.sin(time / 500 + parseInt(node.id)) * 10;
                const gradient = ctx.createRadialGradient(x, y, 0, x, y, pulseRadius * 1.5);
                gradient.addColorStop(0, getCategoryColor(node.category) + '60');
                gradient.addColorStop(0.5, getCategoryColor(node.category) + '20');
                gradient.addColorStop(1, getCategoryColor(node.category) + '00');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(x, y, pulseRadius * 1.5, 0, Math.PI * 2);
                ctx.fill();

                // Main node
                ctx.fillStyle = isHovered
                    ? getCategoryColor(node.category)
                    : getCategoryColor(node.category) + '80';
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fill();

                // Mastery ring
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.arc(x, y, radius + 5, -Math.PI / 2, -Math.PI / 2 + (node.mastery * Math.PI * 2));
                ctx.stroke();

                // Inner core
                ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
                ctx.beginPath();
                ctx.arc(x, y, radius * 0.6, 0, Math.PI * 2);
                ctx.fill();
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [hoveredNode]);

    const handleCanvasMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left - canvas.width / 2;
        const y = e.clientY - rect.top - canvas.height / 2;

        const hovered = skillsData.find(node => {
            const distance = Math.sqrt(Math.pow(x - node.x, 2) + Math.pow(y - node.y, 2));
            const radius = 40 + (node.mastery * 20);
            return distance < radius;
        });

        setHoveredNode(hovered?.id || null);
    };

    return (
        <section className="py-20 px-6 relative">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6">
                        Your Learning <span className="bg-gradient-to-r from-[#8AB4F8] to-[#7C4DFF] bg-clip-text text-transparent">DNA</span>
                    </h2>
                    <p className="text-[#8AB4F8]/60 text-lg max-w-2xl mx-auto">
                        Instead of showing progress bars, we visualize intelligence.
                    </p>
                </motion.div>

                {/* Canvas */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative bg-[#0a0a12]/60 backdrop-blur-xl border border-[#8AB4F8]/20 rounded-3xl p-8 overflow-hidden"
                >
                    <canvas
                        ref={canvasRef}
                        onMouseMove={handleCanvasMove}
                        onMouseLeave={() => setHoveredNode(null)}
                        className="mx-auto cursor-pointer"
                    />

                    {/* Legend */}
                    <div className="flex justify-center gap-8 mt-8">
                        {[
                            { label: 'Core Skills', color: '#8AB4F8' },
                            { label: 'Advanced', color: '#7C4DFF' },
                            { label: 'Emerging', color: '#5EEAD4' }
                        ].map((item) => (
                            <div key={item.label} className="flex items-center gap-2">
                                <div
                                    className="w-4 h-4 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                />
                                <span className="text-white/60 text-sm">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Node Details */}
                <AnimatePresence mode="wait">
                    {hoveredNode ? (
                        <motion.div
                            key="details"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="mt-8 bg-[#0a0a12]/80 backdrop-blur-xl border border-[#8AB4F8]/30 rounded-2xl p-6 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Share2 size={100} />
                            </div>

                            {(() => {
                                const node = skillsData.find(n => n.id === hoveredNode);
                                if (!node) return null;

                                return (
                                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                                        <div className="text-center md:text-left">
                                            <div className="text-[#8AB4F8] text-xs font-mono uppercase tracking-widest mb-2">Selected Node</div>
                                            <h3 className="text-3xl font-black text-white mb-2">{node.label}</h3>
                                            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                                <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider capitalize border border-white/5">{node.category}</span>
                                                <span className="px-3 py-1 rounded-full bg-[#8AB4F8]/10 text-[#8AB4F8] text-xs font-bold uppercase tracking-wider border border-[#8AB4F8]/20">{Math.round(node.mastery * 100)}% Synced</span>
                                            </div>
                                        </div>

                                        <div className="md:col-span-2 space-y-4">
                                            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                                <h4 className="text-white text-sm font-bold mb-1">Cognitive Analysis</h4>
                                                <p className="text-white/60 text-sm leading-relaxed">
                                                    Your neural architecture shows {node.mastery > 0.7 ? "advanced" : "developing"} patterns in {node.label}.
                                                    {node.category === 'core' && " This is a foundational pillar of your digital intellect."}
                                                    {node.category === 'advanced' && " Consistent reinforcement is optimizing these pathways."}
                                                    {node.category === 'emerging' && " New connections are forming rapidly in this sector."}
                                                </p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="p-3 bg-black/20 rounded-lg">
                                                    <div className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Learning Velocity</div>
                                                    <div className="text-[#5EEAD4] font-mono font-bold">High</div>
                                                </div>
                                                <div className="p-3 bg-black/20 rounded-lg">
                                                    <div className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Retention Rate</div>
                                                    <div className="text-[#7C4DFF] font-mono font-bold">94.2%</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })()}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-8 p-8 border border-white/5 rounded-2xl text-center bg-white/5 backdrop-blur-sm"
                        >
                            <Info className="mx-auto text-white/20 mb-4" size={32} />
                            <p className="text-white/40 font-mono uppercase tracking-widest text-sm">
                                Hover over a node to analyze your cognitive DNA
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
