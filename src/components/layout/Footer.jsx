
import { Link } from "react-router-dom";
import {ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main container">
        <div className="footer-brand">
          <Link to="/home" className="footer-logo">
            <span aria-hidden="true">♛</span>
            CAMPUS CULTURE
          </Link>
          <p>Where School Spirit Meets Culture.</p>
          <span className="footer-signature">More Than Merch.</span>
        </div>

        <div className="footer-links">
          <h3>EXPLORE</h3>
          <Link to="/shop">Shop All</Link>
          <Link to="/shop">Collections</Link>
          <Link to="/shop">New Drops</Link>
        </div>

        <div className="footer-links">
          <h3>CAMPUS CULTURE</h3>
          <Link to="/home">Our Story</Link>
          <Link to="/account">My Account</Link>
          <Link to="/cart">Shopping Bag</Link>
        </div>

        <div className="footer-community">
          <h3>MORE THAN MERCH.</h3>
          <p>
            Apparel. Community. Creativity.
            <br />
            Made for campus culture.
          </p>
          <Link to="/shop">
            EXPLORE THE COLLECTION <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© 2026 Campus Culture. All rights reserved.</span>
          <span>Academic prototype — no real purchases.</span>
          
        </div>
      </div>
    </footer>
  );
}
