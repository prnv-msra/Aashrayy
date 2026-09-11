import { useState } from 'react';
import { cn, img } from '../lib/utils';

const FALLBACK_ROTATION = [
  'linear-gradient(135deg, #1E1B3A, #14122A)',
  'linear-gradient(135deg, #2a2547, #1E1B3A)',
  'linear-gradient(135deg, #3a2a1e, #241812)',
];

export function ProductImage({
  seed,
  alt,
  className,
  rounded = true,
  eager = false,
}) {
  const [failed, setFailed] = useState(false);
  const [suffix, setSuffix] = useState(() =>
    FALLBACK_ROTATION[seed.length % FALLBACK_ROTATION.length],
  );

  if (failed) {
    return (
      <div
        className={cn('img-placeholder', rounded && 'rounded-lg', className)}
        style={{ background: suffix }}
        aria-label={alt}
      />
    );
  }

  return (
    <img
      src={img(seed, 800, 1000)}
      alt={alt || seed}
      loading={eager ? 'eager' : 'lazy'}
      className={cn(
        'h-full w-full select-none object-cover',
        rounded && 'rounded-lg',
        className,
      )}
      onError={() => {
        setSuffix(
          FALLBACK_ROTATION[
            Math.floor(Math.random() * FALLBACK_ROTATION.length)
          ],
        );
        setFailed(true);
      }}
    />
  );
}