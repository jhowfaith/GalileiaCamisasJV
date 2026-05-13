export default function AboutSection() {
  return (
    <section className="section" style={{ background: '#0d0d0d' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 60,
          alignItems: 'center',
        }}
          className="about-grid"
        >
          <div>
            <p style={{ color: '#a78bfa', fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>
              Sobre nós
            </p>
            <h2 style={{ color: '#fff', fontSize: 32, fontWeight: 800, lineHeight: 1.3, marginBottom: 20, letterSpacing: -0.5 }}>
              Na PlaynoDrop, somos especialistas em oferecer{' '}
              <span style={{ color: '#a78bfa' }}>camisas de time</span> com a melhor qualidade.
            </h2>
            <p style={{ color: '#aaa', fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>
              Trabalhamos diariamente para garantir produtos confiáveis, prontos para envio
              imediato e selecionados com rigor para entregar autenticidade, conforto e durabilidade.
            </p>
            <p style={{ color: '#aaa', fontSize: 15, lineHeight: 1.8, marginBottom: 32 }}>
              Nossa missão é clara: proporcionar a você camisas de alto padrão, com preço justo
              e uma experiência de compra rápida, segura e impecável. Contamos com atendimento
              humanizado e entrega ágil para todo o Brasil.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <a href="#todos" className="btn-primary">VER PRODUTOS</a>
              <a href="https://wa.me/5500000000000" className="btn-outline" style={{ borderColor: '#6909FF', color: '#a78bfa' }}>
                FALE CONOSCO
              </a>
            </div>
          </div>

          <div style={{ borderRadius: 12, overflow: 'hidden', position: 'relative' }}>
            <img
              src="/images/Screenshot_1-a3da380d.png"
              alt="PlaynoDrop - Canal VIP"
              style={{ width: '100%', borderRadius: 12, display: 'block' }}
              loading="lazy"
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
              padding: '24px 20px 16px',
              borderRadius: '0 0 12px 12px',
            }}>
              <p style={{ color: '#fff', fontSize: 14, fontWeight: 600, textAlign: 'center' }}>
                📱 Canal VIP com as melhores ofertas
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}
