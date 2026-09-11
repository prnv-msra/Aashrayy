import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronLeft, Home as HomeIcon, PartyPopper } from 'lucide-react';
import { useCart } from '../store/CartContext';
import { getProduct } from '../lib/data';
import { formatINR, EASE } from '../lib/utils';
import { ProductImage } from '../components/ProductImage';

const STEPS = ['Shipping', 'Payment', 'Confirm'];

export default function Checkout() {
  const { items, subtotal, clear } = useCart();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const [shipping, setShipping] = useState({
    name: '',
    address: '',
    city: '',
    pin: '',
    phone: '',
  });
  const [payment, setPayment] = useState({ card: '', exp: '', cvc: '', name: '' });

  const itemsDetailed = useMemo(
    () =>
      items
        .map((i) => ({ ...i, product: getProduct(i.id) }))
        .filter((i) => i.product),
    [items],
  );

  const shippingValid = Object.values(shipping).every((v) => v.trim().length > 0);
  const paymentValid = Object.values(payment).every((v) => v.trim().length > 0);

  const progress = ((step + (done ? 1 : 0)) / STEPS.length) * 100;

  const confirmOrder = () => {
    clear();
    setDone(true);
  };

  if (done) {
    return (
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto flex min-h-[80vh] max-w-xl flex-col items-center justify-center px-6 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.25, 1] }}
          transition={{ duration: 0.7, ease: EASE }}
          className="grid h-24 w-24 place-items-center rounded-full border border-brass bg-brass/15 text-brass"
        >
          <PartyPopper size={40} />
        </motion.div>
        <h1 className="mt-8 font-display text-4xl text-ivory">धन्यवाद</h1>
        <p className="mt-3 font-serif text-2xl font-semibold text-brass-soft">Thank you, {shipping.name || 'friend'}!</p>
        <p className="mt-4 max-w-md font-serif text-lg italic text-ivory-dim">
          Your order is a piece of the way home. A confirmation is on its way to {shipping.phone || 'your phone'}.
        </p>
        <Link to="/" className="btn-brass mt-10 inline-flex items-center gap-2">
          <HomeIcon size={16} /> Continue Shopping
        </Link>
      </motion.main>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-6xl px-4 pt-8 md:px-8"
    >
      <nav className="mb-6 font-serif text-sm text-ivory-dim">
        <Link to="/" className="hover:text-ivory">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-ivory">Checkout</span>
      </nav>

      {/* ---------- Progress ---------- */}
      <div className="mb-10">
        <div className="flex items-center justify-between">
          {STEPS.map((label, i) => (
            <button
              key={label}
              onClick={() => i < step && setStep(i)}
              className={`flex items-center gap-2 font-serif text-sm md:text-base uppercase tracking-[0.2em] transition-colors ${
                i <= step ? 'text-brass-soft font-semibold' : 'text-ivory-dim/50'
              } ${i < step ? 'cursor-pointer' : 'cursor-default'}`}
              disabled={i > step}
            >
              <span
                className={`grid h-7 w-7 place-items-center rounded-full border text-xs ${
                  i < step
                    ? 'border-brass bg-brass text-night-deep'
                    : i === step
                      ? 'border-brass-soft bg-night-mid text-brass-soft'
                      : 'border-ivory-dim/30 text-ivory-dim/50'
                }`}
              >
                {i < step ? <Check size={13} /> : i + 1}
              </span>
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
        <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-night-mid">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-brass to-brass-soft"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: EASE }}
          />
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        {/* ---------- Step content ---------- */}
        <div className="min-h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              {step === 0 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full name" value={shipping.name} onChange={(v) => setShipping({ ...shipping, name: v })} className="sm:col-span-2" />
                  <Field label="Address" value={shipping.address} onChange={(v) => setShipping({ ...shipping, address: v })} className="sm:col-span-2" />
                  <Field label="City" value={shipping.city} onChange={(v) => setShipping({ ...shipping, city: v })} />
                  <Field label="PIN code" value={shipping.pin} onChange={(v) => setShipping({ ...shipping, pin: v })} />
                  <Field label="Phone" value={shipping.phone} onChange={(v) => setShipping({ ...shipping, phone: v })} className="sm:col-span-2" />
                </div>
              )}

              {step === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <p className="font-serif text-lg font-semibold text-ivory">Payment details</p>
                    <span className="rounded-full border border-teal/40 bg-teal/15 px-2 py-0.5 text-[11px] uppercase tracking-widest text-teal-light">
                      Demo — no charges
                    </span>
                  </div>
                  <Field label="Name on card" value={payment.name} onChange={(v) => setPayment({ ...payment, name: v })} />
                  <Field label="Card number" value={payment.card} onChange={(v) => setPayment({ ...payment, card: v })} placeholder="0000 0000 0000 0000" />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Expiry" value={payment.exp} onChange={(v) => setPayment({ ...payment, exp: v })} placeholder="MM / YY" />
                    <Field label="CVC" value={payment.cvc} onChange={(v) => setPayment({ ...payment, cvc: v })} placeholder="•••" />
                  </div>
                  <p className="text-xs text-ivory-dim/60">₹0 will be charged. This is a front-end prototype with no real gateway.</p>
                </div>
              )}

              {step === 2 && (
                <div>
                  <p className="font-serif text-lg font-semibold text-ivory">Review your order</p>
                  <div className="mt-4 flex flex-col gap-3">
                    {itemsDetailed.map((it) => (
                      <div key={it.id} className="flex items-center gap-4 rounded-md border border-brass/10 bg-night-deep/40 p-3">
                        <div className="relative h-14 w-12 shrink-0 overflow-hidden rounded">
                          <ProductImage seed={it.product.imageSeed} alt="" className="absolute inset-0" rounded={false} />
                        </div>
                        <div className="flex-1">
                          <p className="font-serif font-semibold text-ivory">{it.product.name}</p>
                          <p className="text-xs text-ivory-dim/70">Qty {it.qty}</p>
                        </div>
                        <p className="font-serif font-semibold text-brass-soft">{formatINR(it.product.price * it.qty)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 rounded-md border border-brass/15 bg-night-mid/40 p-4 text-sm">
                    <p className="flex justify-between py-1 text-ivory-dim"><span>Ship to</span><span className="text-ivory">{shipping.name}, {shipping.city} — {shipping.pin}</span></p>
                    <p className="flex justify-between py-1 text-ivory-dim"><span>Card</span><span className="text-ivory">•••• {payment.card.slice(-4) || '0000'}</span></p>
                    <p className="mt-2 flex justify-between border-t border-brass/10 pt-2 text-base font-semibold text-ivory">
                      <span>Total</span><span className="text-brass-soft">{formatINR(subtotal + 199)}</span>
                    </p>
                    <p className="text-right text-xs text-ivory-dim/60">incl. delivery ₹199 · free returns</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ---------- Summary ---------- */}
        <aside className="h-fit rounded-lg border border-brass/15 bg-night-mid/40 p-6 lg:sticky lg:top-24">
          <p className="font-serif text-sm font-semibold uppercase tracking-[0.25em] text-brass">Order summary</p>
          <div className="mt-4 max-h-56 space-y-2 overflow-y-auto">
            {itemsDetailed.map((it) => (
              <div key={it.id} className="flex justify-between text-sm">
                <span className="text-ivory-dim">{it.product.name} × {it.qty}</span>
                <span className="text-ivory">{formatINR(it.product.price * it.qty)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2 border-t border-brass/10 pt-4 text-sm">
            <p className="flex justify-between text-ivory-dim"><span>Subtotal</span><span>{formatINR(subtotal)}</span></p>
            <p className="flex justify-between text-ivory-dim"><span>Delivery</span><span className="text-teal-light">Free over ₹4,999</span></p>
          </div>
          <div className="mt-4 flex justify-between border-t border-brass/10 pt-4">
            <span className="font-serif text-ivory">Total</span>
            <span className="font-serif text-2xl font-semibold text-brass-soft">{formatINR(subtotal + 199)}</span>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            {step > 0 && (
              <button onClick={() => setStep((s) => s - 1)} className="btn-outline flex items-center justify-center gap-2 text-sm">
                <ChevronLeft size={15} /> Back
              </button>
            )}
            {step < 2 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                disabled={step === 0 ? !shippingValid : !paymentValid}
                className="btn-brass disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue
              </button>
            ) : (
              <button onClick={confirmOrder} className="btn-brass">
                Place Order — {formatINR(subtotal + 199)}
              </button>
            )}
          </div>
        </aside>
      </div>
    </motion.main>
  );
}

function Field({ label, value, onChange, className = '', placeholder }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block font-serif text-sm uppercase tracking-[0.2em] text-ivory-dim">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-field"
      />
    </label>
  );
}