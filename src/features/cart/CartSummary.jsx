import { FREE_SHIPPING_MIN, formatPrice, lineTotal } from "./cartUtils";

// totals comes from calcTotals(cartItems).
// Pass items to also list each line; pass children for the action buttons.
export default function CartSummary({ totals, items, children }) {
  const { itemCount, subtotal, shipping, tax, total } = totals;
  const toFreeShipping = FREE_SHIPPING_MIN - subtotal;

  return (
    <aside className="cart-summary" aria-labelledby="order-summary-heading">
      <h2 id="order-summary-heading">Order summary</h2>

      {items && (
        <ul className="cart-summary__items">
          {items.map((item) => (
            <li key={item.key}>
              <span>
                {item.name} &times; {item.quantity}
              </span>
              <span>{formatPrice(lineTotal(item))}</span>
            </li>
          ))}
        </ul>
      )}

      <dl className="cart-summary__rows">
        <div>
          <dt>
            Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
          </dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>
        <div>
          <dt>Shipping</dt>
          <dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
        </div>
        <div>
          <dt>Estimated tax</dt>
          <dd>{formatPrice(tax)}</dd>
        </div>
        <div className="cart-summary__total">
          <dt>Total</dt>
          <dd>{formatPrice(total)}</dd>
        </div>
      </dl>

      {subtotal > 0 && toFreeShipping > 0 && (
        <p className="cart-summary__note">
          Add {formatPrice(toFreeShipping)} more to get free shipping.
        </p>
      )}

      {children}
    </aside>
  );
}
