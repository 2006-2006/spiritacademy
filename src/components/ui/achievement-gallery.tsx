import React, { useState, useEffect, useRef, HTMLAttributes } from 'react';

const cn = (...classes: (string | undefined | null | false)[]) => {
    return classes.filter(Boolean).join(' ');
}

export interface AchievementItem {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    category: 'certification' | 'skill' | 'project' | 'achievement';
    earnedDate?: string;
}

interface AchievementGalleryProps extends HTMLAttributes<HTMLDivElement> {
    items: AchievementItem[];
    radius?: number;
    autoRotateSpeed?: number;
}

const AchievementGallery = React.forwardRef<HTMLDivElement, AchievementGalleryProps>(
    ({ items, className, radius = 600, autoRotateSpeed = 0.02, ...props }, ref) => {
        const [rotation, setRotation] = useState(0);
        const [isScrolling, setIsScrolling] = useState(false);
        const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
        const animationFrameRef = useRef<number | null>(null);

        useEffect(() => {
            const handleScroll = () => {
                setIsScrolling(true);
                if (scrollTimeoutRef.current) {
                    clearTimeout(scrollTimeoutRef.current);
                }

                const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
                const scrollRotation = scrollProgress * 360;
                setRotation(scrollRotation);

                scrollTimeoutRef.current = setTimeout(() => {
                    setIsScrolling(false);
                }, 150);
            };

            window.addEventListener('scroll', handleScroll, { passive: true });
            return () => {
                window.removeEventListener('scroll', handleScroll);
                if (scrollTimeoutRef.current) {
                    clearTimeout(scrollTimeoutRef.current);
                }
            };
        }, []);

        useEffect(() => {
            const autoRotate = () => {
                if (!isScrolling) {
                    setRotation(prev => prev + autoRotateSpeed);
                }
                animationFrameRef.current = requestAnimationFrame(autoRotate);
            };

            animationFrameRef.current = requestAnimationFrame(autoRotate);

            return () => {
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current);
                }
            };
        }, [isScrolling, autoRotateSpeed]);

        const anglePerItem = 360 / items.length;

        const getCategoryColor = (category: string) => {
            switch (category) {
                case 'certification': return 'from-[#8AB4F8] to-[#7C4DFF]';
                case 'skill': return 'from-green-500 to-emerald-600';
                case 'project': return 'from-orange-500 to-red-600';
                case 'achievement': return 'from-yellow-500 to-amber-600';
                default: return 'from-[#8AB4F8] to-[#7C4DFF]';
            }
        };

        return (
            <div
                ref={ref}
                role="region"
                aria-label="3D Achievement Gallery"
                className={cn("relative w-full h-full flex items-center justify-center", className)}
                style={{ perspective: '2000px' }}
                {...props}
            >
                <div
                    className="relative w-full h-full"
                    style={{
                        transform: `rotateY(${rotation}deg)`,
                        transformStyle: 'preserve-3d',
                    }}
                >
                    {items.map((item, i) => {
                        const itemAngle = i * anglePerItem;
                        const totalRotation = rotation % 360;
                        const relativeAngle = (itemAngle + totalRotation + 360) % 360;
                        const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
                        const opacity = Math.max(0.3, 1 - (normalizedAngle / 180));
                        const scale = Math.max(0.8, 1 - (normalizedAngle / 360));

                        return (
                            <div
                                key={`${item.title}-${i}`}
                                role="group"
                                aria-label={item.title}
                                className="absolute w-[320px] h-[420px]"
                                style={{
                                    transform: `rotateY(${itemAngle}deg) translateZ(${radius}px) scale(${scale})`,
                                    left: '50%',
                                    top: '50%',
                                    marginLeft: '-160px',
                                    marginTop: '-210px',
                                    opacity: opacity,
                                    transition: 'opacity 0.3s linear, transform 0.3s ease-out'
                                }}
                            >
                                <div className="relative w-full h-full rounded-2xl shadow-2xl overflow-hidden group border-2 border-white/10 bg-[#0a0a12]/90 backdrop-blur-xl">
                                    {/* Image */}
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-transparent to-transparent" />

                                        {/* Category badge */}
                                        <div className={cn(
                                            "absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-white backdrop-blur-sm",
                                            `bg-gradient-to-r ${getCategoryColor(item.category)}`
                                        )}>
                                            {item.category}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#0a0a12] to-transparent">
                                        <h2 className="text-2xl font-black text-white uppercase tracking-tight leading-tight mb-1">
                                            {item.title}
                                        </h2>
                                        <p className="text-sm text-[#8AB4F8] font-bold uppercase tracking-widest mb-2">
                                            {item.subtitle}
                                        </p>
                                        <p className="text-xs text-white/60 leading-relaxed mb-3">
                                            {item.description}
                                        </p>
                                        {item.earnedDate && (
                                            <div className="flex items-center gap-2 text-xs text-white/40">
                                                <span>🏆</span>
                                                <span>Earned: {item.earnedDate}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Glow effect */}
                                    <div className={cn(
                                        "absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none",
                                        `bg-gradient-to-br ${getCategoryColor(item.category)}`
                                    )} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
);

AchievementGallery.displayName = 'AchievementGallery';

export { AchievementGallery };
