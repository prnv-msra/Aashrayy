import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../lib/data';
import { Stagger, StaggerItem } from './Reveal';

/* Each tile carries a small logo-mark drawn per category theme. */
function TileMark({ id }) {
  if (id === 'books')
    return (
      <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none">
        <rect x="8" y="10" width="20" height="28" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <rect x="20" y="10" width="20" height="28" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M20 14 V38" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  if (id === 'artwork')
    return (
      <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none">
        <rect x="10" y="12" width="28" height="24" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="20" cy="22" r="4" stroke="currentColor" strokeWidth="1.6" />
        <path d="M14 34 L24 26 L34 34" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  if (id === 'textiles')
    return (
      <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none">
        <path d="M10 12 H38 V36 H10Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M10 22 H38" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="18" cy="17" r="2" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="30" cy="17" r="2" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    );
  if (id === 'electronics')
    return (
      <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none">
        <circle cx="24" cy="24" r="11" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="1.6" />
        <path d="M24 8 V2 M24 46 V40 M8 24 H2 M46 24 H40" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  // lifestyle
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none">
      <path d="M14 40 L19 18 H29 L34 40Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M27 18 Q24 10 21 18" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <p className="font-serif text-sm uppercase tracking-[0.4em] text-brass">Find your room</p>
      <h2 className="section-heading mt-2">Browse by Category</h2>
      <p className="section-sub mb-10">Each category arrives with its own little entrance of course.</p>

      <Stagger className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-5">
        {CATEGORIES.map((c) => (
          <StaggerItem key={c.id}>
            <Link
              to={`/category/${c.slug}`}
              className="group relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-lg border border-brass/15 p-5 transition-colors duration-300 hover:border-brass/40"
              style={{ background: `radial-gradient(ellipse at 50% 120%, ${c.accent}44 0%, #14122A 70%)` }}
            >
              {/* hover preview shimmer */}
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: `radial-gradient(circle at 50% 80%, ${c.accentSoft}33 0%, transparent 60%)` }}
              />

              <div className="relative text-brass-soft/80 group-hover:text-brass-soft">
                <TileMark id={c.id} />
              </div>

              <div className="relative">
                <p className="font-display text-xl text-ivory/80 transition-colors group-hover:text-ivory">{c.hindi}</p>
                <p className="mt-1 font-serif text-base font-semibold text-ivory">{c.name}</p>
                <div className="mt-3 flex items-center gap-1 text-brass opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <span className="text-xs uppercase tracking-[0.2em]">Enter</span>
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>

              {/* animated underline sweep */}
              <span className="absolute bottom-4 left-5 right-5 h-px origin-left scale-x-0 bg-gradient-to-r from-brass to-transparent transition-transform duration-500 group-hover:scale-x-100" style={{ transitionTimingFunction: `cubic-bezier(.16,1,.3,1)` }} />
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}