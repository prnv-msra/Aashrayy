import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Mail, MapPin, Phone } from 'lucide-react';
import { EASE } from '../lib/utils';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const subscribe = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3500);
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-6xl px-4 pt-10 md:px-8"
    >
      <p className="font-serif text-sm uppercase tracking-[0.4em] text-brass">We’d love to hear from you</p>
      <h1 className="mt-2 font-display text-4xl text-ivory md:text-5xl">संपर्क करें</h1>
      <p className="mt-3 max-w-xl font-serif text-lg italic text-ivory-dim">
        A question about a weave, a wish for your wall, or just good wishes — write to us.
      </p>

      <div className="folk-border mt-10 grid gap-0 overflow-hidden rounded-lg border-2 bg-night-mid/40 lg:grid-cols-[1fr_auto]">
        {/* form */}
        <form onSubmit={subscribe} className="p-8 md:p-12">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" type="text" placeholder="Your name" required />
            <Field label="Email" type="email" placeholder="you@example.com" required />
            <Field label="Category" type="select" className="sm:col-span-2">
              <option>Home Textiles</option>
              <option>Books</option>
              <option>Artwork</option>
              <option>Lifestyle & Decor</option>
              <option>Home Electronics</option>
              <option>Something else</option>
            </Field>
            <label className="block sm:col-span-2">
              <span className="mb-1 block font-serif text-sm uppercase tracking-[0.2em] text-ivory-dim">Message</span>
              <textarea required rows={5} placeholder="Tell us everything…" className="input-field resize-none" />
            </label>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.97 }}
              animate={sent ? { backgroundColor: '#2F5D58' } : {}}
              transition={{ duration: 0.3 }}
              className={`btn-brass ${sent ? '!bg-teal' : ''}`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {sent ? (
                  <motion.span
                    key="yes"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="flex items-center gap-2"
                  >
                    <Check size={17} /> Sent — धन्यवाद
                  </motion.span>
                ) : (
                  <motion.span
                    key="no"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    Send message
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
            <p className="font-serif text-sm italic text-ivory-dim/70">We reply within a day.</p>
          </div>
        </form>

        {/* accent panel */}
        <aside className="relative max-lg:w-full lg:w-72">
          <div className="h-full w-full bg-gradient-to-b from-wood/60 via-night-mid to-night" />
          <div className="madhubani-bg absolute inset-0 opacity-50" />
          <div className="relative flex h-full flex-col justify-center gap-6 p-8 lg:p-10">
            {[
              { icon: <Mail size={17} />, label: 'hello@aashray.demo' },
              { icon: <Phone size={17} />, label: '+91 90000 00000' },
              { icon: <MapPin size={17} />, label: 'Haveli Road, Old City, Ahmedabad' },
            ].map((r) => (
              <div key={r.label} className="flex items-center gap-3 text-sm text-ivory-dim">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-brass/30 text-brass">
                  {r.icon}
                </span>
                {r.label}
              </div>
            ))}
            <p className="mt-2 font-display text-xl text-ivory/70">आश्रय</p>
          </div>
        </aside>
      </div>
    </motion.main>
  );
}

function Field({ label, type = 'text', placeholder, required, className = '', children }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block font-serif text-sm uppercase tracking-[0.2em] text-ivory-dim">{label}</span>
      {type === 'select' ? (
        <select required className="input-field cursor-pointer">{children}</select>
      ) : (
        <input required={required} type={type} placeholder={placeholder} className="input-field" />
      )}
    </label>
  );
}