import { useRef } from 'react';
import { useScroll, useTransform, motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { EASE } from '../lib/utils';

/* Warli / Madhubani-inspired frieze, drawn as quiet low-opacity SVG lines */
function FolkBackdrop() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <g stroke="#C89B3C" strokeOpacity="0.12" strokeWidth="1.5" fill="none">
        {/* holiday figures */}
        {[90, 190, 290, 390, 490, 590, 690, 790, 890, 990, 1090].map((x, i) => (
          <g key={x} transform={`translate(${x} 120)`}>
            <circle cx={0} cy={28} r={12} />
            <path d="M0 40 L0 88" />
            {i % 2 ? <path d="M-12 52 L12 44 M-12 80 L12 78" /> : <path d="M-12 44 L12 52 M-12 78 L12 80" />}
            {i % 2 ? null : <path d="M-20 40 Q0 8 20 40" />}
          </g>
        ))}
      </g>

      <g stroke="#2F5D58" strokeOpacity="0.14" strokeWidth="1.5" fill="none">
        {/* fishes */}
        {[160, 260, 360, 460, 560, 660, 760, 860, 960, 1060].map((x, i) => (
          <g key={x} transform={`translate(${x} 520)`}>
            <path d="M0 0 Q16 -16 34 0 Q16 16 0 0Z" />
            <path d={`M34 0 L${44 + (i % 2) * 6} ${i % 2 ? -12 : 12}`} />
          </g>
        ))}
      </g>

      <g stroke="#E3C580" strokeOpacity="0.1" strokeWidth="2.5" fill="none">
        {/* the rising sun */}
        <circle cx="600" cy="160" r="54" />
        <path d="M600 92 L600 52 M600 228 L600 268 M532 160 L492 160 M668 160 L708 160" />
      </g>

      {/* ground / border bands */}
      <path d="M0 610 H1200" stroke="#C89B3C" strokeOpacity="0.16" strokeWidth="2" />
      <path d="M0 560 H1200" stroke="#2F5D58" strokeOpacity="0.12" strokeWidth="1" />
      <path d="M0 250 H1200" stroke="#5A241F" strokeOpacity="0.12" strokeWidth="1" />
    </svg>
  );
}

export function Hero() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '34%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[86vh] items-center justify-center overflow-hidden">
      {/* drifting folk backdrop (scroll parallax on outer, slow drift on inner) */}
      <motion.div
        className="absolute -inset-x-0 -inset-y-8"
        style={{ y }}
      >
        <motion.div
          className="absolute inset-0 madhubani-bg"
          animate={reduced ? undefined : { x: [0, 26, 0], y: [0, 14, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FolkBackdrop />
        </motion.div>
      </motion.div>

      {/* soft edge vignettes */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,#0B0A1C_105%)]" />

      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 flex max-w-3xl flex-col items-center px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="font-serif text-sm uppercase tracking-[0.5em] text-brass/90"
        >
          Folk art · Textiles · Light
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          className="mt-6 font-display text-5xl leading-[1.05] text-ivory md:text-7xl"
        >
          आश्रय
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.22, ease: EASE }}
          className="mt-5 max-w-xl font-serif text-xl italic leading-relaxed text-ivory-dim md:text-2xl"
        >
          A home that holds you — crafted decor, block-printed textiles, stories on every shelf.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.34, ease: EASE }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <Link to="/category/textiles" className="btn-brass group inline-flex items-center gap-2">
            Shop Textiles
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link to="/deals" className="btn-outline">Top Deals</Link>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={reduced ? undefined : { y: [0, 10, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="h-12 w-6 rounded-full border border-brass/40"
        >
          <motion.div
            animate={reduced ? undefined : { y: [4, 16, 4] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="mx-auto mt-2 h-1.5 w-1.5 rounded-full bg-brass"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}