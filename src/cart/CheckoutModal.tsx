import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { useCart } from './CartContext';

const WA_NUMBER = '5511932104773';

export default function CheckoutModal() {
  const { isCheckoutOpen, closeCheckout, items, total, clear } = useCart();
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [nome, setNome] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [pagamento, setPagamento] = useState<'pix' | 'cartao' | 'boleto'>('pix');

  function close() {
    closeCheckout();
    setTimeout(() => setStep(0), 300);
  }

  function enviarWA() {
    const list = items
      .map((it, i) => {
        const tamanho = it.size ? ` · Tam: ${it.size}` : '';
        const modal = it.variant === 'bundle' ? ' · com camisa' : '';
        return `${i + 1}. *${it.title}*${tamanho}${modal}%0A   Qtd: ${it.qty} × R$ ${it.effectivePrice}%0A   ${it.link}`;
      })
      .join('%0A%0A');
    const msg =
      `*🛒 Novo Pedido - Galileia Shop*%0A%0A` +
      `*Cliente:* ${encodeURIComponent(nome)}%0A` +
      `*CEP:* ${encodeURIComponent(cep)}%0A` +
      `*Endereço:* ${encodeURIComponent(endereco)}%0A` +
      `*Pagamento:* ${pagamento.toUpperCase()}%0A%0A` +
      `*Itens do pedido:*%0A${list}%0A%0A` +
      `*💰 TOTAL: R$ ${total.toFixed(2).replace('.', ',')}*`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer');
    setStep(3);
  }

  const stepTitle = ['Seus dados', 'Endereço', 'Pagamento', 'Pronto!'];

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(5, 10, 30, 0.88)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            zIndex: 9500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <motion.div
            initial={{ scale: 0.92, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 10, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(180deg, #0a1530 0%, #050a1e 100%)',
              borderRadius: 24,
              maxWidth: 540,
              width: '100%',
              padding: 36,
              color: '#fff',
              boxShadow: '0 30px 100px rgba(37,99,235,0.4), 0 0 60px rgba(56,189,248,0.15)',
              border: '1px solid rgba(96,165,250,0.2)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <motion.div
              animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                top: '-30%',
                right: '-20%',
                width: 400,
                height: 400,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(56,189,248,0.25), transparent 70%)',
                filter: 'blur(40px)',
                pointerEvents: 'none',
              }}
            />

            <div style={{ position: 'relative', zIndex: 1 }}>
              {step < 3 && (
                <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{
                        background: i <= step
                          ? 'linear-gradient(90deg, #2563eb, #38bdf8)'
                          : 'rgba(255,255,255,0.1)',
                      }}
                      style={{ flex: 1, height: 4, borderRadius: 2 }}
                    />
                  ))}
                </div>
              )}

              <h2 style={{
                fontSize: 26,
                fontWeight: 800,
                marginBottom: 6,
                background: 'linear-gradient(135deg, #fff, #60a5fa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: -0.5,
              }}>{stepTitle[step]}</h2>
              {step < 3 && (
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginBottom: 24 }}>
                  Passo {step + 1} de 3
                </p>
              )}

              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.div key="0" initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -30, opacity: 0 }} transition={{ duration: 0.3 }}>
                    <Field label="Nome completo" value={nome} onChange={setNome} placeholder="Como devemos te chamar?" />
                  </motion.div>
                )}
                {step === 1 && (
                  <motion.div key="1" initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -30, opacity: 0 }} transition={{ duration: 0.3 }}>
                    <Field label="CEP" value={cep} onChange={setCep} placeholder="00000-000" />
                    <Field label="Endereço completo" value={endereco} onChange={setEndereco} placeholder="Rua, número, bairro, cidade" />
                  </motion.div>
                )}
                {step === 2 && (
                  <motion.div key="2" initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -30, opacity: 0 }} transition={{ duration: 0.3 }}>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>Método de pagamento</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 24 }}>
                      {([
                        { id: 'pix', label: 'PIX', icon: '📱' },
                        { id: 'cartao', label: 'Cartão', icon: '💳' },
                        { id: 'boleto', label: 'Boleto', icon: '📄' },
                      ] as const).map((p) => (
                        <motion.button
                          key={p.id}
                          onClick={() => setPagamento(p.id)}
                          whileHover={{ y: -3 }}
                          whileTap={{ scale: 0.95 }}
                          style={{
                            padding: 16,
                            borderRadius: 14,
                            background: pagamento === p.id
                              ? 'linear-gradient(135deg, rgba(37,99,235,0.3), rgba(56,189,248,0.2))'
                              : 'rgba(255,255,255,0.04)',
                            border: pagamento === p.id
                              ? '1.5px solid #60a5fa'
                              : '1.5px solid rgba(255,255,255,0.1)',
                            color: '#fff',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 6,
                            alignItems: 'center',
                          }}
                        >
                          <span style={{ fontSize: 26 }}>{p.icon}</span>
                          <span style={{ fontSize: 12, fontWeight: 600 }}>{p.label}</span>
                        </motion.button>
                      ))}
                    </div>

                    <div style={{
                      background: 'rgba(96,165,250,0.06)',
                      border: '1px solid rgba(96,165,250,0.15)',
                      padding: '14px 16px',
                      borderRadius: 12,
                      marginBottom: 12,
                    }}>
                      <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>
                        Resumo ({items.length} {items.length === 1 ? 'item' : 'itens'})
                      </p>
                      <div style={{ maxHeight: 120, overflowY: 'auto', marginBottom: 10 }}>
                        {items.map((it) => (
                          <div key={it.cartKey} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.7)', padding: '4px 0' }}>
                            <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginRight: 8 }}>
                              {it.qty}× {it.title}{it.size ? ` (${it.size})` : ''}
                            </span>
                            <span style={{ fontWeight: 600 }}>R$ {(Number(it.effectivePrice.replace(',', '.')) * it.qty).toFixed(2).replace('.', ',')}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ borderTop: '1px solid rgba(96,165,250,0.15)', paddingTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Total</span>
                        <span style={{ fontSize: 22, fontWeight: 800, color: '#60a5fa' }}>
                          R$ {total.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
                {step === 3 && (
                  <motion.div
                    key="3"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    style={{ textAlign: 'center', padding: '20px 0' }}
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 250, damping: 18, delay: 0.1 }}
                      style={{
                        width: 90,
                        height: 90,
                        borderRadius: '50%',
                        margin: '0 auto 20px',
                        background: 'linear-gradient(135deg, #22c55e, #4ade80)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 20px 60px rgba(34, 197, 94, 0.5)',
                      }}
                    >
                      <motion.svg
                        width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"
                      >
                        <motion.polyline points="20 6 9 17 4 12"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                        />
                      </motion.svg>
                    </motion.div>
                    <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10, color: '#fff' }}>Pedido enviado!</h3>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, marginBottom: 24 }}>
                      Continuamos a conversa pelo WhatsApp. Em instantes você recebe a confirmação.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => { clear(); close(); }}
                      style={{
                        padding: '13px 30px',
                        borderRadius: 999,
                        border: 'none',
                        background: 'linear-gradient(135deg, #2563eb, #38bdf8)',
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: 13,
                        cursor: 'pointer',
                        letterSpacing: 0.5,
                        textTransform: 'uppercase',
                      }}
                    >
                      Continuar comprando
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

              {step < 3 && (
                <div style={{ display: 'flex', gap: 10, marginTop: 28 }}>
                  {step > 0 && (
                    <motion.button
                      whileHover={{ x: -3 }}
                      onClick={() => setStep((s) => (s - 1) as 0 | 1 | 2)}
                      style={{
                        padding: '13px 22px',
                        borderRadius: 12,
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'rgba(255,255,255,0.75)',
                        fontWeight: 600,
                        fontSize: 13,
                        cursor: 'pointer',
                      }}
                    >← Voltar</motion.button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    disabled={
                      (step === 0 && !nome.trim()) ||
                      (step === 1 && (!cep.trim() || !endereco.trim()))
                    }
                    onClick={() => {
                      if (step === 2) enviarWA();
                      else setStep((s) => (s + 1) as 0 | 1 | 2);
                    }}
                    className="btn-shine"
                    style={{
                      flex: 1,
                      padding: '13px 22px',
                      borderRadius: 12,
                      border: 'none',
                      background: 'linear-gradient(135deg, #2563eb 0%, #38bdf8 100%)',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: 13,
                      letterSpacing: 0.5,
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      boxShadow: '0 14px 32px rgba(37,99,235,0.5)',
                      opacity: ((step === 0 && !nome.trim()) || (step === 1 && (!cep.trim() || !endereco.trim()))) ? 0.5 : 1,
                    }}
                  >
                    {step === 2 ? '📱 Enviar pelo WhatsApp' : 'Continuar →'}
                  </motion.button>
                </div>
              )}
            </div>

            <button
              onClick={close}
              aria-label="Fechar"
              style={{
                position: 'absolute',
                top: 16, right: 16,
                background: 'rgba(255,255,255,0.08)',
                border: 'none',
                width: 34, height: 34,
                borderRadius: '50%',
                color: '#fff',
                fontSize: 18,
                cursor: 'pointer',
                zIndex: 2,
              }}
            >×</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: 'block', fontSize: 11, color: 'rgba(255,255,255,0.6)', marginBottom: 6, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '13px 16px',
          borderRadius: 12,
          border: '1.5px solid rgba(96,165,250,0.2)',
          background: 'rgba(255,255,255,0.04)',
          color: '#fff',
          fontSize: 14,
          outline: 'none',
          fontFamily: 'Poppins, sans-serif',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = '#60a5fa';
          e.currentTarget.style.boxShadow = '0 0 0 4px rgba(96,165,250,0.18)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'rgba(96,165,250,0.2)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      />
    </div>
  );
}
