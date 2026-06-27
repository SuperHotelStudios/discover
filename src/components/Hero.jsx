import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero container">

      <div className="row min-vh-100 align-items-center">

        <div className="col-lg-8">

          <h1 className="hero-title">
            Discover
            <br />
            <span className="gradient-text">
              Roblox Communities
            </span>
          </h1>

          <p className="hero-subtitle mt-4">
            Find Design, Development and Roleplay
            Discord communities all in one place.
          </p>

          {/* Search */}
          <div className="hero-search mt-5">

            <i className="bi bi-search"></i>

            <input
              type="text"
              placeholder="Search communities..."
            />

          </div>

          <div className="d-flex flex-wrap gap-3 mt-4">

            <Link
              to="/servers"
              className="btn-discover text-decoration-none"
            >
              Browse Communities
            </Link>

            <Link
              to="/advertise"
              className="btn-outline-discover text-decoration-none"
            >
              Submit Server
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}