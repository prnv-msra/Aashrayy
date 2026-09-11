import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import { getCategory, getProductsByCategory } from '../lib/data';
import { CategoryTransition } from '../components/Transitions';
import { ProductCard } from '../components/ProductCard';
import { Stagger, StaggerItem } from '../components/Reveal';

const PRICE_BANDS = [
  { id: '0-2000', label: 'Under ₹2,000', min: 0, max: 2000 },
  { id: '2000-5000', label: '₹2,000 – ₹5,000', min: 2000, max: 5000 },
  { id: '5000-10000', label: '₹5,000 – ₹10,000', min: 5000, max: 10000 },
  { id: '10000-', label: '₹10,000+', min: 10000, max: Infinity },
];

export default function CategoryPage() {
  const { slug } = useParams();
  const category = getCategory(slug);

  const [revealed, setRevealed] = useState(false);
  const [style, setStyle] = useState('all');
  const [material, setMaterial] = useState('all');
  const [priceIds, setPriceIds] = useState([]);
  const [sort, setSort] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  const products = useMemo(() => {
    if (!category) return [];
    const all = getProductsByCategory(slug);
    let out = all;
    if (style !== 'all') out = out.filter((p) => p.style === style);
    if (material !== 'all') out = out.filter((p) => p.material === material);
    if (priceIds.length) {
      out = out.filter((p) =>
        priceIds.some((id) => {
          const band = PRICE_BANDS.find((b) => b.id === id);
          return band && p.price >= band.min && p.price < band.max;
        }),
      );
    }
    if (sort === 'price-asc') out = [...out].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') out = [...out].sort((a, b) => b.price - a.price);
    if (sort === 'rating') out = [...out].sort((a, b) => b.rating - a.rating);
    return out;
  }, [category, slug, style, material, priceIds, sort]);

  if (!category) {
    return (
      <main className="grid min-h-[60vh] place-items-center px-6 text-center">
        <div>
          <p className="font-display text-4xl text-ivory">कुछ नहीं मिला</p>
          <p className="mt-2 font-serif text-ivory-dim">This category doesn’t exist.</p>
          <Link to="/" className="btn-outline mt-6 inline-block">Back home</Link>
        </div>
      </main>
    );
  }

  const togglePrice = (id) =>
    setPriceIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="relative"
    >
      {/* Themed entrance — plays once, then dissolves to reveal the listing */}
      <AnimatePresence>
        {!revealed && (
          <CategoryTransition
            key={`${slug}-transition`}
            type={category.transition}
            accent={category.accent}
            onComplete={() => setRevealed(true)}
          />
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-7xl px-4 pt-10 md:px-8">
        {/* Header */}
        <Stagger className="mb-10">
          <StaggerItem className="flex items-center gap-3">
            <h1 className="font-display text-4xl text-ivory md:text-5xl">{category.hindi}</h1>
            <span className="h-px flex-1 bg-gradient-to-r from-brass/50 to-transparent" />
          </StaggerItem>
          <StaggerItem className="mt-3">
            <h2 className="font-serif text-2xl font-semibold text-brass-soft">{category.name}</h2>
            <p className="mt-2 max-w-2xl font-serif text-lg italic text-ivory-dim">{category.description}</p>
          </StaggerItem>
        </Stagger>

        {/* Filter bar */}
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowFilters((s) => !s)}
            className="btn-outline flex items-center gap-2 px-4 py-2 text-sm"
          >
            {showFilters ? <X size={15} /> : <SlidersHorizontal size={15} />}
            Filters
          </button>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="input-field w-auto cursor-pointer px-3 py-2 text-sm"
          >
            <option value="featured">Sort: Featured</option>
            <option value="rating">Sort: Top Rated</option>
            <option value="price-asc">Sort: Price (low → high)</option>
            <option value="price-desc">Sort: Price (high → low)</option>
          </select>

          <p className="ml-auto font-serif text-sm text-ivory-dim">
            {products.length} {products.length === 1 ? 'piece' : 'pieces'}
          </p>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mb-8 grid gap-6 rounded-lg border border-brass/15 bg-night-mid/40 p-5 md:grid-cols-3">
                <div>
                  <p className="mb-3 font-serif text-sm font-semibold uppercase tracking-[0.25em] text-brass">Style</p>
                  <div className="flex flex-wrap gap-2">
                    <FilterPill active={style === 'all'} onClick={() => setStyle('all')} label="All" />
                    {category.styles.map((s) => (
                      <FilterPill key={s} active={style === s} onClick={() => setStyle(s)} label={s} />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-3 font-serif text-sm font-semibold uppercase tracking-[0.25em] text-brass">Material</p>
                  <div className="flex flex-wrap gap-2">
                    <FilterPill active={material === 'all'} onClick={() => setMaterial('all')} label="All" />
                    {category.materials.map((m) => (
                      <FilterPill key={m} active={material === m} onClick={() => setMaterial(m)} label={m} />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-3 font-serif text-sm font-semibold uppercase tracking-[0.25em] text-brass">Price</p>
                  <div className="flex flex-col gap-2">
                    {PRICE_BANDS.map((b) => (
                      <label key={b.id} className="flex cursor-pointer items-center gap-3 text-sm text-ivory-dim hover:text-ivory">
                        <input
                          type="checkbox"
                          checked={priceIds.includes(b.id)}
                          onChange={() => togglePrice(b.id)}
                          className="h-4 w-4 accent-[#C89B3C]"
                        />
                        {b.label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid */}
        <Stagger className="grid grid-cols-2 gap-x-5 gap-y-8 pb-4 md:grid-cols-3 lg:grid-cols-4" stagger={0.05}>
          {products.map((p, i) => (
            <StaggerItem key={p.id}>
              <ProductCard product={p} index={i} />
            </StaggerItem>
          ))}
        </Stagger>

        {products.length === 0 && (
          <div className="py-20 text-center">
            <p className="font-display text-2xl text-ivory/60">कुछ नहीं</p>
            <p className="mt-2 font-serif text-ivory-dim">Nothing matches those filters.</p>
          </div>
        )}
      </div>
    </motion.main>
  );
}

function FilterPill({ active, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-sm font-serif transition-all duration-200 ${
        active
          ? 'border-brass bg-brass text-night-deep'
          : 'border-brass/30 text-ivory-dim hover:border-brass/70 hover:text-ivory'
      }`}
    >
      {label}
    </button>
  );
}