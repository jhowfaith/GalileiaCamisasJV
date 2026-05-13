const items = [
  '🚀 ESTOQUE 100% PRONTA ENTREGA',
  '⚡ DESPACHAMOS SEU PEDIDO EM ATÉ 48 HORAS',
  '🇧🇷 ENVIAMOS PARA TODO BRASIL',
  '🔒 PAGAMENTO 100% SEGURO',
  '📦 RASTREIO EM TEMPO REAL',
];

const repeated = [...items, ...items];

export default function AnnouncementBar() {
  return (
    <div style={{ background: '#1a1a1a', padding: '10px 0', overflow: 'hidden' }}>
      <div className="ticker-outer">
        <div className="ticker-inner">
          {repeated.map((item, i) => (
            <span
              key={i}
              style={{
                color: '#fff',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: 1,
                textTransform: 'uppercase',
                padding: '0 40px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                whiteSpace: 'nowrap',
              }}
            >
              {item}
              <span style={{ color: '#6909FF', fontSize: 16 }}>|</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
