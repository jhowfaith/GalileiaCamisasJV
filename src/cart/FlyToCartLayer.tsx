import { motion, AnimatePresence } from 'motion/react';
import { useCart } from './CartContext';

export default function FlyToCartLayer() {
  const { flying, cartButtonRef, registerFlyDone } = useCart();
  const target = cartButtonRef.current?.getBoundingClientRect();

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 8500 }}>
      <AnimatePresence>
        {flying.map((f) => {
          const tx = target ? target.left + target.width / 2 - (f.from.left + f.from.width / 2) : 0;
          const ty = target ? target.top + target.height / 2 - (f.from.top + f.from.height / 2) : -200;
          return (
            <motion.img
              key={f.id}
              src={f.src}
              initial={{
                position: 'fixed',
                top: f.from.top,
                left: f.from.left,
                width: f.from.width,
                height: f.from.height,
                borderRadius: 12,
                objectFit: 'cover',
                x: 0,
                y: 0,
                scale: 1,
                opacity: 1,
              }}
              animate={{
                x: tx,
                y: ty,
                scale: 0.08,
                opacity: 0,
                rotate: 18,
              }}
              transition={{ duration: 0.85, ease: [0.5, 0, 0.75, 0] }}
              onAnimationComplete={() => registerFlyDone(f.id)}
              style={{ boxShadow: '0 10px 30px rgba(37, 99, 235, 0.5)' }}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}
