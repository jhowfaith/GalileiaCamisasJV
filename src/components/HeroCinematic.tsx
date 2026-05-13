import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef } from 'react';

const headline = ['CAMISAS', 'DE', 'TIME'];
const headline2 = ['QUE', 'VOCÊ', 'AMA'];

function MagneticCTA({ children, href, onClick }: { children: React.ReactNode; href?: string; onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 18 });
  const y = useSpring(0, { stiffness: 200, damping: 18 });

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.35);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
  }
  function onLeave() { x.set(0); y.set(0); }

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x, y, display: 'inline-block' }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.a>
  );
}

function scrollTo(id: string) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function HeroCinematic() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        minHeight: '88vh',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #050A1E 0%, #0a1530 45%, #001B3D 100%)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Static gradient blobs — no scroll-driven parallax, GPU-composited only */}
      <div style={{
        position: 'absolute',
        width: 720,
        height: 720,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(37,99,235,0.5) 0%, rgba(37,99,235,0) 70%)',
        filter: 'blur(80px)',
        top: '-20%',
        left: '-10%',
        pointerEvents: 'none',
        willChange: 'auto',
      }} />
      <div style={{
        position: 'absolute',
        width: 580,
        height: 580,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(56,189,248,0.42) 0%, rgba(56,189,248,0) 70%)',
        filter: 'blur(80px)',
        bottom: '-15%',
        right: '-5%',
        pointerEvents: 'none',
        willChange: 'auto',
      }} />

      {/* Grid pattern overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(96,165,250,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(96,165,250,0.05) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <motion.div
        className="container"
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: '120px 24px',
          opacity,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'inline-block',
            padding: '6px 16px',
            borderRadius: 999,
            border: '1px solid rgba(96,165,250,0.4)',
            background: 'rgba(37,99,235,0.12)',
            backdropFilter: 'blur(10px)',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 2.5,
            color: '#A5F3FC',
            textTransform: 'uppercase',
            marginBottom: 28,
          }}
        >
          ✦ Coleção 2026 · Galileia Shop
        </motion.div>

        <h1 style={{
          fontSize: 'clamp(40px, 8vw, 96px)',
          fontWeight: 900,
          lineHeight: 1.02,
          color: '#fff',
          marginBottom: 8,
          letterSpacing: -2,
          fontFamily: 'Poppins, sans-serif',
        }}>
          <span style={{ display: 'flex', justifyContent: 'center', gap: '0.32em', flexWrap: 'wrap', overflow: 'hidden', paddingBottom: '0.1em' }}>
            {headline.map((word, i) => (
              <motion.span
                key={i}
                style={{ display: 'inline-block' }}
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.12, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.span>
            ))}
          </span>
          <span style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.32em',
            flexWrap: 'wrap',
            overflow: 'hidden',
            paddingBottom: '0.1em',
            background: 'linear-gradient(135deg, #60A5FA 0%, #38BDF8 50%, #A5F3FC 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {headline2.map((word, i) => (
              <motion.span
                key={i}
                style={{ display: 'inline-block' }}
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.12, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(15px, 1.6vw, 19px)',
            color: 'rgba(255,255,255,0.7)',
            maxWidth: 580,
            margin: '24px auto 40px',
            lineHeight: 1.6,
            fontWeight: 400,
          }}
        >
          Camisas Nacional Premium, Tailandesa 1.1, Croppeds e Caixas personalizadas.
          A melhor qualidade do mercado, entregue na sua porta.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <MagneticCTA href="#nacional" onClick={(e) => { e.preventDefault(); scrollTo('#nacional'); }}>
            <span className="btn-shine" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)',
              color: '#fff',
              padding: '16px 34px',
              borderRadius: 999,
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: 1,
              textTransform: 'uppercase',
              textDecoration: 'none',
              boxShadow: '0 14px 44px rgba(37,99,235,0.5), inset 0 1px 0 rgba(255,255,255,0.25)',
              cursor: 'pointer',
            }}>
              Ver Coleção
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </span>
          </MagneticCTA>

          <MagneticCTA href="#tailandesa" onClick={(e) => { e.preventDefault(); scrollTo('#tailandesa'); }}>
            <span style={{
              display: 'inline-block',
              border: '1.5px solid rgba(165,243,252,0.4)',
              color: '#fff',
              padding: '16px 34px',
              borderRadius: 999,
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: 1,
              textTransform: 'uppercase',
              textDecoration: 'none',
              backdropFilter: 'blur(10px)',
              background: 'rgba(255,255,255,0.05)',
              cursor: 'pointer',
            }}>
              Tailandesa 1.1
            </span>
          </MagneticCTA>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          style={{
            display: 'flex',
            gap: 48,
            justifyContent: 'center',
            marginTop: 64,
            flexWrap: 'wrap',
          }}
        >
          {[
            { v: '+10mil', l: 'Clientes felizes' },
            { v: '+500', l: 'Modelos' },
            { v: '4.9★', l: 'Avaliação média' },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.7 + i * 0.1, duration: 0.6 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{
                fontSize: 30,
                fontWeight: 800,
                background: 'linear-gradient(135deg, #fff, #60A5FA)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: 4,
                letterSpacing: -0.5,
              }}>{s.v}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: 1.5, textTransform: 'uppercase' }}>{s.l}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          color: 'rgba(165,243,252,0.6)',
          fontSize: 10,
          letterSpacing: 2,
          textTransform: 'uppercase',
        }}
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: 32, background: 'linear-gradient(180deg, rgba(165,243,252,0.6), transparent)' }}
        />
      </motion.div>
    </section>
  );
}
