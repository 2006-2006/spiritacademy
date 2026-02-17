import { CardStack, CardStackItem } from "@/components/ui/card-stack";

const items: CardStackItem[] = [
    {
        id: 1,
        title: "Luxury Performance",
        description: "Experience the thrill of precision engineering",
        imageSrc: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2070&auto=format&fit=crop",
        href: "https://www.unsplash.com/",
    },
    {
        id: 2,
        title: "Elegant Design",
        description: "Where beauty meets functionality",
        imageSrc: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop",
        href: "https://www.unsplash.com/",
    },
    {
        id: 3,
        title: "Power & Speed",
        description: "Unleash the true potential of the road",
        imageSrc: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop",
        href: "https://www.unsplash.com/",
    },
    {
        id: 4,
        title: "Timeless Craftsmanship",
        description: "Built with passion, driven by excellence",
        imageSrc: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop",
        href: "https://www.unsplash.com/",
    },
    {
        id: 5,
        title: "Future of Mobility",
        description: "Innovation that moves you forward",
        imageSrc: "https://images.unsplash.com/photo-1594502184342-2e12f877aa73?q=80&w=2000&auto=format&fit=crop",
        href: "https://www.unsplash.com/",
    },
];

export default function CardStackDemoPage() {
    return (
        <div className="w-full bg-zinc-950 py-20 min-h-screen flex items-center justify-center">
            <div className="mx-auto w-full max-w-5xl p-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white mb-4 uppercase tracking-tighter italic">Dynamic Stack</h2>
                    <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Interactive 3D Card Navigation</p>
                </div>
                <CardStack
                    items={items}
                    initialIndex={0}
                    autoAdvance
                    intervalMs={2000}
                    pauseOnHover
                    showDots
                />
            </div>
        </div>
    );
}
