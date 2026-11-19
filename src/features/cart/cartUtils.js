// Pure helpers for the cart page and simulated checkout.
// No React in this file, so everything here can be unit tested directly.
// The shared cart state itself lives in src/context/CartContext.jsx (use useCart()).

// ---- Routes -----------------------------------------------------------
export const ROUTES = {
  shop: "/shop",
  cart: "/cart",
  checkout: "/checkout",
  confirmation: "/order-confirmation",
  product: (id) => `/products/${id}`,
};

// ---- Business rules (prototype values) --------------------------------
export const MAX_QTY = 10; // the + button stops here
export const TAX_RATE = 0.0825; // estimated sales tax, applied to the subtotal
export const SHIPPING_FLAT = 5.99; // flat-rate shipping
export const FREE_SHIPPING_MIN = 75; // subtotal at or above this ships free
export const SIMULATED_DELAY_MS = 600; // fake "processing" time on Place order

// ---- Money ------------------------------------------------------------
// All arithmetic is done in whole cents to avoid floating point errors
// (for example 19.99 * 3 = 59.96999999999999 in plain JavaScript).
// Bad values (missing price, NaN) count as 0 instead of breaking the page.
export const toCents = (dollars) => Math.round((Number(dollars) || 0) * 100);
export const fromCents = (cents) => cents / 100;

export function formatPrice(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

// The site is served from a sub-path (vite.config.js sets base: "/campus-culture/"),
// so image paths like "/assets/products/hoodie.jpg" 404 unless the base is added.
// External URLs and paths that already include the base are left alone.
export function assetUrl(path) {
  if (!path || /^(https?:)?\/\/|^data:/.test(path)) return path;
  const base = import.meta.env.BASE_URL;
  if (path.startsWith(base)) return path;
  return base + path.replace(/^\/+/, "");
}

const qtyOf = (item) => Number(item.quantity) || 0;

export const lineTotal = (item) =>
  fromCents(toCents(item.price) * qtyOf(item));

export function calcTotals(items) {
  const itemCount = items.reduce((n, i) => n + qtyOf(i), 0);
  const subtotalCents = items.reduce(
    (sum, i) => sum + toCents(i.price) * qtyOf(i),
    0
  );
  const shippingCents =
    subtotalCents === 0 || subtotalCents >= toCents(FREE_SHIPPING_MIN)
      ? 0
      : toCents(SHIPPING_FLAT);
  const taxCents = Math.round(subtotalCents * TAX_RATE);

  return {
    itemCount,
    subtotal: fromCents(subtotalCents),
    shipping: fromCents(shippingCents),
    tax: fromCents(taxCents),
    total: fromCents(subtotalCents + shippingCents + taxCents),
  };
}

// ---- Shipping validation ---------------------------------------------
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ZIP_RE = /^\d{5}(-\d{4})?$/;

// Returns an object of { fieldName: message }. An empty object means valid.
export function validateShipping(values) {
  const v = (k) => String(values[k] ?? "").trim();
  const errors = {};

  if (v("fullName").length < 2) errors.fullName = "Enter your full name.";

  if (!v("email")) errors.email = "Enter your email address.";
  else if (!EMAIL_RE.test(v("email")))
    errors.email = "Enter an email address like name@school.edu.";

  if (!v("address")) errors.address = "Enter your street address.";
  if (!v("city")) errors.city = "Enter your city.";

  if (!/^[A-Za-z]{2}$/.test(v("state")))
    errors.state = "Use the 2-letter state code, such as TX.";

  if (!ZIP_RE.test(v("zip")))
    errors.zip = "Enter a 5-digit ZIP code, such as 76201.";

  return errors;
}

// ---- Simulated order --------------------------------------------------
const ORDER_KEY = "campus-culture-last-order";

export function createOrder(items, shipping) {
  const trimmed = Object.fromEntries(
    Object.entries(shipping).map(([k, v]) => [k, String(v).trim()])
  );
  return {
    orderNumber: `CC-${Math.floor(100000 + Math.random() * 900000)}`,
    placedAt: new Date().toISOString(),
    items,
    shipping: trimmed,
    totals: calcTotals(items),
  };
}

// The confirmation page reads this so a refresh doesn't lose the order.
export function saveLastOrder(order) {
  try {
    sessionStorage.setItem(ORDER_KEY, JSON.stringify(order));
  } catch {
    /* storage unavailable: the router state still carries the order */
  }
}

export function loadLastOrder() {
  try {
    const raw = sessionStorage.getItem(ORDER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
