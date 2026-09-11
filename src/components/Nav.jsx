import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, ShoppingBag, User, X } from 'lucide-react';
import { CATEGORIES, getProductsByCategory } from '../lib/data';
import { useCart } from '../store/CartContext';
import { cn } from '../lib/utils';

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  ...CATEGORIES.map((c) => ({ to: `/category/${c.slug}`, label: c.name, end: false })),
  { to: '/deals', label: 'Top Deals', end: false },
  { to: '/contact', label: 'Contact', end: false },
];

export function Nav() {
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return CATEGORIES.flatMap((c) =>
      getProductsByCategory(c.slug).filter((p) =>
        (p.name + ' ' + p.hindi + ' ' + (p.hi || '')).toLowerCase().includes(q),
      ),
    ).slice(0, 6);
  }, [query]);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300',
        scrolled ? 'bg-night-deep/90 backdrop-blur-md shadow-lg shadow-black/30' : 'bg-transparent',
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:px-8">
        <Link to="/" className="group flex items-baseline gap-2 shrink-0">
          <span className="font-display text-2xl text-ivory group-hover:text-brass-soft transition-colors">आश्रय</span>
          <span className="hidden sm:block font-serif text-xs uppercase tracking-[0.4em] text-brass/80">Aashray</span>
        </Link>

        <div className="hidden lg:flex items-center gap-1 flex-1">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                cn(
                  'rounded-sm px-3 py-1.5 font-serif text-[15px] tracking-wide transition-colors',
                  isActive ? 'text-brass-soft bg-brass/10' : 'text-ivory-dim hover:text-ivory',
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => {
              setSearchOpen((s) => !s);
              if (!searchOpen) setTimeout(() => inputRef.current?.focus(), 60);
            }}
            className="grid h-10 w-10 place-items-center rounded-sm text-ivory-dim hover:text-ivory hover:bg-brass/10 transition-colors"
            aria-label="Search"
          >
            {searchOpen ? <X size={20} /> : <Search size={20} />}
          </button>

          {searchOpen && (
            <div className="relative">
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 150)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && results[0]) navigate(`/product/${results[0].id}`);
                }}
                placeholder="Search aashray…"
                className="input-field w-48 md:w-64 py-2"
              />
              <AnimatePresence>
                {focused && results.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-full mt-2 w-72 rounded-md border border-brass/20 bg-night-mid shadow-2xl shadow-black/50"
                  >
                    {results.map((p) => (
                      <Link
                        key={p.id}
                        to={`/product/${p.id}`}
                        className="flex items-center gap-3 px-3 py-2 hover:bg-brass/10 transition-colors"
                      >
                        <span className="font-serif text-sm text-ivory">{p.name}</span>
                        <span className="ml-auto text-xs text-brass/70">₹{p.price}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <Link
            to="/account"
            className="grid h-10 w-10 place-items-center rounded-sm text-ivory-dim hover:text-ivory hover:bg-brass/10 transition-colors"
            aria-label="Account"
          >
            <User size={20} />
          </Link>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={openCart}
            className="relative grid h-10 w-10 place-items-center rounded-sm text-ivory-dim hover:text-ivory hover:bg-brass/10 transition-colors"
            aria-label="Open cart"
          >
            <ShoppingBag size={20} />
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.4, 1] }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-brass text-[11px] font-bold text-night-deep"
              >
                {count}
              </motion.span>
            )}
          </motion.button>
        </div>
      </nav>
    </header>
  );
}