import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useCart } from '../store/CartContext';
import { getProduct } from '../lib/data';
import { formatINR, EASE } from '../lib/utils';
import { ProductImage } from './ProductImage';

export function CartDrawer() {
  const { items, isCartOpen, closeCart, setQty, removeItem, subtotal, count } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 z-[70] bg-night-deep/70 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            className="fixed right-0 top-0 z-[80] flex h-full w-full max-w-md flex-col border-l border-brass/15 bg-night-mid shadow-2xl"
            role="dialog"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-brass/10 px-6 py-5">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} className="text-brass" />
                <p className="font-serif text-xl font-semibold text-ivory">Your Cart</p>
                {count > 0 && (
                  <span className="rounded-full bg-brass px-2 py-0.5 text-xs font-bold text-night-deep">{count}</span>
                )}
              </div>
              <button onClick={closeCart} className="grid h-9 w-9 place-items-center rounded-sm text-ivory-dim hover:bg-brass/10 hover:text-ivory transition-colors" aria-label="Close cart">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                  <p className="font-display text-2xl text-ivory/50">खाली</p>
                  <p className="font-serif text-ivory-dim">Your cart awaits its first treasure.</p>
                  <Link
                    to="/deals"
                    onClick={closeCart}
                    className="btn-outline mt-3 text-sm"
                  >
                    Explore Deals
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <AnimatePresence initial={false}>
                    {items.map((item) => {
                      const p = getProduct(item.id);
                      if (!p) return null;
                      return (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -14, marginBottom: 0 }}
                          transition={{ duration: 0.35, ease: EASE }}
                          className="flex gap-4 overflow-hidden rounded-md border border-brass/10 bg-night-deep/40 p-3"
                        >
                          <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded object-cover">
                            <ProductImage seed={p.imageSeed} alt={p.name} className="absolute inset-0" rounded={false} />
                          </div>
                          <div className="flex flex-1 flex-col">
                            <div className="flex items-start justify-between gap-2">
                              <p className="font-serif text-base font-semibold leading-tight text-ivory">{p.name}</p>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-ivory-dim/50 hover:text-wood transition-colors"
                                aria-label={`Remove ${p.name}`}
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                            <p className="mt-0.5 text-xs text-ivory-dim/70">{p.hi}</p>
                            <div className="mt-auto flex items-center justify-between pt-2">
                              <div className="flex items-center gap-3 rounded-sm border border-brass/25 px-2 py-1">
                                <button onClick={() => setQty(item.id, item.qty - 1)} className="text-brass hover:text-brass-soft" aria-label="Decrease quantity">
                                  <Minus size={13} />
                                </button>
                                <span className="min-w-[1.2rem] text-center font-serif text-sm text-ivory">{item.qty}</span>
                                <button onClick={() => setQty(item.id, item.qty + 1)} className="text-brass hover:text-brass-soft" aria-label="Increase quantity">
                                  <Plus size={13} />
                                </button>
                              </div>
                              <p className="font-serif text-lg font-semibold text-brass-soft">{formatINR(p.price * item.qty)}</p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-brass/10 px-6 py-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-serif text-ivory-dim">Subtotal</span>
                  <span className="font-serif text-2xl font-semibold text-ivory">{formatINR(subtotal)}</span>
                </div>
                <Link to="/checkout" onClick={closeCart} className="btn-brass block w-full text-center">
                  Proceed to Checkout
                </Link>
                <p className="mt-3 text-center text-xs text-ivory-dim/60 tracking-wide">
                  Shipping & taxes calculated at checkout. This is a demonstration.
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}