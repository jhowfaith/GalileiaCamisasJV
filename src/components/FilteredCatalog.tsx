import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { Product } from '../data/products';
import ProductCard from './ProductCard';
import ProductLightbox from './ProductLightbox';

interface Props {
  products: Product[];
}

const CATEGORIES = [
  { label: 'Todos os Produtos', value: '' },
  { label: 'Nacional Premium', value: 'Nacional Premium' },
  { label: 'Camisas Femininas', value: 'Camisas Femininas' },
  { label: 'Tailandesa 1.1', value: 'Tailandesa' },
  { label: 'Cropped Brasil', value: 'Cropped Brasil' },
  { label: 'Camisas Retrô', value: 'Retrô' },
  { label: 'Bermudas', value: 'Bermuda' },
  { label: 'Caixas', value: 'Caixas' },
];

const SIZES = ['P', 'M', 'G', 'GG', '2XL', '3XL', 'Único'];

const SIZE_MAP: Record<string, string> = {
  'Único': 'Tamanho Único (P ao G)',
};

const PAGE_SIZE = 16;

export default function FilteredCatalog({ products }: Props) {
  const [activeCategory, setActiveCategory] = useState('');
  const [activeSizes, setActiveSizes] = useState<string[]>([]);
  const [open, setOpen] = useState<Product | null>(null);
  const [shown, setShown] = useState(PAGE_SIZE);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = !activeCategory || p.category.includes(activeCategory);
      const matchSize = activeSizes.length === 0 || activeSizes.some((sel) => {
        const mapped = SIZE_MAP[sel] || sel;
        return p.sizes.some((s) => s === mapped || s.includes(sel));
      });
      return matchCat && matchSize;
    });
  }, [products, activeCategory, activeSizes]);

  function selectCategory(val: string) {
    setActiveCategory(val);
    setShown(PAGE_SIZE);
  }

  function toggleSize(s: string) {
    setActiveSizes((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
    setShown(PAGE_SIZE);
  }

  function clearAll() {
    setActiveCategory('');
    setActiveSizes([]);
    setShown(PAGE_SIZE);
  }

  const hasFilters = activeCategory !== '' || activeSizes.length > 0;
  const visible = filtered.slice(0, shown);

  const Sidebar = () => (
    <aside style={{
      width: 220,
      flexShrink: 0,
      background: '#fff',
      borderRadius: 16,
      padding: '24px 18px',
      border: '1px solid #e8eef8',
      alignSelf: 'flex-start',
      position: 'sticky',
      top: 80,
      boxShadow: '0 4px 20px rgba(37,99,235,0.06)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <span style={{ fontSize: 12, fontWeight: 800, color: '#0a1530', letterSpacing: 1, textTransform: 'uppercase' }}>
          Filtros
        </span>
        {hasFilters && (
          <button
            onClick={clearAll}
            style={{
              fontSize: 11,
              color: '#ef4444',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              padding: 0,
            }}
          >
            Limpar
          </button>
        )}
      </div>

      {/* Categories */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 10, fontWeight: 800, color: '#6b7a99', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>
          Categoria
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.value;
            const count = cat.value === ''
              ? products.length
              : products.filter((p) => p.category.includes(cat.value)).length;
            return (
              <button
                key={cat.value}
                onClick={() => selectCategory(cat.value)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '9px 12px',
                  borderRadius: 9,
                  border: 'none',
                  background: isActive ? 'linear-gradient(135deg, #2563EB, #38BDF8)' : 'transparent',
                  color: isActive ? '#fff' : '#1a2238',
                  fontSize: 12.5,
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                  transition: 'background 0.18s',
                }}
              >
                <span>{cat.label}</span>
                <span style={{
                  fontSize: 10,
                  fontWeight: 600,
                  background: isActive ? 'rgba(255,255,255,0.22)' : '#eef4ff',
                  color: isActive ? '#fff' : '#2563EB',
                  borderRadius: 999,
                  padding: '1px 7px',
                  minWidth: 24,
                  textAlign: 'center',
                }}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p style={{ fontSize: 10, fontWeight: 800, color: '#6b7a99', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>
          Tamanho
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {SIZES.map((s) => {
            const isActive = activeSizes.includes(s);
            return (
              <button
                key={s}
                onClick={() => toggleSize(s)}
                style={{
                  padding: '6px 11px',
                  borderRadius: 7,
                  border: isActive ? '1.5px solid #2563EB' : '1.5px solid #d8e2f5',
                  background: isActive ? '#2563EB' : '#fff',
                  color: isActive ? '#fff' : '#1a2238',
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );

  return (
    <section style={{ background: '#f4f8ff', padding: '56px 0 64px' }} id="todos">
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <span style={{
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 2.5,
            color: '#2563EB',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: 6,
          }}>✦ Catálogo Completo</span>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
            <h2 style={{
              fontSize: 'clamp(20px, 3vw, 30px)',
              fontWeight: 800,
              color: '#0a1530',
              letterSpacing: -0.5,
              margin: 0,
            }}>
              {activeCategory
                ? CATEGORIES.find((c) => c.value === activeCategory)?.label
                : 'Todos os Produtos'}
              <span style={{ fontSize: 14, fontWeight: 500, color: '#6b7a99', marginLeft: 10 }}>
                ({filtered.length})
              </span>
            </h2>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setSidebarOpen((v) => !v)}
              className="filter-mobile-btn"
              style={{
                display: 'none',
                alignItems: 'center',
                gap: 6,
                padding: '8px 16px',
                border: '1.5px solid #d8e2f5',
                borderRadius: 9,
                background: '#fff',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                color: '#1a2238',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
              </svg>
              Filtros {hasFilters && `(${(activeCategory ? 1 : 0) + activeSizes.length})`}
            </button>
          </div>
        </div>

        {/* Layout: sidebar + grid */}
        <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>
          {/* Desktop sidebar */}
          <div className="filter-sidebar-desktop">
            <Sidebar />
          </div>

          {/* Mobile sidebar overlay */}
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                style={{
                  position: 'fixed',
                  inset: 0,
                  background: 'rgba(5,10,30,0.5)',
                  zIndex: 800,
                  display: 'none',
                }}
                className="filter-overlay-mobile"
              >
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'spring', stiffness: 340, damping: 32 }}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 280,
                    background: '#fff',
                    padding: '24px 20px',
                    overflowY: 'auto',
                  }}
                >
                  <Sidebar />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product grid */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <AnimatePresence mode="wait">
              {filtered.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ textAlign: 'center', padding: '60px 0', color: '#6b7a99', fontSize: 14 }}
                >
                  Nenhum produto encontrado.
                </motion.div>
              ) : (
                <motion.div
                  key={activeCategory + activeSizes.join(',')}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
                    gap: 16,
                  }}
                >
                  {visible.map((p) => (
                    <ProductCard key={p.id} product={p} onOpen={setOpen} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {shown < filtered.length && (
              <div style={{ textAlign: 'center', marginTop: 36 }}>
                <motion.button
                  onClick={() => setShown((s) => s + PAGE_SIZE)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: '13px 44px',
                    fontSize: 13,
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #2563EB, #38BDF8)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 12,
                    cursor: 'pointer',
                    letterSpacing: 0.5,
                    boxShadow: '0 10px 28px rgba(37,99,235,0.3)',
                  }}
                >
                  Ver mais ({filtered.length - shown} restantes)
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>

      <ProductLightbox product={open} onClose={() => setOpen(null)} />
    </section>
  );
}
