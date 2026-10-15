
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import "../styles/landing.css";

export default function Landing() {
  return (
    <main className="landing">
      <div className="landing-overlay" />

      <div className="landing-content">
        <div className="landing-logo">
          <span className="landing-crown" aria-hidden="true">
            ♛
          </span>

          <h1>
            CAMPUS
            <br />
            CULTURE
          </h1>
        </div>

        <p className="landing-tagline">
          WHERE SCHOOL SPIRIT MEETS CULTURE.
        </p>

        <Link to="/home" className="landing-enter">
          ENTER CAMPUS CULTURE
          <ArrowUpRight size={18} />
        </Link>
      </div>

      <div className="landing-bottom">
        <span>APPAREL&nbsp; | &nbsp;COMMUNITY&nbsp; | &nbsp;CREATIVITY</span>
        <span className="landing-signature">More Than Merch.</span>
      </div>
    </main>
  );
}
