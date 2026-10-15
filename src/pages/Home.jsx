
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-content">
          <p className="eyebrow">A NEW ERA OF CAMPUS STYLE</p>
          <h1>
            REP YOUR
            <br />
            <span>CULTURE.</span>
          </h1>
          <p className="hero-description">
            School spirit meets streetwear. Discover apparel
            inspired by the energy, creativity, and culture
            of campus life.
          </p>

          <Link to="/shop" className="btn-primary">
            EXPLORE THE COLLECTION
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>

      <section className="intro-section container">
        <p className="eyebrow">MORE THAN MERCH</p>
        <h2>NOT YOUR AVERAGE CAMPUS STORE.</h2>
        <p>
          Campus Culture brings a fresh perspective to
          university-inspired fashion, blending student
          expression with contemporary streetwear.
        </p>
      </section>
    </main>
  );
}
