
import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, Search, UserRound } from "lucide-react";

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="announcement-bar">
        WHERE SCHOOL SPIRIT MEETS CULTURE.
      </div>

      <nav className="navbar container" aria-label="Main navigation">
        <Link to="/home" className="brand" aria-label="Campus Culture home">
          CAMPUS<span>CULTURE</span>
        </Link>

        <div className="nav-links">
          <NavLink to="/home" end>Home</NavLink>
          <NavLink to="/shop">Shop</NavLink>
        </div>

        <div className="nav-actions">
          <Link to="/shop" aria-label="Browse products">
            <Search size={21} />
          </Link>
          <Link to="/account" aria-label="Account">
            <UserRound size={21} />
          </Link>
          <Link to="/cart" aria-label="Shopping cart">
            <ShoppingBag size={21} />
          </Link>
        </div>
      </nav>
    </header>
  );
}
