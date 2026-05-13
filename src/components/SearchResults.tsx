import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import type { Product } from '../data/products';
import ProductCard from './ProductCard';
import ProductLightbox from './ProductLightbox';

interface Props {
  results: Product[];
  query: string;
}

export default function SearchResults({ results, query }: Props) {
  const [open, setOpen] = useState<Product | null>(null);

  return (
    <section
      style={{
        background: 'linear-gradient(180deg, #f8fbff 0%, #eef4ff 100%)',
        padding: '24px 0 56px',
      }}
    >
      <div className="container">
        {results.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: '#fff',
              borderRadius: 24,
              border: '1px dashed #d8e2f5',
            }}
          >
            <div style={{ fontSize: 56, marginBottom: 12 }}>🔍</div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0a1530', marginBottom: 6 }}>
              Não achamos nada por "{query}"
            </h3>
            <p style={{ color: '#6b7a99', fontSize: 13 }}>
              Tente buscar pelo nome do time, categoria (cropped, bermuda...) ou modelo.
            </p>
          </motion.div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: 20,
            }}
          >
            <AnimatePresence>
              {results.map((p, i) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 24, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    delay: Math.min(i, 12) * 0.03,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <ProductCard product={p} onOpen={setOpen} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
      <ProductLightbox product={open} onClose={() => setOpen(null)} />
    </section>
  );
}
