import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { EASE } from '../lib/utils';

/* Ambient drifting smoke + embers */
function Atmosphere() {
  const reduced = useReducedMotion();
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[
        { left: '12%', top: '22%', size: 420, dur: 18, delay: 0, o: 0.1 },
        { left: '58%', top: '34%', size: 520, dur: 22, delay: 2, o: 0.12 },
        { left: '32%', top: '56%', size: 360, dur: 16, delay: 4, o: 0.08 },
        { left: '72%', top: '64%', size: 300, dur: 20, delay: 1, o: 0.09 },
      ].map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            opacity: s.o,
            background: 'radial-gradient(circle, rgba(200,155,60,0.7) 0%, rgba(20,18,42,0) 70%)',
          }}
          animate={reduced ? undefined : { x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

function Stars() {
  const stars = useMemo(
    () =>
      Array.from({ length: 60 }).map((_, i) => ({
        left: (i * 61) % 100,
        top: (i * 37) % 100,
        s: 0.6 + ((i * 13) % 10) / 8,
        delay: ((i * 7) % 50) / 10,
      })),
    [],
  );
  return (
    <div className="pointer-events-none absolute inset-0">
      {stars.map((st, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-ivory"
          style={{ left: `${st.left}%`, top: `${st.top}%`, width: st.s, height: st.s, opacity: 0.4 }}
          animate={{ opacity: [0.15, 0.6, 0.15] }}
          transition={{ duration: 4, delay: st.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/* The vapor-text effect: feTurbulence displacement driven by GSAP so the
   letters coalesce out of a blurred field of smoke. */
export default function Welcome() {
  const navigate = useNavigate();
  const reduced = useReducedMotion();

  const [textReady, setTextReady] = useState(reduced);
  const [doorOpen, setDoorOpen] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const turbRef = useRef(null);
  const dispRef = useRef(null);
  const resolved = useRef(false);

  const enter = useCallback(() => {
    if (leaving) return;
    setLeaving(true);
    setDoorOpen(true);
    setTimeout(() => navigate('/home'), 1050);
  }, [leaving, navigate]);

  /* Coalesce the mark out of smoke */
  useEffect(() => {
    if (reduced) return;
    const turb = turbRef.current;
    const disp = dispRef.current;
    if (!turb || !disp) return;

    // state drives baseFrequency (f) and displacement scale (s)
    const state = { f: 0.028, s: 320 };
    const setFilter = () => {
      turb.setAttribute('baseFrequency', `${state.f} ${state.f}`);
      disp.setAttribute('scale', state.s.toFixed(1));
    };
    setFilter();

    const tl = gsap.timeline({
      onComplete: () => {
        resolved.current = true;
        setTextReady(true);
      },
    });
    tl.to(state, {
      s: 22,
      f: 0.004,
      duration: 2.6,
      ease: 'power3.inOut',
      onUpdate: setFilter,
      delay: 0.35,
    });
    return () => tl.kill();
  }, [reduced]);

  /* Fallback: if no click within 9s once the text settles, walk in anyway */
  useEffect(() => {
    if (textReady && reduced) {
      const wake = setTimeout(enter, 4200);
      return () => clearTimeout(wake);
    }
    if (textReady) {
      const wake = setTimeout(enter, 9000);
      return () => clearTimeout(wake);
    }
  }, [textReady, enter, reduced]);

  const leafOpen = doorOpen || leaving;

  return (
    <motion.div
      className="relative flex min-h-screen w-full select-none flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at 50% 28%, #221F42 0%, #14122A 45%, #0B0A1C 100%)',
      }}
      exit={{ opacity: 0, scale: 1.04, transition: { duration: 1.1, ease: EASE } }}
    >
      <Stars />
      <Atmosphere />

      {/* ===================== Vapor brand ===================== */}
      <motion.div
        className="relative z-10 text-center"
        animate={reduced ? undefined : { opacity: [0, 0.55, 1] }}
        transition={{ duration: 2.4, times: [0, 0.14, 1], ease: 'easeOut' }}
      >
        <svg
          className="mx-auto h-[34vh] min-h-[190px] w-auto max-w-[92vw]"
          viewBox="0 0 560 200"
          aria-label="Aashray"
        >
          <defs>
            <filter id="vapor" x="-30%" y="-60%" width="160%" height="220%">
              <feTurbulence
                ref={turbRef}
                type="fractalNoise"
                baseFrequency="0.028 0.028"
                numOctaves="3"
                seed="7"
                result="noise"
              />
              <feDisplacementMap
                ref={dispRef}
                in="SourceGraphic"
                in2="noise"
                scale="320"
                xChannelSelector="R"
                yChannelSelector="G"
              />
              <feGaussianBlur stdDeviation="1.4" />
            </filter>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="textGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F3E8D8" />
              <stop offset="55%" stopColor="#E3C580" />
              <stop offset="100%" stopColor="#C89B3C" />
            </linearGradient>
          </defs>

          <g filter="url(#glow)">
            <text
              x="50%"
              y="62%"
              textAnchor="middle"
              fontFamily="'Yatra One', serif"
              fontSize="74"
              fill="url(#textGrad)"
              filter={reduced ? undefined : 'url(#vapor)'}
            >
              आश्रय
            </text>
          </g>
        </svg>

        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.2em' }}
          animate={{ opacity: 1, letterSpacing: '0.45em' }}
          transition={{ duration: 1.4, delay: reduced ? 0.4 : 2.6, ease: EASE }}
          className="mt-1 font-serif text-base uppercase text-brass-soft md:text-xl"
          style={{ paddingLeft: '0.45em' }}
        >
          A a s h r a y
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: reduced ? 0.9 : 3.2, ease: EASE }}
          className="mt-3 font-serif text-sm italic tracking-[0.18em] text-ivory-dim md:text-base"
        >
          तुम्हारे घर की ओर · the way home
        </motion.p>
      </motion.div>

      {/* ===================== Doorway ===================== */}
      <div className="relative z-10 mt-[6vh]">
        <div className="relative mx-auto h-[36vh] max-h-80 w-[46vw] max-w-md" style={{ perspective: '1600px' }}>
          {/* warm light behind the leaves */}
          <motion.div
            className="absolute inset-0 rounded-[5px_5px_50px_50px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ duration: 1.6, delay: reduced ? 0.5 : 2.9 }}
            style={{ background: 'radial-gradient(circle at 50% 46%, #F4D9A0 0%, #E3A85C 30%, #7A4A28 62%, #2A160E 100%)' }}
          />

          {/* brass frame */}
          <motion.div
            className="absolute -inset-2 rounded-[6px_6px_70px_70px] border-[3px] border-brass"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, delay: reduced ? 0.5 : 2.9 }}
            style={{ boxShadow: '0 0 0 1px rgba(200,155,60,0.25), 0 0 60px rgba(200,155,60,0.18)' }}
          />

          {/* left leaf */}
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 rounded-l-[4px] border-r-2 border-night-deep/50"
            style={{
              transformOrigin: 'left center',
              background: 'repeating-linear-gradient(90deg, #5A241F 0 3px, #3E1815 3px 6px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotateY: leafOpen ? -112 : 0 }}
            transition={{
              opacity: { duration: 1, delay: reduced ? 0.6 : 2.9 },
              rotateY: { duration: 1.3, ease: EASE },
            }}
          >
            <div
              className="absolute inset-[8%] rounded-sm"
              style={{
                backgroundImage: [
                  'radial-gradient(circle at 50% 18%, transparent 0 8px, #C89B3C 8.5px, #C89B3C 10px, transparent 10.5px)',
                  'repeating-linear-gradient(0deg, transparent 0 26px, rgba(200,155,60,0.4) 26px 27px)',
                  'repeating-linear-gradient(90deg, transparent 0 34px, rgba(200,155,60,0.25) 34px 35px)',
                ].join(','),
                mixBlendMode: 'screen',
                opacity: 0.5,
              }}
            />
            <span
              className="absolute top-1/2 right-4 h-3.5 w-3.5 rounded-full"
              style={{ background: 'radial-gradient(circle at 35% 35%, #E3C580, #C89B3C 70%, #8a6420)', boxShadow: '0 0 10px rgba(200,155,60,0.6)' }}
            />
          </motion.div>

          {/* right leaf */}
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 rounded-r-[4px] border-l-2 border-night-deep/50"
            style={{
              transformOrigin: 'right center',
              background: 'repeating-linear-gradient(90deg, #5A241F 0 3px, #3E1815 3px 6px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotateY: leafOpen ? 112 : 0 }}
            transition={{
              opacity: { duration: 1, delay: reduced ? 0.6 : 2.9 },
              rotateY: { duration: 1.3, ease: EASE },
            }}
          >
            <div
              className="absolute inset-[8%] rounded-sm"
              style={{
                backgroundImage: [
                  'radial-gradient(circle at 50% 18%, transparent 0 8px, #C89B3C 8.5px, #C89B3C 10px, transparent 10.5px)',
                  'repeating-linear-gradient(0deg, transparent 0 26px, rgba(200,155,60,0.4) 26px 27px)',
                  'repeating-linear-gradient(90deg, transparent 0 34px, rgba(200,155,60,0.25) 34px 35px)',
                ].join(','),
                mixBlendMode: 'screen',
                opacity: 0.5,
              }}
            />
            <span
              className="absolute top-1/2 left-4 h-3.5 w-3.5 rounded-full"
              style={{ background: 'radial-gradient(circle at 35% 35%, #E3C580, #C89B3C 70%, #8a6420)', boxShadow: '0 0 10px rgba(200,155,60,0.6)' }}
            />
          </motion.div>
        </div>

        {/* tap to enter */}
        <motion.div
          className="mt-6 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: textReady ? 1 : 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <motion.button
            onClick={enter}
            disabled={leaving}
            className="btn-outline disabled:pointer-events-none"
            animate={!leaving ? { y: [0, -4, 0] } : undefined}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            द्वार खोलो · Enter
          </motion.button>
          <p className="text-xs uppercase tracking-[0.35em] text-ivory-dim/60">
            All doors open, in time
          </p>
        </motion.div>
      </div>

      {/* dissolve mask out at the very end */}
      {leaving && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeIn' }}
          style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, #0B0A1C 90%)' }}
        />
      )}
    </motion.div>
  );
}