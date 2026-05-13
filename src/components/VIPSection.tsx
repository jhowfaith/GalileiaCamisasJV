import { useState } from 'react';

export default function VIPSection() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSent(true);
  };

  return (
    <section id="vip" style={{
      background: 'linear-gradient(135deg, #3d0099 0%, #6909FF 50%, #9333ea 100%)',
      padding: '80px 0',
      textAlign: 'center',
    }}>
      <div className="container">
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>👑</div>
          <h2 style={{ color: '#fff', fontSize: 32, fontWeight: 800, marginBottom: 12, letterSpacing: -0.5 }}>
            Assine nosso canal VIP
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 16, marginBottom: 32, lineHeight: 1.6 }}>
            Receba as melhores ofertas <strong style={{ color: '#fff' }}>DE GRAÇA!</strong>{' '}
            Seja o primeiro a saber dos lançamentos e descontos exclusivos.
          </p>

          {sent ? (
            <div style={{
              background: 'rgba(255,255,255,0.15)',
              border: '2px solid rgba(255,255,255,0.4)',
              borderRadius: 12,
              padding: '24px 32px',
              color: '#fff',
              fontSize: 16,
              fontWeight: 600,
            }}>
              ✅ Cadastrado com sucesso! Fique de olho no seu email.
            </div>
          ) : (
            <form className="vip-form" onSubmit={handleSubmit} style={{ display: 'flex', maxWidth: 480, margin: '0 auto' }}>
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  flex: 1,
                  border: '2px solid rgba(255,255,255,0.5)',
                  background: 'rgba(255,255,255,0.1)',
                  color: '#fff',
                  borderRadius: '4px 0 0 4px',
                  padding: '14px 16px',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 14,
                  outline: 'none',
                }}
              />
              <button type="submit" style={{
                background: '#fff',
                color: '#6909FF',
                border: 'none',
                padding: '14px 24px',
                fontWeight: 800,
                fontSize: 13,
                letterSpacing: 1,
                textTransform: 'uppercase',
                cursor: 'pointer',
                borderRadius: '0 4px 4px 0',
                transition: 'all 0.2s',
                fontFamily: 'Poppins, sans-serif',
              }}>
                QUERO ENTRAR
              </button>
            </form>
          )}

          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: 16 }}>
            Sem spam. Cancele quando quiser.
          </p>
        </div>
      </div>
    </section>
  );
}
