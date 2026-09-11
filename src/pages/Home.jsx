import { motion } from 'framer-motion';
import { Hero } from '../components/Hero';
import { HotDealsCarousel } from '../components/HotDealsCarousel';
import { CategoryGrid } from '../components/CategoryGrid';
import { Reveal } from '../components/Reveal';

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />

      <Reveal>
        <HotDealsCarousel />
      </Reveal>

      <CategoryGrid />

      {/* CTA band */}
      <section className="mx-auto max-w-7xl px-4 pb-8 md:px-8">
        <Reveal>
          <div className="folk-border relative overflow-hidden rounded-lg border-2 bg-gradient-to-br from-night-mid via-night to-night-deep px-8 py-14 text-center">
            <div className="madhubani-bg absolute inset-0 opacity-60" />
            <p className="relative font-serif text-sm uppercase tracking-[0.45em] text-brass">Aashray · आश्रय</p>
            <h2 className="relative mt-4 font-display text-3xl text-ivory md:text-5xl">
              Every object here has a place
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl font-serif text-lg italic text-ivory-dim">
              Browse by category, watch the curtains part for Home Textiles, and build the home that holds you.
            </p>
          </div>
        </Reveal>
      </section>
    </motion.main>
  );
}