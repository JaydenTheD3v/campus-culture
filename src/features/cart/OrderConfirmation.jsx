import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import CartSummary from "./CartSummary";
import { ROUTES, loadLastOrder } from "./cartUtils";
import "./cart.css";

export default function OrderConfirmation() {
  const location = useLocation();
  // Router state is set right after checkout; sessionStorage covers a refresh.
  const order = location.state?.order ?? loadLastOrder();
  const headingRef = useRef(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  if (!order) {
    return (
      <main className="container cart-page">
        <div className="cart-empty">
          <h1>No recent order found</h1>
          <p>Your confirmation appears here right after you place an order.</p>
          <Link className="cart-btn" to={ROUTES.shop}>
            Continue shopping
          </Link>
        </div>
      </main>
    );
  }

  const { orderNumber, placedAt, items, shipping, totals } = order;
  const firstName = shipping.fullName.split(" ")[0];

  return (
    <main className="container cart-page">
      <div className="confirmation">
        <h1 ref={headingRef} tabIndex={-1}>
          Thank you, {firstName}!
        </h1>
        <p className="confirmation__lead">
          Your order <strong>{orderNumber}</strong> is confirmed. This was a
          simulated order, so no payment was taken and no email was sent.
        </p>
        <p className="cart-item__meta">
          Placed {new Date(placedAt).toLocaleString()}
        </p>
      </div>

      <div className="cart-layout">
        <section className="confirmation__ship" aria-labelledby="ship-to-heading">
          <h2 id="ship-to-heading">Shipping to</h2>
          <address>
            {shipping.fullName}
            <br />
            {shipping.address}
            <br />
            {shipping.city}, {shipping.state} {shipping.zip}
            <br />
            {shipping.email}
          </address>
        </section>

        <CartSummary totals={totals} items={items}>
          <Link className="cart-btn cart-btn--block" to={ROUTES.shop}>
            Continue shopping
          </Link>
        </CartSummary>
      </div>
    </main>
  );
}
