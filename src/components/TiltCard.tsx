import { useRef, useState, type ReactNode, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number; // max tilt in degrees (default: 8)
  glare?: boolean;
}

export function TiltCard({
  children,
  className = '',
  maxTilt = 7,
  glare = true,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 260, mass: 0.1 };

  const rotateX = useSpring(useTransform(y, [0, 1], [maxTilt, -maxTilt]), springConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-maxTilt, maxTilt]), springConfig);

  const glareX = useTransform(x, [0, 1], ['0%', '100%']);
  const glareY = useTransform(y, [0, 1], ['0%', '100%']);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const clientX = (e.clientX - rect.left) / rect.width;
    const clientY = (e.clientY - rect.top) / rect.height;
    x.set(clientX);
    y.set(clientY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className="h-full w-full transform-gpu"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.3 }}
        className={`relative h-full w-full overflow-hidden transition-shadow duration-300 ${className}`}
      >
        {children}

        {/* Dynamic Glare Effect */}
        {glare && (
          <motion.div
            className="pointer-events-none absolute -inset-full z-20 opacity-0 transition-opacity duration-300"
            animate={{ opacity: isHovered ? 0.35 : 0 }}
            style={{
              background: `radial-gradient(circle 350px at ${glareX} ${glareY}, rgba(255, 255, 255, 0.45), transparent 70%)`,
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
