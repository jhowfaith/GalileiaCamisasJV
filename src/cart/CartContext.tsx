import { createContext, useContext, useState, useCallback, useRef } from 'react';
import type { Product } from '../data/products';

export interface CartItem extends Product {
  qty: number;
  size?: string;
  variant?: 'avulso' | 'bundle';
  effectivePrice: string;
  cartKey: string;
}

interface FlyAnim { id: number; src: string; from: DOMRect; }

interface AddOpts {
  size?: string;
  variant?: 'avulso' | 'bundle';
  from?: DOMRect;
  srcImg?: string;
}

interface CartCtx {
  items: CartItem[];
  count: number;
  total: number;
  add: (p: Product, opts?: AddOpts) => void;
  remove: (cartKey: string) => void;
  setQty: (cartKey: string, qty: number) => void;
  clear: () => void;
  flying: FlyAnim[];
  cartButtonRef: React.MutableRefObject<HTMLElement | null>;
  registerFlyDone: (id: number) => void;
  pulse: number;
  openCheckout: () => void;
  closeCheckout: () => void;
  isCheckoutOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  isDrawerOpen: boolean;
}

const Ctx = createContext<CartCtx | null>(null);

function priceNum(p: string) {
  return Number(String(p).replace(/\./g, '').replace(',', '.')) || 0;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [flying, setFlying] = useState<FlyAnim[]>([]);
  const [pulse, setPulse] = useState(0);
  const [isCheckoutOpen, setCheckout] = useState(false);
  const [isDrawerOpen, setDrawer] = useState(false);
  const cartButtonRef = useRef<HTMLElement | null>(null);
  const flyIdRef = useRef(0);

  const add = useCallback((p: Product, opts: AddOpts = {}) => {
    const { size, variant, from, srcImg } = opts;
    if (from && srcImg) {
      const id = ++flyIdRef.current;
      setFlying((arr) => [...arr, { id, src: srcImg, from }]);
    }
    const effectivePrice = variant === 'bundle' && p.priceBundle ? p.priceBundle : p.price;
    const cartKey = `${p.id}|${size || ''}|${variant || 'default'}`;

    setItems((arr) => {
      const ex = arr.find((it) => it.cartKey === cartKey);
      if (ex) return arr.map((it) => it.cartKey === cartKey ? { ...it, qty: it.qty + 1 } : it);
      return [...arr, { ...p, qty: 1, size, variant, effectivePrice, cartKey }];
    });
    setTimeout(() => setPulse((p) => p + 1), 650);
  }, []);

  const remove = useCallback((cartKey: string) => {
    setItems((arr) => arr.filter((it) => it.cartKey !== cartKey));
  }, []);

  const setQty = useCallback((cartKey: string, qty: number) => {
    if (qty <= 0) {
      setItems((arr) => arr.filter((it) => it.cartKey !== cartKey));
      return;
    }
    setItems((arr) => arr.map((it) => it.cartKey === cartKey ? { ...it, qty } : it));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const registerFlyDone = useCallback((id: number) => {
    setFlying((arr) => arr.filter((f) => f.id !== id));
  }, []);

  const count = items.reduce((s, it) => s + it.qty, 0);
  const total = items.reduce((s, it) => s + priceNum(it.effectivePrice) * it.qty, 0);

  return (
    <Ctx.Provider
      value={{
        items, count, total, add, remove, setQty, clear,
        flying, cartButtonRef, registerFlyDone, pulse,
        openCheckout: () => { setCheckout(true); setDrawer(false); },
        closeCheckout: () => setCheckout(false),
        isCheckoutOpen,
        openDrawer: () => setDrawer(true),
        closeDrawer: () => setDrawer(false),
        isDrawerOpen,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
}
