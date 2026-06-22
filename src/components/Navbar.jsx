import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

      <div className="container">

        <Link
          className="navbar-brand brand-logo"
          to="/"
        >
          Discover
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse show"
          id="nav"
        >

          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link custom-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link custom-link" to="/servers">
                Communities
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link custom-link" to="/advertise">
                Advertise
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link custom-link" to="/leaderboard">
                Leaderboard
              </Link>
            </li>

          </ul>

          {/* <Link
            to="/login"
            className="btn-discover text-decoration-none"
          >
            Sign In
          </Link> */}

        </div>

      </div>

    </nav>
  );
}