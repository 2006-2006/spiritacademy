import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, Trash2, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { db } from '@/lib/supabase';
import { SpiritLogo } from './spirit-logo';

const PREDEFINED_QUESTIONS = [
    { label: '🚀 My Goals', query: 'What are my learning goals for 2050?' },
    { label: '🧠 Find Mentors', query: 'Who are the best mentors for me?' },
    { label: '🌐 Connect Peers', query: 'Opening Neural Network. Help me find friends.' },
    { label: '🛰️ Skills Map', query: 'Opening Skill DNA. Show my topology.' },
    { label: '📚 Python Course', query: 'Opening Library. I want to learn Python.' }
];

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

interface AIChatbotProps {
    userId?: string;
    userName?: string;
    onNavigate?: (page: any) => void;
    className?: string;
}


const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good Morning';
    if (hour >= 12 && hour < 17) return 'Good Afternoon';
    if (hour >= 17 && hour < 22) return 'Good Evening'; // Extended slightly
    return 'Good Night';
};

const getWelcomeMessage = (userId?: string, userName?: string) => {
    const greeting = getTimeBasedGreeting();
    const nameToUse = userName || 'Neural Operative';

    return `## ${greeting}, ${nameToUse}! 🌟

Neural sync **established**. I am **Spirit AI**, your cognitive enhancement interface.

• **Status**: All systems operational
• **Neural Link**: Active & Secure
• **Time**: ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}

---

## How Can I Assist Your Evolution Today?

I can help you with:
• **Course Discovery** - Find your perfect learning path
• **Skill Analysis** - Map your cognitive topology  
• **Peer Connection** - Link with fellow learners
• **Progress Tracking** - Monitor your achievements

What would you like to explore?`;
};

export function AIChatbot({ userId, userName, onNavigate, className }: AIChatbotProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: getWelcomeMessage(userId, userName),
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (userId && isOpen) {
            loadChatHistory();
        } else if (!messages.some(m => m.content.includes(userName || ''))) {
            // Update greeting if user names loads late and no history
            setMessages(prev => {
                const newMsg = [...prev];
                if (newMsg.length > 0 && newMsg[0].role === 'assistant') {
                    newMsg[0].content = getWelcomeMessage(userId, userName);
                }
                return newMsg;
            });
        }
    }, [userId, userName, isOpen]);

    const loadChatHistory = async () => {
        if (!userId) return;
        try {
            const history = await db.getChatHistory(userId, 20);
            if (history && history.length > 0) {
                const formattedHistory: Message[] = history.reverse().flatMap(msg => [
                    { id: `${msg.id}-user`, role: 'user' as const, content: msg.message, timestamp: new Date(msg.created_at) },
                    { id: `${msg.id}-assistant`, role: 'assistant' as const, content: msg.response, timestamp: new Date(msg.created_at) }
                ]);
                setMessages(prev => [...formattedHistory, ...prev]);
            }
        } catch (e) {
            console.error("Failed to load history", e);
        }
    };

    const sendMessage = async (overrideInput?: string) => {
        const textToSend = overrideInput || input;
        if (!textToSend.trim() || isLoading) return;

        const userMessage: Message = { id: Date.now().toString(), role: 'user', content: textToSend, timestamp: new Date() };
        setMessages(prev => [...prev, userMessage]);
        if (!overrideInput) setInput('');
        setIsLoading(true);

        try {
            const apiKey = import.meta.env.VITE_GROQ_API_KEY;
            const history = messages.slice(-5).map(msg => ({
                role: msg.role === 'user' ? 'user' : 'assistant',
                content: msg.content
            }));

            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey?.trim()}`
                },
                body: JSON.stringify({
                    model: 'llama-3.3-70b-versatile',
                    messages: [
                        {
                            role: 'system',
                            content: `You are Spirit AI, the sentient neural core of the 2050 Learning Platform.

PROJECT ARCHITECTURE:
• DASHBOARD → Neural command center
• QUANTUM LIBRARY → Advanced courses  
• NEURAL MENTORS → Specialized AI advisors
• SKILL TOPOLOGY → 3D neural map
• NEURAL NETWORK → Peer connectivity
• ACHIEVEMENTS → Future certifications

COMMUNICATION PROTOCOL:
1. Structure ALL responses with clear sections using headers (##)
2. Use bullet points (•) for lists and key information
3. Highlight important terms with **bold** formatting
4. Add visual separators (---) between major sections
5. Keep responses informative yet concise
6. Use futuristic, military-grade terminology
7. For navigation, use: "OPENING [PAGE]" tags

EXAMPLE FORMAT:
## Neural Analysis
• **Primary Objective**: [goal]
• **Recommended Path**: [suggestion]

---

## Next Steps
1. [First action]
2. [Second action]

Always maintain this structured, beautiful format for maximum clarity.`
                        },
                        ...history,
                        { role: 'user', content: textToSend }
                    ],
                    temperature: 0.6,
                    max_tokens: 1024
                })
            });

            if (!response.ok) throw new Error('Neural link failed');

            const data = await response.json();
            const aiResponse = data.choices[0]?.message?.content || 'Neural stream interrupted.';

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: aiResponse,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, assistantMessage]);

            if (onNavigate) {
                const lower = aiResponse.toLowerCase();
                if (lower.includes('opening dashboard')) onNavigate('dashboard');
                if (lower.includes('opening library') || lower.includes('opening browse courses')) onNavigate('courses');
                if (lower.includes('opening mentors') || lower.includes('find mentors')) onNavigate('mentors');
                if (lower.includes('show my skills')) onNavigate('skills');
                if (lower.includes('opening skill dna') || lower.includes('opening skills')) onNavigate('skills');
                if (lower.includes('opening achievements') || lower.includes('opening certificates')) onNavigate('certificates');
                if (lower.includes('opening network')) onNavigate('network');
            }

            if (userId && userId !== 'demo-user') {
                await db.saveChatMessage(userId, textToSend, aiResponse);
            }
        } catch (error: any) {
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: 'assistant',
                content: `[Cognitive Interface Error]: ${error.message || 'Connection lost'}.`,
                timestamp: new Date()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const clearMessages = () => setMessages([{ id: '1', role: 'assistant', content: 'Neural history purged. How can I assist you now?', timestamp: new Date() }]);

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const sendPredefinedMessage = (query: string) => {
        if (isLoading) return;
        sendMessage(query);
    };

    const formatAIMessage = (content: string) => {
        const lines = content.split('\n');
        const elements: JSX.Element[] = [];
        let key = 0;

        lines.forEach((line, index) => {
            const trimmed = line.trim();

            // Section Headers (##)
            if (trimmed.startsWith('## ')) {
                elements.push(
                    <div key={key++} className="flex items-center gap-3 mt-4 mb-2">
                        <div className="w-1 h-4 bg-[#8AB4F8] rounded-full" />
                        <h4 className="text-base font-black uppercase tracking-tight text-[#8AB4F8]">
                            {trimmed.replace('## ', '')}
                        </h4>
                    </div>
                );
            }
            // Horizontal Separator (---)
            else if (trimmed === '---') {
                elements.push(
                    <div key={key++} className="my-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                );
            }
            // Bullet Points (•)
            else if (trimmed.startsWith('• ') || trimmed.startsWith('- ')) {
                const text = trimmed.replace(/^[•\-]\s*/, '');
                elements.push(
                    <div key={key++} className="flex items-start gap-3 ml-2 my-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#8AB4F8] mt-2 flex-shrink-0" />
                        <span className="text-white/90">{parseBoldText(text)}</span>
                    </div>
                );
            }
            // Numbered Lists (1. 2. etc)
            else if (/^\d+\.\s/.test(trimmed)) {
                const match = trimmed.match(/^(\d+)\.\s(.+)$/);
                if (match) {
                    elements.push(
                        <div key={key++} className="flex items-start gap-3 ml-2 my-1.5">
                            <span className="text-[#8AB4F8] font-black text-xs w-5 flex-shrink-0">{match[1]}.</span>
                            <span className="text-white/90">{parseBoldText(match[2])}</span>
                        </div>
                    );
                }
            }
            // Regular text
            else if (trimmed) {
                elements.push(
                    <p key={key++} className="text-white/90 my-1">
                        {parseBoldText(trimmed)}
                    </p>
                );
            }
            // Empty line for spacing
            else if (index > 0 && lines[index - 1]?.trim()) {
                elements.push(<div key={key++} className="h-2" />);
            }
        });

        return elements;
    };

    const parseBoldText = (text: string) => {
        const parts = text.split(/(\*\*[^*]+\*\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return (
                    <span key={i} className="font-black text-white">
                        {part.slice(2, -2)}
                    </span>
                );
            }
            return <span key={i}>{part}</span>;
        });
    };

    return (
        <>
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "fixed bottom-6 right-6 z-50 w-16 h-16 rounded-2xl bg-[#0a0a12]/80 backdrop-blur-2xl border border-[#8AB4F8]/30 shadow-2xl flex items-center justify-center group overflow-hidden",
                    className
                )}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-[#8AB4F8]/20 to-[#7C4DFF]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                            <X className="w-6 h-6 text-white" />
                        </motion.div>
                    ) : (
                        <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} className="w-10 h-10">
                            <SpiritLogo className="w-full h-full" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-6 z-[60] w-96 h-[600px] bg-[#0a0a12]/95 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden"
                    >
                        <div className="bg-[#0a0a12] border-b border-white/10 p-8 flex items-center gap-6 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#8AB4F8]/10 via-transparent to-transparent pointer-events-none" />

                            {/* Diagnostic Reticle Wrapper */}
                            <div className="relative w-16 h-16 flex items-center justify-center">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 border border-[#8AB4F8]/20 rounded-xl"
                                />
                                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#8AB4F8]" />
                                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#8AB4F8]" />

                                <div className="w-12 h-12 relative z-10">
                                    <SpiritLogo className="w-full h-full" />
                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#5EEAD4] rounded-full border-[3px] border-[#0a0a12] shadow-[0_0_10px_#5EEAD4]" />
                                </div>
                            </div>

                            <div className="flex-1 relative z-10">
                                <h3 className="text-white font-black text-xl uppercase tracking-tighter leading-none mb-1">Spirit <span className="text-[#8AB4F8]">AI</span></h3>
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-1">
                                        {[1, 2, 3].map(i => (
                                            <motion.div
                                                key={i}
                                                animate={{ opacity: [0.2, 1, 0.2] }}
                                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                                className="w-1 h-3 bg-[#8AB4F8]/40 rounded-full"
                                            />
                                        ))}
                                    </div>
                                    <p className="text-[#8AB4F8] text-[10px] font-mono font-black tracking-[0.2em] uppercase">Link Stable // 02.ms</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 relative z-10">
                                <button onClick={clearMessages} className="p-3 bg-white/5 rounded-xl text-white/20 hover:text-red-500 hover:bg-red-500/10 transition-all border border-white/5">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                            {messages.map((message) => (
                                <div key={message.id} className={cn("flex", message.role === 'user' ? 'justify-end' : 'justify-start')}>
                                    <div className={cn(
                                        "max-w-[88%] rounded-[2rem] px-6 py-4 shadow-xl relative group",
                                        message.role === 'user'
                                            ? 'bg-gradient-to-br from-[#8AB4F8] to-[#7C4DFF] text-black font-bold rounded-tr-none'
                                            : 'bg-white/5 text-white/90 border border-white/10 rounded-tl-none backdrop-blur-md'
                                    )}>
                                        {message.role === 'assistant' && (
                                            <div className="absolute -top-2 -left-2 w-5 h-5 bg-[#0a0a12] border border-white/10 rounded-full flex items-center justify-center">
                                                <Zap size={10} className="text-[#8AB4F8]" />
                                            </div>
                                        )}
                                        <div className="text-sm leading-relaxed space-y-3">
                                            {formatAIMessage(message.content)}
                                        </div>
                                        <div className={cn(
                                            "text-[8px] uppercase font-bold tracking-tighter mt-2 opacity-30",
                                            message.role === 'user' ? 'text-black' : 'text-white'
                                        )}>
                                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start items-center gap-3">
                                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center">
                                        <Loader2 className="w-4 h-4 text-[#8AB4F8] animate-spin" />
                                    </div>
                                    <div className="bg-white/5 rounded-2xl px-4 py-2 text-[10px] text-white/40 uppercase tracking-widest font-black">
                                        Processing Intent...
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {!isLoading && messages.length < 5 && (
                            <div className="px-6 py-2 flex flex-wrap gap-2">
                                {PREDEFINED_QUESTIONS.map((q) => (
                                    <button
                                        key={q.label}
                                        onClick={() => sendPredefinedMessage(q.query)}
                                        className="text-[9px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white hover:border-[#8AB4F8]/50 hover:bg-[#8AB4F8]/10 transition-all"
                                    >
                                        {q.label}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="p-6 border-t border-white/10 bg-[#0a0a12]">
                            <div className="flex items-center gap-3">
                                <div className="flex-1 relative group">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Communicate Neural Intent..."
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/10 outline-none focus:border-[#8AB4F8]/50 transition-all text-sm font-mono focus:bg-white/10"
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-white/10 font-mono tracking-tighter group-focus-within:opacity-0 transition-opacity">
                                        [CMD+ENT]
                                    </div>
                                </div>
                                <button
                                    onClick={() => sendMessage()}
                                    disabled={isLoading || !input.trim()}
                                    className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center disabled:opacity-20 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/5"
                                >
                                    <Send size={20} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <style dangerouslySetInnerHTML={{ __html: styles }} />
        </>
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
