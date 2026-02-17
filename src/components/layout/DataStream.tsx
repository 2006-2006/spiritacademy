import React, { useMemo } from 'react';

export const DataStream: React.FC<{ side: 'left' | 'right' }> = ({ side }) => {
    // Generate a large block of static data once
    const dataBlock = useMemo(() => {
        const chars = '0123456789ABCDEF!@#$%^&*()';
        return Array.from({ length: 60 }, () => {
            let line = '';
            for (let i = 0; i < 8; i++) {
                line += chars[Math.floor(Math.random() * chars.length)];
            }
            return line;
        });
    }, []);

    return (
        <div className={`fixed top-0 ${side}-4 h-full w-12 flex flex-col font-mono text-[8px] text-[#8AB4F8]/20 overflow-hidden pointer-events-none z-40 select-none`}>
            {/* Double the block for seamless loop */}
            <div className="flex flex-col animate-data-stream">
                {[...dataBlock, ...dataBlock].map((line, i) => (
                    <div key={i} className="leading-none py-1 text-center whitespace-nowrap">
                        {line}
                    </div>
                ))}
            </div>
        </div>
    );
};
