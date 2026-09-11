import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const EASE = [0.16, 1, 0.3, 1];

export const formatINR = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

export function usePrefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export const img = (seed, w = 800, h = 1000) => {
  if (seed.startsWith('http')) return seed;
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
};