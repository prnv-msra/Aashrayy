import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Star } from 'lucide-react';
import { useCart } from '../store/CartContext';
import { formatINR, cn } from '../lib/utils';
import { ProductImage } from './ProductImage';

export function ProductBadge({ badge }) {
  if (!badge) return null;
  const styles = badge === 'Hot Deal' ? 'bg-wood text-ivory' : 'bg-teal text-ivory';
  return (
    <span
      className={cn(
        'absolute left-3 top-3 z-10 rounded-sm px-2 py-1 text-xs font-serif font-semibold uppercase tracking-widest',
        styles,
      )}
    >
      {badge}
    </span>
  );
}

export function ProductCard({ product, index = 0, compact = false }) {
  const { addItem } = useCart();
  const stars = Math.round(product.rating);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <Link
        to={`/product/${product.id}`}
        className="card-surface block"
        aria-label={product.name}
      >
        <ProductBadge badge={product.badge} />

        {/* Image with crossfade on hover */}
        <div className={compact ? 'relative aspect-square overflow-hidden' : 'relative aspect-[4/5] overflow-hidden'}>
          <ProductImage
            seed={product.imageSeed}
            alt={product.name}
            className="absolute inset-0 transition-opacity duration-700 group-hover:opacity-0"
          />
          <ProductImage
            seed={product.hoverSeed}
            alt=""
            className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night-deep/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        <div className={cn('p-4', compact && 'p-3')}>
          <p className="font-serif text-xs uppercase tracking-[0.2em] text-brass/70">
            {product.hi}
          </p>
          <h3 className="mt-1 font-serif text-xl font-semibold leading-snug text-ivory group-hover:text-brass-soft">
            {product.name}
          </h3>
          <div className="mt-2 flex items-center gap-1.5">
            <div className="flex">{Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={13} className={i < stars ? 'fill-brass text-brass' : 'text-ivory-dim/30'} />
            ))}</div>
            <span className="text-xs text-ivory-dim/70">({product.reviews})</span>
          </div>
          <div className="mt-3 flex items-end justify-between gap-3">
            <div>
              {product.originalPrice && (
                <p className="text-sm text-ivory-dim/60 line-through">{formatINR(product.originalPrice)}</p>
              )}
              <p className="font-serif text-xl font-semibold text-brass-soft">{formatINR(product.price)}</p>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                addItem(product.id);
              }}
              className="grid h-10 w-10 place-items-center rounded-sm border border-brass/40 text-brass transition-all duration-200 hover:bg-brass hover:text-night-deep"
              aria-label={`Add ${product.name} to cart`}
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}