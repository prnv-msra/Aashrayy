import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { CartProvider } from './store/CartContext';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';

const Welcome = lazy(() => import('./pages/Welcome'));
const Home = lazy(() => import('./pages/Home'));
const CategoryPage = lazy(() => import('./pages/Category'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Account = lazy(() => import('./pages/Account'));
const Deals = lazy(() => import('./pages/Deals'));
const Contact = lazy(() => import('./pages/Contact'));

function SuspenseFallback() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-3"
      >
        <span className="font-display text-3xl text-brass-soft">आश्रय</span>
        <motion.span
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          className="h-1.5 w-16 rounded-full bg-brass/40"
        />
      </motion.div>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  const isWelcome = location.pathname === '/';

  return (
    <div className="flex min-h-screen flex-col">
      {!isWelcome && <Nav />}
      <div className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Suspense fallback={<SuspenseFallback />}><Welcome /></Suspense>} />
            <Route path="/home" element={<Suspense fallback={<SuspenseFallback />}><Home /></Suspense>} />
            <Route path="/category/:slug" element={<Suspense fallback={<SuspenseFallback />}><CategoryPage /></Suspense>} />
            <Route path="/product/:id" element={<Suspense fallback={<SuspenseFallback />}><ProductDetail /></Suspense>} />
            <Route path="/checkout" element={<Suspense fallback={<SuspenseFallback />}><Checkout /></Suspense>} />
            <Route path="/account" element={<Suspense fallback={<SuspenseFallback />}><Account /></Suspense>} />
            <Route path="/deals" element={<Suspense fallback={<SuspenseFallback />}><Deals /></Suspense>} />
            <Route path="/contact" element={<Suspense fallback={<SuspenseFallback />}><Contact /></Suspense>} />
            <Route path="*" element={<Suspense fallback={<SuspenseFallback />}><Home /></Suspense>} />
          </Routes>
        </AnimatePresence>
      </div>
      {!isWelcome && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AnimatedRoutes />
        <CartDrawer />
      </BrowserRouter>
    </CartProvider>
  );
}