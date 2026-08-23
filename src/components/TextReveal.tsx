import { motion } from 'framer-motion';
import { useInView } from '@/hooks/use-in-view';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export function TextReveal({
  text,
  className = '',
  delay = 0,
  as: Component = 'span',
}: TextRevealProps) {
  const { ref, isInView } = useInView();

  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotateZ: 0,
      transition: {
        type: 'spring',
        damping: 18,
        stiffness: 140,
      },
    },
    hidden: {
      opacity: 0,
      y: 28,
      rotateZ: 2,
      transition: {
        type: 'spring',
        damping: 18,
        stiffness: 140,
      },
    },
  };

  return (
    <Component ref={ref as any} className={`inline-block ${className}`}>
      <motion.span
        variants={container}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="inline-flex flex-wrap gap-x-[0.26em] gap-y-[0.05em]"
      >
        {words.map((word, index) => (
          <span key={index} className="inline-block overflow-hidden py-0.5">
            <motion.span variants={child} className="inline-block">
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Component>
  );
}
