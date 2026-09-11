import { motion } from 'framer-motion';
import { EASE } from '../lib/utils';

/* A tasteful kalamkari-inspired fabric using layered CSS gradients.
   Deep teal ground, hand-blocked border motifs, soft rust blooms. */
function kalamkariStyle() {
  return {
    background: `
      linear-gradient(90deg, rgba(20,18,42,0.25) 0 2px, transparent 2px) 0 0 / 48px 100%,
      radial-gradient(circle at 18px 24px, rgba(227,197,128,0.16) 2px 4px, transparent 4.5px) 0 0 / 96px 96px,
      radial-gradient(circle at 72px 72px, rgba(200,155,60,0.1) 3px 5px, transparent 5.5px) 0 0 / 96px 96px,
      radial-gradient(ellipse at 50% 40%, rgba(90,36,31,0.35) 0 30%, transparent 60%) ,
      repeating-linear-gradient(0deg, transparent 0 6px, rgba(47,93,88,0.12) 6px 7px, transparent 7px 18px),
      linear-gradient(160deg, #1E3A36 0%, #2F5D58 40%, #1d3f3b 100%)
    `,
  };
}

/* Scalloped bottom edge, like a hand-finished curtain hem */
const SCALLOP =
  'polygon(0 0, 100% 0, 100% calc(100% - 22px), 96% 100%, 92% calc(100% - 22px), 88% 100%, 84% calc(100% - 22px), 80% 100%, 76% calc(100% - 22px), 72% 100%, 68% calc(100% - 22px), 64% 100%, 60% calc(100% - 22px), 56% 100%, 52% calc(100% - 22px), 48% 100%, 44% calc(100% - 22px), 40% 100%, 36% calc(100% - 22px), 32% 100%, 28% calc(100% - 22px), 24% 100%, 20% calc(100% - 22px), 16% 100%, 12% calc(100% - 22px), 8% 100%, 4% calc(100% - 22px), 0 100%)';

const DURATIONS = {
  curtains: 3.1,
  book: 2.6,
  gallery: 2.8,
  shelf: 2.9,
  wipe: 2.0,
};

/* ------------------------------------------------------------------ */
/* 1. HOME TEXTILES — kalamkari curtain panels slide open              */
/* ------------------------------------------------------------------ */
export function CurtainReveal({ onComplete, accent }) {
  return (
    <motion.div
      className="fixed inset-0 z-[60] overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: EASE } }}
    >
      {/* dusk backdrop behind the closed curtains */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 40%, ${accent}66 0%, #0B0A1C 70%)`,
        }}
      />

      {/* brass rod */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute left-0 right-0 top-6 h-2 bg-gradient-to-r from-brass/70 via-brass-soft to-brass/70"
        style={{ boxShadow: '0 6px 18px rgba(200,155,60,0.4)' }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 1, 0] }}
        transition={{ duration: DURATIONS.curtains, times: [0, 0.2, 0.7, 0.9, 1] }}
        className="absolute left-8 md:left-16 top-6 flex items-center gap-3"
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className="block h-2.5 w-8 rounded-t-full bg-gradient-to-b from-brass-soft to-brass"
          />
        ))}
      </motion.div>

      {/* left curtain with pleats + rings */}
      <motion.div
        className="absolute inset-y-0 left-0 w-[52%]"
        style={{ clipPath: SCALLOP, ...kalamkariStyle(), boxShadow: 'inset -18px 0 40px rgba(0,0,0,0.55)' }}
        initial={{ x: 0 }}
        animate={{ x: '-104%' }}
        transition={{ duration: 1.8, ease: EASE, delay: 1.15 }}
        onAnimationComplete={() => onComplete?.()}
      >
        <div className="absolute top-8 right-6 left-6 grid grid-cols-4 gap-1 opacity-70">
          {Array.from({ length: 20 }).map((_, i) => (
            <span
              key={i}
              className="h-1.5 rounded-t"
              style={{
                background: i % 2 ? 'rgba(200,155,60,0.5)' : 'rgba(227,197,128,0.4)',
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* right curtain — mirrored pattern */}
      <motion.div
        className="absolute inset-y-0 right-0 w-[52%]"
        style={{
          clipPath: SCALLOP,
          background: `
            linear-gradient(270deg, rgba(20,18,42,0.25) 0 2px, transparent 2px) 0 0 / 48px 100%,
            radial-gradient(circle at 78px 24px, rgba(227,197,128,0.16) 2px 4px, transparent 4.5px) 0 0 / 96px 96px,
            radial-gradient(circle at 24px 72px, rgba(200,155,60,0.1) 3px 5px, transparent 5.5px) 0 0 / 96px 96px,
            radial-gradient(ellipse at 50% 40%, rgba(90,36,31,0.35) 0 30%, transparent 60%) ,
            repeating-linear-gradient(0deg, transparent 0 6px, rgba(47,93,88,0.12) 6px 7px, transparent 7px 18px),
            linear-gradient(160deg, #1E3A36 0%, #2F5D58 40%, #1d3f3b 100%)`,
          boxShadow: 'inset 18px 0 40px rgba(0,0,0,0.55)',
        }}
        initial={{ x: 0 }}
        animate={{ x: '104%' }}
        transition={{ duration: 1.8, ease: EASE, delay: 1.15 }}
      >
        <div className="absolute top-8 right-6 left-6 grid grid-cols-4 gap-1 opacity-70">
          {Array.from({ length: 20 }).map((_, i) => (
            <span
              key={i}
              className="h-1.5 rounded-t"
              style={{
                background: i % 2 ? 'rgba(200,155,60,0.5)' : 'rgba(227,197,128,0.4)',
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Title card */}
      <motion.div
        className="absolute inset-0 grid place-items-center"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: [0, 1, 1, 0], y: [14, 0, 0, -10] }}
        transition={{ duration: DURATIONS.curtains, times: [0, 0.15, 0.75, 0.95], ease: EASE }}
      >
        <div className="text-center">
          <p className="font-display text-4xl md:text-6xl text-ivory drop-shadow-lg">वस्त्र</p>
          <p className="mt-3 font-serif text-sm uppercase tracking-[0.45em] text-brass-soft">
            Home Textiles — pulling the curtains
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. BOOKS — a hardcover opens to reveal the page                      */
/* ------------------------------------------------------------------ */
export function BookReveal({ onComplete, accent }) {
  return (
    <motion.div
      className="fixed inset-0 z-[60] grid place-items-center overflow-hidden"
      exit={{ opacity: 0, transition: { duration: 0.5, ease: EASE } }}
    >
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse at 50% 50%, ${accent}55 0%, #0B0A1C 75%)` }}
      />

      <motion.div
        className="relative h-[62vh] w-[86vw] max-w-3xl"
        style={{ perspective: '1800px' }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {/* spine */}
        <div className="absolute left-1/2 top-0 h-full w-3 -translate-x-1/2 bg-wood-dark" style={{ boxShadow: '0 0 24px rgba(0,0,0,0.5)' }} />

        {/* right side — the pages */}
        <motion.div
          className="absolute inset-y-0 right-0 w-1/2"
          style={{ transformOrigin: 'left center', background: 'repeating-linear-gradient(90deg, #F3E8D8 0 2px, #E8DABF 2px 4px)' }}
          initial={{ rotateY: 0 }}
          animate={{ rotateY: 178 }}
          transition={{ duration: 1.5, ease: EASE, delay: 0.55 }}
          onAnimationComplete={() => onComplete?.()}
        >
          <p className="absolute inset-x-0 top-[14%] text-center font-serif text-[min(4vw,3rem)] font-semibold text-wood-dark">
            पुस्तकें
          </p>
          <p className="absolute inset-x-0 bottom-[14%] text-center font-serif text-[min(2vw,1rem)] uppercase tracking-[0.35em] text-wood-dark/60">
            Books · inside these walls
          </p>
        </motion.div>

        {/* left side — the cover */}
        <motion.div
          className="absolute inset-y-0 left-0 w-1/2 rounded-l-md border-r border-wood-dark p-6"
          style={{
            transformOrigin: 'right center',
            background: 'linear-gradient(160deg, #5A241F 0%, #3E1815 60%, #2a120f 100%)',
            boxShadow: 'inset -14px 0 28px rgba(0,0,0,0.45)',
          }}
          initial={{ rotateY: 0 }}
          animate={{ rotateY: -178 }}
          transition={{ duration: 1.5, ease: EASE, delay: 0.55 }}
        >
          <div
            className="absolute inset-0 m-[6%] rounded border border-brass/40"
            style={{ boxShadow: 'inset 0 0 0 1px rgba(200,155,60,0.2)' }}
          />
          <div className="absolute inset-x-0 top-[18%] text-center">
            <p className="font-display text-[min(6vw,4.5rem)] text-brass-soft drop-shadow">आश्रय</p>
            <p className="mt-1 font-serif text-[min(2.5vw,1.2rem)] uppercase tracking-[0.5em] text-brass">Aashray</p>
          </div>
          <p className="absolute inset-x-0 bottom-[10%] text-center font-serif italic text-brass/80">
            Every story finds a home
          </p>
        </motion.div>

        {/* title overlay that dissolves as the book opens */}
        <motion.div
          className="absolute inset-x-0 bottom-[30%] left-1/2 z-10 w-full -translate-x-1/2 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: [0, 1, 0], y: [10, 0, -14] }}
          transition={{ duration: 1.9, times: [0, 0.2, 0.75], ease: EASE }}
        >
          <p className="font-serif text-2xl md:text-3xl font-semibold text-ivory">Books</p>
        </motion.div>

        {/* book scales down & dissolves into the listing */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: [0, 0, 1], scale: [1, 1, 0.88] }}
          transition={{ duration: 2.1, times: [0, 0.62, 1], ease: EASE }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* 3. ARTWORK — a gallery wall wakes, frame by frame                    */
/* ------------------------------------------------------------------ */
const FRAMES = [
  { top: '10%', left: '8%', w: 130, h: 170 },
  { top: '22%', left: '28%', w: 150, h: 110 },
  { top: '8%', left: '52%', w: 110, h: 150 },
  { top: '30%', left: '72%', w: 140, h: 130 },
  { top: '58%', left: '12%', w: 120, h: 150 },
  { top: '54%', left: '38%', w: 160, h: 115 },
  { top: '62%', left: '64%', w: 110, h: 150 },
  { top: '14%', left: '84%', w: 90, h: 120 },
];

export function GalleryReveal({ onComplete }) {
  return (
    <motion.div
      className="fixed inset-0 z-[60] overflow-hidden"
      exit={{ opacity: 0, transition: { duration: 0.55, ease: EASE } }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 55% 42%, #241f45 0%, #0B0A1C 82%)`,
        }}
      />
      {/* warm gallery wall paper */}
      <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent 0 46px, rgba(200,155,60,0.08) 46px 48px), repeating-linear-gradient(90deg, transparent 0 46px, rgba(200,155,60,0.08) 46px 48px)' }} />

      {/* light sweep — "lights on" */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-brass-soft/30 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0], x: ['-60%', '0%', '60%'] }}
        transition={{ duration: 2.4, times: [0, 0.3, 0.7, 1], ease: 'easeInOut' }}
        style={{ transform: 'skewX(-18deg) scale(1.4)' }}
      />

      {FRAMES.map((f, i) => (
        <motion.div
          key={i}
          className="absolute rounded-sm"
          style={{
            width: f.w,
            height: f.h,
            top: f.top,
            left: f.left,
            border: '3px solid #C89B3C',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(227,197,128,0.3), 0 0 22px rgba(200,155,60,0.15)',
            background: `radial-gradient(circle at 50% 40%, #2F5D5855, #14122A), url("https://picsum.photos/seed/frame${i}/${f.w + 20}/${f.h + 20}") center / cover`,
          }}
          initial={{ opacity: 0, scale: 0.85, rotate: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0.85, 1, 1, 0.96],
            rotate: [0, i % 2 ? 1.5 : -1.5, i % 2 ? 1.5 : -1.5, 0],
          }}
          transition={{
            duration: 2.6,
            times: [0, 0.14, 0.82, 1],
            delay: 0.12 * i,
            ease: EASE,
          }}
          onAnimationComplete={() => i === FRAMES.length - 1 && onComplete?.()}
        />
      ))}

      <motion.div
        className="absolute inset-0 grid place-items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0], y: [12, 0, 0, -10] }}
        transition={{ duration: 2.6, times: [0, 0.12, 0.8, 1], ease: EASE }}
      >
        <div className="bg-night-deep/60 px-10 py-5 text-center backdrop-blur-sm">
          <p className="font-display text-3xl md:text-5xl text-ivory">कला</p>
          <p className="mt-2 font-serif text-sm uppercase tracking-[0.45em] text-brass-soft">The gallery wakes</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* 4. LIFESTYLE — objects settle onto a shelf, one by one               */
/* ------------------------------------------------------------------ */
const SHELF_ITEMS = [
  { left: '8%', w: 70, h: 130, kind: 'vase', tint: '#8A4539', r: 18 },
  { left: '23%', w: 84, h: 64, kind: 'lamp', tint: '#C89B3C', r: 12 },
  { left: '40%', w: 110, h: 80, kind: 'clock', tint: '#3E7B74', r: 40 },
  { left: '58%', w: 60, h: 140, kind: 'vase', tint: '#8A6B3C', r: 14 },
  { left: '72%', w: 92, h: 70, kind: 'book', tint: '#5A241F', r: 8 },
  { left: '86%', w: 70, h: 120, kind: 'plant', tint: '#2F5D58', r: 14 },
];

export function ShelfReveal({ onComplete, accent }) {
  return (
    <motion.div
      className="fixed inset-0 z-[60] overflow-hidden"
      exit={{ opacity: 0, transition: { duration: 0.55, ease: EASE } }}
    >
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse at 50% 42%, ${accent}4d 0%, #0B0A1C 78%)` }}
      />

      {/* shelf */}
      <motion.div
        className="absolute left-1/2 top-[56%] h-4 w-[82vw] max-w-3xl -translate-x-1/2 rounded-sm"
        style={{
          background: 'linear-gradient(180deg, #5A241F 0%, #3E1815 55%, #2a120f 100%)',
          boxShadow: '0 14px 30px rgba(0,0,0,0.5)',
        }}
        initial={{ opacity: 0, scaleX: 0.6 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
      />

      {SHELF_ITEMS.map((item, i) => (
        <motion.div
          key={i}
          className="absolute flex flex-col items-center justify-end"
          style={{ left: item.left, width: item.w, bottom: 'calc(44% + 4px)' }}
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 180,
            damping: 17,
            delay: 0.55 + i * 0.13,
          }}
        >
          <div
            className="w-full"
            style={{
              height: item.h,
              borderRadius: item.r,
              background: `linear-gradient(180deg, ${item.tint} 0%, rgba(0,0,0,0.35) 130%)`,
              boxShadow: `0 10px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(243,232,216,0.25)`,
              opacity: 1,
            }}
          />
        </motion.div>
      ))}

      {/* title dissolve */}
      <motion.div
        className="absolute inset-x-0 bottom-[4%] text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -8] }}
        transition={{ duration: 2.8, times: [0, 0.1, 0.8, 1], ease: EASE }}
        onAnimationComplete={() => onComplete?.()}
      >
        <p className="font-display text-3xl md:text-5xl text-ivory">सजावट</p>
        <p className="mt-2 font-serif text-sm uppercase tracking-[0.45em] text-brass-soft">
          Every object finds its place
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* 5. ELECTRONICS — a clean, minimal wipe                               */
/* ------------------------------------------------------------------ */
export function WipeReveal({ onComplete, accent }) {
  return (
    <motion.div
      className="fixed inset-0 z-[60] overflow-hidden"
      exit={{ opacity: 0, transition: { duration: 0.4, ease: EASE } }}
    >
      {/* leading wave of light */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'repeating-linear-gradient(90deg, transparent 0 3px, rgba(200,155,60,0.18) 3px 6px)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.9, times: [0, 0.15, 0.7, 1] }}
      />

      {/* the wipe engine — a wide panel sweeping right to left */}
      <motion.div
        className="absolute inset-y-0 right-0 w-[160%] flex items-center"
        style={{
          background: `linear-gradient(269deg, #101226 0%, #1E1B3A 55%, ${accent}33 100%)`,
        }}
        initial={{ x: '0%' }}
        animate={{ x: '-128%' }}
        transition={{ duration: 1.5, ease: EASE, delay: 0.35 }}
        onAnimationComplete={() => onComplete?.()}
      >
        <div
          className="absolute inset-y-0 left-[16%] w-[3px]"
          style={{ background: 'linear-gradient(180deg, transparent, #E3C580, transparent)', boxShadow: '0 0 26px rgba(200,155,60,0.8)' }}
        />
      </motion.div>

      {/* label sits on top, wipes away with it */}

      <motion.div
        className="absolute inset-0 grid place-items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0], x: [30, 0, 0, -40] }}
        transition={{ duration: 1.85, times: [0, 0.16, 0.62, 1], ease: EASE }}
      >
        <div className="text-center">
          <p className="font-display text-4xl md:text-6xl text-ivory">इलेक्ट्रॉनिक्स</p>
          <p className="mt-3 font-serif text-sm uppercase tracking-[0.5em] text-brass-soft">
            Quietly modern
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function CategoryTransition({ type, onComplete, accent }) {
  const map = {
    curtains: CurtainReveal,
    book: BookReveal,
    gallery: GalleryReveal,
    shelf: ShelfReveal,
    wipe: WipeReveal,
  };
  const Comp = map[type] || CurtainReveal;
  return <Comp key={type} onComplete={onComplete} accent={accent} />;
}

export const TRANSITION_DURATIONS = DURATIONS;