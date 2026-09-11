import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HOT_DEALS } from '../lib/data';
import { ProductCard } from '../components/ProductCard';
import { Stagger, StaggerItem } from '../components/Reveal';

/* Countdown to a fixed end-of-season moment: 5 days from mount. */
function useCountdown() {
  const [target] = useState(() => Date.now() + 1000 * 60 * 60 * 24 * 5 + 1000 * 60 * 47);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const diff = Math.max(0, target - now);
  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor((diff % 86_400_000) / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  return [
    { label: 'Days', value: d },
    { label: 'Hours', value: h },
    { label: 'Minutes', value: m },
    { label: 'Seconds', value: s },
  ];
}

export default function Deals() {
  const units = useCountdown();

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Countdown banner */}
      <section className="relative overflow-hidden border-b border-brass/15">
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, #3E1815 0%, #14122A 70%)' }}
        />
        <div className="madhubani-bg absolute inset-0 opacity-40" />

        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 py-16 text-center md:py-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-sm uppercase tracking-[0.5em] text-brass"
          >
            Seasonal harvest sale
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 font-display text-4xl text-ivory md:text-6xl"
          >
            Top Deals
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-3 max-w-xl font-serif text-lg italic text-ivory-dim"
          >
            Eight pieces chosen this week — deeper than usual, gone when the clock turns over.
          </motion.p>

          <div className="mt-8 grid grid-cols-4 gap-3 md:gap-4">
            {units.map((u, i) => (
              <motion.div
                key={u.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="min-w-[64px] rounded-lg border border-brass/25 bg-night-deep/60 px-4 py-3"
              >
                <p
                  key={u.value}
                  className="font-display text-2xl text-brass-soft tabular-nums md:text-4xl"
                >
                  {String(u.value).padStart(2, '0')}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-ivory-dim">{u.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deal cards */}
      <section className="mx-auto max-w-7xl px-4 py-14 md:px-8">
        <Stagger className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-4" stagger={0.06}>
          {HOT_DEALS.map((p, i) => (
            <StaggerItem key={p.id}>
              <ProductCard product={p} index={i} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </motion.main>
  );
}