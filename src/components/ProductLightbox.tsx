import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import type { Product } from '../data/products';
import { useCart } from '../cart/CartContext';

interface Props {
  product: Product | null;
  onClose: () => void;
}

export default function ProductLightbox({ product, onClose }: Props) {
  const { add } = useCart();
  const imgRef = useRef<HTMLImageElement>(null);
  const [size, setSize] = useState<string>('');
  const [variant, setVariant] = useState<'avulso' | 'bundle'>('avulso');
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (!product) return;
    setSize(product.sizes[0] || '');
    setVariant('avulso');
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [product, onClose]);

  function handleAdd() {
    if (!product) return;
    if (product.sizes.length > 0 && !size) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    const rect = imgRef.current?.getBoundingClientRect();
    add(product, {
      size: product.sizes.length > 0 ? size : undefined,
      variant: product.priceBundle ? variant : undefined,
      from: rect || undefined,
      srcImg: product.img,
    });
    onClose();
  }

  const showBundle = !!product?.priceBundle;
  const displayPrice = showBundle && variant === 'bundle' ? product.priceBundle : product?.price;

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(5, 10, 30, 0.86)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            zIndex: 9000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 16 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff',
              borderRadius: 24,
              maxWidth: 980,
              width: '100%',
              maxHeight: '92vh',
              overflow: 'auto',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 0,
              boxShadow: '0 30px 100px rgba(0,0,0,0.5), 0 0 60px rgba(37,99,235,0.3)',
            }}
            className="lightbox-grid"
          >
            <div style={{ position: 'relative', background: '#eef4ff', overflow: 'hidden' }}>
              <motion.img
                ref={imgRef}
                src={product.img}
                alt={product.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: 300 }}
              />
              {product.badge && (
                <span style={{
                  position: 'absolute',
                  top: 18, left: 18,
                  background: 'linear-gradient(135deg, #2563EB, #38BDF8)',
                  color: '#fff',
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '5px 14px',
                  borderRadius: 999,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  boxShadow: '0 6px 18px rgba(37,99,235,0.5)',
                }}>{product.badge}</span>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ padding: 36, display: 'flex', flexDirection: 'column', gap: 16 }}
            >
              {product.category && (
                <span style={{ color: '#2563EB', fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' }}>
                  {product.category}
                </span>
              )}
              <h2
                style={{ fontSize: 26, fontWeight: 800, color: '#1a2238', lineHeight: 1.15, margin: 0 }}
              >
                {product.title}
              </h2>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
                <span style={{
                  background: 'linear-gradient(135deg, #2563EB, #38BDF8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 800,
                  fontSize: 34,
                  letterSpacing: -0.5,
                }}>
                  R$ {displayPrice}
                </span>
                {showBundle && (
                  <span style={{ fontSize: 12, color: '#6b7a99', fontWeight: 500 }}>
                    {variant === 'bundle'
                      ? (product.category?.includes('Caixas') ? '· com camisa' : '· 2 ou mais unidades')
                      : '· unitário'}
                  </span>
                )}
              </div>

              {/* Bundle selector for caixas */}
              {showBundle && (
                <div>
                  <p style={{ fontSize: 11, color: '#6b7a99', marginBottom: 8, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>
                    Modalidade
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <motion.button
                      onClick={() => setVariant('avulso')}
                      whileTap={{ scale: 0.96 }}
                      style={{
                        padding: '12px',
                        borderRadius: 12,
                        background: variant === 'avulso' ? 'linear-gradient(135deg, rgba(37,99,235,0.12), rgba(56,189,248,0.1))' : '#f5f8ff',
                        border: variant === 'avulso' ? '1.5px solid #2563EB' : '1.5px solid #e0e7f5',
                        color: '#1a2238',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      <div style={{ fontSize: 11, fontWeight: 600, color: '#6b7a99', marginBottom: 2 }}>Unitário</div>
                      <div style={{ fontSize: 17, fontWeight: 800, color: '#2563EB' }}>R$ {product.price}</div>
                    </motion.button>
                    <motion.button
                      onClick={() => setVariant('bundle')}
                      whileTap={{ scale: 0.96 }}
                      style={{
                        padding: '12px',
                        borderRadius: 12,
                        background: variant === 'bundle' ? 'linear-gradient(135deg, rgba(34,197,94,0.12), rgba(34,197,94,0.08))' : '#f5f8ff',
                        border: variant === 'bundle' ? '1.5px solid #22c55e' : '1.5px solid #e0e7f5',
                        color: '#1a2238',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      <div style={{ fontSize: 11, fontWeight: 600, color: '#6b7a99', marginBottom: 2 }}>
                        {product.category?.includes('Caixas') ? 'Com camisa' : '2 ou mais'}
                      </div>
                      <div style={{ fontSize: 17, fontWeight: 800, color: '#22c55e' }}>R$ {product.priceBundle}</div>
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes.length > 0 && (
                <motion.div
                  animate={shake ? { x: [-6, 6, -4, 4, -2, 2, 0] } : {}}
                  transition={{ duration: 0.45 }}
                >
                  <p style={{ fontSize: 11, color: '#6b7a99', marginBottom: 8, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>
                    Tamanho {shake && <span style={{ color: '#ef4444' }}>· selecione</span>}
                  </p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {product.sizes.map((s) => (
                      <motion.button
                        key={s}
                        onClick={() => setSize(s)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.92 }}
                        style={{
                          minWidth: 46,
                          padding: '10px 14px',
                          borderRadius: 10,
                          background: size === s ? 'linear-gradient(135deg, #2563EB, #38BDF8)' : '#fff',
                          color: size === s ? '#fff' : '#1a2238',
                          border: size === s ? '1.5px solid transparent' : '1.5px solid #e0e7f5',
                          fontWeight: 700,
                          fontSize: 13,
                          cursor: 'pointer',
                          boxShadow: size === s ? '0 8px 20px rgba(37,99,235,0.35)' : 'none',
                        }}
                      >
                        {s}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              <p style={{ color: '#5a6a8a', fontSize: 13, lineHeight: 1.6 }}>
                {product.description}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '12px 0', borderTop: '1px solid #e5edf9', borderBottom: '1px solid #e5edf9' }}>
                {[
                  '✓ Tecido premium dryfit',
                  '✓ Costura reforçada',
                  '✓ Entrega em todo Brasil',
                  '✓ Compra 100% segura',
                ].map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.06 }}
                    style={{ fontSize: 12.5, color: '#3d4a66', fontWeight: 500 }}
                  >
                    {f}
                  </motion.div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                <motion.button
                  onClick={handleAdd}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-shine"
                  style={{
                    flex: 1,
                    background: 'linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)',
                    color: '#fff',
                    padding: '15px 22px',
                    borderRadius: 14,
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: 0.8,
                    textTransform: 'uppercase',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 14px 32px rgba(37,99,235,0.45)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
                  </svg>
                  Adicionar ao carrinho
                </motion.button>
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: '#eef4ff',
                    color: '#2563EB',
                    padding: '15px 18px',
                    borderRadius: 14,
                    fontWeight: 600,
                    fontSize: 13,
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >Fechar</motion.button>
              </div>
            </motion.div>

            <button
              onClick={onClose}
              aria-label="Fechar"
              style={{
                position: 'absolute',
                top: 14, right: 14,
                background: 'rgba(5,10,30,0.7)',
                color: '#fff',
                border: 'none',
                width: 38, height: 38,
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                zIndex: 2,
                backdropFilter: 'blur(10px)',
              }}
            >×</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
