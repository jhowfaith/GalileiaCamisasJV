import { motion } from 'motion/react';
import type { Product } from '../data/products';

interface Props {
  product: Product;
  onOpen?: (p: Product) => void;
}

export default function ProductCard({ product, onOpen }: Props) {
  function handleOpen() { onOpen?.(product); }
  const showBundle = !!product.priceBundle;

  return (
    <motion.div
      className="product-card"
      style={{ fontFamily: 'Poppins, sans-serif' }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
    >
      <div onClick={handleOpen} style={{ cursor: 'zoom-in', display: 'block' }}>
        <div className="product-thumb-wrap">
          {product.badge && (
            <span className="product-badge">{product.badge}</span>
          )}
          <img
            src={product.img}
            alt={product.title}
            className="product-img-primary"
            style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block', borderRadius: 12 }}
            loading="lazy"
            decoding="async"
          />
          {product.imgHover && (
            <img
              src={product.imgHover}
              alt={product.title}
              className="product-img-hover"
              style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block', borderRadius: 12 }}
              loading="lazy"
              decoding="async"
            />
          )}
          <div className="product-overlay">
            <span className="product-overlay-text">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
              </svg>
              Ver detalhes
            </span>
          </div>
        </div>
      </div>

      <div style={{ padding: '12px 4px 0' }}>
        <h3
          style={{ fontSize: 13, fontWeight: 600, color: '#1a2238', lineHeight: 1.4, marginBottom: 4, cursor: 'pointer' }}
          onClick={handleOpen}
        >
          {product.title}
        </h3>

        {product.category && (
          <p style={{
            fontSize: 11,
            color: '#2563EB',
            fontWeight: 600,
            marginBottom: 6,
            letterSpacing: 0.3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {product.category.split(',').pop()?.trim()}
          </p>
        )}

        {product.sizes.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 6 }}>
            {product.sizes.slice(0, 5).map((s) => (
              <span key={s} style={{
                fontSize: 10,
                fontWeight: 600,
                color: '#1a2238',
                background: '#eef4ff',
                border: '1px solid #d8e2f5',
                borderRadius: 5,
                padding: '2px 6px',
                letterSpacing: 0.2,
              }}>{s}</span>
            ))}
            {product.sizes.length > 5 && (
              <span style={{ fontSize: 10, color: '#6b7a99', padding: '2px 4px' }}>+{product.sizes.length - 5}</span>
            )}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: showBundle ? 2 : 6, flexWrap: 'wrap' }}>
          <span className="price-new">R$ {product.price}</span>
          {showBundle && (
            <span style={{ fontSize: 11, color: '#6b7a99', fontWeight: 500 }}>unitário</span>
          )}
        </div>
        {showBundle && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#22c55e' }}>R$ {product.priceBundle}</span>
            <span style={{ fontSize: 10, color: '#6b7a99', fontWeight: 500 }}>
              {product.category?.includes('Caixas') ? 'c/ camisa' : '2+ unid.'}
            </span>
          </div>
        )}

        <motion.button
          type="button"
          className="btn-cart btn-shine"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpen}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
          </svg>
          {product.sizes.length > 0 ? 'Escolher tamanho' : 'Adicionar'}
        </motion.button>
      </div>
    </motion.div>
  );
}
