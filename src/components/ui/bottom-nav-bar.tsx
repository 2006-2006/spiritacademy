import { useState } from "react";
import { motion } from "framer-motion";
import {
    Home,
    LineChart,
    CreditCard,
    MessageCircle,
    Trophy,
    User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { label: "Home", icon: Home },
    { label: "Courses", icon: LineChart },
    { label: "Progress", icon: CreditCard },
    { label: "Chat", icon: MessageCircle },
    { label: "Rewards", icon: Trophy },
    { label: "Profile", icon: User },
];

const MOBILE_LABEL_WIDTH = 72;

type BottomNavBarProps = {
    className?: string;
    defaultIndex?: number;
    stickyBottom?: boolean;
    onNavigate?: (label: string) => void;
};

export function BottomNavBar({
    className,
    defaultIndex = 0,
    stickyBottom = false,
    onNavigate,
}: BottomNavBarProps) {
    const [activeIndex, setActiveIndex] = useState(defaultIndex);

    const handleClick = (idx: number, label: string) => {
        setActiveIndex(idx);
        if (onNavigate) onNavigate(label);
    };

    return (
        <motion.nav
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            role="navigation"
            aria-label="Bottom Navigation"
            className={cn(
                "bg-[#0a0a12]/80 backdrop-blur-xl border border-[#8AB4F8]/20 rounded-full flex items-center p-2 shadow-xl space-x-1 min-w-[320px] max-w-[95vw] h-[52px]",
                stickyBottom && "fixed inset-x-0 bottom-4 mx-auto z-20 w-fit",
                className,
            )}
        >
            {navItems.map((item, idx) => {
                const Icon = item.icon;
                const isActive = activeIndex === idx;

                return (
                    <motion.button
                        key={item.label}
                        whileTap={{ scale: 0.97 }}
                        className={cn(
                            "flex items-center gap-0 px-3 py-2 rounded-full transition-colors duration-200 relative h-10 min-w-[44px] min-h-[40px] max-h-[44px]",
                            isActive
                                ? "bg-[#8AB4F8]/10 text-[#8AB4F8] gap-2"
                                : "bg-transparent text-white/40 hover:bg-white/5 hover:text-white/80",
                            "focus:outline-none focus-visible:ring-0",
                        )}
                        onClick={() => handleClick(idx, item.label)}
                        aria-label={item.label}
                        type="button"
                    >
                        <Icon
                            size={22}
                            strokeWidth={2}
                            aria-hidden
                            className="transition-colors duration-200"
                        />

                        <motion.div
                            initial={false}
                            animate={{
                                width: isActive ? `${MOBILE_LABEL_WIDTH}px` : "0px",
                                opacity: isActive ? 1 : 0,
                                marginLeft: isActive ? "8px" : "0px",
                            }}
                            transition={{
                                width: { type: "spring", stiffness: 350, damping: 32 },
                                opacity: { duration: 0.19 },
                                marginLeft: { duration: 0.19 },
                            }}
                            className={cn("overflow-hidden flex items-center max-w-[72px]")}
                        >
                            <span
                                className={cn(
                                    "font-medium text-xs whitespace-nowrap select-none transition-opacity duration-200 overflow-hidden text-ellipsis text-[clamp(0.625rem,0.5263rem+0.5263vw,1rem)] leading-[1.9]",
                                    isActive ? "text-[#8AB4F8]" : "opacity-0",
                                )}
                                title={item.label}
                            >
                                {item.label}
                            </span>
                        </motion.div>
                    </motion.button>
                );
            })}
        </motion.nav>
    );
}

export default BottomNavBar;
