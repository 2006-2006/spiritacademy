import React from 'react';


interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'danger';
    icon?: React.ReactNode;
}

export const CyberButton: React.FC<CyberButtonProps> = ({
    children,
    variant = 'primary',
    icon,
    className = "",
    ...props
}) => {
    const baseStyles = "relative group px-8 py-4 clip-hex-side font-bold tracking-widest transition-all duration-300 overflow-hidden";

    const variants = {
        primary: "bg-[#8AB4F8]/10 text-[#8AB4F8] border border-[#8AB4F8]/30 hover:bg-[#8AB4F8]/20 hover:border-[#8AB4F8]",
        secondary: "bg-[#7C4DFF]/10 text-[#7C4DFF] border border-[#7C4DFF]/30 hover:bg-[#7C4DFF]/20 hover:border-[#7C4DFF]",
        danger: "bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500/20 hover:border-red-500"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {/* Scanline Effect */}
            <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 pointer-events-none overflow-hidden">
                <div className="scanline"></div>
            </div>

            {/* Background Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-50 blur-xl bg-current transition-opacity duration-500"></div>

            <div className="relative flex items-center justify-center gap-2 z-10">
                {icon}
                {children}
            </div>

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-current opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-current opacity-50"></div>
        </button>
    );
};
