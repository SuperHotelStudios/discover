import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="custom-navbar fixed-top">

      <div className="container navbar-wrapper">

        <Link
          className="brand-logo"
          to="/"
        >
          <img
            src="/logo.png"
            alt="Discover"
            className="navbar-logo"
          />
          
        </Link>

        <div className="navbar-links">

          <Link className="custom-link" to="/">
            Home
          </Link>

          <Link className="custom-link" to="/servers">
            Communities
          </Link>

          <Link className="custom-link" to="/advertise">
            Advertise
          </Link>

          <Link className="custom-link" to="/leaderboard">
            Leaderboard
          </Link>

        </div>

        <div className="navbar-actions">

          <Link
            to="/advertise"
            className="btn-discover text-decoration-none"
          >
            Submit
          </Link>

        </div>

      </div>

    </nav>
  );
}