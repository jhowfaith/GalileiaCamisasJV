import { motion } from 'motion/react';

const WA = 'https://wa.me/5511932104773';

const footerLinks = [
  { label: 'Início', href: '#top' },
  { label: 'Todos os Produtos', href: '#todos' },
  { label: 'Nacional Premium', href: '#nacional' },
  { label: 'Tailandesa 1.1', href: '#tailandesa' },
  { label: 'Croppeds', href: '#croppeds' },
  { label: 'Caixas', href: '#caixas' },
  { label: 'Bermudas', href: '#bermudas' },
];

function scrollTo(id: string) {
  if (id === '#top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(180deg, #050A1E 0%, #000814 100%)',
      borderTop: '1px solid rgba(56,189,248,0.18)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <motion.div
        animate={{ x: [0, 60, -30, 0], y: [0, 40, -20, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          width: 560,
          height: 560,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.22) 0%, transparent 70%)',
          filter: 'blur(60px)',
          top: '-30%',
          right: '-10%',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ x: [0, -50, 40, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          width: 420,
          height: 420,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56,189,248,0.18) 0%, transparent 70%)',
          filter: 'blur(60px)',
          bottom: '-20%',
          left: '-5%',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ padding: '64px 24px 28px', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            textAlign: 'center',
            marginBottom: 56,
            paddingBottom: 56,
            borderBottom: '1px solid rgba(96,165,250,0.15)',
          }}
        >
          <h2 style={{
            fontSize: 'clamp(28px, 5vw, 56px)',
            fontWeight: 900,
            lineHeight: 1.05,
            color: '#fff',
            marginBottom: 16,
            letterSpacing: -1,
          }}>
            Pronto pra vestir <br />
            <span style={{
              background: 'linear-gradient(135deg, #60A5FA, #38BDF8, #A5F3FC)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>o melhor manto</span>?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}>
            Fale conosco no WhatsApp e descubra o modelo perfeito pra você.
          </p>
          <motion.a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="btn-shine"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: 'linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)',
              color: '#fff',
              padding: '16px 34px',
              borderRadius: 999,
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: 1,
              textTransform: 'uppercase',
              textDecoration: 'none',
              boxShadow: '0 20px 50px rgba(37,99,235,0.5), inset 0 1px 0 rgba(255,255,255,0.25)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.6 6.32A7.85 7.85 0 0012.05 4a7.94 7.94 0 00-6.88 11.9L4 20l4.2-1.1a7.9 7.9 0 003.8.97h.01a7.94 7.94 0 005.59-13.55zM12.06 18.5a6.6 6.6 0 01-3.36-.92l-.24-.14-2.49.65.66-2.43-.16-.25a6.6 6.6 0 1112.16-3.55 6.6 6.6 0 01-6.57 6.64zm3.62-4.94c-.2-.1-1.17-.58-1.36-.64-.18-.07-.31-.1-.45.1-.13.2-.51.65-.62.78-.12.13-.23.15-.43.05-.2-.1-.84-.31-1.6-.99-.6-.53-1-1.18-1.12-1.38-.11-.2-.01-.31.09-.4.09-.1.2-.24.3-.36.1-.12.13-.2.2-.34.06-.13.03-.25-.02-.35-.05-.1-.45-1.08-.62-1.48-.16-.39-.33-.34-.45-.34l-.38-.01a.74.74 0 00-.54.25c-.18.2-.71.7-.71 1.7s.73 1.97.83 2.1c.1.14 1.43 2.18 3.47 3.06.48.21.86.33 1.16.43.49.16.93.13 1.28.08.4-.06 1.18-.49 1.34-.95.17-.47.17-.87.12-.96-.05-.1-.18-.15-.39-.25z"/></svg>
            WhatsApp (11) 93210-4773
          </motion.a>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-5%' }}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: 48, marginBottom: 40 }}
          className="footer-grid"
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
            <a href="#top" onClick={e => { e.preventDefault(); scrollTo('#top'); }} style={{ textDecoration: 'none' }}>
              <span style={{ color: '#fff', fontWeight: 800, fontSize: 24, letterSpacing: -0.5, fontFamily: 'Poppins, sans-serif', display: 'block', marginBottom: 16 }}>
                galileia<span style={{
                  background: 'linear-gradient(90deg, #60A5FA, #38BDF8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>shop</span>
              </span>
            </a>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, lineHeight: 1.7 }}>
              Especialistas em camisas de time com a melhor qualidade e custo-benefício do mercado.
            </p>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
            <h4 style={{ color: '#A5F3FC', fontWeight: 700, fontSize: 11, marginBottom: 16, letterSpacing: 2.5 }}>NAVEGAÇÃO</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {footerLinks.map((l) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  onClick={e => { e.preventDefault(); scrollTo(l.href); }}
                  whileHover={{ x: 4, color: '#60A5FA' }}
                  style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, textDecoration: 'none', display: 'inline-block' }}
                >
                  {l.label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
            <h4 style={{ color: '#A5F3FC', fontWeight: 700, fontSize: 11, marginBottom: 16, letterSpacing: 2.5 }}>ATENDIMENTO</h4>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, lineHeight: 1.8 }}>
              Seg a Sex · 9h–18h<br />
              <a href={WA} target="_blank" rel="noopener noreferrer" style={{ color: '#60A5FA', textDecoration: 'none' }}>
                Via WhatsApp
              </a>
            </p>
            <div style={{ marginTop: 20 }}>
              <h4 style={{ color: '#A5F3FC', fontWeight: 700, fontSize: 11, marginBottom: 10, letterSpacing: 2.5 }}>PAGAMENTO</h4>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>💳 Cartão · 📄 Boleto · 📱 PIX</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Security badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 12,
            justifyContent: 'center',
            padding: '24px 0',
            borderTop: '1px solid rgba(96,165,250,0.12)',
          }}
        >
          {[
            { icon: '🔒', label: 'SSL Seguro', sub: '256-bit' },
            { icon: '🛡️', label: 'Site Seguro', sub: 'Verificado' },
            { icon: '✅', label: 'Compra Segura', sub: 'Garantida' },
            { icon: '💳', label: 'Pagamento', sub: 'Criptografado' },
            { icon: '🔄', label: 'Reembolso', sub: '7 dias' },
            { icon: '📱', label: 'Suporte', sub: 'WhatsApp' },
          ].map((b, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -3, scale: 1.04 }}
              transition={{ type: 'spring', stiffness: 320, damping: 22 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 14px',
                background: 'rgba(96,165,250,0.06)',
                border: '1px solid rgba(96,165,250,0.18)',
                borderRadius: 999,
                backdropFilter: 'blur(10px)',
              }}
            >
              <span style={{ fontSize: 18 }}>{b.icon}</span>
              <div style={{ lineHeight: 1.1 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: 0.3 }}>{b.label}</div>
                <div style={{ fontSize: 9, color: 'rgba(165,243,252,0.6)', letterSpacing: 0.5, textTransform: 'uppercase' }}>{b.sub}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div style={{ borderTop: '1px solid rgba(96,165,250,0.12)', paddingTop: 20, textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>
            © 2026 <span style={{ color: '#60A5FA' }}>Galileia Shop</span> — Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}
