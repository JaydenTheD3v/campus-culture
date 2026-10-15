
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import "../styles/home.css";

const collections = [
  { name: "Vintage", image: "/assets/products/vintage.jpg" },
  { name: "Streetwear", image: "/assets/products/streetwear.jpg" },
  { name: "Campus Classics", image: "/assets/products/classics.jpg" },
  { name: "Accessories", image: "/assets/products/accessories.jpg" },
];

const latestDrops = [
  {
    id: "cc-001",
    name: "UNT Retro Tee",
    price: 32,
    image: "/assets/products/retro-tee.jpg",
  },
  {
    id: "cc-002",
    name: "Campus Hoodie",
    price: 65,
    image: "/assets/products/hoodie.jpg",
  },
  {
    id: "cc-003",
    name: "Varsity Jacket",
    price: 89,
    image: "/assets/products/varsity.jpg",
  },
  {
    id: "cc-004",
    name: "Campus Cap",
    price: 28,
    image: "/assets/products/cap.jpg",
  },
];

export default function Home() {
  return (
    <main className="store-home">
      <section className="store-hero">
        <div className="store-hero-inner container">
          <p className="store-hero-label">NEW DROP / 001</p>

          <h1>
            CAMPUS
            <br />
            CLASSICS.
          </h1>

          <p className="store-hero-subtitle">REIMAGINED.</p>

          <Link to="/shop" className="store-hero-button">
            SHOP THE DROP <ArrowUpRight size={18} />
          </Link>
        </div>

        <div className="store-hero-index" aria-hidden="true">
          01 / 03
        </div>
      </section>

      <section className="store-section container">
        <div className="store-section-heading">
          <div>
            <p className="section-kicker">FIND YOUR STYLE</p>
            <h2>Featured Collections</h2>
          </div>

          <Link to="/shop">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="collection-grid">
          {collections.map((collection) => (
            <Link
              key={collection.name}
              to="/shop"
              className="collection-card"
            >
              <div className="collection-image">
                <img
                  src={collection.image}
                  alt={collection.name}
                  loading="lazy"
                />
                <span className="collection-overlay">
                  EXPLORE <ArrowUpRight size={16} />
                </span>
              </div>
              <h3>{collection.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="store-section container">
        <div className="store-section-heading">
          <div>
            <p className="section-kicker">FRESH ON CAMPUS</p>
            <h2>Latest Drops</h2>
          </div>

          <Link to="/shop">
            Shop All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="drop-grid">
          {latestDrops.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="drop-card"
            >
              <div className="drop-image">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                />
                <span className="drop-tag">NEW</span>
              </div>

              <h3>{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="culture-banner">
        <div className="container">
          <p>APPAREL. COMMUNITY. CREATIVITY.</p>
          <h2>MORE THAN MERCH.</h2>
          <span>WHERE SCHOOL SPIRIT MEETS CULTURE.</span>
        </div>
      </section>
    </main>
  );
}
