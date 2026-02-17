import { useEffect, useRef } from 'react';

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 20 : 45; // Aggressively reduced for zero lag
    const connectionDist = isMobile ? 50 : 100;
    const connectionDistSq = connectionDist * connectionDist;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    const colors = ['rgba(138, 180, 248, ', 'rgba(124, 77, 255, ', 'rgba(94, 234, 212, '];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        size: Math.random() * 1.2 + 0.5,
        opacity: Math.random() * 0.2 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    let animationId: number;

    function animate() {
      if (!ctx || !canvas) return;

      // Using white/0 clearing can be faster in some browsers than clearRect
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        if (!isMobile) {
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;

          if (Math.abs(dx) < 120 && Math.abs(dy) < 120) {
            const distSq = dx * dx + dy * dy;
            if (distSq < 14400) {
              const distance = Math.sqrt(distSq) || 1;
              const force = (120 - distance) / 120;
              particle.vx -= (dx / distance) * force * 0.1;
              particle.vy -= (dy / distance) * force * 0.1;
            }
          }
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + particle.opacity + ')';
        ctx.fill();

        if (!isMobile) {
          for (let j = i + 1; j < particles.length; j++) {
            const particle2 = particles[j];
            const dx2 = particle.x - particle2.x;
            const dy2 = particle.y - particle2.y;

            if (Math.abs(dx2) < connectionDist && Math.abs(dy2) < connectionDist) {
              const distSq2 = dx2 * dx2 + dy2 * dy2;
              if (distSq2 < connectionDistSq) {
                const dist2 = Math.sqrt(distSq2);
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(particle2.x, particle2.y);
                ctx.strokeStyle = particle.color + (0.05 * (1 - dist2 / connectionDist)) + ')';
                ctx.lineWidth = 0.5;
                ctx.stroke();
              }
            }
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.4 }}
    />
  );
}
