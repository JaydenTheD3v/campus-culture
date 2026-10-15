
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div>
          <h2>CAMPUS CULTURE</h2>
          <p>Where School Spirit Meets Culture.</p>
        </div>

        <div>
          <h3>Explore</h3>
          <Link to="/shop">Shop All</Link>
          <Link to="/account">My Account</Link>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Campus Culture.
        Academic prototype — no real purchases.
      </div>
    </footer>
  );
}
