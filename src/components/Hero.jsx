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
      <div className="row align-items-center py-4 py-md-5">
        <div className="col-12 col-lg-9 col-xl-8">
          <h1 className="hero-title">
            Discover
            <br />
            <span className="gradient-text">Roblox Communities</span>
          </h1>

          <p className="hero-subtitle mt-3 mt-md-4">
            Discover <strong>{communities.length.toLocaleString()}</strong>{" "}
            Roblox communities across <strong>{categories.length}</strong>{" "}
            categories. Join the fastest-growing communities, explore new
            experiences, and advertise your own server to thousands of users.
          </p>

          <div className="hero-search mt-4 mt-md-5 w-100">
            <i className="bi bi-search"></i>

            <input
              type="text"
              placeholder="Search communities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>

          <div className="d-flex flex-column flex-sm-row gap-3 mt-4">
            <Link to="/servers" className="btn-discover text-decoration-none text-center">
              Browse Communities
            </Link>

            <Link
              to="/advertise"
              className="btn-outline-discover text-decoration-none text-center"
            >
              Submit Community
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
