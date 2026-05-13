import { useState } from 'react';
import type { Product } from '../data/products';
import ProductCard from './ProductCard';

interface Props {
  products: Product[];
  id?: string;
}

const PAGE_SIZE = 8;

export default function ProductGrid({ products, id }: Props) {
  const [shown, setShown] = useState(PAGE_SIZE);

  return (
    <section className="section" id={id} style={{ background: '#f8f8f8' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#1a1a1a', letterSpacing: -0.5 }}>
            Todos os Produtos
          </h2>
          <span style={{ fontSize: 13, color: '#777' }}>{products.length} produtos</span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 20,
        }}>
          {products.slice(0, shown).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {shown < products.length && (
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <button
              onClick={() => setShown((s) => Math.min(s + PAGE_SIZE, products.length))}
              className="btn-primary"
              style={{ padding: '14px 40px', fontSize: 14 }}
            >
              VER TODOS OS PRODUTOS
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
