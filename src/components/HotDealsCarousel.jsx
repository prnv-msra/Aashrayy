import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HOT_DEALS } from '../lib/data';
import { EASE } from '../lib/utils';
import { ProductCard } from './ProductCard';

export function HotDealsCarousel() {
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const reduced = useReducedMotion();

  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 340, behavior: reduced ? 'auto' : 'smooth' });
  };

  const updateArrows = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="font-serif text-sm uppercase tracking-[0.4em] text-brass">This week only</p>
          <h2 className="section-heading mt-2">Hot Deals</h2>
          <p className="section-sub">Handpicked pieces at deep discounts — while they last.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scrollBy(-1)}
            disabled={!canPrev}
            className="grid h-10 w-10 place-items-center rounded-sm border border-brass/30 text-brass transition-all hover:bg-brass/10 disabled:opacity-30"
            aria-label="Previous deals"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scrollBy(1)}
            disabled={!canNext}
            className="grid h-10 w-10 place-items-center rounded-sm border border-brass/30 text-brass transition-all hover:bg-brass/10 disabled:opacity-30"
            aria-label="Next deals"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={updateArrows}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {HOT_DEALS.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
            className="w-full min-w-[250px] max-w-[270px] snap-start flex-1 shrink-0"
          >
            <ProductCard product={p} index={i} compact />
          </motion.div>
        ))}
      </div>
    </section>
  );
}