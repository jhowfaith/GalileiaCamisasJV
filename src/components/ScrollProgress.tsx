import { motion, useScroll, useSpring } from 'motion/react';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: '0% 50%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: 'linear-gradient(90deg, #2563EB, #38BDF8, #A5F3FC)',
        backgroundSize: '200% 100%',
        zIndex: 9999,
        boxShadow: '0 0 14px rgba(56, 189, 248, 0.7)',
      }}
    />
  );
}
