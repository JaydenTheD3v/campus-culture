import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useCart } from "../../context/UseCart";
import CartSummary from "./CartSummary";
import {
  ROUTES,
  SIMULATED_DELAY_MS,
  calcTotals,
  createOrder,
  saveLastOrder,
  validateShipping,
} from "./cartUtils";
import "./cart.css";

const EMPTY_FORM = {
  fullName: "",
  email: "",
  address: "",
  city: "",
  state: "",
  zip: "",
};

const FIELDS = [
  { name: "fullName", label: "Full name", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "address", label: "Street address", autoComplete: "street-address" },
  { name: "city", label: "City", autoComplete: "address-level2" },
  {
    name: "state",
    label: "State",
    autoComplete: "address-level1",
    maxLength: 2,
    placeholder: "TX",
  },
  {
    name: "zip",
    label: "ZIP code",
    autoComplete: "postal-code",
    inputMode: "numeric",
    placeholder: "76201",
  },
];

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [placing, setPlacing] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  // Nothing to check out. While placing is true the cart is being emptied on
  // purpose, so we must not bounce back to the cart page.
  if (cartItems.length === 0 && !placing) {
    return <Navigate to={ROUTES.cart} replace />;
  }

  const totals = calcTotals(cartItems);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: name === "state" ? value.toUpperCase() : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (placing) return;

    const found = validateShipping(values);
    setErrors(found);

    const firstInvalid = FIELDS.find((f) => found[f.name]);
    if (firstInvalid) {
      document.getElementById(`checkout-${firstInvalid.name}`)?.focus();
      return;
    }

    // Simulated order: nothing is sent anywhere and no payment is taken.
    setPlacing(true);
    timer.current = setTimeout(() => {
      const order = createOrder(cartItems, values);
      saveLastOrder(order);
      navigate(ROUTES.confirmation, { state: { order }, replace: true });
      clearCart();
    }, SIMULATED_DELAY_MS);
  };

  return (
    <main className="container cart-page">
      <h1 className="cart-page__title">Checkout</h1>

      <p className="checkout-notice" role="note">
        This is a prototype. No payment is processed, and no credit card
        information is collected or stored.
      </p>

      <div className="cart-layout">
        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          <h2>Shipping information</h2>

          <div className="checkout-fields">
            {FIELDS.map((f) => {
              const id = `checkout-${f.name}`;
              const error = errors[f.name];
              return (
                <div
                  key={f.name}
                  className={`checkout-field checkout-field--${f.name}`}
                >
                  <label htmlFor={id}>{f.label}</label>
                  <input
                    id={id}
                    name={f.name}
                    type={f.type ?? "text"}
                    value={values[f.name]}
                    onChange={handleChange}
                    autoComplete={f.autoComplete}
                    maxLength={f.maxLength}
                    inputMode={f.inputMode}
                    placeholder={f.placeholder}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? `${id}-error` : undefined}
                  />
                  {error && (
                    <p id={`${id}-error`} className="checkout-error" role="alert">
                      {error}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <button
            type="submit"
            className="cart-btn cart-btn--block"
            disabled={placing}
          >
            {placing ? "Placing order\u2026" : "Place order"}
          </button>
          <Link className="cart-link-btn cart-link-btn--center" to={ROUTES.cart}>
            Back to cart
          </Link>
        </form>

        <CartSummary totals={totals} items={cartItems} />
      </div>
    </main>
  );
}
