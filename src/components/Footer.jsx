import { Link } from 'react-router-dom';
import { CATEGORIES } from '../lib/data';

export function Footer() {
  return (
    <footer className="mt-16 border-t border-brass/10 bg-night-deep">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-4 md:px-8">
        <div>
          <p className="font-display text-2xl text-ivory">आश्रय</p>
          <p className="mt-2 font-serif text-sm uppercase tracking-[0.35em] text-brass/80">Aashray</p>
          <p className="mt-4 text-sm text-ivory-dim">
            A shelter of beautiful things — folk art, textiles and light for your home.
          </p>
        </div>

        <div>
          <p className="font-serif text-sm font-semibold uppercase tracking-[0.25em] text-brass">Categories</p>
          <div className="mt-4 flex flex-col gap-2">
            {CATEGORIES.map((c) => (
              <Link key={c.id} to={`/category/${c.slug}`} className="text-sm text-ivory-dim hover:text-ivory transition-colors">
                {c.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="font-serif text-sm font-semibold uppercase tracking-[0.25em] text-brass">Explore</p>
          <div className="mt-4 flex flex-col gap-2">
            <Link to="/deals" className="text-sm text-ivory-dim hover:text-ivory transition-colors">Top Deals</Link>
            <Link to="/account" className="text-sm text-ivory-dim hover:text-ivory transition-colors">Account</Link>
            <Link to="/contact" className="text-sm text-ivory-dim hover:text-ivory transition-colors">Contact Us</Link>
          </div>
        </div>

        <div>
          <p className="font-serif text-sm font-semibold uppercase tracking-[0.25em] text-brass">Crafted with</p>
          <p className="mt-4 text-sm text-ivory-dim">
            React · Tailwind · Motion — a design prototype, purely front-end.
          </p>
          <p className="mt-3 text-xs text-ivory-dim/60">
            Handloomed anywhere, rendered everywhere.
          </p>
        </div>
      </div>
      <div className="border-t border-brass/10 py-4 text-center text-xs uppercase tracking-[0.3em] text-ivory-dim/50">
        © {new Date().getFullYear()} Aashray · आश्रय
      </div>
    </footer>
  );
}