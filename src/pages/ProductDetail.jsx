import { useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronLeft, Minus, Plus, Ruler, Star } from 'lucide-react';
import { getProduct, getRelated, getCategory } from '../lib/data';
import { useCart } from '../store/CartContext';
import { formatINR, EASE } from '../lib/utils';
import { ProductCard } from '../components/ProductCard';
import { ProductImage } from '../components/ProductImage';
import { Reveal } from '../components/Reveal';

export default function ProductDetail() {
  const { id } = useParams();
  const product = getProduct(id);
  const { addItem } = useCart();

  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState('50% 50%');
  const [activeImg, setActiveImg] = useState(0);
  const frameRef = useRef(null);

  const related = useMemo(() => (product ? getRelated(product) : []), [product]);
  const category = product ? getCategory(product.category) : null;

  if (!product || !category) {
    return (
      <main className="grid min-h-[60vh] place-items-center px-6 text-center">
        <div>
          <p className="font-display text-4xl text-ivory">कुछ नहीं मिला</p>
          <p className="mt-2 font-serif text-ivory-dim">We couldn’t find that piece.</p>
          <Link to="/" className="btn-outline mt-6 inline-block">Back home</Link>
        </div>
      </main>
    );
  }

  const gallerySeeds = [product.imageSeed, product.hoverSeed, `${product.id}-a`, `${product.id}-b`].slice(0, 4);

  const handleAdd = () => {
    if (adding) return;
    addItem(product.id, qty);
    setAdding(true);
    setTimeout(() => {
      setAdding(false);
    }, 1600);
  };

  const stars = Math.round(product.rating);

  const handleMouseMove = (e) => {
    const el = frameRef.current;
    if (!el || !zoom) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto min-h-screen max-w-7xl px-4 pt-6 md:px-8"
    >
      <nav className="mb-6 flex flex-wrap items-center gap-2 font-serif text-sm text-ivory-dim">
        <Link to="/" className="hover:text-ivory">Home</Link>
        <span>/</span>
        <Link to={`/category/${category.slug}`} className="hover:text-ivory">{category.name}</Link>
        <span>/</span>
        <span className="text-ivory">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* ---------- Gallery ---------- */}
        <div>
          <div
            ref={frameRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setZoom(false)}
            onClick={() => setZoom((z) => !z)}
            className="relative aspect-[4/5] cursor-zoom-in overflow-hidden rounded-lg border border-brass/15"
          >
            <motion.div
              className="absolute inset-0"
              animate={{ scale: zoom ? 1.7 : 1 }}
              transition={{ duration: 0.5, ease: EASE }}
              style={{ transformOrigin: zoom ? origin : '50% 50%' }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImg}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="relative h-full w-full"
                >
                  <ProductImage seed={gallerySeeds[activeImg]} alt={product.name} eager className="absolute inset-0" rounded={false} />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {zoom && (
              <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-night-deep/70 px-3 py-1 text-xs text-ivory/80 backdrop-blur">
                Click to zoom out
              </div>
            )}
          </div>

          {/* thumbnails */}
          <div className="mt-4 flex gap-3">
            {gallerySeeds.map((s, i) => (
              <button
                key={s}
                onClick={() => setActiveImg(i)}
                className={`relative h-20 w-16 overflow-hidden rounded-md border transition-all duration-200 ${
                  activeImg === i ? 'border-brass' : 'border-brass/15 opacity-60 hover:opacity-100'
                }`}
                aria-label={`View image ${i + 1}`}
              >
                <ProductImage seed={s} alt="" className="absolute inset-0" rounded={false} />
              </button>
            ))}
          </div>
        </div>

        {/* ---------- Details ---------- */}
        <div className="flex flex-col">
          <p className="flex items-center gap-2 font-serif text-sm uppercase tracking-[0.3em] text-brass/80">
            <span style={{ color: category.accent }}>◆</span> {category.name} · {product.hi}
          </p>
          <h1 className="mt-3 font-display text-3xl text-ivory md:text-5xl">{product.hindi}</h1>
          <h2 className="mt-1 font-serif text-2xl font-semibold text-ivory md:text-3xl">{product.name}</h2>

          <div className="mt-3 flex items-center gap-2">
            <div className="flex">{Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={15} className={i < stars ? 'fill-brass text-brass' : 'text-ivory-dim/30'} />
            ))}</div>
            <span className="font-serif text-sm text-ivory-dim">{product.rating} · {product.reviews} reviews</span>
          </div>

          <div className="mt-6 flex items-end gap-4 border-y border-brass/10 py-5">
            <p className="font-serif text-4xl font-semibold text-brass-soft">{formatINR(product.price)}</p>
            {product.originalPrice && (
              <>
                <p className="pb-1 font-serif text-xl text-ivory-dim/60 line-through">{formatINR(product.originalPrice)}</p>
                <span className="mb-1 rounded-sm bg-wood px-2 py-0.5 text-xs font-semibold text-ivory">
                  Save {Math.round((1 - product.price / product.originalPrice) * 100)}%
                </span>
              </>
            )}
          </div>

          <p className="mt-6 font-serif text-lg leading-relaxed text-ivory-dim">{product.description}</p>

          <div className="mt-5 space-y-1.5 text-sm">
            <DetailRow icon="✳" label="Craft" value={product.hi} />
            <DetailRow icon={<Ruler size={14} />} label="Dimensions" value={product.width} />
            <DetailRow icon="◍" label="Material" value={product.material} />
            <DetailRow icon="◆" label="Style" value={product.style} />
            <DetailRow icon="⬦" label="Colour" value={product.color} />
          </div>

          {/* qty + add */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-4 rounded-sm border border-brass/30 px-3 py-2">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="text-brass hover:text-brass-soft" aria-label="Decrease quantity">
                <Minus size={16} />
              </button>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={qty}
                  initial={{ y: -14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 14, opacity: 0 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="min-w-[2rem] text-center font-serif text-lg text-ivory"
                >
                  {qty}
                </motion.span>
              </AnimatePresence>
              <button onClick={() => setQty((q) => q + 1)} className="text-brass hover:text-brass-soft" aria-label="Increase quantity">
                <Plus size={16} />
              </button>
            </div>

            <motion.button
              onClick={handleAdd}
              whileTap={{ scale: 0.97 }}
              animate={adding ? { backgroundColor: '#2F5D58' } : {}}
              transition={{ duration: 0.3 }}
              className={`btn-brass relative flex-1 min-w-[220px] overflow-hidden ${adding ? '!bg-teal' : ''}`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {adding ? (
                  <motion.span
                    key="added"
                    initial={{ y: 22, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -22, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="flex items-center justify-center gap-2"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.3, 1] }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <Check size={18} />
                    </motion.span>
                    Added to cart
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    initial={{ y: 22, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -22, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="flex items-center justify-center gap-2"
                  >
                    Add to Cart — {formatINR(product.price * qty)}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          <p className="mt-4 text-xs tracking-wide text-ivory-dim/60">
            Free craft-love assembly · Ships in 4–7 days · Gift wrap available
          </p>

          <Link to={`/category/${category.slug}`} className="btn-outline mt-6 inline-flex w-fit items-center gap-2 text-sm">
            <ChevronLeft size={15} />
            Back to {category.name}
          </Link>
        </div>
      </div>

      {/* ---------- Related ---------- */}
      {related.length > 0 && (
        <section className="mt-20">
          <Reveal>
            <p className="font-serif text-sm uppercase tracking-[0.4em] text-brass">You may also love</p>
            <h2 className="section-heading mt-2">Pairs well with</h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-5 pb-4 md:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </motion.main>
  );
}

function DetailRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 text-ivory-dim">
      <span className="grid h-6 w-6 place-items-center text-brass/80">{icon}</span>
      <span className="min-w-[7.5rem] text-ivory-dim/70">{label}</span>
      <span className="font-serif text-ivory">{value}</span>
    </div>
  );
}