import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  pulseSpeed: number;
}

export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const particleCount = 28;
    const particles: Particle[] = [];

    // Warm artisanal colors: golden caramel, amber, soft cream
    const colors = [
      'rgba(246, 214, 143, ', // warm gold
      'rgba(216, 99, 67, ',   // terracotta
      'rgba(185, 198, 161, ', // matcha sage
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.8,
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: -Math.random() * 0.4 - 0.1, // gently floating upwards
        opacity: Math.random() * 0.45 + 0.15,
        pulseSpeed: Math.random() * 0.015 + 0.005,
      });
    }

    let tick = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick += 1;

      particles.forEach((p, idx) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around boundaries
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        const currentOpacity = p.opacity * (0.7 + 0.3 * Math.sin(tick * p.pulseSpeed + idx));
        const color = colors[idx % colors.length];

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${color}${currentOpacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-60"
    />
  );
}
