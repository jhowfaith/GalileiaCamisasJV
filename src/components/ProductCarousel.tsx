import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import type { Product } from '../data/products';
import ProductCard from './ProductCard';
import ProductLightbox from './ProductLightbox';

interface Props {
  title: string;
  products: Product[];
  id?: string;
}

const VISIBLE = 4;
const SCROLL_BY = 2;

export default function ProductCarousel({ title, products, id }: Props) {
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState<Product | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-10%' });

  const maxPage = Math.max(0, Math.ceil(products.length / SCROLL_BY) - Math.floor(VISIBLE / SCROLL_BY));
  const offset = page * SCROLL_BY;
  const translatePct = (offset / VISIBLE) * 100;

  return (
    <section
      ref={sectionRef}
      id={id}
      style={{
        background: 'linear-gradient(180deg, #f8fbff 0%, #eef4ff 100%)',
        padding: '64px 0 56px',
        position: 'relative',
      }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: 28,
            paddingBottom: 16,
            position: 'relative',
          }}
        >
          <div>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.5 }}
              style={{
                display: 'inline-block',
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 2.5,
                color: '#2563EB',
                textTransform: 'uppercase',
                marginBottom: 10,
              }}
            >
              ✦ Coleção
            </motion.span>
            <h2 style={{
              fontSize: 'clamp(24px, 3.5vw, 36px)',
              fontWeight: 800,
              color: '#0a1530',
              letterSpacing: -0.5,
              lineHeight: 1.1,
              fontFamily: 'Poppins, sans-serif',
            }}>
              {title}
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{
              fontSize: 12,
              color: '#6b7a99',
              fontWeight: 600,
              padding: '4px 10px',
              borderRadius: 999,
              background: '#fff',
              border: '1px solid #d8e2f5',
            }}>
              {page + 1} / {maxPage + 1}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: 2,
            background: 'linear-gradient(90deg, #2563EB, #38BDF8, transparent)',
            transformOrigin: '0 50%',
            marginBottom: 32,
          }}
        />

        <div style={{ position: 'relative' }}>
          <div className="prod-carousel-wrap">
            <motion.div
              className="prod-carousel-track"
              animate={{ x: `calc(-${translatePct}% - ${offset * 7}px)` }}
              transition={{ type: 'spring', stiffness: 90, damping: 22, mass: 0.8 }}
              drag="x"
              dragConstraints={{ left: -2000, right: 0 }}
              dragElastic={0.1}
              style={{ cursor: 'grab' }}
              whileTap={{ cursor: 'grabbing' }}
            >
              {products.map((product, i) => (
                <motion.div
                  key={product.id}
                  className="prod-carousel-item"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{
                    delay: Math.min(i, VISIBLE - 1) * 0.06,
                    duration: 0.4,
                  }}
                >
                  <ProductCard product={product} onOpen={setOpen} />
                </motion.div>
              ))}
            </motion.div>
          </div>

          <AnimatePresence>
            {page > 0 && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                whileHover={{ scale: 1.15, x: -4 }}
                whileTap={{ scale: 0.92 }}
                aria-label="Anterior"
                className="carousel-arrow carousel-arrow-left"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </motion.button>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {page < maxPage && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
                whileHover={{ scale: 1.15, x: 4 }}
                whileTap={{ scale: 0.92 }}
                aria-label="Próximo"
                className="carousel-arrow carousel-arrow-right"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="carousel-dots">
          {Array.from({ length: maxPage + 1 }).map((_, i) => (
            <motion.button
              key={i}
              className={`carousel-dot-btn${i === page ? ' active' : ''}`}
              onClick={() => setPage(i)}
              aria-label={`Página ${i + 1}`}
              whileHover={{ scale: 1.4 }}
              whileTap={{ scale: 0.9 }}
              animate={i === page ? { width: 28 } : { width: 7 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            />
          ))}
        </div>
      </div>

      <ProductLightbox product={open} onClose={() => setOpen(null)} />
    </section>
  );
}
