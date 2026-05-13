import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { useCart } from '../cart/CartContext';

const navItems = [
  { label: 'INÍCIO', href: '#top' },
  { label: 'NACIONAL', href: '#nacional' },
  { label: 'FEMININAS', href: '#femininas' },
  { label: 'TAILANDESA', href: '#tailandesa' },
  { label: 'CROPPEDS', href: '#croppeds' },
  { label: 'BERMUDAS', href: '#bermudas' },
  { label: 'CAIXAS', href: '#caixas' },
  { label: 'TODOS', href: '#todos' },
];

function scrollTo(id: string) {
  if (id === '#top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const { scrollY } = useScroll();
  const { count, pulse, openDrawer, cartButtonRef } = useCart();
  const cartRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (cartRef.current) cartButtonRef.current = cartRef.current;
  }, [cartButtonRef]);

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 50));

  useEffect(() => {
    const onScroll = () => {
      const sections = navItems.map((n) => n.href);
      let current = 0;
      for (let i = 0; i < sections.length; i++) {
        const el = document.querySelector(sections[i]);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top <= 120) current = i;
        }
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      id="top"
      style={{
        background: scrolled ? 'rgba(5, 10, 30, 0.82)' : 'linear-gradient(180deg, #050A1E 0%, #0a1530 100%)',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: scrolled ? '0 10px 36px rgba(0,0,0,0.4), 0 1px 0 rgba(96,165,250,0.15)' : 'none',
        transition: 'background 0.35s, box-shadow 0.35s',
        borderBottom: scrolled ? '1px solid rgba(96,165,250,0.12)' : '1px solid transparent',
      }}
    >
      <div style={{ padding: scrolled ? '12px 0' : '16px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <motion.a
            href="#top"
            onClick={e => { e.preventDefault(); scrollTo('#top'); }}
            style={{ flexShrink: 0, textDecoration: 'none' }}
            whileHover={{ scale: 1.04 }}
          >
            <span style={{
              color: '#fff',
              fontWeight: 800,
              fontSize: 22,
              letterSpacing: -0.5,
              fontFamily: 'Poppins, sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                style={{
                  display: 'inline-block',
                  width: 24,
                  height: 24,
                  borderRadius: 7,
                  background: 'linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)',
                  boxShadow: '0 0 22px rgba(56,189,248,0.65)',
                }}
              />
              galileia<span style={{
                background: 'linear-gradient(90deg, #60A5FA, #38BDF8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>shop</span>
            </span>
          </motion.a>

          {/* Nav pill (desktop) */}
          <nav
            className="desktop-nav"
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
            }}
            onMouseLeave={() => setHover(null)}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                padding: '4px 8px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(96,165,250,0.14)',
                borderRadius: 999,
                backdropFilter: 'blur(10px)',
              }}
            >
              {navItems.map((item, idx) => {
                const isActive = active === idx;
                const isHover = hover === idx;
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={e => { e.preventDefault(); scrollTo(item.href); setMenuOpen(false); }}
                    onMouseEnter={() => setHover(idx)}
                    style={{
                      color: isActive ? '#fff' : 'rgba(255,255,255,0.72)',
                      fontSize: 11.5,
                      fontWeight: 700,
                      letterSpacing: 0.7,
                      padding: '10px 16px',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                      position: 'relative',
                      borderRadius: 999,
                      cursor: 'pointer',
                      transition: 'color 0.25s',
                    }}
                  >
                    {(isActive || isHover) && (
                      <motion.span
                        layoutId="nav-pill"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: isActive
                            ? 'linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)'
                            : 'rgba(96,165,250,0.15)',
                          borderRadius: 999,
                          zIndex: 0,
                          boxShadow: isActive ? '0 6px 20px rgba(37,99,235,0.5)' : 'none',
                        }}
                      />
                    )}
                    <span style={{ position: 'relative', zIndex: 1 }}>{item.label}</span>
                  </motion.a>
                );
              })}
            </div>
          </nav>

          {/* Cart button */}
          <motion.button
            ref={cartRef}
            onClick={openDrawer}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Abrir carrinho"
            style={{
              background: 'linear-gradient(135deg, rgba(37,99,235,0.18), rgba(56,189,248,0.1))',
              border: '1px solid rgba(96,165,250,0.3)',
              color: '#fff',
              width: 46,
              height: 46,
              borderRadius: 14,
              cursor: 'pointer',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)',
              flexShrink: 0,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
            </svg>
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={pulse}
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.4, 1] }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: 'absolute',
                    top: -4,
                    right: -4,
                    background: 'linear-gradient(135deg, #38BDF8, #2563EB)',
                    color: '#fff',
                    fontSize: 10,
                    fontWeight: 800,
                    minWidth: 20,
                    height: 20,
                    padding: '0 6px',
                    borderRadius: 999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(37,99,235,0.6)',
                    border: '2px solid #050A1E',
                  }}
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 4 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
              }
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ background: '#0a1530', padding: '8px 20px', overflow: 'hidden' }}
          >
            {navItems.map((item, idx) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={e => { e.preventDefault(); scrollTo(item.href); setMenuOpen(false); }}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: idx * 0.04 }}
                style={{
                  display: 'block',
                  color: active === idx ? '#60A5FA' : '#fff',
                  fontSize: 13,
                  fontWeight: 600,
                  padding: '13px 0',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(96,165,250,0.1)',
                  letterSpacing: 0.5,
                }}
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
