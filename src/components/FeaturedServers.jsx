import { Link } from "react-router-dom";

export default function FeaturedServers() {
  return (
    <section className="container py-5">

      <div className="text-center mb-5">

        <h2 className="section-title">
          Featured Communities
        </h2>

        <p className="section-subtitle">
          Discover is just getting started.
        </p>

      </div>

      <div className="glass-card featured-empty text-center p-5">

        <div className="featured-icon mb-4">
          🚀
        </div>

        <h3 className="fw-bold mb-3">
          Launch Your Community
        </h3>

        <p className="text-secondary mx-auto featured-text">
          Be among the first communities listed on Discover and
          help shape the future of Roblox community discovery.
        </p>

        <Link
          to="/advertise"
          className="btn-discover text-decoration-none mt-3 d-inline-block"
        >
          Submit Community
        </Link>

      </div>

    </section>
  );
}