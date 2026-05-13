import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import './index.css';
import Header from './components/Header';
import HeroCinematic from './components/HeroCinematic';
import ProductCarousel from './components/ProductCarousel';
import FilteredCatalog from './components/FilteredCatalog';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import TrustBadges from './components/TrustBadges';
import Footer from './components/Footer';
import SmoothScroll from './components/SmoothScroll';
import ScrollProgress from './components/ScrollProgress';
import { CartProvider } from './cart/CartContext';
import FlyToCartLayer from './cart/FlyToCartLayer';
import CartDrawer from './cart/CartDrawer';
import CheckoutModal from './cart/CheckoutModal';
import {
  products as allProducts,
  nationalPremium,
  femininas,
  tailandesa,
  croppeds,
  bermudas,
  caixas,
} from './data/products';

function normalize(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function App() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return [];
    const terms = q.split(/\s+/);
    return allProducts.filter((p) => {
      const haystack = normalize(`${p.title} ${p.category} ${p.description}`);
      return terms.every((t) => haystack.includes(t));
    });
  }, [query]);

  const isSearching = query.trim().length > 0;

  return (
    <CartProvider>
      <SmoothScroll>
        <ScrollProgress />
        <div>
          <Header />
          <HeroCinematic />

          <SearchBar value={query} onChange={setQuery} resultCount={filtered.length} />

          <AnimatePresence mode="wait">
            {isSearching ? (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <SearchResults results={filtered} query={query} />
              </motion.div>
            ) : (
              <motion.div
                key="carousels"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <ProductCarousel id="nacional" title="Nacional Premium" products={nationalPremium} />
                <ProductCarousel id="femininas" title="Camisas Femininas" products={femininas} />
                <ProductCarousel id="tailandesa" title="Tailandesa 1.1" products={tailandesa} />
                <ProductCarousel id="croppeds" title="Croppeds Brasil" products={croppeds} />
                <ProductCarousel id="bermudas" title="Bermudas" products={bermudas} />
                <ProductCarousel id="caixas" title="Caixas Personalizadas" products={caixas} />
                <FilteredCatalog products={allProducts} />
              </motion.div>
            )}
          </AnimatePresence>

          <TrustBadges />
          <Footer />
        </div>
        <FlyToCartLayer />
        <CartDrawer />
        <CheckoutModal />
      </SmoothScroll>
    </CartProvider>
  );
}

export default App;
