import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Hero({ communities, categories }) {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/servers?search=${encodeURIComponent(search)}`);
    }
  };

  return (
    <section className="hero container">
      <div className="row min-vh-100 align-items-center">
        <div className="col-lg-8">
          <h1 className="hero-title">
            Discover
            <br />
            <span className="gradient-text">Roblox Communities</span>
          </h1>

          <p className="hero-subtitle mt-4">
            Discover <strong>{communities.length.toLocaleString()}</strong>{" "}
            Roblox communities across <strong>{categories.length}</strong>{" "}
            categories. Join the fastest-growing communities, explore new
            experiences, and advertise your own server to thousands of users.
          </p>

          <div className="hero-search mt-5">
            <i className="bi bi-search"></i>

            <input
              type="text"
              placeholder="Search communities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>

          <div className="d-flex flex-wrap gap-3 mt-4">
            <Link to="/servers" className="btn-discover text-decoration-none">
              Browse Communities
            </Link>

            <Link
              to="/advertise"
              className="btn-outline-discover text-decoration-none"
            >
              Submit Community
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
