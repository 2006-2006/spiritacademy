import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const outerSpringConfig = { damping: 40, stiffness: 300 };
  const trailSpringConfig = { damping: 50, stiffness: 150 };

  const outerX = useSpring(mouseX, outerSpringConfig);
  const outerY = useSpring(mouseY, outerSpringConfig);

  const trailX = useSpring(mouseX, trailSpringConfig);
  const trailY = useSpring(mouseY, trailSpringConfig);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.interactive') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updatePosition, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden">
      {/* 1. Far Trail (Distant Memory) */}
      <motion.div
        className="absolute w-12 h-12 rounded-full border border-[#8AB4F8]/10 flex items-center justify-center transform-gpu"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          scale: isHovering ? 2 : 1,
          opacity: isHovering ? 0.4 : 0.1,
          willChange: 'transform'
        }}
      />

      {/* 2. Outer Adaptive Ring */}
      <motion.div
        className="absolute rounded-full border border-[#8AB4F8]/30 flex items-center justify-center transform-gpu shadow-[0_0_15px_rgba(138,180,248,0.2)]"
        style={{
          x: outerX,
          y: outerY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovering ? 80 : 40,
          height: isHovering ? 80 : 40,
          scale: isClicking ? 0.8 : 1,
          willChange: 'transform, width, height'
        }}
      >
        {/* Revolving Data Bits */}
        <div className="absolute inset-0 w-full h-full animate-[spin_4s_linear_infinite]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#8AB4F8] rounded-full blur-[1px]"></div>
        </div>
        <div className="absolute inset-0 w-full h-full animate-[spin_8s_linear_infinite_reverse]">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#5EEAD4] rounded-full blur-[1px]"></div>
        </div>
      </motion.div>

      {/* 3. Hardware Crosshair (Static to mouse for precision) */}
      <motion.div
        className="absolute w-6 h-6 flex items-center justify-center transform-gpu"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          willChange: 'transform'
        }}
      >
        {/* Vertical/Horizontal lines */}
        <div className="absolute w-[1px] h-full bg-white/20"></div>
        <div className="absolute h-[1px] w-full bg-white/20"></div>

        {/* Core Dot (Lag-Free & Enhanced Visibility) */}
        <motion.div
          className="w-2 h-2 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,1),0_0_30px_rgba(138,180,248,0.8)]"
          animate={{
            scale: isHovering ? 0.6 : 1,
            backgroundColor: isHovering ? '#8AB4F8' : '#FFFFFF'
          }}
        />
      </motion.div>

      {/* 4. Click Pulse */}
      <motion.div
        className="absolute rounded-full border border-white/40 transform-gpu"
        animate={{
          scale: isClicking ? 2.5 : 0,
          opacity: isClicking ? 0 : 0.5
        }}
        transition={{ duration: 0.4 }}
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          width: 20,
          height: 20,
          willChange: 'transform, scale, opacity'
        }}
      />
    </div>
  );
}
