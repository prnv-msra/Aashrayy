import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getProduct } from '../lib/data';

const CartContext = createContext(null);

const STORAGE_KEY = 'aashray-cart-v1';

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore quota errors in private mode */
    }
  }, [items]);

  const addItem = useCallback((productId, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === productId);
      if (found) {
        return prev.map((i) =>
          i.id === productId ? { ...i, qty: i.qty + qty } : i,
        );
      }
      return [...prev, { id: productId, qty }];
    });
    const p = getProduct(productId);
    setLastAdded(p ? { id: p.id, name: p.name } : null);
    setIsCartOpen(true);
  }, []);

  const removeItem = useCallback((productId) => {
    setItems((prev) => prev.filter((i) => i.id !== productId));
  }, []);

  const setQty = useCallback((productId, qty) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.id !== productId)
        : prev.map((i) => (i.id === productId ? { ...i, qty } : i)),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const count = useMemo(
    () => items.reduce((acc, i) => acc + i.qty, 0),
    [items],
  );

  const subtotal = useMemo(
    () =>
      items.reduce((acc, i) => {
        const p = getProduct(i.id);
        return p ? acc + p.price * i.qty : acc;
      }, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      isCartOpen,
      lastAdded,
      addItem,
      removeItem,
      setQty,
      clear,
      openCart,
      closeCart,
      setLastAdded,
    }),
    [
      items,
      count,
      subtotal,
      isCartOpen,
      lastAdded,
      addItem,
      removeItem,
      setQty,
      clear,
      openCart,
      closeCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}