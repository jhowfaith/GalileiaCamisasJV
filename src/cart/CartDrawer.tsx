import { motion, AnimatePresence } from 'motion/react';
import { useCart } from './CartContext';

export default function CartDrawer() {
  const { items, total, isDrawerOpen, closeDrawer, setQty, remove, openCheckout } = useCart();

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(5, 10, 30, 0.7)',
              backdropFilter: 'blur(8px)',
              zIndex: 9100,
            }}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 32 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: 'min(440px, 92vw)',
              background: 'linear-gradient(180deg, #0a1530 0%, #050a1e 100%)',
              boxShadow: '-20px 0 60px rgba(0,0,0,0.5)',
              zIndex: 9200,
              display: 'flex',
              flexDirection: 'column',
              color: '#fff',
            }}
          >
            <header style={{
              padding: '20px 24px',
              borderBottom: '1px solid rgba(96,165,250,0.18)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'linear-gradient(90deg, rgba(37,99,235,0.18), transparent)',
            }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 800, margin: 0, letterSpacing: -0.3 }}>Seu carrinho</h3>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', margin: '2px 0 0' }}>
                  {items.length === 0 ? 'Vazio' : `${items.length} ${items.length === 1 ? 'item' : 'itens'}`}
                </p>
              </div>
              <button
                onClick={closeDrawer}
                aria-label="Fechar"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(96,165,250,0.2)',
                  width: 36, height: 36,
                  borderRadius: '50%',
                  color: '#fff',
                  fontSize: 18,
                  cursor: 'pointer',
                }}
              >×</button>
            </header>

            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
              {items.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: 'rgba(255,255,255,0.4)' }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>🛒</div>
                  <p style={{ fontSize: 14 }}>Carrinho vazio. <br />Adicione produtos da loja.</p>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {items.map((it) => (
                    <motion.div
                      key={it.cartKey}
                      layout
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30, scale: 0.9 }}
                      transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                      style={{
                        display: 'flex',
                        gap: 12,
                        padding: 12,
                        marginBottom: 10,
                        background: 'rgba(96,165,250,0.06)',
                        border: '1px solid rgba(96,165,250,0.12)',
                        borderRadius: 14,
                      }}
                    >
                      <img src={it.img} alt={it.title} style={{ width: 64, height: 64, borderRadius: 10, objectFit: 'cover' }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12.5, fontWeight: 600, lineHeight: 1.3, color: '#fff', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{it.title}</div>
                        <div style={{ display: 'flex', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                          {it.size && (
                            <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 999, background: 'rgba(56,189,248,0.18)', color: '#A5F3FC', fontWeight: 700, letterSpacing: 0.3 }}>
                              {it.size}
                            </span>
                          )}
                          {it.variant === 'bundle' && (
                            <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 999, background: 'rgba(34,197,94,0.18)', color: '#86efac', fontWeight: 700 }}>
                              + camisa
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#60a5fa' }}>R$ {it.effectivePrice}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                          <motion.button
                            whileTap={{ scale: 0.85 }}
                            onClick={() => setQty(it.cartKey, it.qty - 1)}
                            style={{
                              width: 26, height: 26, borderRadius: 6,
                              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(96,165,250,0.2)',
                              color: '#fff', cursor: 'pointer', fontSize: 14,
                            }}
                          >−</motion.button>
                          <span style={{ fontSize: 13, fontWeight: 600, minWidth: 18, textAlign: 'center' }}>{it.qty}</span>
                          <motion.button
                            whileTap={{ scale: 0.85 }}
                            onClick={() => setQty(it.cartKey, it.qty + 1)}
                            style={{
                              width: 26, height: 26, borderRadius: 6,
                              background: 'rgba(37,99,235,0.4)', border: '1px solid rgba(96,165,250,0.4)',
                              color: '#fff', cursor: 'pointer', fontSize: 14,
                            }}
                          >+</motion.button>
                          <button
                            onClick={() => remove(it.cartKey)}
                            style={{
                              marginLeft: 'auto', background: 'none', border: 'none',
                              color: 'rgba(255,255,255,0.4)', fontSize: 12, cursor: 'pointer',
                            }}
                          >🗑</button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            <footer style={{
              padding: 20,
              borderTop: '1px solid rgba(96,165,250,0.18)',
              background: 'linear-gradient(180deg, rgba(37,99,235,0.08), rgba(37,99,235,0.18))',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>Subtotal</span>
                <span style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>
                  R$ {total.toFixed(2).replace('.', ',')}
                </span>
              </div>
              <motion.button
                disabled={items.length === 0}
                onClick={openCheckout}
                whileHover={items.length ? { scale: 1.02 } : {}}
                whileTap={items.length ? { scale: 0.97 } : {}}
                className="btn-shine"
                style={{
                  width: '100%',
                  padding: '15px',
                  borderRadius: 14,
                  border: 'none',
                  background: items.length
                    ? 'linear-gradient(135deg, #2563eb 0%, #38bdf8 100%)'
                    : 'rgba(255,255,255,0.1)',
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                  cursor: items.length ? 'pointer' : 'not-allowed',
                  boxShadow: items.length ? '0 16px 36px rgba(37,99,235,0.5)' : 'none',
                }}
              >
                Finalizar pedido →
              </motion.button>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
