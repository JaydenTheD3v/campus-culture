
import { Link, NavLink } from "react-router-dom";
import { Search, UserRound, ShoppingBag } from "lucide-react";
import { useCart } from "../../context/UseCart";

export default function Navbar() {
  const { cartCount } = useCart();
  return (
    <header className="site-header">
      <nav className="navbar container" aria-label="Main navigation">
        <Link to="/home" className="brand" aria-label="Campus Culture home">
          <span className="brand-crown">♛</span>
          <span className="brand-name">CAMPUS CULTURE</span>
        </Link>

        <div className="nav-links">
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/shop">Collections</NavLink>
          <NavLink to="/shop">New Drops</NavLink>
        </div>

        <div className="nav-actions">
          <Link to="/shop" aria-label="Search products">
            <Search size={20} />
          </Link>

          <Link to="/account" aria-label="My account">
            <UserRound size={20} />
          </Link>

          <Link to="/cart" aria-label={`Shopping cart, ${cartCount} items`}>
            <ShoppingBag size={21} />
            {cartCount > 0 && (
              <span className="cart-count">{cartCount}</span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}
