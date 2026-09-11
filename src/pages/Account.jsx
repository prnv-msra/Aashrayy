import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, LogOut, Package, User } from 'lucide-react';
import { EASE, formatINR } from '../lib/utils';

const MOCK_ORDERS = [
  { id: 'AASH-2024-0137', date: '02 Sep 2026', items: 'Kalamkari Curtain Pair × 1', total: 6499, status: 'Delivered' },
  { id: 'AASH-2024-0112', date: '18 Aug 2026', items: 'Ajrakh Cushion Covers × 1 · WarmGlow Smart Lamp × 1', total: 9498, status: 'In transit' },
  { id: 'AASH-2024-0098', date: '01 Aug 2026', items: 'The God of Small Things × 1', total: 449, status: 'Delivered' },
];

export default function Account() {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [tab, setTab] = useState('orders');

  const submit = (e) => {
    e.preventDefault();
    setName(name || 'Aashray Guest');
    setLoggedIn(true);
  };

  /* ---------- Signed in view ---------- */
  if (loggedIn) {
    return (
      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="mx-auto min-h-screen max-w-5xl px-4 pt-10 md:px-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-full border border-brass/40 bg-gradient-to-br from-brass/20 to-night-mid text-brass">
              <User size={26} />
            </div>
            <div>
              <h1 className="font-display text-3xl text-ivory">नमस्ते, {name.split(' ')[0]}</h1>
              <p className="font-serif text-ivory-dim italic">Welcome back to your Aashray.</p>
            </div>
          </div>
          <button
            onClick={() => setLoggedIn(false)}
            className="btn-outline flex items-center gap-2 text-sm"
          >
            <LogOut size={15} /> Sign out
          </button>
        </div>

        {/* tabs */}
        <div className="mt-10 flex gap-1 border-b border-brass/10">
          {[
            { id: 'orders', label: 'Orders', icon: <Package size={15} /> },
            { id: 'profile', label: 'Profile', icon: <User size={15} /> },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 font-serif text-base transition-colors ${
                tab === t.id ? 'border-brass text-brass-soft' : 'border-transparent text-ivory-dim hover:text-ivory'
              }`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="py-6"
          >
            {tab === 'orders' ? (
              <div className="flex flex-col gap-4">
                {MOCK_ORDERS.map((o) => (
                  <div key={o.id} className="flex flex-wrap items-center gap-4 rounded-lg border border-brass/10 bg-night-mid/40 p-4">
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-teal/15 text-teal-light">
                      <Box size={20} />
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <p className="font-serif font-semibold text-ivory">{o.id}</p>
                      <p className="text-sm text-ivory-dim/80">{o.date} · {o.items}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-serif font-semibold text-brass-soft">{formatINR(o.total)}</p>
                      <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs ${o.status === 'Delivered' ? 'bg-teal/20 text-teal-light' : 'bg-brass/20 text-brass-soft'}`}>
                        {o.status}
                      </span>
                    </div>
                  </div>
                ))}
                <p className="pt-2 text-center text-xs text-ivory-dim/60">
                  Demo data — orders are illustrative only.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ['Name', name],
                  ['Email', `${name.toLowerCase().replace(/\s+/g, '.')}@aashray.demo`],
                  ['Member since', 'March 2026'],
                  ['Saved addresses', 'Home · B-402, The Gulmohars, Pune'],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-lg border border-brass/10 bg-night-mid/40 p-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-brass/70">{k}</p>
                    <p className="mt-1 font-serif text-lg text-ivory">{v}</p>
                  </div>
                ))}
                <div className="rounded-lg border border-brass/15 bg-gradient-to-br from-brass/15 to-night-mid p-4 sm:col-span-2">
                  <p className="font-display text-xl text-ivory">आश्रय मित्र</p>
                  <p className="mt-1 font-serif text-ivory-dim italic">You’ve earned 1,250 refuge points on this account.</p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.main>
    );
  }

  /* ---------- Login / signup flip card ---------- */
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="relative mx-auto flex min-h-screen items-center justify-center overflow-hidden px-4 py-16"
    >
      <div className="madhubani-bg pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative w-full max-w-md" style={{ perspective: '1600px' }}>
        <motion.div
          animate={{ rotateY: mode === 'signup' ? 180 : 0 }}
          transition={{ duration: 0.85, ease: EASE }}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative min-h-[480px]"
        >
          {/* ------- Login (front) ------- */}
          <div
            style={{ backfaceVisibility: 'hidden' }}
            className="absolute inset-0 flex flex-col rounded-xl border border-brass/20 bg-night-mid/80 p-8 shadow-2xl shadow-black/40 backdrop-blur"
          >
            <p className="font-display text-3xl text-ivory">आश्रय</p>
            <p className="mt-1 font-serif text-xs uppercase tracking-[0.35em] text-brass/80">Welcome back</p>

            <form onSubmit={submit} className="mt-8 flex flex-1 flex-col gap-4">
              <input required className="input-field" placeholder="Email address" type="email" />
              <input required className="input-field" placeholder="Password" type="password" />
              <div className="flex items-center justify-between text-sm text-ivory-dim">
                <label className="flex cursor-pointer items-center gap-2">
                  <input type="checkbox" className="accent-[#C89B3C]" defaultChecked /> Keep me signed in
                </label>
                <button type="button" className="hover:text-brass-soft">Forgot?</button>
              </div>
              <button className="btn-brass mt-2 w-full">Log in</button>
            </form>

            <p className="mt-auto pt-6 text-center font-serif text-sm text-ivory-dim">
              New to Aashray?{' '}
              <button onClick={() => setMode('signup')} className="font-semibold text-brass-soft underline-offset-4 hover:underline">
                Create an account
              </button>
            </p>
          </div>

          {/* ------- Signup (back, rotated 180°) ------- */}
          <div
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            className="absolute inset-0 flex flex-col rounded-xl border border-brass/20 bg-night-mid/80 p-8 shadow-2xl shadow-black/40 backdrop-blur"
          >
            <p className="font-display text-3xl text-ivory">आश्रय</p>
            <p className="mt-1 font-serif text-xs uppercase tracking-[0.35em] text-brass/80">Find your way home</p>

            <form onSubmit={submit} className="mt-8 flex flex-1 flex-col gap-4">
              <input
                required
                className="input-field"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input required className="input-field" placeholder="Email address" type="email" />
              <input required className="input-field" placeholder="Password" type="password" minLength={6} />
              <button className="btn-brass mt-2 w-full">Create account</button>
            </form>

            <p className="mt-auto pt-6 text-center font-serif text-sm text-ivory-dim">
              Already a friend?{' '}
              <button onClick={() => setMode('login')} className="font-semibold text-brass-soft underline-offset-4 hover:underline">
                Log in
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}