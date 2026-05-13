import { motion } from 'motion/react';

interface Props {
  value: string;
  onChange: (v: string) => void;
  resultCount: number;
}

export default function SearchBar({ value, onChange, resultCount }: Props) {
  return (
    <section
      id="busca"
      style={{
        background: 'linear-gradient(180deg, #fff 0%, #f8fbff 100%)',
        padding: '40px 0 24px',
        position: 'relative',
      }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: 20 }}
        >
          <span style={{
            display: 'inline-block',
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 2.5,
            color: '#2563EB',
            textTransform: 'uppercase',
            marginBottom: 10,
          }}>
            ✦ Encontre seu manto
          </span>
          <h2 style={{
            fontSize: 'clamp(22px, 3vw, 32px)',
            fontWeight: 800,
            color: '#0a1530',
            letterSpacing: -0.5,
            lineHeight: 1.1,
          }}>
            Busque entre +140 modelos
          </h2>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          onSubmit={(e) => e.preventDefault()}
          style={{
            maxWidth: 640,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            background: '#fff',
            border: '2px solid #e0e7f5',
            borderRadius: 999,
            overflow: 'hidden',
            boxShadow: value ? '0 12px 40px rgba(37,99,235,0.18)' : '0 6px 24px rgba(37,99,235,0.06)',
            transition: 'box-shadow 0.3s, border-color 0.3s',
          }}
          onFocus={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = '#60A5FA';
          }}
          onBlur={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = '#e0e7f5';
          }}
        >
          <div style={{ paddingLeft: 22, display: 'flex', alignItems: 'center', color: '#2563EB' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Busque por time, modelo, categoria..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            autoComplete="off"
            style={{
              flex: 1,
              border: 'none',
              background: 'transparent',
              padding: '18px 18px',
              fontSize: 15,
              outline: 'none',
              fontFamily: 'Poppins, sans-serif',
              color: '#0a1530',
              fontWeight: 500,
            }}
          />
          {value && (
            <motion.button
              type="button"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onChange('')}
              aria-label="Limpar"
              style={{
                margin: '0 8px 0 0',
                background: '#eef4ff',
                border: 'none',
                width: 36,
                height: 36,
                borderRadius: '50%',
                cursor: 'pointer',
                color: '#2563EB',
                fontSize: 18,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >×</motion.button>
          )}
        </motion.form>

        {value && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: 'center',
              marginTop: 14,
              fontSize: 13,
              color: '#6b7a99',
            }}
          >
            {resultCount === 0
              ? <>Nenhum resultado encontrado para <strong style={{ color: '#0a1530' }}>"{value}"</strong></>
              : <>Mostrando <strong style={{ color: '#2563EB' }}>{resultCount}</strong> resultado{resultCount !== 1 ? 's' : ''} para <strong style={{ color: '#0a1530' }}>"{value}"</strong></>
            }
          </motion.p>
        )}
      </div>
    </section>
  );
}
