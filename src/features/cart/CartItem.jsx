import { Link } from "react-router-dom";
import { MAX_QTY, ROUTES, assetUrl, formatPrice, lineTotal } from "./cartUtils";

export default function CartItem({ item, onQuantityChange, onRemove }) {
  // The team's "defaults" (One Size / Default) are not worth showing to shoppers.
  const options = [
    item.size && item.size !== "One Size" && `Size: ${item.size}`,
    item.color && item.color !== "Default" && `Color: ${item.color}`,
  ].filter(Boolean);

  return (
    <li className="cart-item">
      {/* The name link next to the image already describes it, so the
          image link is hidden from screen readers and the tab order. */}
      <Link
        to={ROUTES.product(item.productId)}
        className="cart-item__image-link"
        tabIndex={-1}
        aria-hidden="true"
      >
        {item.image ? (
          <img className="cart-item__image" src={assetUrl(item.image)} alt="" />
        ) : (
          <span className="cart-item__image cart-item__image--empty" />
        )}
      </Link>

      <div className="cart-item__details">
        <Link to={ROUTES.product(item.productId)} className="cart-item__name">
          {item.name}
        </Link>
        {options.map((text) => (
          <p key={text} className="cart-item__meta">
            {text}
          </p>
        ))}
        <p className="cart-item__meta">{formatPrice(item.price)} each</p>

        <div className="cart-item__controls">
          <div
            className="cart-qty"
            role="group"
            aria-label={`Quantity for ${item.name}`}
          >
            <button
              type="button"
              onClick={() => onQuantityChange(item.key, item.quantity - 1)}
              disabled={item.quantity <= 1}
              aria-label={`Decrease quantity of ${item.name}`}
            >
              &minus;
            </button>
            <span className="cart-qty__value" aria-live="polite">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => onQuantityChange(item.key, item.quantity + 1)}
              disabled={item.quantity >= MAX_QTY}
              aria-label={`Increase quantity of ${item.name}`}
            >
              +
            </button>
          </div>

          <button
            type="button"
            className="cart-link-btn"
            onClick={() => onRemove(item.key)}
            aria-label={`Remove ${item.name} from cart`}
          >
            Remove
          </button>
        </div>
      </div>

      <p className="cart-item__total">{formatPrice(lineTotal(item))}</p>
    </li>
  );
}
