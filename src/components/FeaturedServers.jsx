import { Link } from "react-router-dom";

export default function FeaturedServers() {
  return (
    <section className="container py-5">

      <div className="text-center mb-5">

        <span className="hero-badge">
          Featured
        </span>

        <h2 className="section-title mt-3">
          Featured Communities
        </h2>

        <p className="section-subtitle">
          Discover and join the best Roblox communities.
        </p>

      </div>

      <div className="glass-card featured-empty text-center p-5">

        <div className="featured-icon mb-4">
          🚀
        </div>

        <h3 className="fw-bold mb-3">
          Your Community Could Be Here
        </h3>

        <p className="text-secondary mx-auto featured-text">
          Featured communities will appear here once listings
          begin getting approved. Submit your community today
          and become one of the first communities on Discover.
        </p>

        <Link
          to="/advertise"
          className="btn-discover text-decoration-none mt-4 d-inline-block"
        >
          Submit Community
        </Link>

      </div>

    </section>
  );
}