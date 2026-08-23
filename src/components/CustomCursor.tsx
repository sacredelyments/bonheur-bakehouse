import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isPointer, setIsPointer] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for fluid trailing motion
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device has a fine pointer (mouse/trackpad)
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasPointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if hovering over element with custom cursor or pointer
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const clickableEl = target.closest('button, a, input, textarea, [role="button"]') as HTMLElement | null;
      const cursorAttrEl = target.closest('[data-cursor]') as HTMLElement | null;

      // If hovering directly over a button/link without its own data-cursor, show clean click state
      if (clickableEl && cursorAttrEl && cursorAttrEl.contains(clickableEl) && !clickableEl.hasAttribute('data-cursor')) {
        setCursorText('');
        setIsPointer(true);
      } else if (cursorAttrEl) {
        setCursorText(cursorAttrEl.getAttribute('data-cursor') || '');
        setIsPointer(true);
      } else {
        setCursorText('');
        setIsPointer(!!clickableEl);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  // Don't render on mobile/touch screens
  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
    return null;
  }

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Follower Ring / Badge */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full backdrop-blur-[2px]"
        style={{
          x: smoothX,
          y: smoothY,
        }}
        animate={{
          width: cursorText ? 72 : isPointer ? 44 : 26,
          height: cursorText ? 72 : isPointer ? 44 : 26,
          backgroundColor: cursorText
            ? 'rgba(216, 99, 67, 0.92)'
            : isPointer
            ? 'rgba(61, 35, 57, 0.15)'
            : 'rgba(216, 99, 67, 0.25)',
          borderColor: cursorText
            ? 'rgba(255, 248, 238, 0.4)'
            : isPointer
            ? 'rgba(61, 35, 57, 0.4)'
            : 'rgba(216, 99, 67, 0.5)',
          borderWidth: cursorText ? 1 : 1.5,
          scale: 1,
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 400,
          mass: 0.3,
        }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="flex h-full w-full items-center justify-center text-[10px] font-bold tracking-wider uppercase text-[#fff8ee]"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Tiny Center Dot (when not showing text) */}
      {!cursorText && (
        <motion.div
          className="pointer-events-none fixed top-0 left-0 z-[9999] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d86343]"
          style={{
            x: mouseX,
            y: mouseY,
          }}
          animate={{
            scale: isPointer ? 0 : 1,
            opacity: isPointer ? 0 : 1,
          }}
          transition={{ duration: 0.15 }}
        />
      )}
    </>
  );
}
