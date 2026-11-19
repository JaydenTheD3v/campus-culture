import { Link } from "react-router-dom";
import { useCart } from "../../context/UseCart";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import { ROUTES, calcTotals } from "./cartUtils";
import "./cart.css";

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const totals = calcTotals(cartItems);

  if (cartItems.length === 0) {
    return (
      <main className="container cart-page">
        <div className="cart-empty">
          <h1>Your cart is empty</h1>
          <p>Find something with your school&rsquo;s name on it and add it here.</p>
          <Link className="cart-btn" to={ROUTES.shop}>
            Continue shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container cart-page">
      <h1 className="cart-page__title">Your cart</h1>

      <div className="cart-layout">
        <section aria-label="Items in your cart">
          <ul className="cart-list">
            {cartItems.map((item) => (
              <CartItem
                key={item.key}
                item={item}
                onQuantityChange={updateQuantity}
                onRemove={removeFromCart}
              />
            ))}
          </ul>
        </section>

        <CartSummary totals={totals}>
          <Link className="cart-btn cart-btn--block" to={ROUTES.checkout}>
            Go to checkout
          </Link>
          <Link className="cart-link-btn cart-link-btn--center" to={ROUTES.shop}>
            Continue shopping
          </Link>
        </CartSummary>
      </div>
    </main>
  );
}
