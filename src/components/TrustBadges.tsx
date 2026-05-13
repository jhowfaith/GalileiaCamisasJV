import { motion } from 'motion/react';
import type { Variants } from 'motion/react';

const badges = [
  { icon: '🚚', title: 'Frete Rápido', desc: 'Envio expresso com código de rastreio em todo Brasil.' },
  { icon: '💬', title: 'Suporte Profissional', desc: 'Equipe disponível pelo WhatsApp para tirar dúvidas.' },
  { icon: '🛡️', title: 'Satisfação ou Reembolso', desc: 'Devolução em até 7 dias se não ficar 100% satisfeito.' },
  { icon: '🔒', title: 'Compra Segura', desc: 'Ambiente protegido com criptografia SSL.' },
];

const marquee = [
  'NACIONAL PREMIUM',
  'TAILANDESA 1.1',
  'CROPPEDS BRASIL',
  'BERMUDAS MAURICINHO',
  'CAIXAS PERSONALIZADAS',
  'GALILEIA SHOP',
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function TrustBadges() {
  return (
    <section style={{
      background: 'linear-gradient(180deg, #eef4ff 0%, #dde9ff 100%)',
      padding: '64px 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 900,
        height: 600,
        background: 'radial-gradient(ellipse, rgba(37,99,235,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative' }}>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-15%' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 24,
          }}
          className="trust-grid"
        >
          {badges.map((b) => (
            <motion.div
              key={b.title}
              variants={item}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              style={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 14,
                padding: '28px 20px',
                background: '#fff',
                borderRadius: 18,
                boxShadow: '0 6px 28px rgba(37,99,235,0.08), 0 1px 3px rgba(0,0,0,0.04)',
                border: '1px solid rgba(96,165,250,0.15)',
              }}
            >
              <motion.div
                whileHover={{ scale: 1.18, rotate: -8 }}
                transition={{ type: 'spring', stiffness: 400, damping: 14 }}
                style={{
                  fontSize: 36,
                  width: 68,
                  height: 68,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, rgba(37,99,235,0.12), rgba(56,189,248,0.15))',
                  borderRadius: 18,
                  border: '1px solid rgba(96,165,250,0.15)',
                }}
              >
                {b.icon}
              </motion.div>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0a1530', marginBottom: 6 }}>{b.title}</h3>
                <p style={{ fontSize: 12.5, color: '#5a6a8a', lineHeight: 1.55 }}>{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Marquee */}
      <div style={{
        marginTop: 64,
        overflow: 'hidden',
        borderTop: '1px solid rgba(37,99,235,0.12)',
        borderBottom: '1px solid rgba(37,99,235,0.12)',
        padding: '22px 0',
        background: 'rgba(37,99,235,0.04)',
      }}>
        <motion.div
          style={{ display: 'flex', gap: 60, whiteSpace: 'nowrap' }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        >
          {[...marquee, ...marquee, ...marquee].map((t, i) => (
            <span
              key={i}
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: 'transparent',
                WebkitTextStroke: '1.5px #2563EB',
                letterSpacing: 1.5,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 60,
              }}
            >
              {t}
              <span style={{ color: '#38BDF8', WebkitTextStroke: 0 }}>✦</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
